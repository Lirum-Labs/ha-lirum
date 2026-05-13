import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { domainOf, pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/spark';
import '../../core/bar';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

export interface SensorConfig extends LirumBaseConfig {
  entity: string;
  show_trend?: boolean;
  trend_points?: number[];
  decimals?: number;
  show_bar?: boolean;
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.sensor.tag,
  name: CARDS.sensor.name,
  description: CARDS.sensor.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

const DEVICE_CLASS_ICONS: Record<string, string> = {
  temperature: 'mdi:thermometer',
  humidity: 'mdi:water-percent',
  battery: 'mdi:battery',
  power: 'mdi:flash',
  energy: 'mdi:lightning-bolt',
  signal_strength: 'mdi:wifi',
  illuminance: 'mdi:brightness-5',
  pressure: 'mdi:gauge',
  voltage: 'mdi:sine-wave',
  current: 'mdi:current-ac',
};

@customElement(CARDS.sensor.tag)
export class LirumSensorCard extends LirumCardBase<SensorConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./sensor-editor');
    return document.createElement(CARDS.sensor.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<SensorConfig> {
    const entity = pickStubEntity(hass, fallback, ['sensor', 'binary_sensor']);
    return { type: `custom:${CARDS.sensor.tag}`, entity };
  }

  public setConfig(config: SensorConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const domain = domainOf(s.entity_id);
    const binary = domain === 'binary_sensor';
    const rawVal = s.state;
    const deviceClass = typeof s.attributes.device_class === 'string' ? s.attributes.device_class : undefined;
    const unit = typeof s.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
    const decimals = this._config.decimals ?? (deviceClass === 'temperature' ? 1 : deviceClass === 'humidity' ? 0 : 1);

    const num = Number(rawVal);
    const isNumeric = !binary && rawVal !== '' && rawVal !== 'unknown' && rawVal !== 'unavailable' && Number.isFinite(num);

    let secondary: string;
    if (binary) {
      secondary = rawVal === 'on' ? 'On' : rawVal === 'off' ? 'Off' : rawVal;
    } else if (isNumeric) {
      secondary = unit ? `${num.toFixed(decimals)} ${unit}` : num.toFixed(decimals);
    } else {
      secondary = unit ? `${rawVal} ${unit}` : rawVal;
    }

    const colorRamp = this._colorRamp(deviceClass, unit, isNumeric ? num : undefined);

    const defaultIcon = this._defaultIcon();
    const icon = this._config.icon
      ? defaultIcon
      : (deviceClass && DEVICE_CLASS_ICONS[deviceClass]) || defaultIcon;

    const iconActive = binary ? rawVal === 'on' : rawVal !== 'unavailable';
    const iconUnavailable = this._isUnavailable();

    const isPercent = isNumeric && (deviceClass === 'battery' || unit === '%');
    const showBar = this._config.show_bar && isPercent;
    const showTrend = this._config.show_trend
      && Array.isArray(this._config.trend_points)
      && this._config.trend_points.length >= 2;

    let controls: TemplateResult | undefined;
    if (showBar || showTrend) {
      const barPart = showBar
        ? html`<lirum-bar
            .value=${num}
            .min=${0}
            .max=${100}
            .colorRamp=${colorRamp}
          ></lirum-bar>`
        : nothing;
      const trendPart = showTrend
        ? html`<lirum-spark
            .points=${this._config.trend_points as number[]}
            .colorRamp=${colorRamp}
          ></lirum-spark>`
        : nothing;
      controls = html`${barPart}${trendPart}`;
    }

    return this._renderTile({
      icon,
      iconColor: colorRamp,
      iconActive,
      iconUnavailable,
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _colorRamp(deviceClass: string | undefined, unit: string, num: number | undefined): string {
    switch (deviceClass) {
      case 'temperature':
        if (num === undefined) return 'cool';
        if (num > 25) return 'warm';
        if (num < 18) return 'cool';
        return 'neutral';
      case 'humidity':
        return 'rose';
      case 'battery':
        if (num === undefined) return 'energy';
        if (num < 20) return 'alert';
        if (num < 40) return 'amber';
        return 'energy';
      case 'power':
      case 'energy':
        return 'amber';
      case 'illuminance':
        return 'amber';
      case 'signal_strength':
        return 'cool';
      case 'pressure':
        return 'cool';
      case 'voltage':
      case 'current':
        return 'energy';
      default:
        if (unit === '%') return 'cool';
        return 'cool';
    }
  }
}
