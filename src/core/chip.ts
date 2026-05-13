import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-chip')
export class LirumChip extends LitElement {
  @property() icon = '';
  @property() label = '';
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2}`;
    return html`
      <button
        class="chip ${this.active ? 'active' : ''}"
        ?disabled=${this.disabled}
        style=${stylesStr}
      >
        ${this.icon ? html`<ha-icon icon=${this.icon}></ha-icon>` : ''}
        ${this.label ? html`<span>${this.label}</span>` : ''}
      </button>
    `;
  }

  static styles = css`
    :host { display: inline-block; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .chip:hover:not(:disabled) {
      background: color-mix(in oklab, currentColor 10%, transparent);
    }
    .chip.active {
      background: linear-gradient(135deg,
        color-mix(in oklab, var(--c1) 22%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent));
      border-color: color-mix(in oklab, var(--c1) 50%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, var(--c1) 30%, transparent),
        0 0 12px color-mix(in oklab, var(--c1) 25%, transparent);
      color: white;
    }
    .chip:disabled { opacity: 0.5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 16px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-chip': LirumChip;
  }
}
