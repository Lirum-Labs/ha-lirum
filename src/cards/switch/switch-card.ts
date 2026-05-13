import { customElement } from 'lit/decorators.js';
import { nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.switch.tag,
  name: CARDS.switch.name,
  description: CARDS.switch.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.switch.tag)
export class LirumSwitchCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./switch-editor');
    return document.createElement(CARDS.switch.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.switch.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);
    const active = this._isActive();
    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: active ? 'amber' : 'neutral',
      iconActive: active,
      iconUnavailable: this._isUnavailable(),
      iconPulse: active,
      primary: this._defaultPrimary(),
      secondary: this._formattedState(),
    });
  }
}
