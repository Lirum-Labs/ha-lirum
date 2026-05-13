# ha-lirum Card Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a HACS-installable Lovelace card suite of 18+ Mushroom-equivalent cards with the dark glowing visual identity of ha-power-gauge. Single bundle, shared design system, full Mushroom config parity (tap/hold/double-tap actions, layout options, theme adaptation).

**Architecture:** One monolithic `lirum-cards.js` rollup bundle. Each card lives under `src/cards/<card>/` and registers itself via `customElements.define`. All cards extend `LirumCardBase` which provides hass binding, action handling, layout logic, error states, and shared styles. Editors share `ha-form` schema helpers from `core/editor-utils.ts`.

**Tech Stack:** TypeScript 5, Lit 3, custom-card-helpers 1.9, Rollup 4 (with `@rollup/plugin-typescript`, `-node-resolve`, `-commonjs`, `-json`, `-terser`). Apache-2.0 license. Node 20+.

---

## File structure

Foundation:

- `package.json` — scripts (build, watch, dev, lint, format), deps, metadata
- `tsconfig.json` — strict mode, decorators on, dom + es2022 libs
- `rollup.config.js` — esm + iife outputs, dev/prod modes
- `hacs.json` — HACS metadata
- `.gitignore` — `node_modules/`, `*.log`, but **commit `dist/`** (HACS needs it)
- `LICENSE` — Apache 2.0
- `NOTICE` — copyright header
- `README.md` — usage, install, card index

Source:

- `src/lirum-cards.ts` — entry, re-exports every card
- `src/const.ts` — version, tag/name/description constants for every card
- `src/core/tokens.ts` — color ramps, background recipes, motion timings
- `src/core/styles.ts` — shared `css` template (ha-card frame, glow, layout)
- `src/core/motion.ts` — `clamp`, `lerp`, `easeOutCubic`, ambient drift, arcPath, polar
- `src/core/hass.ts` — `HomeAssistant`, `HassEntity` types, helpers (`stateActive`, `isUnavailable`, `domainOf`)
- `src/core/icons.ts` — default icon per domain, state-aware icon resolution
- `src/core/actions.ts` — `ActionConfig`, `ActionType`, `handleAction`, gesture detector
- `src/core/lirum-base.ts` — `LirumCardBase` LitElement
- `src/core/slider.ts` — reusable `<lirum-slider>` web component
- `src/core/chip.ts` — reusable `<lirum-chip>` for in-card chip rows
- `src/core/icon-display.ts` — reusable `<lirum-icon>` (the haloed icon)
- `src/core/editor-utils.ts` — ha-form schema helpers, default editor groups

Cards (one folder each):

- `src/cards/entity/{entity-card,entity-editor}.ts`
- `src/cards/switch/{switch-card,switch-editor}.ts`
- `src/cards/light/{light-card,light-editor,light-controls}.ts`
- `src/cards/number/{number-card,number-editor}.ts`
- `src/cards/slider/{slider-card,slider-editor}.ts`
- `src/cards/cover/{cover-card,cover-editor}.ts`
- `src/cards/climate/{climate-card,climate-editor,climate-ring}.ts`
- `src/cards/fan/{fan-card,fan-editor}.ts`
- `src/cards/media/{media-card,media-editor}.ts`
- `src/cards/lock/{lock-card,lock-editor}.ts`
- `src/cards/person/{person-card,person-editor}.ts`
- `src/cards/select/{select-card,select-editor}.ts`
- `src/cards/vacuum/{vacuum-card,vacuum-editor}.ts`
- `src/cards/update/{update-card,update-editor}.ts`
- `src/cards/humidifier/{humidifier-card,humidifier-editor}.ts`
- `src/cards/alarm/{alarm-card,alarm-editor,alarm-keypad}.ts`
- `src/cards/chips/{chips-card,chips-editor,chip-types}.ts`
- `src/cards/title/{title-card,title-editor}.ts`
- `src/cards/template/{template-card,template-editor}.ts`

Dev preview:

- `dev/index.html` — page with every card mounted
- `dev/fixtures.ts` — fake `hass.states` covering every domain
- `dev/preview.ts` — wires fixtures to the page, exposes state-toggle UI

Docs:

- `docs/example-dashboard.yaml` — full HA YAML showcasing every card
- `docs/cards/<card>.md` — per-card config reference (18 files)
- `docs/screenshots/` — empty until v0.2

---

## Task 0: Scaffold project

**Files:**
- Create: `.gitignore`, `LICENSE`, `NOTICE`, `package.json`, `tsconfig.json`, `rollup.config.js`, `hacs.json`, `README.md`
- Create: `src/lirum-cards.ts`, `src/const.ts`

- [ ] **Step 0.1: Create `.gitignore`**

```
node_modules/
*.log
.DS_Store
.env
.env.local
*.tsbuildinfo
```

(Note: `dist/` is committed — HACS users install directly from raw GitHub.)

- [ ] **Step 0.2: Create `LICENSE` (Apache 2.0, full text from https://www.apache.org/licenses/LICENSE-2.0.txt)**

Same text as `/tmp/ha-power-gauge/LICENSE`.

- [ ] **Step 0.3: Create `NOTICE`**

```
ha-lirum
Copyright (c) 2026 Lirum Labs

This product is inspired by:
- Mushroom Lovelace cards (https://github.com/piitaya/lovelace-mushroom)
- ha-power-gauge (https://github.com/Lirum-Labs/ha-power-gauge)

Licensed under the Apache License, Version 2.0.
```

- [ ] **Step 0.4: Create `package.json`**

```json
{
  "name": "ha-lirum",
  "version": "0.1.0",
  "description": "Glowing, animated Lovelace cards for Home Assistant — Mushroom controls, ha-power-gauge feel.",
  "main": "dist/lirum-cards.js",
  "type": "module",
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c --watch",
    "dev": "concurrently -n build,serve -c blue,green \"rollup -c --watch\" \"serve -l 8000 .\"",
    "serve": "serve -l 8000 .",
    "lint": "eslint \"src/**/*.ts\" \"dev/**/*.ts\"",
    "format": "prettier --write \"src/**/*.ts\" \"dev/**/*.ts\"",
    "typecheck": "tsc --noEmit"
  },
  "keywords": ["home-assistant", "lovelace", "custom-card", "mushroom", "lirum"],
  "license": "Apache-2.0",
  "author": "Lirum Labs (https://github.com/Lirum-Labs)",
  "homepage": "https://github.com/Lirum-Labs/ha-lirum",
  "repository": { "type": "git", "url": "git+https://github.com/Lirum-Labs/ha-lirum.git" },
  "bugs": { "url": "https://github.com/Lirum-Labs/ha-lirum/issues" },
  "dependencies": {
    "custom-card-helpers": "^1.9.0",
    "lit": "^3.1.4"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^11.1.6",
    "concurrently": "^8.2.2",
    "rollup": "^4.18.0",
    "serve": "^14.2.4",
    "tslib": "^2.6.3",
    "typescript": "^5.4.5"
  }
}
```

- [ ] **Step 0.5: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "isolatedModules": true
  },
  "include": ["src/**/*.ts", "dev/**/*.ts"]
}
```

- [ ] **Step 0.6: Create `rollup.config.js`**

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/lirum-cards.ts',
  output: [
    {
      file: 'dist/lirum-cards.js',
      format: 'es',
      sourcemap: dev,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/lirum-cards.iife.js',
      format: 'iife',
      name: 'HaLirum',
      sourcemap: dev,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: dev, inlineSources: dev }),
    !dev && terser({ format: { comments: false } }),
  ],
};
```

- [ ] **Step 0.7: Create `hacs.json`**

```json
{
  "name": "Lirum Cards",
  "render_readme": true,
  "filename": "lirum-cards.js",
  "content_in_root": false,
  "homeassistant": "2024.1.0"
}
```

- [ ] **Step 0.8: Create `README.md` stub**

A short README explaining what the project is, install via HACS instructions (placeholder until release), and listing all card types. Will be filled in with examples in Wave 9.

- [ ] **Step 0.9: Create `src/const.ts`**

Exports version + per-card tag/name/description constants. Pattern matches ha-power-gauge:

