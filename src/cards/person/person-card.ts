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
  type: CARDS.person.tag,
  name: CARDS.person.name,
  description: CARDS.person.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.person.tag)
export class LirumPersonCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./person-editor');
    return document.createElement(CARDS.person.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.person.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const entityPicture = state.attributes.entity_picture as string | undefined;
    const unavailable = this._isUnavailable();
    const active = this._isActive();
    const iconColor = state.state === 'home' ? 'energy' : unavailable ? 'neutral' : 'cool';

    return this._renderTile({
      ...(entityPicture ? { iconPicture: entityPicture } : { icon: this._defaultIcon() }),
      iconColor,
      iconActive: active,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary: this._formattedState(),
    });
  }
}
