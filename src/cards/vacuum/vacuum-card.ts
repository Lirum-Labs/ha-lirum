import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { supportsFeature, type LirumBaseConfig } from '../../core/hass';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface VacuumConfig extends LirumBaseConfig {
  entity: string;
  show_control?: boolean;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.vacuum.tag,
  name: CARDS.vacuum.name,
  description: CARDS.vacuum.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.vacuum.tag)
export class LirumVacuumCard extends LirumCardBase<VacuumConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./vacuum-editor');
    return document.createElement(CARDS.vacuum.editor);
  }

  public static getStubConfig(): Partial<VacuumConfig> {
    return { type: `custom:${CARDS.vacuum.tag}`, entity: '' };
  }

  public setConfig(config: VacuumConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const state = s.state;
    const cleaning = state === 'cleaning';
    const returning = state === 'returning';
    const battery = typeof s.attributes.battery_level === 'number'
      ? (s.attributes.battery_level as number)
      : undefined;
    const unavailable = this._isUnavailable();

    const iconColor = cleaning
      ? 'energy'
      : returning
        ? 'amber'
        : state === 'error'
          ? 'alert'
          : 'neutral';

    const secondary = [
      battery !== undefined ? `${battery}%` : null,
      this._formattedState(),
    ]
      .filter(Boolean)
      .join(' · ');

    const showControl = this._config.show_control !== false;

    let controls: TemplateResult | undefined;
    if (showControl) {
      const chips: TemplateResult[] = [];
      if (supportsFeature(s, 8192)) {
        chips.push(html`<lirum-chip
          icon="mdi:play"
          label="Start"
          colorRamp="energy"
          ?active=${cleaning}
          ?disabled=${unavailable}
          @click=${this._start}
        ></lirum-chip>`);
      }
      if (supportsFeature(s, 4)) {
        chips.push(html`<lirum-chip
          icon="mdi:pause"
          label="Pause"
          colorRamp="amber"
          ?active=${state === 'paused'}
          ?disabled=${unavailable}
          @click=${this._pause}
        ></lirum-chip>`);
      }
      if (supportsFeature(s, 8)) {
        chips.push(html`<lirum-chip
          icon="mdi:stop"
          label="Stop"
          colorRamp="alert"
          ?disabled=${unavailable}
          @click=${this._stop}
        ></lirum-chip>`);
      }
      if (supportsFeature(s, 16)) {
        chips.push(html`<lirum-chip
          icon="mdi:home-import-outline"
          label="Return"
          colorRamp="amber"
          ?active=${returning}
          ?disabled=${unavailable}
          @click=${this._returnToBase}
        ></lirum-chip>`);
      }
      if (supportsFeature(s, 512)) {
        chips.push(html`<lirum-chip
          icon="mdi:map-marker"
          label="Locate"
          colorRamp="cool"
          ?disabled=${unavailable}
          @click=${this._locate}
        ></lirum-chip>`);
      }
      if (chips.length > 0) {
        controls = html`<div class="lirum-chip-row">${chips}</div>`;
      }
    }

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive: cleaning || returning,
      iconPulse: cleaning,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _start = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('vacuum', 'start', { entity_id: this._config.entity });
  };

  private _pause = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('vacuum', 'pause', { entity_id: this._config.entity });
  };

  private _stop = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('vacuum', 'stop', { entity_id: this._config.entity });
  };

  private _returnToBase = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('vacuum', 'return_to_base', { entity_id: this._config.entity });
  };

  private _locate = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('vacuum', 'locate', { entity_id: this._config.entity });
  };
}
