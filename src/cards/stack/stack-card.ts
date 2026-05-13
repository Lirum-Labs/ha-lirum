import { css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';

export interface StackChildConfig {
  type: string;
  [key: string]: unknown;
}

export interface StackConfig {
  type: string;
  cards: StackChildConfig[];
  direction?: 'horizontal' | 'vertical';
  gap?: number;
  background?: string;
  title?: string;
}

interface StackChildElement extends HTMLElement {
  hass?: unknown;
  setConfig?: (config: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.stack.tag,
  name: CARDS.stack.name,
  description: CARDS.stack.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.stack.tag)
export class LirumStackCard extends LirumCardBase<StackConfig & LirumBaseConfig> {
  @state() private _childElements: StackChildElement[] = [];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./stack-editor');
    return document.createElement(CARDS.stack.editor);
  }

  public static getStubConfig(): Partial<StackConfig> {
    return { type: `custom:${CARDS.stack.tag}`, cards: [] };
  }

  public setConfig(config: StackConfig & LirumBaseConfig): void {
    if (!config || !Array.isArray(config.cards)) {
      throw new Error('Stack card requires a "cards" array');
    }
    super.setConfig(config);
  }

  public getCardSize(): number {
    return this._config?.cards.length ?? 1;
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._config) return;
    const cards = this._config.cards;
    const next: StackChildElement[] = [];
    let mutated = false;
    for (let i = 0; i < cards.length; i++) {
      const cfg = cards[i] as StackChildConfig;
      const desiredTag = this._resolveTag(cfg.type);
      const existing = this._childElements[i];
      if (existing && existing.localName === desiredTag) {
        try {
          existing.setConfig?.(cfg as unknown as Record<string, unknown>);
        } catch {
          // Ignore: invalid child config — keep existing element.
        }
        next.push(existing);
      } else {
        const created = this._createChild(cfg);
        if (created) {
          next.push(created);
          mutated = true;
        }
      }
    }
    if (next.length !== this._childElements.length) mutated = true;
    if (mutated) {
      this._childElements = next;
    }
    for (const el of next) {
      el.hass = this.hass;
    }
  }

  private _resolveTag(type: string): string {
    if (typeof type !== 'string' || type.length === 0) return 'hui-error-card';
    if (type.startsWith('custom:')) return type.slice(7);
    return `hui-${type}-card`;
  }

  private _createChild(config: StackChildConfig): StackChildElement | null {
    const tag = this._resolveTag(config.type);
    try {
      const el = document.createElement(tag) as StackChildElement;
      try {
        el.setConfig?.(config as unknown as Record<string, unknown>);
      } catch {
        // Swallow child setConfig errors — element still renders.
      }
      return el;
    } catch {
      return null;
    }
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const direction = this._config.direction ?? 'vertical';
    const gap = this._config.gap ?? 12;
    const cssVars = backgroundVars(this._config.background);
    const stackStyles = {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      gap: `${gap}px`,
      padding: '12px',
    };
    return html`
      <ha-card style=${styleMap(cssVars)}>
        ${this._config.title
          ? html`<div class="stack-title">${this._config.title}</div>`
          : nothing}
        <div class="stack-wrap" style=${styleMap(stackStyles)}>
          ${this._childElements.map((c) => html`${c}`)}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .stack-title {
        padding: 12px 16px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--lirum-text);
        letter-spacing: -0.2px;
      }

      .stack-wrap {
        min-width: 0;
      }

      .stack-wrap > * {
        min-width: 0;
        flex: 1 1 auto;
      }
    `,
  ];
}
