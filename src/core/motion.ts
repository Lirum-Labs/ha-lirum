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
