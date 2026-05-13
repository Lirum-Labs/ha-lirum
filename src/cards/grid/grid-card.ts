import { css, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import { propagateBackground, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';

export interface GridConfig {
  type: string;
  cards: Array<Record<string, unknown> & { type: string }>;
  columns?: number;
  gap?: number;
  square?: boolean;
  title?: string;
  background?: string;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.grid.tag,
  name: CARDS.grid.name,
  description: CARDS.grid.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

interface HassLitElement extends HTMLElement {
  hass?: HomeAssistant;
  setConfig?: (config: Record<string, unknown>) => void;
}

@customElement(CARDS.grid.tag)
export class LirumGridCard extends LirumCardBase<GridConfig & LirumBaseConfig> {
  @state() private _childElements: HTMLElement[] = [];
  private _builtFromCards?: Array<Record<string, unknown>>;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./grid-editor');
    return document.createElement(CARDS.grid.editor);
  }

  public static getStubConfig(): Partial<GridConfig> {
    return { type: `custom:${CARDS.grid.tag}`, cards: [], columns: 2 };
  }

  public setConfig(config: GridConfig & LirumBaseConfig): void {
    if (!config || !Array.isArray(config.cards)) {
      throw new Error('grid card requires a "cards" array');
    }
    super.setConfig(config as GridConfig & LirumBaseConfig);
  }

  public getCardSize(): number {
    const columns = this._config?.columns ?? 2;
    const count = this._config?.cards?.length ?? 0;
    return Math.ceil(count / columns);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const cards = this._config?.cards ?? [];
    if (cards !== this._builtFromCards) {
      this._builtFromCards = cards;
      const parentBg = this._config?.background;
      this._childElements = cards.map((c) => this._createChild(propagateBackground(parentBg, c)));
    }
    for (const el of this._childElements) {
      (el as HassLitElement).hass = this.hass;
    }
  }

  private _resolveTag(type: string): string {
    if (!type) return 'hui-error-card';
    if (type.startsWith('custom:')) return type.slice('custom:'.length);
    return `hui-${type}-card`;
  }

  private _createChild(cardConfig: Record<string, unknown> & { type: string }): HTMLElement {
    const tag = this._resolveTag(cardConfig.type);
    const el = document.createElement(tag) as HassLitElement;
    try {
      el.setConfig?.(cardConfig);
    } catch (err) {
      const fallback = document.createElement('hui-error-card') as HassLitElement;
      fallback.setConfig?.({
        type: 'error',
        error: err instanceof Error ? err.message : 'Failed to create card',
        origConfig: cardConfig,
      });
      return fallback;
    }
    return el;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const columns = this._config.columns ?? 2;
    const gap = this._config.gap ?? 12;
    const square = this._config.square === true;
    const cssVars = backgroundVars(this._config.background);
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
    };
    return html`
      <ha-card style=${styleMap(cssVars)}>
        ${this._config.title
          ? html`<div class="grid-title">${this._config.title}</div>`
          : nothing}
        <div class="grid" style=${styleMap(gridStyle)}>
          ${this._childElements.map((el) =>
            square
              ? html`<div class="cell-square">${el}</div>`
              : html`${el}`,
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .grid-title {
        padding: 10px 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--lirum-text);
      }

      .grid {
        padding: 12px;
        min-width: 0;
      }

      .grid > * {
        min-width: 0;
      }

      .cell-square {
        aspect-ratio: 1;
        display: grid;
        place-items: stretch;
        min-width: 0;
      }

      .cell-square > * {
        width: 100%;
        height: 100%;
        min-width: 0;
      }
    `,
  ];
}
