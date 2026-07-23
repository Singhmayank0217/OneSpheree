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

const PHASES = [
  { label: 'SUPPLY', x: 0, w: 116 },
  { label: 'INSTALL', x: 84, w: 172 },
  { label: 'TEST', x: 208, w: 96 },
  { label: 'COMMISSION', x: 268, w: 112 },
];

/**
 * Installation — composition E (workflow-rail archetype, site-programme
 * artwork): Supply → Installation → Testing → Commissioning IS a sequence,
 * so the stages sit as nodes on a vertical rail that draws itself while a
 * signal travels down; opposite (sticky) a PROGRAMME OF WORKS chart — four
 * overlapping phase bars that extend on scroll with week gridlines and a
 * handover marker. Engineering documentation, not marketing.
 */
export function InstallationSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const rail = railRef.current;
      if (rail) {
        gsap.fromTo(
          '[data-in-railline]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: '50% 0%', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
        gsap.fromTo(
          '[data-in-signal]',
          { top: '0%' },
          { top: '97%', ease: 'none', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
      }
      gsap.fromTo(
        '[data-in-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.35,
          ease: 'none',
          transformOrigin: '0 50%',
          scrollTrigger: { trigger: '[data-in-chart]', start: 'top 78%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-in-handover]',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '[data-in-chart]', start: 'top 55%', end: 'center 45%', scrub: 0.8 } }
      );
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
            'radial-gradient(55% 45% at 85% 45%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* narrative + delivery rail */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[13ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[48ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>

            <div ref={railRef} className="relative mt-4 pl-2">
              <span aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[rgba(255,255,255,.12)]" />
              <span data-in-railline="" aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[var(--violet-400)]" />
              <span
                data-in-signal=""
                aria-hidden="true"
                className="absolute left-[26px] top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[var(--violet-300)]"
                style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--violet-300) 80%, transparent)' }}
              />
              <Reveal stagger="text">
                {section.items.map((item, i) => (
                  <div key={item.label} className="relative flex items-center gap-4 py-3">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.22)] bg-[#100d0c] text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={16} />
                    </span>
                    <div>
                      <span className="font-medium text-ondark">{item.label}</span>
                      <span className="ml-2 font-mono text-[10px] text-ondark-muted opacity-60">STAGE {i + 1}</span>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* sticky programme of works */}
          <Reveal y={40} className="lg:sticky lg:top-[16vh] lg:self-start">
            <div
              data-in-chart=""
              aria-hidden="true"
              className="mx-auto w-full max-w-[420px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[2px] text-ondark-muted">PROGRAMME OF WORKS</span>
                <span className="font-mono text-[10px] text-ondark-muted opacity-60">WKS 1–12</span>
              </div>
              <svg viewBox="0 0 400 190" fill="none" className="mt-3 w-full">
                {/* week gridlines */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <path key={i} d={`M${10 + i * 63.3} 8v150`} stroke="rgba(255,255,255,.07)" />
                ))}
                {/* phase bars */}
                {PHASES.map((p, i) => (
                  <g key={p.label} transform={`translate(${10 + p.x} ${22 + i * 36})`}>
                    <rect width={p.w} height="16" rx="8" fill="rgba(255,255,255,.08)" />
                    <rect
                      data-in-bar=""
                      width={p.w}
                      height="16"
                      rx="8"
                      fill={i === 3 ? 'var(--violet-500)' : 'color-mix(in srgb, var(--blue-500) 45%, transparent)'}
                    />
                    <text x={p.w + 8} y="12" fill="rgba(255,255,255,.45)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">
                      {p.label}
                    </text>
                  </g>
                ))}
                {/* handover marker */}
                <g data-in-handover="" transform="translate(390 8)">
                  <path d="M0 0v150" stroke="var(--violet-300)" strokeWidth="1.5" strokeDasharray="3 5" />
                  <path d="M-6 158l6 6 6-6" stroke="var(--violet-300)" strokeWidth="1.5" fill="none" />
                </g>
              </svg>
              <div data-in-handover="" className="mt-2 text-right font-mono text-[10px] tracking-[2px] text-[var(--violet-300)]">
                HANDOVER
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
