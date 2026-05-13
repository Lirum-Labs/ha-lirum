import { customElement, state } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/chip';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface SelectConfig extends LirumBaseConfig {
  entity: string;
  inline_options?: boolean;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.select.tag,
  name: CARDS.select.name,
  description: CARDS.select.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.select.tag)
export class LirumSelectCard extends LirumCardBase<SelectConfig> {
  @state() private _expanded = false;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./select-editor');
    return document.createElement(CARDS.select.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<SelectConfig> {
    const entity = pickStubEntity(hass, fallback, ['select', 'input_select']);
    return { type: `custom:${CARDS.select.tag}`, entity };
  }

  public setConfig(config: SelectConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const options = Array.isArray(s.attributes.options) ? (s.attributes.options as string[]) : [];
    const current = s.state;
    const domain = this._config.entity.split('.')[0] ?? 'select';
    const unavailable = this._isUnavailable();
    const inline = this._config.inline_options === true;
    const showOptions = inline || this._expanded;

    const trailing = html`
      <lirum-chip
        .icon=${this._expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
        ?disabled=${unavailable}
        @click=${this._toggleExpanded}
      ></lirum-chip>
    `;

    const controls = showOptions && options.length > 0
      ? html`<div class="lirum-chip-row">
          ${options.map(
            (o) => html`<lirum-chip
              .label=${this._capitalize(o)}
              ?active=${o === current}
              ?disabled=${unavailable}
              @click=${(): void => this._selectOption(domain, o)}
            ></lirum-chip>`,
          )}
        </div>`
      : undefined;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: 'cool',
      iconActive: !unavailable,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary: current,
      trailing,
      controls,
    });
  }

  private _capitalize(s: string): string {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private _toggleExpanded = (): void => {
    this._expanded = !this._expanded;
  };

  private _selectOption(domain: string, option: string): void {
    if (!this.hass || !this._config?.entity) return;
    this.hass.callService(domain, 'select_option', {
      entity_id: this._config.entity,
      option,
    });
  }
}