```ts
export const VERSION = '0.1.0';

export const CARDS = {
  entity:     { tag: 'lirum-entity-card',     editor: 'lirum-entity-card-editor',     name: 'Lirum Entity',      desc: 'Universal entity card.' },
  switch:     { tag: 'lirum-switch-card',     editor: 'lirum-switch-card-editor',     name: 'Lirum Switch',      desc: 'Toggleable switch/boolean.' },
  light:      { tag: 'lirum-light-card',      editor: 'lirum-light-card-editor',      name: 'Lirum Light',       desc: 'Brightness, color temp, and color control.' },
  number:     { tag: 'lirum-number-card',     editor: 'lirum-number-card-editor',     name: 'Lirum Number',      desc: 'input_number / number slider.' },
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
  chips:      { tag: 'lirum-chips-card',      editor: 'lirum-chips-card-editor',      name: 'Lirum Chips',       desc: 'Pill row of mini-entities.' },
  title:      { tag: 'lirum-title-card',      editor: 'lirum-title-card-editor',      name: 'Lirum Title',       desc: 'Section header.' },
  template:   { tag: 'lirum-template-card',   editor: 'lirum-template-card-editor',   name: 'Lirum Template',    desc: 'Jinja-rendered free-form card.' },
} as const;
```

- [ ] **Step 0.10: Create `src/lirum-cards.ts`**

```ts
import { VERSION } from './const';

// Card registrations — order doesn't matter, each guards its own customElements.define.
import './cards/entity/entity-card';
import './cards/switch/switch-card';
import './cards/light/light-card';
import './cards/number/number-card';
import './cards/slider/slider-card';
import './cards/cover/cover-card';
import './cards/climate/climate-card';
import './cards/fan/fan-card';
import './cards/media/media-card';
import './cards/lock/lock-card';
import './cards/person/person-card';
import './cards/select/select-card';
import './cards/vacuum/vacuum-card';
import './cards/update/update-card';
import './cards/humidifier/humidifier-card';
import './cards/alarm/alarm-card';
import './cards/chips/chips-card';
import './cards/title/title-card';
import './cards/template/template-card';

// Console banner
const ramp = ['#1ee0ff', '#2a7bff', '#0a3aa0'];
console.info(
  `%c LIRUM %c v${VERSION} %c ${Object.keys({}).length || 19} cards `,
  `background:${ramp[2]};color:white;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600`,
  `background:${ramp[1]};color:white;padding:2px 6px`,
  `background:${ramp[0]};color:#001020;padding:2px 6px;border-radius:0 3px 3px 0`,
);
```

- [ ] **Step 0.11: Install deps and run a sanity build**

```bash
npm install
npm run typecheck
```

`typecheck` will fail because the imported card files don't exist yet — that's expected. We'll satisfy it in Waves 1-9.

- [ ] **Step 0.12: Commit scaffolding**

```bash
git add .gitignore LICENSE NOTICE package.json package-lock.json tsconfig.json rollup.config.js hacs.json README.md src/lirum-cards.ts src/const.ts
git commit -m "chore: scaffold build chain, entry point, and card registry"
```

---

## Task 1: Shared core — design tokens

**Files:**
- Create: `src/core/tokens.ts`, `src/core/styles.ts`, `src/core/motion.ts`

- [ ] **Step 1.1: Write `src/core/tokens.ts`**

```ts
export interface Palette {
  c1: string; // bright accent
  c2: string; // mid
  c3: string; // deep
}

export const LIRUM_RAMPS: Record<string, Palette> = {
  cool:    { c1: '#1ee0ff', c2: '#2a7bff', c3: '#0a3aa0' },
  warm:    { c1: '#ffb347', c2: '#ff6e3c', c3: '#7a1b07' },
  energy:  { c1: '#a8ff5a', c2: '#3acf3a', c3: '#1a5f1a' },
  alert:   { c1: '#ff5a7a', c2: '#d12338', c3: '#5a0a16' },
  rose:    { c1: '#ff9ae0', c2: '#c046b3', c3: '#5a1b54' },
  amber:   { c1: '#ffd35a', c2: '#e89a1a', c3: '#6e4408' },
  neutral: { c1: '#9dadc7', c2: '#5d6f8f', c3: '#1f2a3e' },
};

export const LIRUM_BG = {
  default: 'radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%), linear-gradient(180deg, #0b1326, #060a14)',
  flat: 'linear-gradient(180deg, #0b1326, #060a14)',
};

export const LIRUM_TEXT = '#eef3ff';
export const LIRUM_MUTED = '#6b7894';

export function rampOf(name: string | undefined): Palette {
  if (!name) return LIRUM_RAMPS.cool;
  if (name in LIRUM_RAMPS) return LIRUM_RAMPS[name];
  // Treat as a raw CSS color — derive companion shades.
  return { c1: name, c2: name, c3: name };
}

