import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/slider';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface HumidifierConfig extends LirumBaseConfig {
  entity: string;
  show_target_control?: boolean;
  show_mode_control?: boolean;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.humidifier.tag,
  name: CARDS.humidifier.name,
  description: CARDS.humidifier.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.humidifier.tag)
export class LirumHumidifierCard extends LirumCardBase<HumidifierConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./humidifier-editor');
    return document.createElement(CARDS.humidifier.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<HumidifierConfig> {
    const entity = pickStubEntity(hass, fallback, ['humidifier']);
    return { type: `custom:${CARDS.humidifier.tag}`, entity };
  }

  public setConfig(config: HumidifierConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const on = this._isActive();
    const target = typeof s.attributes.humidity === 'number' ? s.attributes.humidity : undefined;
    const current = typeof s.attributes.current_humidity === 'number' ? s.attributes.current_humidity : undefined;
    const min = typeof s.attributes.min_humidity === 'number' ? s.attributes.min_humidity : 30;
    const max = typeof s.attributes.max_humidity === 'number' ? s.attributes.max_humidity : 80;
    const mode = typeof s.attributes.mode === 'string' ? s.attributes.mode : undefined;
    const modes = Array.isArray(s.attributes.available_modes)
      ? (s.attributes.available_modes as string[])
      : [];

    const showTarget = this._config.show_target_control !== false;
    const showMode = this._config.show_mode_control !== false;

    const secondary = `${current ?? '–'}% → ${target ?? '–'}%`;

    let controls: TemplateResult | undefined;
    if (showTarget || showMode) {
      const targetSlider = showTarget
        ? html`<lirum-slider
            .value=${target ?? min}
            .min=${min}
            .max=${max}
            .step=${1}
            .unit=${'%'}
            .showValue=${true}
            colorRamp="rose"
            @change=${this._onTargetChange}
          ></lirum-slider>`
        : nothing;

      const modeRow = showMode && modes.length > 0
        ? html`<div class="lirum-chip-row">
            ${modes.map(
              (m) => html`<lirum-chip
                .label=${this._capitalize(m)}
                ?active=${m === mode}
                ?disabled=${this._isUnavailable()}
                @click=${(): void => this._setMode(m)}
              ></lirum-chip>`,
            )}
          </div>`
        : nothing;

      controls = html`${targetSlider}${modeRow}`;
    }

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: on ? 'rose' : 'neutral',
      iconActive: on,
      iconPulse: on,
      iconUnavailable: this._isUnavailable(),
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _capitalize(s: string): string {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private _onTargetChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('humidifier', 'set_humidity', {
      entity_id: this._config.entity,
      humidity: e.detail.value,
    });
  };

  private _setMode(mode: string): void {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('humidifier', 'set_mode', {
      entity_id: this._config.entity,
      mode,
    });
  }
}
