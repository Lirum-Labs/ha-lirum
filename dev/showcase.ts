/**
 * Standalone showcase / demo page (no HA required). Renders every card type
 * in real-world scenes against the mock-hass fixtures. Supports theme
 * (dark / light) and variant (dark-glow / blended) toggles for screenshots.
 */
import { makeMockHass } from './fixtures';

interface CardSpec {
  tag: string;
  config: Record<string, unknown>;
  span?: number;
}

interface Scene {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  cards: CardSpec[];
  columns?: number;
}

const SCENES: Scene[] = [
  {
    id: 'living-room',
    title: 'Living room',
    subtitle: 'Evening relaxation — lights, climate, music',
    icon: 'mdi:sofa',
    columns: 3,
    cards: [
      { tag: 'lirum-title-card', config: { type: 'custom:lirum-title-card', title: 'Living room', subtitle: '21.5 °C · cozy', alignment: 'start' }, span: 3 },
      { tag: 'lirum-light-card', config: { type: 'custom:lirum-light-card', entity: 'light.living_room', show_brightness_control: true, show_color_temp_control: true, show_color_control: true, use_light_color: true, collapsible_controls: false } },
      { tag: 'lirum-light-card', config: { type: 'custom:lirum-light-card', entity: 'light.kitchen' } },
      { tag: 'lirum-climate-card', config: { type: 'custom:lirum-climate-card', entity: 'climate.living_room', show_temperature_control: true } },
      { tag: 'lirum-media-card', config: { type: 'custom:lirum-media-card', entity: 'media_player.living_room_speaker', show_volume_control: true, show_transport_control: true, show_mute_control: true }, span: 2 },
      { tag: 'lirum-chips-card', config: {
          type: 'custom:lirum-chips-card',
          alignment: 'start',
          chips: [
            { type: 'entity', entity: 'switch.fan_corner', icon: 'mdi:fan', content_info: 'state' },
            { type: 'entity', entity: 'light.living_room', icon: 'mdi:lightbulb' },
            { type: 'weather', entity: 'weather.home' },
            { type: 'entity', entity: 'sun.sun', icon: 'mdi:weather-sunny' },
            { type: 'action', icon: 'mdi:lightning-bolt', label: '2.5 kW', tap_action: { action: 'more-info' } },
          ],
        },
      },
    ],
  },
  {
    id: 'doors',
    title: 'Doors & access',
    subtitle: 'Locks, blinds, alarm and the front-door camera',
    icon: 'mdi:shield-home',
    columns: 3,
    cards: [
      { tag: 'lirum-lock-card', config: { type: 'custom:lirum-lock-card', entity: 'lock.front_door' } },
      { tag: 'lirum-lock-card', config: { type: 'custom:lirum-lock-card', entity: 'lock.garage' } },
      { tag: 'lirum-cover-card', config: { type: 'custom:lirum-cover-card', entity: 'cover.garage_door' } },
      { tag: 'lirum-cover-card', config: { type: 'custom:lirum-cover-card', entity: 'cover.bedroom_blinds', show_buttons_control: true, show_position_control: true } },
      { tag: 'lirum-alarm-card', config: { type: 'custom:lirum-alarm-card', entity: 'alarm_control_panel.home', show_keypad: false }, span: 2 },
      { tag: 'lirum-camera-card', config: { type: 'custom:lirum-camera-card', entity: 'camera.front_door', aspect_ratio: '16:9' }, span: 3 },
    ],
  },
  {
    id: 'sensors',
    title: 'At a glance',
    subtitle: 'Weather, KPI tiles, a hero gauge and trend sparklines',
    icon: 'mdi:gauge',
    columns: 4,
    cards: [
      { tag: 'lirum-weather-card', config: { type: 'custom:lirum-weather-card', entity: 'weather.home', show_forecast: true, forecast_days: 5, show_details: true }, span: 2 },
      { tag: 'lirum-gauge-card', config: { type: 'custom:lirum-gauge-card', entity: 'sensor.solar_power', min: 0, max: 5000, unit: 'W', label: 'SOLAR', size: 200, thresholds: [
            { value: 0,    color: 'cool' },
            { value: 1500, color: 'energy' },
            { value: 3500, color: 'amber' },
            { value: 4500, color: 'alert' },
          ] }, span: 2 },
      { tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.outside_temp', show_trend: true, trend_points: [12.1, 12.3, 12.6, 13.0, 13.4, 13.9, 14.2, 14.0, 13.7, 13.5, 13.6] }, span: 2 },
      { tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.solar_power', show_trend: true, trend_points: [80, 150, 320, 680, 1100, 1850, 2480, 2620, 2540, 2380, 2100] }, span: 2 },
      { tag: 'lirum-tile-card', config: { type: 'custom:lirum-tile-card', entity: 'sensor.outside_temp', label: 'Outside', decimals: 1, show_spark: true, spark_points: [12.1, 12.6, 13.4, 13.9, 14.2] } },
      { tag: 'lirum-tile-card', config: { type: 'custom:lirum-tile-card', entity: 'sensor.kitchen_humidity', label: 'Humidity', decimals: 0 } },
      { tag: 'lirum-tile-card', config: { type: 'custom:lirum-tile-card', entity: 'sensor.phone_battery', label: 'Battery', decimals: 0 } },
      { tag: 'lirum-tile-card', config: { type: 'custom:lirum-tile-card', entity: 'sensor.solar_power', label: 'Power', decimals: 0, show_spark: true, spark_points: [80, 320, 1100, 2480, 2540, 2100] } },
      { tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'sensor.phone_battery', show_bar: true }, span: 2 },
      { tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'binary_sensor.motion_hall' } },
      { tag: 'lirum-sensor-card', config: { type: 'custom:lirum-sensor-card', entity: 'binary_sensor.window_office' } },
    ],
  },
  {
    id: 'comfort',
    title: 'Comfort',
    subtitle: 'Air movement, humidity, the robot vacuum',
    icon: 'mdi:fan',
    columns: 3,
    cards: [
      { tag: 'lirum-fan-card', config: { type: 'custom:lirum-fan-card', entity: 'fan.bedroom', show_percentage_control: true, show_oscillate_control: true } },
      { tag: 'lirum-humidifier-card', config: { type: 'custom:lirum-humidifier-card', entity: 'humidifier.bedroom' } },
      { tag: 'lirum-vacuum-card', config: { type: 'custom:lirum-vacuum-card', entity: 'vacuum.roomba' } },
    ],
  },
  {
    id: 'people',
    title: 'People',
    subtitle: 'Presence, person avatars',
    icon: 'mdi:account-group',
    columns: 3,
    cards: [
      { tag: 'lirum-person-card', config: { type: 'custom:lirum-person-card', entity: 'person.alice' } },
      { tag: 'lirum-person-card', config: { type: 'custom:lirum-person-card', entity: 'person.bob' } },
      { tag: 'lirum-entity-card', config: { type: 'custom:lirum-entity-card', entity: 'sun.sun', name: 'Sun', icon_color: 'amber' } },
    ],
  },
  {
    id: 'actions',
    title: 'Quick actions',
    subtitle: 'Hero tap targets — buttons, scenes, scripts',
    icon: 'mdi:gesture-tap-button',
    columns: 3,
    cards: [
      { tag: 'lirum-button-card', config: { type: 'custom:lirum-button-card', entity: 'button.restart_router', name: 'Restart Router', secondary: 'Last triggered: never', icon: 'mdi:restart', icon_color: 'alert' } },
      { tag: 'lirum-scene-card', config: { type: 'custom:lirum-scene-card', entity: 'scene.movie_time' } },
      { tag: 'lirum-scene-card', config: { type: 'custom:lirum-scene-card', entity: 'scene.morning' } },
      { tag: 'lirum-script-card', config: { type: 'custom:lirum-script-card', entity: 'script.bedtime_routine' } },
      { tag: 'lirum-script-card', config: { type: 'custom:lirum-script-card', entity: 'script.run_now' } },
      { tag: 'lirum-switch-card', config: { type: 'custom:lirum-switch-card', entity: 'input_boolean.movie_mode' } },
    ],
  },
  {
    id: 'numbers',
    title: 'Inputs & selects',
    subtitle: 'Sliders, choices, ranges',
    icon: 'mdi:tune',
    columns: 3,
    cards: [
      { tag: 'lirum-number-card', config: { type: 'custom:lirum-number-card', entity: 'input_number.brightness_offset' } },
      { tag: 'lirum-slider-card', config: { type: 'custom:lirum-slider-card', entity: 'sensor.outside_temp', min: -10, max: 40, step: 0.1, unit: '°C' } },
      { tag: 'lirum-number-card', config: { type: 'custom:lirum-number-card', entity: 'number.boiler_setpoint' } },
      { tag: 'lirum-select-card', config: { type: 'custom:lirum-select-card', entity: 'select.washer_mode' } },
      { tag: 'lirum-select-card', config: { type: 'custom:lirum-select-card', entity: 'input_select.scene', inline_options: true }, span: 2 },
    ],
  },
  {
    id: 'updates',
    title: 'Maintenance & info',
    subtitle: 'Updates, templates and rendered markdown',
    icon: 'mdi:package-down',
    columns: 3,
    cards: [
      { tag: 'lirum-update-card', config: { type: 'custom:lirum-update-card', entity: 'update.hacs' } },
      { tag: 'lirum-update-card', config: { type: 'custom:lirum-update-card', entity: 'update.home_assistant_core' } },
      { tag: 'lirum-template-card', config: {
          type: 'custom:lirum-template-card',
          entity: 'sensor.outside_temp',
          primary: "Outside: {{ states('sensor.outside_temp') }}°C",
          secondary: "Sun is {{ states('sun.sun') }}",
          icon: 'mdi:thermometer',
          icon_color: 'cool',
        },
      },
      { tag: 'lirum-markdown-card', config: {
          type: 'custom:lirum-markdown-card',
          title: 'About Lirum',
          content: "**Lirum Cards** is a Mushroom-equivalent suite with the look of [ha-power-gauge](https://github.com/Lirum-Labs/ha-power-gauge).\n\n- 31 card types\n- Shared design system\n- Theme-adaptive (`background: transparent` per card)\n- One HACS install\n\nPaste the dashboard YAML in `docs/example-dashboard.yaml` to get started.",
        }, span: 2,
      },
    ],
  },
  {
    id: 'compositions',
    title: 'Compositions',
    subtitle: 'Layout containers — stack, grid, conditional',
    icon: 'mdi:view-grid-plus',
    columns: 3,
    cards: [
      { tag: 'lirum-stack-card', config: {
          type: 'custom:lirum-stack-card',
          title: 'Pair',
          direction: 'vertical',
          cards: [
            { type: 'custom:lirum-switch-card', entity: 'switch.fan_corner' },
            { type: 'custom:lirum-switch-card', entity: 'switch.coffee_maker' },
          ],
        },
      },
      { tag: 'lirum-grid-card', config: {
          type: 'custom:lirum-grid-card',
          columns: 2,
          gap: 8,
          cards: [
            { type: 'custom:lirum-tile-card', entity: 'sensor.outside_temp', label: 'Out' },
            { type: 'custom:lirum-tile-card', entity: 'sensor.kitchen_humidity', label: 'Kit' },
            { type: 'custom:lirum-tile-card', entity: 'sensor.phone_battery', label: 'Bat' },
            { type: 'custom:lirum-tile-card', entity: 'sensor.solar_power', label: 'Sun' },
          ],
        },
      },
      { tag: 'lirum-conditional-card', config: {
          type: 'custom:lirum-conditional-card',
          conditions: [{ condition: 'state', entity: 'light.living_room', state: 'on' }],
          card: { type: 'custom:lirum-light-card', entity: 'light.living_room', show_brightness_control: true },
        },
      },
    ],
  },
];

