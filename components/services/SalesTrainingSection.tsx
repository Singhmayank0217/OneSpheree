'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { ServiceSectionContent } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ── Geometry ──────────────────────────────────────────────────────────────
   Every milestone is placed by measuring the growth curve rather than by eye:
   the cubic is sampled once at module scope into an arc-length table, and the
   milestones are read off it at equal arc-length fractions. Same result on the
   server and the client, and provably on the curve. */

const CURVE = { x0: 44, y0: 282, x1: 160, y1: 274, x2: 232, y2: 124, x3: 416, y3: 96 };
const CURVE_D = `M${CURVE.x0} ${CURVE.y0}C${CURVE.x1} ${CURVE.y1} ${CURVE.x2} ${CURVE.y2} ${CURVE.x3} ${CURVE.y3}`;

type Pt = { x: number; y: number };

const cubicAt = (t: number): Pt => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return {
    x: a * CURVE.x0 + b * CURVE.x1 + c * CURVE.x2 + d * CURVE.x3,
    y: a * CURVE.y0 + b * CURVE.y1 + c * CURVE.y2 + d * CURVE.y3,
  };
};

/** Arc-length table — 600 samples is far finer than a 460-unit canvas needs. */
const LUT = (() => {
  const pts: Pt[] = [];
  const acc: number[] = [0];
  let total = 0;
  for (let i = 0; i <= 600; i++) {
    const p = cubicAt(i / 600);
    pts.push(p);
    if (i > 0) {
      total += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
      acc.push(total);
    }
  }
  return { pts, acc, total };
})();

/** Point at a fraction of the curve's *length* (not of its parameter). */
const atLength = (frac: number): Pt => {
  const target = LUT.total * Math.min(Math.max(frac, 0), 1);
  const i = LUT.acc.findIndex((l) => l >= target);
  if (i <= 0) return LUT.pts[0];
  const span = LUT.acc[i] - LUT.acc[i - 1];
  const k = span === 0 ? 0 : (target - LUT.acc[i - 1]) / span;
  const a = LUT.pts[i - 1], b = LUT.pts[i];
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
};

/** Five equally spaced stops: four coaching milestones, then the summit. */
const STOPS = [0.08, 0.31, 0.54, 0.77, 1];
const MILESTONES = STOPS.map(atLength);

/** Unit tangent at a length fraction, by central difference on the table. */
const tangentAt = (frac: number): Pt => {
  const a = atLength(Math.max(frac - 0.004, 0));
  const b = atLength(Math.min(frac + 0.004, 1));
  const dx = b.x - a.x, dy = b.y - a.y;
  const m = Math.hypot(dx, dy) || 1;
  return { x: dx / m, y: dy / m };
};

/* ── Glass cards ───────────────────────────────────────────────────────────
   Both cards are the same size and each is pushed off its milestone along the
   curve's *normal* by the same distance, attaching at the centre of the edge
   that faces the curve. Two consequences hold by construction rather than by
   eye: the tethers are exactly equal in length, and each card clears the curve
   by the same amount. Card A rides the upper-left side, card B the lower-right. */
const CARD_W = 152;
const CARD_H = 104;
const CARD_OFFSET = 88;
const PAD = 24;

const anchorFor = (stop: number, side: 1 | -1): Pt => {
  const t = tangentAt(STOPS[stop]);
  const n = { x: -t.y * side, y: t.x * side };
  const m = MILESTONES[stop];
  return { x: m.x + n.x * CARD_OFFSET, y: m.y + n.y * CARD_OFFSET };
};

const A_ANCHOR = anchorFor(0, -1); // upper-left of the curve
const B_ANCHOR = anchorFor(3, 1); // lower-right of the curve
const CARD_A = { x: A_ANCHOR.x - CARD_W / 2, y: A_ANCHOR.y - CARD_H, w: CARD_W, h: CARD_H, anchor: A_ANCHOR, stop: 0 };
const CARD_B = { x: B_ANCHOR.x - CARD_W / 2, y: B_ANCHOR.y, w: CARD_W, h: CARD_H, anchor: B_ANCHOR, stop: 3 };

const tether = (from: Pt, to: Pt) => `M${from.x.toFixed(2)} ${from.y.toFixed(2)}L${to.x.toFixed(2)} ${to.y.toFixed(2)}`;

/** The canvas is fitted to the content with uniform padding, so the piece has
 *  no dead margin on any side and stays balanced at any width. */
