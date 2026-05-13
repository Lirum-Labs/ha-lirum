export interface Palette {
  c1: string;
  c2: string;
  c3: string;
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
