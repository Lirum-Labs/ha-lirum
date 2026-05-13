import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/button';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface ScriptConfig extends LirumBaseConfig {
  entity: string;
  variables?: Record<string, unknown>;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.script.tag,
  name: CARDS.script.name,
  description: CARDS.script.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  if (!Number.isFinite(diff) || diff < 0) return 'just now';
  const sec = Math.floor(diff / 1000);
  if (sec < 45) return 'ran just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `ran ${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `ran ${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `ran ${day}d ago`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `ran ${mon}mo ago`;
  const yr = Math.floor(day / 365);
  return `ran ${yr}y ago`;
}

@customElement(CARDS.script.tag)
export class LirumScriptCard extends LirumCardBase<ScriptConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./script-editor');
    return document.createElement(CARDS.script.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<ScriptConfig> {
    const entity = pickStubEntity(hass, fallback, ['script']);
    return { type: `custom:${CARDS.script.tag}`, entity };
  }

  public setConfig(config: ScriptConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    const next: ScriptConfig = { ...config };
    if (!next.tap_action) {
      next.tap_action = {
        action: 'call-service',
        service: 'script.turn_on',
        target: { entity_id: config.entity },
        service_data: config.variables ?? {},
      };
    }
    super.setConfig(next);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const running = state.state === 'on';
    const lastTriggered = state.attributes.last_triggered as string | undefined;

    let secondary: string;
    if (running) {
      secondary = 'Running…';
    } else if (lastTriggered) {
      const d = new Date(lastTriggered);
      secondary = Number.isNaN(d.getTime()) ? 'Idle' : formatRelative(d);
    } else {
      secondary = 'Idle';
    }

    const icon = this._defaultIcon();
    const colorRamp = this._config.icon_color ?? (running ? 'amber' : 'cool');
    const label = this._defaultPrimary();
    const cssVars = backgroundVars(this._config.background);

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root">
          <lirum-button
            .icon=${icon}
            .label=${label}
            .secondary=${secondary}
            .colorRamp=${colorRamp}
            .busy=${running}
          ></lirum-button>
        </div>
      </ha-card>
    `;
  }
}
