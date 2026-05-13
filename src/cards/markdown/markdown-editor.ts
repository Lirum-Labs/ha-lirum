import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { CARDS } from '../../const';
import { COMMON_LABELS, type SchemaItem } from '../../core/editor-utils';
import type { MarkdownConfig } from './markdown-card';

const SCHEMA: SchemaItem[] = [
  { name: 'title', selector: { text: {} } },
  { name: 'content', selector: { text: { multiline: true } } },
  {
    name: 'text_align',
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

const LABELS: Record<string, string> = {
  ...COMMON_LABELS,
  content: 'Markdown content',
  text_align: 'Text alignment',
};

@customElement(CARDS.markdown.editor)
export class LirumMarkdownEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: MarkdownConfig;

  public setConfig(config: MarkdownConfig): void {
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
        detail: { config: (e.detail as { value: MarkdownConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
