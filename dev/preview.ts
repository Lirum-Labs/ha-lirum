import { makeMockHass, clearServiceLog, getServiceLog } from './fixtures';

const hass = makeMockHass();

interface CardSpec {
  tag: string;
  config: Record<string, unknown>;
  label: string;
}

const SPECS: CardSpec[] = [
  // Wave A — simple state cards
  { label: 'Entity',    tag: 'lirum-entity-card',     config: { type: 'custom:lirum-entity-card', entity: 'sensor.outside_temp' } },
  { label: 'Switch',    tag: 'lirum-switch-card',     config: { type: 'custom:lirum-switch-card', entity: 'switch.fan_corner' } },
  { label: 'Switch off',tag: 'lirum-switch-card',     config: { type: 'custom:lirum-switch-card', entity: 'switch.coffee_maker' } },
  { label: 'Lock',      tag: 'lirum-lock-card',       config: { type: 'custom:lirum-lock-card', entity: 'lock.front_door' } },
  { label: 'Lock unlocked', tag: 'lirum-lock-card',   config: { type: 'custom:lirum-lock-card', entity: 'lock.garage' } },
  { label: 'Person home', tag: 'lirum-person-card',   config: { type: 'custom:lirum-person-card', entity: 'person.alice' } },
  { label: 'Person away', tag: 'lirum-person-card',   config: { type: 'custom:lirum-person-card', entity: 'person.bob' } },
  { label: 'Title',     tag: 'lirum-title-card',      config: { type: 'custom:lirum-title-card', title: 'Living Room', subtitle: '21.8 °C · cozy', alignment: 'start' } },
  { label: 'Update available', tag: 'lirum-update-card', config: { type: 'custom:lirum-update-card', entity: 'update.hacs' } },
  { label: 'Update up-to-date', tag: 'lirum-update-card', config: { type: 'custom:lirum-update-card', entity: 'update.home_assistant_core' } },

  // Wave B — slider cards
  { label: 'Number',    tag: 'lirum-number-card',     config: { type: 'custom:lirum-number-card', entity: 'input_number.brightness_offset' } },
  { label: 'Slider (read-only)', tag: 'lirum-slider-card', config: { type: 'custom:lirum-slider-card', entity: 'sensor.outside_temp', min: -10, max: 40, step: 0.1, unit: '°C' } },
  { label: 'Humidifier', tag: 'lirum-humidifier-card', config: { type: 'custom:lirum-humidifier-card', entity: 'humidifier.bedroom' } },

  // Wave C — complex cards
  { label: 'Light on',  tag: 'lirum-light-card',      config: { type: 'custom:lirum-light-card', entity: 'light.living_room', show_brightness_control: true, show_color_temp_control: true, show_color_control: true } },
  { label: 'Light off', tag: 'lirum-light-card',      config: { type: 'custom:lirum-light-card', entity: 'light.kitchen' } },
  { label: 'Cover',     tag: 'lirum-cover-card',      config: { type: 'custom:lirum-cover-card', entity: 'cover.bedroom_blinds', show_buttons_control: true, show_position_control: true } },
  { label: 'Cover (garage)', tag: 'lirum-cover-card', config: { type: 'custom:lirum-cover-card', entity: 'cover.garage_door' } },
  { label: 'Climate',   tag: 'lirum-climate-card',    config: { type: 'custom:lirum-climate-card', entity: 'climate.living_room', show_temperature_control: true } },
  { label: 'Fan',       tag: 'lirum-fan-card',        config: { type: 'custom:lirum-fan-card', entity: 'fan.bedroom', show_percentage_control: true, show_oscillate_control: true } },
  { label: 'Media',     tag: 'lirum-media-card',      config: { type: 'custom:lirum-media-card', entity: 'media_player.living_room_speaker' } },
  { label: 'Vacuum',    tag: 'lirum-vacuum-card',     config: { type: 'custom:lirum-vacuum-card', entity: 'vacuum.roomba' } },

  // Wave D
  { label: 'Select',    tag: 'lirum-select-card',     config: { type: 'custom:lirum-select-card', entity: 'select.washer_mode' } },
  { label: 'Alarm',     tag: 'lirum-alarm-card',      config: { type: 'custom:lirum-alarm-card', entity: 'alarm_control_panel.home', show_keypad: false } },
  { label: 'Chips',     tag: 'lirum-chips-card',      config: {
    type: 'custom:lirum-chips-card',
    chips: [
      { type: 'entity', entity: 'switch.fan_corner', icon: 'mdi:fan' },
      { type: 'entity', entity: 'light.living_room', icon: 'mdi:lightbulb' },
      { type: 'weather', entity: 'weather.home' },
      { type: 'entity', entity: 'sun.sun', icon: 'mdi:weather-sunny' },
    ],
  } },
  { label: 'Template',  tag: 'lirum-template-card',   config: {
    type: 'custom:lirum-template-card',
    entity: 'sensor.outside_temp',
    primary: "Outside: {{ states('sensor.outside_temp') }}°C",
    secondary: "Sun is {{ states('sun.sun') }}",
    icon: 'mdi:thermometer',
    icon_color: 'cool',
  } },

  // Wave E — sensor / button / scene / script
  { label: 'Sensor (temp)', tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.outside_temp' } },
  { label: 'Sensor (battery low)', tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.phone_battery', show_bar: true } },
  { label: 'Sensor (power, trend)', tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.solar_power', show_trend: true, trend_points: [2100, 2200, 2350, 2420, 2480, 2460, 2510] } },
  { label: 'Binary sensor (motion)', tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'binary_sensor.motion_hall' } },
  { label: 'Button', tag: 'lirum-button-card', config: { type: 'custom:lirum-button-card', entity: 'button.restart_router', name: 'Restart Router', secondary: 'Last triggered: never' } },
  { label: 'Scene', tag: 'lirum-scene-card', config: { type: 'custom:lirum-scene-card', entity: 'scene.movie_time' } },
  { label: 'Scene (never)', tag: 'lirum-scene-card', config: { type: 'custom:lirum-scene-card', entity: 'scene.morning' } },
  { label: 'Script (idle)', tag: 'lirum-script-card', config: { type: 'custom:lirum-script-card', entity: 'script.bedtime_routine' } },
  { label: 'Script (running)', tag: 'lirum-script-card', config: { type: 'custom:lirum-script-card', entity: 'script.run_now' } },

  // Wave F — camera / weather / gauge / tile
  { label: 'Camera', tag: 'lirum-camera-card', config: { type: 'custom:lirum-camera-card', entity: 'camera.front_door' } },
  { label: 'Weather', tag: 'lirum-weather-card', config: { type: 'custom:lirum-weather-card', entity: 'weather.home' } },
  { label: 'Gauge (power)', tag: 'lirum-gauge-card', config: { type: 'custom:lirum-gauge-card', entity: 'sensor.solar_power', min: 0, max: 5000, unit: 'W', label: 'SOLAR' } },
  { label: 'Tile (sensor)', tag: 'lirum-tile-card', config: { type: 'custom:lirum-tile-card', entity: 'sensor.outside_temp', label: 'Outside', show_spark: true, spark_points: [12.1, 12.3, 12.6, 13.0, 13.4, 13.9, 14.2] } },

  // Wave G — layout containers
  { label: 'Markdown', tag: 'lirum-markdown-card', config: { type: 'custom:lirum-markdown-card', title: 'About', content: "**Lirum Cards** is a Mushroom-equivalent suite with the look of [ha-power-gauge](https://github.com/Lirum-Labs/ha-power-gauge).\n\n- 31 card types\n- shared design system\n- works in `light` and `dark` HA themes" } },
  { label: 'Stack (vertical)', tag: 'lirum-stack-card', config: {
    type: 'custom:lirum-stack-card', title: 'Pair', direction: 'vertical',
    cards: [
      { type: 'custom:lirum-switch-card', entity: 'switch.fan_corner' },
      { type: 'custom:lirum-switch-card', entity: 'switch.coffee_maker' },
    ],
  } },
  { label: 'Grid (2 col)', tag: 'lirum-grid-card', config: {
    type: 'custom:lirum-grid-card', columns: 2, gap: 10,
    cards: [
      { type: 'custom:lirum-tile-card', entity: 'sensor.outside_temp', label: 'Out' },
      { type: 'custom:lirum-tile-card', entity: 'sensor.kitchen_humidity', label: 'Kit' },
      { type: 'custom:lirum-tile-card', entity: 'sensor.phone_battery', label: 'Bat' },
      { type: 'custom:lirum-tile-card', entity: 'sensor.solar_power', label: 'Sun' },
    ],
  } },
  { label: 'Conditional (lit on)', tag: 'lirum-conditional-card', config: {
    type: 'custom:lirum-conditional-card',
    conditions: [{ condition: 'state', entity: 'light.living_room', state: 'on' }],
    card: { type: 'custom:lirum-light-card', entity: 'light.living_room', show_brightness_control: true },
  } },
];

interface CardElement extends HTMLElement {
  hass?: unknown;
  setConfig?: (cfg: Record<string, unknown>) => void;
}

const mounted: Array<{ el: CardElement; spec: CardSpec }> = [];

function mountCard(spec: CardSpec, host: HTMLElement): CardElement | null {
  let el: CardElement;
  try {
    el = document.createElement(spec.tag) as CardElement;
  } catch (e) {
    console.warn(`Failed to create ${spec.tag}`, e);
    return null;
  }
  if (typeof el.setConfig !== 'function') {
    // Card class not registered yet (likely not built).
    host.textContent = `${spec.tag} not registered`;
    host.classList.add('missing');
    return null;
  }
  try {
    el.setConfig(spec.config);
  } catch (e) {
    host.textContent = `setConfig error: ${(e as Error).message}`;
    host.classList.add('missing');
    return null;
  }
  el.hass = hass;
  host.appendChild(el);
  return el;
}

function refreshAll(): void {
  for (const m of mounted) {
    // Assigning the same hass instance triggers Lit re-render via reactive property.
    m.el.hass = hass;
  }
}

function renderLog(): void {
  const logEl = document.getElementById('service-log');
  if (!logEl) return;
  const entries = getServiceLog();
  if (entries.length === 0) {
    logEl.textContent = '(no service calls yet — interact with a card)';
    return;
  }
  logEl.textContent = entries
    .slice(-12)
    .map((e) => `${e.domain}.${e.service}  ${JSON.stringify(e.data ?? {})}`)
    .join('\n');
}

function buildLayout(): void {
  const grid = document.getElementById('grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (const spec of SPECS) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const label = document.createElement('div');
    label.className = 'cell-label';
    label.textContent = spec.label;
    const host = document.createElement('div');
    host.className = 'cell-host';
    cell.appendChild(label);
    cell.appendChild(host);
    grid.appendChild(cell);
    const el = mountCard(spec, host);
    if (el) mounted.push({ el, spec });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  buildLayout();
  renderLog();
});

document.addEventListener('lirum-mock-state-changed', () => {
  refreshAll();
  renderLog();
});

const clearBtn = (): HTMLElement | null => document.getElementById('clear-log');
window.addEventListener('DOMContentLoaded', () => {
  const btn = clearBtn();
  btn?.addEventListener('click', () => {
    clearServiceLog();
    renderLog();
  });
});
