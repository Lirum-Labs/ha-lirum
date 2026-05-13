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
