import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { ChipsConfig } from './chips-card';

const SCHEMA: SchemaItem[] = [
  { name: 'chips', selector: { object: {} } },
  {
    name: 'alignment',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' },
          { value: 'justify', label: 'Justify' },
        ],
      },
    },
  },
];

@customElement(CARDS.chips.editor)
export class LirumChipsEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ChipsConfig;

  public setConfig(config: ChipsConfig): void {
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

  private _computeLabel = (item: SchemaItem): string => COMMON_LABELS[item.name] ?? item.name;

  private _changed(e: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: (e.detail as { value: ChipsConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
