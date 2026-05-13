import { customElement, state } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/button';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface SceneConfig extends LirumBaseConfig {
  entity: string;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.scene.tag,
  name: CARDS.scene.name,
  description: CARDS.scene.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  if (!Number.isFinite(diff) || diff < 0) return 'just now';
  const sec = Math.floor(diff / 1000);
  if (sec < 45) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `activated ${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `activated ${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `activated ${day}d ago`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `activated ${mon}mo ago`;
  const yr = Math.floor(day / 365);
  return `activated ${yr}y ago`;
}

@customElement(CARDS.scene.tag)
export class LirumSceneCard extends LirumCardBase<SceneConfig> {
  @state() private _busy = false;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./scene-editor');
    return document.createElement(CARDS.scene.editor);
  }

  public static getStubConfig(): Partial<SceneConfig> {
    return { type: `custom:${CARDS.scene.tag}`, entity: '' };
  }

  public setConfig(config: SceneConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    const next: SceneConfig = { ...config };
    if (!next.tap_action) {
      next.tap_action = {
        action: 'call-service',
        service: 'scene.turn_on',
        target: { entity_id: config.entity },
      };
    }
    super.setConfig(next);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const lastActivated = state.state;
    let secondary = 'Never activated';
    if (lastActivated && lastActivated !== 'unknown' && lastActivated !== 'unavailable') {
      const d = new Date(lastActivated);
      if (!Number.isNaN(d.getTime())) {
        secondary = formatRelative(d);
      }
    }

    const icon = this._defaultIcon();
    const colorRamp = this._config.icon_color ?? 'rose';
    const label = this._defaultPrimary();
    const cssVars = backgroundVars(this._config.background);

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root" @click=${this._onTap}>
          <lirum-button
            icon=${icon}
            label=${label}
            secondary=${secondary}
            colorRamp=${colorRamp}
            .busy=${this._busy}
          ></lirum-button>
        </div>
      </ha-card>
    `;
  }

  private _onTap = (): void => {
    this._busy = true;
    window.setTimeout(() => {
      this._busy = false;
    }, 700);
  };
}
