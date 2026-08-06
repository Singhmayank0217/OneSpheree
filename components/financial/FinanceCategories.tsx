'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { REVEAL_FROM, REVEAL_TO, STAGGER } from '@/lib/animations';
import type { FinanceCategoriesContent, FinanceCategory } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * One category card — glass panel, emerald light.
 *
 * At rest it shows the discipline and a one-line description. On hover (or
 * keyboard focus) it expands: the panel lifts, an emerald spotlight follows the
 * pointer, and the scope list opens underneath on a grid-row transition — no
 * layout jump, no reflow of the neighbouring cards.
 */
function CategoryCard({ card }: { card: FinanceCategory }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const glow = el.querySelector<HTMLElement>('[data-fc-spot]');
    if (!glow) return;

    const xTo = gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left - r.width / 2);
      yTo(e.clientY - r.top - r.height / 2);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_24px_60px_-28px_rgba(20,184,166,.55)] focus-visible:-translate-y-[6px] focus-visible:border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)] lg:p-6"
    >
      {/* pointer-tracked emerald spotlight */}
      <span
        data-fc-spot=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--violet-400) 26%, transparent) 0%, transparent 68%)',
        }}
      />
      {/* base emerald wash along the bottom edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-45 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 40%, transparent), transparent 72%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_28%,transparent)] text-[var(--blue-300)] transition-[transform,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px] group-hover:bg-[color-mix(in_srgb,var(--violet-400)_34%,transparent)]">
          <ServiceIcon name={card.icon} size={20} />
        </span>
        <span className="font-mono text-[length:var(--text-caption-size)] tracking-[.16em] text-ondark-muted transition-colors duration-[var(--duration-base)] group-hover:text-[var(--blue-300)]">
          {card.index}
        </span>
      </div>

      <h3 className="t-h3 ondark-heading relative mt-5 font-display">{card.title}</h3>
      <p className="relative mt-2.5 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
        {card.blurb}
      </p>

      {/* scope — expands on hover / focus, and stays open where there is no hover */}
      <div className="relative mt-auto grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <ul className="mt-5 flex flex-col gap-2 border-t border-line-dark pt-4">
            {card.detail.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 text-[length:var(--text-caption-size)] leading-[1.6] text-ondark-muted"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" className="mt-[3px] shrink-0" aria-hidden="true">
                  <path
                    d="M20 6L9 17l-5-5"
                    fill="none"
                    stroke="var(--blue-300)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Core Service Categories — the eight disciplines of the practice.
 *
 * The grid arrives in a staggered pass on scroll; each card then behaves on its
 * own. Composition is deliberately unlike the hero (dense, gridded, uniform) so
 * the page changes register as you move down it.
 */
export function FinanceCategories({ content }: { content: FinanceCategoriesContent }) {
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
      id="service-categories"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 82% 4%, color-mix(in srgb, var(--violet-500) 24%, transparent), transparent 72%), radial-gradient(50% 40% at 8% 96%, color-mix(in srgb, var(--violet-400) 14%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{content.eyebrow}</p>
          </Reveal>
          <RevealText text={content.headline} as="h2" className="t-h1 ondark-heading mt-4 font-display" />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[60ch] text-ondark-muted">{content.intro}</p>
          </Reveal>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card) => (
            <CategoryCard key={card.title} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
