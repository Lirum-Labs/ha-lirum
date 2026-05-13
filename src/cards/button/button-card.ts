import { customElement, state } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { domainOf, type LirumBaseConfig } from '../../core/hass';
import { backgroundVars } from '../../core/tokens';
import '../../core/button';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.button.tag,
  name: CARDS.button.name,
  description: CARDS.button.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

export interface ButtonConfig extends LirumBaseConfig {
  entity?: string;
  name?: string;
  secondary?: string;
  icon?: string;
  icon_color?: string;
}

@customElement(CARDS.button.tag)
export class LirumButtonCard extends LirumCardBase<ButtonConfig> {
  @state() private _busy = false;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./button-editor');
    return document.createElement(CARDS.button.editor);
  }

  public static getStubConfig(): Partial<ButtonConfig> {
    return { type: `custom:${CARDS.button.tag}`, name: 'Button' };
  }

  public setConfig(config: ButtonConfig): void {
    const next: ButtonConfig = { ...config };
    if (next.entity && domainOf(next.entity) === 'button' && !next.tap_action) {
      next.tap_action = {
        action: 'call-service',
        service: 'button.press',
        target: { entity_id: next.entity },
      };
    }
    super.setConfig(next);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const hasEntity = Boolean(this._config.entity);
    const stateObj = hasEntity ? this._stateObj() : undefined;
    const icon = this._config.icon ?? (hasEntity ? this._defaultIcon() : 'mdi:gesture-tap-button');
    const label = hasEntity
      ? (this._config.name ?? this._defaultPrimary())
      : (this._config.name ?? 'Button');
    const secondary = this._config.secondary ?? (stateObj ? this._formattedState() : '');
    const colorRamp = this._config.icon_color ?? 'cool';
    const cssVars = backgroundVars(this._config.background);
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root">
          <lirum-button
            .icon=${icon}
            .label=${label}
            .secondary=${secondary}
            .colorRamp=${colorRamp}
            .busy=${this._busy}
            @click=${this._onTap}
          ></lirum-button>
        </div>
      </ha-card>
    `;
  }

  private _onTap = (): void => {
    this._busy = true;
    window.setTimeout(() => {
      this._busy = false;
    }, 700);
  };
}
