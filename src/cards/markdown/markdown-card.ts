import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/markdown';

export interface MarkdownConfig extends LirumBaseConfig {
  type: string;
  content: string;
  title?: string;
  text_align?: 'start' | 'center' | 'end';
  background?: string;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.markdown.tag,
  name: CARDS.markdown.name,
  description: CARDS.markdown.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

const STATES_RE = /\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;
const STATE_ATTR_RE = /\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;

@customElement(CARDS.markdown.tag)
export class LirumMarkdownCard extends LirumCardBase<MarkdownConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./markdown-editor');
    return document.createElement(CARDS.markdown.editor);
  }

  public static getStubConfig(): Partial<MarkdownConfig> {
    return {
      type: `custom:${CARDS.markdown.tag}`,
      content: '## Hello\n\nWrite **markdown** here.',
    };
  }

  public setConfig(config: MarkdownConfig): void {
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 2;
  }

  private _interpolate(s: string): string {
    if (!s) return '';
    let out = s.replace(STATE_ATTR_RE, (_m, entityId: string, attr: string) => {
      const st = this.hass?.states[entityId];
      if (!st) return '';
      const v = st.attributes[attr];
      return v === undefined || v === null ? '' : String(v);
    });
    out = out.replace(STATES_RE, (_m, entityId: string) => {
      const st = this.hass?.states[entityId];
      return st ? st.state : 'unknown';
    });
    return out;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const align = this._config.text_align ?? 'start';
    const cssVars = backgroundVars(this._config.background);
    const content = this._interpolate(this._config.content ?? '');
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-md-wrap" style=${styleMap({ textAlign: align })}>
          ${this._config.title
            ? html`<div class="md-title">${this._config.title}</div>`
            : nothing}
          <lirum-markdown .content=${content}></lirum-markdown>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .lirum-md-wrap {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .md-title {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
        color: var(--lirum-text);
        letter-spacing: -0.3px;
      }
    `,
  ];
}
