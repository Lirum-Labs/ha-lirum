# Lirum Cards

Glowing, animated Lovelace cards for Home Assistant — **31 cards** spanning controls, sensors, layouts, and rich visuals, all sharing the design language of [ha-power-gauge](https://github.com/Lirum-Labs/ha-power-gauge).

[![Release](https://img.shields.io/github/v/release/Lirum-Labs/ha-lirum?display_name=tag&sort=semver&logo=github&color=4A90D9)](https://github.com/Lirum-Labs/ha-lirum/releases)
[![License](https://img.shields.io/badge/license-Apache_2.0-blue)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/home%20assistant-custom%20card-41BDF5?logo=home-assistant&logoColor=white)](https://www.home-assistant.io/)

## What it is

A single HACS bundle that registers a complete suite of Lovelace cards — light, switch, cover, climate, fan, media, lock, person, vacuum, alarm, humidifier, select, number, slider, update, chips, title, template, and entity — sharing one design system. Tile layouts, glow-coloured icons, slide-animated controls, and full `tap_action` / `hold_action` / `double_tap_action` semantics.

Dark-glow by default. Set `background: transparent` on any card and the suite adopts HA's theme colors instead.

## Cards

### Entity-bound

| Card | Tag | Purpose |
|---|---|---|
| Entity | `lirum-entity-card` | Universal entity display |
| Light | `lirum-light-card` | Brightness, color temp, color picker |
| Switch | `lirum-switch-card` | Toggleable switches and booleans |
| Cover | `lirum-cover-card` | Blinds, garage doors, position + tilt |
| Climate | `lirum-climate-card` | Thermostat with HVAC modes + mini gauge |
| Fan | `lirum-fan-card` | Fan speed + oscillation, spinning icon |
| Media | `lirum-media-card` | Media player with transport controls |
| Lock | `lirum-lock-card` | Locks |
| Person | `lirum-person-card` | Person presence + avatar |
| Number | `lirum-number-card` | `input_number` / `number` slider |
| Slider | `lirum-slider-card` | Generic value slider |
| Select | `lirum-select-card` | `select` / `input_select` |
| Vacuum | `lirum-vacuum-card` | Robot vacuums |
| Update | `lirum-update-card` | Available updates |
| Humidifier | `lirum-humidifier-card` | Humidity control |
| Alarm | `lirum-alarm-card` | Alarm panels with keypad |
| **Sensor** | `lirum-sensor-card` | Sensor / binary_sensor with device-class formatting + optional sparkline |
| **Button** | `lirum-button-card` | Single-press buttons with hero tap target |
| **Scene** | `lirum-scene-card` | One-tap scene activation with last-fired time |
| **Script** | `lirum-script-card` | Run a script, shows running-state pulse |
| **Camera** | `lirum-camera-card` | Snapshot frame with name/state pills |
| **Weather** | `lirum-weather-card` | Current conditions + multi-day forecast strip |
| **Gauge** | `lirum-gauge-card` | Radial gauge for any numeric entity |
| **Tile** | `lirum-tile-card` | KPI tile with big number + optional sparkline |

### Layout & content

| Card | Tag | Purpose |
|---|---|---|
| Chips | `lirum-chips-card` | Pill row of mini-entities |
| Title | `lirum-title-card` | Section headers |
| Template | `lirum-template-card` | Jinja-style template (`states`, `state_attr`, `is_state`, `is_state_attr`, simple `{% if %}`) |
| **Stack** | `lirum-stack-card` | Vertical or horizontal stack of any cards |
| **Grid** | `lirum-grid-card` | Uniform-column grid of cards |
| **Conditional** | `lirum-conditional-card` | Show inner card only when conditions match |
| **Markdown** | `lirum-markdown-card` | Markdown-rendered text content |

Per-card configuration reference lives in [`docs/cards/`](docs/cards/).

## Install

### HACS (after release)

1. **HACS → Frontend** → ⋮ → *Custom repositories*.
2. Add `https://github.com/Lirum-Labs/ha-lirum` with category **Lovelace**.
3. Install **Lirum Cards**, hard-refresh your browser.

### Direct from JSDelivr

Recommended — pin to the current minor branch so patch releases ship automatically:

```
URL: https://cdn.jsdelivr.net/gh/Lirum-Labs/ha-lirum@v0.2/dist/lirum-cards.js
Type: module
```

Or pin to an exact version:

```
URL: https://cdn.jsdelivr.net/gh/Lirum-Labs/ha-lirum@v0.2.1/dist/lirum-cards.js
```

## Quick example

```yaml
type: vertical-stack
cards:
  - type: custom:lirum-title-card
    title: Living room
    subtitle: 21.8 °C · cozy
  - type: custom:lirum-light-card
    entity: light.living_room
    show_brightness_control: true
    show_color_temp_control: true
  - type: custom:lirum-climate-card
    entity: climate.living_room
    show_temperature_control: true
```

A full demo dashboard is at [`docs/example-dashboard.yaml`](docs/example-dashboard.yaml).

## Development

```bash
npm install
npm run dev   # rollup --watch + serve on :8000
open http://localhost:8000/dev/
```

The dev page (`dev/index.html`) mounts every card with fixture entities so you can iterate without HA. Service calls are logged and mutate the fixture state.

## License

[Apache 2.0](LICENSE) © 2026 Lirum Labs. See [NOTICE](NOTICE).
