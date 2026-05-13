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

Renders simple Jinja-style interpolation against `hass.states`. Full templates are not supported in v0.1; we recognize `{{ states('entity_id') }}` and `{{ state_attr('entity_id','attr') }}` patterns.

```yaml
type: custom:lirum-template-card
entity: sensor.outside_temp
primary: "Outside: {{ states('sensor.outside_temp') }}°C"
secondary: "Sun is {{ states('sun.sun') }}"
icon: mdi:thermometer
icon_color: cool
```
