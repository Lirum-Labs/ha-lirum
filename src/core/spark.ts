import { LitElement, html, css, svg, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { clamp } from './motion';
import { rampOf, type Palette } from './tokens';

/**
 * Sparkline mini-chart. Takes a numeric series and renders a smooth area chart.
 * No axes, no labels — pure shape. Use for at-a-glance trend.
 */
@customElement('lirum-spark')
export class LirumSpark extends LitElement {
  @property({ type: Array }) points: number[] = [];
  @property() colorRamp = 'cool';
  @property({ type: Number }) width = 120;
  @property({ type: Number }) height = 32;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const w = this.width;
    const h = this.height;
    const pts = this.points;
    if (pts.length < 2) {
      return html`<svg width=${w} height=${h}></svg>`;
    }
    let min = Infinity;
    let max = -Infinity;
    for (const v of pts) { if (v < min) min = v; if (v > max) max = v; }
    if (min === max) { min -= 1; max += 1; }
    const dx = w / (pts.length - 1);
    const yOf = (v: number): number => h - 2 - clamp((v - min) / (max - min), 0, 1) * (h - 4);
    let linePath = `M 0 ${yOf(pts[0])}`;
    for (let i = 1; i < pts.length; i++) {
      const x = i * dx;
      const y = yOf(pts[i]);
      linePath += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;
    const gradId = `spark-${Math.random().toString(36).slice(2, 9)}`;

    return html`
      <svg viewBox="0 0 ${w} ${h}" width=${w} height=${h} preserveAspectRatio="none">
        <defs>
          <linearGradient id=${gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${palette.c1} stop-opacity="0.45" />
            <stop offset="100%" stop-color=${palette.c1} stop-opacity="0" />
          </linearGradient>
        </defs>
        ${svg`<path d=${areaPath} fill="url(#${gradId})" stroke="none" />`}
        ${svg`<path d=${linePath} fill="none" stroke=${palette.c1} stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                style="filter: drop-shadow(0 0 3px ${palette.c1})" />`}
      </svg>
    `;
  }

  static styles = css`
    :host { display: inline-block; line-height: 0; }
    svg { display: block; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-spark': LirumSpark;
  }
}
