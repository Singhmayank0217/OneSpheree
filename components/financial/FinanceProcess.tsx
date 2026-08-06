'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceProcessSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Our Engagement Process — eight stages running left to right.
 *
 * The timeline is horizontal wherever there is width for it (four across,
 * wrapping to a second run), pairs on a tablet, and a single downward column on
 * a phone. The connectors follow the same logic: they draw sideways between
 * cards in a run and downward between stacked ones, and each one is animated on
 * the card it leaves — so the line is always drawn in reading order, whichever
 * layout the viewport gets.
 */
export function FinanceProcess({ content }: { content: FinanceProcessSection }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fc-step]').forEach((step) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 86%', once: true } });
        tl.fromTo(
          step.querySelectorAll('[data-fc-step-card]'),
          { opacity: 0, y: 26, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: EASE.reveal }
        )
          .fromTo(
            step.querySelectorAll('[data-fc-step-line]'),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: EASE.reveal, stagger: STAGGER.text },
            '-=0.45'
          )
          .fromTo(
            step.querySelectorAll('[data-fc-connector]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.45, ease: 'power2.out', transformOrigin: '0% 50%' },
            '-=0.35'
          )
          .fromTo(
            step.querySelectorAll('[data-fc-down]'),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.4, ease: 'power2.out', transformOrigin: '50% 0%' },
            '<'
          );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="engagement-process"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(56% 42% at 50% 0%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <ol
          ref={listRef}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 [&>li:last-child>[data-fc-down]]:hidden sm:max-lg:[&>li:nth-child(2n)>[data-fc-connector]]:hidden lg:[&>li:nth-child(4n)>[data-fc-connector]]:hidden"
        >
          {content.steps.map((step) => (
            <li key={step.index} data-fc-step="" className="relative">
              {/* sideways connector, drawn across the gap to the next card */}
              <span
                data-fc-connector=""
                aria-hidden="true"
                className="absolute right-[-16px] top-[52px] hidden h-px w-4 bg-[linear-gradient(90deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_50%,transparent))] sm:block"
              />
              {/* downward connector, used while the cards are stacked */}
              <span
                data-fc-down=""
                aria-hidden="true"
                className="absolute bottom-[-16px] left-1/2 h-4 w-px bg-[linear-gradient(180deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_50%,transparent))] sm:hidden"
              />

              <div
                data-fc-step-card=""
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_24px_58px_-32px_rgba(20,184,166,.6)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 100% at 50% -25%, color-mix(in srgb, var(--violet-400) 24%, transparent), transparent 72%)',
                  }}
                />

                <div className="relative flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                    <ServiceIcon name={step.icon} size={20} />
                  </span>
                  <span className="font-display text-[1.75rem] font-extrabold leading-none tracking-[-.02em] text-[color-mix(in_srgb,var(--blue-300)_38%,transparent)] transition-colors duration-[var(--duration-slow)] group-hover:text-[var(--blue-300)]">
                    {step.index}
                  </span>
                </div>

                <h3 data-fc-step-line="" className="t-h4 ondark-heading relative mt-5 font-display">
                  {step.title}
                </h3>
                <p
                  data-fc-step-line=""
                  className="relative mt-2 text-[length:var(--text-caption-size)] leading-[1.65] text-ondark-muted"
                >
                  {step.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