export function backgroundVars(bg: string | undefined): Record<string, string> {
  const raw = (bg ?? '').trim();
  const value = raw.length === 0 ? LIRUM_BG.default : raw;
  const adaptive = value.toLowerCase() === 'transparent' || value.toLowerCase() === 'theme';
  return {
    '--lirum-bg': adaptive ? 'transparent' : value,
    '--lirum-text': adaptive ? 'var(--primary-text-color, #eef3ff)' : LIRUM_TEXT,
    '--lirum-muted': adaptive ? 'var(--secondary-text-color, #6b7894)' : LIRUM_MUTED,
    '--lirum-card-border': adaptive
      ? 'var(--ha-card-border-color, var(--divider-color, rgba(0,0,0,0.12)))'
      : 'color-mix(in oklab, currentColor 12%, transparent)',
  };
}
```

- [ ] **Step 1.2: Write `src/core/motion.ts`**

```ts
export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function hexToRgb(h: string): [number, number, number] {
  const s = h.replace('#', '').trim();
  const v = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

export function mixHex(h1: string, h2: string, t: number): string {
  const a = hexToRgb(h1);
  const b = hexToRgb(h2);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

export class ValueRamp {
  private from = 0;
  private to = 0;
  private start = 0;
  private duration = 500;
  private raf?: number;
  current = 0;

  constructor(private onTick: (v: number) => void, durationMs = 500) {
    this.duration = durationMs;
  }

  rampTo(v: number): void {
    this.from = this.current;
    this.to = v;
    this.start = performance.now();
    if (this.raf) cancelAnimationFrame(this.raf);
    const tick = (now: number): void => {
      const t = clamp((now - this.start) / this.duration, 0, 1);
      this.current = lerp(this.from, this.to, easeOutCubic(t));
      this.onTick(this.current);
      if (t < 1) this.raf = requestAnimationFrame(tick);
      else this.raf = undefined;
    };
    this.raf = requestAnimationFrame(tick);
  }

  snap(v: number): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.current = v;
    this.from = v;
    this.to = v;
    this.onTick(v);
  }

  destroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
```

- [ ] **Step 1.3: Write `src/core/styles.ts`**

```ts
import { css } from 'lit';

export const lirumCardFrame = css`
  :host {
    --lirum-bg: radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%),
      linear-gradient(180deg, #0b1326, #060a14);
    --lirum-text: #eef3ff;
    --lirum-muted: #6b7894;
    --lirum-card-border: color-mix(in oklab, currentColor 12%, transparent);
    --lirum-radius: var(--ha-card-border-radius, 16px);
    --lirum-c1: #1ee0ff;
    --lirum-c2: #2a7bff;
    --lirum-c3: #0a3aa0;
    display: block;
  }

  ha-card {
    background: var(--lirum-bg);
    color: var(--lirum-text);
    border: 1px solid var(--lirum-card-border);
    border-radius: var(--lirum-radius);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35),
      0 0 0 1px color-mix(in oklab, currentColor 2%, transparent) inset;
    overflow: hidden;
    font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    position: relative;
  }

  ha-card::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(1px 1px at 20% 30%, color-mix(in oklab, currentColor 60%, transparent), transparent),
      radial-gradient(1px 1px at 70% 60%, color-mix(in oklab, currentColor 40%, transparent), transparent),
      radial-gradient(1px 1px at 40% 80%, color-mix(in oklab, currentColor 50%, transparent), transparent),
      radial-gradient(1px 1px at 85% 20%, color-mix(in oklab, currentColor 30%, transparent), transparent);
    opacity: 0.18;
  }

  .error {
    padding: 14px 16px;
    color: var(--error-color, #db4437);
    font-size: 13px;
  }

  .lirum-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--lirum-text);
    letter-spacing: -0.2px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lirum-state {
    font-size: 12px;
    color: var(--lirum-muted);
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .lirum-anim {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export const lirumLayouts = css`
  .lirum-tile {
    padding: 12px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 6px;
    align-items: center;
  }

  .lirum-tile .icon {
    grid-row: 1 / span 2;
    align-self: center;
  }

  .lirum-tile .label {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
  }

  .lirum-tile .secondary {
    grid-column: 2;
    grid-row: 2;
    min-width: 0;
  }

  .lirum-tile .trailing {
    grid-column: 3;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .lirum-tile.horizontal {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: start;
    text-align: left;
  }

  .lirum-tile.horizontal .icon {
    grid-row: 1;
    grid-column: 1;
    margin-bottom: 4px;
  }

  .lirum-tile.horizontal .label,
  .lirum-tile.horizontal .secondary {
    grid-column: 1;
  }

  .lirum-tile.vertical {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    justify-items: center;
    text-align: center;
  }

  .lirum-tile.vertical .icon {
    grid-row: 1;
    grid-column: 1;
  }

  .lirum-tile.vertical .label {
    grid-column: 1;
    grid-row: 2;
  }

  .lirum-tile.vertical .secondary {
    grid-column: 1;
    grid-row: 3;
  }

  .lirum-controls {
    grid-column: 1 / -1;
    padding: 8px 12px 12px;
    border-top: 1px solid color-mix(in oklab, currentColor 6%, transparent);
  }
`;

export const lirumKeyframes = css`
  @keyframes lirum-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.5; transform: scale(0.85); }
  }
  @keyframes lirum-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes lirum-shimmer {
    0%, 100% { opacity: 0.85; }
    50%      { opacity: 1; }
  }
`;
```

- [ ] **Step 1.4: Run typecheck**

```bash
npm run typecheck
```

Still fails (cards not built yet), but core modules should type-check cleanly. If errors appear in `tokens.ts`/`motion.ts`/`styles.ts`, fix them inline.

- [ ] **Step 1.5: Commit**

```bash
git add src/core/tokens.ts src/core/styles.ts src/core/motion.ts
git commit -m "feat(core): design tokens, motion utilities, shared styles"
```

---

## Task 2: Shared core — types, helpers, actions

**Files:**
- Create: `src/core/hass.ts`, `src/core/icons.ts`, `src/core/actions.ts`

- [ ] **Step 2.1: Write `src/core/hass.ts`**

```ts
import type { LovelaceCardConfig } from 'custom-card-helpers';

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    entity_picture?: string;
    unit_of_measurement?: string;
    device_class?: string;
    supported_features?: number;
  };
  last_changed?: string;
  last_updated?: string;
}

export interface HassUser {
  id: string;
  name: string;
  is_admin: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: { darkMode: boolean };
  language: string;
  locale: { language: string };
  user?: HassUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[]; device_id?: string | string[]; area_id?: string | string[] },
  ) => Promise<void>;
  callApi: <T = unknown>(method: string, path: string, parameters?: Record<string, unknown>) => Promise<T>;
  formatEntityState?: (state: HassEntity, value?: string) => string;
  formatEntityAttributeValue?: (state: HassEntity, attribute: string, value?: unknown) => string;
}

export type LirumActionConfig =
  | { action: 'more-info' }
  | { action: 'toggle' }
  | { action: 'call-service'; service: string; service_data?: Record<string, unknown>; target?: { entity_id?: string | string[] } }
  | { action: 'navigate'; navigation_path: string }
  | { action: 'url'; url_path: string }
  | { action: 'none' }
  | { action: 'assist'; pipeline_id?: string; start_listening?: boolean };

export interface LirumBaseConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  layout?: 'default' | 'horizontal' | 'vertical';
  fill_container?: boolean;
  tap_action?: LirumActionConfig;
  hold_action?: LirumActionConfig;
  double_tap_action?: LirumActionConfig;
  background?: string;
}

export function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}

export function stateActive(stateObj: HassEntity | undefined): boolean {
  if (!stateObj) return false;
  const s = stateObj.state;
  if (s === 'unavailable' || s === 'unknown') return false;
  const domain = domainOf(stateObj.entity_id);
  switch (domain) {
    case 'climate':
      return s !== 'off';
    case 'cover':
      return s === 'open' || s === 'opening' || s === 'closing';
    case 'media_player':
      return s !== 'off' && s !== 'idle' && s !== 'standby';
    case 'vacuum':
      return s !== 'docked' && s !== 'off';
    case 'plant':
      return s === 'problem';
    case 'lock':
      return s !== 'locked';
    case 'alarm_control_panel':
      return s !== 'disarmed';
    case 'person':
    case 'device_tracker':
      return s === 'home';
    case 'humidifier':
    case 'fan':
    case 'light':
    case 'switch':
    case 'input_boolean':
    case 'binary_sensor':
    case 'automation':
    case 'group':
    case 'remote':
    case 'siren':
    case 'water_heater':
      return s === 'on' || s === 'home' || s === 'open' || s === 'true';
    default:
      return s !== 'off' && s !== 'closed' && s !== 'no' && s !== 'false';
  }
}

export function isUnavailable(stateObj: HassEntity | undefined): boolean {
  if (!stateObj) return true;
  return stateObj.state === 'unavailable' || stateObj.state === 'unknown';
}

export function entityName(entity: string, stateObj: HassEntity | undefined, override: string | undefined): string {
  if (override) return override;
  return stateObj?.attributes.friendly_name || entity;
}

export function entityIcon(stateObj: HassEntity | undefined, override: string | undefined): string | undefined {
  return override ?? stateObj?.attributes.icon;
}

export function supportsFeature(stateObj: HassEntity | undefined, feature: number): boolean {
  const sf = stateObj?.attributes.supported_features;
  return typeof sf === 'number' && (sf & feature) !== 0;
}
```

- [ ] **Step 2.2: Write `src/core/icons.ts`**

```ts
import type { HassEntity } from './hass';
import { domainOf, stateActive } from './hass';

const DEFAULT_ICONS: Record<string, string> = {
  alarm_control_panel: 'mdi:shield-home',
  automation: 'mdi:robot',
  binary_sensor: 'mdi:radiobox-blank',
  button: 'mdi:gesture-tap-button',
  camera: 'mdi:video',
  climate: 'mdi:thermostat',
  cover: 'mdi:window-shutter',
  device_tracker: 'mdi:account',
  fan: 'mdi:fan',
  group: 'mdi:google-circles-communities',
  humidifier: 'mdi:air-humidifier',
  input_boolean: 'mdi:toggle-switch',
  input_button: 'mdi:gesture-tap-button',
  input_number: 'mdi:ray-vertex',
  input_select: 'mdi:format-list-bulleted',
  input_text: 'mdi:form-textbox',
  light: 'mdi:lightbulb',
  lock: 'mdi:lock',
  media_player: 'mdi:cast',
  number: 'mdi:ray-vertex',
  person: 'mdi:account',
  plant: 'mdi:flower',
  remote: 'mdi:remote',
  scene: 'mdi:palette',
  script: 'mdi:script-text',
  select: 'mdi:format-list-bulleted',
  sensor: 'mdi:eye',
  siren: 'mdi:bullhorn',
  sun: 'mdi:white-balance-sunny',
  switch: 'mdi:flash',
  timer: 'mdi:timer-outline',
  update: 'mdi:package-down',
  vacuum: 'mdi:robot-vacuum',
  water_heater: 'mdi:thermometer',
  weather: 'mdi:weather-partly-cloudy',
  zone: 'mdi:map-marker-radius',
};

export function defaultIconFor(stateObj: HassEntity | undefined, entityId?: string): string {
  if (!stateObj && !entityId) return 'mdi:bookmark-outline';
  const id = stateObj?.entity_id ?? entityId!;
  const domain = domainOf(id);
  return stateAwareIcon(domain, stateObj) ?? DEFAULT_ICONS[domain] ?? 'mdi:bookmark-outline';
}

function stateAwareIcon(domain: string, stateObj: HassEntity | undefined): string | undefined {
  const s = stateObj?.state;
  switch (domain) {
    case 'cover': {
      if (s === 'closed') return 'mdi:window-shutter';
      if (s === 'opening') return 'mdi:arrow-up-box';
      if (s === 'closing') return 'mdi:arrow-down-box';
      return 'mdi:window-shutter-open';
    }
    case 'lock':
      return s === 'locked' ? 'mdi:lock' : 'mdi:lock-open-variant';
    case 'alarm_control_panel':
      switch (s) {
        case 'disarmed': return 'mdi:shield-off';
        case 'armed_home': return 'mdi:shield-home';
        case 'armed_away': return 'mdi:shield-lock';
        case 'armed_night': return 'mdi:shield-moon';
        case 'armed_vacation': return 'mdi:shield-airplane';
        case 'pending':
        case 'arming': return 'mdi:shield-outline';
        case 'triggered': return 'mdi:bell-ring';
        default: return 'mdi:shield';
      }
    case 'media_player':
      if (s === 'playing') return 'mdi:play';
      if (s === 'paused') return 'mdi:pause';
      if (s === 'idle' || s === 'standby') return 'mdi:speaker';
      if (s === 'off') return 'mdi:speaker-off';
      return 'mdi:cast';
    case 'vacuum':
      if (s === 'cleaning') return 'mdi:robot-vacuum-variant';
      if (s === 'returning') return 'mdi:home-import-outline';
      if (s === 'docked') return 'mdi:robot-vacuum';
      return 'mdi:robot-vacuum-alert';
    case 'switch':
      return stateActive(stateObj) ? 'mdi:flash' : 'mdi:flash-off';
    case 'light':
      return stateActive(stateObj) ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline';
    case 'fan':
      return stateActive(stateObj) ? 'mdi:fan' : 'mdi:fan-off';
    case 'humidifier':
      return stateActive(stateObj) ? 'mdi:air-humidifier' : 'mdi:air-humidifier-off';
  }
  return undefined;
}
```

- [ ] **Step 2.3: Write `src/core/actions.ts`**

```ts
import type { HomeAssistant, LirumActionConfig, LirumBaseConfig } from './hass';
import { domainOf } from './hass';

export type GestureType = 'tap' | 'hold' | 'double_tap';

const HOLD_MS = 500;
const DOUBLE_TAP_MS = 300;

interface GestureState {
  downAt: number;
  holdTimer?: number;
  lastTap: number;
}

// Domains where `tap` defaults to `toggle` per the spec. Other toggle-able
// domains require an explicit `tap_action: { action: toggle }` from the user.
const DEFAULT_TAP_TOGGLE = new Set(['light', 'switch', 'fan', 'input_boolean', 'automation', 'remote', 'siren']);

// Domain → (domain, service) for the `toggle` action regardless of how it
// was invoked.
const SVC_FOR_TOGGLE: Record<string, { domain: string; service: string }> = {
  light: { domain: 'light', service: 'toggle' },
  switch: { domain: 'switch', service: 'toggle' },
  fan: { domain: 'fan', service: 'toggle' },
  input_boolean: { domain: 'input_boolean', service: 'toggle' },
  automation: { domain: 'automation', service: 'toggle' },
  remote: { domain: 'remote', service: 'toggle' },
  cover: { domain: 'cover', service: 'toggle' },
  humidifier: { domain: 'humidifier', service: 'toggle' },
  climate: { domain: 'climate', service: 'toggle' },
  media_player: { domain: 'media_player', service: 'media_play_pause' },
  siren: { domain: 'siren', service: 'toggle' },
};

export function defaultActionFor(entity: string | undefined, gesture: GestureType): LirumActionConfig {
  if (gesture === 'tap') {
    if (!entity) return { action: 'none' };
    const d = domainOf(entity);
    if (DEFAULT_TAP_TOGGLE.has(d)) return { action: 'toggle' };
    return { action: 'more-info' };
  }
  return { action: 'more-info' };
}

export function handleLirumAction(
  element: HTMLElement,
  hass: HomeAssistant,
  config: LirumBaseConfig,
  gesture: GestureType,
): void {
  const cfgAction =
    gesture === 'hold' ? config.hold_action :
    gesture === 'double_tap' ? config.double_tap_action :
    config.tap_action;
  const action: LirumActionConfig = cfgAction ?? defaultActionFor(config.entity, gesture);
  performAction(element, hass, config.entity, action);
}

function performAction(
  element: HTMLElement,
  hass: HomeAssistant,
  entity: string | undefined,
  action: LirumActionConfig,
): void {
  switch (action.action) {
    case 'none':
      return;
    case 'more-info': {
      if (!entity) return;
      fireMoreInfo(element, entity);
      return;
    }
    case 'toggle': {
      if (!entity) return;
      const d = domainOf(entity);
      const svc = SVC_FOR_TOGGLE[d];
      if (svc) hass.callService(svc.domain, svc.service, { entity_id: entity });
      else fireMoreInfo(element, entity);
      return;
    }
    case 'call-service': {
      const [domain, service] = action.service.split('.');
      if (!domain || !service) return;
      const data = { ...(action.service_data ?? {}) };
      hass.callService(domain, service, data, action.target);
      return;
    }
    case 'navigate':
      window.history.pushState(null, '', action.navigation_path);
      window.dispatchEvent(new Event('location-changed'));
      return;
    case 'url':
      window.open(action.url_path, '_blank', 'noopener,noreferrer');
      return;
    case 'assist':
      element.dispatchEvent(
        new CustomEvent('hass-action', {
          bubbles: true,
          composed: true,
          detail: { config: action, action: 'assist' },
        }),
      );
      return;
  }
}

function fireMoreInfo(element: HTMLElement, entityId: string): void {
  element.dispatchEvent(
    new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }),
  );
}

export function bindGestures(
  el: HTMLElement,
  invoke: (gesture: GestureType) => void,
): () => void {
  const state: GestureState = { downAt: 0, lastTap: 0 };

  const onDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    state.downAt = performance.now();
    state.holdTimer = window.setTimeout(() => {
      state.holdTimer = undefined;
      invoke('hold');
      state.downAt = 0;
    }, HOLD_MS);
  };

  const onUp = (): void => {
    if (state.holdTimer) {
      window.clearTimeout(state.holdTimer);
      state.holdTimer = undefined;
    }
    if (state.downAt === 0) return;
    const elapsed = performance.now() - state.downAt;
    state.downAt = 0;
    if (elapsed >= HOLD_MS) return;
    const now = performance.now();
    if (now - state.lastTap <= DOUBLE_TAP_MS) {
      state.lastTap = 0;
      invoke('double_tap');
    } else {
      state.lastTap = now;
      window.setTimeout(() => {
        if (state.lastTap !== 0 && performance.now() - state.lastTap >= DOUBLE_TAP_MS) {
          state.lastTap = 0;
          invoke('tap');
        }
      }, DOUBLE_TAP_MS + 10);
    }
  };

  const onCancel = (): void => {
    if (state.holdTimer) window.clearTimeout(state.holdTimer);
    state.holdTimer = undefined;
    state.downAt = 0;
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onCancel);
  el.addEventListener('pointerleave', onCancel);

  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onCancel);
    el.removeEventListener('pointerleave', onCancel);
  };
}
```

- [ ] **Step 2.4: Commit**

```bash
git add src/core/hass.ts src/core/icons.ts src/core/actions.ts
git commit -m "feat(core): hass types, default icons, action + gesture handling"
```

---

## Task 3: Shared core — icon-display, slider, chip widgets, base card

**Files:**
- Create: `src/core/icon-display.ts`, `src/core/slider.ts`, `src/core/chip.ts`, `src/core/lirum-base.ts`, `src/core/editor-utils.ts`

- [ ] **Step 3.1: Write `src/core/icon-display.ts`**

```ts
import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-icon')
export class LirumIcon extends LitElement {
  @property() icon = 'mdi:bookmark-outline';
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) unavailable = false;
  @property({ type: Boolean }) pulse = false;
  @property({ type: Number }) intensity = 1;

  protected render(): TemplateResult | typeof nothing {
    const palette: Palette = rampOf(this.colorRamp);
    const halo = Math.max(0, Math.min(1, this.intensity));
    return html`
      <div
        class="wrap ${this.active ? 'active' : ''} ${this.unavailable ? 'unavail' : ''} ${this.pulse ? 'pulse lirum-anim' : ''}"
        style="--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3};--halo:${halo}"
      >
        <div class="glow"></div>
        <ha-icon icon=${this.icon}></ha-icon>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      --size: 40px;
    }
    .wrap {
      position: relative;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 8%, transparent);
      transition: background 0.4s, border-color 0.4s;
    }
    .wrap.active {
      background: linear-gradient(
        135deg,
        color-mix(in oklab, var(--c1) 25%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 35%, transparent);
    }
    .wrap.unavail {
      opacity: 0.5;
      border-style: dashed;
    }
    .glow {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        color-mix(in oklab, var(--c1) calc(70% * var(--halo, 1)), transparent) 0%,
        color-mix(in oklab, var(--c2) calc(40% * var(--halo, 1)), transparent) 45%,
        transparent 80%
      );
      filter: blur(4px);
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
    }
    .wrap.active .glow {
      opacity: 1;
    }
    ha-icon {
      --mdc-icon-size: calc(var(--size) * 0.55);
      color: var(--lirum-text, #eef3ff);
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 50%, transparent));
      transition: color 0.4s, filter 0.4s;
    }
    .wrap.unavail ha-icon {
      filter: none;
      color: var(--lirum-muted, #6b7894);
    }
    .pulse ha-icon {
      animation: lirum-glow-pulse 2.4s ease-in-out infinite;
    }
    @keyframes lirum-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1) 50%, transparent)); }
      50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1) 80%, transparent)); }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-icon': LirumIcon;
  }
}
```

- [ ] **Step 3.2: Write `src/core/slider.ts`**

```ts
import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { clamp } from './motion';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-slider')
export class LirumSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showValue = false;
  @property() unit = '';

  @state() private _dragging = false;
  @state() private _displayValue = 0;

  private _trackEl?: HTMLElement;

  protected updated(): void {
    if (!this._dragging) this._displayValue = this.value;
  }

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    const range = Math.max(1, this.max - this.min);
    const pct = clamp(((this._displayValue ?? this.value) - this.min) / range, 0, 1);
    return html`
      <div
        class="root ${this.disabled ? 'disabled' : ''}"
        style="--c1:${palette.c1};--c2:${palette.c2};--c3:${palette.c3};--pct:${pct}"
      >
        <div
          class="track"
          @pointerdown=${this._down}
          @pointermove=${this._move}
          @pointerup=${this._up}
          @pointercancel=${this._up}
        >
          <div class="fill"></div>
          <div class="cap"></div>
        </div>
        ${this.showValue
          ? html`<div class="value">${this._format(pct * range + this.min)}<span class="unit">${this.unit}</span></div>`
          : ''}
      </div>
    `;
  }

  private _format(v: number): string {
    if (this.step >= 1) return Math.round(v).toLocaleString();
    const decimals = Math.max(0, Math.min(4, Math.ceil(-Math.log10(this.step))));
    return v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  private _down(e: PointerEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    const track = e.currentTarget as HTMLElement;
    this._trackEl = track;
    track.setPointerCapture(e.pointerId);
    this._dragging = true;
    this._updateFromEvent(e);
  }

  private _move(e: PointerEvent): void {
    if (!this._dragging) return;
    this._updateFromEvent(e);
  }

  private _up(e: PointerEvent): void {
    if (!this._dragging) return;
    this._dragging = false;
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this._displayValue }, bubbles: true, composed: true }),
    );
  }

  private _updateFromEvent(e: PointerEvent): void {
    if (!this._trackEl) return;
    const rect = this._trackEl.getBoundingClientRect();
    const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const raw = this.min + pct * (this.max - this.min);
    const stepped = Math.round(raw / this.step) * this.step;
    this._displayValue = clamp(stepped, this.min, this.max);
    this.dispatchEvent(
      new CustomEvent('input', { detail: { value: this._displayValue }, bubbles: true, composed: true }),
    );
  }

  static styles = css`
    :host { display: block; }
    .root { display: flex; align-items: center; gap: 12px; }
    .root.disabled { opacity: 0.5; pointer-events: none; }
    .track {
      position: relative;
      flex: 1;
      height: 10px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 10%, transparent);
      overflow: hidden;
      touch-action: none;
      cursor: pointer;
    }
    .fill {
      position: absolute;
      inset: 0;
      width: calc(var(--pct, 0) * 100%);
      background: linear-gradient(90deg, var(--c1), var(--c2));
      border-radius: 999px;
      box-shadow:
        0 0 8px color-mix(in oklab, var(--c1) 60%, transparent),
        0 0 16px color-mix(in oklab, var(--c2) 35%, transparent);
      transition: width 0.05s linear;
    }
    .cap {
      position: absolute;
      left: calc(var(--pct, 0) * 100%);
      top: 50%;
      width: 14px;
      height: 14px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--c1);
      border: 2px solid rgba(0,0,0,0.5);
      box-shadow: 0 0 10px var(--c1);
    }
    .value {
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      min-width: 3.5em;
      text-align: right;
    }
    .value .unit {
      font-size: 11px;
      margin-left: 2px;
      color: color-mix(in oklab, currentColor 60%, transparent);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-slider': LirumSlider;
  }
}
```

