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

/**
 * Marketing Automation — composition G: the capability list IS a workflow.
 * Left: the items sit as nodes on a vertical connector rail; the rail draws
 * itself and a signal dot travels down it as the section scrolls. Right
 * (sticky): a connected-systems graph — trigger → branch → actions — whose
 * edges carry continuously flowing dashes. Connected systems, no robots.
 */
export function AutomationSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // rail draws in + signal dot travels it, both scrubbed to the list
      const rail = railRef.current;
      if (rail) {
        gsap.fromTo(
          '[data-au-railline]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: '50% 0%',
            scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 },
          }
        );
        gsap.fromTo(
          '[data-au-signal]',
          { top: '0%' },
          {
            top: '99%',
            ease: 'none',
            scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 },
          }
        );
      }
      // graph edges flow continuously
      gsap.to('[data-au-edge]', { strokeDashoffset: -48, duration: 2, ease: 'none', repeat: -1 });
      // graph breathes gently
      gsap.to('[data-au-graph]', { y: -14, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={section.id}
      aria-label={section.headline}
      className="relative bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 85% 45%, color-mix(in srgb, var(--violet-500) 14%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* narrative + workflow rail */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">
                  {section.index}
                </span>
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
              {/* the connector rail + traveling signal */}
              <span aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[rgba(255,255,255,.12)]" />
              <span
                data-au-railline=""
                aria-hidden="true"
                className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[var(--violet-400)]"
              />
              <span
                data-au-signal=""
                aria-hidden="true"
                className="absolute left-[26px] top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[var(--violet-300)]"
                style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--violet-300) 80%, transparent)' }}
              />
              <Reveal stagger="text">
                {section.items.map((item) => (
                  <div key={item.label} className="relative flex items-center gap-4 py-2.5">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.22)] bg-[#0d1017] text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={16} />
                    </span>
                    <span className="font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* sticky connected-systems graph */}
          <Reveal y={40} className="lg:sticky lg:top-[16vh] lg:self-start">
            <div data-au-graph="" aria-hidden="true" className="mx-auto w-full max-w-[440px]">
              <svg viewBox="0 0 440 420" fill="none" className="w-full">
                {/* edges */}
                <g stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="3 9">
                  <path data-au-edge="" d="M220 78 V 168" />
                  <path data-au-edge="" d="M212 206 C 150 240 120 260 96 300" />
                  <path data-au-edge="" d="M220 210 V 300" />
                  <path data-au-edge="" d="M228 206 C 290 240 320 260 344 300" />
                </g>
                {/* trigger node */}
                <g transform="translate(220 48)">
                  <circle r="30" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1.5" />
                  <path d="M-4 -9 L6 0 L-4 9z" fill="#fff" />
                  <text y="52" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">TRIGGER</text>
                </g>
                {/* branch node */}
                <g transform="translate(220 190)">
                  <rect x="-24" y="-20" width="48" height="40" rx="9" transform="rotate(45)" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.35)" />
                  <text x="52" y="5" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">BRANCH</text>
                </g>
                {/* action nodes */}
                {[
                  { x: 96, icon: 'M-7 -4 h14 v9 h-14z M-7 -4 l7 5 7 -5' },
                  { x: 220, icon: 'M-6 5 a6.5 6.5 0 1 1 12 0z M0 5 v3' },
                  { x: 344, icon: 'M-6 -6 h12 v12 h-12z M-2 -2 h4 v4 h-4z' },
                ].map((n, i) => (
                  <g key={i} transform={`translate(${n.x} 330)`}>
                    <circle r="26" fill="rgba(255,255,255,.05)" stroke={i === 1 ? 'var(--blue-300)' : 'rgba(255,255,255,.3)'} strokeWidth="1.5" />
                    <path d={n.icon} stroke={i === 1 ? 'var(--blue-300)' : 'rgba(255,255,255,.7)'} strokeWidth="1.75" fill="none" strokeLinejoin="round" />
                  </g>
                ))}
                <text x="220" y="392" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">ACTIONS</text>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
