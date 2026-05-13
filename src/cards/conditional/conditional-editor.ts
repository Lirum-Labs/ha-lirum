import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { ConditionalConfig } from './conditional-card';

const SCHEMA: SchemaItem[] = [
  { name: 'conditions', selector: { object: {} } },
  { name: 'card', selector: { object: {} } },
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  conditions: 'Conditions (YAML list)',
  card: 'Inner card (YAML)',
};

@customElement(CARDS.conditional.editor)
export class LirumConditionalEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ConditionalConfig;

  public setConfig(config: ConditionalConfig): void {
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
        detail: { config: (e.detail as { value: ConditionalConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
