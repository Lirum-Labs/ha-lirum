#!/usr/bin/env node
// Adds the Lirum Cards Lovelace resource and creates a "Lirum Showcase"
// dashboard inside Home Assistant via the WebSocket API.
//
// Requires:
//   HA_URL=http://homeassistant.local:8123 (default)
//   HA_TOKEN=<long-lived access token>      (required)
//   RESOURCE_URL=<url to lirum-cards.js>     (default: jsdelivr @main)
//
// Idempotent: re-runs are safe.

import { setTimeout as sleep } from 'node:timers/promises';

const HA_URL = process.env.HA_URL || 'http://homeassistant.local:8123';
const HA_TOKEN = process.env.HA_TOKEN;
const RESOURCE_URL = process.env.RESOURCE_URL
  || 'https://cdn.jsdelivr.net/gh/Lirum-Labs/ha-lirum@main/dist/lirum-cards.js';
const DASHBOARD_TITLE = 'Lirum Showcase';
const DASHBOARD_URL_PATH = 'lirum-showcase';

if (!HA_TOKEN) {
  console.error('error: HA_TOKEN env var is required');
  process.exit(1);
}

const wsUrl = HA_URL.replace(/^http/, 'ws') + '/api/websocket';
const ws = new WebSocket(wsUrl);

let msgId = 1;
const pending = new Map();

function send(payload) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, ...payload }));
  });
}

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.type === 'auth_required') {
    ws.send(JSON.stringify({ type: 'auth', access_token: HA_TOKEN }));
    return;
  }
  if (msg.type === 'auth_ok') {
    console.log('✓ authenticated');
    main().catch((e) => {
      console.error('✗', e.message);
      process.exit(1);
    });
    return;
  }
  if (msg.type === 'auth_invalid') {
    console.error('✗ auth_invalid:', msg.message);
    process.exit(1);
  }
  if (msg.type === 'result') {
    const p = pending.get(msg.id);
    if (!p) return;
    pending.delete(msg.id);
    if (msg.success) p.resolve(msg.result);
    else p.reject(new Error(msg.error?.message || 'unknown'));
  }
});

ws.addEventListener('error', (e) => {
  console.error('✗ websocket error:', e.message || e);
  process.exit(1);
});

async function ensureResource() {
  const resources = await send({ type: 'lovelace/resources' });
  const existing = resources.find((r) => r.url === RESOURCE_URL);
  if (existing) {
    console.log(`✓ resource already registered: ${RESOURCE_URL}`);
    return;
  }
  // If an older URL points to the same repo, update it; otherwise create.
  const stale = resources.find((r) => r.url.includes('Lirum-Labs/ha-lirum'));
  if (stale) {
    await send({
      type: 'lovelace/resources/update',
      resource_id: stale.id,
      url: RESOURCE_URL,
      res_type: 'module',
    });
    console.log(`✓ updated stale resource: ${stale.url} -> ${RESOURCE_URL}`);
  } else {
    await send({
      type: 'lovelace/resources/create',
      url: RESOURCE_URL,
      res_type: 'module',
    });
    console.log(`✓ created resource: ${RESOURCE_URL}`);
  }
}

function pickEntity(states, predicate) {
  return states.find(predicate);
}

