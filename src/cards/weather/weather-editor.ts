import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import {
  appearanceGroup,
  interactionGroup,
  entityHead,
  COMMON_LABELS,
  type SchemaItem,
} from '../../core/editor-utils';
import type { WeatherConfig } from './weather-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['weather']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'show_forecast', selector: { boolean: {} } },
      { name: 'forecast_days', selector: { number: { mode: 'box', min: 1, max: 7, step: 1 } } },
      { name: 'show_details', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  show_forecast: 'Show forecast strip',
  forecast_days: 'Forecast days (1–7)',
  show_details: 'Show humidity & wind row',
};

@customElement(CARDS.weather.editor)
export class LirumWeatherEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: WeatherConfig;

  public setConfig(config: WeatherConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `;
  }

  private _computeLabel = (item: SchemaItem): string => LABELS[item.name] ?? item.name;

  private _changed(e: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: (e.detail as { value: WeatherConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
