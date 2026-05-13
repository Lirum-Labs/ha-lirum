import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import { backgroundVars } from '../../core/tokens';
import type { LirumBaseConfig } from '../../core/hass';
import { renderChip, type ChipConfig } from './chip-types';

export interface ChipsConfig {
  type: string;
  chips: ChipConfig[];
  alignment?: 'start' | 'center' | 'end' | 'justify';
  background?: string;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.chips.tag,
  name: CARDS.chips.name,
  description: CARDS.chips.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.chips.tag)
export class LirumChipsCard extends LirumCardBase<ChipsConfig & LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./chips-editor');
    return document.createElement(CARDS.chips.editor);
  }

  public static getStubConfig(): Partial<ChipsConfig> {
    return { type: `custom:${CARDS.chips.tag}`, chips: [] };
  }

  public setConfig(config: ChipsConfig & LirumBaseConfig): void {
    super.setConfig(config);
  }

  public getCardSize(): number {
    return 1;
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const alignment = this._config.alignment ?? 'start';
    const chips = this._config.chips ?? [];
    const cssVars = backgroundVars(this._config.background);
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="chips-row alignment-${alignment}">
          ${chips.map((c) => renderChip(c, this.hass!, this))}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    ...LirumCardBase.styles,
    css`
      .chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 10px 12px;
      }

      .alignment-start {
        justify-content: flex-start;
      }

      .alignment-center {
        justify-content: center;
      }

      .alignment-end {
        justify-content: flex-end;
      }

      .alignment-justify {
        justify-content: space-between;
      }
    `,
  ];
}
