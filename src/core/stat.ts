import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

/**
 * Large KPI display — big number with caption. Used by the tile and gauge cards
 * to render the central read-out. Always shows tabular nums.
 */
@customElement('lirum-stat')
export class LirumStat extends LitElement {
  @property() value = '–';
  @property() unit = '';
  @property() label = '';
  @property() trend = ''; // optional: 'up' | 'down' | 'flat'
  @property() colorRamp = 'cool';

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2}`;
    const trendIcon =
      this.trend === 'up' ? 'mdi:trending-up' :
      this.trend === 'down' ? 'mdi:trending-down' :
      this.trend === 'flat' ? 'mdi:trending-neutral' : '';
    return html`
      <div class="root" style=${stylesStr}>
        <div class="value">
          ${this.value}<span class="unit">${this.unit}</span>
          ${trendIcon ? html`<ha-icon class="trend ${this.trend}" icon=${trendIcon}></ha-icon>` : ''}
        </div>
        ${this.label ? html`<div class="label">${this.label}</div>` : ''}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .root { display: flex; flex-direction: column; gap: 2px; }
    .value {
      font-size: 30px;
      font-weight: 300;
      letter-spacing: -1.2px;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      line-height: 1;
      text-shadow: 0 0 14px color-mix(in oklab, var(--c1) 35%, transparent);
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .unit {
      font-size: 14px;
      color: color-mix(in oklab, currentColor 55%, transparent);
      margin-left: 2px;
    }
    .label {
      font-size: 11px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      font-weight: 600;
    }
    .trend {
      --mdc-icon-size: 18px;
      align-self: center;
      margin-left: 4px;
    }
    .trend.up { color: var(--c1); }
    .trend.down { color: #ff5a7a; }
    .trend.flat { color: var(--lirum-muted, #6b7894); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-stat': LirumStat;
  }
}
