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
 * Financial Due Diligence — composition B (Performance archetype, new
 * artwork): a centered stage under an oversized stroked numeral. The
 * centerpiece is a solvency GAUGE — a risk→stable arc whose needle sweeps
 * from exposure into the stable zone and whose ledger bars rise as the
 * section scrolls. The five assessments render as a glass chip band beneath.
 */
export function FinancialDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // needle sweeps from risk (−90°) to stable (+78°)
      gsap.fromTo(
        '[data-fd-needle]',
        { rotation: -90 },
        {
          rotation: 78,
          ease: 'none',
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: '[data-fd-gauge]', start: 'top 78%', end: 'center 45%', scrub: 0.8 },
        }
      );
      // arc draws in
      gsap.fromTo(
        '[data-fd-arc]',
        { strokeDashoffset: 260 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '[data-fd-gauge]', start: 'top 80%', end: 'center 45%', scrub: 0.8 },
        }
      );
      // ledger bars rise
      gsap.fromTo(
        '[data-fd-bar]',
        { scaleY: 0.15 },
        {
          scaleY: 1,
          stagger: 0.12,
          ease: 'none',
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: '[data-fd-gauge]', start: 'top 72%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.to('[data-fd-numeral]', {
        yPercent: -18,
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
            'radial-gradient(55% 45% at 82% 60%, color-mix(in srgb, var(--violet-500) 14%, transparent), transparent 70%)',
        }}
      />
      <div
        data-fd-numeral=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-[8%] hidden font-display font-extrabold leading-none text-transparent lg:block"
        style={{ fontSize: 'clamp(12rem, 26vh, 20rem)', WebkitTextStroke: '1px rgba(255,255,255,.10)' }}
      >
        {section.index}
      </div>

      <Container className="relative border-t border-line-dark py-section text-center">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</p>
        </Reveal>
        <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
        </Reveal>

        {/* solvency gauge */}
        <Reveal delay={0.2} y={40}>
          <div data-fd-gauge="" aria-hidden="true" className="relative mx-auto mt-10 w-full max-w-[460px]">
            <svg viewBox="0 0 460 268" fill="none" className="w-full">
              <defs>
                <linearGradient id="fd-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,255,255,.3)" />
                  <stop offset="55%" stopColor="var(--blue-400)" />
                  <stop offset="100%" stopColor="var(--violet-300)" />
                </linearGradient>
              </defs>
              {/* gauge track + value arc */}
              <path d="M40 220 A190 190 0 0 1 420 220" stroke="rgba(255,255,255,.12)" strokeWidth="12" strokeLinecap="round" />
              <path
                data-fd-arc=""
                d="M40 220 A190 190 0 0 1 420 220"
                stroke="url(#fd-arc)"
                strokeWidth="12"
                strokeLinecap="round"
                pathLength={260}
                strokeDasharray="260 260"
              />
              {/* zone labels */}
              <text x="42" y="248" fill="rgba(255,255,255,.4)" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">RISK</text>
              <text x="376" y="248" fill="var(--violet-300)" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">STABLE</text>
              {/* ledger bars behind the needle */}
              <g transform="translate(184 150)">
                {[0, 1, 2, 3].map((i) => (
                  <rect
                    key={i}
                    data-fd-bar=""
                    x={i * 24}
                    y={-16 - i * 12}
                    width="14"
                    height={30 + i * 12}
                    rx="3"
                    fill="color-mix(in srgb, var(--blue-500) 30%, transparent)"
                  />
                ))}
              </g>
              {/* needle + hub */}
              <g transform="translate(230 220)">
                <line data-fd-needle="" x1="0" y1="0" x2="0" y2="-150" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <circle r="12" fill="#0a0c10" stroke="var(--violet-300)" strokeWidth="2" />
                <circle r="4" fill="var(--violet-300)" />
              </g>
            </svg>
          </div>
        </Reveal>

        {/* assessment chips */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[900px] grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {section.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.045)] px-3 py-4 backdrop-blur-sm transition-colors duration-[var(--duration-base)] hover:border-[var(--violet-400)]"
            >
              <span className="text-[var(--violet-300)]">
                <ServiceIcon name={item.icon} size={21} />
              </span>
              <span className="text-[length:var(--text-body-sm-size)] font-medium leading-tight text-ondark">
                {item.label}
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
