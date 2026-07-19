'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLenis } from '@/providers/SmoothScrollProvider';
import { Emergence, SphereScene, AssemblyScene, RevealScene, type SceneProps } from './scenes';

/**
 * The OneSpheree launch loader — the exported Fable "Logo Reveal" piece,
 * playing ONCE over the homepage. The scene choreography is the export's,
 * untouched (see ./scenes.tsx, ./engine.tsx); this component replaces only the
 * Fable editor runtime (Stage / SceneSwitch / tweaks panel) with a minimal
 * play-once clock that matches its contract exactly:
 *
 *   scenes: Emergence 2s → Sphere 2.4s → Assembly 2.6s → Reveal 3s (cut
 *   transitions); each scene receives { localTime: seconds since scene start,
 *   progress: localTime / dur }; the 1920×1080 stage is contain-scaled and
 *   centered on a #02040a backdrop (the export's letterbox presentation).
 *
 * Integration behavior:
 * - plays once per browser session (sessionStorage guard, decided in a
 *   layout effect — before paint, so a repeat visit never flashes the veil);
 * - reduced motion skips it entirely;
 * - scroll is locked while playing (Lenis stop + key blocker — no
 *   overflow:hidden, so the scrollbar never jumps and ScrollTrigger
 *   measurements stay valid);
 * - the homepage renders and settles BENEATH the fixed overlay while the
 *   piece plays, so the reveal's final dark frame simply lifts into the dark
 *   hero — no second logo moment, no layout shift;
 * - rAF, timers and listeners are all cleaned up on completion/unmount.
 */

const SCENES: { dur: number; Comp: (p: SceneProps) => React.ReactElement }[] = [
  { dur: 2, Comp: Emergence },
  { dur: 2.4, Comp: SphereScene },
  { dur: 2.6, Comp: AssemblyScene },
  { dur: 3, Comp: RevealScene },
];
const TOTAL = SCENES.reduce((s, x) => s + x.dur, 0); // 10s
const HOLD_MS = 450; // rest on the final frame before the veil lifts
const FADE_MS = 900; // veil fade into the homepage
const STORAGE_KEY = 'os-loader-played';
/** Keys that would scroll the page natively while Lenis is stopped. */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space', ' ']);

type Phase = 'boot' | 'play' | 'exit' | 'done';

/**
 * The scene Backdrop's exact gradients as a static frame. Rendered during
 * 'boot' (SSR + first client render) so the server markup contains only
 * stable strings — the animated scenes carry float-precision inline styles
 * that would trip hydration comparison. At t=0 every animated element is at
 * opacity 0, so this IS the first frame, pixel for pixel.
 * Exported for app/loading.tsx: the route-loading fallback shows this same
 * frame, so the compile/stream window IS the loader's opening frame.
 */
export function BootFrame() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(120% 90% at 50% 40%, #0b1424 0%, #060b15 48%, #02040a 100%)',
        overflow: 'hidden',
      }}
    >
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

export function FableLoader() {
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>('boot');
  const [time, setTime] = useState(0);
  const scaleRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>('boot');
  phaseRef.current = phase;

  // Decide before first paint: skip (already played / reduced motion) or play.
  // DEV: the session guard is bypassed so the loader plays on every refresh
  // while iterating; production keeps the play-once-per-session behavior.
  useLayoutEffect(() => {
    let skip = false;
    if (process.env.NODE_ENV === 'production') {
      try {
        skip = sessionStorage.getItem(STORAGE_KEY) === '1';
      } catch {}
    }
    if (skip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
    } else {
      setPhase('play');
    }
  }, []);

  // Contain-fit the 1920×1080 stage (the export's presentation), pre-paint.
  useLayoutEffect(() => {
    if (phase === 'done') return;
    const fit = () => {
      const el = scaleRef.current;
      if (!el) return;
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      el.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [phase]);

  // Scroll lock while the piece plays: Lenis owns wheel/touch; block the
  // native scroll keys too. Restored on exit and (safety) on unmount.
  useEffect(() => {
    if (phase !== 'play') return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key) || SCROLL_KEYS.has(e.code)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
    };
  }, [phase, lenis]);

  // The play-once clock. Same rAF integration as the export's engine, with a
  // dt clamp so a backgrounded tab resumes instead of jumping to the end.
  // The elapsed clock lives in a local — the state setter stays PURE (no
  // scheduling inside the updater: StrictMode double-invokes updaters, and a
  // rAF scheduled there forks a new chain every frame).
  useEffect(() => {
    if (phase !== 'play') return;
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let last: number | null = null;
    let clock = 0;
    const step = (ts: number) => {
      if (last == null) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.1);
      last = ts;
      clock = Math.min(clock + dt, TOTAL);
      setTime(clock);
      if (clock >= TOTAL) {
        // parked on the last frame — mark played, rest, then lift the veil
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {}
        holdTimer = setTimeout(() => setPhase('exit'), HOLD_MS);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [phase]);

  // Exit: the veil fades over the settled homepage, then everything unmounts.
  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => setPhase('done'), FADE_MS + 60);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'done') return null;

  // Active scene — the export's cut-transition mapping, verbatim semantics
  // (t === TOTAL parks on the last scene's final frame).
  const starts = [0];
  for (let i = 0; i < SCENES.length; i++) starts.push(starts[i] + SCENES[i].dur);
  let idx = SCENES.length - 1;
  for (let j = 0; j < SCENES.length; j++) {
    if (time < starts[j + 1]) {
      idx = j;
      break;
    }
  }
  const wallTime = Math.min(Math.max(time - starts[idx], 0), SCENES[idx].dur);
  const Scene = SCENES[idx].Comp;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600, // above every app layer (toasts top out at 500)
        background: '#02040a',
        overflow: 'hidden',
        opacity: phase === 'exit' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(.4,0,.2,1)`,
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      <div
        ref={scaleRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1920,
          height: 1080,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {phase === 'boot' ? <BootFrame /> : <Scene localTime={wallTime} progress={wallTime / SCENES[idx].dur} />}
      </div>
    </div>
  );
}
