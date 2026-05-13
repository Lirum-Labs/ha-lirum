import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { arcPath, polar, clamp } from '../../core/motion';
import { rampOf, type Palette } from '../../core/tokens';

const ARC_START = 130;
const ARC_END = 410;
const ARC_SPAN = ARC_END - ARC_START;
const CENTER = 60;
const RADIUS = 46;

@customElement('lirum-climate-ring')
export class LirumClimateRing extends LitElement {
  @property({ type: Number }) current = 0;
  @property({ type: Number }) target = 0;
  @property({ type: Number }) min = 7;
  @property({ type: Number }) max = 35;
  @property() action = 'idle';
  @property() unit = '°C';

  protected render(): TemplateResult {
    const ramp =
      this.action === 'heating'
        ? 'warm'
        : this.action === 'cooling'
          ? 'cool'
          : 'neutral';
    const palette: Palette = rampOf(ramp);

    const range = Math.max(0.0001, this.max - this.min);
    const currentPct = clamp((this.current - this.min) / range, 0, 1);
    const targetPct = clamp((this.target - this.min) / range, 0, 1);

    const bgArc = arcPath(CENTER, CENTER, RADIUS, ARC_START, ARC_END);
    const activeEnd = ARC_START + ARC_SPAN * currentPct;
    const hasActive = activeEnd > ARC_START + 0.5;
    const activeArc = hasActive
      ? arcPath(CENTER, CENTER, RADIUS, ARC_START, activeEnd)
      : '';

    const targetDeg = ARC_START + ARC_SPAN * targetPct;
    const [tx, ty] = polar(CENTER, CENTER, RADIUS, targetDeg);

    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3}`;
    const value = Number.isFinite(this.current) ? this.current.toFixed(1) : '–';

    return html`
      <div class="root" style=${stylesStr}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path class="bg" d=${bgArc}></path>
          ${hasActive ? html`<path class="active" d=${activeArc}></path>` : ''}
          <circle class="notch" cx=${tx} cy=${ty} r="3.5"></circle>
        </svg>
        <div class="value">${value}<span class="unit">${this.unit}</span></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 64px;
      height: 64px;
    }
    .root {
      position: relative;
      width: 100%;
      height: 100%;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
    .bg {
      fill: none;
      stroke: color-mix(in oklab, currentColor 14%, transparent);
      stroke-width: 3;
      stroke-linecap: round;
    }
    .active {
      fill: none;
      stroke: var(--c1);
      stroke-width: 7;
      stroke-linecap: round;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 60%, transparent))
        drop-shadow(0 0 10px color-mix(in oklab, var(--c2) 35%, transparent));
    }
    .notch {
      fill: var(--c1);
      stroke: color-mix(in oklab, #000 60%, transparent);
      stroke-width: 1;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 70%, transparent));
    }
    .value {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      pointer-events: none;
    }
    .value .unit {
      font-size: 9px;
      margin-left: 1px;
      color: color-mix(in oklab, currentColor 60%, transparent);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-climate-ring': LirumClimateRing;
  }
}
