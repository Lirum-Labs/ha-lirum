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
  type: CARDS.template.tag,
  name: CARDS.template.name,
  description: CARDS.template.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

export interface TemplateConfig extends LirumBaseConfig {
  entity?: string;
  primary?: string;
  secondary?: string;
  icon?: string;
  icon_color?: string;
  picture?: string;
}

const STATES_RE = /\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;
const STATE_ATTR_RE = /\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;

@customElement(CARDS.template.tag)
export class LirumTemplateCard extends LirumCardBase<TemplateConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./template-editor');
    return document.createElement(CARDS.template.editor);
  }

  public static getStubConfig(): Partial<TemplateConfig> {
    return { type: `custom:${CARDS.template.tag}`, primary: 'Hello' };
  }

  public setConfig(config: TemplateConfig): void {
    super.setConfig(config);
  }

  private _eval(template: string | undefined): string {
    if (!template) return '';
    let out = template.replace(STATE_ATTR_RE, (_m, entityId: string, attr: string) => {
      const s = this.hass?.states[entityId];
      if (!s) return '';
      const v = s.attributes[attr];
      return v === undefined || v === null ? '' : String(v);
    });
    out = out.replace(STATES_RE, (_m, entityId: string) => {
      const s = this.hass?.states[entityId];
      return s ? s.state : 'unknown';
    });
    return out.trim();
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const primary = this._eval(this._config.primary) || this._config.primary || '';
    const secondary = this._eval(this._config.secondary);
    const iconRaw = this._config.icon ? this._eval(this._config.icon) : '';
    const iconResolved = iconRaw.startsWith('mdi:') ? iconRaw : (this._defaultIcon() || 'mdi:cog');
    const iconColor = this._config.icon_color
      ? this._eval(this._config.icon_color) || this._config.icon_color
      : 'cool';
    const pictureResolved = this._config.picture ? this._eval(this._config.picture) : undefined;
    return this._renderTile({
      icon: pictureResolved ? undefined : iconResolved,
      iconPicture: pictureResolved,
      iconColor,
      primary,
      secondary: secondary || undefined,
    });
  }
}
