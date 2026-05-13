import { customElement } from 'lit/decorators.js';
import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
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

  public static getStubConfig(): Partial<WeatherConfig> {
    return { type: `custom:${CARDS.weather.tag}`, entity: '' };
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
        ? html`<div class="forecast">
            ${forecast.slice(0, Math.max(0, forecastDays)).map((entry) => {
              const day = shortDate(entry.datetime);
              const cond = entry.condition ?? '';
              const dayIcon = WEATHER_ICONS[cond] ?? 'mdi:weather-partly-cloudy';
              const high =
                typeof entry.temperature === 'number'
                  ? Math.round(entry.temperature)
                  : undefined;
              const low =
                typeof entry.templow === 'number' ? Math.round(entry.templow) : undefined;
              const tempLabel =
                high !== undefined && low !== undefined
                  ? `${high}°/${low}°`
                  : high !== undefined
                    ? `${high}°`
                    : low !== undefined
                      ? `${low}°`
                      : '–';
              return html`<div class="forecast-tile">
                <div class="forecast-day">${day}</div>
                <ha-icon class="forecast-icon" icon=${dayIcon}></ha-icon>
                <div class="forecast-temp">${tempLabel}</div>
              </div>`;
            })}
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
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        padding-top: 8px;
        border-top: 1px solid color-mix(in oklab, currentColor 6%, transparent);
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
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
      .forecast {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 8px 0 2px;
        border-top: 1px solid color-mix(in oklab, currentColor 6%, transparent);
        scrollbar-width: thin;
      }
      .forecast-tile {
        flex: 0 0 auto;
        min-width: 56px;
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        border-radius: 10px;
        background: color-mix(in oklab, currentColor 5%, transparent);
        border: 1px solid color-mix(in oklab, currentColor 8%, transparent);
      }
      .forecast-day {
        font-size: 10px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--lirum-muted, #6b7894);
        font-weight: 600;
      }
      .forecast-icon {
        --mdc-icon-size: 22px;
        color: var(--lirum-text, #eef3ff);
      }
      .forecast-temp {
        font-size: 12px;
        color: var(--lirum-text, #eef3ff);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}
