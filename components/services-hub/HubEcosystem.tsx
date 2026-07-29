'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesHub } from '@/data/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * The hub's connected ecosystem — the hero artwork, built only for this page.
 *
 * A central OneSpheree hub, whose aperture is divided into six arc segments
 * carrying the divisions' own colours, is wired to six division modules on a
 * fixed hexagonal framework. The connection paths EXPAND ORGANICALLY: over a
 * persistent hairline, a live growth path reaches out from the hub and draws
 * back on its own rhythm, sprouting short branch spurs as it goes, while
 * glowing particles travel continuously between the hub and every division.
 * Underneath it all each division takes its turn — its module, halo and hub
 * segment lighting in sequence — so the ecosystem never stops evolving.
 *
 * Deliberately NOT: floating nodes (every module is anchored to the framework
 * and labelled), a rotating sphere, a line graph or a dashboard. There is no
 * global rotation at all — the motion is growth and traffic, not spin.
 *
 * Geometry note: every coordinate in the markup is a literal or a module-scope
 * value rounded to 2dp (a 380-unit stage centred on 190,190 — modules at
 * r=136, hub aperture r=66, connectors r=72→110). No unrounded trigonometry
 * reaches the markup, so the SSR and client output match exactly.
 */

const CENTRE = 190;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** module centre + connector endpoints (inner = hub side, outer = module side) */
const NODES = [
  { cx: 190, cy: 54, ix: 190, iy: 118, ox: 190, oy: 80 },
  { cx: 307.78, cy: 122, ix: 252.35, iy: 154, ox: 285.26, oy: 135 },
  { cx: 307.78, cy: 258, ix: 252.35, iy: 226, ox: 285.26, oy: 245 },
  { cx: 190, cy: 326, ix: 190, iy: 262, ox: 190, oy: 300 },
  { cx: 72.22, cy: 258, ix: 127.65, iy: 226, ox: 94.74, oy: 245 },
  { cx: 72.22, cy: 122, ix: 127.65, iy: 154, ox: 94.74, oy: 135 },
];

/**
 * Two branch spurs per connector, struck perpendicular to it — the small
 * offshoots that make the network read as grown rather than drawn. Computed
 * once at module scope and rounded, never at render time.
 */
const SPURS = [-90, -30, 30, 90, 150, 210].flatMap((deg, i) => {
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const mk = (radius: number, len: number) => {
    const bx = CENTRE + ux * radius;
    const by = CENTRE + uy * radius;
    // perpendicular to the connector direction
    return { i, x1: r2(bx), y1: r2(by), x2: r2(bx - uy * len), y2: r2(by + ux * len) };
  };
  return [mk(86, 15), mk(99, -12)];
});

/** the six 52° segments of the hub aperture, one per division */
const ARCS = [
  'M161.07 130.68A66 66 0 0 1 218.93 130.68',
  'M226.91 135.29A66 66 0 0 1 255.84 185.39',
  'M255.84 194.61A66 66 0 0 1 226.91 244.71',
  'M218.93 249.32A66 66 0 0 1 161.07 249.32',
  'M153.09 244.71A66 66 0 0 1 124.16 194.61',
  'M124.16 185.39A66 66 0 0 1 153.09 135.29',
];

const HEX = 'M190 54L307.78 122L307.78 258L190 326L72.22 258L72.22 122Z';

