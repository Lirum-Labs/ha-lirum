import type { HassEntity } from './hass';
import { domainOf, stateActive } from './hass';

const DEFAULT_ICONS: Record<string, string> = {
  alarm_control_panel: 'mdi:shield-home',
  automation: 'mdi:robot',
  binary_sensor: 'mdi:radiobox-blank',
  button: 'mdi:gesture-tap-button',
  camera: 'mdi:video',
  climate: 'mdi:thermostat',
  cover: 'mdi:window-shutter',
  device_tracker: 'mdi:account',
  fan: 'mdi:fan',
  group: 'mdi:google-circles-communities',
  humidifier: 'mdi:air-humidifier',
  input_boolean: 'mdi:toggle-switch',
  input_button: 'mdi:gesture-tap-button',
  input_number: 'mdi:ray-vertex',
  input_select: 'mdi:format-list-bulleted',
  input_text: 'mdi:form-textbox',
  light: 'mdi:lightbulb',
  lock: 'mdi:lock',
  media_player: 'mdi:cast',
  number: 'mdi:ray-vertex',
  person: 'mdi:account',
  plant: 'mdi:flower',
  remote: 'mdi:remote',
  scene: 'mdi:palette',
  script: 'mdi:script-text',
  select: 'mdi:format-list-bulleted',
  sensor: 'mdi:eye',
  siren: 'mdi:bullhorn',
  sun: 'mdi:white-balance-sunny',
  switch: 'mdi:flash',
  timer: 'mdi:timer-outline',
  update: 'mdi:package-down',
  vacuum: 'mdi:robot-vacuum',
  water_heater: 'mdi:thermometer',
  weather: 'mdi:weather-partly-cloudy',
  zone: 'mdi:map-marker-radius',
};

function stateAwareIcon(domain: string, stateObj: HassEntity | undefined): string | undefined {
  const s = stateObj?.state;
  switch (domain) {
    case 'cover': {
      if (s === 'closed') return 'mdi:window-shutter';
      if (s === 'opening') return 'mdi:arrow-up-box';
      if (s === 'closing') return 'mdi:arrow-down-box';
      return 'mdi:window-shutter-open';
    }
    case 'lock':
      return s === 'locked' ? 'mdi:lock' : 'mdi:lock-open-variant';
    case 'alarm_control_panel':
      switch (s) {
        case 'disarmed': return 'mdi:shield-off';
        case 'armed_home': return 'mdi:shield-home';
        case 'armed_away': return 'mdi:shield-lock';
        case 'armed_night': return 'mdi:shield-moon';
        case 'armed_vacation': return 'mdi:shield-airplane';
        case 'pending':
        case 'arming': return 'mdi:shield-outline';
        case 'triggered': return 'mdi:bell-ring';
        default: return 'mdi:shield';
      }
    case 'media_player':
      if (s === 'playing') return 'mdi:play';
      if (s === 'paused') return 'mdi:pause';
      if (s === 'idle' || s === 'standby') return 'mdi:speaker';
      if (s === 'off') return 'mdi:speaker-off';
      return 'mdi:cast';
    case 'vacuum':
      if (s === 'cleaning') return 'mdi:robot-vacuum-variant';
      if (s === 'returning') return 'mdi:home-import-outline';
      if (s === 'docked') return 'mdi:robot-vacuum';
      return 'mdi:robot-vacuum-alert';
    case 'switch':
      return stateActive(stateObj) ? 'mdi:flash' : 'mdi:flash-off';
    case 'light':
      return stateActive(stateObj) ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline';
    case 'fan':
      return stateActive(stateObj) ? 'mdi:fan' : 'mdi:fan-off';
    case 'humidifier':
      return stateActive(stateObj) ? 'mdi:air-humidifier' : 'mdi:air-humidifier-off';
  }
  return undefined;
}

export function defaultIconFor(stateObj: HassEntity | undefined, entityId?: string): string {
  if (!stateObj && !entityId) return 'mdi:bookmark-outline';
  const id = stateObj?.entity_id ?? entityId!;
  const domain = domainOf(id);
  return stateAwareIcon(domain, stateObj) ?? DEFAULT_ICONS[domain] ?? 'mdi:bookmark-outline';
}
