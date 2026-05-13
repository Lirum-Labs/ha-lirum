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
import type { GaugeConfig } from './gauge-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['sensor', 'input_number', 'number']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'min', selector: { number: { mode: 'box' } } },
      { name: 'max', selector: { number: { mode: 'box' } } },
      { name: 'size', selector: { number: { mode: 'box', min: 80, max: 600, step: 10 } } },
    ],
  },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'unit', selector: { text: {} } },
      { name: 'label', selector: { text: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  min: 'Minimum',
  max: 'Maximum',
  size: 'Size (px)',
  unit: 'Unit override',
  label: 'Inner label',
};

@customElement(CARDS.gauge.editor)
export class LirumGaugeEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GaugeConfig;

  public setConfig(config: GaugeConfig): void {
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
        detail: { config: (e.detail as { value: GaugeConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