/** 18×18 division glyphs, drawn for this diagram (stroked, no fills) */
const GLYPHS = [
  // marketing — rising signal bars
  'M2.5 15.5v-4M7 15.5V8M11.5 15.5V4.5M16 15.5V2.5',
  // due diligence — verified record
  'M4 2.5h6l4 4v11H4zM6.5 11l2 2 4-4.5',
  // fire & safety — protection shield
  'M9 1.8l6.2 2.4v4.6c0 3.7-2.6 6.4-6.2 7.6-3.6-1.2-6.2-3.9-6.2-7.6V4.2zM9 6.4v5',
  // e-commerce — commerce bag
  'M4.2 5.4h9.6l1 10.8H3.2zM6.6 5.4a2.4 2.4 0 014.8 0',
  // manpower — workforce network
  'M9 1.9a2 2 0 100 4 2 2 0 100-4zM3.4 11.4a2 2 0 100 4 2 2 0 100-4zM14.6 11.4a2 2 0 100 4 2 2 0 100-4zM9 6.2L4.6 11M9 6.2l4.4 4.8',
  // sales & consulting — target
  'M9 1.6a7.4 7.4 0 100 14.8 7.4 7.4 0 000-14.8zM9 5.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z',
];

export function HubEcosystem({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const cards = servicesHub.grid.cards;

  useEffect(() => {
    const svg = rootRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const q = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll<T>(sel));
      const tiles = q<SVGRectElement>('[data-eco-tile]');
      const halos = q<SVGRectElement>('[data-eco-halo]');
      const arcs = q<SVGPathElement>('[data-eco-arc]');
      const beads = q<SVGPathElement>('[data-eco-bead]');
      const grows = q<SVGPathElement>('[data-eco-grow]');
      const spurs = q<SVGPathElement>('[data-eco-spur]');

      /* ── staged entrance (chained behind the hero copy) ──────────────────── */
      const tl = gsap.timeline({ delay: 0.45 });
      tl.from('[data-eco-glow]', { opacity: 0, duration: 1.3, ease: 'power2.out' })
        .from('[data-eco-core]', { scale: 0.35, opacity: 0, duration: 0.85, ease: 'back.out(1.7)' }, '-=1')
        .from('[data-eco-arc]', { opacity: 0, scale: 0.7, duration: 0.6, stagger: 0.06, ease: 'power3.out' }, '-=0.5')
        .from('[data-eco-field]', { opacity: 0, scale: 0.92, duration: 1, ease: 'power2.out' }, '-=0.45')
        .fromTo('[data-eco-hex]', { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.7')
        .fromTo('[data-eco-conn]', { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out' }, '-=1.15')
        .from('[data-eco-tile]', { scale: 0.3, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.8)' }, '-=0.75')
        .from('[data-eco-glyph]', { opacity: 0, duration: 0.45, stagger: 0.07 }, '-=0.55')
        .from('[data-eco-label]', { opacity: 0, y: 7, duration: 0.5, stagger: 0.07 }, '-=0.5');

      /* ── the framework breathes (no rotation — growth, not spin) ─────────── */
      gsap.to('[data-eco-spin]', {
        scale: 1.022,
        duration: 5.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });

      /* ── connection paths expand organically ─────────────────────────────
         Over each persistent hairline, a live growth path reaches out from the
         hub and draws back on its own rhythm — different durations per
         connector so the network never pulses in unison. */
      grows.forEach((path, i) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 3.2 + i * 0.32,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 2.4 + i * 0.38,
          }
        );
      });

      /* branch spurs sprout off the paths and retract */
      spurs.forEach((spur, i) => {
        gsap.fromTo(
          spur,
          { strokeDashoffset: 100, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.75,
            duration: 1.5 + (i % 4) * 0.28,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.9,
            delay: 3 + i * 0.31,
          }
        );
      });

      /* ── particles travel continuously between the hub and each division ── */
      beads.forEach((bead, i) => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.1, delay: 3.2 + i * 0.5 })
          .fromTo(bead, { strokeDashoffset: 112 }, { strokeDashoffset: 0, duration: 1.75, ease: 'none' }, 0)
          .fromTo(bead, { opacity: 0 }, { opacity: 0.9, duration: 0.35 }, 0)
          .to(bead, { opacity: 0, duration: 0.4 }, 1.35);
      });

      /* ── ambient: the core breathes and casts a slow pulse ───────────────── */
      gsap.to('[data-eco-glow]', {
        scale: 1.07,
        opacity: 0.9,
        duration: 4.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.4,
      });
      gsap.to('[data-eco-pulse]', {
        scale: 1.5,
        opacity: 0,
        duration: 3.4,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 0.6,
        delay: 2.6,
      });

      /* ── the sequence: each division takes its turn ──────────────────────── */
      const seq = gsap.timeline({ repeat: -1, delay: 3.4 });
      NODES.forEach((_, i) => {
        const t = i * 1.25;
        seq
          .to(arcs[i], { opacity: 1, strokeWidth: 3.4, duration: 0.4, ease: 'power2.out' }, t)
          .to(arcs[i], { opacity: 0.32, strokeWidth: 2, duration: 1, ease: 'power2.inOut' }, t + 0.55)
          .to(tiles[i], { scale: 1.1, duration: 0.45, ease: 'power2.out' }, t + 0.2)
          .to(tiles[i], { scale: 1, duration: 0.8, ease: 'power2.inOut' }, t + 0.65)
          .to(halos[i], { opacity: 1, duration: 0.45, ease: 'power2.out' }, t + 0.2)
          .to(halos[i], { opacity: 0, duration: 1, ease: 'power2.inOut' }, t + 0.7);
      });
      seq.to({}, { duration: 0.7 });

      /* ── scroll parallax on the whole stage ──────────────────────────────── */
      gsap.to(svg, {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: svg, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      /* ── pointer depth (fine pointers only) ──────────────────────────────── */
      if (window.matchMedia('(pointer: fine)').matches) {
        const near = svg.querySelector('[data-eco-near]');
        const far = svg.querySelector('[data-eco-far]');
        if (near && far) {
          const nx = gsap.quickTo(near, 'x', { duration: 0.9, ease: 'power3.out' });
          const ny = gsap.quickTo(near, 'y', { duration: 0.9, ease: 'power3.out' });
          const fx = gsap.quickTo(far, 'x', { duration: 1.3, ease: 'power3.out' });
          const fy = gsap.quickTo(far, 'y', { duration: 1.3, ease: 'power3.out' });
          const onMove = (e: PointerEvent) => {
            const r = svg.getBoundingClientRect();
            const dx = (e.clientX - r.left) / r.width - 0.5;
            const dy = (e.clientY - r.top) / r.height - 0.5;
            nx(dx * 16);
            ny(dy * 16);
            fx(dx * -7);
            fy(dy * -7);
          };
          window.addEventListener('pointermove', onMove, { passive: true });
          return () => window.removeEventListener('pointermove', onMove);
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 380 380"
      fill="none"
      className={className}
      role="img"
      aria-label="The six OneSpheree divisions connected around a central hub"
    >
      <defs>
        <radialGradient id="hub-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
          <stop offset="45%" stopColor="var(--violet-500)" stopOpacity=".22" />
          <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hub-core-fill" cx="38%" cy="30%" r="76%">
          <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".9" />
          <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".55" />
          <stop offset="100%" stopColor="var(--violet-700)" stopOpacity=".25" />
        </radialGradient>
      </defs>

      {/* ── far depth layer: field glow and reference rings ── */}
      <g data-eco-far="">
        <circle data-eco-glow="" cx="190" cy="190" r="150" fill="url(#hub-core-glow)" opacity=".75" />
        <circle cx="190" cy="190" r="96" stroke="rgba(255,255,255,.06)" />
        <circle cx="190" cy="190" r="136" stroke="rgba(255,255,255,.05)" strokeDasharray="1 7" />
        <circle cx="190" cy="190" r="170" stroke="rgba(255,255,255,.035)" />
      </g>

      {/* ── near depth layer: the hub and the framework ── */}
      <g data-eco-near="">
        {/* the aperture — six segments, one per division */}
        <g>
          <circle data-eco-pulse="" cx="190" cy="190" r="66" stroke="var(--violet-400)" strokeOpacity=".35" opacity=".5" />
          {ARCS.map((d, i) => (
            <path
              key={cards[i].slug}
              data-eco-arc=""
              d={d}
              stroke={cards[i].accent.base}
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".32"
            />
          ))}
          <g data-eco-core="">
            <circle cx="190" cy="190" r="46" fill="url(#hub-core-fill)" />
            <circle cx="190" cy="190" r="46" stroke="rgba(255,255,255,.22)" />
            <circle cx="190" cy="190" r="31" stroke="rgba(255,255,255,.14)" strokeDasharray="2 6" />
            {/* SVG font sizes are user units, so they scale with the stage —
                stepped down once the diagram is at full width so the mark
                stays ~12-15px on screen at every breakpoint */}
            <text
              x="190"
              y="193.5"
              textAnchor="middle"
              fill="#fff"
              fillOpacity=".92"
              className="font-mono font-medium tracking-[.06em] [font-size:12.5px] sm:[font-size:10.5px]"
            >
              ONESPHEREE
            </text>
          </g>
        </g>

        {/* the framework — fixed, breathing, growing outward */}
        <g data-eco-field="">
          <g data-eco-spin="">
            <path data-eco-hex="" d={HEX} stroke="rgba(255,255,255,.1)" strokeWidth="1.2" pathLength={100} strokeDasharray="100" />

            {NODES.map((n, i) => (
              <g key={`conn-${cards[i].slug}`}>
                {/* the persistent hairline — the structure is always connected */}
                <path
                  data-eco-conn=""
                  d={`M${n.ix} ${n.iy}L${n.ox} ${n.oy}`}
                  stroke={cards[i].accent.base}
                  strokeOpacity=".28"
                  strokeWidth="1.2"
                  pathLength={100}
                  strokeDasharray="100"
                />
                {/* the live growth path — reaches out and draws back */}
                <path
                  data-eco-grow=""
                  d={`M${n.ix} ${n.iy}L${n.ox} ${n.oy}`}
                  stroke={cards[i].accent.base}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="100"
                  strokeDashoffset={100}
                />
                <path
                  data-eco-bead=""
                  d={`M${n.ix} ${n.iy}L${n.ox} ${n.oy}`}
                  stroke={cards[i].accent.glow}
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="12 100"
                  strokeDashoffset={112}
                  opacity="0"
                />
              </g>
            ))}

            {/* branch spurs — the offshoots that make it read as grown */}
            {SPURS.map((s) => (
              <path
                key={`spur-${s.x1}-${s.y1}-${s.x2}`}
                data-eco-spur=""
                d={`M${s.x1} ${s.y1}L${s.x2} ${s.y2}`}
                stroke={cards[s.i].accent.glow}
                strokeWidth="1.1"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100"
                strokeDashoffset={100}
                opacity="0"
              />
            ))}

            {NODES.map((n, i) => (
              <g key={`mod-${cards[i].slug}`} data-eco-mod="" transform={`translate(${n.cx} ${n.cy})`}>
                <rect
                  data-eco-halo=""
                  x="-30"
                  y="-30"
                  width="60"
                  height="60"
                  rx="18"
                  fill={cards[i].accent.soft}
                  opacity="0"
                />
                <rect
                  data-eco-tile=""
                  x="-23"
                  y="-23"
                  width="46"
                  height="46"
                  rx="13"
                  fill="rgba(255,255,255,.05)"
                  stroke={cards[i].accent.base}
                  strokeOpacity=".55"
                  strokeWidth="1.2"
                />
                <g data-eco-glyph="" transform="translate(-9 -9)">
                  <path
                    d={GLYPHS[i]}
                    stroke={cards[i].accent.glow}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <text
                  data-eco-label=""
                  y="39"
                  textAnchor="middle"
                  fill="#fff"
                  fillOpacity=".62"
                  className="font-mono tracking-[.08em] [font-size:12px] sm:[font-size:10.5px]"
                >
                  {cards[i].short}
                </text>
              </g>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
