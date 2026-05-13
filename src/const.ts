export const VERSION = '0.1.0';

export const CARDS = {
  entity:     { tag: 'lirum-entity-card',     editor: 'lirum-entity-card-editor',     name: 'Lirum Entity',      desc: 'Universal entity card.' },
  switch:     { tag: 'lirum-switch-card',     editor: 'lirum-switch-card-editor',     name: 'Lirum Switch',      desc: 'Toggleable switch / boolean.' },
  light:      { tag: 'lirum-light-card',      editor: 'lirum-light-card-editor',      name: 'Lirum Light',       desc: 'Brightness, color temp, and color control.' },
  number:     { tag: 'lirum-number-card',     editor: 'lirum-number-card-editor',     name: 'Lirum Number',      desc: 'input_number / number slider.' },
  sensor:     { tag: 'lirum-sensor-card',     editor: 'lirum-sensor-card-editor',     name: 'Lirum Sensor',      desc: 'Sensor / binary_sensor with device-class formatting and optional sparkline.' },
  slider:     { tag: 'lirum-slider-card',     editor: 'lirum-slider-card-editor',     name: 'Lirum Slider',      desc: 'Generic value slider.' },
  cover:      { tag: 'lirum-cover-card',      editor: 'lirum-cover-card-editor',      name: 'Lirum Cover',       desc: 'Blinds, garage doors, shades.' },
  climate:    { tag: 'lirum-climate-card',    editor: 'lirum-climate-card-editor',    name: 'Lirum Climate',     desc: 'Thermostat / HVAC.' },
  fan:        { tag: 'lirum-fan-card',        editor: 'lirum-fan-card-editor',        name: 'Lirum Fan',         desc: 'Fan speed and oscillation.' },
  media:      { tag: 'lirum-media-card',      editor: 'lirum-media-card-editor',      name: 'Lirum Media',       desc: 'Media player.' },
  lock:       { tag: 'lirum-lock-card',       editor: 'lirum-lock-card-editor',       name: 'Lirum Lock',        desc: 'Locks and unlock.' },
  person:     { tag: 'lirum-person-card',     editor: 'lirum-person-card-editor',     name: 'Lirum Person',      desc: 'Person presence.' },
  select:     { tag: 'lirum-select-card',     editor: 'lirum-select-card-editor',     name: 'Lirum Select',      desc: 'select / input_select.' },
  vacuum:     { tag: 'lirum-vacuum-card',     editor: 'lirum-vacuum-card-editor',     name: 'Lirum Vacuum',      desc: 'Vacuum cleaner.' },
  update:     { tag: 'lirum-update-card',     editor: 'lirum-update-card-editor',     name: 'Lirum Update',      desc: 'Available updates.' },
  humidifier: { tag: 'lirum-humidifier-card', editor: 'lirum-humidifier-card-editor', name: 'Lirum Humidifier',  desc: 'Humidity control.' },
  alarm:      { tag: 'lirum-alarm-card',      editor: 'lirum-alarm-card-editor',      name: 'Lirum Alarm',       desc: 'Alarm panel with keypad.' },
  button:     { tag: 'lirum-button-card',     editor: 'lirum-button-card-editor',     name: 'Lirum Button',      desc: 'Single-press button entity or custom action.' },
  chips:      { tag: 'lirum-chips-card',      editor: 'lirum-chips-card-editor',      name: 'Lirum Chips',       desc: 'Pill row of mini-entities.' },
  title:      { tag: 'lirum-title-card',      editor: 'lirum-title-card-editor',      name: 'Lirum Title',       desc: 'Section header.' },
  template:   { tag: 'lirum-template-card',   editor: 'lirum-template-card-editor',   name: 'Lirum Template',    desc: 'Free-form template card.' },
  scene:      { tag: 'lirum-scene-card',      editor: 'lirum-scene-card-editor',      name: 'Lirum Scene',       desc: 'One-tap scene activation tile.' },
  script:     { tag: 'lirum-script-card',     editor: 'lirum-script-card-editor',     name: 'Lirum Script',      desc: 'Run a script with running-state feedback.' },
} as const;

export type CardKey = keyof typeof CARDS;
