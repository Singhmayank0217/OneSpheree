'use client';
import { useEffect, useRef, type ComponentType } from 'react';
import gsap from 'gsap';
import type { HubCardVisual, HubServiceCard } from '@/types/services-hub';

/**
 * Card artwork for the interactive services grid — one composition per
 * division, and one MOTION per division: no two cards animate the same way.
 *
 *   signal      Digital Marketing   broadcast arcs + demand curve + rising bars
 *   scan        Due Diligence       a scan bar sweeps a record, checks resolve
 *   blueprint   Fire & Safety       drafting grid + elevation draws, protection pulse
 *   marketplace E-Commerce          products flow down a route into the storefront
 *   network     Manpower            a workforce network builds outward from the hub
 *   growth      Sales & Consulting  stages rise, a trajectory climbs to the target
 *
 * Each SVG's markup is the FINISHED artwork, so with JavaScript off or reduced
 * motion on, the card still reads correctly. On mount the effect sets the
 * resting state and builds one paused timeline; hover plays it, leaving plays
 * it back. Timelines contain no infinite repeats so reversal is exact.
 */

const VIEW = '0 0 320 170';

function useHoverMotion(active: boolean, build: (tl: gsap.core.Timeline) => void) {
  const ref = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      buildRef.current(tl);
      tlRef.current = tl;
    }, el);
    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (active) tl.timeScale(1).play();
    else tl.timeScale(1.5).reverse();
  }, [active]);

  return ref;
}

type VisualProps = { active: boolean; accent: HubServiceCard['accent'] };

const STRUCT = 'rgba(255,255,255,.14)';
const STRUCT_SOFT = 'rgba(255,255,255,.07)';

/* ── 01 · Digital Marketing — broadcast signals ─────────────────────────── */
function SignalVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-arc]', { scale: 0.3, opacity: 0, svgOrigin: '58 118' });
    gsap.set('[data-curve]', { strokeDashoffset: 100 });
    gsap.set('[data-bar]', { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set('[data-core]', { scale: 0.75, svgOrigin: '58 118' });
    tl.to('[data-core]', { scale: 1, duration: 0.32, ease: 'back.out(2)' }, 0)
      .to('[data-arc]', { scale: 1, opacity: 1, duration: 0.62, ease: 'power2.out', stagger: 0.11 }, 0.06)
      .to('[data-curve]', { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, 0.22)
      .to('[data-bar]', { scaleY: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.07 }, 0.42);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M20 142H300" stroke={STRUCT} />
      <path data-arc="" d="M65.76 89.02A30 30 0 0 1 85.19 130.68" stroke={accent.glow} strokeOpacity=".8" strokeWidth="1.6" strokeLinecap="round" />
      <path data-arc="" d="M71.46 67.77A52 52 0 0 1 105.13 139.98" stroke={accent.glow} strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
      <path data-arc="" d="M77.15 46.52A74 74 0 0 1 125.07 149.27" stroke={accent.glow} strokeOpacity=".32" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="58" cy="118" r="11.5" stroke={accent.base} strokeOpacity=".5" />
      <circle data-core="" cx="58" cy="118" r="6" fill={accent.base} />
      <path
        data-curve=""
        d="M58 118C104 118 132 100 166 84C202 67 240 50 286 36"
        stroke={accent.glow}
        strokeWidth="1.7"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
      />
      <rect data-bar="" x="176" y="108" width="18" height="34" rx="3" fill={accent.base} fillOpacity=".45" />
      <rect data-bar="" x="204" y="88" width="18" height="54" rx="3" fill={accent.base} fillOpacity=".58" />
      <rect data-bar="" x="232" y="68" width="18" height="74" rx="3" fill={accent.base} fillOpacity=".72" />
      <rect data-bar="" x="260" y="46" width="18" height="96" rx="3" fill={accent.base} fillOpacity=".9" />
    </svg>
  );
}

/* ── 02 · Due Diligence — verification scan ─────────────────────────────── */
const SCAN_ROWS = [58, 78, 98, 118];

function ScanVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-row]', { opacity: 0.3 });
    gsap.set('[data-check]', { strokeDashoffset: 20, opacity: 0 });
    gsap.set('[data-scan]', { y: 0, opacity: 0 });
    gsap.set('[data-seal-ring]', { strokeDashoffset: 100 });
    gsap.set('[data-seal-check]', { strokeDashoffset: 30 });
    gsap.set('[data-seal]', { opacity: 0.25 });
    tl.to('[data-scan]', { opacity: 1, duration: 0.18 }, 0)
      .to('[data-scan]', { y: 104, duration: 1.15, ease: 'power1.inOut' }, 0.1)
      .to('[data-row]', { opacity: 1, duration: 0.3, stagger: 0.26 }, 0.22)
      .to('[data-check]', { strokeDashoffset: 0, opacity: 1, duration: 0.32, stagger: 0.26 }, 0.28)
      .to('[data-scan]', { opacity: 0, duration: 0.25 }, 1.2)
      .to('[data-seal]', { opacity: 1, duration: 0.3 }, 1.15)
      .to('[data-seal-ring]', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 1.15)
      .to('[data-seal-check]', { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 1.5);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      {/* the record */}
      <rect x="36" y="26" width="150" height="118" rx="10" fill="rgba(255,255,255,.03)" stroke={STRUCT} />
      <rect x="56" y="42" width="52" height="5" rx="2.5" fill="rgba(255,255,255,.35)" />
      {SCAN_ROWS.map((y) => (
        <g key={y}>
          <rect data-row="" x="56" y={y} width="80" height="4" rx="2" fill="rgba(255,255,255,.42)" />
          <path
            data-check=""
            d={`M148 ${y + 2}l4 4 9-10`}
            stroke={accent.glow}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={20}
            strokeDasharray="20"
          />
        </g>
      ))}
      {/* scan head */}
      <g data-scan="">
        <rect x="30" y="30" width="162" height="16" rx="8" fill={accent.base} fillOpacity=".16" />
        <rect x="30" y="37" width="162" height="2" rx="1" fill={accent.glow} />
      </g>
      {/* clearance seal */}
      <g data-seal="">
        <circle cx="250" cy="86" r="34" fill={accent.soft} />
        <circle
          data-seal-ring=""
          cx="250"
          cy="86"
          r="34"
          stroke={accent.base}
          strokeWidth="1.6"
          pathLength={100}
          strokeDasharray="100"
        />
        <circle cx="250" cy="86" r="26" stroke={accent.base} strokeOpacity=".4" strokeDasharray="2 5" />
        <path
          data-seal-check=""
          d="M238 86l8 8 16-18"
          stroke={accent.glow}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={30}
          strokeDasharray="30"
        />
      </g>
    </svg>
  );
}

