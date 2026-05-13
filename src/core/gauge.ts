import { LitElement, html, css, svg, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { clamp, arcPath, polar } from './motion';
import { rampOf, type Palette } from './tokens';

/**
 * Reusable radial gauge widget. Configurable size, arc sweep, and palette.
 * Used by the standalone gauge card and the climate ring sub-component.
 * The visual identity is shared with ha-power-gauge: glowing arc with a knob.
 */
@customElement('lirum-gauge')
export class LirumGauge extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property() colorRamp = 'cool';
  @property() unit = '';
  @property() label = '';
  @property({ type: Number }) size = 160;
  @property({ type: Number }) startDeg = 130;
  @property({ type: Number }) endDeg = 410;
  @property({ type: Boolean }) showTicks = true;
  @property({ type: Boolean }) showKnob = true;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const cx = 200;
    const cy = 200;
    const r = 150;
    const sweep = this.endDeg - this.startDeg;
    const range = Math.max(1, this.max - this.min);
    const pct = clamp((this.value - this.min) / range, 0, 1);
    const cur = this.startDeg + sweep * pct;
    const [kx, ky] = polar(cx, cy, r, cur);
    const ticks: TemplateResult[] = [];
    if (this.showTicks) {
      const N = 60;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const a = this.startDeg + sweep * t;
        const major = i % 6 === 0;
        const r1 = r - 22;
        const r2 = r - (major ? 10 : 16);
        const [x1, y1] = polar(cx, cy, r1, a);
        const [x2, y2] = polar(cx, cy, r2, a);
        const lit = t <= pct;
        ticks.push(svg`
          <line x1=${x1} y1=${y1} x2=${x2} y2=${y2}
            stroke=${lit ? palette.c1 : 'rgba(255,255,255,0.08)'}
            stroke-width=${major ? 1.6 : 1}
            stroke-linecap="round"
            opacity=${lit ? 1 : 0.55}
            style=${lit ? `filter: drop-shadow(0 0 3px ${palette.c1})` : ''}
          />`);
      }
    }
    return html`
      <div class="root" style="--size:${this.size}px;--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3}">
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lg-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color=${palette.c1} />
              <stop offset="60%" stop-color=${palette.c2} />
              <stop offset="100%" stop-color=${palette.c3} />
            </linearGradient>
            <radialGradient id="lg-halo" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stop-color="transparent" />
              <stop offset="80%" stop-color=${palette.c2} stop-opacity="0.45" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="lg-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <path d=${arcPath(cx, cy, r, this.startDeg, this.endDeg)}
            stroke="rgba(255,255,255,0.06)" stroke-width="3" fill="none" stroke-linecap="round" />
          <g>${ticks}</g>
          <path d=${arcPath(cx, cy, r, this.startDeg, cur)}
            stroke="url(#lg-stroke)" stroke-width="14" fill="none" stroke-linecap="round"
            opacity="0.55" filter="url(#lg-blur-lg)" />
          <path d=${arcPath(cx, cy, r, this.startDeg, cur)}
            stroke="url(#lg-stroke)" stroke-width="3" fill="none" stroke-linecap="round" />
          <circle cx=${cx} cy=${cy} r=${r - 36} fill="url(#lg-halo)" opacity="0.7" />
          ${this.showKnob
            ? svg`<circle cx=${kx} cy=${ky} r="9" fill="#0a1020"
                    stroke="rgba(255,255,255,0.6)" stroke-width="1.5"
                    style="filter: drop-shadow(0 0 8px ${palette.c1})" />
                  <circle cx=${kx} cy=${ky} r="3" fill=${palette.c1}
                    style="filter: drop-shadow(0 0 6px ${palette.c1})" />`
            : ''}
        </svg>
        <div class="center">
          <div class="value">${this._format(this.value)}<span class="unit">${this.unit}</span></div>
          ${this.label ? html`<div class="label">${this.label}</div>` : ''}
        </div>
      </div>
    `;
  }

  private _format(v: number): string {
    if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (Math.abs(v) >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  static styles = css`
    :host { display: inline-block; }
    .root {
      position: relative;
      width: var(--size, 160px);
      height: var(--size, 160px);
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }
    .value {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: calc(var(--size, 160px) * 0.18);
      font-weight: 300;
      letter-spacing: -1px;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      text-shadow: 0 0 14px color-mix(in oklab, var(--c1) 50%, transparent);
      line-height: 1;
    }
    .unit {
      font-size: 0.55em;
      margin-left: 3px;
      color: color-mix(in oklab, var(--lirum-text, #eef3ff) 60%, transparent);
    }
    .label {
      font-size: calc(var(--size, 160px) * 0.075);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      margin-top: 6px;
      font-weight: 600;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-gauge': LirumGauge;
  }
}
