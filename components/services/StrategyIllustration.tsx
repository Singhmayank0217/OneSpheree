'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sales & Consulting hero artwork — the visual signature of the page: a
 * STRATEGY BLUEPRINT that reads as an executive planning surface rather than a
 * technology dashboard. Deliberately not the orbiting-network archetype used by
 * the other service pages.
 *
 * What it says, in order of legibility:
 * • three interconnected business pillars rise from a shared plinth, each built
 *   from modular consulting-framework bands — the growth staircase;
 * • an intelligently routed growth pathway climbs the pillars in orthogonal
 *   runs, with a glowing data stream travelling it continuously;
 * • a decision node crowns each pillar and activates in sequence, lighting the
 *   framework band beneath it — strategic decision making, step by step;
 * • the route resolves into a market marker at the top right that emits
 *   expanding market rings — expansion as the outcome, not decoration;
 * • floating strategy cards and a framework block set assembling in the corner
 *   carry the consulting-deliverable language;
 * • a faint blueprint grid with registration marks holds the whole plan.
 *
 * Motion: a staged GSAP entrance (grid → plinth → pillars on expo.out → routed
 * path drawing → nodes → cards → framework blocks → market marker) chained
 * after the hero copy, then a living ambient loop — breathing glow, sequential
 * node activation with matched pillar lighting, a continuous data stream,
 * expanding market rings, floating cards and blocks, and a slow light sweep.
 * Three parallax depth layers respond to pointer and scroll. Transform/opacity
 * only, paused off-screen, fully disabled under prefers-reduced-motion.
 */

/** Business pillars — x centre, top edge, width; heights read as growth. */
const PILLARS = [
  { cx: 165, top: 420, w: 72 },
  { cx: 275, top: 350, w: 72 },
  { cx: 385, top: 275, w: 72 },
];
const BASE = 520;

/** The routed growth pathway: orthogonal runs across each pillar top, rounded
 *  corners, resolving into the market marker at the top right. */
const ROUTE =
  'M96 520V434a14 14 0 0114-14h77a14 14 0 0014-14v-42a14 14 0 0114-14h82a14 14 0 0014-14v-47a14 14 0 0114-14h82a14 14 0 0014-14v-47a14 14 0 0114-14h65';

/** Consulting framework blocks that assemble into a 2×2 module set. */
const BLOCKS = [
  { x: 462, y: 396, from: { x: -26, y: 22 } },
  { x: 534, y: 396, from: { x: 26, y: 20 } },
  { x: 462, y: 462, from: { x: -22, y: -18 } },
  { x: 534, y: 462, from: { x: 24, y: -22 } },
];

