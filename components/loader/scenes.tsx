/**
 * OneSpheree — cinematic logo reveal scenes (1920×1080).
 * Ported VERBATIM from fable-loader/reveal-scenes.jsx: same constants, same
 * formulas, same inline styles. Only the module plumbing changed (imports
 * instead of window globals, next/font for Manrope, /loader/ asset paths).
 * Scenes receive { localTime, progress } exactly as the Fable runtime passed
 * them (localTime = seconds since scene start, progress = localTime / dur).
 */
import type { ReactNode } from 'react';
import { Easing, NestedSphere, AssemblyLayer } from './engine';
import { LOGO_AR } from './logo-points';
import { manrope } from './fonts';

/** Self-hosted Manrope (next/font) — the same family the export loaded from Google Fonts. */
const MANROPE = `${manrope.style.fontFamily}, sans-serif`;

const RV = { W: 1920, H: 1080, CX: 960, LW: 780, LCY: 490, LH: 0 };
RV.LH = RV.LW / (LOGO_AR || 1.4027);
const hash = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};
const cl01 = (v: number) => Math.max(0, Math.min(1, v));
export const LOGO = '/loader/onespheree-logo.png';
const LBOX = { x: RV.CX - RV.LW / 2, y: RV.LCY - RV.LH / 2, w: RV.LW, h: RV.LH };

export interface SceneProps {
  localTime: number;
  progress: number;
}

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(120% 90% at 50% 40%, #0b1424 0%, #060b15 48%, #02040a 100%)',
        overflow: 'hidden',
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(80% 62% at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function Dust({ t, fade, seed = 0, n = 54 }: { t: number; fade: number; seed?: number; n?: number }) {
  const els = [];
  for (let i = 0; i < n; i++) {
    const x = hash(i + seed) * RV.W,
      y = hash(i + seed + 100) * RV.H;
    const dx = Math.sin(t * (0.25 + hash(i + seed + 200) * 0.4) + hash(i + seed + 300) * 6.28) * 26;
    const dy = Math.cos(t * (0.2 + hash(i + seed + 400) * 0.35) + hash(i + seed + 500) * 6.28) * 18;
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.4 + i * 1.7));
    const s = 1.4 + hash(i + seed + 600) * 2.2;
    els.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x + dx,
          top: y + dy,
          width: s,
          height: s,
          borderRadius: '50%',
          background: '#bcd8ff',
          opacity: fade * tw * 0.5,
          boxShadow: `0 0 ${4 + s * 2}px rgba(130,180,255,0.8)`,
        }}
      />
    );
  }
  return <>{els}</>;
}

/* soft backing pool so the navy logo reads on the dark stage */
function LogoGlow({ o = 1, pulse = 0 }: { o?: number; pulse?: number }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 960 - 620,
          top: RV.LCY - 440,
          width: 1240,
          height: 880,
          opacity: o * (0.85 + pulse),
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(190,216,246,0.2) 0%, rgba(110,160,235,0.08) 48%, transparent 72%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 960 - 430,
          top: RV.LCY - 300,
          width: 860,
          height: 600,
          opacity: o,
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(225,238,252,0.16) 0%, transparent 65%)',
        }}
      />
    </>
  );
}

/* ── Scene 1: Emergence — particles + light trails converging ─────────────── */
const TRAILS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 + hash(i + 9) * 0.5;
  const sx = 960 + Math.cos(a) * 1150,
    sy = 540 + Math.sin(a) * 700;
  const ex = 960 + Math.cos(a + 2.2) * 90,
    ey = 540 + Math.sin(a + 2.2) * 58;
  const mx = (sx + ex) / 2 + Math.cos(a + 1.2) * 280,
    my = (sy + ey) / 2 + Math.sin(a + 1.2) * 210;
  return { d: `M ${sx.toFixed(0)} ${sy.toFixed(0)} Q ${mx.toFixed(0)} ${my.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}`, ph: hash(i + 33) };
});

