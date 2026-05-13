import { customElement } from 'lit/decorators.js';
import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/stat';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface WeatherConfig extends LirumBaseConfig {
  entity: string;
  show_forecast?: boolean;
  forecast_days?: number;
  show_details?: boolean;
}

interface ForecastEntry {
  datetime?: string;
  temperature?: number;
  templow?: number;
  condition?: string;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.weather.tag,
  name: CARDS.weather.name,
  description: CARDS.weather.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

const WEATHER_ICONS: Record<string, string> = {
  sunny: 'mdi:weather-sunny',
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  rainy: 'mdi:weather-rainy',
  pouring: 'mdi:weather-pouring',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
  exceptional: 'mdi:alert-circle',
};

const WEATHER_RAMPS: Record<string, string> = {
  sunny: 'amber',
  'clear-night': 'cool',
  cloudy: 'neutral',
  partlycloudy: 'cool',
  rainy: 'cool',
  pouring: 'cool',
  snowy: 'cool',
  'snowy-rainy': 'cool',
  fog: 'neutral',
  hail: 'neutral',
  lightning: 'amber',
  'lightning-rainy': 'amber',
  windy: 'cool',
  'windy-variant': 'cool',
  exceptional: 'alert',
};

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function friendlyState(state: string): string {
  return state.replace(/_/g, ' ').replace(/-/g, ' ');
}

function shortDate(value: string | undefined): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return WEEKDAY[d.getDay()] ?? '';
}

