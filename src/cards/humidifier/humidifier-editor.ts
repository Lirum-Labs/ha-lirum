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
import type { HumidifierConfig } from './humidifier-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['humidifier']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'show_target_control', selector: { boolean: {} } },
      { name: 'show_mode_control', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  show_target_control: 'Show target slider',
  show_mode_control: 'Show mode chips',
};

@customElement(CARDS.humidifier.editor)
export class LirumHumidifierEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: HumidifierConfig;

  public setConfig(config: HumidifierConfig): void {
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
        detail: { config: (e.detail as { value: HumidifierConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
