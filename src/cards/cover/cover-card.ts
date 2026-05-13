import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { pickStubEntity, supportsFeature, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/slider';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface CoverConfig extends LirumBaseConfig {
  entity: string;
  show_buttons_control?: boolean;
  show_position_control?: boolean;
  show_tilt_position_control?: boolean;
}

const FEATURE_OPEN = 1;
const FEATURE_CLOSE = 2;
const FEATURE_SET_POSITION = 4;
const FEATURE_STOP = 8;
const FEATURE_SET_TILT_POSITION = 128;

(window.customCards = window.customCards ?? []).push({
  type: CARDS.cover.tag,
  name: CARDS.cover.name,
  description: CARDS.cover.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.cover.tag)
export class LirumCoverCard extends LirumCardBase<CoverConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./cover-editor');
    return document.createElement(CARDS.cover.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<CoverConfig> {
    const entity = pickStubEntity(hass, fallback, ['cover']);
    return { type: `custom:${CARDS.cover.tag}`, entity };
  }

  public setConfig(config: CoverConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const position =
      typeof state.attributes.current_position === 'number'
        ? (state.attributes.current_position as number)
        : undefined;
    const tiltPosition =
      typeof state.attributes.current_tilt_position === 'number'
        ? (state.attributes.current_tilt_position as number)
        : undefined;
    const s = state.state;
    const moving = s === 'opening' || s === 'closing';

    const iconColor = s === 'open' ? 'cool' : moving ? 'amber' : 'neutral';
    const iconActive = s !== 'closed';
    const iconPulse = moving;

    const secondary =
      position !== undefined
        ? `${position}%${moving ? ` · ${s}` : ''}`
        : s;

    const showButtons = this._config.show_buttons_control !== false;
    const showPosition = this._config.show_position_control !== false;
    const showTilt = this._config.show_tilt_position_control === true;

    const unavailable = this._isUnavailable();

    const buttonsRow =
      showButtons
        ? (() => {
            const chips: TemplateResult[] = [];
            if (supportsFeature(state, FEATURE_OPEN)) {
              chips.push(html`<lirum-chip
                icon="mdi:arrow-up"
                label="Open"
                ?active=${s === 'open' || s === 'opening'}
                ?disabled=${unavailable}
                @click=${this._open}
              ></lirum-chip>`);
            }
            if (supportsFeature(state, FEATURE_STOP)) {
              chips.push(html`<lirum-chip
                icon="mdi:stop"
                label="Stop"
                ?disabled=${unavailable}
                @click=${this._stop}
              ></lirum-chip>`);
            }
            if (supportsFeature(state, FEATURE_CLOSE)) {
              chips.push(html`<lirum-chip
                icon="mdi:arrow-down"
                label="Close"
                ?active=${s === 'closed' || s === 'closing'}
                ?disabled=${unavailable}
                @click=${this._close}
              ></lirum-chip>`);
            }
            return chips.length > 0 ? html`<div class="lirum-chip-row">${chips}</div>` : nothing;
          })()
        : nothing;

    const positionSlider =
      showPosition && supportsFeature(state, FEATURE_SET_POSITION) && position !== undefined
        ? html`<lirum-slider
            .value=${position}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${'%'}
            .showValue=${true}
            colorRamp="cool"
            ?disabled=${unavailable}
            @change=${this._onPositionChange}
          ></lirum-slider>`
        : nothing;

    const tiltSlider =
      showTilt && supportsFeature(state, FEATURE_SET_TILT_POSITION) && tiltPosition !== undefined
        ? html`<lirum-slider
            .value=${tiltPosition}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${'%'}
            .showValue=${true}
            colorRamp="cool"
            ?disabled=${unavailable}
            @change=${this._onTiltChange}
          ></lirum-slider>`
        : nothing;

    const hasControls =
      buttonsRow !== nothing || positionSlider !== nothing || tiltSlider !== nothing;
    const controls = hasControls
      ? html`${buttonsRow}${positionSlider}${tiltSlider}`
      : undefined;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive,
      iconPulse,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _open = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('cover', 'open_cover', { entity_id: this._config.entity });
  };

  private _close = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('cover', 'close_cover', { entity_id: this._config.entity });
  };

  private _stop = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('cover', 'stop_cover', { entity_id: this._config.entity });
  };

  private _onPositionChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('cover', 'set_cover_position', {
      entity_id: this._config.entity,
      position: e.detail.value,
    });
  };

  private _onTiltChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('cover', 'set_cover_tilt_position', {
      entity_id: this._config.entity,
      tilt_position: e.detail.value,
    });
  };
}