@customElement(CARDS.weather.tag)
export class LirumWeatherCard extends LirumCardBase<WeatherConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./weather-editor');
    return document.createElement(CARDS.weather.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<WeatherConfig> {
    const entity = pickStubEntity(hass, fallback, ['weather']);
    return { type: `custom:${CARDS.weather.tag}`, entity };
  }

  public setConfig(config: WeatherConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 3;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const temp =
      typeof state.attributes.temperature === 'number'
        ? (state.attributes.temperature as number)
        : undefined;
    const unit =
      typeof state.attributes.temperature_unit === 'string'
        ? (state.attributes.temperature_unit as string)
        : '°C';
    const humidity =
      typeof state.attributes.humidity === 'number'
        ? (state.attributes.humidity as number)
        : undefined;
    const windSpeed =
      typeof state.attributes.wind_speed === 'number'
        ? (state.attributes.wind_speed as number)
        : undefined;
    const windUnit =
      typeof state.attributes.wind_speed_unit === 'string'
        ? (state.attributes.wind_speed_unit as string)
        : 'km/h';
    const forecast = Array.isArray(state.attributes.forecast)
      ? (state.attributes.forecast as ForecastEntry[])
      : undefined;

    const icon = WEATHER_ICONS[state.state] ?? 'mdi:weather-partly-cloudy';
    const ramp = WEATHER_RAMPS[state.state] ?? 'cool';
    const cssVars = backgroundVars(this._config.background);
    const showDetails = this._config.show_details !== false;
    const showForecast = this._config.show_forecast !== false;
    const forecastDays = this._config.forecast_days ?? 5;
    const friendly = friendlyState(state.state);

    const detailsRow = showDetails
      ? html`<div class="details">
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span>Humidity</span>
            </div>
            <div class="cell-value">${humidity !== undefined ? `${humidity}%` : '–'}</div>
          </div>
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:weather-windy"></ha-icon>
              <span>Wind</span>
            </div>
            <div class="cell-value">
              ${windSpeed !== undefined ? `${windSpeed} ${windUnit}` : '–'}
            </div>
          </div>
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:weather-cloudy-clock"></ha-icon>
              <span>Condition</span>
            </div>
            <div class="cell-value">${friendly}</div>
          </div>
        </div>`
      : nothing;

    const forecastRow =
      showForecast && forecast && forecast.length > 0
        ? html`<div class="forecast-strip">
            <div class="forecast">
              ${forecast.slice(0, Math.max(0, forecastDays)).map((entry, idx) => {
                const day = shortDate(entry.datetime);
                const cond = entry.condition ?? '';
                const dayIcon = WEATHER_ICONS[cond] ?? 'mdi:weather-partly-cloudy';
                const high =
                  typeof entry.temperature === 'number'
                    ? Math.round(entry.temperature)
                    : undefined;
                const low =
                  typeof entry.templow === 'number' ? Math.round(entry.templow) : undefined;
                const isToday = idx === 0;
                return html`<div class="forecast-tile ${isToday ? 'is-today' : ''}">
                  <div class="forecast-day">
                    ${isToday ? html`<span class="now-dot"></span>` : nothing}
                    <span class="forecast-day-label">${isToday ? 'Today' : day}</span>
                  </div>
                  <ha-icon class="forecast-icon lirum-anim" icon=${dayIcon}></ha-icon>
                  <div class="forecast-temp">
                    ${high !== undefined
                      ? html`<span class="t-high">${high}°</span>`
                      : html`<span class="t-high">–</span>`}
                    ${low !== undefined
                      ? html`<span class="t-sep">·</span
                          ><span class="t-low">${low}°</span>`
                      : nothing}
                  </div>
                </div>`;
              })}
            </div>
          </div>`
        : nothing;

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root">
          <div class="top">
            <ha-icon class="hero-icon ramp-${ramp} lirum-anim" icon=${icon}></ha-icon>
            <lirum-stat
              class="hero-stat"
              .value=${temp !== undefined ? temp.toFixed(1) : '–'}
              .unit=${unit}
              .label=${friendly}
              .colorRamp=${ramp}
            ></lirum-stat>
          </div>
          ${detailsRow}${forecastRow}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .lirum-gesture-root {
        padding: 14px 14px 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .hero-icon {
        --mdc-icon-size: 48px;
        flex: 0 0 auto;
        filter: drop-shadow(0 0 10px color-mix(in oklab, var(--c1, #1ee0ff) 60%, transparent));
        animation: lirum-glow-pulse 3.6s ease-in-out infinite;
      }
      .hero-icon.ramp-amber {
        --c1: #ffd35a;
        color: #ffd35a;
      }
      .hero-icon.ramp-cool {
        --c1: #1ee0ff;
        color: #1ee0ff;
      }
      .hero-icon.ramp-neutral {
        --c1: #9dadc7;
        color: #9dadc7;
      }
      .hero-icon.ramp-alert {
        --c1: #ff5a7a;
        color: #ff5a7a;
      }
      .hero-stat {
        flex: 1 1 auto;
        min-width: 0;
      }
      .details {
        --c1: #1ee0ff;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        padding-top: 10px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 8px 10px;
        border-radius: 10px;
        background: linear-gradient(
          180deg,
          color-mix(in oklab, var(--c1) 6%, transparent),
          color-mix(in oklab, currentColor 3%, transparent)
        );
        border: 1px solid color-mix(in oklab, var(--c1) 18%, transparent);
        backdrop-filter: blur(2px);
      }
      .cell-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--lirum-muted, #6b7894);
        font-weight: 600;
      }
      .cell-label ha-icon {
        --mdc-icon-size: 14px;
      }
      .cell-value {
        font-size: 14px;
        color: var(--lirum-text, #eef3ff);
        font-variant-numeric: tabular-nums;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .forecast-strip {
        --c1: #1ee0ff;
        position: relative;
        padding-top: 10px;
      }
      .forecast-strip::before,
      .forecast-strip::after {
        content: '';
        position: absolute;
        top: 10px;
        bottom: 2px;
        width: 18px;
        pointer-events: none;
        z-index: 1;
      }
      .forecast-strip::before {
        left: 0;
        background: linear-gradient(
          90deg,
          color-mix(in oklab, #060a14 85%, transparent),
          transparent
        );
      }
      .forecast-strip::after {
        right: 0;
        background: linear-gradient(
          270deg,
          color-mix(in oklab, #060a14 85%, transparent),
          transparent
        );
      }
      .forecast {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 2px 4px;
        scrollbar-width: thin;
        scroll-snap-type: x proximity;
      }
      .forecast-tile {
        flex: 0 0 auto;
        min-width: 64px;
        max-width: 84px;
        padding: 8px 8px 9px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        border-radius: 10px;
        background: linear-gradient(
          180deg,
          color-mix(in oklab, var(--c1) 7%, transparent),
          color-mix(in oklab, currentColor 3%, transparent)
        );
        border: 1px solid color-mix(in oklab, var(--c1) 18%, transparent);
        scroll-snap-align: start;
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease,
          transform 160ms ease;
      }
      .forecast-tile:hover {
        border-color: color-mix(in oklab, var(--c1) 45%, transparent);
        box-shadow:
          0 0 0 1px color-mix(in oklab, var(--c1) 25%, transparent),
          0 0 16px color-mix(in oklab, var(--c1) 28%, transparent);
      }
      .forecast-tile.is-today {
        border-color: color-mix(in oklab, var(--c1) 35%, transparent);
        box-shadow: 0 0 12px color-mix(in oklab, var(--c1) 18%, transparent);
      }
      .forecast-day {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--lirum-muted, #6b7894);
        font-weight: 600;
        line-height: 1;
      }
      .forecast-tile.is-today .forecast-day-label {
        color: var(--lirum-text, #eef3ff);
      }
      .now-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--c1);
        box-shadow: 0 0 6px color-mix(in oklab, var(--c1) 80%, transparent);
        animation: lirum-shimmer 2.4s ease-in-out infinite;
      }
      .forecast-icon {
        --mdc-icon-size: 22px;
        color: var(--lirum-text, #eef3ff);
        animation: lirum-glow-pulse 4.2s ease-in-out infinite;
      }
      .forecast-temp {
        font-size: 12px;
        color: var(--lirum-text, #eef3ff);
        font-variant-numeric: tabular-nums;
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        line-height: 1;
      }
      .t-high {
        font-weight: 600;
        color: var(--lirum-text, #eef3ff);
      }
      .t-sep {
        opacity: 0.5;
      }
      .t-low {
        color: color-mix(in oklab, currentColor 50%, transparent);
      }
    `,
  ];
}
