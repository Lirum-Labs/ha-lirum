import { customElement } from 'lit/decorators.js';
import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/stat';
import '../../core/spark';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface TileConfig extends LirumBaseConfig {
  entity: string;
  label?: string;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  show_spark?: boolean;
  spark_points?: number[];
  decimals?: number;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.tile.tag,
  name: CARDS.tile.name,
  description: CARDS.tile.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.tile.tag)
export class LirumTileCard extends LirumCardBase<TileConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./tile-editor');
    return document.createElement(CARDS.tile.editor);
  }

  public static getStubConfig(): Partial<TileConfig> {
    return { type: `custom:${CARDS.tile.tag}`, entity: '' };
  }

  public setConfig(config: TileConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 2;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const raw = state.state;
    const unavailable = raw === 'unavailable' || raw === 'unknown';
    const value = Number(raw);
    const isNumeric = !isNaN(value);
    const unit = this._config.unit ?? (typeof state.attributes.unit_of_measurement === 'string' ? state.attributes.unit_of_measurement : '');
    const decimals = this._config.decimals ?? 1;
    const label = this._config.label ?? this._defaultPrimary();
    const colorRamp = this._config.icon_color ?? 'cool';
    const icon = this._defaultIcon();

    let trend: string = this._config.trend ?? '';
    if (!trend && Array.isArray(this._config.spark_points) && this._config.spark_points.length >= 2) {
      const pts = this._config.spark_points;
      const last = pts[pts.length - 1];
      const prev = pts[pts.length - 2];
      const delta = last - prev;
      trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
    }

    const displayValue = unavailable ? '–' : isNumeric ? value.toFixed(decimals) : raw;
    const showSpark = !!this._config.show_spark
      && Array.isArray(this._config.spark_points)
      && this._config.spark_points.length >= 2;

    const cssVars = backgroundVars(this._config.background);
    const fill = this._config.fill_container ? 'fill' : '';

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root ${fill}">
          <div class="tile">
            <div class="header">
              <lirum-icon
                .icon=${icon}
                .colorRamp=${colorRamp}
                .active=${this._isActive()}
                .unavailable=${this._isUnavailable()}
              ></lirum-icon>
              <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            </div>
            <lirum-stat
              .value=${displayValue}
              .unit=${unit}
              .label=${label}
              .trend=${trend}
              .colorRamp=${colorRamp}
            ></lirum-stat>
            ${showSpark
              ? html`<lirum-spark
                  .points=${this._config.spark_points as number[]}
                  .colorRamp=${colorRamp}
                ></lirum-spark>`
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .tile {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 140px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .header lirum-icon {
        --size: 36px;
      }
      .chevron {
        --mdc-icon-size: 18px;
        color: var(--lirum-muted, #6b7894);
        opacity: 0.6;
      }
      lirum-stat {
        flex: 1;
      }
      lirum-spark {
        width: 100%;
        display: block;
      }
      .fill {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .fill .tile {
        flex: 1;
      }
    `,
  ];
}
