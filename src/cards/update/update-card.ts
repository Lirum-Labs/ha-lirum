import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.update.tag,
  name: CARDS.update.name,
  description: CARDS.update.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.update.tag)
export class LirumUpdateCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./update-editor');
    return document.createElement(CARDS.update.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.update.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const installed = (state.attributes.installed_version as string | undefined) ?? '';
    const latest = (state.attributes.latest_version as string | undefined) ?? '';
    const updateAvailable = state.state === 'on';
    const secondary = updateAvailable ? `${installed} → ${latest}` : 'Up to date';

    const trailing = updateAvailable
      ? html`<lirum-chip
          icon="mdi:download"
          label="Install"
          @click=${this._install}
        ></lirum-chip>`
      : undefined;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: updateAvailable ? 'amber' : 'neutral',
      iconActive: updateAvailable,
      iconUnavailable: this._isUnavailable(),
      iconPulse: updateAvailable,
      primary: this._defaultPrimary(),
      secondary,
      trailing,
    });
  }

  private _install = (e: Event): void => {
    e.stopPropagation();
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('update', 'install', { entity_id: this._config.entity });
  };
}