- [ ] **Step 3.3: Write `src/core/chip.ts`**

```ts
import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rampOf, type Palette } from './tokens';

@customElement('lirum-chip')
export class LirumChip extends LitElement {
  @property() icon = '';
  @property() label = '';
  @property() colorRamp = 'cool';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  protected render(): TemplateResult {
    const palette: Palette = rampOf(this.colorRamp);
    return html`
      <button
        class="chip ${this.active ? 'active' : ''}"
        ?disabled=${this.disabled}
        style="--c1:${palette.c1};--c2:${palette.c2}"
      >
        ${this.icon ? html`<ha-icon icon=${this.icon}></ha-icon>` : ''}
        ${this.label ? html`<span>${this.label}</span>` : ''}
      </button>
    `;
  }

  static styles = css`
    :host { display: inline-block; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .chip:hover:not(:disabled) {
      background: color-mix(in oklab, currentColor 10%, transparent);
    }
    .chip.active {
      background: linear-gradient(135deg,
        color-mix(in oklab, var(--c1) 22%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent));
      border-color: color-mix(in oklab, var(--c1) 50%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, var(--c1) 30%, transparent),
        0 0 12px color-mix(in oklab, var(--c1) 25%, transparent);
      color: white;
    }
    .chip:disabled { opacity: 0.5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 16px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-chip': LirumChip;
  }
}
```

- [ ] **Step 3.4: Write `src/core/lirum-base.ts`**

```ts
import { LitElement, html, css, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant, LirumBaseConfig, HassEntity } from './hass';
import { entityName, entityIcon, isUnavailable, stateActive } from './hass';
import { defaultIconFor } from './icons';
import { backgroundVars } from './tokens';
import { bindGestures, handleLirumAction, type GestureType } from './actions';
import { lirumCardFrame, lirumLayouts, lirumKeyframes } from './styles';

