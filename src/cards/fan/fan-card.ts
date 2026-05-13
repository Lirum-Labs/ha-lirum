import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { supportsFeature, type LirumBaseConfig } from '../../core/hass';
import '../../core/slider';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface FanConfig extends LirumBaseConfig {
  entity: string;
  show_percentage_control?: boolean;
  show_oscillate_control?: boolean;
}

const FAN_OSCILLATE = 2;

(window.customCards = window.customCards ?? []).push({
  type: CARDS.fan.tag,
  name: CARDS.fan.name,
  description: CARDS.fan.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.fan.tag)
export class LirumFanCard extends LirumCardBase<FanConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./fan-editor');
    return document.createElement(CARDS.fan.editor);
  }

  public static getStubConfig(): Partial<FanConfig> {
    return { type: `custom:${CARDS.fan.tag}`, entity: '' };
  }

  public setConfig(config: FanConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const on = this._isActive();
    const percentage = typeof s.attributes.percentage === 'number' ? s.attributes.percentage : 0;
    const oscillating = typeof s.attributes.oscillating === 'boolean' ? s.attributes.oscillating : false;

    const showPercentage = this._config.show_percentage_control !== false;
    const showOscillate = this._config.show_oscillate_control !== false;
    const canOscillate = supportsFeature(s, FAN_OSCILLATE);

    const secondary = on
      ? `${percentage}%${oscillating ? ' · oscillating' : ''}`
      : 'Off';

    let controls: TemplateResult | undefined;
    if (showPercentage || (showOscillate && canOscillate)) {
      const slider = showPercentage
        ? html`<lirum-slider
            .value=${percentage}
            .min=${0}
            .max=${100}
            .step=${5}
            .unit=${'%'}
            .showValue=${true}
            colorRamp="cool"
            ?disabled=${this._isUnavailable()}
            @change=${this._onPercentageChange}
          ></lirum-slider>`
        : nothing;

      const oscillateChip = showOscillate && canOscillate
        ? html`<div class="lirum-chip-row">
            <lirum-chip
              icon="mdi:angle-acute"
              label="Oscillate"
              ?active=${oscillating}
              ?disabled=${this._isUnavailable()}
              @click=${(): void => this._toggleOscillate(oscillating)}
            ></lirum-chip>
          </div>`
        : nothing;

      controls = html`${slider}${oscillateChip}`;
    }

    // Spin the fan icon at a rate proportional to the percentage:
    // 100% -> ~1s/rotation, 25% -> ~4s. Below 5% we leave it still.
    const spinning = on && percentage >= 5;
    const spinDuration = spinning ? Math.max(0.6, 4 - (percentage / 100) * 3) : 2;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: on ? 'cool' : 'neutral',
      iconActive: on,
      iconSpin: spinning,
      iconSpinDuration: spinDuration,
      iconUnavailable: this._isUnavailable(),
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _onPercentageChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('fan', 'set_percentage', {
      entity_id: this._config.entity,
      percentage: e.detail.value,
    });
  };

  private _toggleOscillate(current: boolean): void {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('fan', 'oscillate', {
      entity_id: this._config.entity,
      oscillating: !current,
    });
  }
}
