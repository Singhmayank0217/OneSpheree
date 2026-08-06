'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceOutcomesSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Business Outcomes — what the engagement produces.
 *
 * Each card is confirmed rather than counted: the ring closes, the check draws
 * itself inside it and the card's measure fills. Every outcome here is a
 * qualitative commitment, so nothing invents a statistic — the counting
 * numbers on this page belong to the proof section, which measures things that
 * genuinely are numbers.
 */
export function FinanceBusinessOutcomes({ content }: { content: FinanceOutcomesSection }) {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });

      tl.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 26, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: EASE.reveal,
          stagger: STAGGER.cards,
        }
      )
        .fromTo(
          '[data-fc-ring]',
          { strokeDashoffset: 138 },
          { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: STAGGER.cards },
          '-=0.9'
        )
        .fromTo(
          '[data-fc-check]',
          { strokeDashoffset: 24 },
          { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: STAGGER.cards },
          '-=1.05'
        )
        .fromTo(
          '[data-fc-measure]',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.reveal, stagger: STAGGER.cards, transformOrigin: '0% 50%' },
          '-=1.1'
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="business-outcomes"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 86% 8%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%), radial-gradient(50% 42% at 10% 96%, color-mix(in srgb, var(--violet-400) 15%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <ul ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.outcomes.map((outcome) => (
            <li
              key={outcome.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_24px_58px_-32px_rgba(20,184,166,.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 36%, transparent), transparent 72%)',
                }}
              />

              <span className="relative" aria-hidden="true">
                <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
                  <circle cx="24" cy="24" r="21" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
                  <circle
                    data-fc-ring=""
                    cx="24"
                    cy="24"
                    r="21"
                    stroke="var(--blue-300)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="132 138"
                    transform="rotate(-90 24 24)"
                  />
                  <path
                    data-fc-check=""
                    d="M16 24.5l5.4 5.5L32.5 18.5"
                    stroke="var(--blue-300)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="24 24"
                  />
                </svg>
              </span>

              <h3 className="t-h4 ondark-heading relative mt-5 font-display">{outcome.title}</h3>

              <span
                data-fc-measure=""
                aria-hidden="true"
                className="relative mt-4 h-px w-full bg-[linear-gradient(90deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_60%,transparent))]"
              />

              <p className="relative mt-4 text-[length:var(--text-body-sm-size)] leading-[1.65] text-ondark-muted">
                {outcome.blurb}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
