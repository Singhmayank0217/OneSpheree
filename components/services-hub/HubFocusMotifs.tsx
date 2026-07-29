'use client';
import { type ComponentType } from 'react';
import gsap from 'gsap';
import { useGroupMotion } from './HubBeyondIllustrations';
import type { HubFocusMotif } from '@/types/services-hub';

/**
 * Compact motifs for the focused practices. These sit inside their category
 * panel rather than beside it, so they are square and read at ~110px: one
 * clear idea each, drawn in the hub's orange, with an entrance on arrival and
 * a small ambient loop that pauses off screen (same contract as the big
 * Beyond Services illustrations).
 */

const VIEW = '0 0 120 120';
const STRUCT = 'rgba(255,255,255,.14)';

/* ── 05 · Global Business — trade in both directions ────────────────────── */
function TradeMotif() {
  const ref = useGroupMotion((enter, ambient, root) => {
    gsap.set('[data-globe]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-meridian]', { strokeDashoffset: 100 });
    gsap.set('[data-route]', { strokeDashoffset: 100 });
    gsap.set('[data-ship]', { opacity: 0 });

    enter
      .to('[data-globe]', { scale: 1, duration: 0.6, ease: 'back.out(1.8)' }, 0)
      .to('[data-meridian]', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.25)
      .to('[data-route]', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.14 }, 0.5);

    Array.from(root.querySelectorAll<SVGElement>('[data-ship]')).forEach((ship, i) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: i * 1.3 });
      t.fromTo(ship, { strokeDashoffset: 108 }, { strokeDashoffset: 0, duration: 2.1, ease: 'none' }, 0)
        .fromTo(ship, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
        .to(ship, { opacity: 0, duration: 0.35 }, 1.75);
      ambient.add(t, 0);
    });
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <g data-globe="">
        <circle cx="60" cy="64" r="28" fill="color-mix(in srgb, var(--violet-500) 14%, transparent)" stroke="var(--violet-400)" strokeOpacity=".6" />
        <path data-meridian="" d="M60 36a14 28 0 000 56a14 28 0 000-56" stroke="var(--violet-300)" strokeOpacity=".55" pathLength={100} strokeDasharray="100" />
        <path data-meridian="" d="M32 64h56" stroke="var(--violet-300)" strokeOpacity=".55" pathLength={100} strokeDasharray="100" />
        <path data-meridian="" d="M37 50h46M37 78h46" stroke="var(--violet-300)" strokeOpacity=".3" pathLength={100} strokeDasharray="100" />
      </g>

      {/* outbound and inbound trade routes */}
      <path data-route="" d="M22 34C44 16 82 18 100 32" stroke="var(--violet-400)" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" pathLength={100} strokeDasharray="100" />
      <path data-route="" d="M100 98C78 112 40 110 22 96" stroke="var(--violet-400)" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" pathLength={100} strokeDasharray="100" />
      <path data-ship="" d="M22 34C44 16 82 18 100 32" stroke="var(--violet-300)" strokeWidth="3.2" strokeLinecap="round" pathLength={100} strokeDasharray="8 100" strokeDashoffset={108} opacity="0" />
      <path data-ship="" d="M100 98C78 112 40 110 22 96" stroke="var(--violet-300)" strokeWidth="3.2" strokeLinecap="round" pathLength={100} strokeDasharray="8 100" strokeDashoffset={108} opacity="0" />

      <path d="M96 26l6 6-6 6" stroke="var(--violet-300)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 90l-6 6 6 6" stroke="var(--violet-300)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── 06 · Learning & Development — capability climbs ────────────────────── */
const STEPS = [
  { x: 22, y: 80, h: 26 },
  { x: 48, y: 64, h: 42 },
  { x: 74, y: 48, h: 58 },
];