function buildDashboard(states) {
  const has = (id) => states.some((s) => s.entity_id === id);
  const firstByDomain = (domain, extra) =>
    states.find((s) => s.entity_id.startsWith(`${domain}.`) && (!extra || extra(s)));
  const E = (domain, extra) => firstByDomain(domain, extra)?.entity_id;

  // Pick representative real entities. We avoid calling services — this is
  // purely a visual showcase.
  const lightOn = E('light', (s) => s.state === 'on') || E('light');
  const lightOff = E('light', (s) => s.state === 'off');
  const sw = E('switch');
  const ibool = E('input_boolean');
  const climate = E('climate');
  const cover = E('cover');
  const fan = E('fan');
  const media = E('media_player');
  const lock = E('lock');
  const person = E('person');
  const select = E('select') || E('input_select');
  const number = E('input_number') || E('number');
  const vacuum = E('vacuum');
  const update = E('update', (s) => s.state === 'on') || E('update');
  const humidifier = E('humidifier');
  const alarm = E('alarm_control_panel');
  const weather = E('weather');

  const tempSensor = states.find((s) => s.entity_id.startsWith('sensor.') && s.attributes.device_class === 'temperature')?.entity_id;
  const batterySensor = states.find((s) => s.entity_id.startsWith('sensor.') && s.attributes.device_class === 'battery')?.entity_id;
  const humiditySensor = states.find((s) => s.entity_id.startsWith('sensor.') && s.attributes.device_class === 'humidity')?.entity_id;
  const powerSensor = states.find((s) => s.entity_id.startsWith('sensor.') && s.attributes.device_class === 'power')?.entity_id;
  const motionSensor = states.find((s) => s.entity_id.startsWith('binary_sensor.') && s.attributes.device_class === 'motion')?.entity_id;
  const button = E('button');
  const scene = E('scene');
  const script = E('script');
  const camera = E('camera');

  /** Build a card config only when the entity exists. */
  const card = (type, entity, extra = {}) => entity ? { type: `custom:${type}`, entity, ...extra } : null;

  const sections = [];

  const livingRoom = [
    { type: 'custom:lirum-title-card', title: 'Living room', subtitle: 'Lights, climate & media', alignment: 'start' },
    card('lirum-light-card', lightOn, { show_brightness_control: true, show_color_temp_control: true, show_color_control: true, collapsible_controls: true }),
    card('lirum-light-card', lightOff),
    card('lirum-climate-card', climate, { show_temperature_control: true }),
    card('lirum-media-card', media, { show_volume_control: true, show_transport_control: true, show_mute_control: true }),
  ].filter(Boolean);
  if (livingRoom.length > 1) sections.push({ type: 'grid', cards: livingRoom });

  const access = [
    { type: 'custom:lirum-title-card', title: 'Doors & access', alignment: 'start' },
    card('lirum-lock-card', lock),
    card('lirum-cover-card', cover, { show_buttons_control: true, show_position_control: true }),
    card('lirum-alarm-card', alarm, { show_keypad: false }),
  ].filter(Boolean);
  if (access.length > 1) sections.push({ type: 'grid', cards: access });

  const comfort = [
    { type: 'custom:lirum-title-card', title: 'Comfort', alignment: 'start' },
    card('lirum-fan-card', fan, { show_percentage_control: true, show_oscillate_control: true }),
    card('lirum-humidifier-card', humidifier),
    card('lirum-vacuum-card', vacuum),
  ].filter(Boolean);
  if (comfort.length > 1) sections.push({ type: 'grid', cards: comfort });

  const people = [
    { type: 'custom:lirum-title-card', title: 'People & state', alignment: 'start' },
    card('lirum-person-card', person),
    card('lirum-switch-card', sw),
    card('lirum-switch-card', ibool),
    card('lirum-select-card', select),
  ].filter(Boolean);
  if (people.length > 1) sections.push({ type: 'grid', cards: people });

  const numbers = [
    { type: 'custom:lirum-title-card', title: 'Numbers & updates', alignment: 'start' },
    card('lirum-number-card', number),
    card('lirum-update-card', update),
    tempSensor ? { type: 'custom:lirum-slider-card', entity: tempSensor, min: -10, max: 40, step: 0.1, unit: '°C' } : null,
    tempSensor ? {
      type: 'custom:lirum-template-card',
      entity: tempSensor,
      primary: `Outside: {{ states('${tempSensor}') }}°C`,
      secondary: weather ? `Weather: {{ states('${weather}') }}` : 'Live reading',
      icon: 'mdi:thermometer',
      icon_color: 'cool',
    } : null,
  ].filter(Boolean);
  if (numbers.length > 1) sections.push({ type: 'grid', cards: numbers });

  // Visuals section — weather / camera / gauge / KPI tiles
  const visuals = [
    { type: 'custom:lirum-title-card', title: 'At a glance', alignment: 'start' },
    card('lirum-weather-card', weather, { show_forecast: true, forecast_days: 5, show_details: true }),
    card('lirum-camera-card', camera, { aspect_ratio: '16:9', show_state: true, show_name: true }),
    powerSensor ? { type: 'custom:lirum-gauge-card', entity: powerSensor, min: 0, max: 5000, unit: 'W', label: 'POWER', size: 200 } : null,
  ].filter(Boolean);
  if (visuals.length > 1) sections.push({ type: 'grid', cards: visuals });

  // Tile grid — 4 KPI tiles, one per sensor class we found
  const tiles = [
    tempSensor ? { type: 'custom:lirum-tile-card', entity: tempSensor, label: 'Outside', decimals: 1 } : null,
    humiditySensor ? { type: 'custom:lirum-tile-card', entity: humiditySensor, label: 'Humidity', decimals: 0 } : null,
    batterySensor ? { type: 'custom:lirum-tile-card', entity: batterySensor, label: 'Battery', decimals: 0 } : null,
    powerSensor ? { type: 'custom:lirum-tile-card', entity: powerSensor, label: 'Power', decimals: 0 } : null,
  ].filter(Boolean);
  if (tiles.length > 0) {
    sections.push({ type: 'grid', cards: [
      { type: 'custom:lirum-title-card', title: 'Sensors', alignment: 'start' },
      { type: 'custom:lirum-grid-card', columns: Math.min(4, tiles.length), gap: 10, cards: tiles },
    ]});
  }

  // Quick actions — button / scene / script
  const actions = [
    { type: 'custom:lirum-title-card', title: 'Quick actions', alignment: 'start' },
    card('lirum-button-card', button),
    card('lirum-scene-card', scene),
    card('lirum-script-card', script),
  ].filter(Boolean);
  if (actions.length > 1) sections.push({ type: 'grid', cards: actions });

  // Conditional showcase — if motion sensor is on, show a friendly banner
  if (motionSensor) {
    sections.push({ type: 'grid', cards: [
      {
        type: 'custom:lirum-conditional-card',
        conditions: [{ condition: 'state', entity: motionSensor, state: 'on' }],
        card: {
          type: 'custom:lirum-markdown-card',
          title: 'Motion detected',
          content: `**${motionSensor}** is currently active. This card only renders while motion is on.`,
        },
      },
    ]});
  }

  // Notes / markdown section
  sections.push({ type: 'grid', cards: [
    {
      type: 'custom:lirum-markdown-card',
      title: 'Lirum Showcase',
      content: `Auto-generated from your real entities at ${new Date().toISOString().slice(0, 16).replace('T', ' ')}.

- Lirum Cards v${'0.2.0'} · 31 card types
- Resource: jsdelivr ` + '`@main`' + ` (auto-tracks the main branch)
- Want different entities? Re-run \`scripts/setup-ha-dashboard.mjs\` or edit this dashboard directly.`,
    },
  ]});

  // Chips row at the bottom for quick toggles
  const chipsRow = [];
  if (sw) chipsRow.push({ type: 'entity', entity: sw, icon: 'mdi:flash' });
  if (lightOn) chipsRow.push({ type: 'entity', entity: lightOn, icon: 'mdi:lightbulb' });
  if (weather) chipsRow.push({ type: 'weather', entity: weather });
  if (has('sun.sun')) chipsRow.push({ type: 'entity', entity: 'sun.sun', icon: 'mdi:weather-sunny' });
  if (chipsRow.length > 0) {
    sections.push({ type: 'grid', cards: [{ type: 'custom:lirum-chips-card', chips: chipsRow }] });
  }

  /**
   * Walk a card config tree and inject `background: 'transparent'` on every
   * Lirum card type. This produces the theme-adaptive variant: cards drop
   * the dark-glow surface and pick up HA's `--primary-text-color` /
   * `--secondary-text-color` / `--ha-card-border-color`, so they blend with
   * whatever HA theme is active (dark or light).
   */
  const makeTransparent = (node) => {
    if (Array.isArray(node)) return node.map(makeTransparent);
    if (node && typeof node === 'object') {
      const out = { ...node };
      if (typeof out.type === 'string' && out.type.startsWith('custom:lirum-')) {
        out.background = 'transparent';
      }
      for (const k of Object.keys(out)) {
        out[k] = makeTransparent(out[k]);
      }
      return out;
    }
    return node;
  };
  const blendedSections = makeTransparent(sections);

  return {
    title: DASHBOARD_TITLE,
    views: [
      {
        title: 'Showcase',
        path: 'showcase',
        icon: 'mdi:flare',
        type: 'sections',
        sections,
      },
      {
        title: 'Blended',
        path: 'blended',
        icon: 'mdi:palette-swatch-variant',
        type: 'sections',
        sections: blendedSections,
      },
    ],
  };
}

