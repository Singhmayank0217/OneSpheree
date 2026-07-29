'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { ServiceSectionContent } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/** The growth arc opportunities are converted onto. */
const ARC = 'M24 166C160 152 230 116 330 96 440 74 560 52 656 36';
/** Where a qualified opportunity docks as a long-term client relationship. */
const CLIENTS = [
  { x: 190.5, y: 133 },
  { x: 330, y: 96 },
  { x: 498, y: 64 },
];
/** Opportunity signals rising off the horizon — two never convert. */
const SIGNALS = [
  { x: 96, rise: 34 },
  { x: 190.5, rise: 23, client: 0 },
  { x: 330, rise: 60, client: 1 },
  { x: 498, rise: 92, client: 2 },
  { x: 604, rise: 44 },
];

/**
 * Business Development — composition F (wide-banner archetype, opportunity
 * artwork): the section opens on a full-width OPPORTUNITY HORIZON — signals
 * rise off the horizon line, the ones worth pursuing are qualified by a ring
 * and dock onto a growth arc as long-term client relationships, the arc drawing
 * across the banner as the section arrives. The editorial row and a joined
 * capability grid follow. Opportunity turned into relationship turned into
 * growth — the actual job of business development.
 */
export function BusinessDevSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bd-arc]',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-bd-banner]', start: 'top 82%', end: 'center 52%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bd-client]',
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.14, ease: 'back.out(1.6)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-bd-banner]', start: 'top 74%', once: true } }
      );

      // living-system ambient — the horizon keeps producing opportunities.
      const amb = gsap.timeline({ paused: true });
      gsap.utils.toArray<SVGElement>('[data-bd-signal]').forEach((s, i) => {
        const rise = Number(s.dataset.rise ?? 40);
        amb.fromTo(s,
          { y: 0, opacity: 0, scale: 0.6 },
          { keyframes: [
              { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
              { y: -rise, duration: 2.4, ease: 'power1.inOut' },
              { opacity: s.dataset.client ? 0 : 0, duration: 0.8, ease: 'power1.in' },
            ],
            repeat: -1, repeatDelay: 1.6, delay: i * 0.62, transformOrigin: '50% 50%' },
          0);
      });
      // qualification rings flash as each signal lands on the arc
      gsap.utils.toArray<SVGElement>('[data-bd-ring]').forEach((r, i) => {
        amb.fromTo(r,
          { scale: 0.4, opacity: 0.65 },
          { scale: 1.9, opacity: 0, duration: 1.5, ease: 'power2.out', repeat: -1, repeatDelay: 3.5, delay: 1.6 + i * 0.62, transformOrigin: '50% 50%' },
          0);
      });
      amb.to('[data-bd-stream]', { strokeDashoffset: -40, duration: 2.8, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-bd-glow]', { scale: 1.07, opacity: '+=0.05', duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={section.id}
      aria-label={section.headline}
      className="relative overflow-hidden bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 0%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        {/* opportunity horizon */}
        <Reveal y={40}>
          <div data-bd-banner="" aria-hidden="true" className="mx-auto max-w-[900px]">
            <svg viewBox="0 0 680 200" fill="none" className="w-full">
              <defs>
                <radialGradient id="bd-glow-g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".34" />
                  <stop offset="65%" stopColor="var(--violet-500)" stopOpacity=".09" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bd-client-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".3" />
                  <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".12" />
                </linearGradient>
              </defs>

              <ellipse data-bd-glow="" cx="356" cy="102" rx="318" ry="96" fill="url(#bd-glow-g)" opacity=".55" />

              {/* the horizon opportunities rise from */}
              <path d="M20 156H660" stroke="rgba(255,255,255,.14)" />
              <g stroke="rgba(255,255,255,.07)">
                {Array.from({ length: 17 }, (_, i) => (
                  <path key={i} d={`M${28 + i * 39} 156v8`} />
                ))}
              </g>

              {/* rising opportunity signals */}
              {/* the horizon placement lives on the outer group so the animated
                  inner one owns its transform outright */}
              {SIGNALS.map((s, i) => (
                <g key={i} transform={`translate(${s.x} 150)`}>
                  <g data-bd-signal="" data-rise={s.rise} data-client={s.client !== undefined ? '1' : undefined} opacity="0">
                    <rect x="-6" y="-6" width="12" height="12" rx="3" transform="rotate(45)" fill="none" stroke={s.client !== undefined ? 'var(--violet-300)' : 'rgba(255,255,255,.35)'} strokeWidth="1.5" />
                  </g>
                </g>
              ))}

              {/* growth arc — static rail, drawn progress, travelling stream */}
              <path d={ARC} stroke="rgba(255,255,255,.1)" strokeWidth="2" />
              <path
                data-bd-arc=""
                d={ARC}
                stroke="var(--violet-400)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100 100"
                style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--violet-500) 55%, transparent))' }}
              />
              <path data-bd-stream="" d={ARC} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 25" opacity=".75" />

              {/* qualified opportunities docked as client relationships */}
              {CLIENTS.map((c, i) => (
                <g key={i} transform={`translate(${c.x} ${c.y})`}>
                  <circle data-bd-ring="" r="20" fill="none" stroke="var(--blue-300)" strokeWidth="1.4" opacity="0" />
                  <g data-bd-client="">
                    <rect x="-23" y="-18" width="46" height="36" rx="10" fill="url(#bd-client-g)" stroke="rgba(255,255,255,.3)" />
                    <path d="M-11 7V-4l11-6 11 6V7z" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinejoin="round" />
                    <path d="M-4 7V1h8v6" fill="none" stroke="var(--violet-300)" strokeWidth="1.1" />
                  </g>
                </g>
              ))}

              <text x="340" y="192" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">
                OPPORTUNITY → RELATIONSHIP → GROWTH
              </text>
            </svg>
          </div>
        </Reveal>

        {/* editorial row */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[13ch]" />
          </div>
          <Reveal delay={0.15} className="lg:pt-10">
            <p className="max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        {/* focus areas — joined tile grid */}
        <Reveal>
          <p className="t-micro mt-10 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mt-3 grid gap-px overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-dark p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_16%,transparent)] text-[var(--violet-300)]">
                <ServiceIcon name={item.icon} size={17} />
              </span>
              <span className="font-medium text-ondark">{item.label}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
