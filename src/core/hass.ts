import type { LovelaceCardConfig } from 'custom-card-helpers';

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    entity_picture?: string;
    unit_of_measurement?: string;
    device_class?: string;
    supported_features?: number;
  };
  last_changed?: string;
  last_updated?: string;
}

export interface HassUser {
  id: string;
  name: string;
  is_admin: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: { darkMode: boolean };
  language: string;
  locale: { language: string };
  user?: HassUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[]; device_id?: string | string[]; area_id?: string | string[] },
  ) => Promise<void>;
  callApi: <T = unknown>(method: string, path: string, parameters?: Record<string, unknown>) => Promise<T>;
  formatEntityState?: (state: HassEntity, value?: string) => string;
  formatEntityAttributeValue?: (state: HassEntity, attribute: string, value?: unknown) => string;
}

export type LirumActionConfig =
  | { action: 'more-info' }
  | { action: 'toggle' }
  | { action: 'call-service'; service: string; service_data?: Record<string, unknown>; target?: { entity_id?: string | string[] } }
  | { action: 'navigate'; navigation_path: string }
  | { action: 'url'; url_path: string }
  | { action: 'none' }
  | { action: 'assist'; pipeline_id?: string; start_listening?: boolean };

export interface LirumBaseConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  layout?: 'default' | 'horizontal' | 'vertical';
  fill_container?: boolean;
  tap_action?: LirumActionConfig;
  hold_action?: LirumActionConfig;
  double_tap_action?: LirumActionConfig;
  background?: string;
}

export function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}

export function stateActive(stateObj: HassEntity | undefined): boolean {
  if (!stateObj) return false;
  const s = stateObj.state;
  if (s === 'unavailable' || s === 'unknown') return false;
  const domain = domainOf(stateObj.entity_id);
  switch (domain) {
    case 'climate':
      return s !== 'off';
    case 'cover':
      return s === 'open' || s === 'opening' || s === 'closing';
    case 'media_player':
      return s !== 'off' && s !== 'idle' && s !== 'standby';
    case 'vacuum':
      return s !== 'docked' && s !== 'off';
    case 'plant':
      return s === 'problem';
    case 'lock':
      return s !== 'locked';
    case 'alarm_control_panel':
      return s !== 'disarmed';
    case 'person':
    case 'device_tracker':
      return s === 'home';
    case 'humidifier':
    case 'fan':
    case 'light':
    case 'switch':
    case 'input_boolean':
    case 'binary_sensor':
    case 'automation':
    case 'group':
    case 'remote':
    case 'siren':
    case 'water_heater':
      return s === 'on' || s === 'home' || s === 'open' || s === 'true';
    default:
      return s !== 'off' && s !== 'closed' && s !== 'no' && s !== 'false';
  }
}

export function isUnavailable(stateObj: HassEntity | undefined): boolean {
  if (!stateObj) return true;
  return stateObj.state === 'unavailable' || stateObj.state === 'unknown';
}

export function entityName(entity: string, stateObj: HassEntity | undefined, override: string | undefined): string {
  if (override) return override;
  return stateObj?.attributes.friendly_name || entity;
}

export function entityIcon(stateObj: HassEntity | undefined, override: string | undefined): string | undefined {
  return override ?? stateObj?.attributes.icon;
}

export function supportsFeature(stateObj: HassEntity | undefined, feature: number): boolean {
  const sf = stateObj?.attributes.supported_features;
  return typeof sf === 'number' && (sf & feature) !== 0;
}