export function StrategyIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // ── entrance: the plan draws itself, chained after the hero buttons ──
      const enter = gsap.timeline({ delay: 0.45, defaults: { ease: 'power3.out' } });
      enter
        .from('[data-sx-grid]', { opacity: 0, scale: 0.96, duration: 1, transformOrigin: '50% 50%' }, 0)
        .from('[data-sx-mark]', { opacity: 0, duration: 0.6, stagger: 0.07 }, 0.15)
        .from('[data-sx-glow]', { opacity: 0, duration: 1 }, 0.1)
        .from('[data-sx-plinth]', { scaleX: 0, duration: 0.9, ease: 'expo.out', transformOrigin: '50% 50%' }, 0.25)
        .from('[data-sx-pillar]', { scaleY: 0, duration: 1.1, ease: 'expo.out', stagger: 0.13, transformOrigin: '50% 100%' }, 0.35)
        .from('[data-sx-band]', { opacity: 0, duration: 0.5, stagger: 0.04 }, 0.7)
        .from('[data-sx-route]', { strokeDashoffset: 100, duration: 1.4, ease: 'power2.inOut' }, 0.7)
        .from('[data-sx-card]', { opacity: 0, x: -28, y: 18, duration: 0.9, stagger: 0.13, ease: 'expo.out' }, 0.85)
        .from('[data-sx-node]', { opacity: 0, scale: 0, duration: 0.7, ease: 'back.out(1.8)', stagger: 0.16, transformOrigin: '50% 50%' }, 1.05)
        .from('[data-sx-blockline]', { opacity: 0, duration: 0.5 }, 1.1)
        .from('[data-sx-block]', {
          opacity: 0,
          scale: 0.55,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.09,
          transformOrigin: '50% 50%',
          x: (i: number) => BLOCKS[i]?.from.x ?? 0,
          y: (i: number) => BLOCKS[i]?.from.y ?? 0,
        }, 1.15)
        .from('[data-sx-marker]', { opacity: 0, scale: 0.4, duration: 0.8, ease: 'back.out(1.6)', transformOrigin: '50% 50%' }, 1.45);

      // ── ambient: the living strategy surface (paused off-screen) ─────────
      const amb = gsap.timeline({ paused: true });
      amb.add('loop', 0);

      // breathing plan glow
      amb.to('[data-sx-glow]', { scale: 1.08, opacity: '+=0.05', duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 'loop');

      // the growth pathway carries a continuous data stream
      amb.to('[data-sx-stream]', { strokeDashoffset: -60, duration: 2.6, ease: 'none', repeat: -1 }, 'loop');

      // sequential decision activation — node ring flashes, its pillar lights,
      // one step at a time, on a shared 4.8s cycle.
      const CYCLE = 4.8;
      gsap.utils.toArray<SVGElement>('[data-sx-ring]').forEach((ring, i) => {
        amb.fromTo(ring,
          { scale: 0.5, opacity: 0.7 },
          { scale: 2.1, opacity: 0, duration: 1.2, ease: 'power2.out', repeat: -1, repeatDelay: CYCLE - 1.2, delay: i * 0.95, transformOrigin: '50% 50%' },
          'loop');
      });
      gsap.utils.toArray<SVGElement>('[data-sx-core]').forEach((core, i) => {
        amb.to(core,
          { opacity: 1, duration: 0.5, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: CYCLE - 1, delay: i * 0.95 },
          'loop');
      });
      gsap.utils.toArray<SVGElement>('[data-sx-lit]').forEach((lit, i) => {
        amb.to(lit,
          { opacity: 0.85, duration: 0.6, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: CYCLE - 1.2, delay: i * 0.95 },
          'loop');
      });

      // expanding market rings at the expansion marker
      gsap.utils.toArray<SVGElement>('[data-sx-wave]').forEach((wave, i) => {
        amb.fromTo(wave,
          { scale: 0.35, opacity: 0.55 },
          { scale: 1, opacity: 0, duration: 3.6, ease: 'power1.out', repeat: -1, delay: i * 1.2, transformOrigin: '50% 50%' },
          'loop');
      });

      // strategy cards and framework blocks drift on their own cadence
      gsap.utils.toArray<SVGElement>('[data-sx-float]').forEach((p, i) => {
        amb.to(p, { y: i % 2 ? 9 : -9, duration: 3.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 'loop');
      });

      // slow diagonal light sweep across the plan
      amb.fromTo('[data-sx-sweep]',
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 3.6, ease: 'sine.inOut', repeat: -1, repeatDelay: 5.5 },
        'loop');

      // gentle whole-illustration float + start ambient once it settles in
      gsap.to(el, { y: -10, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      enter.eventCallback('onComplete', () => amb.play());
      // safety: also let ambient run if the entrance is interrupted
      gsap.delayedCall(3, () => amb.play());

      // pause the ambient loop when the hero is scrolled away
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? amb.play() : amb.pause()),
      });

      // scroll parallax on the whole illustration
      gsap.to(el, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      // ── layered pointer parallax: blueprint / structure / plan ───────────
      if (window.matchMedia('(pointer: fine)').matches) {
        const layer = (sel: string, dur: number) => ({
          x: gsap.quickTo(sel, 'x', { duration: dur, ease: 'power3.out' }),
          y: gsap.quickTo(sel, 'y', { duration: dur, ease: 'power3.out' }),
        });
        const far = layer('[data-sx-far]', 1.2);
        const mid = layer('[data-sx-mid]', 0.95);
        const near = layer('[data-sx-near]', 0.75);
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          far.x(dx * -9); far.y(dy * -9);
          mid.x(dx * 7); mid.y(dy * 7);
          near.x(dx * 17); near.y(dy * 17);
        };
        const onLeave = () => {
          far.x(0); far.y(0); mid.x(0); mid.y(0); near.x(0); near.y(0);
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        };
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="sx-glow-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".7" />
            <stop offset="55%" stopColor="var(--violet-500)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sx-pillar-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".38" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".07" />
          </linearGradient>
          <linearGradient id="sx-card-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".2" />
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="sx-sweep-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity=".07" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── far layer: the blueprint the plan is drawn on ───────────────── */}
        <g data-sx-far="">
          <circle data-sx-glow="" cx="300" cy="380" r="290" fill="url(#sx-glow-g)" opacity=".22" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

          <g data-sx-grid="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <g stroke="rgba(255,255,255,.045)">
              {Array.from({ length: 14 }, (_, i) => (
                <path key={`v${i}`} d={`M${56 + i * 40} 56V584`} />
              ))}
              {Array.from({ length: 14 }, (_, i) => (
                <path key={`h${i}`} d={`M56 ${56 + i * 40}H584`} />
              ))}
            </g>
            <rect x="56" y="56" width="528" height="528" stroke="rgba(255,255,255,.08)" strokeDasharray="3 9" />
          </g>

          {/* registration marks — a drawing under revision */}
          <g data-sx-mark="" stroke="var(--violet-300)" strokeWidth="1.25" opacity=".5">
            <path d="M40 68V40h28M600 68V40h-28M40 572v28h28M600 572v28h-28" />
          </g>
        </g>

        {/* ── mid layer: the structure — pillars and framework modules ────── */}
        <g data-sx-mid="">
          {/* shared plinth: one business, three pillars */}
          <rect data-sx-plinth="" x="104" y="520" width="342" height="11" rx="5.5" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

          {PILLARS.map((p, i) => {
            const h = BASE - p.top;
            const x = p.cx - p.w / 2;
            // modular consulting bands stacked inside each pillar
            const bands = Math.max(1, Math.round(h / 34) - 1);
            return (
              <g key={i} data-sx-pillar="" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
                <rect x={x} y={p.top} width={p.w} height={h} rx="10" fill="url(#sx-pillar-g)" stroke="rgba(255,255,255,.24)" />
                {/* the framework band that lights when this decision activates */}
                <rect data-sx-lit="" x={x + 8} y={p.top + 12} width={p.w - 16} height="20" rx="6" fill="var(--violet-400)" opacity=".12" />
                {Array.from({ length: bands }, (_, b) => (
                  <path key={b} data-sx-band="" d={`M${x} ${p.top + 40 + b * 34}h${p.w}`} stroke="rgba(255,255,255,.13)" strokeWidth="1" />
                ))}
                <path d={`M${x + 14} ${BASE - 14}h${p.w - 28}`} stroke="rgba(255,255,255,.16)" strokeWidth="1" />
              </g>
            );
          })}

          {/* consulting framework blocks assembling into a module set */}
          <g data-sx-blockline="" stroke="rgba(255,255,255,.16)" strokeWidth="1">
            <path d="M524 423h10M524 489h10M493 450v12M565 450v12M448 423h14" />
          </g>
          {BLOCKS.map((b, i) => (
            <g key={i} data-sx-block="" data-sx-float="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect x={b.x} y={b.y} width="62" height="54" rx="10" fill="url(#sx-card-g)" stroke="rgba(255,255,255,.22)" />
              <path d={`M${b.x + 12} ${b.y + 18}h26M${b.x + 12} ${b.y + 28}h38M${b.x + 12} ${b.y + 38}h20`} stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx={b.x + 50} cy={b.y + 14} r="3" fill="var(--violet-300)" opacity={i === 0 ? '.9' : '.4'} />
            </g>
          ))}
        </g>

        {/* ── near layer: the plan itself ─────────────────────────────────── */}
        <g data-sx-near="">
          {/* floating strategy cards */}
          <g data-sx-card="" data-sx-float="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <rect x="74" y="92" width="152" height="88" rx="14" fill="url(#sx-card-g)" stroke="rgba(255,255,255,.24)" />
            <path d="M92 118h44" stroke="var(--violet-300)" strokeWidth="3" strokeLinecap="round" />
            <path d="M92 134h108M92 148h84M92 162h60" stroke="rgba(255,255,255,.24)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="204" cy="114" r="9" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" />
            <path d="M200 114l3 3 6-7" stroke="var(--violet-300)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g data-sx-card="" data-sx-float="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <rect x="200" y="186" width="138" height="72" rx="12" fill="url(#sx-card-g)" stroke="rgba(255,255,255,.2)" />
            <path d="M216 208h38" stroke="var(--blue-300)" strokeWidth="3" strokeLinecap="round" />
            <path d="M216 224h96M216 238h64" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeLinecap="round" />
            <path d="M296 208l8-9 5 5 9-12" stroke="var(--blue-300)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* the routed growth pathway + its glowing data stream */}
          <path
            data-sx-route=""
            d={ROUTE}
            stroke="var(--violet-400)"
            strokeWidth="2.25"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100 100"
            opacity=".85"
            style={{ filter: 'drop-shadow(0 0 5px color-mix(in srgb, var(--violet-500) 65%, transparent))' }}
          />
          <path data-sx-stream="" d={ROUTE} stroke="#fff" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="3 27" opacity=".85" />

          {/* decision nodes crowning each pillar — activated in sequence */}
          {PILLARS.map((p, i) => (
            <g key={i} transform={`translate(${p.cx} ${p.top})`}>
              <circle data-sx-ring="" r="15" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              <g data-sx-node="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <rect x="-13" y="-13" width="26" height="26" rx="7" transform="rotate(45)" fill="color-mix(in srgb, var(--violet-500) 45%, #0a0f1c)" stroke="rgba(255,255,255,.45)" />
                <circle data-sx-core="" r="4" fill="var(--violet-200)" opacity=".45" />
              </g>
            </g>
          ))}

          {/* market marker — where the plan lands, emitting expansion rings */}
          <g transform="translate(505 200)">
            {[0, 1, 2].map((i) => (
              <circle key={i} data-sx-wave="" r="64" fill="none" stroke="var(--blue-300)" strokeWidth="1.25" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            ))}
            <g data-sx-marker="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle r="21" fill="color-mix(in srgb, var(--blue-500) 26%, transparent)" stroke="rgba(255,255,255,.4)" />
              <circle r="12" fill="none" stroke="var(--blue-300)" strokeWidth="1.4" />
              <path d="M-12 0h24M0-12c5 5.5 5 18.5 0 24-5-5.5-5-18.5 0-24" fill="none" stroke="var(--blue-300)" strokeWidth="1.15" />
            </g>
          </g>

          {/* slow diagonal light sweep */}
          <g transform="rotate(18 320 320)">
            <rect data-sx-sweep="" x="210" y="-160" width="220" height="960" fill="url(#sx-sweep-g)" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
