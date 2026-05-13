import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { domainOf, type LirumBaseConfig } from '../../core/hass';
import '../../core/slider';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.number.tag,
  name: CARDS.number.name,
  description: CARDS.number.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.number.tag)
export class LirumNumberCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./number-editor');
    return document.createElement(CARDS.number.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.number.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);

    const min = typeof s.attributes.min === 'number' ? s.attributes.min : 0;
    const max = typeof s.attributes.max === 'number' ? s.attributes.max : 100;
    const step = typeof s.attributes.step === 'number' ? s.attributes.step : 1;
    const unit = typeof s.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
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
    if (!this.hass || !this._config?.entity) return;
    const entity = this._config.entity;
    const domain = domainOf(entity);
    const service = domain === 'input_number' ? 'input_number' : 'number';
    this.hass.callService(service, 'set_value', { entity_id: entity, value: e.detail.value });
  };
}
