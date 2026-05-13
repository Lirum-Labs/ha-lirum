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
  type: CARDS.lock.tag,
  name: CARDS.lock.name,
  description: CARDS.lock.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.lock.tag)
export class LirumLockCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./lock-editor');
    return document.createElement(CARDS.lock.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.lock.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const state = s.state;
    const isLocked = state === 'locked';
    const isUnlocked = state === 'unlocked';
    const unavailable = this._isUnavailable();
    const iconColor = isLocked ? 'energy' : 'alert';
    const iconActive = !isLocked;

    const controls = html`
      <lirum-chip
        icon="mdi:lock"
        label="Lock"
        colorRamp="energy"
        ?active=${isLocked}
        ?disabled=${unavailable}
        @click=${this._lock}
      ></lirum-chip>
      <lirum-chip
        icon="mdi:lock-open-variant"
        label="Unlock"
        colorRamp="alert"
        ?active=${isUnlocked}
        ?disabled=${unavailable}
        @click=${this._unlock}
      ></lirum-chip>
    `;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary: this._formattedState(),
      controls,
    });
  }

  private _lock = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('lock', 'lock', { entity_id: this._config.entity });
  };

  private _unlock = (): void => {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService('lock', 'unlock', { entity_id: this._config.entity });
  };
}