interface CardElement extends HTMLElement {
  hass?: unknown;
  setConfig?: (cfg: Record<string, unknown>) => void;
}

const hass = makeMockHass();
let blended = false;

const mounted: Array<{ el: CardElement; spec: CardSpec }> = [];

function mountCard(spec: CardSpec, host: HTMLElement): CardElement | null {
  let el: CardElement;
  try { el = document.createElement(spec.tag) as CardElement; } catch { return null; }
  if (typeof el.setConfig !== 'function') {
    host.classList.add('missing');
    host.textContent = `${spec.tag} not registered — run \`npm run build\``;
    return null;
  }
  const cfg = applyVariant({ ...spec.config });
  try { el.setConfig(cfg); } catch (e) {
    host.classList.add('missing');
    host.textContent = `${spec.tag}: ${(e as Error).message}`;
    return null;
  }
  el.hass = hass;
  host.appendChild(el);
  return el;
}

function applyVariant(cfg: Record<string, unknown>): Record<string, unknown> {
  if (blended && typeof cfg.type === 'string' && cfg.type.startsWith('custom:lirum-')) {
    cfg.background = 'transparent';
  } else if (!blended) {
    delete cfg.background;
  }
  return cfg;
}

function buildScene(scene: Scene): HTMLElement {
  const section = document.createElement('section');
  section.className = 'scene';
  section.id = scene.id;
  section.style.setProperty('--cols', String(scene.columns ?? 3));

  const header = document.createElement('div');
  header.className = 'scene-header';
  const h = document.createElement('h2');
  h.innerHTML = `<ha-icon icon="${scene.icon}"></ha-icon><span>${scene.title}</span>`;
  const sub = document.createElement('p');
  sub.textContent = scene.subtitle;
  header.appendChild(h);
  header.appendChild(sub);
  section.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'scene-grid';
  for (const spec of scene.cards) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (spec.span && spec.span > 1) cell.style.gridColumn = `span ${spec.span}`;
    grid.appendChild(cell);
    const el = mountCard(spec, cell);
    if (el) mounted.push({ el, spec });
  }
  section.appendChild(grid);
  return section;
}