/* ── 03 · Fire & Safety — blueprint lines and protection pulse ──────────── */
const GRID_D = (() => {
  const parts: string[] = [];
  for (let x = 20; x <= 300; x += 35) parts.push(`M${x} 18V152`);
  for (let y = 18; y <= 152; y += 32) parts.push(`M20 ${y}H300`);
  return parts.join('');
})();

const DETECTORS = [
  { x: 88, y: 88 },
  { x: 152, y: 62 },
  { x: 176, y: 112 },
  { x: 100, y: 128 },
];

function BlueprintVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-grid]', { opacity: 0 });
    gsap.set('[data-outline]', { strokeDashoffset: 100 });
    gsap.set('[data-floor]', { strokeDashoffset: 100 });
    gsap.set('[data-riser]', { strokeDashoffset: 100 });
    gsap.set('[data-det]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-pulse]', { scale: 0.3, opacity: 0, svgOrigin: '130 100' });
    tl.to('[data-grid]', { opacity: 1, duration: 0.4 }, 0)
      .to('[data-outline]', { strokeDashoffset: 0, duration: 0.95, ease: 'power2.inOut' }, 0.08)
      .to('[data-floor]', { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, 0.5)
      .to('[data-riser]', { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 0.62)
      .to('[data-det]', { scale: 1, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.08 }, 0.78)
      .to('[data-pulse]', { scale: 1.25, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 1.02)
      .to('[data-pulse]', { scale: 2.9, opacity: 0, duration: 0.9, ease: 'power2.out' }, 1.42);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path data-grid="" d={GRID_D} stroke={STRUCT_SOFT} strokeWidth="1" />
      {/* protection pulse */}
      <circle data-pulse="" cx="130" cy="100" r="26" stroke={accent.glow} strokeWidth="1.6" />
      {/* building elevation */}
      <path
        data-outline=""
        d="M64 142V70h58V44h74v98Z"
        stroke={accent.base}
        strokeWidth="1.8"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
      />
      <path data-floor="" d="M64 100H122" stroke={STRUCT} pathLength={100} strokeDasharray="100" />
      <path data-floor="" d="M122 76H196" stroke={STRUCT} pathLength={100} strokeDasharray="100" />
      <path data-floor="" d="M64 120H196" stroke={STRUCT} pathLength={100} strokeDasharray="100" />
      {/* riser + header main */}
      <path
        data-riser=""
        d="M232 142V58H64"
        stroke={accent.glow}
        strokeOpacity=".55"
        strokeWidth="1.4"
        strokeDasharray="5 4"
        pathLength={100}
      />
      {DETECTORS.map((d) => (
        <circle key={`${d.x}-${d.y}`} data-det="" cx={d.x} cy={d.y} r="4" fill={accent.glow} />
      ))}
      <circle cx="232" cy="142" r="5" stroke={accent.base} strokeWidth="1.6" />
    </svg>
  );
}

/* ── 04 · Reselling & E-Commerce — marketplace flow ─────────────────────── */
const TILES = [
  { x: 26, y: 92, dx: 196, delay: 0.12 },
  { x: 58, y: 92, dx: 164, delay: 0.3 },
  { x: 90, y: 92, dx: 132, delay: 0.48 },
];

function MarketplaceVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-route]', { strokeDashoffset: 100 });
    gsap.set('[data-store]', { opacity: 0.35 });
    gsap.set('[data-awning]', { scaleY: 0, transformOrigin: '50% 0%' });
    gsap.set('[data-badge]', { scale: 0, transformOrigin: '50% 50%' });
    tl.to('[data-route]', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0)
      .to('[data-store]', { opacity: 1, duration: 0.45 }, 0.25)
      .to('[data-awning]', { scaleY: 1, duration: 0.45, ease: 'back.out(1.7)' }, 0.32);
    TILES.forEach((t, i) => {
      const sel = `[data-tile="${i}"]`;
      tl.to(sel, { x: t.dx, duration: 0.95, ease: 'power1.inOut' }, 0.35 + t.delay)
        .to(sel, { y: -22, duration: 0.45, ease: 'sine.out' }, 0.35 + t.delay)
        .to(sel, { y: 6, duration: 0.5, ease: 'sine.in' }, 0.8 + t.delay)
        .to(sel, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.3 }, 1.05 + t.delay);
    });
    tl.to('[data-badge]', { scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, 1.7);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M14 142H306" stroke={STRUCT} />
      {/* the route */}
      <path
        data-route=""
        d="M26 120C74 120 96 100 132 100C170 100 178 116 204 116"
        stroke={accent.base}
        strokeOpacity=".55"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        pathLength={100}
        strokeLinecap="round"
      />
      {/* the storefront */}
      <g data-store="">
        <rect x="212" y="80" width="82" height="62" rx="5" fill="rgba(255,255,255,.04)" stroke={STRUCT} />
        <rect x="240" y="108" width="26" height="34" rx="3" fill={accent.base} fillOpacity=".28" stroke={accent.base} strokeOpacity=".5" />
        <path d="M224 96h14M270 96h14" stroke={STRUCT} />
        <g data-awning="">
          <path d="M206 80l10-22h74l10 22Z" fill={accent.soft} stroke={accent.base} strokeOpacity=".6" />
          <path d="M232 58v22M258 58v22" stroke={accent.base} strokeOpacity=".35" />
        </g>
      </g>
      {/* products moving to market */}
      {TILES.map((t, i) => (
        <rect
          key={t.x}
          data-tile={i}
          x={t.x}
          y={t.y}
          width="20"
          height="20"
          rx="4"
          fill={accent.base}
          fillOpacity=".6"
          stroke={accent.glow}
          strokeOpacity=".5"
        />
      ))}
      {/* fulfilled */}
      <g data-badge="">
        <circle cx="286" cy="66" r="13" fill={accent.base} />
        <path d="M280 66l4 4 8-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ── 05 · Manpower Solutions — workforce network ────────────────────────── */
const PEOPLE = [
  { x: 130, y: 36 },
  { x: 194, y: 52 },
  { x: 218, y: 104 },
  { x: 166, y: 136 },
  { x: 106, y: 122 },
];

function NetworkVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-link]', { strokeDashoffset: 100 });
    gsap.set('[data-person]', { scale: 0, transformOrigin: '50% 50%' });
    gsap.set('[data-hub]', { scale: 0.8, svgOrigin: '68 86' });
    gsap.set('[data-ring]', { scale: 0.4, opacity: 0, svgOrigin: '68 86' });
    tl.to('[data-hub]', { scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, 0)
      .to('[data-link]', { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out', stagger: 0.09 }, 0.14)
      .to('[data-person]', { scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.09 }, 0.4)
      .to('[data-ring]', { scale: 1.1, opacity: 0.6, duration: 0.45, ease: 'power2.out' }, 0.95)
      .to('[data-ring]', { scale: 2.2, opacity: 0, duration: 0.85, ease: 'power2.out' }, 1.4);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <circle data-ring="" cx="68" cy="86" r="34" stroke={accent.glow} strokeWidth="1.6" />
      {PEOPLE.map((p) => (
        <path
          key={`l-${p.x}`}
          data-link=""
          d={`M68 86L${p.x} ${p.y}`}
          stroke={accent.base}
          strokeOpacity=".4"
          strokeWidth="1.4"
          pathLength={100}
          strokeDasharray="100"
        />
      ))}
      {/* the organisation hub */}
      <g data-hub="">
        <circle cx="68" cy="86" r="26" fill={accent.soft} stroke={accent.base} strokeOpacity=".65" />
        <path d="M58 96V80l10-6 10 6v16Z" stroke={accent.glow} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M64 96v-8h8v8" stroke={accent.glow} strokeOpacity=".7" strokeWidth="1.3" />
      </g>
      {/* the workforce */}
      {PEOPLE.map((p) => (
        <g key={`p-${p.x}`} data-person="">
          <circle cx={p.x} cy={p.y} r="15" fill="rgba(255,255,255,.05)" stroke={accent.base} strokeOpacity=".55" />
          <circle cx={p.x} cy={p.y - 4} r="4" fill={accent.glow} />
          <path
            d={`M${p.x - 6} ${p.y + 8}a6 6 0 0 1 12 0`}
            stroke={accent.glow}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/* ── 06 · Sales & Consulting — growth strategy ──────────────────────────── */
const STAGES = [
  { x: 44, y: 120, h: 26 },
  { x: 104, y: 96, h: 50 },
  { x: 164, y: 70, h: 76 },
  { x: 224, y: 42, h: 104 },
];

function GrowthVisual({ active, accent }: VisualProps) {
  const ref = useHoverMotion(active, (tl) => {
    gsap.set('[data-stage]', { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set('[data-track]', { strokeDashoffset: 100 });
    gsap.set('[data-arrow]', { opacity: 0, scale: 0.4, svgOrigin: '272 32' });
    gsap.set('[data-target]', { scale: 0, svgOrigin: '272 32' });
    tl.to('[data-stage]', { scaleY: 1, duration: 0.55, ease: 'power3.out', stagger: 0.1 }, 0)
      .to('[data-track]', { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, 0.25)
      .to('[data-target]', { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.05)
      .to('[data-arrow]', { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 1.15);
  });

  return (
    <svg ref={ref} viewBox={VIEW} fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M20 146H300" stroke={STRUCT} />
      {STAGES.map((s, i) => (
        <rect
          key={s.x}
          data-stage=""
          x={s.x}
          y={s.y}
          width="48"
          height={s.h}
          rx="4"
          fill={accent.base}
          fillOpacity={0.16 + i * 0.1}
          stroke={accent.base}
          strokeOpacity=".4"
        />
      ))}
      <path
        data-track=""
        d="M52 132C96 128 108 104 140 92C176 78 202 62 232 48L266 34"
        stroke={accent.glow}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
      />
      <g data-target="">
        <circle cx="272" cy="32" r="16" stroke={accent.base} strokeWidth="1.6" />
        <circle cx="272" cy="32" r="8" stroke={accent.base} strokeOpacity=".55" />
        <circle cx="272" cy="32" r="3" fill={accent.glow} />
      </g>
      <path data-arrow="" d="M258 20l14 2 2 14" stroke={accent.glow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const VISUALS: Record<HubCardVisual, ComponentType<VisualProps>> = {
  signal: SignalVisual,
  scan: ScanVisual,
  blueprint: BlueprintVisual,
  marketplace: MarketplaceVisual,
  network: NetworkVisual,
  growth: GrowthVisual,
};

export function CardVisual({ visual, active, accent }: { visual: HubCardVisual } & VisualProps) {
  const Component = VISUALS[visual];
  return <Component active={active} accent={accent} />;
}
