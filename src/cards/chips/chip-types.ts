import { html, type TemplateResult } from 'lit';
import type { HomeAssistant, LirumActionConfig, LirumBaseConfig } from '../../core/hass';
import { handleLirumAction } from '../../core/actions';
import { defaultIconFor } from '../../core/icons';
import '../../core/chip';

export type ChipConfig =
  | { type: 'entity'; entity: string; icon?: string; icon_color?: string; content_info?: 'state' | 'name' | 'none'; tap_action?: LirumActionConfig }
  | { type: 'action'; icon: string; label?: string; icon_color?: string; tap_action: LirumActionConfig }
  | { type: 'back'; icon?: string }
  | { type: 'menu'; icon?: string }
  | { type: 'weather'; entity: string; show_temperature?: boolean }
  | { type: 'template'; entity?: string; content?: string; icon?: string; icon_color?: string; tap_action?: LirumActionConfig };

const WEATHER_ICONS: Record<string, string> = {
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  pouring: 'mdi:weather-pouring',
  rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
  exceptional: 'mdi:alert-circle-outline',
};

function renderTemplate(content: string, hass: HomeAssistant): string {
  let out = content;
  out = out.replace(/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g, (_m, id, attr) => {
    const s = hass.states[id];
    const v = s?.attributes[attr];
    return v === undefined || v === null ? '' : String(v);
  });
  out = out.replace(/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g, (_m, id) => {
    return hass.states[id]?.state ?? '';
  });
  return out;
}

export function renderChip(chip: ChipConfig, hass: HomeAssistant, host: HTMLElement): TemplateResult {
  switch (chip.type) {
    case 'entity': {
      const state = hass.states[chip.entity];
      const icon = chip.icon ?? defaultIconFor(state, chip.entity);
      const label =
        chip.content_info === 'state'
          ? state?.state ?? ''
          : chip.content_info === 'name'
            ? (state?.attributes.friendly_name as string | undefined) ?? chip.entity
            : '';
      const onClick = (): void => {
        const cfg: LirumBaseConfig = { type: '', entity: chip.entity, tap_action: chip.tap_action };
        handleLirumAction(host, hass, cfg, 'tap');
      };
      return html`<lirum-chip
        .icon=${icon}
        .label=${label}
        .colorRamp=${chip.icon_color ?? 'cool'}
        @click=${onClick}
      ></lirum-chip>`;
    }
    case 'action': {
      const onClick = (): void => {
        const cfg: LirumBaseConfig = { type: '', tap_action: chip.tap_action };
        handleLirumAction(host, hass, cfg, 'tap');
      };
      return html`<lirum-chip
        .icon=${chip.icon}
        .label=${chip.label ?? ''}
        .colorRamp=${chip.icon_color ?? 'cool'}
        @click=${onClick}
      ></lirum-chip>`;
    }
    case 'back': {
      const onClick = (): void => {
        window.history.back();
      };
      return html`<lirum-chip
        .icon=${chip.icon ?? 'mdi:arrow-left-circle'}
        @click=${onClick}
      ></lirum-chip>`;
    }
    case 'menu': {
      const onClick = (): void => {
        host.dispatchEvent(new CustomEvent('hass-toggle-menu', { bubbles: true, composed: true }));
      };
      return html`<lirum-chip
        .icon=${chip.icon ?? 'mdi:menu'}
        @click=${onClick}
      ></lirum-chip>`;
    }
    case 'weather': {
      const state = hass.states[chip.entity];
      const icon = WEATHER_ICONS[state?.state ?? ''] ?? 'mdi:weather-partly-cloudy';
      const temp = state?.attributes.temperature;
      const label =
        chip.show_temperature === false || temp === undefined || temp === null ? '' : `${temp}°`;
      const onClick = (): void => {
        const cfg: LirumBaseConfig = { type: '', entity: chip.entity, tap_action: { action: 'more-info' } };
        handleLirumAction(host, hass, cfg, 'tap');
      };
      return html`<lirum-chip
        .icon=${icon}
        .label=${label}
        @click=${onClick}
      ></lirum-chip>`;
    }
    case 'template': {
      const state = chip.entity ? hass.states[chip.entity] : undefined;
      const icon = chip.icon ?? (state ? defaultIconFor(state, chip.entity) : '');
      const label = chip.content ? renderTemplate(chip.content, hass) : '';
      const onClick = (): void => {
        const cfg: LirumBaseConfig = { type: '', entity: chip.entity, tap_action: chip.tap_action };
        handleLirumAction(host, hass, cfg, 'tap');
      };
      return html`<lirum-chip
        .icon=${icon}
        .label=${label}
        .colorRamp=${chip.icon_color ?? 'cool'}
        @click=${onClick}
      ></lirum-chip>`;
    }
  }
}
