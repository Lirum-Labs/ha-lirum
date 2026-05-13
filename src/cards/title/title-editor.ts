import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { TitleConfig } from './title-card';

const SCHEMA: SchemaItem[] = [
  { name: 'title', selector: { text: {} } },
  { name: 'subtitle', selector: { text: {} } },
  {
    name: 'alignment',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' },
        ],
      },
    },
  },
  { name: 'background', selector: { text: {} } },
];

@customElement(CARDS.title.editor)
export class LirumTitleEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: TitleConfig;

  public setConfig(config: TitleConfig): void {
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
        detail: { config: (e.detail as { value: TitleConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
