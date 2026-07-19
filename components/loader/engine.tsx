/**
 * OneSpheree loader engine — ported VERBATIM from fable-loader/assembly-core.jsx
 * (+ the Easing subset the scenes use, from fable-loader/animations-v2.jsx).
 * Window globals became imports; every constant, formula and style is unchanged
 * so the animation renders exactly as the export. Do not "improve" the math.
 *
 * Cheap at high counts: geometry is concatenated into a handful of <path>
 * "dot/line batches", so thousands of particles cost ~12 DOM nodes.
 */
import { LOGO_POINTS, LOGO_CLUSTERS } from './logo-points';

/* ── Easing (hand-rolled, Popmotion-style) — verbatim subset ─────────────── */
export const Easing = {
  linear: (t: number) => t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
};

export const osHash = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};
export const osCl = (v: number) => Math.max(0, Math.min(1, v));

type P3 = [number, number, number];

const __shellCache: Record<string, { pts: P3[]; edges: [number, number][] }> = {};
export function shellGeom(n: number, link: number) {
  const key = n + '-' + link;
  if (__shellCache[key]) return __shellCache[key];
  const pts: P3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.39996;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  const edges: [number, number][] = [];
  const l2 = link * link;
  for (let i = 0; i < n; i++) {
    let c = 0;
    for (let j = i + 1; j < n && c < 3; j++) {
      const dx = pts[i][0] - pts[j][0],
        dy = pts[i][1] - pts[j][1],
        dz = pts[i][2] - pts[j][2];
      if (dx * dx + dy * dy + dz * dz < l2) {
        edges.push([i, j]);
        c++;
      }
    }
  }
  return (__shellCache[key] = { pts, edges });
}

export function osProj(p: P3, rotY: number, rotX: number, rad: number, cx: number, cy: number): P3 {
  const [x, y, z] = p;
  const x1 = x * Math.cos(rotY) + z * Math.sin(rotY),
    z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX),
    z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const pers = 3.1 / (3.1 - z2);
  return [cx + x1 * rad * pers, cy + y1 * rad * pers, z2];
}

const OS_SHELLS = [
  { n: 240, rad: 1.0, speed: 0.3, dir: 1, tilt: -0.32, link: 0.3, color: '#3f87d6', nodeC: '#9cc6ff', op: 1 },
  { n: 150, rad: 0.74, speed: 0.46, dir: -1, tilt: 0.22, link: 0.4, color: '#1c5fa8', nodeC: '#6aa8e8', op: 0.8 },
  { n: 90, rad: 0.47, speed: 0.66, dir: 1, tilt: -0.1, link: 0.52, color: '#5ea6f2', nodeC: '#cfe4ff', op: 0.9 },
];
const OS_FRAGS = Array.from({ length: 14 }, (_, i) => ({
  orbit: 1.18 + osHash(i + 3) * 0.5,
  spd: (0.12 + osHash(i + 7) * 0.2) * (i % 2 ? 1 : -1),
  ph: osHash(i + 11) * 6.28,
  elev: (osHash(i + 15) - 0.5) * 1.2,
  s: 7 + osHash(i + 19) * 13,
  rot: osHash(i + 23) * 360,
}));

/** NestedSphere — returns an SVG <g>. t: seconds-like clock; R: outer radius px; grow 0..1. */
export function NestedSphere({
  t,
  cx = 960,
  cy = 540,
  R = 340,
  grow = 1,
  opacity = 1,
  frags = true,
  pulses = true,
}: {
  t: number;
  cx?: number;
  cy?: number;
  R?: number;
  grow?: number;
  opacity?: number;
  frags?: boolean;
  pulses?: boolean;
}) {
  const g = Easing.easeOutCubic(osCl(grow));
  const out: React.ReactNode[] = [];
  OS_SHELLS.forEach((sh, si) => {
    const geom = shellGeom(sh.n, sh.link);
    const rad = (12 + (R - 12) * g) * sh.rad;
    const rotY = 0.6 + t * sh.speed * sh.dir + si * 1.3;
    const pr = geom.pts.map((p) => osProj(p, rotY, sh.tilt, rad, cx, cy));
    let backE = '',
      frontE = '',
      backD = '',
      frontD = '';
    geom.edges.forEach(([a, b]) => {
      const z = (pr[a][2] + pr[b][2]) / 2;
      const seg = `M${pr[a][0].toFixed(1)} ${pr[a][1].toFixed(1)}L${pr[b][0].toFixed(1)} ${pr[b][1].toFixed(1)}`;
      if (z > 0) frontE += seg;
      else backE += seg;
    });
    pr.forEach((p) => {
      const d = `M${p[0].toFixed(1)} ${p[1].toFixed(1)}h.1`;
      if (p[2] > 0) frontD += d;
      else backD += d;
    });
    out.push(
      <g key={si} opacity={opacity * sh.op * g}>
        <path d={backE} stroke={sh.color} strokeWidth={0.7} fill="none" opacity={0.1} />
        <path d={frontE} stroke={sh.color} strokeWidth={1} fill="none" opacity={0.3} />
        <path d={backD} stroke={sh.nodeC} strokeWidth={1.7} strokeLinecap="round" fill="none" opacity={0.3} />
        <path d={frontD} stroke={sh.nodeC} strokeWidth={2.6} strokeLinecap="round" fill="none" opacity={0.85} />
      </g>
    );
    if (pulses && si === 0) {
      let pd = '';
      for (let k = 0; k < 40; k++) {
        const e = geom.edges[(k * 7) % geom.edges.length];
        const u = (t * (0.35 + osHash(k) * 0.3) + osHash(k + 40)) % 1;
        const x = pr[e[0]][0] + (pr[e[1]][0] - pr[e[0]][0]) * u,
          y = pr[e[0]][1] + (pr[e[1]][1] - pr[e[0]][1]) * u;
        const z = pr[e[0]][2] + (pr[e[1]][2] - pr[e[0]][2]) * u;
        if (z > -0.2) pd += `M${x.toFixed(1)} ${y.toFixed(1)}h.1`;
      }
      out.push(
        <path
          key="pulses"
          d={pd}
          stroke="#eaf4ff"
          strokeWidth={3.4}
          strokeLinecap="round"
          fill="none"
          opacity={opacity * g * 0.9}
          style={{ filter: 'drop-shadow(0 0 5px rgba(170,215,255,0.9))' }}
        />
      );
    }
  });
  if (frags) {
    OS_FRAGS.forEach((f, i) => {
      const a = t * f.spd + f.ph;
      const p = osProj(
        [Math.cos(a) * Math.cos(f.elev), Math.sin(f.elev), Math.sin(a) * Math.cos(f.elev)],
        0,
        -0.28,
        R * f.orbit * (0.6 + 0.4 * g),
        cx,
        cy
      );
      const dp = (p[2] + 1) / 2;
      out.push(
        <polygon
          key={'f' + i}
          points={`0,${-f.s / 2} ${f.s / 2},${f.s / 2} ${-f.s / 2},${f.s / 2}`}
          fill="none"
          stroke="#7db8f0"
          strokeWidth={1}
          opacity={opacity * g * (0.1 + 0.28 * dp)}
          transform={`translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${(f.rot + t * 30 * f.spd * 8).toFixed(1)}) scale(${0.6 + dp * 0.6})`}
        />
      );
    });
  }
  return <g>{out}</g>;
}