async function ensureDashboard(states) {
  const dashboards = await send({ type: 'lovelace/dashboards/list' });
  let dash = dashboards.find((d) => d.url_path === DASHBOARD_URL_PATH);
  if (!dash) {
    await send({
      type: 'lovelace/dashboards/create',
      url_path: DASHBOARD_URL_PATH,
      mode: 'storage',
      title: DASHBOARD_TITLE,
      icon: 'mdi:flare',
      show_in_sidebar: true,
      require_admin: false,
    });
    console.log(`✓ created dashboard: ${DASHBOARD_TITLE} (/${DASHBOARD_URL_PATH})`);
  } else {
    console.log(`✓ dashboard already exists: ${DASHBOARD_TITLE} (/${DASHBOARD_URL_PATH})`);
  }

  const config = buildDashboard(states);
  await send({
    type: 'lovelace/config/save',
    url_path: DASHBOARD_URL_PATH,
    config,
  });
  console.log(`✓ wrote dashboard config (${config.views[0].sections.length} sections)`);
}

async function getStates() {
  // The websocket has a "get_states" command.
  return send({ type: 'get_states' });
}

async function main() {
  await ensureResource();
  const states = await getStates();
  console.log(`✓ fetched ${states.length} entity states`);
  await ensureDashboard(states);
  console.log('done.');
  // Give HA a moment to flush, then close cleanly.
  await sleep(200);
  ws.close();
  process.exit(0);
}
