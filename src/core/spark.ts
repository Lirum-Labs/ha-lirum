import { LitElement, html, css, svg, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { clamp } from './motion';
import { rampOf, type Palette } from './tokens';

let _sparkIdCounter = 0;

/**
 * Sparkline mini-chart, instrument-panel style.
 *
 * - Gradient stroke: deep (c3) → mid (c2) → bright (c1) across the timeline.
 * - Vertical area fill that fades to transparent at the baseline.
 * - Subtle dashed baseline so the trend reads against a clear axis.
 * - Glowing endpoint dot + halo at the last data point.
 *
 * Every instance generates unique SVG gradient IDs so multiple sparks on a
 * dashboard never share their `<defs>` (which would cause color bleed).
 */
@customElement('lirum-spark')
export class LirumSpark extends LitElement {
  @property({ type: Array }) points: number[] = [];
  @property() colorRamp = 'cool';
  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 30;
  @property({ type: Boolean }) showBaseline = true;
  @property({ type: Boolean }) showTip = true;

  private readonly _instanceId = ++_sparkIdCounter;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const w = this.width;
    const h = this.height;
    const pts = this.points;
    if (pts.length < 2) {
      return html`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"></svg>`;
    }
    let min = Infinity;
    let max = -Infinity;
    for (const v of pts) { if (v < min) min = v; if (v > max) max = v; }
    if (min === max) { min -= 1; max += 1; }
    // Leave headroom at top + bottom so the tip dot + glow don't clip.
    const top = 3;
    const bottom = h - 4;
    const dx = w / (pts.length - 1);
    const yOf = (v: number): number => bottom - clamp((v - min) / (max - min), 0, 1) * (bottom - top);

    let linePath = `M 0 ${yOf(pts[0]).toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) {
      const x = i * dx;
      const y = yOf(pts[i]);
      linePath += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    const lastX = w;
    const lastY = yOf(pts[pts.length - 1]);
    const areaPath = `${linePath} L ${lastX} ${h} L 0 ${h} Z`;

    const lineId = `sk-line-${this._instanceId}`;
    const areaId = `sk-area-${this._instanceId}`;

    return html`
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3}">
        <defs>
          <linearGradient id=${lineId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color=${palette.c3} />
            <stop offset="55%"  stop-color=${palette.c2} />
            <stop offset="100%" stop-color=${palette.c1} />
          </linearGradient>
          <linearGradient id=${areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color=${palette.c1} stop-opacity="0.32" />
            <stop offset="100%" stop-color=${palette.c1} stop-opacity="0" />
          </linearGradient>
        </defs>
        ${this.showBaseline
          ? svg`<line class="baseline" x1="0" y1=${h - 1} x2=${w} y2=${h - 1} />`
          : ''}
        ${svg`<path class="area" d=${areaPath} fill=${`url(#${areaId})`} />`}
        ${svg`<path class="line" d=${linePath} stroke=${`url(#${lineId})`} />`}
        ${this.showTip
          ? svg`<circle class="tip-halo" cx=${lastX} cy=${lastY} r="4" />
                <circle class="tip"      cx=${lastX} cy=${lastY} r="2" fill=${palette.c1} />`
          : ''}
      </svg>
    `;
  }

  static styles = css`
    :host { display: block; line-height: 0; }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .baseline {
      stroke: color-mix(in oklab, currentColor 10%, transparent);
      stroke-width: 1;
      stroke-dasharray: 2 3;
    }
    .area {
      fill-opacity: 1;
    }
    .line {
      fill: none;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 55%, transparent));
    }
    .tip-halo {
      fill: color-mix(in oklab, var(--c1) 60%, transparent);
      filter: blur(2px);
    }
    .tip {
      filter: drop-shadow(0 0 4px var(--c1));
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-spark': LirumSpark;
  }
}
