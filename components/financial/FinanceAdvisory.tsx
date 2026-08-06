'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { Icon } from '@/components/ds/Icon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { AdvisoryChartVisual } from './AdvisoryChartVisual';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceAdvisorySection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Financial Advisory — the projection panel on the left, the engagements on the
 * right as interactive rows.
 *
 * The rows are a third card treatment on this page: not a grid tile and not an
 * expanding panel, but a full-width row that lights its rule and slides its
 * arrow on hover — the register a services list belongs in when it sits beside
 * a large visual.
 */
export function FinanceAdvisory({ content }: { content: FinanceAdvisorySection }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 20, filter: 'blur(5px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: EASE.reveal,
          stagger: STAGGER.cards,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="financial-advisory"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-hidden border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 44% at 22% 40%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[520px] lg:max-w-none">
            <AdvisoryChartVisual className="aspect-square w-full" />
          </div>

          <ul ref={listRef} className="flex flex-col gap-2.5">
            {content.cards.map((card) => (
              <li
                key={card.title}
                tabIndex={0}
                className="group relative flex cursor-default items-center gap-4 overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.035)] p-4 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:translate-x-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_20px_52px_-30px_rgba(20,184,166,.65)] focus-visible:translate-x-[6px] focus-visible:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[42%] opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      'radial-gradient(75% 130% at 0% 50%, color-mix(in srgb, var(--violet-400) 24%, transparent), transparent 72%)',
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-[linear-gradient(180deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_60%,transparent))] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                  <ServiceIcon name={card.icon} size={20} />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block font-display text-[1.0625rem] font-bold text-ondark">{card.title}</span>
                  <span className="mt-1 block text-[length:var(--text-body-sm-size)] leading-[1.6] text-ondark-muted">
                    {card.blurb}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative hidden shrink-0 text-ondark-muted transition-[transform,color] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-[var(--blue-300)] sm:block"
                >
                  <Icon name="arrowRight" size={18} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
