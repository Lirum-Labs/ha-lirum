export interface Palette {
  c1: string;
  c2: string;
  c3: string;
}

/**
 * Named color ramps. Each ramp has three stops used together to render the
 * instrument-panel glow:
 *
 *   c1 — brightest    (icon, tip dot, hover halo, sparkline endpoint)
 *   c2 — mid          (gradient mid-stop on sparkline strokes, slider fill)
 *   c3 — deepest      (gradient start stop on sparkline strokes, deep shadow)
 *
 * The ramps below were tuned in Claude design to read clearly against the
 * dark Lirum surface — saturated enough that the tinted backdrop is visible
 * but not so saturated that the value typography gets fought.
 */
export const LIRUM_RAMPS: Record<string, Palette> = {
  cool:    { c1: '#1ee0ff', c2: '#2a7bff', c3: '#0a3aa0' },
  warm:    { c1: '#ff8a3d', c2: '#ff6b1c', c3: '#c44a05' },
  energy:  { c1: '#3df0a8', c2: '#16c47e', c3: '#0a7d4f' },
  alert:   { c1: '#ff5670', c2: '#e11d48', c3: '#7a0a1f' },
  rose:    { c1: '#ff9ae0', c2: '#ec4899', c3: '#831843' },
  amber:   { c1: '#ffc83d', c2: '#f59e0b', c3: '#b45309' },
  neutral: { c1: '#94a3b8', c2: '#64748b', c3: '#1e293b' },
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

/**
 * Emit the `--lirum-c1/c2/c3` CSS variables for a card frame so the shared
 * `ha-card` styling (`::before` tint, hover halo, hairline) follows the
 * active color ramp. Cards call this in addition to `backgroundVars()` to
 * make the ENTIRE card surface respond to the active device-class.
 */
export function rampVars(name: string | undefined): Record<string, string> {
  const p = rampOf(name);
  return {
    '--lirum-c1': p.c1,
    '--lirum-c2': p.c2,
    '--lirum-c3': p.c3,
  };
}
