# ha-lirum — Lovelace Card Suite Design

**Status:** approved (Approach A — Mushroom-style monolithic bundle)
**Date:** 2026-05-13
**Repo:** [Lirum-Labs/ha-lirum](https://github.com/Lirum-Labs/ha-lirum)
**Inspiration:**
- [Mushroom cards](https://github.com/piitaya/lovelace-mushroom) — control set & config surface
- [ha-power-gauge](https://github.com/Lirum-Labs/ha-power-gauge) — visual language

## 1. Goal

Ship a HACS-installable Lovelace card suite that delivers full Mushroom-style control coverage (light, switch, cover, climate, fan, media, lock, person, vacuum, alarm, humidifier, select, number, update, chips, title, template, entity) with the dark glowing aesthetic of ha-power-gauge. Single bundle, shared design system, drop-in YAML compatibility where reasonable.

### Success criteria

1. All 18 card types render correctly against real `hass` state.
2. `tap_action` / `hold_action` / `double_tap_action` work with the full HA action type set (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`, `assist`).
3. Visual editor (`getConfigElement`) on every card, using `ha-form`.
4. Cards adapt gracefully to `background: transparent` on light HA themes.
5. Builds to a single `dist/lirum-cards.js` resource.
6. Published via HACS frontend with semver-tagged GitHub releases.
7. Demo dashboard YAML in `docs/example-dashboard.yaml` showing every card type.

## 2. Architecture

```
ha-lirum/
├── src/
│   ├── lirum-cards.ts            # entry: re-exports every card + editor
│   ├── const.ts                  # tags, names, version
│   ├── core/
│   │   ├── lirum-base.ts         # LirumCardBase LitElement
│   │   ├── hass.ts               # HomeAssistant type, entity helpers
│   │   ├── actions.ts            # handleAction(), action config types
│   │   ├── icons.ts              # default icons per domain, state-aware
│   │   ├── tokens.ts             # design tokens (colors, motion, spacing)
│   │   ├── styles.ts             # shared CSS via lit css``
│   │   ├── motion.ts             # ramp/lerp/easing/ambient drift
│   │   └── editor-utils.ts       # ha-form schema helpers
│   └── cards/
│       ├── entity/
│       │   ├── entity-card.ts
│       │   └── entity-editor.ts
│       ├── light/
│       │   ├── light-card.ts
│       │   ├── light-editor.ts
│       │   └── light-controls.ts  # brightness + color pickers
│       ├── switch/...
│       ├── cover/...
│       ├── climate/...
│       ├── fan/...
│       ├── media/...
│       ├── lock/...
│       ├── person/...
│       ├── select/...
│       ├── number/...
│       ├── vacuum/...
│       ├── update/...
│       ├── humidifier/...
│       ├── alarm/...
│       ├── chips/...
│       ├── title/...
│       └── template/...
├── dev/
│   ├── index.html                # offline preview, all cards
│   └── fixtures.ts               # mock hass entities for every domain
├── docs/
│   ├── example-dashboard.yaml    # full HA YAML showcasing every card
│   ├── cards/<card>.md           # per-card config reference
│   └── screenshots/
├── dist/                         # rollup output (committed for HACS)
├── package.json
├── rollup.config.js
├── tsconfig.json
├── hacs.json
├── README.md
└── LICENSE                       # Apache-2.0 to match ha-power-gauge
```

### Bundle

- Single ESM output: `dist/lirum-cards.js`. All cards register on import — order doesn't matter because each card guards its own `customElements.define`.
- IIFE shadow build: `dist/lirum-cards.iife.js` only for `dev/index.html`.
- Production build minified via `@rollup/plugin-terser`.
- Source maps off in production, on in `ROLLUP_WATCH`.

### Build chain

Identical to ha-power-gauge: rollup + `@rollup/plugin-typescript` + `@rollup/plugin-node-resolve` + `@rollup/plugin-commonjs` + `@rollup/plugin-json` + `@rollup/plugin-terser`. `inlineDynamicImports: true` so editors load with the card.

## 3. Design system

### Color tokens (`core/tokens.ts`)

```ts
export const LIRUM_COLORS = {
  // Brand
  cool:    { c1: '#1ee0ff', c2: '#2a7bff', c3: '#0a3aa0' },
  warm:    { c1: '#ffb347', c2: '#ff6e3c', c3: '#7a1b07' },
  energy:  { c1: '#a8ff5a', c2: '#3acf3a', c3: '#1a5f1a' },
  alert:   { c1: '#ff5a7a', c2: '#d12338', c3: '#5a0a16' },
  rose:    { c1: '#ff9ae0', c2: '#c046b3', c3: '#5a1b54' },
  neutral: { c1: '#9dadc7', c2: '#5d6f8f', c3: '#1f2a3e' },
};

export const LIRUM_BG = {
  default:  'radial-gradient(120% 80% at 50% 0%, rgba(40,90,200,0.25), transparent 60%), linear-gradient(180deg, #0b1326, #060a14)',
  flat:     'linear-gradient(180deg, #0b1326, #060a14)',
  transparent: 'transparent',
};

export const LIRUM_TEXT = '#eef3ff';
export const LIRUM_MUTED = '#6b7894';
```

When the user sets `background: transparent` (or `background: theme`), `--lirum-text` / `--lirum-muted` switch to `var(--primary-text-color)` / `var(--secondary-text-color)` so the cards adapt to HA themes (light or dark).

### Motion

- All numeric value changes ramp via `easeOutCubic` over ~500ms.
- Ambient drift ±1.2% sinusoidal (configurable `rolling_numbers: false`).
- Halos rotate slowly (24s) and fast (9s, reverse) — paused under `prefers-reduced-motion`.
- State changes (on/off, lock/unlock) crossfade glow over 600ms.

### Typography

- `Inter` (loaded by HA) for everything.
- Tabular nums for digits.
- Monospace stack (`JetBrains Mono`, `SF Mono`, `Menlo`) for raw values inside chips.

### Layout primitives

- **Card frame:** `ha-card` with `--ha-card-border-radius` (default 16px), 1px inner glow border, drop shadow.
- **Tile layout:** icon (left, 40-48px circle with halo) + name/state (right). This is the default `layout` like Mushroom.
- **Horizontal layout:** icon above text — used for grid layouts.
- **Vertical layout:** icon and text on top, controls below.

### Glow recipe

Reused across all cards:

```css
.glow {
  background: radial-gradient(circle, var(--c1) 0%, color-mix(in oklab, var(--c2) 70%, transparent) 60%, transparent 100%);
  filter: blur(2px);
  opacity: 0.7;
}
```

State-driven: `on` → full glow with entity color, `off` → muted neutral, `unavailable` → dashed border + 40% opacity.

## 4. Shared core

### `LirumCardBase` (`core/lirum-base.ts`)

Common LitElement base:

- `hass` property (re-renders on change).
- `_config` state, `setConfig(config)` validator hook for subclasses.
- `getCardSize()` default = 1.
- `_handleAction(event)` reads `action`/`config_entry`, calls `handleAction`.
- `_stateObj()` getter returning `hass.states[config.entity]` or `null`.
- `_isUnavailable()` returns `true` for `unavailable`/`unknown` states.
- `_renderError(msg)` falls back to a styled error card.
- Shared root styles inherited by every card.

### Action handling (`core/actions.ts`)

```ts
export type ActionType = 'more-info' | 'toggle' | 'call-service' |
  'navigate' | 'url' | 'none' | 'assist';

export interface ActionConfig {
  action: ActionType;
  service?: string;
  service_data?: Record<string, unknown>;
  navigation_path?: string;
  url_path?: string;
  confirmation?: boolean | { text?: string };
}

export function handleAction(
  element: HTMLElement,
  hass: HomeAssistant,
  config: { entity?: string; tap_action?: ActionConfig;
            hold_action?: ActionConfig; double_tap_action?: ActionConfig },
  action: 'tap' | 'hold' | 'double_tap',
): void;
```

Uses `custom-card-helpers`' `handleAction` under the hood — same package ha-power-gauge already imports.

### Gestures

Pointer-down → 500ms timer → if released before timer fires it's a `tap`; if not, it's a `hold` (haptic on tap if `navigator.vibrate` exists). Double-tap = two taps within 300ms.

### Default actions per domain

| Domain | `tap_action.default` | `hold_action.default` |
|---|---|---|
| `light`, `switch`, `fan`, `input_boolean` | `toggle` | `more-info` |
| `cover`, `climate`, `media_player`, `humidifier`, `lock`, `alarm_control_panel`, `vacuum`, `update`, `select`, `number`, `sensor`, `binary_sensor`, `person` | `more-info` | `more-info` |

## 5. Card catalog

Each card lives under `src/cards/<card>/`. Card tag is `lirum-<card>-card`. Editor tag is `lirum-<card>-card-editor`.

| Card | Tag | Primary entity | Distinctive visuals |
|---|---|---|---|
| Entity | `lirum-entity-card` | any | Generic icon + name + state, baseline glow |
| Light | `lirum-light-card` | `light.*` | Icon halo matches current color/temp; brightness slider with chromatic fill |
| Switch | `lirum-switch-card` | `switch.*`, `input_boolean.*` | Icon pulses gently when on; off = dim |
| Number | `lirum-number-card` | `input_number.*`, `number.*` | Horizontal slider w/ glow-cap (same recipe as power-gauge-bar) |
| Slider | `lirum-slider-card` | `input_number.*`, `number.*` | Same as Number but exposes range/step config |
| Cover | `lirum-cover-card` | `cover.*` | Open/close/stop chips + position bar; arrow icons animate when moving |
| Climate | `lirum-climate-card` | `climate.*` | Radial mini-gauge: current temp inner, target outer arc, mode chips |
| Fan | `lirum-fan-card` | `fan.*` | Icon spins proportional to percentage; speed slider |
| Media | `lirum-media-card` | `media_player.*` | Album art or icon w/ glow halo; play/pause as oversized glow button; volume bar |
| Lock | `lirum-lock-card` | `lock.*` | Icon swap on state; ring color: locked = energy, unlocked = alert |
| Person | `lirum-person-card` | `person.*` | Avatar (entity_picture or initials) in glow ring; secondary = zone |
| Select | `lirum-select-card` | `select.*`, `input_select.*` | Current option in glow chip; tap reveals option grid |
| Vacuum | `lirum-vacuum-card` | `vacuum.*` | Battery ring + status icon; start/dock/locate chips |
| Update | `lirum-update-card` | `update.*` | Old → new version diff, install button glows |
| Humidifier | `lirum-humidifier-card` | `humidifier.*` | Target % slider w/ humidity color ramp |
| Alarm | `lirum-alarm-card` | `alarm_control_panel.*` | Keypad grid (configurable code length) + arm/disarm chips |
| Chips | `lirum-chips-card` | multi | Horizontal pill row, each chip is icon-only mini-entity |
| Title | `lirum-title-card` | none | Title + subtitle, optional glow underline |
| Template | `lirum-template-card` | any | Renders Jinja templates from `primary` / `secondary` / `icon` config |

### Common config keys (all entity-bound cards)

```yaml
type: custom:lirum-<card>-card
entity: domain.entity_id            # required
name: "Pretty Name"                  # optional override
icon: mdi:lightbulb                  # optional override
icon_color: cool|warm|energy|alert|rose|neutral|<css color>
layout: default|horizontal|vertical
fill_container: false
tap_action: { action: toggle }
hold_action: { action: more-info }
double_tap_action: { action: none }
background: transparent              # optional, switches to theme adapt
```

### Card-specific config additions

- **Light**: `use_light_color: true|false`, `show_brightness_control`, `show_color_temp_control`, `show_color_control`, `collapsible_controls`.
- **Cover**: `show_buttons_control`, `show_position_control`, `show_tilt_position_control`.
- **Climate**: `hvac_modes: [heat, cool, ...]`, `show_temperature_control`.
- **Fan**: `show_percentage_control`, `show_oscillate_control`.
- **Media**: `volume_controls: ['volume_buttons'|'volume_set'|'volume_mute']`, `media_controls: ['on_off','shuffle','previous','play_pause_stop','next','repeat']`.
- **Alarm**: `states: ['armed_home','armed_away','armed_night',...]`, `show_keypad: true`.
- **Chips**: `chips: [{type:'entity', entity:..., icon:..., content_info:...}, {type:'menu'}, {type:'weather', entity:...}]`.
- **Title**: `title`, `subtitle`, `alignment: start|center|end`.
- **Template**: `primary`, `secondary`, `icon`, `icon_color`, `picture` — all Jinja-evaluable.

## 6. Editors

Every card ships a `lirum-<card>-card-editor` LitElement. All editors use `ha-form` with declarative schemas (same pattern as ha-power-gauge editor). Shared helpers in `core/editor-utils.ts`:

- `actionSelector()` returns the standard tap/hold/double-tap selector triplet.
- `iconColorSelector()` returns a select with the named ramp colors + a "custom" text field.
- `layoutSelector()` returns the layout enum.
- `appearanceGroup()` returns the expandable group of `layout`, `fill_container`, `icon_color`, `background`.
- `interactionGroup()` returns the expandable group of the three action selectors.

The default editor shape is:

```
[ Entity ] [ Name ]  [ Icon (mdi picker) ]
{ Card-specific controls }
> Appearance (expandable)
> Interactions (expandable)
```

Editors live in the same chunk as the card (no dynamic import) for simplicity. Bundle size will tolerate it.

## 7. Dev preview

`dev/index.html` mounts every card next to its config controls so we can iterate without HA. Loaded via `serve -l 8000 .` (same pattern ha-power-gauge uses).

`dev/fixtures.ts` builds a fake `hass` with at least one entity per supported domain:

- `light.living_room` (on, 80% bright, rgb 255 180 100)
- `light.kitchen` (off)
- `switch.fan_corner` (on)
- `switch.coffee_maker` (off)
- `cover.bedroom_blinds` (open, position 60)
- `climate.living_room` (heating, current 21.5°C, target 22°C)
- `fan.bedroom` (on, 75%)
- `media_player.living_room_speaker` (playing)
- `lock.front_door` (locked)
- `person.alice` (home)
- `select.washer_mode` (`normal` of `[normal, eco, fast]`)
- `input_number.brightness_offset` (50 of 0..100)
- `vacuum.roomba` (docked, 92% battery)
- `update.hacs` (available)
- `humidifier.bedroom` (on, target 50%)
- `alarm_control_panel.home` (disarmed)
- `sun.sun` (above_horizon) — for chips
- … plus a few sensors

Each fixture state can be toggled via dev-only controls in `dev/index.html` to verify state transitions.

## 8. Testing strategy

1. **Unit-ish:** `core/motion.ts`, `core/actions.ts`, `core/tokens.ts` are pure TS — test via `vitest` if we add it later; otherwise rely on type-check + dev preview.
2. **Visual:** `dev/index.html` renders every card with state-toggle buttons. Manual verification per card.
3. **Editor:** Editor renders inside dev preview alongside the card, mirroring config edits live.
4. **HA integration (post-build):** install via HACS or as `Settings → Dashboards → Resources → Add resource`, then a YAML dashboard with every card type. No real entity is toggled by automation — we only render and read state.
5. **Type-check:** `tsc --noEmit` runs in CI.
6. **Lint/format:** eslint + prettier (config inherited from ha-power-gauge style).

## 9. Release & distribution

- Apache-2.0 license (matches ha-power-gauge).
- `hacs.json`: `{ "name": "Lirum Cards", "render_readme": true, "filename": "lirum-cards.js", "content_in_root": false, "homeassistant": "2024.1.0" }`.
- Initial version: `0.1.0`. Each card type accepted into the suite gets a minor bump until 1.0.0 (all cards stable + parity verified against Mushroom).
- GitHub Actions workflow (post-MVP): on tag push, build + publish a Release with `dist/lirum-cards.js` attached.

## 10. Implementation strategy

Build order respects dependencies: foundation → core → cards → editors → polish.

**Wave 0 — scaffolding** *(single direct pass)*

1. `package.json`, `rollup.config.js`, `tsconfig.json`, `hacs.json`, `LICENSE`, `NOTICE`, `.gitignore`, `README.md` stub.
2. `src/lirum-cards.ts` entry + `src/const.ts`.
3. `dev/index.html` skeleton, `dev/fixtures.ts` with all entity fixtures.
4. Commit: `chore: scaffold project + build chain`.

**Wave 1 — shared core**

1. `core/tokens.ts`, `core/styles.ts`, `core/motion.ts`, `core/hass.ts`, `core/icons.ts`, `core/actions.ts`, `core/lirum-base.ts`, `core/editor-utils.ts`.
2. Commit: `feat(core): shared design system + base card`.

**Wave 2 — simple cards** *(parallel sub-agents possible)*

- Entity, Switch, Lock, Person, Title, Template. These all use the baseline tile layout. One sub-agent per card or one batch agent.
- Commit per card: `feat(<card>): initial implementation`.

**Wave 3 — slider-family cards**

- Number, Slider, Humidifier, Fan (slider variant). Share the slider widget in `core/slider.ts`.
- Commit: `feat(slider): shared slider widget` then per-card commits.

**Wave 4 — light** *(highest complexity)*

- Brightness slider, color temp chromatic bar, color picker, collapsible controls. Single sub-agent, single commit.

**Wave 5 — cover, media, vacuum**

- Each has a unique control set. Sub-agent per card.

**Wave 6 — climate** *(radial gauge sub-element)*

- Reuses arc/polar utilities from `core/motion.ts` — port from ha-power-gauge's `utils.ts`.

**Wave 7 — alarm + select + update**

- Alarm keypad needs care for accessibility. Select needs option grid. Update is straightforward.

**Wave 8 — chips card** *(meta card)*

- Renders sub-chips. Chip types: entity, weather, menu, action, alarm-control, light, conditional, template.

**Wave 9 — polish + docs**

- README with usage examples, per-card docs in `docs/cards/`, `docs/example-dashboard.yaml`, screenshots later.
- Commit: `docs: add card reference + example dashboard`.

**Wave 10 — release**

- Tag v0.1.0, push.

Every wave commits to `main` (the user explicitly said "commit regularly"). Conventional commits, no co-author trailer.

## 11. Out of scope (for v0.1.0)

- Sun, weather-forecast cards (not in Mushroom either).
- Bubble-style mini animations beyond glow ramp.
- Custom themes beyond `background` override.
- Multi-language i18n — English only first.
- Visual regression testing — manual for now.

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Light card has the most config — risk of bloat | Single editor, collapsible groups, mirror Mushroom's options 1:1 |
| Climate card complexity (HVAC modes vary by entity) | Read `hvac_modes` from the entity at runtime; don't hardcode |
| Alarm card legal/safety (toggling someone's alarm by accident) | Default `tap_action: more-info`; arm/disarm requires confirmation (`confirmation: true`) by default |
| Chips card recursion | Chip types are leaf widgets — no nested chip-of-chips |
| Bundle size growth | Acceptable for HACS; if it ever exceeds 300 kb minified, split editors into dynamic chunks |
| HA breaking changes | Pin `homeassistant: 2024.1.0` minimum in `hacs.json`; manual smoke test on each major HA release |

## 13. Post-build hookup

After the suite builds and pushes:

1. Use the HA UI (open in user's Chrome) to mint a long-lived access token: *Settings → Security → Long-lived access tokens → Create token*.
2. Install the Home Assistant MCP locally using that token.
3. With HA MCP live, build a real demo dashboard inside the user's HA — one section per card type — without invoking any service that toggles real devices.

Step 1 requires the user since I can't reach the Chrome tab right now. Step 3 is read-only / config-only.
