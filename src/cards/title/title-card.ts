import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';

export interface TitleConfig extends LirumBaseConfig {
  type: string;
  title?: string;
  subtitle?: string;
  alignment?: 'start' | 'center' | 'end';
  background?: string;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.title.tag,
  name: CARDS.title.name,
  description: CARDS.title.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.title.tag)
export class LirumTitleCard extends LirumCardBase<TitleConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./title-editor');
    return document.createElement(CARDS.title.editor);
  }

  public static getStubConfig(): Partial<TitleConfig> {
    return { type: `custom:${CARDS.title.tag}`, title: 'Section title' };
  }

  public setConfig(config: TitleConfig): void {
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 1;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const alignment = this._config.alignment ?? 'start';
    const cssVars = backgroundVars(this._config.background);
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-title-wrap align-${alignment}">
          ${this._config.title
            ? html`<div class="title">${this._config.title}</div>`
            : nothing}
          ${this._config.subtitle
            ? html`<div class="subtitle">${this._config.subtitle}</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .lirum-title-wrap {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 1.2;
        color: var(--lirum-text);
        letter-spacing: -0.3px;
      }

      .subtitle {
        font-size: 13px;
        color: var(--lirum-muted);
        line-height: 1.3;
      }

      .align-start {
        text-align: start;
        align-items: flex-start;
      }

      .align-center {
        text-align: center;
        align-items: center;
      }

      .align-end {
        text-align: end;
        align-items: flex-end;
      }
    `,
  ];
}
