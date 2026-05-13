import { customElement } from 'lit/decorators.js';
import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/icon-display';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface CameraConfig extends LirumBaseConfig {
  entity: string;
  aspect_ratio?: string;
  show_state?: boolean;
  show_name?: boolean;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.camera.tag,
  name: CARDS.camera.name,
  description: CARDS.camera.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

function aspectPadding(ratio: string): string {
  const parts = ratio.split(':').map((p) => Number(p.trim()));
  if (parts.length !== 2 || !parts[0] || !parts[1] || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) {
    return '56.25%';
  }
  return `${(parts[1] / parts[0]) * 100}%`;
}

@customElement(CARDS.camera.tag)
export class LirumCameraCard extends LirumCardBase<CameraConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./camera-editor');
    return document.createElement(CARDS.camera.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<CameraConfig> {
    const entity = pickStubEntity(hass, fallback, ['camera']);
    return { type: `custom:${CARDS.camera.tag}`, entity };
  }

  public setConfig(config: CameraConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 3;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const picture = state.attributes.entity_picture as string | undefined;
    const aspect = this._config.aspect_ratio ?? '16:9';
    const padding = aspectPadding(aspect);
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const cssVars = backgroundVars(this._config.background);
    const s = state.state;
    const live = s === 'recording' || s === 'streaming';
    const name = this._defaultPrimary();
    const stateLabel = this._formattedState();

    const media = picture
      ? html`<img class="snapshot" src=${picture} alt=${name} />`
      : html`<div class="placeholder">
          <lirum-icon
            .icon=${this._defaultIcon() || 'mdi:video'}
            .colorRamp=${this._config.icon_color ?? 'cool'}
            .unavailable=${this._isUnavailable()}
          ></lirum-icon>
          <div class="placeholder-text">${stateLabel}</div>
        </div>`;

    const namePill = showName
      ? html`<div class="pill name-pill">${name}</div>`
      : nothing;

    const statePill = showState
      ? html`<div class="pill state-pill">
          ${live ? html`<span class="live-dot lirum-anim"></span>` : nothing}
          <span>${stateLabel}</span>
        </div>`
      : nothing;

    const overlay = showName || showState
      ? html`<div class="overlay">${namePill}${statePill}</div>`
      : nothing;

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root">
          <div class="frame" style=${styleMap({ paddingBottom: padding })}>
            <div class="inner">${media}${overlay}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .frame {
        position: relative;
        width: 100%;
        height: 0;
        overflow: hidden;
      }
      .inner {
        position: absolute;
        inset: 0;
        display: block;
      }
      .snapshot {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--lirum-muted);
        background: color-mix(in oklab, currentColor 6%, transparent);
      }
      .placeholder-text {
        font-size: 12px;
        color: var(--lirum-muted);
      }
      .overlay {
        position: absolute;
        left: 10px;
        bottom: 10px;
        display: flex;
        gap: 6px;
        align-items: center;
        max-width: calc(100% - 20px);
      }
      .pill {
        background: color-mix(in oklab, black 50%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 999px;
        padding: 4px 10px;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name-pill {
        font-weight: 600;
      }
      .state-pill {
        font-weight: 500;
        text-transform: capitalize;
      }
      .live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff3b4b;
        box-shadow: 0 0 6px rgba(255, 59, 75, 0.8);
        animation: lirum-pulse 1.2s ease-in-out infinite;
        flex-shrink: 0;
      }
    `,
  ];
}
