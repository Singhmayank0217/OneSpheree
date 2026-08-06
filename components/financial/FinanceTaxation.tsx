'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE } from '@/lib/animations';
import type { FinanceTaxationSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Direct Taxation — two columns: the argument on the left, the scope of work
 * on the right as a checklist that is ticked off while you scroll.
 *
 * Each line arrives on its own trigger (copy slides in, the box fills, the
 * check draws itself), and a scrubbed rail behind the list tracks how far
 * through the scope you have read. The heading column stays put on desktop so
 * the list reads against it.
 */
export function FinanceTaxation({ content }: { content: FinanceTaxationSection }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // the rail fills as the list passes through the viewport
      gsap.fromTo(
        '[data-fc-rail]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: '50% 0%',
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 65%', scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-fc-check]').forEach((item) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
        tl.fromTo(item, { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: 0.6, ease: EASE.reveal })
          .fromTo(
            item.querySelectorAll('[data-fc-box]'),
            { scale: 0.7, borderColor: 'rgba(255,255,255,.14)' },
            {
              scale: 1,
              borderColor: 'rgba(52,211,153,.55)',
              duration: 0.4,
              ease: 'back.out(2)',
            },
            '-=0.42'
          )
          .fromTo(
            item.querySelectorAll('[data-fc-tick]'),
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.4)', transformOrigin: '50% 50%' },
            '-=0.2'
          );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="direct-taxation"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-x-clip border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 42% at 10% 14%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative grid gap-12 py-section lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <FinanceSectionHead header={content} headingClassName="t-display" />
        </div>

        <div>
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{content.itemsLabel}</p>
          </Reveal>

          <div className="relative mt-6 pl-0">
            {/* the rail the checklist is ticked against */}
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-2 hidden h-[calc(100%-16px)] w-px bg-line-dark sm:block"
            />
            <span
              data-fc-rail=""
              aria-hidden="true"
              className="absolute left-[13px] top-2 hidden h-[calc(100%-16px)] w-px bg-[linear-gradient(180deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_70%,transparent))] sm:block"
            />

            <ul ref={listRef} className="flex flex-col">
              {content.items.map((item) => (
                <li
                  key={item}
                  data-fc-check=""
                  className="group relative flex items-center gap-4 border-b border-line-dark py-3.5 last:border-b-0"
                >
                  <span
                    data-fc-box=""
                    className="relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-md border border-[rgba(255,255,255,.14)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] transition-colors duration-[var(--duration-slow)] group-hover:bg-[color-mix(in_srgb,var(--violet-400)_38%,transparent)]"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" data-fc-tick="">
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="var(--blue-300)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[length:var(--text-body-size)] text-ondark transition-[color,transform] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-white">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