/* ── AssemblyLayer — 2,600 particles flying from the sphere into the logo ── */
const SPARK = [168, 205, 255];
const SIZES = [1.5, 2.3, 3.3];
const __asmCache: Record<string, { starts: P3[]; meta: { st: number; sz: number; arc: number }[] }> = {};
function asmData(mode: string) {
  if (__asmCache[mode]) return __asmCache[mode];
  const N = LOGO_POINTS.length;
  const starts: P3[] = new Array(N),
    meta = new Array(N);
  const geom = shellGeom(240, 0.3);
  for (let j = 0; j < N; j++) {
    if (mode === 'sphere') {
      const f = geom.pts[j % 240];
      const jx = (osHash(j + 701) - 0.5) * 0.2,
        jy = (osHash(j + 702) - 0.5) * 0.2,
        jz = (osHash(j + 703) - 0.5) * 0.2;
      const sh = j % 3 === 0 ? 1 : j % 3 === 1 ? 0.74 : 0.47;
      starts[j] = osProj([f[0] * sh + jx, f[1] * sh + jy, f[2] * sh + jz], 1.75, -0.32, 340, 960, 540);
    } else {
      const a = osHash(j + 801) * 6.2832,
        r = 30 + Math.pow(osHash(j + 802), 1.6) * 320;
      starts[j] = [960 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.72, 0.5];
    }
    meta[j] = { st: osHash(j) * 0.34, sz: j % 3, arc: (osHash(j + 1) - 0.5) * 190 };
  }
  return (__asmCache[mode] = { starts, meta });
}

export function AssemblyLayer({
  progress,
  mode = 'sphere',
  box,
  logoSrc,
}: {
  progress: number;
  mode?: string;
  box: { x: number; y: number; w: number; h: number };
  logoSrc: string;
}) {
  const pts = LOGO_POINTS,
    cls = LOGO_CLUSTERS;
  const { starts, meta } = asmData(mode);
  const logoO = osCl((progress - 0.84) / 0.14);
  const partO = 1 - osCl((progress - 0.86) / 0.12);
  const phase = Easing.easeInOutCubic(osCl((progress - 0.18) / 0.5));
  const buckets: Record<number, string> = {};
  if (partO > 0.001) {
    for (let j = 0; j < pts.length; j++) {
      const m = meta[j];
      const T = osCl((progress - m.st) / 0.58);
      const e = Easing.easeInOutQuart(T);
      const st = starts[j];
      const tx = box.x + pts[j][0] * box.w,
        ty = box.y + pts[j][1] * box.h;
      // quadratic bezier for a curved, weightless flight
      const mx = (st[0] + tx) / 2 + m.arc * 0.55,
        my = (st[1] + ty) / 2 + m.arc;
      const om = 1 - e;
      const x = om * om * st[0] + 2 * om * e * mx + e * e * tx;
      const y = om * om * st[1] + 2 * om * e * my + e * e * ty;
      const key = pts[j][2] * 3 + m.sz;
      buckets[key] = (buckets[key] || '') + `M${x.toFixed(1)} ${y.toFixed(1)}h.1`;
    }
  }
  return (
    <>
      {partO > 0.001 && (
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          {Object.keys(buckets).map((k) => {
            const ki = Number(k);
            const ci = Math.floor(ki / 3),
              sz = ki % 3;
            const cc = cls[ci];
            const r = Math.round(SPARK[0] + (cc[0] - SPARK[0]) * phase),
              g = Math.round(SPARK[1] + (cc[1] - SPARK[1]) * phase),
              b = Math.round(SPARK[2] + (cc[2] - SPARK[2]) * phase);
            return (
              <path
                key={k}
                d={buckets[ki]}
                stroke={`rgb(${r},${g},${b})`}
                strokeWidth={SIZES[sz]}
                strokeLinecap="round"
                fill="none"
                opacity={partO * (0.55 + 0.15 * sz)}
              />
            );
          })}
        </svg>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- verbatim loader frame, sized by the fixed 1920×1080 stage */}
      <img
        src={logoSrc}
        alt="OneSpheree"
        style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, opacity: logoO }}
      />
    </>
  );
}