function LearningMotif() {
  const ref = useGroupMotion((enter, ambient) => {
    gsap.set('[data-ladder]', { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set('[data-cap]', { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-learner]', { opacity: 0 });

    enter
      .to('[data-ladder]', { scaleY: 1, duration: 0.55, ease: 'power3.out', stagger: 0.12 }, 0)
      .to('[data-cap]', { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.2)' }, 0.6);

    // a learner climbs the programme, level by level
    const climb = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    climb.fromTo('[data-learner]', { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.3 }, 0);
    STEPS.forEach((s, i) => {
      climb.to('[data-learner]', { x: i * 26, y: -(106 - s.y) + 26, duration: 0.5, ease: 'power2.inOut' }, 0.3 + i * 0.6);
    });
    climb.to('[data-learner]', { opacity: 0, duration: 0.35 }, 2.3);
    ambient.add(climb, 0);
    ambient.to('[data-cap]', { y: -3, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M16 106h88" stroke={STRUCT} />
      {STEPS.map((s, i) => (
        <rect
          key={s.x}
          data-ladder=""
          x={s.x}
          y={s.y}
          width="22"
          height={s.h}
          rx="4"
          fill="var(--violet-500)"
          fillOpacity={0.18 + i * 0.12}
          stroke="var(--violet-400)"
          strokeOpacity=".45"
        />
      ))}

      {/* the learner */}
      <circle data-learner="" cx="33" cy="74" r="4.5" fill="#fff" fillOpacity=".9" opacity="0" />

      {/* graduation */}
      <g data-cap="">
        <path d="M85 30l17 7-17 7-17-7z" fill="color-mix(in srgb, var(--violet-500) 45%, transparent)" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M74 40v7c0 3 5 5 11 5s11-2 11-5v-7M102 37v9" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── 07 · Business Expansion — the model replicates ─────────────────────── */
const UNITS = [
  { x: 14, y: 18, d: 'M60 52L27 33' },
  { x: 84, y: 18, d: 'M60 52L93 33' },
  { x: 14, y: 84, d: 'M60 68L27 91' },
  { x: 84, y: 84, d: 'M60 68L93 91' },
];

function FranchiseMotif() {
  const ref = useGroupMotion((enter, ambient, root) => {
    gsap.set('[data-hq]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-spoke]', { strokeDashoffset: 100 });
    gsap.set('[data-unit]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-seedling]', { opacity: 0 });

    enter
      .to('[data-hq]', { scale: 1, duration: 0.55, ease: 'back.out(2)' }, 0)
      .to('[data-spoke]', { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, 0.3)
      .to('[data-unit]', { scale: 1, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.12 }, 0.55);

    // the model keeps replicating outward, one unit at a time
    Array.from(root.querySelectorAll<SVGElement>('[data-seedling]')).forEach((seed, i) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: i * 0.85 });
      t.fromTo(seed, { strokeDashoffset: 106 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' }, 0)
        .fromTo(seed, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0)
        .to(seed, { opacity: 0, duration: 0.3 }, 0.85);
      ambient.add(t, 0);
    });
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {UNITS.map((u) => (
        <g key={u.d}>
          <path data-spoke="" d={u.d} stroke="var(--violet-400)" strokeOpacity=".4" strokeWidth="1.2" pathLength={100} strokeDasharray="100" />
          <path
            data-seedling=""
            d={u.d}
            stroke="var(--violet-300)"
            strokeWidth="2.6"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="6 100"
            strokeDashoffset={106}
            opacity="0"
          />
        </g>
      ))}

      {/* the replicated units */}
      {UNITS.map((u) => (
        <rect
          key={`u-${u.x}-${u.y}`}
          data-unit=""
          x={u.x}
          y={u.y}
          width="22"
          height="22"
          rx="6"
          fill="rgba(255,255,255,.05)"
          stroke="var(--violet-400)"
          strokeOpacity=".6"
        />
      ))}

      {/* the original */}
      <rect
        data-hq=""
        x="44"
        y="44"
        width="32"
        height="32"
        rx="9"
        fill="color-mix(in srgb, var(--violet-500) 38%, transparent)"
        stroke="var(--violet-300)"
        strokeOpacity=".8"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ── 08 · Custom Solutions — built to the requirement ───────────────────── */
const BLOCKS = [
  { x: 24, y: 24, w: 32, h: 32, from: { x: -22, y: -18 }, accent: false },
  { x: 62, y: 24, w: 32, h: 44, from: { x: 22, y: -18 }, accent: false },
  { x: 24, y: 62, w: 32, h: 34, from: { x: -22, y: 18 }, accent: false },
  { x: 62, y: 74, w: 32, h: 22, from: { x: 22, y: 18 }, accent: true },
];

function CustomMotif() {
  const ref = useGroupMotion((enter, ambient) => {
    BLOCKS.forEach((b, i) => {
      gsap.set(`[data-block="${i}"]`, { x: b.from.x, y: b.from.y, opacity: 0 });
    });
    gsap.set('[data-outline]', { strokeDashoffset: 100, opacity: 0 });

    BLOCKS.forEach((b, i) => {
      enter.to(`[data-block="${i}"]`, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, i * 0.11);
    });
    enter
      .to('[data-outline]', { opacity: 1, duration: 0.25 }, 0.7)
      .to('[data-outline]', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.7);

    // the bespoke piece keeps announcing itself
    ambient.to(
      '[data-accent]',
      { fillOpacity: 0.72, duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      0
    );
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {/* the composed brief */}
      <rect data-outline="" x="20" y="20" width="78" height="80" rx="12" stroke="var(--violet-400)" strokeOpacity=".45" strokeDasharray="100" pathLength={100} opacity="0" />

      {BLOCKS.map((b, i) => (
        <rect
          key={`${b.x}-${b.y}`}
          data-block={i}
          {...(b.accent ? { 'data-accent': '' } : {})}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="7"
          fill={b.accent ? 'var(--violet-500)' : 'rgba(255,255,255,.06)'}
          fillOpacity={b.accent ? 0.4 : 1}
          stroke={b.accent ? 'var(--violet-300)' : STRUCT}
          strokeOpacity={b.accent ? 0.8 : 1}
        />
      ))}
    </svg>
  );
}

const MOTIFS: Record<HubFocusMotif, ComponentType> = {
  trade: TradeMotif,
  learning: LearningMotif,
  franchise: FranchiseMotif,
  custom: CustomMotif,
};

export function FocusMotif({ motif }: { motif: HubFocusMotif }) {
  const Component = MOTIFS[motif];
  return <Component />;
}
