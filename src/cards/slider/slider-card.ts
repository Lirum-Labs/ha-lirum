import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { pickStubEntity, type HomeAssistant, type LirumBaseConfig } from '../../core/hass';
import '../../core/slider';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.slider.tag,
  name: CARDS.slider.name,
  description: CARDS.slider.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

export interface SliderConfig extends LirumBaseConfig {
  entity: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  service?: string;
  service_key?: string;
}

@customElement(CARDS.slider.tag)
export class LirumSliderCard extends LirumCardBase<SliderConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./slider-editor');
    return document.createElement(CARDS.slider.editor);
  }

  public static getStubConfig(
    hass?: HomeAssistant,
    _entities?: string[],
    fallback?: string[],
  ): Partial<SliderConfig> {
    const entity = pickStubEntity(hass, fallback, ['input_number', 'number', 'sensor']);
    return { type: `custom:${CARDS.slider.tag}`, entity };
  }

  public setConfig(config: SliderConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const min = this._config.min ?? 0;
    const max = this._config.max ?? 100;
    const step = this._config.step ?? 1;
    const attrUnit = typeof s.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
    const unit = this._config.unit ?? attrUnit ?? '';
    const value = Number(s.state) || 0;
    const secondary = unit ? `${value} ${unit}` : `${value}`;

    const controls = html`
      <lirum-slider
        .value=${value}
        .min=${min}
        .max=${max}
        .step=${step}
        .unit=${unit}
        .showValue=${true}
        .disabled=${!this._config.service}
        colorRamp="cool"
        @change=${this._onChange}
      ></lirum-slider>
    `;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor: 'cool',
      iconActive: false,
      iconUnavailable: this._isUnavailable(),
      primary: this._defaultPrimary(),
      secondary,
      controls,
    });
  }

  private _onChange = (e: CustomEvent<{ value: number }>): void => {
    if (!this.hass || !this._config?.entity || !this._config.service) return;
    const [domain, service] = this._config.service.split('.');
    if (!domain || !service) return;
    const key = this._config.service_key ?? 'value';
    this.hass.callService(domain, service, {
      entity_id: this._config.entity,
      [key]: e.detail.value,
    });
  };
}
