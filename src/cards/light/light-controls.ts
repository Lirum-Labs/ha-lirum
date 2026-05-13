import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../core/hass';
import { clamp } from '../../core/motion';
import '../../core/slider';

interface WheelPoint {
  hue: number;
  saturation: number;
}

@customElement('lirum-light-controls')
export class LirumLightControls extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property() public entity = '';
  @property({ type: Boolean }) public showBrightness = false;
  @property({ type: Boolean }) public showColorTemp = false;
  @property({ type: Boolean }) public showColor = false;

  @state() private _dragging = false;
  @state() private _dragPoint?: WheelPoint;

  private _wheelEl?: SVGElement;

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.entity) return nothing;
    const state = this.hass.states[this.entity];
    if (!state) return nothing;

    const attrs = state.attributes;
    const brightness = typeof attrs.brightness === 'number' ? attrs.brightness : 0;
    const brightnessPct = Math.round((brightness / 255) * 100);
    const minK = typeof attrs.min_color_temp_kelvin === 'number' ? attrs.min_color_temp_kelvin : 2200;
    const maxK = typeof attrs.max_color_temp_kelvin === 'number' ? attrs.max_color_temp_kelvin : 6500;
    const colorTempK = typeof attrs.color_temp_kelvin === 'number' ? attrs.color_temp_kelvin : minK;
    const rgb = Array.isArray(attrs.rgb_color) ? (attrs.rgb_color as [number, number, number]) : undefined;
    const hsCurrent = this._dragging && this._dragPoint
      ? this._dragPoint
      : this._rgbToHs(rgb);

    return html`
      ${this.showBrightness
        ? html`
            <div class="row">
              <div class="row-label">Brightness</div>
              <lirum-slider
                .value=${brightnessPct}
                .min=${0}
                .max=${100}
                .step=${1}
                .unit=${'%'}
                .showValue=${true}
                colorRamp="amber"
                @change=${this._onBrightnessChange}
              ></lirum-slider>
            </div>
          `
        : nothing}
      ${this.showColorTemp
        ? html`
            <div class="row">
              <div class="row-label">Color temperature</div>
              <div
                class="ct-slider-wrap"
                style="background:linear-gradient(90deg,#ffb070,#ffffff,#b5d7ff);"
              >
                <lirum-slider
                  .value=${colorTempK}
                  .min=${minK}
                  .max=${maxK}
                  .step=${50}
                  .unit=${'K'}
                  .showValue=${true}
                  colorRamp="warm"
                  @change=${this._onColorTempChange}
                ></lirum-slider>
              </div>
            </div>
          `
        : nothing}
      ${this.showColor
        ? html`
            <div class="row">
              <div class="row-label">Color</div>
              ${this._renderColorWheel(hsCurrent)}
            </div>
          `
        : nothing}
    `;
  }

  private _renderColorWheel(point: WheelPoint | undefined): TemplateResult {
    const size = 160;
    const r = size / 2;
    const knobR = r - 8;
    const angleRad = point ? (point.hue * Math.PI) / 180 : 0;
    const radius = point ? clamp(point.saturation, 0, 1) * knobR : 0;
    const cx = r + Math.cos(angleRad) * radius;
    const cy = r + Math.sin(angleRad) * radius;
    const knobColor = point ? `hsl(${point.hue}, ${Math.round(point.saturation * 100)}%, 50%)` : '#ffffff';
    return html`
      <svg
        class="wheel"
        width=${size}
        height=${size}
        viewBox="0 0 ${size} ${size}"
        @pointerdown=${this._onWheelPointerDown}
        @pointermove=${this._onWheelPointerMove}
        @pointerup=${this._onWheelPointerUp}
        @pointercancel=${this._onWheelPointerUp}
      >
        <defs>
          <radialGradient id="lirum-sat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="white" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
        </defs>
        <foreignObject x="0" y="0" width=${size} height=${size}>
          <div
            class="wheel-disc"
            style="background:conic-gradient(from 0deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));"
          ></div>
        </foreignObject>
        <circle cx=${r} cy=${r} r=${r} fill="url(#lirum-sat)" pointer-events="none"></circle>
        <circle
          class="knob"
          cx=${cx}
          cy=${cy}
          r="9"
          fill=${knobColor}
          stroke="rgba(0,0,0,0.55)"
          stroke-width="2"
          pointer-events="none"
        ></circle>
      </svg>
    `;
  }

  private _rgbToHs(rgb: [number, number, number] | undefined): WheelPoint | undefined {
    if (!rgb) return undefined;
    const [r, g, b] = rgb.map((v) => v / 255) as [number, number, number];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let hue = 0;
    if (delta !== 0) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
    }
    const saturation = max === 0 ? 0 : delta / max;
    return { hue, saturation };
  }

  private _onBrightnessChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this.entity) return;
    this.hass.callService('light', 'turn_on', {
      entity_id: this.entity,
      brightness_pct: e.detail.value,
    });
  };

  private _onColorTempChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this.entity) return;
    this.hass.callService('light', 'turn_on', {
      entity_id: this.entity,
      color_temp_kelvin: e.detail.value,
    });
  };

  private _onWheelPointerDown = (e: PointerEvent): void => {
    e.preventDefault();
    const target = e.currentTarget as SVGElement;
    this._wheelEl = target;
    target.setPointerCapture(e.pointerId);
    this._dragging = true;
    this._dragPoint = this._pointFromEvent(e);
  };

  private _onWheelPointerMove = (e: PointerEvent): void => {
    if (!this._dragging) return;
    this._dragPoint = this._pointFromEvent(e);
  };

  private _onWheelPointerUp = (e: PointerEvent): void => {
    if (!this._dragging) return;
    const target = e.currentTarget as SVGElement;
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
    const point = this._dragPoint;
    this._dragging = false;
    this._dragPoint = undefined;
    this._wheelEl = undefined;
    if (!point || !this.hass || !this.entity) return;
    this.hass.callService('light', 'turn_on', {
      entity_id: this.entity,
      hs_color: [point.hue, point.saturation * 100],
    });
  };

  private _pointFromEvent(e: PointerEvent): WheelPoint {
    const target = this._wheelEl ?? (e.currentTarget as SVGElement);
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const knobR = rect.width / 2 - 8;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const saturation = clamp(distance / Math.max(1, knobR), 0, 1);
    let hue = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (hue < 0) hue += 360;
    return { hue, saturation };
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .row-label {
      font-size: 11px;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      font-weight: 600;
    }
    .ct-slider-wrap {
      border-radius: 999px;
      padding: 2px 4px;
    }
    .wheel {
      display: block;
      touch-action: none;
      cursor: crosshair;
      align-self: center;
      border-radius: 50%;
      box-shadow:
        0 0 0 1px color-mix(in oklab, currentColor 14%, transparent),
        0 6px 18px rgba(0, 0, 0, 0.35);
    }
    .wheel-disc {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .knob {
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-light-controls': LirumLightControls;
  }
}
