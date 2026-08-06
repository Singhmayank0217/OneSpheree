'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE } from '@/lib/animations';
import type { FinanceWhyChooseSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Why Choose OneSphereee — eight commitments on an alternating timeline.
 *
 * The section clips horizontally (`overflow-x-clip`, not `hidden`, so nothing
 * becomes a scroll container): the cards wait at ±44px before their trigger
 * fires, and without the clip that waiting offset would widen the page.
 *
 * On desktop the spine runs down the centre and the cards take alternate
 * sides, each sliding in from its own side as it reaches the fold; the spine
 * itself fills on a scrub, so the column reads as a line being drawn rather
 * than a set of boxes appearing. Below `lg` it collapses to a single left-hand
 * rail — the same timeline, one column wide.
 */
export function FinanceWhyChoose({ content }: { content: FinanceWhyChooseSection }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fc-spine]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: '50% 0%',
          scrollTrigger: { trigger: el, start: 'top 76%', end: 'bottom 70%', scrub: 0.6 },
        }
      );

      const wide = window.matchMedia('(min-width: 1024px)').matches;
      gsap.utils.toArray<HTMLElement>('[data-fc-point]').forEach((item, i) => {
        const fromX = wide ? (i % 2 === 0 ? -44 : 44) : 26;
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%', once: true } });
        tl.fromTo(
          item.querySelectorAll('[data-fc-card]'),
          { opacity: 0, x: fromX, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.75, ease: EASE.reveal }
        ).fromTo(
          item.querySelectorAll('[data-fc-node]'),
          { scale: 0 },
          { scale: 1, duration: 0.45, ease: 'back.out(2.2)' },
          '-=0.55'
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-x-clip border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(46% 46% at 50% 50%, color-mix(in srgb, var(--violet-500) 22%, transparent), transparent 74%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <ol ref={listRef} className="relative mt-14 flex flex-col">
          {/* the spine: a hairline, and the emerald fill that tracks the scroll */}
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[12px] top-1 w-px bg-line-dark lg:left-1/2 lg:-translate-x-1/2"
          />
          <span
            data-fc-spine=""
            aria-hidden="true"
            className="absolute bottom-8 left-[12px] top-1 w-px bg-[linear-gradient(180deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_65%,transparent))] lg:left-1/2 lg:-translate-x-1/2"
          />

          {content.points.map((point, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={point.title}
                data-fc-point=""
                className={`relative pb-9 pl-10 last:pb-0 lg:w-1/2 lg:pb-12 lg:pl-0 ${
                  left ? 'lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12'
                }`}
              >
                <span
                  data-fc-node=""
                  aria-hidden="true"
                  className={`absolute top-[10px] z-10 h-[17px] w-[17px] rounded-full border-2 border-[var(--blue-300)] bg-dark shadow-[0_0_0_5px_color-mix(in_srgb,var(--violet-500)_35%,transparent)] left-[4px] ${
                    left ? 'lg:left-auto lg:right-[-8.5px]' : 'lg:left-[-8.5px]'
                  }`}
                />

                <div
                  data-fc-card=""
                  className="group relative overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[border-color,background-color,box-shadow] duration-[var(--duration-slow)] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_24px_58px_-32px_rgba(20,184,166,.6)] lg:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 36%, transparent), transparent 72%)',
                    }}
                  />
                  <div
                    className={`relative flex items-center gap-3 ${left ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                      <ServiceIcon name={point.icon} size={20} />
                    </span>
                    <h3 className="t-h3 ondark-heading font-display">{point.title}</h3>
                  </div>
                  <p className="relative mt-3 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                    {point.blurb}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
