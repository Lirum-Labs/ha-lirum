import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

/**
 * Hero action button — used for primary tap targets that are larger than a
 * chip but smaller than a tile (e.g. "Run script", "Activate scene").
 */
@customElement('lirum-button')
export class LirumButton extends LitElement {
  @property() icon = '';
  @property() label = '';
  @property() secondary = '';
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) busy = false;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3}`;
    return html`
      <button
        class="btn ${this.active ? 'active' : ''} ${this.busy ? 'busy lirum-anim' : ''}"
        ?disabled=${this.disabled}
        style=${stylesStr}
      >
        ${this.icon ? html`<ha-icon icon=${this.icon}></ha-icon>` : ''}
        <span class="text">
          <span class="label">${this.label}</span>
          ${this.secondary ? html`<span class="secondary">${this.secondary}</span>` : ''}
        </span>
        ${this.busy ? html`<span class="ring"></span>` : ''}
      </button>
    `;
  }

  static styles = css`
    :host { display: block; }
    .btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      background: linear-gradient(
        180deg,
        color-mix(in oklab, currentColor 4%, transparent),
        color-mix(in oklab, currentColor 1%, transparent)
      );
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.1s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .btn:hover:not(:disabled) {
      background: linear-gradient(
        180deg,
        color-mix(in oklab, var(--c1) 8%, transparent),
        color-mix(in oklab, var(--c2) 3%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 25%, transparent);
    }
    .btn:active:not(:disabled) { transform: scale(0.98); }
    .btn.active {
      background: linear-gradient(
        135deg,
        color-mix(in oklab, var(--c1) 22%, transparent),
        color-mix(in oklab, var(--c2) 16%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 45%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, var(--c1) 25%, transparent),
        0 0 18px color-mix(in oklab, var(--c1) 28%, transparent);
    }
    .btn:disabled { opacity: 0.45; cursor: not-allowed; }
    ha-icon {
      --mdc-icon-size: 20px;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 40%, transparent));
      flex-shrink: 0;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      text-align: left;
    }
    .label {
      font-weight: 600;
      letter-spacing: -0.1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .secondary {
      font-size: 11px;
      color: var(--lirum-muted, #6b7894);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ring {
      position: absolute;
      top: 50%;
      right: 14px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid color-mix(in oklab, var(--c1) 70%, transparent);
      border-top-color: transparent;
      transform: translateY(-50%);
      animation: lirum-spin 0.9s linear infinite;
    }
    @keyframes lirum-spin {
      to { transform: translateY(-50%) rotate(360deg); }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-button': LirumButton;
  }
}
