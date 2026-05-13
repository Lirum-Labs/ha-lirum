import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-icon')
export class LirumIcon extends LitElement {
  @property() icon = 'mdi:bookmark-outline';
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) unavailable = false;
  @property({ type: Boolean }) pulse = false;
  @property({ type: Number }) intensity = 1;
  @property() picture = '';

  protected render(): TemplateResult | typeof nothing {
    const palette: Palette = rampOf(this.colorRamp);
    const halo = Math.max(0, Math.min(1, this.intensity));
    const stylesStr = `--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3};--halo:${halo}`;
    return html`
      <div
        class="wrap ${this.active ? 'active' : ''} ${this.unavailable ? 'unavail' : ''} ${this.pulse ? 'pulse lirum-anim' : ''}"
        style=${stylesStr}
      >
        <div class="glow"></div>
        ${this.picture
          ? html`<img src=${this.picture} alt="" />`
          : html`<ha-icon icon=${this.icon}></ha-icon>`}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      --size: 40px;
    }
    .wrap {
      position: relative;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 8%, transparent);
      transition: background 0.4s, border-color 0.4s;
      overflow: hidden;
    }
    .wrap.active {
      background: linear-gradient(
        135deg,
        color-mix(in oklab, var(--c1) 25%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 35%, transparent);
    }
    .wrap.unavail {
      opacity: 0.5;
      border-style: dashed;
    }
    .glow {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        color-mix(in oklab, var(--c1) calc(70% * var(--halo, 1)), transparent) 0%,
        color-mix(in oklab, var(--c2) calc(40% * var(--halo, 1)), transparent) 45%,
        transparent 80%
      );
      filter: blur(4px);
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
    }
    .wrap.active .glow {
      opacity: 1;
    }
    ha-icon {
      --mdc-icon-size: calc(var(--size) * 0.55);
      color: var(--lirum-text, #eef3ff);
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 50%, transparent));
      transition: color 0.4s, filter 0.4s;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .wrap.unavail ha-icon {
      filter: none;
      color: var(--lirum-muted, #6b7894);
    }
    .pulse ha-icon {
      animation: lirum-glow-pulse 2.4s ease-in-out infinite;
    }
    @keyframes lirum-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1) 50%, transparent)); }
      50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1) 80%, transparent)); }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-icon': LirumIcon;
  }
}
