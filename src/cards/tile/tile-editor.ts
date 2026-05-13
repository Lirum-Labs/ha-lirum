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
import type { TileConfig } from './tile-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead([]),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'label', selector: { text: {} } },
      { name: 'unit', selector: { text: {} } },
      { name: 'decimals', selector: { number: { mode: 'box', min: 0, max: 4, step: 1 } } },
      { name: 'show_spark', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  label: 'Caption (under number)',
  unit: 'Unit override',
  decimals: 'Decimal precision',
  show_spark: 'Show sparkline',
};

@customElement(CARDS.tile.editor)
export class LirumTileEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: TileConfig;

  public setConfig(config: TileConfig): void {
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
        detail: { config: (e.detail as { value: TileConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
