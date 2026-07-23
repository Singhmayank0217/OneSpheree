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

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
/** Quarterly service visits + one annual test — the AMC year at a glance. */
const VISITS = [2, 5, 8, 11];

/**
 * AMC Services — composition F (wide-banner archetype, service-log artwork):
 * the section opens with a full-width SERVICE-LOG YEAR STRIP — twelve month
 * ticks on a maintenance timeline, quarterly visit markers stamping in on
 * scroll, the annual test highlighted, and a NEXT SERVICE cursor drifting at
 * its own parallax rate — followed by the two-column editorial row and the
 * four coverage areas as a joined hairline tile grid.
 */
export function AmcSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-amc-visit]',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.3,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: '[data-amc-strip]', start: 'top 82%', end: 'center 50%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-amc-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: '0 50%',
          scrollTrigger: { trigger: '[data-amc-strip]', start: 'top 84%', end: 'center 50%', scrub: 0.8 },
        }
      );
      // the NEXT SERVICE cursor drifts slightly against the strip
      gsap.to('[data-amc-cursor]', {
        y: -14,
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
            'radial-gradient(60% 45% at 50% 0%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark pt-section">
        {/* service-log year strip */}
        <Reveal y={40}>
          <div data-amc-strip="" aria-hidden="true" className="mx-auto max-w-[980px]">
            <svg viewBox="0 0 960 120" fill="none" className="w-full">
              {/* timeline */}
              <path d="M20 64H940" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
              <path data-amc-line="" d="M20 64H940" stroke="var(--blue-400)" strokeWidth="2" opacity=".7" />
              {/* month ticks */}
              {MONTHS.map((m, i) => {
                const x = 20 + i * 83.6;
                return (
                  <g key={m}>
                    <path d={`M${x} 58v12`} stroke="rgba(255,255,255,.3)" />
                    <text x={x} y="92" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">
                      {m}
                    </text>
                  </g>
                );
              })}
              {/* quarterly visits */}
              {VISITS.map((mi, i) => {
                const x = 20 + mi * 83.6;
                const annual = i === VISITS.length - 1;
                return (
                  <g key={mi} data-amc-visit="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                    <circle cx={x} cy="64" r={annual ? 13 : 10} fill={annual ? 'color-mix(in srgb, var(--violet-500) 32%, transparent)' : 'rgba(255,255,255,.06)'} stroke={annual ? 'var(--violet-300)' : 'var(--blue-300)'} strokeWidth="1.5" />
                    <path d={`M${x - 3.5} 64l2.5 2.5 4.5-5`} stroke={annual ? 'var(--violet-200)' : 'var(--blue-200)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {annual && (
                      <text x={x} y="34" textAnchor="middle" fill="var(--violet-300)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">
                        ANNUAL TEST
                      </text>
                    )}
                  </g>
                );
              })}
              {/* next-service cursor */}
              <g data-amc-cursor="" transform="translate(438 0)">
                <path d="M0 44v40" stroke="var(--violet-400)" strokeWidth="1.5" strokeDasharray="3 4" />
                <path d="M-5 40l5 6 5-6" fill="var(--violet-400)" />
                <text y="24" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">
                  NEXT SERVICE
                </text>
              </g>
            </svg>
          </div>
        </Reveal>

        {/* editorial row */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[12ch]" />
          </div>
          <Reveal delay={0.15} className="lg:pt-10">
            <p className="max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        {/* coverage — joined tile grid */}
        <Reveal>
          <p className="t-micro mt-10 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mb-section-sm mt-3 grid gap-px overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-dark p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--blue-500)_16%,transparent)] text-[var(--blue-300)]">
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
