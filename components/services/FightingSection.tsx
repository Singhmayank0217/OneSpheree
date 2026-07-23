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
 * Fire Fighting — composition C (asymmetric archetype, engineering artwork):
 * a WATER-SUPPLY SCHEMATIC anchors the left — fire pump set drawing from the
 * tank, the riser main climbing to a sprinkler header and branching to a
 * yard hydrant, with water flow running as continuously moving dashes and a
 * pump pressure gauge that sweeps to its duty point on scroll — while the
 * narrative sits offset right and the five systems flow as icon pills.
 */
export function FightingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-ff-flow]', { strokeDashoffset: -56, duration: 2, ease: 'none', repeat: -1 });
      gsap.fromTo(
        '[data-ff-needle]',
        { rotation: -70 },
        {
          rotation: 55,
          ease: 'none',
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: el, start: 'top 65%', end: 'center 48%', scrub: 0.8 },
        }
      );
      gsap.to('[data-ff-art]', {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
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
            'radial-gradient(50% 45% at 25% 55%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 25%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* water-supply schematic */}
          <Reveal y={40} className="order-2 lg:order-1">
            <div data-ff-art="" aria-hidden="true" className="mx-auto w-full max-w-[500px]">
              <svg viewBox="0 0 500 400" fill="none" className="w-full">
                {/* water tank */}
                <g stroke="rgba(255,255,255,.3)" strokeWidth="1.5">
                  <rect x="34" y="270" width="110" height="76" rx="6" fill="rgba(255,255,255,.03)" />
                  <path d="M34 292h110" strokeDasharray="4 4" opacity=".7" />
                </g>
                <text x="89" y="372" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">TANK</text>

                {/* pump set */}
                <g transform="translate(216 306)">
                  <circle r="26" fill="rgba(255,255,255,.05)" stroke="var(--violet-300)" strokeWidth="1.75" />
                  <path d="M-8 0a8 8 0 1016 0 8 8 0 00-16 0M8 0l10 -8" stroke="var(--violet-300)" strokeWidth="1.75" fill="none" strokeLinecap="round" />
                </g>
                <text x="216" y="372" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">FIRE PUMP</text>

                {/* suction + riser + branches, flowing */}
                <g data-ff-flow-group="" stroke="var(--blue-400)" strokeWidth="2" strokeDasharray="4 8">
                  <path data-ff-flow="" d="M144 306 H190" />
                  <path data-ff-flow="" d="M242 306 H306 V70" />
                  <path data-ff-flow="" d="M306 118 H422" />
                  <path data-ff-flow="" d="M306 226 H400" />
                </g>

                {/* sprinkler header (top branch) */}
                <g stroke="var(--blue-300)" strokeWidth="1.5">
                  <path d="M306 70h150" />
                  {[336, 380, 424].map((x) => (
                    <g key={x}>
                      <path d={`M${x} 70v9`} />
                      <path d={`M${x - 6} 84l6 -5 6 5`} fill="none" />
                    </g>
                  ))}
                </g>
                <text x="380" y="48" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">SPRINKLER HEADER</text>

                {/* landing valve (mid branch) */}
                <g transform="translate(438 118)">
                  <circle r="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                  <path d="M-5 -5l10 10M-5 5l10 -10" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
                </g>

                {/* yard hydrant (lower branch) */}
                <g transform="translate(422 226)">
                  <rect x="-9" y="-20" width="18" height="24" rx="3" fill="none" stroke="var(--violet-300)" strokeWidth="1.75" />
                  <path d="M-9 -10h-8M9 -10h8M0 -20v-8M-5 4h10" stroke="var(--violet-300)" strokeWidth="1.75" strokeLinecap="round" />
                </g>
                <text x="422" y="266" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">HYDRANT</text>

                {/* pump pressure gauge */}
                <g transform="translate(112 120)">
                  <path d="M-58 34 A66 66 0 0 1 58 34" stroke="rgba(255,255,255,.14)" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <path d="M-58 34 A66 66 0 0 1 58 34" stroke="var(--violet-500)" strokeWidth="7" strokeLinecap="round" fill="none" strokeDasharray="150 210" />
                  <line data-ff-needle="" x1="0" y1="34" x2="0" y2="-24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cy="34" r="7" fill="#0a0c10" stroke="var(--violet-300)" strokeWidth="1.75" />
                  <text y="70" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">DUTY PRESSURE</text>
                </g>
              </svg>
            </div>
          </Reveal>

          {/* narrative — offset right */}
          <div className="order-1 lg:order-2 lg:pl-8">
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
            <Reveal stagger="text" className="mt-3 flex flex-wrap gap-2">
              {section.items.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-dark bg-[rgba(255,255,255,.05)] py-1.5 pl-2 pr-3 text-[length:var(--text-body-sm-size)] font-medium text-ondark transition-colors duration-[var(--duration-base)] hover:border-[var(--violet-400)]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--violet-500)_22%,transparent)] text-[var(--violet-300)]">
                    <ServiceIcon name={item.icon} size={13} />
                  </span>
                  {item.label}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
