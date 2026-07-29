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

const NODES = [
  { icon: 'calendar', label: 'ATTENDANCE', x: 70 },
  { icon: 'layoutGrid', label: 'PLANNING', x: 250 },
  { icon: 'gauge', label: 'PERFORMANCE', x: 430 },
  { icon: 'messageCircle', label: 'HR', x: 610 },
];

/**
 * Workforce Management — composition F (wide-banner archetype, workforce-ops
 * artwork): the section opens with a full-width CONNECTED-OPS diagram —
 * attendance ⇄ planning ⇄ performance ⇄ HR as linked operations nodes with
 * signal continuously flowing between them and an HR feedback loop that draws
 * on scroll — followed by the two-column editorial row and the operations as a
 * joined hairline tile grid. Connected workforce operations, not a dashboard.
 */
export function WorkforceMgmtSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-wm-node]',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          ease: 'back.out(1.5)',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: '[data-wm-stack]', start: 'top 82%', end: 'center 55%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-wm-loop]',
        { strokeDashoffset: 220 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-wm-stack]', start: 'top 70%', end: 'center 50%', scrub: 0.8 } }
      );

      // living-system ambient — the ops signal keeps flowing between nodes
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-wm-link]', { strokeDashoffset: -48, duration: 2, ease: 'none', repeat: -1 }, 0);
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
        {/* connected workforce-ops diagram */}
        <Reveal y={40}>
          <div data-wm-stack="" aria-hidden="true" className="mx-auto max-w-[900px]">
            <svg viewBox="0 0 680 180" fill="none" className="w-full">
              {/* links between nodes */}
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  data-wm-link=""
                  d={`M${NODES[i].x + 34} 70 H${NODES[i + 1].x - 34}`}
                  stroke="var(--violet-500)"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  opacity=".75"
                />
              ))}
              {/* HR feedback loop (HR → attendance) */}
              <path
                data-wm-loop=""
                d={`M${NODES[3].x} 104 C ${NODES[3].x} 156 ${NODES[0].x} 156 ${NODES[0].x} 104`}
                stroke="var(--blue-300)"
                strokeWidth="1.5"
                strokeDasharray="220 220"
                pathLength={220}
                opacity=".6"
              />
              <text x="340" y="172" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">SYNCED WORKFORCE OPERATIONS</text>

              {/* operations nodes */}
              {NODES.map((n) => (
                <g key={n.label} data-wm-node="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <rect x={n.x - 34} y="42" width="68" height="56" rx="12" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" />
                  <foreignObject x={n.x - 12} y="52" width="24" height="24">
                    <div className="flex h-6 w-6 items-center justify-center text-[var(--violet-300)]">
                      <ServiceIcon name={n.icon} size={20} />
                    </div>
                  </foreignObject>
                  <text x={n.x} y="120" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">{n.label}</text>
                </g>
              ))}
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

        {/* operations — joined tile grid */}
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
