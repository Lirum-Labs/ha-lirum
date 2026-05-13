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
import type { LightConfig } from './light-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['light']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'use_light_color', selector: { boolean: {} } },
      { name: 'show_brightness_control', selector: { boolean: {} } },
      { name: 'show_color_temp_control', selector: { boolean: {} } },
      { name: 'show_color_control', selector: { boolean: {} } },
      { name: 'collapsible_controls', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  use_light_color: 'Derive icon color from light',
  show_brightness_control: 'Show brightness slider',
  show_color_temp_control: 'Show color-temp slider',
  show_color_control: 'Show color picker',
  collapsible_controls: 'Collapsible controls',
};

@customElement(CARDS.light.editor)
export class LirumLightEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: LightConfig;

  public setConfig(config: LightConfig): void {
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
        detail: { config: (e.detail as { value: LightConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
