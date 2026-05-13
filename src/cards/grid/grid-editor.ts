import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { GridConfig } from './grid-card';

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  columns: 'Columns',
  gap: 'Gap (px)',
  square: 'Square cells',
  cards: 'Cards',
};

const SCHEMA: SchemaItem[] = [
  { name: 'title', selector: { text: {} } },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'columns', selector: { number: { min: 1, max: 6, mode: 'box' } } },
      { name: 'gap', selector: { number: { min: 0, max: 64, mode: 'box' } } },
    ],
  },
  { name: 'square', selector: { boolean: {} } },
  { name: 'background', selector: { text: {} } },
  { name: 'cards', selector: { object: {} } },
];

@customElement(CARDS.grid.editor)
export class LirumGridEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GridConfig;

  public setConfig(config: GridConfig): void {
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
        detail: { config: (e.detail as { value: GridConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
