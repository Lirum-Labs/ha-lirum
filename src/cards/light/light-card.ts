import { customElement, state } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/chip';
import './light-controls';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface LightConfig extends LirumBaseConfig {
  entity: string;
  use_light_color?: boolean;
  show_brightness_control?: boolean;
  show_color_temp_control?: boolean;
  show_color_control?: boolean;
  collapsible_controls?: boolean;
}

interface LightSupports {
  brightness: boolean;
  colorTemp: boolean;
  color: boolean;
}

const BRIGHTNESS_MODES = ['brightness', 'rgb', 'rgbw', 'rgbww', 'xy', 'hs', 'color_temp'];
const COLOR_MODES = ['rgb', 'rgbw', 'rgbww', 'xy', 'hs'];

(window.customCards = window.customCards ?? []).push({
  type: CARDS.light.tag,
  name: CARDS.light.name,
  description: CARDS.light.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.light.tag)
export class LirumLightCard extends LirumCardBase<LightConfig> {
  @state() private _expanded = false;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./light-editor');
    return document.createElement(CARDS.light.editor);
  }

  public static getStubConfig(): Partial<LightConfig> {
    return {
      type: `custom:${CARDS.light.tag}`,
      entity: '',
      show_brightness_control: true,
    };
  }

  public setConfig(config: LightConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const on = this._isActive();
    const brightness = typeof s.attributes.brightness === 'number' ? s.attributes.brightness : 0;
    const brightnessPct = Math.round((brightness / 255) * 100);
    const rgb = Array.isArray(s.attributes.rgb_color)
      ? (s.attributes.rgb_color as [number, number, number])
      : undefined;

    const supportedModes = Array.isArray(s.attributes.supported_color_modes)
      ? (s.attributes.supported_color_modes as string[])
      : [];
    const supports: LightSupports = {
      brightness: supportedModes.some((m) => BRIGHTNESS_MODES.includes(m)),
      colorTemp: supportedModes.includes('color_temp'),
      color: supportedModes.some((m) => COLOR_MODES.includes(m)),
    };

    const showBrightness = (this._config.show_brightness_control ?? false) && supports.brightness;
    const showColorTemp = (this._config.show_color_temp_control ?? false) && supports.colorTemp;
    const showColor = (this._config.show_color_control ?? false) && supports.color;
    const anyControl = showBrightness || showColorTemp || showColor;
    const collapsible = this._config.collapsible_controls === true;
    const controlsVisible = anyControl && on && (!collapsible || this._expanded);

    let iconColor: string;
    if (this._config.use_light_color && on && rgb) {
      const avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
      iconColor = avg > 128 ? 'warm' : 'rose';
    } else {
      iconColor = on ? 'amber' : 'neutral';
    }

    let secondary: string;
    if (on && brightness > 0) {
      secondary = `${brightnessPct}%`;
    } else if (on) {
      secondary = 'On';
    } else {
      secondary = 'Off';
    }

    const trailing = collapsible && anyControl
      ? html`<lirum-chip
          .icon=${this._expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          ?disabled=${this._isUnavailable()}
          @click=${this._toggleExpanded}
        ></lirum-chip>`
      : undefined;

    const controls = controlsVisible
      ? html`<lirum-light-controls
          .hass=${this.hass}
          .entity=${this._config.entity}
          .showBrightness=${showBrightness}
          .showColorTemp=${showColorTemp}
          .showColor=${showColor}
        ></lirum-light-controls>`
      : undefined;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive: on,
      iconUnavailable: this._isUnavailable(),
      iconPulse: on,
      primary: this._defaultPrimary(),
      secondary,
      trailing,
      controls,
    });
  }

  private _toggleExpanded = (e: Event): void => {
    e.stopPropagation();
    this._expanded = !this._expanded;
  };
}
