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
import type { SliderConfig } from './slider-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead([]),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'min', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'max', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'step', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'unit', selector: { text: {} } },
    ],
  },
  { name: 'service', selector: { text: {} } },
  { name: 'service_key', selector: { text: {} } },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  min: 'Minimum',
  max: 'Maximum',
  step: 'Step',
  unit: 'Unit (overrides entity unit)',
  service: 'Write service (e.g. input_number.set_value)',
  service_key: 'Service data key (default: value)',
};

@customElement(CARDS.slider.editor)
export class LirumSliderEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: SliderConfig;

  public setConfig(config: SliderConfig): void {
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
        detail: { config: (e.detail as { value: SliderConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