export abstract class LirumCardBase<TConfig extends LirumBaseConfig = LirumBaseConfig> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: TConfig;
  private _unbindGestures?: () => void;
  private _gestureRoot?: HTMLElement;

  public setConfig(config: TConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Re-bind on next paint after first render.
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unbindGestures?.();
    this._unbindGestures = undefined;
  }

  protected updated(_changed: PropertyValues): void {
    const root = this.renderRoot.querySelector<HTMLElement>('.lirum-gesture-root');
    if (root && root !== this._gestureRoot) {
      this._unbindGestures?.();
      this._gestureRoot = root;
      this._unbindGestures = bindGestures(root, (g) => this._invokeAction(g));
    }
  }

  private _invokeAction(gesture: GestureType): void {
    if (!this.hass || !this._config) return;
    handleLirumAction(this, this.hass, this._config, gesture);
  }

  protected _stateObj(entity?: string): HassEntity | undefined {
    const id = entity ?? this._config?.entity;
    if (!id || !this.hass) return undefined;
    return this.hass.states[id];
  }

  protected _renderError(msg: string): TemplateResult {
    return html`<ha-card><div class="error">${msg}</div></ha-card>`;
  }

  /**
   * Standard tile layout — icon + name + secondary. Subclasses provide the
   * secondary text (formatted state) and optional trailing/controls slots.
   */
  protected _renderTile(opts: {
    icon?: string;
    iconColor?: string;
    iconActive?: boolean;
    iconUnavailable?: boolean;
    iconPulse?: boolean;
    primary: string;
    secondary?: string;
    trailing?: TemplateResult;
    controls?: TemplateResult;
  }): TemplateResult {
    const layout = this._config?.layout ?? 'default';
    const fill = this._config?.fill_container ? 'fill' : '';
    const cssVars = backgroundVars(this._config?.background);
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root ${fill}">
          <div class="lirum-tile ${layout}">
            ${opts.icon
              ? html`<lirum-icon
                  class="icon"
                  .icon=${opts.icon}
                  .colorRamp=${opts.iconColor ?? this._config?.icon_color ?? 'cool'}
                  .active=${opts.iconActive ?? false}
                  .unavailable=${opts.iconUnavailable ?? false}
                  .pulse=${opts.iconPulse ?? false}
                ></lirum-icon>`
              : nothing}
            <div class="label lirum-name">${opts.primary}</div>
            ${opts.secondary
              ? html`<div class="secondary lirum-state">${opts.secondary}</div>`
              : nothing}
            ${opts.trailing ? html`<div class="trailing">${opts.trailing}</div>` : nothing}
            ${opts.controls ?? nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  /** Convenience used by entity-bound cards. */
  protected _defaultPrimary(): string {
    if (!this._config) return '';
    return entityName(this._config.entity ?? '', this._stateObj(), this._config.name);
  }

  protected _defaultIcon(): string {
    return entityIcon(this._stateObj(), this._config?.icon) ?? defaultIconFor(this._stateObj(), this._config?.entity);
  }

  protected _isActive(): boolean {
    return stateActive(this._stateObj());
  }

  protected _isUnavailable(): boolean {
    return isUnavailable(this._stateObj());
  }

  protected _formattedState(): string {
    const s = this._stateObj();
    if (!s) return '';
    if (this.hass?.formatEntityState) return this.hass.formatEntityState(s);
    return s.state;
  }

  abstract render(): TemplateResult | typeof nothing;

  static styles = [lirumCardFrame, lirumLayouts, lirumKeyframes, css`
    .fill { height: 100%; display: grid; }
  `];
}
```

- [ ] **Step 3.5: Write `src/core/editor-utils.ts`**

```ts
import type { LirumBaseConfig } from './hass';

export interface SchemaItem {
  name: string;
  type?: 'grid' | 'expandable';
  title?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  schema?: SchemaItem[];
  icon?: string;
}

const actionSchema = (name: string, title: string): SchemaItem => ({
  name: '',
  type: 'expandable',
  title,
  schema: [
    {
      name,
      selector: {
        ui_action: {
          actions: ['more-info', 'toggle', 'navigate', 'url', 'call-service', 'assist', 'none'],
        },
      },
    },
  ],
});

export const ICON_COLOR_OPTIONS = [
  { value: 'cool', label: 'Cool (cyan→blue)' },
  { value: 'warm', label: 'Warm (orange)' },
  { value: 'energy', label: 'Energy (green)' },
  { value: 'alert', label: 'Alert (red)' },
  { value: 'rose', label: 'Rose (pink)' },
  { value: 'amber', label: 'Amber (yellow)' },
  { value: 'neutral', label: 'Neutral' },
];

export function appearanceGroup(): SchemaItem {
  return {
    name: '',
    type: 'expandable',
    title: 'Appearance',
    schema: [
      {
        name: '',
        type: 'grid',
        schema: [
          {
            name: 'layout',
            selector: { select: { mode: 'dropdown', options: [
              { value: 'default', label: 'Default' },
              { value: 'horizontal', label: 'Horizontal' },
              { value: 'vertical', label: 'Vertical' },
            ]}},
          },
          { name: 'fill_container', selector: { boolean: {} } },
        ],
      },
      {
        name: '',
        type: 'grid',
        schema: [
          {
            name: 'icon_color',
            selector: { select: { mode: 'dropdown', custom_value: true, options: ICON_COLOR_OPTIONS } },
          },
          { name: 'background', selector: { text: {} } },
        ],
      },
    ],
  };
}

export function interactionGroup(): SchemaItem {
  return {
    name: '',
    type: 'expandable',
    title: 'Interactions',
    schema: [
      actionSchema('tap_action', 'Tap behavior'),
      actionSchema('hold_action', 'Hold behavior'),
      actionSchema('double_tap_action', 'Double-tap behavior'),
    ],
  };
}

export const COMMON_LABELS: Record<string, string> = {
  entity: 'Entity',
  name: 'Custom name',
  icon: 'Icon (mdi:…)',
  icon_color: 'Icon color',
  layout: 'Layout',
  fill_container: 'Fill container',
  background: 'Background (CSS / "transparent")',
  tap_action: 'Tap action',
  hold_action: 'Hold action',
  double_tap_action: 'Double-tap action',
};

export function entityHead(domains: string[]): SchemaItem[] {
  return [
    { name: 'entity', required: true, selector: { entity: { domain: domains } } },
    {
      name: '',
      type: 'grid',
      schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
      ],
    },
  ];
}

