import { customElement } from 'lit/decorators.js';
import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/gauge';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface GaugeThreshold {
  value: number;
  color: string;
}

export interface GaugeConfig extends LirumBaseConfig {
  entity: string;
  min?: number;
  max?: number;
  unit?: string;
  label?: string;
  size?: number;
  thresholds?: GaugeThreshold[];
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.gauge.tag,
  name: CARDS.gauge.name,
  description: CARDS.gauge.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

function rampFor(value: number, thresholds: GaugeThreshold[] | undefined, fallback: string): string {
  if (!thresholds || thresholds.length === 0) return fallback;
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  let pick: string | undefined;
  for (const t of sorted) {
    if (t.value <= value) pick = t.color;
    else break;
  }
  return pick ?? sorted[0]?.color ?? fallback;
}

@customElement(CARDS.gauge.tag)
export class LirumGaugeCard extends LirumCardBase<GaugeConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./gauge-editor');
    return document.createElement(CARDS.gauge.editor);
  }

  public static getStubConfig(): Partial<GaugeConfig> {
    return { type: `custom:${CARDS.gauge.tag}`, entity: '' };
  }

  public setConfig(config: GaugeConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 3;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const value = Number(state.state);
    if (!Number.isFinite(value)) return this._renderError('value not numeric');

    const min = this._config.min ?? 0;
    const max = this._config.max ?? 100;
    const unit =
      this._config.unit ??
      (typeof state.attributes.unit_of_measurement === 'string'
        ? (state.attributes.unit_of_measurement as string)
        : '');
    const label = this._config.label ?? '';
    const size = this._config.size ?? 200;
    const colorRamp = rampFor(value, this._config.thresholds, this._config.icon_color ?? 'cool');

    const cssVars = backgroundVars(this._config.background);
    const name = this._defaultPrimary();

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root">
          <div class="gauge-wrap">
            <lirum-gauge
              .value=${value}
              .min=${min}
              .max=${max}
              .colorRamp=${colorRamp}
              .unit=${unit}
              .label=${label}
              .size=${size}
            ></lirum-gauge>
            <div class="entity-label">${name}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .gauge-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px;
      }
      .entity-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--lirum-text, #eef3ff);
        text-align: center;
        letter-spacing: 0.2px;
      }
    `,
  ];
}