const SUMMIT_R = 27;
const BOUNDS = (() => {
  const summit = MILESTONES[4];
  const minX = Math.min(CARD_A.x, CARD_B.x, CURVE.x0);
  const maxX = Math.max(CARD_A.x + CARD_W, CARD_B.x + CARD_W, summit.x + SUMMIT_R);
  const minY = Math.min(CARD_A.y, summit.y - SUMMIT_R, CURVE.y3);
  const maxY = Math.max(CARD_B.y + CARD_H, CURVE.y0);
  return { x: minX - PAD, y: minY - PAD, w: maxX - minX + PAD * 2, h: maxY - minY + PAD * 2 };
})();
const VIEWBOX = `${BOUNDS.x.toFixed(2)} ${BOUNDS.y.toFixed(2)} ${BOUNDS.w.toFixed(2)} ${BOUNDS.h.toFixed(2)}`;
const CENTRE = { x: BOUNDS.x + BOUNDS.w / 2, y: BOUNDS.y + BOUNDS.h / 2 };

/** Milestone glyphs, drawn on a ±9 grid so they centre exactly in their node. */
const GLYPHS = [
  // coaching — a spoken cue
  <g key="coach" fill="none" stroke="var(--violet-200)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-7-5h14a2 2 0 012 2v6a2 2 0 01-2 2H-1l-4 3v-3h-2a2 2 0 01-2-2v-6a2 2 0 012-2z" />
  </g>,
  // negotiation — a balance finding its point
  <g key="negotiate" fill="none" stroke="var(--violet-200)" strokeWidth="1.5" strokeLinecap="round">
    <path d="M0-8v14M-6 6h12M-8-5h16" />
    <path d="M-8-5l-2.5 5a2.6 2.6 0 005 0zM8-5l-2.5 5a2.6 2.6 0 005 0z" strokeWidth="1.2" />
  </g>,
  // relationship — two bound rings
  <g key="relate" fill="none" stroke="var(--violet-200)" strokeWidth="1.5">
    <circle cx="-3.5" cy="0" r="4.5" />
    <circle cx="3.5" cy="0" r="4.5" />
  </g>,
  // performance — a gauge past the midpoint
  <g key="perform" fill="none" stroke="var(--violet-200)" strokeWidth="1.5" strokeLinecap="round">
    <path d="M-7 4a7 7 0 1114 0" />
    <path d="M0 4l4.5-5" />
  </g>,
];

/**
 * Sales Training — composition D (centered-opening archetype). The artwork is a
 * SALES CAPABILITY JOURNEY: a growth curve that draws itself left to right,
 * four coaching milestones that resolve one after another as a glowing
 * indicator travels the path and arrives at each, glass cards for the training
 * modules and the capability index sliding in tethered to the milestone they
 * belong to, and an achievement summit at the curve's end. Once the journey
 * completes the piece settles into a calm ambient state — breathing glow, a
 * very slow float, an occasional light sweep and gentle pointer parallax.
 *
 * Alignment is measured, not eyeballed: milestones are read off an arc-length
 * table of the cubic (see above), so each sits exactly on the curve at equal
 * spacing, and the travelling indicator rides the same path via MotionPath.
 */
