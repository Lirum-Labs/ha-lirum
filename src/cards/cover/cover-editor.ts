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
import type { CoverConfig } from './cover-card';

const SCHEMA: SchemaItem[] = [
  ...entityHead(['cover']),
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'show_buttons_control', selector: { boolean: {} } },
      { name: 'show_position_control', selector: { boolean: {} } },
      { name: 'show_tilt_position_control', selector: { boolean: {} } },
    ],
  },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  show_buttons_control: 'Show open/stop/close buttons',
  show_position_control: 'Show position slider',
  show_tilt_position_control: 'Show tilt position slider',
};

@customElement(CARDS.cover.editor)
export class LirumCoverEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: CoverConfig;

  public setConfig(config: CoverConfig): void {
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
        detail: { config: (e.detail as { value: CoverConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
