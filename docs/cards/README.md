# Card reference

Every card supports these **common options** unless noted:

| Option | Type | Default | Notes |
|---|---|---|---|
| `entity` | string | — | Required for entity-bound cards |
| `name` | string | entity friendly_name | Display override |
| `icon` | string | domain default | `mdi:...` override |
| `icon_color` | string | `cool` | `cool`/`warm`/`energy`/`alert`/`rose`/`amber`/`neutral` or any CSS color |
| `layout` | string | `default` | `default` (icon-left tile), `horizontal`, or `vertical` |
| `fill_container` | boolean | `false` | Stretch to fill grid cell |
| `background` | string | dark glow | Any CSS background, or `transparent` to adopt HA theme |
| `tap_action` | object | per domain | `{ action: more-info \| toggle \| call-service \| navigate \| url \| assist \| none, ... }` |
| `hold_action` | object | `{ action: more-info }` | Same shape as `tap_action` |
| `double_tap_action` | object | `{ action: more-info }` | Same shape |

Default `tap_action` is `toggle` for `light`, `switch`, `fan`, `input_boolean`, `automation`, `remote`, `siren`. Everything else defaults to `more-info`. Override per-card if you want.

---

## Entity — `custom:lirum-entity-card`

The universal display card. Use it for any entity that doesn't fit a more specific card.

```yaml
type: custom:lirum-entity-card
entity: sensor.outside_temp
```

## Switch — `custom:lirum-switch-card`

For `switch.*`, `input_boolean.*`, `automation.*`, `remote.*`, `siren.*`.

```yaml
type: custom:lirum-switch-card
entity: switch.fan_corner
```

## Light — `custom:lirum-light-card`

```yaml
type: custom:lirum-light-card
entity: light.living_room
use_light_color: true             # icon ramp follows the light's color
show_brightness_control: true     # render brightness slider when on
show_color_temp_control: true     # render color-temp slider when on
show_color_control: true          # render HS color picker when on
collapsible_controls: true        # hide controls behind a chevron until expanded
```

## Cover — `custom:lirum-cover-card`

Blinds, garage doors, shutters.

```yaml
type: custom:lirum-cover-card
entity: cover.bedroom_blinds
show_buttons_control: true        # Open / Stop / Close chips
show_position_control: true       # 0-100 % position slider
show_tilt_position_control: false # tilt slider for venetian-style blinds
```

## Climate — `custom:lirum-climate-card`

Thermostats and HVAC controllers.

```yaml
type: custom:lirum-climate-card
entity: climate.living_room
show_temperature_control: true
# hvac_modes: [off, heat, cool]   # optional, filters the mode chip row
```

The trailing slot renders a small radial mini-gauge with current and target temperature.

## Fan — `custom:lirum-fan-card`

```yaml
type: custom:lirum-fan-card
entity: fan.bedroom
show_percentage_control: true
show_oscillate_control: true
```

## Media — `custom:lirum-media-card`

`media_player.*` entities — speakers, TVs, streamers. Album art renders inside the icon halo.

```yaml
type: custom:lirum-media-card
entity: media_player.living_room_speaker
show_volume_control: true
show_transport_control: true
show_mute_control: true
```

## Lock — `custom:lirum-lock-card`

```yaml
type: custom:lirum-lock-card
entity: lock.front_door
```

Two chips ("Lock", "Unlock") render below the tile. Default `tap_action` is `more-info` for safety — explicit chips do the actual work.

## Person — `custom:lirum-person-card`