export function SalesTrainingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<SVGGElement>('[data-st-node]');
      const halos = gsap.utils.toArray<SVGCircleElement>('[data-st-halo]');
      const path = '[data-st-curve]';

      // ── the journey: one master timeline, played once on arrival ─────────
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '[data-st-art]', start: 'top 78%', once: true },
      });

      const arriveAt = (i: number, at: number) => {
        tl.from(nodes[i], { scale: 0, opacity: 0, duration: 0.55, ease: 'back.out(1.8)' }, at);
        // soft glow + brief highlight as the indicator lands
        tl.fromTo(halos[i], { scale: 0.5, opacity: 0.75 }, { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.out' }, at + 0.12);
        tl.to(nodes[i], { scale: 1.16, duration: 0.28, ease: 'power2.out' }, at + 0.12)
          .to(nodes[i], { scale: 1, duration: 0.5, ease: 'expo.out' }, at + 0.4);
      };

      tl.from('[data-st-glow]', { opacity: 0, duration: 0.9 }, 0)
        .from('[data-st-rail]', { opacity: 0, duration: 0.5 }, 0.1)
        .from('[data-st-curve]', { strokeDashoffset: 100, duration: 1.25, ease: 'expo.out' }, 0.15);

      // milestone 1 + the training-modules card
      arriveAt(0, 1.15);
      tl.from('[data-st-carda]', { opacity: 0, x: -26, y: 12, duration: 0.85, ease: 'expo.out' }, 1.3)
        .from('[data-st-tethera]', { strokeDashoffset: 100, duration: 0.5 }, 1.55)
        .from('[data-st-check]', { opacity: 0, scale: 0, stagger: 0.12, duration: 0.45, ease: 'back.out(2)' }, 1.7)
        .from('[data-st-modulebar]', { scaleX: 0, duration: 0.7, ease: 'power2.out', transformOrigin: '0 50%' }, 2);

      // the indicator sets off and walks the curve, milestone to milestone
      tl.set('[data-st-walker]', { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: STOPS[0], end: STOPS[0] } }, 1.5)
        .fromTo('[data-st-walker]', { opacity: 0 }, { opacity: 1, duration: 0.35 }, 1.55);

      const LEG = 0.75;
      for (let i = 1; i < STOPS.length; i++) {
        const legStart = 1.95 + (i - 1) * (LEG + 0.35);
        tl.to('[data-st-walker]', {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: STOPS[i - 1], end: STOPS[i] },
          duration: LEG,
          ease: 'power2.inOut',
        }, legStart);
        if (i < nodes.length) arriveAt(i, legStart + LEG);
      }

      // the capability card lands with the fourth milestone
      const fourth = 1.95 + 2 * (LEG + 0.35) + LEG;
      tl.from('[data-st-cardb]', { opacity: 0, x: 26, y: -12, duration: 0.85, ease: 'expo.out' }, fourth + 0.1)
        .from('[data-st-tetherb]', { strokeDashoffset: 100, duration: 0.5 }, fourth + 0.35)
        .from('[data-st-seg]', { scaleX: 0, stagger: 0.13, duration: 0.5, ease: 'power2.out', transformOrigin: '0 50%' }, fourth + 0.5)
        .from('[data-st-badge]', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, fourth + 0.95);

      // the summit
      const summit = 1.95 + 3 * (LEG + 0.35) + LEG;
      tl.from('[data-st-summit]', { scale: 0.3, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, summit)
        .fromTo('[data-st-summitring]', { scale: 0.4, opacity: 0.8 }, { scale: 2.4, opacity: 0, duration: 1.2, ease: 'power2.out' }, summit + 0.1)
        .to('[data-st-walker]', { opacity: 0, scale: 1.8, duration: 0.5, ease: 'power2.out' }, summit + 0.05);

      // ── ambient: calm, once the journey has been told ────────────────────
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-st-glow]', { scale: 1.07, opacity: '+=0.05', duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      amb.to('[data-st-drift]', { y: -7, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      amb.to('[data-st-summitglow]', { opacity: 0.5, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      amb.fromTo('[data-st-sweep]',
        { xPercent: -150, opacity: 0 },
        { xPercent: 150, opacity: 1, duration: 3.4, ease: 'sine.inOut', repeat: -1, repeatDelay: 6.5 },
        0);
      tl.eventCallback('onComplete', () => amb.play());
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive && tl.progress() === 1 ? amb.play() : amb.pause()) });

      // gentle pointer parallax — cards and curve on separate depths
      if (window.matchMedia('(pointer: fine)').matches) {
        const art = el.querySelector<HTMLElement>('[data-st-art]');
        if (art) {
          const near = { x: gsap.quickTo('[data-st-near]', 'x', { duration: 1, ease: 'power3.out' }), y: gsap.quickTo('[data-st-near]', 'y', { duration: 1, ease: 'power3.out' }) };
          const far = { x: gsap.quickTo('[data-st-far]', 'x', { duration: 1.3, ease: 'power3.out' }), y: gsap.quickTo('[data-st-far]', 'y', { duration: 1.3, ease: 'power3.out' }) };
          const onMove = (e: MouseEvent) => {
            const r = art.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
            const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
            near.x(dx * 10); near.y(dy * 10);
            far.x(dx * -5); far.y(dy * -5);
          };
          const onLeave = () => { near.x(0); near.y(0); far.x(0); far.y(0); };
          art.addEventListener('mousemove', onMove);
          art.addEventListener('mouseleave', onLeave);
          return () => {
            art.removeEventListener('mousemove', onMove);
            art.removeEventListener('mouseleave', onLeave);
          };
        }
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={section.id} aria-label={section.headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 22% 35%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="text-center">
          <Reveal>
            <p className="flex items-baseline justify-center gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* sales capability journey */}
          <Reveal y={40}>
            <div data-st-art="" aria-hidden="true" className="mx-auto w-full max-w-[440px]">
              <svg viewBox={VIEWBOX} fill="none" className="w-full">
                <defs>
                  <radialGradient id="st-glow-g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".42" />
                    <stop offset="62%" stopColor="var(--violet-500)" stopOpacity=".1" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="st-curve-g" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--blue-400)" />
                    <stop offset="100%" stopColor="var(--violet-400)" />
                  </linearGradient>
                  <linearGradient id="st-glass-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity=".085" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".05" />
                  </linearGradient>
                  <linearGradient id="st-sweep-g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#fff" stopOpacity=".06" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g data-st-drift="">
                  {/* far depth — the field the journey sits in */}
                  <g data-st-far="">
                    <ellipse data-st-glow="" cx={CENTRE.x.toFixed(2)} cy={CENTRE.y.toFixed(2)} rx={(BOUNDS.w / 2).toFixed(2)} ry={(BOUNDS.h / 2).toFixed(2)} fill="url(#st-glow-g)" opacity=".5" />
                    <path data-st-rail="" d={CURVE_D} stroke="rgba(255,255,255,.12)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  {/* near depth — the curve, its milestones and the cards */}
                  <g data-st-near="">
                    {/* the growth curve, drawn left to right */}
                    <path
                      data-st-curve=""
                      d={CURVE_D}
                      stroke="url(#st-curve-g)"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="100 100"
                      style={{ filter: 'drop-shadow(0 0 5px color-mix(in srgb, var(--violet-500) 55%, transparent))' }}
                    />

                    {/* tethers — each card belongs to a milestone */}
                    <path
                      data-st-tethera=""
                      d={tether(CARD_A.anchor, MILESTONES[CARD_A.stop])}
                      stroke="rgba(255,255,255,.28)"
                      strokeWidth="1.25"
                      strokeDasharray="3 5"
                      pathLength={100}
                    />
                    <path
                      data-st-tetherb=""
                      d={tether(CARD_B.anchor, MILESTONES[CARD_B.stop])}
                      stroke="rgba(255,255,255,.28)"
                      strokeWidth="1.25"
                      strokeDasharray="3 5"
                      pathLength={100}
                    />

                    {/* training modules — glass card */}
                    <g data-st-carda="">
                      <rect x={CARD_A.x} y={CARD_A.y} width={CARD_A.w} height={CARD_A.h} rx="14" fill="url(#st-glass-g)" stroke="rgba(255,255,255,.18)" />
                      <path d={`M${CARD_A.x + 16} ${CARD_A.y + 1}h${CARD_A.w - 32}`} stroke="rgba(255,255,255,.22)" strokeWidth="1" />
                      <g transform={`translate(${CARD_A.x + 18} ${CARD_A.y + 22})`} fill="none" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinejoin="round">
                        <path d="M0 0h7l3 3v8H0z" />
                        <path d="M2.5 5h5M2.5 8h3" strokeWidth="1.1" />
                      </g>
                      {/* short labels at a larger size: the canvas is ~516 units
                          wide, so anything smaller reads under 6px on mobile */}
                      <text x={CARD_A.x + 36} y={CARD_A.y + 32} fill="rgba(255,255,255,.66)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.2">
                        MODULES
                      </text>
                      {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(${CARD_A.x + 16} ${CARD_A.y + 44 + i * 16})`}>
                          <rect width="10" height="10" rx="3" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.24)" />
                          <path data-st-check="" d="M2.5 5l2 2 3.5-4" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d={`M18 5h${98 - i * 18}`} stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeLinecap="round" />
                        </g>
                      ))}
                      <rect x={CARD_A.x + 16} y={CARD_A.y + 92} width={CARD_W - 32} height="4" rx="2" fill="rgba(255,255,255,.1)" />
                      <rect data-st-modulebar="" x={CARD_A.x + 16} y={CARD_A.y + 92} width={(CARD_W - 32) * 0.78} height="4" rx="2" fill="var(--violet-400)" />
                    </g>

                    {/* capability index — glass card */}
                    <g data-st-cardb="">
                      <rect x={CARD_B.x} y={CARD_B.y} width={CARD_B.w} height={CARD_B.h} rx="14" fill="url(#st-glass-g)" stroke="rgba(255,255,255,.18)" />
                      <path d={`M${CARD_B.x + 16} ${CARD_B.y + 1}h${CARD_B.w - 32}`} stroke="rgba(255,255,255,.22)" strokeWidth="1" />
                      <g transform={`translate(${CARD_B.x + 24} ${CARD_B.y + 26})`} fill="none" stroke="var(--blue-300)" strokeWidth="1.4">
                        <circle r="7" />
                        <circle r="2.6" />
                      </g>
                      <text x={CARD_B.x + 40} y={CARD_B.y + 31} fill="rgba(255,255,255,.66)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.2">
                        CAPABILITY
                      </text>
                      {[0, 1, 2, 3].map((i) => (
                        <g key={i}>
                          <rect x={CARD_B.x + 16 + i * 31} y={CARD_B.y + 46} width="25" height="6" rx="3" fill="rgba(255,255,255,.1)" />
                          <rect data-st-seg="" x={CARD_B.x + 16 + i * 31} y={CARD_B.y + 46} width="25" height="6" rx="3" fill="var(--violet-400)" opacity={1 - i * 0.14} />
                        </g>
                      ))}
                      <g data-st-badge="" transform={`translate(${CARD_B.x + 31} ${CARD_B.y + 78})`}>
                        <circle r="13" fill="color-mix(in srgb, var(--violet-500) 30%, transparent)" stroke="var(--violet-300)" strokeWidth="1.2" />
                        <path d="M-4.5 0l3 3 6-7" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <path d={`M${CARD_B.x + 54} ${CARD_B.y + 73}h${CARD_W - 84}M${CARD_B.x + 54} ${CARD_B.y + 84}h${CARD_W - 110}`} stroke="rgba(255,255,255,.2)" strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    {/* milestones — read straight off the curve */}
                    {MILESTONES.slice(0, 4).map((m, i) => (
                      <g key={i} transform={`translate(${m.x.toFixed(2)} ${m.y.toFixed(2)})`}>
                        <circle data-st-halo="" r="16" fill="none" stroke="var(--blue-300)" strokeWidth="1.4" opacity="0" />
                        <g data-st-node="">
                          <circle r="16" fill="#0a0f1c" stroke="rgba(255,255,255,.28)" />
                          <circle r="16" fill="color-mix(in srgb, var(--violet-500) 22%, transparent)" />
                          {GLYPHS[i]}
                        </g>
                      </g>
                    ))}

                    {/* the summit — achievement at the end of the curve */}
                    <g transform={`translate(${MILESTONES[4].x.toFixed(2)} ${MILESTONES[4].y.toFixed(2)})`}>
                      <circle data-st-summitring="" r="20" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" opacity="0" />
                      <circle data-st-summitglow="" r="27" fill="color-mix(in srgb, var(--violet-400) 22%, transparent)" opacity=".22" />
                      <g data-st-summit="">
                        <circle r="20" fill="color-mix(in srgb, var(--violet-500) 42%, #0a0f1c)" stroke="var(--violet-300)" strokeWidth="1.4" />
                        <circle r="11" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.2" />
                        <path d="M-5 0l3.5 3.5L6-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </g>

                    {/* the indicator that walks the journey */}
                    <g data-st-walker="" opacity="0">
                      <circle r="9" fill="color-mix(in srgb, var(--blue-300) 28%, transparent)" />
                      <circle r="4" fill="#fff" style={{ filter: 'drop-shadow(0 0 5px var(--blue-300))' }} />
                    </g>
                  </g>

                  {/* occasional light sweep */}
                  <g transform={`rotate(16 ${CENTRE.x.toFixed(2)} ${CENTRE.y.toFixed(2)})`}>
                    <rect
                      data-st-sweep=""
                      x={(CENTRE.x - BOUNDS.w * 0.18).toFixed(2)}
                      y={(BOUNDS.y - BOUNDS.h).toFixed(2)}
                      width={(BOUNDS.w * 0.36).toFixed(2)}
                      height={(BOUNDS.h * 3).toFixed(2)}
                      fill="url(#st-sweep-g)"
                      opacity="0"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Reveal>

          {/* coaching disciplines — dotted leaders */}
          <div>
            <Reveal>
              <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
            <Reveal stagger="text" className="mt-3">
              {section.items.map((item, i) => (
                <div key={item.label} className="flex items-baseline gap-2.5 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 -translate-y-0.5 items-center justify-center rounded-sm text-[var(--violet-300)]">
                    <ServiceIcon name={item.icon} size={16} />
                  </span>
                  {/* min-w-0 (not shrink-0) so the longer coaching labels wrap
                      on narrow viewports instead of pushing the row wide */}
                  <span className="min-w-0 font-medium text-ondark">{item.label}</span>
                  <span aria-hidden="true" className="mx-1 min-w-6 flex-1 self-center border-b border-dotted border-[rgba(255,255,255,.22)]" />
                  <span className="shrink-0 font-mono text-[length:var(--text-caption-size)] text-ondark-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
