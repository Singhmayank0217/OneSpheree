'use client';
import { useEffect, useRef, type ComponentType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HubGroupVisual } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Capability-group artwork for Beyond Services — one wide panoramic
 * illustration per group, in the hub's own orange (the six flagship colours
 * belong to the flagship cards alone, so these read as a different tier of
 * work rather than a seventh division).
 *
 *   operations   work flows through parallel delivery lanes under PMO oversight
 *   compliance   a certified record is sealed and its registry entries tick off
 *   growth       a growth structure branches into opportunities, then partners
 *
 * Each markup is the FINISHED artwork so it survives JS-off and reduced
 * motion; the effect sets the resting state, plays an entrance once on
 * arrival, and runs an ambient loop that is paused whenever the group is off
 * screen.
 */

const VIEW = '0 0 420 180';
const STRUCT = 'rgba(255,255,255,.13)';
const STRUCT_SOFT = 'rgba(255,255,255,.07)';

export function useGroupMotion(
  build: (enter: gsap.core.Timeline, ambient: gsap.core.Timeline, root: SVGSVGElement) => void
) {
  const ref = useRef<SVGSVGElement>(null);
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // The ambient loop is held back until the entrance has finished: several
      // ambient tweens share a property with an entrance tween (node scale,
      // partner scale), and the in-view trigger fires earlier than the
      // entrance trigger, so overlapping them would have them fight.
      let entered = false;
      let inView = false;
      const ambient = gsap.timeline({ paused: true });
      const enter = gsap.timeline({
        paused: true,
        onComplete: () => {
          entered = true;
          if (inView) ambient.play();
        },
      });
      buildRef.current(enter, ambient, el);

      ScrollTrigger.create({ trigger: el, start: 'top 84%', once: true, onEnter: () => enter.play() });
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => {
          inView = isActive;
          if (isActive && entered) ambient.play();
          else ambient.pause();
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return ref;
}

/* ── 01 · Business Operations — delivery lanes under oversight ──────────── */
const LANES = [58, 92, 126];

function OperationsVisual() {
  const ref = useGroupMotion((enter, ambient, root) => {
    gsap.set('[data-lane]', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('[data-intake]', { opacity: 0, x: -14 });
    gsap.set('[data-gate]', { scaleY: 0, transformOrigin: 'center center' });
    gsap.set('[data-bracket]', { strokeDashoffset: 100 });
    gsap.set('[data-outlet]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-token]', { opacity: 0 });
    gsap.set('[data-oversight]', { opacity: 0 });

    enter
      .to('[data-intake]', { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out', stagger: 0.09 }, 0)
      .to('[data-lane]', { scaleX: 1, duration: 0.8, ease: 'power3.inOut', stagger: 0.1 }, 0.2)
      .to('[data-bracket]', { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.4)
      .to('[data-gate]', { scaleY: 1, duration: 0.45, ease: 'power2.out', stagger: 0.08 }, 0.8)
      .to('[data-outlet]', { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 1)
      .to('[data-oversight]', { opacity: 1, duration: 0.4 }, 1.1);

    // work circulates through the lanes (queried from the root — gsap.context
    // scopes selector strings passed to gsap methods, not gsap.utils.toArray)
    Array.from(root.querySelectorAll<SVGElement>('[data-token]')).forEach((tok, i) => {
      const t = gsap.timeline({ repeat: -1, delay: i * 1.15 });
      t.fromTo(tok, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
        .to(tok, { x: 250, duration: 4.4, ease: 'none' }, 0)
        .to(tok, { opacity: 0, duration: 0.5 }, 3.9);
      ambient.add(t, 0);
    });
    // oversight sweeps the programme
    ambient.fromTo(
      '[data-oversight]',
      { x: 0 },
      { x: 264, duration: 5.6, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      0
    );
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {/* PMO oversight bracket */}
      <path
        data-bracket=""
        d="M96 30v8M96 30h276M372 30v8"
        stroke="var(--violet-400)"
        strokeOpacity=".55"
        strokeWidth="1.3"
        pathLength={100}
        strokeDasharray="100"
      />
      <circle data-oversight="" cx="96" cy="30" r="4" fill="var(--violet-300)" />

      {/* intake — procurement and incoming work */}
      {LANES.map((y) => (
        <g key={`in-${y}`}>
          <rect data-intake="" x="24" y={y - 2} width="52" height="26" rx="6" fill="rgba(255,255,255,.05)" stroke={STRUCT} />
          <path d={`M76 ${y + 11}H96`} stroke={STRUCT_SOFT} />
        </g>
      ))}

      {/* delivery lanes */}
      {LANES.map((y) => (
        <rect key={`lane-${y}`} data-lane="" x="96" y={y} width="276" height="22" rx="11" fill="rgba(255,255,255,.035)" stroke={STRUCT} />
      ))}

      {/* process gates */}
      {[186, 272].map((x) => (
        <path key={`gate-${x}`} data-gate="" d={`M${x} 50V158`} stroke="var(--violet-400)" strokeOpacity=".3" strokeDasharray="3 5" />
      ))}

      {/* work in motion */}
      {LANES.map((y) => (
        <rect key={`tok-${y}`} data-token="" x="104" y={y + 4} width="14" height="14" rx="4" fill="var(--violet-500)" fillOpacity=".85" />
      ))}

      {/* delivered */}
      <g data-outlet="">
        <circle cx="392" cy="103" r="14" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-400)" />
        <path d="M385 103l5 5 9-10" stroke="var(--violet-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ── 02 · Compliance & Registrations — the sealed record ────────────────── */
const REGISTRY = [58, 92, 126];

function ComplianceVisual() {
  const ref = useGroupMotion((enter, ambient) => {
    gsap.set('[data-sheet]', { opacity: 0, y: 12 });
    gsap.set('[data-line]', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('[data-seal]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-seal-mark]', { strokeDashoffset: 30 });
    gsap.set('[data-panel]', { opacity: 0, x: 14 });
    gsap.set('[data-tick]', { strokeDashoffset: 20, opacity: 0 });
    gsap.set('[data-bar]', { scaleX: 0, transformOrigin: 'left center' });

    enter
      .to('[data-sheet]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0)
      .to('[data-line]', { scaleX: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }, 0.35)
      .to('[data-panel]', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.4)
      .to('[data-bar]', { scaleX: 1, duration: 0.55, ease: 'power2.out', stagger: 0.12 }, 0.6)
      .to('[data-tick]', { strokeDashoffset: 0, opacity: 1, duration: 0.35, stagger: 0.22 }, 0.85)
      .to('[data-seal]', { scale: 1, duration: 0.55, ease: 'back.out(2.4)' }, 1.05)
      .to('[data-seal-mark]', { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 1.45);

    // the seal's certification ring turns slowly; the record stays warm.
    // Both are circles centred on the seal, so their bounding-box centre is
    // the pivot — no svgOrigin needed (and none of GSAP's origin ambiguity).
    ambient.to('[data-seal-ring]', { rotation: 360, duration: 34, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }, 0);
    ambient.to(
      '[data-seal-glow]',
      { opacity: 0.55, scale: 1.12, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' },
      0
    );
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {/* the certified record */}
      <rect data-sheet="" x="52" y="34" width="140" height="112" rx="8" fill="rgba(255,255,255,.03)" stroke={STRUCT_SOFT} />
      <rect data-sheet="" x="40" y="26" width="140" height="112" rx="8" fill="rgba(255,255,255,.04)" stroke={STRUCT_SOFT} />
      <rect data-sheet="" x="28" y="18" width="140" height="112" rx="8" fill="rgba(255,255,255,.05)" stroke={STRUCT} />
      <rect data-line="" x="46" y="36" width="60" height="5" rx="2.5" fill="rgba(255,255,255,.4)" />
      {[54, 70, 86, 102].map((y) => (
        <rect key={`ln-${y}`} data-line="" x="46" y={y} width={y === 102 ? 62 : 96} height="4" rx="2" fill="rgba(255,255,255,.2)" />
      ))}

      {/* the seal */}
      <g data-seal="">
        <circle data-seal-glow="" cx="150" cy="116" r="34" fill="color-mix(in srgb, var(--violet-500) 22%, transparent)" opacity=".3" />
        <circle data-seal-ring="" cx="150" cy="116" r="26" stroke="var(--violet-400)" strokeWidth="1.4" strokeDasharray="5 6" />
        <circle cx="150" cy="116" r="18" fill="color-mix(in srgb, var(--violet-500) 30%, transparent)" stroke="var(--violet-300)" strokeOpacity=".7" />
        <path
          data-seal-mark=""
          d="M142 116l5 6 11-13"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={30}
          strokeDasharray="30"
        />
      </g>

      {/* the registry */}
      <g data-panel="">
        <rect x="228" y="34" width="164" height="112" rx="10" fill="rgba(255,255,255,.025)" stroke={STRUCT} />
        {REGISTRY.map((y) => (
          <g key={`reg-${y}`}>
            <rect x="244" y={y - 8} width="16" height="16" rx="4" stroke="var(--violet-400)" strokeOpacity=".6" />
            <path
              data-tick=""
              d={`M247 ${y}l3 3 6-7`}
              stroke="var(--violet-300)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={20}
              strokeDasharray="20"
            />
            <rect data-bar="" x="270" y={y - 3} width="104" height="6" rx="3" fill="var(--violet-500)" fillOpacity=".3" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── 03 · Business Growth — the structure that branches ─────────────────── */
const BRANCHES = [
  { d: 'M96 132C132 132 150 118 176 108', nx: 176, ny: 108 },
  { d: 'M96 106C142 106 170 90 214 78', nx: 214, ny: 78 },
  { d: 'M96 82C152 82 190 58 262 48', nx: 262, ny: 48 },
];
const SEEDS = [
  [192, 98],
  [200, 116],
  [230, 66],
  [240, 86],
  [280, 36],
  [288, 56],
];

function GrowthVisual() {
  const ref = useGroupMotion((enter, ambient) => {
    gsap.set('[data-ground]', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('[data-trunk]', { strokeDashoffset: 100 });
    gsap.set('[data-branch]', { strokeDashoffset: 100 });
    gsap.set('[data-node]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-seed]', { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-partner]', { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-climb]', { opacity: 0 });

    enter
      .to('[data-ground]', { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0)
      .to('[data-trunk]', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }, 0.2)
      .to('[data-branch]', { strokeDashoffset: 0, duration: 0.75, ease: 'power2.out', stagger: 0.14 }, 0.6)
      .to('[data-node]', { scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.14 }, 1)
      .to('[data-seed]', { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.06 }, 1.35)
      .to('[data-partner]', { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.12 }, 1.6);

    // a pulse climbs the structure and reaches a different branch each cycle
    const climb = gsap.timeline({ repeat: -1 });
    BRANCHES.forEach((b, i) => {
      const t = i * 2.2;
      climb
        .fromTo('[data-climb]', { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.3 }, t)
        .to('[data-climb]', { y: -(158 - b.ny) * 0.55, duration: 0.8, ease: 'power1.out' }, t)
        .to('[data-climb]', { x: b.nx - 96, y: b.ny - 158, duration: 0.9, ease: 'power1.inOut' }, t + 0.8)
        .to('[data-climb]', { opacity: 0, duration: 0.35 }, t + 1.6);
      climb.to(`[data-node="${i}"]`, { scale: 1.22, duration: 0.3, ease: 'power2.out' }, t + 1.6);
      climb.to(`[data-node="${i}"]`, { scale: 1, duration: 0.6, ease: 'power2.inOut' }, t + 1.9);
    });
    ambient.add(climb, 0);

    // the partnership rings breathe on their STROKE, not their scale — the
    // entrance already owns their scale
    ambient.to(
      '[data-partner]',
      { strokeOpacity: 1, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.4 },
      0
    );
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path data-ground="" d="M40 158H392" stroke={STRUCT} />

      <path
        data-trunk=""
        d="M96 158V70"
        stroke="var(--violet-500)"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
      />

      {BRANCHES.map((b) => (
        <path
          key={b.d}
          data-branch=""
          d={b.d}
          stroke="var(--violet-400)"
          strokeOpacity=".7"
          strokeWidth="1.8"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
        />
      ))}

      {BRANCHES.map((b, i) => (
        <circle
          key={`node-${b.nx}`}
          data-node={i}
          cx={b.nx}
          cy={b.ny}
          r="9"
          fill="color-mix(in srgb, var(--violet-500) 34%, transparent)"
          stroke="var(--violet-300)"
          strokeOpacity=".8"
        />
      ))}

      {SEEDS.map(([x, y]) => (
        <circle key={`seed-${x}-${y}`} data-seed="" cx={x} cy={y} r="3" fill="var(--violet-300)" fillOpacity=".75" />
      ))}

      {/* the climbing pulse */}
      <circle data-climb="" cx="96" cy="158" r="4.5" fill="#fff" fillOpacity=".9" opacity="0" />

      {/* strategic partnership — two organisations, one interlock */}
      <circle data-partner="" cx="330" cy="98" r="26" stroke="var(--violet-400)" strokeOpacity=".55" strokeWidth="1.6" />
      <circle data-partner="" cx="366" cy="98" r="26" stroke="var(--violet-300)" strokeOpacity=".55" strokeWidth="1.6" />
      <circle cx="348" cy="98" r="4" fill="var(--violet-300)" />
    </svg>
  );
}

/* ── 04 · Technology & Intelligence — data resolved into insight ────────── */
const PLANES = [
  { d: 'M22 52L82 36L142 52L82 68Z', cy: 52 },
  { d: 'M22 92L82 76L142 92L82 108Z', cy: 92 },
  { d: 'M22 132L82 116L142 132L82 148Z', cy: 132 },
];
const TRACES = [
  'M142 52C176 52 190 70 214 82',
  'M142 92H214',
  'M142 132C176 132 190 112 214 100',
];
const READOUTS = [
  { y: 58, w: 79 },
  { y: 86, w: 55 },
  { y: 114, w: 66 },
];

function TechnologyVisual() {
  const ref = useGroupMotion((enter, ambient, root) => {
    gsap.set('[data-plane]', { opacity: 0, x: -18 });
    gsap.set('[data-trace]', { strokeDashoffset: 100 });
    gsap.set('[data-core]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-chip]', { strokeDashoffset: 100 });
    gsap.set('[data-outfeed]', { strokeDashoffset: 100 });
    gsap.set('[data-readout]', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('[data-mote]', { opacity: 0 });
    gsap.set('[data-corering]', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });

    enter
      .to('[data-plane]', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0)
      .to('[data-trace]', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', stagger: 0.09 }, 0.35)
      .to('[data-core]', { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 0.65)
      .to('[data-chip]', { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 1)
      .to('[data-corering]', { opacity: 0.5, scale: 1, duration: 0.5, ease: 'power2.out' }, 1.05)
      .to('[data-outfeed]', { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 1.2)
      .to('[data-readout]', { scaleX: 1, duration: 0.65, ease: 'power3.out', stagger: 0.11 }, 1.35);

    // data keeps arriving at the core, and the core keeps thinking. One
    // timeline per mote so travel and fade stay locked together (a shared
    // stagger across two separate tweens drifts apart).
    Array.from(root.querySelectorAll<SVGElement>('[data-mote]')).forEach((mote, i) => {
      const t = gsap.timeline({ repeat: -1, delay: i * 0.55, repeatDelay: 0.5 });
      t.fromTo(mote, { strokeDashoffset: 110 }, { strokeDashoffset: 0, duration: 2.2, ease: 'none' }, 0)
        .fromTo(mote, { opacity: 0 }, { opacity: 0.95, duration: 0.3 }, 0)
        .to(mote, { opacity: 0, duration: 0.4 }, 1.8);
      ambient.add(t, 0);
    });
    ambient.to(
      '[data-corering]',
      { scale: 1.24, opacity: 0, duration: 2.8, ease: 'power2.out', repeat: -1, repeatDelay: 0.5, transformOrigin: '50% 50%' },
      0
    );
    ambient.to(
      '[data-readout]',
      { fillOpacity: 0.95, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3 },
      0
    );
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {/* the data layers */}
      {PLANES.map((p) => (
        <g key={p.d} data-plane="">
          <path d={p.d} fill="rgba(255,255,255,.04)" stroke={STRUCT} />
          <circle cx="66" cy={p.cy} r="2.5" fill="var(--violet-300)" fillOpacity=".7" />
          <circle cx="86" cy={p.cy - 5} r="2" fill="var(--violet-300)" fillOpacity=".45" />
          <circle cx="100" cy={p.cy + 3} r="2" fill="var(--violet-300)" fillOpacity=".45" />
        </g>
      ))}

      {/* traces into the core, and the data travelling them */}
      {TRACES.map((d) => (
        <g key={d}>
          <path data-trace="" d={d} stroke="var(--violet-400)" strokeOpacity=".45" strokeWidth="1.4" pathLength={100} strokeDasharray="100" />
          <path
            data-mote=""
            d={d}
            stroke="var(--violet-300)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="9 100"
            strokeDashoffset={110}
            opacity="0"
          />
        </g>
      ))}

      {/* the intelligence core */}
      <circle data-corering="" cx="250" cy="90" r="44" stroke="var(--violet-400)" strokeWidth="1.4" opacity="0" />
      <g data-core="">
        <rect
          x="218"
          y="58"
          width="64"
          height="64"
          rx="16"
          fill="color-mix(in srgb, var(--violet-500) 20%, transparent)"
          stroke="var(--violet-400)"
          strokeOpacity=".7"
        />
        <path
          data-chip=""
          d="M236 76h28v28h-28zM244 68v8M256 68v8M244 104v8M256 104v8M210 84h8M210 96h8M282 84h8M282 96h8"
          stroke="var(--violet-300)"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
        />
      </g>

      {/* resolved insight */}
      <path data-outfeed="" d="M282 90h26" stroke="var(--violet-400)" strokeOpacity=".5" strokeWidth="1.4" pathLength={100} strokeDasharray="100" />
      {READOUTS.map((b) => (
        <g key={b.y}>
          <rect x="316" y={b.y} width="88" height="8" rx="4" fill="rgba(255,255,255,.06)" />
          <rect data-readout="" x="316" y={b.y} width={b.w} height="8" rx="4" fill="var(--violet-500)" fillOpacity=".7" />
        </g>
      ))}
    </svg>
  );
}

const GROUP_VISUALS: Record<HubGroupVisual, ComponentType> = {
  operations: OperationsVisual,
  compliance: ComplianceVisual,
  growth: GrowthVisual,
  technology: TechnologyVisual,
};

export function GroupVisual({ visual }: { visual: HubGroupVisual }) {
  const Component = GROUP_VISUALS[visual];
  return <Component />;
}
