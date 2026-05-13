import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import {
  appearanceGroup,
  interactionGroup,
  COMMON_LABELS,
  type SchemaItem,
} from '../../core/editor-utils';
import type { TemplateConfig } from './template-card';

const SCHEMA: SchemaItem[] = [
  { name: 'entity', selector: { entity: {} } },
  { name: 'primary', selector: { text: { multiline: true } } },
  { name: 'secondary', selector: { text: { multiline: true } } },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'icon', selector: { text: {} } },
      { name: 'icon_color', selector: { text: {} } },
    ],
  },
  { name: 'picture', selector: { text: {} } },
  appearanceGroup(),
  interactionGroup(),
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  primary: 'Primary text (template)',
  secondary: 'Secondary text (template)',
  icon: 'Icon (mdi:… or template)',
  icon_color: 'Icon color (ramp or template)',
  picture: 'Picture URL (template)',
};

@customElement(CARDS.template.editor)
export class LirumTemplateEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: TemplateConfig;

  public setConfig(config: TemplateConfig): void {
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
        detail: { config: (e.detail as { value: TemplateConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
