import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { clamp } from './motion';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-slider')
export class LirumSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showValue = false;
  @property() unit = '';

  @state() private _dragging = false;
  @state() private _displayValue = 0;

  private _trackEl?: HTMLElement;

  protected updated(): void {
    if (!this._dragging) this._displayValue = this.value;
  }

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const range = Math.max(1, this.max - this.min);
    const dv = this._dragging ? this._displayValue : this.value;
    const pct = clamp((dv - this.min) / range, 0, 1);
    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3};--pct:${pct}`;
    return html`
      <div class="root ${this.disabled ? 'disabled' : ''}" style=${stylesStr}>
        <div
          class="track"
          @pointerdown=${this._down}
          @pointermove=${this._move}
          @pointerup=${this._up}
          @pointercancel=${this._up}
        >
          <div class="fill"></div>
          <div class="cap"></div>
        </div>
        ${this.showValue
          ? html`<div class="value">${this._format(pct * range + this.min)}<span class="unit">${this.unit}</span></div>`
          : ''}
      </div>
    `;
  }

  private _format(v: number): string {
    if (this.step >= 1) return Math.round(v).toLocaleString();
    const decimals = Math.max(0, Math.min(4, Math.ceil(-Math.log10(this.step))));
    return v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  private _down(e: PointerEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    const track = e.currentTarget as HTMLElement;
    this._trackEl = track;
    track.setPointerCapture(e.pointerId);
    this._dragging = true;
    this._updateFromEvent(e);
  }

  private _move(e: PointerEvent): void {
    if (!this._dragging) return;
    this._updateFromEvent(e);
  }

  private _up(e: PointerEvent): void {
    if (!this._dragging) return;
    this._dragging = false;
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this._displayValue }, bubbles: true, composed: true }),
    );
  }

  private _updateFromEvent(e: PointerEvent): void {
    if (!this._trackEl) return;
    const rect = this._trackEl.getBoundingClientRect();
    const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const raw = this.min + pct * (this.max - this.min);
    const stepped = Math.round(raw / this.step) * this.step;
    this._displayValue = clamp(stepped, this.min, this.max);
    this.dispatchEvent(
      new CustomEvent('input', { detail: { value: this._displayValue }, bubbles: true, composed: true }),
    );
  }

  static styles = css`
    :host { display: block; }
    .root { display: flex; align-items: center; gap: 12px; }
    .root.disabled { opacity: 0.5; pointer-events: none; }
    .track {
      position: relative;
      flex: 1;
      height: 10px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 10%, transparent);
      overflow: hidden;
      touch-action: none;
      cursor: pointer;
    }
    .fill {
      position: absolute;
      inset: 0;
      width: calc(var(--pct, 0) * 100%);
      background: linear-gradient(90deg, var(--c1), var(--c2));
      border-radius: 999px;
      box-shadow:
        0 0 8px color-mix(in oklab, var(--c1) 60%, transparent),
        0 0 16px color-mix(in oklab, var(--c2) 35%, transparent);
      transition: width 0.05s linear;
    }
    .cap {
      position: absolute;
      left: calc(var(--pct, 0) * 100%);
      top: 50%;
      width: 14px;
      height: 14px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--c1);
      border: 2px solid rgba(0,0,0,0.5);
      box-shadow: 0 0 10px var(--c1);
    }
    .value {
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      min-width: 3.5em;
      text-align: right;
    }
    .value .unit {
      font-size: 11px;
      margin-left: 2px;
      color: color-mix(in oklab, currentColor 60%, transparent);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-slider': LirumSlider;
  }
}
