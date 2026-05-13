import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { StackConfig } from './stack-card';

const SCHEMA: SchemaItem[] = [
  { name: 'title', selector: { text: {} } },
  {
    name: 'direction',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' },
        ],
      },
    },
  },
  { name: 'gap', selector: { number: { min: 0, max: 64, step: 1, mode: 'box' } } },
  { name: 'background', selector: { text: {} } },
  { name: 'cards', selector: { object: {} } },
];

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  direction: 'Direction',
  gap: 'Gap (px)',
  cards: 'Cards (YAML list)',
};

@customElement(CARDS.stack.editor)
export class LirumStackEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: StackConfig;

  public setConfig(config: StackConfig): void {
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
        detail: { config: (e.detail as { value: StackConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
