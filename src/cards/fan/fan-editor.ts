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
import type { FanConfig } from './fan-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['fan']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'show_percentage_control', selector: { boolean: {} } },
      { name: 'show_oscillate_control', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  show_percentage_control: 'Show speed slider',
  show_oscillate_control: 'Show oscillate chip',
};

@customElement(CARDS.fan.editor)
export class LirumFanEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: FanConfig;

  public setConfig(config: FanConfig): void {
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
        detail: { config: (e.detail as { value: FanConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
