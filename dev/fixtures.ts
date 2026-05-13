import type { HomeAssistant, HassEntity } from '../src/core/hass';

let serviceLog: Array<{ domain: string; service: string; data?: Record<string, unknown> }> = [];

export function clearServiceLog(): void {
  serviceLog = [];
}

export function getServiceLog(): typeof serviceLog {
  return serviceLog;
}

function makeEntity(
  id: string,
  state: string,
  attrs: Partial<HassEntity['attributes']> & Record<string, unknown> = {},
): HassEntity {
  return {
    entity_id: id,
    state,
    attributes: {
      friendly_name: attrs.friendly_name ?? id.split('.')[1].replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      ...attrs,
    },
  };
}

const ENTITIES: HassEntity[] = [
  // Lights
  makeEntity('light.living_room', 'on', {
    friendly_name: 'Living Room',
    brightness: 204,
    color_mode: 'rgb',
    rgb_color: [255, 180, 100],
    supported_color_modes: ['rgb', 'color_temp'],
    min_color_temp_kelvin: 2200,
    max_color_temp_kelvin: 6500,
    color_temp_kelvin: 3000,
    supported_features: 63,
  }),
  makeEntity('light.kitchen', 'off', {
    friendly_name: 'Kitchen',
    supported_color_modes: ['onoff'],
  }),
  // Switches & booleans
  makeEntity('switch.fan_corner', 'on', { friendly_name: 'Corner Fan' }),
  makeEntity('switch.coffee_maker', 'off', { friendly_name: 'Coffee Maker' }),
  makeEntity('input_boolean.movie_mode', 'on', { friendly_name: 'Movie Mode' }),
  // Cover
  makeEntity('cover.bedroom_blinds', 'open', {
    friendly_name: 'Bedroom Blinds',
    current_position: 60,
    supported_features: 15,
  }),
  makeEntity('cover.garage_door', 'closed', {
    friendly_name: 'Garage Door',
    device_class: 'garage',
    supported_features: 11,
  }),
  // Climate
  makeEntity('climate.living_room', 'heat', {
    friendly_name: 'Living Room Thermostat',
    current_temperature: 21.5,
    temperature: 22,
    target_temp_step: 0.5,
    min_temp: 7,
    max_temp: 35,
    hvac_modes: ['off', 'heat', 'cool', 'auto', 'heat_cool'],
    hvac_action: 'heating',
    unit_of_measurement: '°C',
    supported_features: 401,
  }),
  // Fan
  makeEntity('fan.bedroom', 'on', {
    friendly_name: 'Bedroom Fan',
    percentage: 75,
    oscillating: true,
    supported_features: 31,
  }),
  // Media
  makeEntity('media_player.living_room_speaker', 'playing', {
    friendly_name: 'Living Room Speaker',
    media_title: 'Midnight City',
    media_artist: 'M83',
    media_album_name: 'Hurry Up, We’re Dreaming',
    volume_level: 0.42,
    is_volume_muted: false,
    supported_features: 152509,
  }),
  // Lock
  makeEntity('lock.front_door', 'locked', { friendly_name: 'Front Door' }),
  makeEntity('lock.garage', 'unlocked', { friendly_name: 'Garage' }),
  // Person
  makeEntity('person.alice', 'home', {
    friendly_name: 'Alice',
    source: 'device_tracker.alice_phone',
  }),
  makeEntity('person.bob', 'work', { friendly_name: 'Bob' }),
  // Select
  makeEntity('select.washer_mode', 'normal', {
    friendly_name: 'Washer Mode',
    options: ['normal', 'eco', 'fast', 'delicate'],
  }),
  makeEntity('input_select.scene', 'evening', {
    friendly_name: 'Scene',
    options: ['morning', 'day', 'evening', 'night'],
  }),
  // Number
  makeEntity('input_number.brightness_offset', '50', {
    friendly_name: 'Brightness Offset',
    min: 0,
    max: 100,
    step: 5,
    mode: 'slider',
    unit_of_measurement: '%',
  }),
  makeEntity('number.boiler_setpoint', '60', {
    friendly_name: 'Boiler Setpoint',
    min: 30,
    max: 90,
    step: 1,
    unit_of_measurement: '°C',
  }),
  // Vacuum
  makeEntity('vacuum.roomba', 'docked', {
    friendly_name: 'Roomba',
    battery_level: 92,
    supported_features: 12380,
  }),
  // Update
  makeEntity('update.hacs', 'on', {
    friendly_name: 'HACS',
    installed_version: '2.0.1',
    latest_version: '2.1.0',
    auto_update: false,
  }),
  makeEntity('update.home_assistant_core', 'off', {
    friendly_name: 'Home Assistant Core',
    installed_version: '2026.5.1',
    latest_version: '2026.5.1',
  }),
  // Humidifier
  makeEntity('humidifier.bedroom', 'on', {
    friendly_name: 'Bedroom Humidifier',
    humidity: 50,
    current_humidity: 42,
    min_humidity: 30,
    max_humidity: 80,
    mode: 'normal',
    available_modes: ['normal', 'sleep', 'eco'],
    supported_features: 1,
  }),
  // Alarm
  makeEntity('alarm_control_panel.home', 'disarmed', {
    friendly_name: 'Home Alarm',
    code_format: 'number',
    code_arm_required: false,
    supported_features: 47,
  }),
  // Sensors / misc for chips
  makeEntity('sun.sun', 'above_horizon', { friendly_name: 'Sun' }),
  makeEntity('sensor.outside_temp', '14.2', {
    friendly_name: 'Outside Temp',
    unit_of_measurement: '°C',
    device_class: 'temperature',
  }),
  makeEntity('weather.home', 'partlycloudy', {
    friendly_name: 'Home Weather',
    temperature: 14.2,
    humidity: 64,
  }),
];