Uses `entity_picture` (the person's photo) inside the icon halo if available.

```yaml
type: custom:lirum-person-card
entity: person.alice
```

## Number — `custom:lirum-number-card`

For `input_number.*` and `number.*`. Reads `min`, `max`, `step`, `unit_of_measurement` from the entity.

```yaml
type: custom:lirum-number-card
entity: input_number.brightness_offset
```

## Slider — `custom:lirum-slider-card`

Generic slider for any numeric entity. Read-only unless you wire `service`.

```yaml
type: custom:lirum-slider-card
entity: sensor.outside_temp
min: -10
max: 40
step: 0.1
unit: "°C"
# service: input_number.set_value   # uncomment to make writable
# service_key: value
```

## Select — `custom:lirum-select-card`

`select.*` and `input_select.*`. Tap the chevron to reveal an option grid.

```yaml
type: custom:lirum-select-card
entity: input_select.scene
```

## Vacuum — `custom:lirum-vacuum-card`

```yaml
type: custom:lirum-vacuum-card
entity: vacuum.roomba
show_control: true
```

## Update — `custom:lirum-update-card`

Renders `installed_version → latest_version` and an Install chip when an update is available.

```yaml
type: custom:lirum-update-card
entity: update.hacs
```

## Humidifier — `custom:lirum-humidifier-card`

```yaml
type: custom:lirum-humidifier-card
entity: humidifier.bedroom
show_target_control: true
show_mode_control: true
```

## Alarm — `custom:lirum-alarm-card`

`alarm_control_panel.*`. Defaults to `tap_action: more-info` (safety). Arm/disarm chips and an optional keypad.

```yaml
type: custom:lirum-alarm-card
entity: alarm_control_panel.home
show_keypad: false
# states: [armed_home, armed_away, armed_night]   # filter modes
```

## Chips — `custom:lirum-chips-card`

A row of small entity / weather / action / menu chips. No tile frame — fits in a section header.

```yaml
type: custom:lirum-chips-card
chips:
  - type: entity
    entity: switch.fan_corner
    icon: mdi:fan
  - type: entity
    entity: light.living_room
    icon: mdi:lightbulb
  - type: weather
    entity: weather.home
  - type: menu
  - type: action
    icon: mdi:home
    tap_action:
      action: navigate
      navigation_path: /lovelace/0
```

Chip types:

- `entity` — icon + state, defaults to entity icon
- `action` — icon + label, fires `tap_action`
- `back` — navigates back
- `menu` — opens HA sidebar menu
- `weather` — weather state + temperature
- `template` — simple interpolation: `{{ states('entity_id') }}` and `{{ state_attr('entity_id','attr') }}`

## Title — `custom:lirum-title-card`

Section headers. No entity, no actions.

```yaml
type: custom:lirum-title-card
title: Living room
subtitle: Lights, climate, and media
alignment: start      # start | center | end
```

## Template — `custom:lirum-template-card`

Renders simple Jinja-style interpolation against `hass.states`. Supported patterns:

- `{{ states('entity_id') }}` → the entity's state, or `unknown`
- `{{ state_attr('entity_id','attr') }}` → an attribute value as text
- `{{ is_state('entity_id','expected') }}` → `'true'` or `'false'`
- `{{ is_state_attr('entity_id','attr','expected') }}` → `'true'` or `'false'`
- `{% if … %}…{% else %}…{% endif %}` — the condition is evaluated as truthy if it isn't `'false'` / `'0'` / empty

```yaml
type: custom:lirum-template-card
entity: sensor.outside_temp
primary: "Outside: {{ states('sensor.outside_temp') }}°C"
secondary: "Sun is {{ states('sun.sun') }}"
icon: mdi:thermometer
icon_color: cool
```

## Sensor — `custom:lirum-sensor-card`

For `sensor.*` and `binary_sensor.*`. Picks colour ramp from `device_class` (temperature → warm/cool; battery → energy/amber/alert; humidity → rose; power/energy → amber; etc.). Optional sparkline trend and percentage bar.

```yaml
type: custom:lirum-sensor-card
entity: sensor.outside_temp
show_trend: true
trend_points: [12.1, 12.3, 12.6, 13.0, 13.4, 13.9, 14.2]
decimals: 1
```

For a battery sensor, set `show_bar: true` to render a filled bar coloured by level.

## Button — `custom:lirum-button-card`

Press-style tap target. When `entity` is in the `button.*` domain, the default `tap_action` is `button.press`. The card also accepts non-entity uses for custom service calls.

```yaml
type: custom:lirum-button-card
entity: button.restart_router
name: Restart Router
secondary: Last triggered: 3h ago
icon_color: alert
```

## Scene — `custom:lirum-scene-card`

One-tap scene activation. Secondary text shows "activated 2m ago" / "Never activated".

```yaml
type: custom:lirum-scene-card
entity: scene.movie_time
```

## Script — `custom:lirum-script-card`

Run a script; the busy ring spins continuously while the script is running. Secondary shows "Running…" or "ran 5m ago".

```yaml
type: custom:lirum-script-card
entity: script.bedtime_routine
variables:
  brightness: 30
```

## Camera — `custom:lirum-camera-card`

Renders the entity's latest snapshot (or stream poster) inside a glowing frame. Status pill shows recording/streaming with a pulsing red dot.

```yaml
type: custom:lirum-camera-card
entity: camera.front_door
aspect_ratio: "16:9"
show_state: true
```

## Weather — `custom:lirum-weather-card`

Current temperature plus optional details row (humidity, wind) and horizontal forecast strip with daily condition icons.

```yaml
type: custom:lirum-weather-card
entity: weather.home
show_forecast: true
forecast_days: 5
show_details: true
```

## Gauge — `custom:lirum-gauge-card`

Standalone radial gauge — uses the same SVG arc shading as ha-power-gauge but with a configurable size, range, and threshold-driven color ramp.

```yaml
type: custom:lirum-gauge-card
entity: sensor.solar_power
min: 0
max: 5000
unit: W
label: SOLAR
size: 200
thresholds:
  - { value: 0,    color: cool }
  - { value: 1500, color: energy }
  - { value: 3500, color: amber }
  - { value: 4500, color: alert }
```

## Tile — `custom:lirum-tile-card`

A KPI tile with big number, label, optional trend arrow, and optional sparkline. Smaller than the gauge, denser than the entity card.

```yaml
type: custom:lirum-tile-card
entity: sensor.outside_temp
label: Outside
unit: "°C"
decimals: 1
show_spark: true
spark_points: [12.1, 12.3, 12.6, 13.0, 13.4, 13.9, 14.2]
```

## Stack — `custom:lirum-stack-card`

Wraps any cards in a vertical or horizontal flex stack.

```yaml
type: custom:lirum-stack-card
direction: vertical
gap: 12
cards:
  - { type: custom:lirum-switch-card, entity: switch.fan_corner }
  - { type: custom:lirum-switch-card, entity: switch.coffee_maker }
```

## Grid — `custom:lirum-grid-card`

Uniform-column grid. `square: true` forces each cell to a 1:1 aspect ratio.

```yaml
type: custom:lirum-grid-card
columns: 2
gap: 10
square: false
cards:
  - { type: custom:lirum-tile-card, entity: sensor.outside_temp,    label: Out }
  - { type: custom:lirum-tile-card, entity: sensor.kitchen_humidity, label: Kit }
  - { type: custom:lirum-tile-card, entity: sensor.phone_battery,    label: Bat }
  - { type: custom:lirum-tile-card, entity: sensor.solar_power,      label: Sun }
```

## Conditional — `custom:lirum-conditional-card`

Render an inner card only when every condition matches.

```yaml
type: custom:lirum-conditional-card
conditions:
  - { condition: state,         entity: light.living_room, state: on }
  - { condition: numeric_state, entity: sensor.outside_temp, above: 10 }
card:
  type: custom:lirum-light-card
  entity: light.living_room
  show_brightness_control: true
```

Condition types:

- `state` — `{ entity, state }` or `{ entity, state_not }`
- `numeric_state` — `{ entity, above?, below? }`
- `screen` — `{ media_query }` (CSS media query)
- `user` — `{ users: [user_id, ...] }`

## Markdown — `custom:lirum-markdown-card`

Markdown content with headings, lists, links, inline code, code blocks. Same entity-state interpolation as the template card.

```yaml
type: custom:lirum-markdown-card
title: Tonight
content: |
  Right now it's **{{ states('sensor.outside_temp') }}°C** outside.

  - Sun: {{ states('sun.sun') }}
  - Wind: {{ state_attr('weather.home', 'wind_speed') }} km/h
```
