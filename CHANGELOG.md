# Changelog

All notable changes are tracked here. The project follows semver — minor bumps add new cards or non-breaking improvements, patches are bug fixes.

## v0.2.2 — 2026-05-13

### Improved — UX pass informed by Claude design

- **Card frame** (`core/styles.ts`) — layered shadow stack (inner top highlight + hairline + ambient drop + tight contact), `::before` ramp-tinted backdrop (top-right wash + bottom-left bloom), `::after` top accent hairline, hover translateY(-2px) with ramp-tinted halo, `isolation: isolate` to keep stacking contained. Honors `prefers-reduced-motion`.
- **Sparkline** (`core/spark.ts`) — gradient stroke (deep→mid→bright left-to-right), dashed baseline at the bottom, area fill that fades to transparent at the baseline, glowing endpoint halo + tip dot, per-instance unique gradient IDs so multiple sparks never share `<defs>`.
- **Color ramps** (`core/tokens.ts`) — refined warm/energy/alert/rose/amber/neutral palettes to be more saturated against the dark surface; reads cleaner at a glance.
- **Card → frame variable propagation** — `_renderTile` now sets `--lirum-c1/c2/c3` based on the card's icon color, so the frame's ::before tint and hover halo follow the active device-class.

- **Weather card** forecast strip polish (glassy tiles, today badge, hover glow) — already shipped in v0.2.1 prep but re-tagged here for completeness.

## v0.2.1 — 2026-05-13

### Fixed
- **Tile card** renders `–` placeholder when the entity state is `unavailable` or `unknown` instead of truncating the literal word. Affects all device classes.

## v0.2.0 — 2026-05-13

### Added — 12 new cards
- **Sensor** (`lirum-sensor-card`) — for `sensor.*` and `binary_sensor.*` with device-class-aware color ramps, decimals heuristic, optional `<lirum-bar>` and `<lirum-spark>` for battery / power / temperature trends.
- **Button** (`lirum-button-card`) — single-press buttons; default `tap_action: button.press` for `button.*` entities; hero `<lirum-button>` tap target with busy indicator.
- **Scene** (`lirum-scene-card`) — one-tap scene activation with relative "last activated" time.
- **Script** (`lirum-script-card`) — script run with continuous busy ring while running; "Running…" / "ran 5m ago" / "Idle" secondary.
- **Camera** (`lirum-camera-card`) — snapshot frame with name/state pills and pulsing red dot for streaming/recording.
- **Weather** (`lirum-weather-card`) — current conditions + details row + multi-day forecast strip.
- **Gauge** (`lirum-gauge-card`) — Lirum-styled radial gauge for any numeric entity; threshold-driven color ramp.
- **Tile** (`lirum-tile-card`) — compact KPI tile with big number, label, trend arrow, optional sparkline.
- **Stack** (`lirum-stack-card`) — vertical or horizontal stack of any cards.
- **Grid** (`lirum-grid-card`) — uniform-column grid with optional square cells.
- **Conditional** (`lirum-conditional-card`) — render inner card only when all conditions match (`state` / `numeric_state` / `screen` media query / `user`).
- **Markdown** (`lirum-markdown-card`) — markdown-rendered content with entity-state interpolation.

### Added — Shared widgets
- `<lirum-bar>` — non-interactive horizontal progress bar.
- `<lirum-spark>` — sparkline mini-chart (SVG polyline + gradient fill).
- `<lirum-gauge>` — reusable radial gauge widget.
- `<lirum-button>` — hero action button with busy state.
- `<lirum-stat>` — large KPI number display with trend arrow.
- `<lirum-markdown>` — minimal markdown → HTML renderer (headings, lists, links, inline code, code blocks).
- `spin` + `spinDuration` properties on `<lirum-icon>` for state-driven icon rotation.

### Improvements
- **Fan card** — icon spins at a speed proportional to `percentage` (1s/rotation at 100%, 4s at 25%, still below 5%).
- **Template card** — added `is_state`, `is_state_attr`, and basic `{% if … %}{% else %}{% endif %}` blocks alongside `states()` / `state_attr()` interpolation.

### Infrastructure
- GitHub Actions `validate.yml` — HACS validation, build, typecheck, dist-in-sync check, 250 KB bundle budget.
- GitHub Actions `release.yml` — auto-builds and creates a GitHub Release on tag push, attaching `dist/lirum-cards.js`.
- Bundle size: 175 KB minified (up from 113 KB at v0.1.0; 31 cards vs. 19).

## v0.1.0 — 2026-05-13

### Added — 19 initial cards

- **Entity-bound:** `lirum-entity-card`, `lirum-light-card` (brightness / color temp / HS color picker), `lirum-switch-card`, `lirum-cover-card`, `lirum-climate-card` (mode chips + temp slider + mini radial gauge), `lirum-fan-card`, `lirum-media-card`, `lirum-lock-card`, `lirum-person-card` (entity_picture support), `lirum-number-card`, `lirum-slider-card`, `lirum-select-card`, `lirum-vacuum-card`, `lirum-update-card`, `lirum-humidifier-card`, `lirum-alarm-card` (mode chips + keypad).
- **Layout / content:** `lirum-chips-card` (entity / action / menu / weather / template chip variants), `lirum-title-card`, `lirum-template-card`.

### Architecture
- Single bundle (`dist/lirum-cards.js`) built with Rollup + Lit + TypeScript.
- Shared `LirumCardBase` LitElement with gesture-bound `tap_action` / `hold_action` / `double_tap_action`, layout variants (`default` / `horizontal` / `vertical`), `fill_container`, `icon_color`, dark-glow-with-theme-adapt-via-transparent-background behaviour.
- Standard `tap_action` defaults: `toggle` for `light` / `switch` / `fan` / `input_boolean` / `automation` / `remote` / `siren`; `more-info` everywhere else.
- Mushroom-equivalent config surface — drop-in compatible YAML in most cases.
- Apache 2.0 licensed.

### Distribution
- HACS-installable via custom-repository (`Lirum-Labs/ha-lirum`, category `Lovelace`).
- Direct from jsdelivr CDN: `https://cdn.jsdelivr.net/gh/Lirum-Labs/ha-lirum@v0.2/dist/lirum-cards.js`.
