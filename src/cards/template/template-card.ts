import { customElement } from 'lit/decorators.js';
import { nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';

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
const IS_STATE_RE = /\{\{\s*is_state\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;
const IS_STATE_ATTR_RE = /\{\{\s*is_state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]*)['"]\s*\)\s*\}\}/g;
const IF_RE = /\{%\s*if\s+([^%]+?)\s*%\}([\s\S]*?)(?:\{%\s*else\s*%\}([\s\S]*?))?\{%\s*endif\s*%\}/g;

@customElement(CARDS.template.tag)
export class LirumTemplateCard extends LirumCardBase<TemplateConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./template-editor');
    return document.createElement(CARDS.template.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<TemplateConfig> {
    const entity = pickStubEntity(hass, fallback, ['sensor', 'binary_sensor', 'light', 'switch']);
    const stub: Partial<TemplateConfig> = { type: `custom:${CARDS.template.tag}`, primary: 'Hello' };
    if (entity) stub.entity = entity;
    return stub;
  }

  public setConfig(config: TemplateConfig): void {
    super.setConfig(config);
  }

  private _eval(template: string | undefined): string {
    if (!template) return '';
    let out = template;
    // Predicates evaluate to literal 'true' / 'false' strings so they can be
    // used inside `{% if … %}` blocks below.
    out = out.replace(IS_STATE_ATTR_RE, (_m, entityId: string, attr: string, expected: string) => {
      const s = this.hass?.states[entityId];
      return s && String(s.attributes[attr] ?? '') === expected ? 'true' : 'false';
    });
    out = out.replace(IS_STATE_RE, (_m, entityId: string, expected: string) => {
      const s = this.hass?.states[entityId];
      return s && s.state === expected ? 'true' : 'false';
    });
    // Conditional blocks. Inner content has already had predicates resolved.
    out = out.replace(IF_RE, (_m, cond: string, then: string, els?: string) => {
      const c = cond.trim().toLowerCase();
      const truthy =
        c === 'true' ||
        (c.startsWith('not ') && c.slice(4).trim() === 'false') ||
        (c.length > 0 && c !== 'false' && c !== '0' && c !== '"' && c !== "'");
      return truthy ? then : (els ?? '');
    });
    out = out.replace(STATE_ATTR_RE, (_m, entityId: string, attr: string) => {
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
