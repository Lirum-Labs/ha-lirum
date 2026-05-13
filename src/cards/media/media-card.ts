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

export interface MediaConfig extends LirumBaseConfig {
  entity: string;
  show_volume_control?: boolean;
  show_transport_control?: boolean;
  show_mute_control?: boolean;
}

const FEATURE_PAUSE = 1;
const FEATURE_VOLUME_SET = 4;
const FEATURE_VOLUME_MUTE = 8;
const FEATURE_PREVIOUS_TRACK = 16;
const FEATURE_NEXT_TRACK = 32;

(window.customCards = window.customCards ?? []).push({
  type: CARDS.media.tag,
  name: CARDS.media.name,
  description: CARDS.media.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.media.tag)
export class LirumMediaCard extends LirumCardBase<MediaConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./media-editor');
    return document.createElement(CARDS.media.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<MediaConfig> {
    const entity = pickStubEntity(hass, fallback, ['media_player']);
    return { type: `custom:${CARDS.media.tag}`, entity };
  }

  public setConfig(config: MediaConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const playing = state.state === 'playing';
    const title = state.attributes.media_title as string | undefined;
    const artist = state.attributes.media_artist as string | undefined;
    const picture = state.attributes.entity_picture as string | undefined;
    const vol = (state.attributes.volume_level as number | undefined) ?? 0;
    const muted = (state.attributes.is_volume_muted as boolean | undefined) ?? false;
    const unavailable = this._isUnavailable();

    const showTransport = this._config.show_transport_control !== false;
    const showVolume = this._config.show_volume_control !== false;
    const showMute = this._config.show_mute_control !== false;

    const hasPrev = supportsFeature(state, FEATURE_PREVIOUS_TRACK);
    const hasNext = supportsFeature(state, FEATURE_NEXT_TRACK);
    const hasMute = supportsFeature(state, FEATURE_VOLUME_MUTE);
    const hasVolumeSet = supportsFeature(state, FEATURE_VOLUME_SET);
    const hasPause = supportsFeature(state, FEATURE_PAUSE);

    const transportRow = showTransport
      ? html`<div class="lirum-chip-row">
          ${hasPrev
            ? html`<lirum-chip
                icon="mdi:skip-previous"
                ?disabled=${unavailable}
                @click=${this._previous}
              ></lirum-chip>`
            : nothing}
          <lirum-chip
            .icon=${playing ? 'mdi:pause' : 'mdi:play'}
            ?disabled=${unavailable || (!playing && !hasPause && state.state !== 'paused' && state.state !== 'idle')}
            @click=${this._playPause}
          ></lirum-chip>
          ${hasNext
            ? html`<lirum-chip
                icon="mdi:skip-next"
                ?disabled=${unavailable}
                @click=${this._next}
              ></lirum-chip>`
            : nothing}
          ${showMute && hasMute
            ? html`<lirum-chip
                .icon=${muted ? 'mdi:volume-off' : 'mdi:volume-high'}
                ?active=${muted}
                ?disabled=${unavailable}
                @click=${this._toggleMute}
              ></lirum-chip>`
            : nothing}
        </div>`
      : nothing;

    const volumeSlider = showVolume && hasVolumeSet
      ? html`<lirum-slider
          .value=${Math.round(vol * 100)}
          .min=${0}
          .max=${100}
          .step=${1}
          .unit=${'%'}
          .showValue=${true}
          .disabled=${unavailable}
          colorRamp="rose"
          @change=${this._onVolumeChange}
        ></lirum-slider>`
      : nothing;

    const controls = showTransport || (showVolume && hasVolumeSet)
      ? html`${transportRow}${volumeSlider}`
      : undefined;

    const primary = title ?? this._defaultPrimary();
    const secondary = artist ?? this._formattedState();

    return this._renderTile({
      ...(picture ? { iconPicture: picture } : { icon: this._defaultIcon() }),
      iconColor: playing ? 'rose' : 'neutral',
      iconActive: playing,
      iconUnavailable: unavailable,
      primary,
      secondary,
      controls,
    });
  }

  private _previous = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('media_player', 'media_previous_track', {
      entity_id: this._config.entity,
    });
  };

  private _next = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('media_player', 'media_next_track', {
      entity_id: this._config.entity,
    });
  };

  private _playPause = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('media_player', 'media_play_pause', {
      entity_id: this._config.entity,
    });
  };

  private _toggleMute = (): void => {
    if (!this.hass || !this._config?.entity) return;
    const state = this._stateObj();
    const muted = (state?.attributes.is_volume_muted as boolean | undefined) ?? false;
    this.hass.callService('media_player', 'volume_mute', {
      entity_id: this._config.entity,
      is_volume_muted: !muted,
    });
  };

  private _onVolumeChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('media_player', 'volume_set', {
      entity_id: this._config.entity,
      volume_level: e.detail.value / 100,
    });
  };
}