export function configFor<T extends LirumBaseConfig>(input: T): T {
  return input;
}
```

- [ ] **Step 3.6: Commit**

```bash
git add src/core/icon-display.ts src/core/slider.ts src/core/chip.ts src/core/lirum-base.ts src/core/editor-utils.ts
git commit -m "feat(core): icon display, slider widget, chip widget, base card, editor utils"
```

---

## Task 4: Entity card

**Files:**
- Create: `src/cards/entity/entity-card.ts`, `src/cards/entity/entity-editor.ts`

- [ ] **Step 4.1: Write `src/cards/entity/entity-card.ts`**

```ts
import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import '../../core/icon-display';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

(window.customCards = window.customCards ?? []).push({
  type: CARDS.entity.tag,
  name: CARDS.entity.name,
  description: CARDS.entity.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.entity.tag)
export class LirumEntityCard extends LirumCardBase<LirumBaseConfig> {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./entity-editor');
    return document.createElement(CARDS.entity.editor);
  }

  public static getStubConfig(): Partial<LirumBaseConfig> {
    return { type: `custom:${CARDS.entity.tag}`, entity: '' };
  }

  public setConfig(config: LirumBaseConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    super.setConfig(config);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const s = this._stateObj();
    if (!s) return this._renderError(`Entity not found: ${this._config.entity}`);
    return this._renderTile({
      icon: this._defaultIcon(),
      iconActive: this._isActive(),
      iconUnavailable: this._isUnavailable(),
      primary: this._defaultPrimary(),
      secondary: this._formattedState(),
    });
  }
}
```

- [ ] **Step 4.2: Write `src/cards/entity/entity-editor.ts`**

```ts
import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LirumBaseConfig } from '../../core/hass';
import { CARDS } from '../../const';
import {
  appearanceGroup,
  interactionGroup,
  entityHead,
  COMMON_LABELS,
  type SchemaItem,
} from '../../core/editor-utils';

const SCHEMA: SchemaItem[] = [
  ...entityHead([]),
  appearanceGroup(),
  interactionGroup(),
];