export function makeMockHass(): HomeAssistant {
  const states: Record<string, HassEntity> = {};
  for (const e of ENTITIES) states[e.entity_id] = e;

  const hass: HomeAssistant = {
    states,
    themes: { darkMode: true },
    language: 'en',
    locale: { language: 'en' },
    callService: async (domain, service, serviceData, _target) => {
      const data = serviceData ?? {};
      serviceLog.push({ domain, service, data });
      const entityId = (data.entity_id as string) ?? '';
      const e = states[entityId];
      if (!e) return;
      // Minimal optimistic mutation so the dev preview reflects calls.
      const key = `${domain}.${service}`;
      switch (key) {
        case 'light.toggle':
        case 'switch.toggle':
        case 'fan.toggle':
        case 'input_boolean.toggle':
        case 'humidifier.toggle':
          e.state = e.state === 'on' ? 'off' : 'on';
          break;
        case 'light.turn_on':
        case 'switch.turn_on':
        case 'fan.turn_on':
        case 'input_boolean.turn_on':
        case 'humidifier.turn_on':
          e.state = 'on';
          if (typeof data.brightness_pct === 'number') {
            e.attributes.brightness = Math.round((data.brightness_pct as number) * 2.55);
          }
          if (Array.isArray(data.rgb_color)) {
            e.attributes.rgb_color = data.rgb_color as number[];
          }
          if (typeof data.color_temp_kelvin === 'number') {
            e.attributes.color_temp_kelvin = data.color_temp_kelvin;
          }
          break;
        case 'light.turn_off':
        case 'switch.turn_off':
        case 'fan.turn_off':
        case 'input_boolean.turn_off':
        case 'humidifier.turn_off':
          e.state = 'off';
          break;
        case 'lock.lock':
          e.state = 'locked';
          break;
        case 'lock.unlock':
          e.state = 'unlocked';
          break;
        case 'cover.open_cover':
          e.state = 'open';
          (e.attributes as Record<string, unknown>).current_position = 100;
          break;
        case 'cover.close_cover':
          e.state = 'closed';
          (e.attributes as Record<string, unknown>).current_position = 0;
          break;
        case 'cover.set_cover_position':
          e.state = (data.position as number) >= 100 ? 'open' : (data.position as number) <= 0 ? 'closed' : 'open';
          (e.attributes as Record<string, unknown>).current_position = data.position as number;
          break;
        case 'climate.set_temperature':
          (e.attributes as Record<string, unknown>).temperature = data.temperature as number;
          break;
        case 'climate.set_hvac_mode':
          e.state = data.hvac_mode as string;
          break;
        case 'fan.set_percentage':
          (e.attributes as Record<string, unknown>).percentage = data.percentage as number;
          e.state = (data.percentage as number) > 0 ? 'on' : 'off';
          break;
        case 'humidifier.set_humidity':
          (e.attributes as Record<string, unknown>).humidity = data.humidity as number;
          break;
        case 'humidifier.set_mode':
          (e.attributes as Record<string, unknown>).mode = data.mode as string;
          break;
        case 'select.select_option':
        case 'input_select.select_option':
          e.state = data.option as string;
          break;
        case 'input_number.set_value':
        case 'number.set_value':
          e.state = String(data.value);
          break;
        case 'media_player.media_play':
          e.state = 'playing';
          break;
        case 'media_player.media_pause':
          e.state = 'paused';
          break;
        case 'media_player.media_play_pause':
          e.state = e.state === 'playing' ? 'paused' : 'playing';
          break;
        case 'media_player.volume_set':
          (e.attributes as Record<string, unknown>).volume_level = data.volume_level as number;
          break;
        case 'media_player.volume_mute':
          (e.attributes as Record<string, unknown>).is_volume_muted = data.is_volume_muted as boolean;
          break;
        case 'vacuum.start':
          e.state = 'cleaning';
          break;
        case 'vacuum.pause':
          e.state = 'paused';
          break;
        case 'vacuum.stop':
          e.state = 'idle';
          break;
        case 'vacuum.return_to_base':
          e.state = 'returning';
          break;
        case 'update.install':
          (e.attributes as Record<string, unknown>).installed_version = (e.attributes as Record<string, unknown>).latest_version;
          e.state = 'off';
          break;
        case 'alarm_control_panel.alarm_arm_home':
          e.state = 'armed_home';
          break;
        case 'alarm_control_panel.alarm_arm_away':
          e.state = 'armed_away';
          break;
        case 'alarm_control_panel.alarm_arm_night':
          e.state = 'armed_night';
          break;
        case 'alarm_control_panel.alarm_disarm':
          e.state = 'disarmed';
          break;
      }
      // Re-render any cards that are bound to this hass — handled by the
      // preview harness, which clones & reassigns hass on every mutation.
      document.dispatchEvent(new CustomEvent('lirum-mock-state-changed'));
    },
    callApi: async <T = unknown>() => undefined as unknown as T,
    formatEntityState: (s) => s.state,
    formatEntityAttributeValue: (_s, _a, v) => String(v),
  };

  return hass;
}
