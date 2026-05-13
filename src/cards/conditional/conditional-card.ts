import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';

export type Condition =
  | { condition: 'state'; entity: string; state?: string; state_not?: string }
  | { condition: 'numeric_state'; entity: string; above?: number; below?: number }
  | { condition: 'screen'; media_query: string }
  | { condition: 'user'; users: string[] };

export interface ConditionalChildConfig {
  type: string;
  [key: string]: unknown;
}

export interface ConditionalConfig {
  type: string;
  conditions: Condition[];
  card: ConditionalChildConfig;
}

interface ConditionalChildElement extends HTMLElement {
  hass?: unknown;
  setConfig?: (config: Record<string, unknown>) => void;
  getCardSize?: () => number | Promise<number>;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.conditional.tag,
  name: CARDS.conditional.name,
  description: CARDS.conditional.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.conditional.tag)
export class LirumConditionalCard extends LirumCardBase<ConditionalConfig & LirumBaseConfig> {
  @state() private _childElement?: ConditionalChildElement;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./conditional-editor');
    return document.createElement(CARDS.conditional.editor);
  }

  public static getStubConfig(): Partial<ConditionalConfig> {
    return {
      type: `custom:${CARDS.conditional.tag}`,
      conditions: [],
      card: { type: 'entities', entities: [] },
    };
  }

  public setConfig(config: ConditionalConfig & LirumBaseConfig): void {
    if (!config || !config.card || !Array.isArray(config.conditions)) {
      throw new Error('Conditional card requires "card" and "conditions"');
    }
    super.setConfig(config);
  }

  public getCardSize(): number {
    const inner = this._childElement;
    if (inner?.getCardSize) {
      try {
        const size = inner.getCardSize();
        if (typeof size === 'number') return size;
      } catch {
        // Ignore: fall through to default size.
      }
    }
    return 1;
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._config) return;
    const cfg = this._config.card;
    const desiredTag = this._resolveTag(cfg.type);
    const existing = this._childElement;
    if (existing && existing.localName === desiredTag) {
      try {
        existing.setConfig?.(cfg as unknown as Record<string, unknown>);
      } catch {
        // Ignore: invalid child config — keep existing element.
      }
    } else {
      const created = this._createChild(cfg);
      if (created) {
        this._childElement = created;
      }
    }
    if (this._childElement) {
      this._childElement.hass = this.hass;
    }
  }

  private _resolveTag(type: string): string {
    if (typeof type !== 'string' || type.length === 0) return 'hui-error-card';
    if (type.startsWith('custom:')) return type.slice(7);
    return `hui-${type}-card`;
  }

  private _createChild(config: ConditionalChildConfig): ConditionalChildElement | null {
    const tag = this._resolveTag(config.type);
    try {
      const el = document.createElement(tag) as ConditionalChildElement;
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

  private _evaluate(): boolean {
    if (!this._config) return false;
    const conditions = this._config.conditions ?? [];
    for (const cond of conditions) {
      if (!this._matches(cond)) return false;
    }
    return true;
  }

  private _matches(cond: Condition): boolean {
    switch (cond.condition) {
      case 'state': {
        const stateObj = this.hass?.states[cond.entity];
        if (!stateObj) return false;
        if (cond.state_not !== undefined) return stateObj.state !== cond.state_not;
        if (cond.state !== undefined) return stateObj.state === cond.state;
        return true;
      }
      case 'numeric_state': {
        const stateObj = this.hass?.states[cond.entity];
        if (!stateObj) return false;
        const value = parseFloat(stateObj.state);
        if (Number.isNaN(value)) return false;
        if (cond.above !== undefined && !(value > cond.above)) return false;
        if (cond.below !== undefined && !(value < cond.below)) return false;
        return true;
      }
      case 'screen': {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
        try {
          return window.matchMedia(cond.media_query).matches;
        } catch {
          return false;
        }
      }
      case 'user': {
        const userId = this.hass?.user?.id;
        if (!userId) return false;
        return Array.isArray(cond.users) && cond.users.includes(userId);
      }
      default:
        return false;
    }
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    if (!this._evaluate()) return nothing;
    if (!this._childElement) return nothing;
    return html`${this._childElement}`;
  }
}
