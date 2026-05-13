import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/slider';
import '../../core/chip';
import './climate-ring';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface ClimateConfig extends LirumBaseConfig {
  entity: string;
  show_temperature_control?: boolean;
  hvac_modes?: string[];
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.climate.tag,
  name: CARDS.climate.name,
  description: CARDS.climate.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

const MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:sync',
  auto: 'mdi:sync',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
};

const MODE_LABELS: Record<string, string> = {
  off: 'Off',
  heat: 'Heat',
  cool: 'Cool',
  heat_cool: 'Heat/Cool',
  auto: 'Auto',
  dry: 'Dry',
  fan_only: 'Fan',
};

function modeLabel(mode: string): string {
  if (MODE_LABELS[mode]) return MODE_LABELS[mode];
  return mode.charAt(0).toUpperCase() + mode.slice(1).replace(/_/g, ' ');
}

@customElement(CARDS.climate.tag)
export class LirumClimateCard extends LirumCardBase<ClimateConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./climate-editor');
    return document.createElement(CARDS.climate.editor);
  }

  public static getStubConfig(): Partial<ClimateConfig> {
    return { type: `custom:${CARDS.climate.tag}`, entity: '' };
  }

  public setConfig(config: ClimateConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const mode = state.state;
    const current =
      typeof state.attributes.current_temperature === 'number'
        ? (state.attributes.current_temperature as number)
        : undefined;
    const target =
      typeof state.attributes.temperature === 'number'
        ? (state.attributes.temperature as number)
        : undefined;
    const min =
      typeof state.attributes.min_temp === 'number'
        ? (state.attributes.min_temp as number)
        : 7;
    const max =
      typeof state.attributes.max_temp === 'number'
        ? (state.attributes.max_temp as number)
        : 35;
    const step =
      typeof state.attributes.target_temp_step === 'number'
        ? (state.attributes.target_temp_step as number)
        : 0.5;
    const unit =
      typeof state.attributes.unit_of_measurement === 'string'
        ? (state.attributes.unit_of_measurement as string)
        : '°C';
    const action =
      typeof state.attributes.hvac_action === 'string'
        ? (state.attributes.hvac_action as string)
        : 'idle';
    const allModes = Array.isArray(state.attributes.hvac_modes)
      ? (state.attributes.hvac_modes as string[])
      : ['off', 'heat', 'cool'];
    const configured = this._config.hvac_modes;
    const shownModes =
      configured && configured.length > 0
        ? configured.filter((m) => allModes.includes(m))
        : allModes;

    const iconColor =
      action === 'heating' ? 'warm' : action === 'cooling' ? 'cool' : 'neutral';
    const iconActive = mode !== 'off';
    const iconPulse = action === 'heating' || action === 'cooling';
    const unavailable = this._isUnavailable();

    const secondary = `${current !== undefined ? current.toFixed(1) : '–'} → ${
      target !== undefined ? target.toFixed(1) : '–'
    } ${unit}`;

    const trailing = html`<lirum-climate-ring
      .current=${current ?? 0}
      .target=${target ?? 0}
      .min=${min}
      .max=${max}
      .action=${action}
      .unit=${unit}
    ></lirum-climate-ring>`;

    const showTempControl = this._config.show_temperature_control !== false;

    const modeRow =
      shownModes.length > 0
        ? html`<div class="lirum-chip-row">
            ${shownModes.map(
              (m) => html`<lirum-chip
                .icon=${MODE_ICONS[m] ?? 'mdi:circle-outline'}
                .label=${modeLabel(m)}
                ?active=${m === mode}
                ?disabled=${unavailable}
                @click=${(): void => this._setMode(m)}
              ></lirum-chip>`,
            )}
          </div>`
        : nothing;

    const tempSlider = showTempControl
      ? html`<lirum-slider
          .value=${target ?? min}
          .min=${min}
          .max=${max}
          .step=${step}
          .unit=${unit}
          .showValue=${true}
          colorRamp="warm"
          ?disabled=${unavailable}
          @change=${this._onTargetChange}
        ></lirum-slider>`
      : nothing;

    const hasControls = modeRow !== nothing || tempSlider !== nothing;
    const controls = hasControls ? html`${modeRow}${tempSlider}` : undefined;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive,
      iconPulse,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary,
      trailing,
      controls,
    });
  }

  private _setMode(mode: string): void {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('climate', 'set_hvac_mode', {
      entity_id: this._config.entity,
      hvac_mode: mode,
    });
  }

  private _onTargetChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this._config.entity,
      temperature: e.detail.value,
    });
  };
}