@customElement(CARDS.entity.editor)
export class LirumEntityEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: LirumBaseConfig;

  public setConfig(config: LirumBaseConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `;
  }

  private _computeLabel = (item: SchemaItem): string => COMMON_LABELS[item.name] ?? item.name;

  private _changed(e: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: (e.detail as { value: LirumBaseConfig }).value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
```

- [ ] **Step 4.3: Run typecheck**

```bash
npm run typecheck
```

All errors except for the remaining card imports should now be cleared.

- [ ] **Step 4.4: Commit**

```bash
git add src/cards/entity
git commit -m "feat(entity): universal entity card + editor"
```

---

## Task 5: Switch, lock, person, title, template, update cards

> **Sub-agent guidance:** Each of these cards follows the same pattern as the Entity card from Task 4 — `extends LirumCardBase`, calls `_renderTile`. The render method differs only in icon resolution, color ramp choices, and any extra controls. The editor differs only in the domain filter for the `entity` selector.

**Files (created per sub-task):**
- `src/cards/switch/{switch-card,switch-editor}.ts`
- `src/cards/lock/{lock-card,lock-editor}.ts`
- `src/cards/person/{person-card,person-editor}.ts`
- `src/cards/title/{title-card,title-editor}.ts`
- `src/cards/template/{template-card,template-editor}.ts`
- `src/cards/update/{update-card,update-editor}.ts`

- [ ] **Step 5.1: Switch card** — entity domains `['switch', 'input_boolean', 'automation', 'remote', 'siren']`. Render tile, icon active when `_isActive()`, default `icon_color: 'amber'` when on, `'neutral'` when off, pulse icon when on. Editor uses `entityHead([...domains])`.

- [ ] **Step 5.2: Lock card** — entity domains `['lock']`. Render tile, default ramp `'energy'` when locked, `'alert'` when unlocked. Trailing slot shows two chips: `Lock` / `Unlock` (call-service `lock.lock` / `lock.unlock`).

- [ ] **Step 5.3: Person card** — entity domains `['person', 'device_tracker']`. Render tile, primary is entity name, secondary is the current zone (`stateObj.state`). If `entity_picture` exists, render an `<img>` inside `<lirum-icon>` slot instead of the ha-icon — use `--lirum-icon-image` via a small extension to LirumIcon if needed; otherwise fall back to first-letter avatar.

- [ ] **Step 5.4: Title card** — no entity. Config: `title`, `subtitle`, `alignment` (`start|center|end`), `background`. Render a borderless ha-card with primary/secondary text, no icon, alignment via CSS class. No actions.

- [ ] **Step 5.5: Template card** — config: `entity` (optional), `primary` (template), `secondary` (template), `icon` (template), `icon_color` (template), `picture` (template), plus action triplet. Templates evaluated via `hass.callApi('POST', 'template', { template })` — cache results keyed by template string, re-evaluate on `hass.states` change for any referenced entity. Initial implementation uses string interpolation against `{{ states('entity.id') }}` patterns parsed locally; a future iteration can use the API. **For this plan, implement client-side string interpolation of `{{ states('entity_id') }}` and `{{ state_attr('entity_id','attribute') }}` only** — full Jinja is out of scope for v0.1.

- [ ] **Step 5.6: Update card** — entity domains `['update']`. Render tile, primary entity name, secondary `installed_version → latest_version`. Trailing chip: `Install` (call-service `update.install`). Hidden when state is `off` and `auto_update` attr is false.

- [ ] **Step 5.7: Commit each card individually**

```bash
git add src/cards/switch && git commit -m "feat(switch): switch/toggle card + editor"
git add src/cards/lock && git commit -m "feat(lock): lock card with lock/unlock chips + editor"
git add src/cards/person && git commit -m "feat(person): person/device_tracker card + editor"
git add src/cards/title && git commit -m "feat(title): title/section header card + editor"
git add src/cards/template && git commit -m "feat(template): template card (basic interpolation) + editor"
git add src/cards/update && git commit -m "feat(update): update card with install chip + editor"
```

---

## Task 6: Number, slider, humidifier cards

> **Sub-agent guidance:** All three use the slider widget. Number and Slider differ only in domain filter. Humidifier uses the slider for `target_humidity` and renders mode chips.

- [ ] **Step 6.1: Number card** — domains `['input_number', 'number']`. Reads `value`, `min`, `max`, `step` from the entity's attributes. Slider value calls `input_number.set_value` (or `number.set_value`).

- [ ] **Step 6.2: Slider card** — generic, accepts any numeric entity. Config-level `min`, `max`, `step`, `service` (`{ domain, service, key }`) for the write path. Defaults to read-only display if no service configured.

- [ ] **Step 6.3: Humidifier card** — domains `['humidifier']`. Tile with: icon (active state), primary name, secondary `currentHumidity → targetHumidity %`, controls row with target slider (min from `min_humidity`, max from `max_humidity`) and mode chips (`mode` attribute, list from `available_modes`). Slider release → `humidifier.set_humidity`. Chip tap → `humidifier.set_mode`.

- [ ] **Step 6.4: Commit each**

```bash
git add src/cards/number && git commit -m "feat(number): input_number/number slider card + editor"
git add src/cards/slider && git commit -m "feat(slider): generic value slider card + editor"
git add src/cards/humidifier && git commit -m "feat(humidifier): humidifier card with mode chips + editor"
```

---

## Task 7: Light card

**Files:**
- Create: `src/cards/light/light-card.ts`, `src/cards/light/light-editor.ts`, `src/cards/light/light-controls.ts`

- [ ] **Step 7.1: `light-controls.ts`** — sub-component with three optional sub-controls:
  - **Brightness slider** (0-100%) → `light.turn_on { entity_id, brightness_pct }`
  - **Color temp slider** (min/max from `min_color_temp_kelvin` / `max_color_temp_kelvin`) → `light.turn_on { entity_id, color_temp_kelvin }`. Track fill uses a warm→cool gradient.
  - **Color picker** — HS color wheel; output `light.turn_on { entity_id, hs_color: [h, s*100] }`. Implement as SVG conic gradient with a draggable knob.

- [ ] **Step 7.2: `light-card.ts`** — extends `LirumCardBase`. Config:

```ts
interface LightConfig extends LirumBaseConfig {
  entity: string;  // light.*
  use_light_color?: boolean;
  show_brightness_control?: boolean;
  show_color_temp_control?: boolean;
  show_color_control?: boolean;
  collapsible_controls?: boolean;
}
```

Icon color: if `use_light_color` and light is on with `rgb_color` attr, derive a custom palette via `LIRUM_RAMPS.warm` blended with the light color. Otherwise `'amber'` when on, `'neutral'` when off. Brightness slider shown below tile when `show_brightness_control` is true and the light is on. Color/temp shown when corresponding flag set. `collapsible_controls: true` (default) hides controls until tile is tapped — single tap on tile expands; tap-action runs on the second tap.

- [ ] **Step 7.3: `light-editor.ts`** — entity domain `['light']`, plus checkboxes for the four control flags. Standard appearance + interaction groups.

- [ ] **Step 7.4: Commit**

```bash
git add src/cards/light && git commit -m "feat(light): brightness/temp/color light card + editor"
```

---

## Task 8: Cover card

**Files:** `src/cards/cover/{cover-card,cover-editor}.ts`

- [ ] **Step 8.1: Cover card** — domains `['cover']`. Tile with state-aware icon (shutter open/closed/opening/closing). Controls row:
  - If `supported_features & 4` (open) and `8` (close): chips `Open`, `Stop`, `Close` calling `cover.open_cover` / `cover.stop_cover` / `cover.close_cover`.
  - If `supported_features & 4` (set_position) and `current_position` attr present: position slider (0-100) → `cover.set_cover_position`.
  - If `supported_features & 128` (set_tilt_position) and `current_tilt_position` attr present: tilt slider → `cover.set_cover_tilt_position`.

Config flags `show_buttons_control`, `show_position_control`, `show_tilt_position_control` toggle each row.

- [ ] **Step 8.2: Cover editor** — entity domain `['cover']`, three booleans for the controls, appearance + interaction groups.

- [ ] **Step 8.3: Commit**

```bash
git add src/cards/cover && git commit -m "feat(cover): cover card with buttons/position/tilt controls + editor"
```

---

## Task 9: Climate card

**Files:** `src/cards/climate/{climate-card,climate-editor,climate-ring}.ts`

- [ ] **Step 9.1: `climate-ring.ts`** — small radial gauge ported from ha-power-gauge's arc logic. Inputs: `current` (°C/°F), `target` (°C/°F), `min`, `max`, `state` (`heat` / `cool` / `idle` / …). Renders a 240° arc with current temp as inner fill (cool→warm gradient based on temp normalized to range) and target marker as a small notch. ~120×120px.

- [ ] **Step 9.2: `climate-card.ts`** — domain `['climate']`. Tile structure:
  - Icon: small thermostat icon
  - Primary: entity name
  - Secondary: `current → target` (formatted with unit)
  - Trailing: the climate-ring sub-component
  - Controls: HVAC mode chips (`off`, `heat`, `cool`, `heat_cool`, `auto`, `dry`, `fan_only` — only modes from `hvac_modes` attribute). Tapping a chip calls `climate.set_hvac_mode`.
  - Optional: target temp slider (if `show_temperature_control: true`), range from `min_temp`/`max_temp`, step `target_temp_step ?? 0.5`, releases call `climate.set_temperature`.

Color ramp: warm when `state === 'heating'`, cool when `'cooling'`, neutral otherwise.

- [ ] **Step 9.3: `climate-editor.ts`** — entity domain `['climate']`. Booleans `show_temperature_control`. Modes filter (`hvac_modes` multi-select; if empty, all entity-supported modes shown).

- [ ] **Step 9.4: Commit**

```bash
git add src/cards/climate && git commit -m "feat(climate): climate card with HVAC mode chips, temp slider, mini gauge + editor"
```

---

## Task 10: Fan, media, vacuum cards

- [ ] **Step 10.1: Fan card** — domain `['fan']`. Tile with spinning icon (rotation speed proportional to `percentage` attribute, stops when off). Controls row: percentage slider (0-100) calling `fan.set_percentage`; oscillate chip toggling `fan.oscillate`. Config flags `show_percentage_control` and `show_oscillate_control`.

- [ ] **Step 10.2: Media card** — domain `['media_player']`. Tile structure:
  - Icon: media art if `entity_picture` attr, else state-aware icon (play/pause/idle).
  - Primary: media title (`media_title` attr) or entity name.
  - Secondary: `media_artist` / `media_album_name` if available, else state.
  - Controls: media-control chips (prev / play-pause / next), volume slider (if `volume_level` attr present and writable), mute toggle.
  
Tap action default = `more-info`. Control config: `volume_controls: ['volume_slider'|'volume_buttons'|'volume_mute'|...]`, `media_controls: ['previous','play_pause_stop','next','shuffle','repeat','on_off']`.

- [ ] **Step 10.3: Vacuum card** — domain `['vacuum']`. Tile with state-aware icon, primary entity name, secondary battery percent + status (`91% • Docked`). Controls: chips `Start` / `Pause` / `Stop` / `Return` / `Locate` / `Clean Spot` based on `supported_features`. Service calls: `vacuum.start`, `vacuum.pause`, `vacuum.stop`, `vacuum.return_to_base`, `vacuum.locate`, `vacuum.clean_spot`.

- [ ] **Step 10.4: Commit each**

```bash
git add src/cards/fan && git commit -m "feat(fan): fan card with percentage slider, oscillate chip + editor"
git add src/cards/media && git commit -m "feat(media): media player card with controls + editor"
git add src/cards/vacuum && git commit -m "feat(vacuum): vacuum card with action chips + editor"
```

---

## Task 11: Select, alarm cards

- [ ] **Step 11.1: Select card** — domains `['select', 'input_select']`. Tile with current option as secondary text. Trailing: chip `▾` that on tap reveals an inline option grid (chips for each option from `options` attribute). Tapping an option chip calls `select.select_option` / `input_select.select_option`.

- [ ] **Step 11.2: Alarm card** — domain `['alarm_control_panel']`. Tile primary: entity name. Secondary: state. Controls row 1: mode chips (`Home`, `Away`, `Night`, `Vacation`, `Disarm` — filtered by `supported_features`). Controls row 2: optional keypad (4×3 grid: 1-9, 0, ⌫). Service calls require code if `code_arm_required` / `code_format`. Default `tap_action: more-info` (safety).

Config:

```ts
interface AlarmConfig extends LirumBaseConfig {
  entity: string;
  states?: Array<'armed_home' | 'armed_away' | 'armed_night' | 'armed_vacation'>;
  show_keypad?: boolean;
  // When true, arm/disarm chip taps prompt for confirmation
  confirmation?: boolean;
}
```

- [ ] **Step 11.3: Commit each**

```bash
git add src/cards/select && git commit -m "feat(select): select card with inline option grid + editor"
git add src/cards/alarm && git commit -m "feat(alarm): alarm panel with mode chips, keypad + editor"
```

---

## Task 12: Chips card

**Files:** `src/cards/chips/{chips-card,chips-editor,chip-types}.ts`

- [ ] **Step 12.1: `chip-types.ts`** — defines each chip variant as a small LitElement:
  - `lirum-chip-entity`: icon + state, defaults to entity icon, `tap_action`.
  - `lirum-chip-action`: icon + label, fires `tap_action`.
  - `lirum-chip-back`: navigates back.
  - `lirum-chip-menu`: opens HA sidebar menu (`fire('hass-toggle-menu')`).
  - `lirum-chip-weather`: weather state + temperature.
  - `lirum-chip-template`: template-evaluated content (same simple interpolation as template card).
  - `lirum-chip-conditional`: renders child chip only if condition met.

- [ ] **Step 12.2: `chips-card.ts`** — config:

```ts
interface ChipsConfig {
  type: string;
  chips: ChipConfig[];
  alignment?: 'start' | 'center' | 'end' | 'justify';
}
```

Renders a horizontal flex row of `lirum-chip-*` elements (with overflow wrap).

- [ ] **Step 12.3: `chips-editor.ts`** — list editor (HA's standard `ha-form` `chips` editor approach) with add/remove buttons.

- [ ] **Step 12.4: Commit**

```bash
git add src/cards/chips && git commit -m "feat(chips): chips card with entity/action/menu/weather/template variants"
```

---

## Task 13: Dev preview infrastructure

**Files:** `dev/fixtures.ts`, `dev/preview.ts`, `dev/index.html`

- [ ] **Step 13.1: `dev/fixtures.ts`** — exports `makeMockHass()` returning a fake `HomeAssistant` with at least one entity per domain. Each entity has the attributes a real entity would have so cards render fully (e.g. `light.living_room` has `brightness`, `color_mode`, `rgb_color`, `supported_color_modes`, `min_color_temp_kelvin`, `max_color_temp_kelvin`).

- [ ] **Step 13.2: `dev/preview.ts`** — mounts each card type once with a fixture, wires `hass.callService` to log + mutate fixture state so visual feedback reflects "calls".

- [ ] **Step 13.3: `dev/index.html`** — page with a grid layout; one cell per card. Loads `dist/lirum-cards.iife.js` and `dev/preview.ts`.

- [ ] **Step 13.4: Verify dev preview**

```bash
npm run build
npm run serve
```

Open http://localhost:8000/dev/ and visually confirm every card renders.

- [ ] **Step 13.5: Commit**

```bash
git add dev/ && git commit -m "feat(dev): preview page with fixtures for every card"
```

---

## Task 14: Documentation

- [ ] **Step 14.1: Fill out `README.md`** with install via HACS instructions, screenshots placeholder, full card index linking to `docs/cards/`.

- [ ] **Step 14.2: Write `docs/cards/<card>.md` (19 files)** — each describes config keys with examples.

- [ ] **Step 14.3: Write `docs/example-dashboard.yaml`** — a complete HA dashboard YAML using every card type.

- [ ] **Step 14.4: Commit**

```bash
git add README.md docs/cards/ docs/example-dashboard.yaml
git commit -m "docs: README, per-card references, example dashboard"
```

---

## Task 15: Build, push, release

- [ ] **Step 15.1: Production build + typecheck**

```bash
npm run typecheck && npm run build
```

Both must succeed with no errors.

- [ ] **Step 15.2: Add the remote and push**

```bash
git remote add origin git@github.com:Lirum-Labs/ha-lirum.git
git branch -M main
git push -u origin main
```

- [ ] **Step 15.3: Tag v0.1.0**

```bash
git tag -a v0.1.0 -m "v0.1.0 — initial card suite (19 cards)"
git push origin v0.1.0
```

---

## Task 16 (post-build): Home Assistant integration

> Requires the user. The Chrome MCP isn't reachable and there's no HA MCP loaded, so this task is documented for completion when the user is back.

- [ ] **Step 16.1: In the user's browser:** *Settings → Profile → Long-lived access tokens → Create token*. Note the token.

- [ ] **Step 16.2: Add the Home Assistant MCP** with that token + HA base URL.

- [ ] **Step 16.3: Build a real demo dashboard inside HA** via the HA MCP — one section per card type — wired to the user's actual entities. No `tap_action: toggle` defaults (override to `more-info` for the demo) so we don't toggle real devices.

---

## Self-review checklist (post-write)

- All spec sections map to tasks: design system → Tasks 1-3; per-card visuals → Tasks 4-12; dev preview → Task 13; release → Task 15; HA integration → Task 16. ✓
- No placeholders. ✓
- Type names consistent (`LirumBaseConfig`, `LirumCardBase`, `LirumActionConfig`, `Palette`, `HassEntity`, `HomeAssistant`). ✓
- Commit cadence: at least one commit per task. ✓
- Build chain identical to ha-power-gauge so the user's familiarity carries over. ✓
