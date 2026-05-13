import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { clamp } from './motion';
import { rampOf, type Palette } from './tokens';

/**
 * Non-interactive horizontal bar. Use `<lirum-slider>` when you need pointer
 * input; `<lirum-bar>` is for read-only progress displays (battery, signal,
 * humidity, capacity).
 */
@customElement('lirum-bar')
export class LirumBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) striped = false;
  @property({ type: Number }) thickness = 6;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const range = Math.max(1, this.max - this.min);
    const pct = clamp((this.value - this.min) / range, 0, 1);
    const styles =
      `--c1:${palette.c1};--c2:${palette.c2};--pct:${pct};--thick:${this.thickness}px`;
    return html`
      <div class="track ${this.striped ? 'striped' : ''}" style=${styles}>
        <div class="fill"></div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .track {
      position: relative;
      width: 100%;
      height: var(--thick, 6px);
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 10%, transparent);
      overflow: hidden;
    }
    .fill {
      position: absolute;
      inset: 0;
      width: calc(var(--pct, 0) * 100%);
      background: linear-gradient(90deg, var(--c1), var(--c2));
      border-radius: 999px;
      box-shadow:
        0 0 6px color-mix(in oklab, var(--c1) 60%, transparent),
        0 0 12px color-mix(in oklab, var(--c2) 30%, transparent);
      transition: width 0.4s ease-out;
    }
    .striped .fill {
      background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.18) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.18) 50%,
        rgba(255, 255, 255, 0.18) 75%,
        transparent 75%
      );
      background-size: 12px 12px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-bar': LirumBar;
  }
}
