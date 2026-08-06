'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceFaqSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * One accordion row. The panel is animated from 0 to its natural height (and
 * back) rather than toggled, so opening one answer while another closes reads
 * as a single movement. Under reduced motion the panel simply switches state.
 */
function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: { question: string; answer: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.height = open ? 'auto' : '0px';
      first.current = false;
      return;
    }

    // no animation for the closed initial paint
    if (first.current) {
      first.current = false;
      el.style.height = open ? 'auto' : '0px';
      return;
    }

    const tween = open
      ? gsap.fromTo(
          el,
          { height: 0 },
          { height: 'auto', duration: 0.5, ease: EASE.reveal, overwrite: 'auto' }
        )
      : gsap.to(el, { height: 0, duration: 0.38, ease: 'power2.inOut', overwrite: 'auto' });

    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <li data-fc-faq="" className="border-b border-line-dark first:border-t">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`fc-faq-panel-${index}`}
          id={`fc-faq-trigger-${index}`}
          className="group flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent py-5 text-left"
        >
          <span
            className={`font-display text-[1.0625rem] font-bold leading-[1.45] transition-colors duration-[var(--duration-base)] sm:text-[1.1875rem] ${
              open ? 'text-white' : 'text-ondark group-hover:text-white'
            }`}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
              open
                ? 'rotate-45 border-[var(--blue-300)] bg-[color-mix(in_srgb,var(--violet-500)_45%,transparent)]'
                : 'border-line-dark bg-[rgba(255,255,255,.03)] group-hover:border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)]'
            }`}
          >
            <span className="absolute h-px w-[13px] bg-[var(--blue-300)]" />
            <span className="absolute h-[13px] w-px bg-[var(--blue-300)]" />
          </span>
        </button>
      </h3>

      <div
        ref={panelRef}
        id={`fc-faq-panel-${index}`}
        role="region"
        aria-labelledby={`fc-faq-trigger-${index}`}
        style={{ height: 0 }}
        className="overflow-hidden"
      >
        <p className="max-w-[80ch] pb-6 pr-10 text-[length:var(--text-body-sm-size)] leading-[1.75] text-ondark-muted">
          {item.answer}
        </p>
      </div>
    </li>
  );
}

/**
 * Frequently Asked Questions — one open at a time, so the column never turns
 * into a wall of text and the reader always knows where the answer ends.
 */
export function FinanceFaq({ content }: { content: FinanceFaqSection }) {
  const [open, setOpen] = useState<number | null>(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fc-faq]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
      id="faq"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(46% 40% at 12% 12%, color-mix(in srgb, var(--violet-500) 24%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative grid gap-10 py-section lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <FinanceSectionHead header={content} />
        </div>

        <ul ref={listRef} className="flex flex-col">
          {content.items.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen((prev) => (prev === i ? null : i))}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