export function Emergence({ localTime, progress }: SceneProps) {
  const fade = cl01(progress / 0.25);
  const coreO = cl01((progress - 0.55) / 0.4);
  const trailFade = 1 - cl01((progress - 0.84) / 0.16);
  return (
    <Backdrop>
      <Dust t={localTime} fade={fade} />
      <svg width={RV.W} height={RV.H} style={{ position: 'absolute', inset: 0 }}>
        {TRAILS.map((tr, i) => {
          const tt = cl01((progress - 0.16 - tr.ph * 0.24) / 0.55);
          if (tt <= 0) return null;
          const head = tt,
            tail = Math.max(0, tt - 0.32);
          return (
            <path
              key={i}
              d={tr.d}
              pathLength={1}
              fill="none"
              stroke={i % 2 ? '#8fc2ff' : '#5ea6f2'}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeDasharray={`${Math.max(0.001, head - tail)} 2`}
              strokeDashoffset={-tail}
              opacity={fade * trailFade * (0.5 + 0.4 * hash(i + 77))}
              style={{ filter: 'drop-shadow(0 0 6px rgba(110,170,255,0.9))' }}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 960 - 130,
          top: 540 - 130,
          width: 260,
          height: 260,
          borderRadius: '50%',
          opacity: coreO,
          background:
            'radial-gradient(circle, rgba(220,238,255,0.95) 0%, rgba(120,180,255,0.5) 30%, rgba(60,120,230,0.18) 58%, transparent 75%)',
        }}
      />
    </Backdrop>
  );
}

/* ── Scene 2: nested wireframe spheres, neural pulses, floating fragments ── */
export function SphereScene({ localTime, progress }: SceneProps) {
  const grow = cl01(progress / 0.32);
  const drift = Math.sin(localTime * 0.7) * 10;
  return (
    <Backdrop>
      <Dust t={localTime + 2} fade={0.45} />
      <div
        style={{
          position: 'absolute',
          left: 960 - 130,
          top: 540 - 130,
          width: 260,
          height: 260,
          borderRadius: '50%',
          opacity: 1 - Easing.easeOutCubic(grow) * 0.75,
          background:
            'radial-gradient(circle, rgba(220,238,255,0.95) 0%, rgba(120,180,255,0.5) 30%, rgba(60,120,230,0.18) 58%, transparent 75%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 960 - 580,
          top: 540 - 580,
          width: 1160,
          height: 1160,
          borderRadius: '50%',
          opacity: Easing.easeOutCubic(grow) * 0.85,
          background: 'radial-gradient(circle, rgba(70,130,235,0.2) 0%, rgba(70,130,235,0.07) 45%, transparent 70%)',
        }}
      />
      <svg
        width={RV.W}
        height={RV.H}
        style={{ position: 'absolute', inset: 0, transform: `translateY(${drift * (1 - Math.abs(progress * 2 - 1))}px)` }}
      >
        <NestedSphere t={localTime} R={340} grow={grow} />
      </svg>
    </Backdrop>
  );
}

/* ── Scene 3: 2,600 particles emerge from the sphere and assemble the logo ─ */
export function AssemblyScene({ localTime, progress }: SceneProps) {
  const sphereFade = 1 - cl01(progress / 0.3);
  const glowO = cl01((progress - 0.5) / 0.5);
  return (
    <Backdrop>
      <Dust t={localTime + 5} fade={0.45} />
      {sphereFade > 0.001 && (
        <svg width={RV.W} height={RV.H} style={{ position: 'absolute', inset: 0 }}>
          <NestedSphere t={localTime + 2.4} R={340} grow={1} opacity={sphereFade} pulses={false} />
        </svg>
      )}
      <LogoGlow o={glowO} />
      <AssemblyLayer progress={progress} mode="sphere" box={LBOX} logoSrc={LOGO} />
    </Backdrop>
  );
}

/* ── Scene 4: glow, light sweep, reflection, taglines ─────────────────────── */
export function RevealScene({ localTime, progress }: SceneProps) {
  const L = LBOX;
  const sw = cl01((progress - 0.08) / 0.26);
  const sweepPos = 130 - 190 * Easing.easeInOutCubic(sw);
  const sweepO = Math.sin(Math.PI * sw) * 0.9;
  const o1 = Easing.easeOutCubic(cl01((progress - 0.26) / 0.13));
  const o2 = Easing.easeOutCubic(cl01((progress - 0.46) / 0.13));
  const flareX = L.x + (0.1 + 0.8 * Easing.easeInOutCubic(sw)) * L.w;
  return (
    <Backdrop>
      <Dust t={localTime + 8} fade={0.45} />
      <LogoGlow o={1} pulse={0.12 * Math.sin(localTime * 1.8)} />
      {/* eslint-disable-next-line @next/next/no-img-element -- verbatim loader frame in the fixed 1920×1080 stage */}
      <img src={LOGO} alt="OneSpheree" style={{ position: 'absolute', left: L.x, top: L.y, width: L.w, height: L.h }} />
      {/* eslint-disable-next-line @next/next/no-img-element -- reflection copy of the same asset */}
      <img
        src={LOGO}
        alt=""
        style={{
          position: 'absolute',
          left: L.x,
          top: L.y + L.h + 4,
          width: L.w,
          height: L.h,
          transform: 'scaleY(-1)',
          opacity: 0.14,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: L.x,
          top: L.y,
          width: L.w,
          height: L.h,
          opacity: sweepO,
          mixBlendMode: 'screen',
          background: 'linear-gradient(105deg, transparent 42%, rgba(235,245,255,0.95) 50%, transparent 58%)',
          backgroundSize: '260% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: `${sweepPos}%`,
          WebkitMaskImage: `url("${LOGO}")`,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: `url("${LOGO}")`,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: flareX - 200,
          top: RV.LCY - 3,
          width: 400,
          height: 6,
          opacity: sweepO * 0.5,
          mixBlendMode: 'screen',
          background: 'linear-gradient(90deg, transparent, rgba(210,232,255,0.9), transparent)',
          filter: 'blur(2px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 856 + (1 - o1) * 16,
          textAlign: 'center',
          opacity: o1,
          fontFamily: MANROPE,
          fontSize: 40,
          fontWeight: 300,
          color: '#e8f0fa',
          letterSpacing: '0.06em',
        }}
      >
        Connecting Businesses. Creating Opportunities.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 932 + (1 - o2) * 12,
          textAlign: 'center',
          opacity: o2,
          fontFamily: MANROPE,
          fontSize: 24,
          fontWeight: 500,
          color: '#8fb0d8',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}
      >
        Your Growth. Our Mission.
      </div>
    </Backdrop>
  );
}