function buildNav(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'scene-nav';
  for (const scene of SCENES) {
    const a = document.createElement('a');
    a.href = `#${scene.id}`;
    a.innerHTML = `<ha-icon icon="${scene.icon}"></ha-icon><span>${scene.title}</span>`;
    nav.appendChild(a);
  }
  return nav;
}

function setVariant(v: 'glow' | 'blended'): void {
  blended = v === 'blended';
  document.documentElement.dataset.variant = v;
  // Rebuild all cards with new config
  for (const m of mounted) {
    const host = m.el.parentElement!;
    host.removeChild(m.el);
  }
  mounted.length = 0;
  rebuildScenes();
}

function setTheme(t: 'dark' | 'light'): void {
  document.documentElement.dataset.theme = t;
}

function rebuildScenes(): void {
  const main = document.getElementById('scenes')!;
  main.innerHTML = '';
  for (const scene of SCENES) main.appendChild(buildScene(scene));
}

function attachControls(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-variant]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-variant]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      setVariant(btn.dataset.variant as 'glow' | 'blended');
    });
  });
  document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-theme]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      setTheme(btn.dataset.theme as 'dark' | 'light');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const navHost = document.getElementById('scene-nav-host');
  if (navHost) navHost.appendChild(buildNav());
  rebuildScenes();
  attachControls();

  // Re-render every 6s so the mock-hass ambient state mutations (if any) flow through.
  document.addEventListener('lirum-mock-state-changed', () => {
    for (const m of mounted) m.el.hass = hass;
  });
});
