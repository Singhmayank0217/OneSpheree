'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { REVEAL_FROM, REVEAL_TO, STAGGER } from '@/lib/animations';
import type { FinanceAuditSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Audit & Assurance — eight engagements as glass cards.
 *
 * These expand differently from the Milestone 1 category cards on purpose: the
 * detail is a panel that rises over the face of the card on hover or focus,
 * rather than a row that opens beneath it. Same glass and emerald language,
 * a different mechanic, so the two grids never read as the same component.
 */
export function FinanceAudit({ content }: { content: FinanceAuditSection }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(el.children), REVEAL_FROM, {
        ...REVEAL_TO,
        stagger: STAGGER.cards,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="audit-assurance"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(54% 42% at 88% 10%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              tabIndex={0}
              className="group relative flex h-full min-h-[236px] flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[transform,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)] hover:shadow-[0_26px_64px_-30px_rgba(20,184,166,.6)] focus-visible:-translate-y-[6px] focus-visible:border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)]"
            >
              {/* resting face */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-45 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-0"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 42%, transparent), transparent 72%)',
                }}
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                <ServiceIcon name={card.icon} size={20} />
              </span>
              <h3 className="t-h3 ondark-heading relative mt-5 font-display">{card.title}</h3>
              <p className="relative mt-2.5 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                {card.blurb}
              </p>

              {/* The panel that rises over the card. On touch there is no
                  hover to reveal it, so it sits at the foot of the card
                  instead of over its face. */}
              <div
                className="pointer-events-none absolute inset-0 flex translate-y-full flex-col justify-end p-5 opacity-0 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:static [@media(hover:none)]:mt-5 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:rounded-lg [@media(hover:none)]:p-4 [@media(hover:none)]:opacity-100"
                style={{
                  background:
                    'linear-gradient(180deg, color-mix(in srgb, var(--violet-900) 78%, transparent) 0%, color-mix(in srgb, var(--violet-700) 82%, transparent) 100%)',
                }}
              >
                <p className="text-[length:var(--text-body-sm-size)] leading-[1.65] text-white">{card.detail}</p>
                <ul className="mt-4 flex flex-col gap-1.5 border-t border-[rgba(255,255,255,.18)] pt-3">
                  {card.scope.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-[length:var(--text-caption-size)] leading-[1.55] text-[rgba(255,255,255,.82)]"
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" className="mt-[3px] shrink-0" aria-hidden="true">
                        <path
                          d="M20 6L9 17l-5-5"
                          fill="none"
                          stroke="var(--blue-300)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
