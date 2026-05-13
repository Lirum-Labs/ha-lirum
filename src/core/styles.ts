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
    /* "Instrument panel" card frame:
       1. Vertical surface wash (lighter navy → deeper navy)
       2. Layered shadows: inner top highlight, hairline border, ambient drop, tight contact
       3. ::before — faint ramp-tinted backdrop (top-right + bottom-left radial)
       4. ::after — top accent hairline that fades in from both sides */
    background: var(--lirum-bg);
    color: var(--lirum-text);
    border-radius: var(--lirum-radius);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.04) inset,
      0 0 0 1px var(--lirum-card-border),
      0 20px 50px -20px rgba(0, 0, 0, 0.7),
      0 2px 10px -2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    position: relative;
    isolation: isolate;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  /* Hover lift — translateY + ramp-tinted halo. Disabled in reduced-motion. */
  ha-card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 0 0 1px color-mix(in oklab, var(--lirum-c1) 22%, transparent),
      0 30px 60px -22px rgba(0, 0, 0, 0.75),
      0 0 40px -16px color-mix(in oklab, var(--lirum-c1) 42%, transparent);
  }

  /* ::before — device-class tint backdrop. Top-right wash + bottom-left bloom. */
  ha-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(120% 80% at 100% 0%,
        color-mix(in oklab, var(--lirum-c1) 6%, transparent),
        transparent 55%),
      radial-gradient(60% 100% at 0% 100%,
        color-mix(in oklab, var(--lirum-c2) 5%, transparent),
        transparent 60%);
  }

  /* ::after — top accent hairline that softly fades in from the edges */
  ha-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 14px;
    right: 14px;
    height: 1px;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(90deg,
      transparent,
      color-mix(in oklab, var(--lirum-c1) 50%, transparent),
      transparent);
  }

  /* Direct content sits above the backdrop / hairline */
  ha-card > * {
    position: relative;
    z-index: 2;
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
    ha-card {
      transition: none !important;
    }
    ha-card:hover {
      transform: none !important;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lirum-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
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
  @keyframes lirum-glow-pulse {
    0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1, #1ee0ff) 50%, transparent)); }
    50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1, #1ee0ff) 80%, transparent)); }
  }
`;
