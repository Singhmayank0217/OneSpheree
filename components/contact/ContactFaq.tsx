'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { DURATION, EASE } from '@/lib/animations';
import type { ContactFaqEntry } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 5 — the FAQ, built as an EXPANDING TIMELINE.
 *
 * The accordion hangs off a spine that is drawn by the scroll itself: the line
 * running down the left of the list is scrubbed from empty to full as the
 * section passes, and each question sits on a node that fills when its answer
 * is open. So the reader's progress through the questions and the progress of
 * the drawing are the same thing — the section's own gesture, and the only
 * scrubbed animation on the page.
 *
 * One answer open at a time, expanded on GSAP height/opacity. Fully keyboard
 * accessible: real buttons, `aria-expanded`, `aria-controls`, and panels that
 * are properly hidden when collapsed so a screen reader never reads a closed
 * answer.
 */
export function ContactFaq({
  eyebrow,
  headline,
  intro,
  entries,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  entries: ContactFaqEntry[];
}) {
  const [open, setOpen] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* the spine, drawn by the scroll; rows arrive on their own nodes */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-faq-spine]', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('[data-faq-head] > *', { opacity: 0, y: 18 });
      gsap.set('[data-faq-row]', { opacity: 0, x: -18 });

      gsap.to('[data-faq-spine]', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: listRef.current, start: 'top 78%', end: 'bottom 62%', scrub: 0.7 },
      });

      gsap.to('[data-faq-head] > *', {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });

      gsap.to('[data-faq-row]', {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: listRef.current, start: 'top 82%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* the expansion itself */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.utils.toArray<HTMLElement>('[data-faq-panel]', list).forEach((panel, i) => {
      const isOpen = i === open;
      if (reduced) {
        panel.style.height = isOpen ? 'auto' : '0px';
        panel.style.opacity = isOpen ? '1' : '0';
        return;
      }
      gsap.to(panel, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: DURATION.section * 0.62,
        ease: EASE.out,
        overwrite: 'auto',
        // the list changes height, so anything measured below it must re-measure
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  }, [open]);

  return (
    <section ref={rootRef} aria-label={eyebrow} className="relative bg-canvas">
      <Container className="py-section">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.5fr] lg:gap-16">
          <div data-faq-head="" className="lg:sticky lg:top-28 lg:self-start">
            <p className="t-eyebrow">{eyebrow}</p>
            <h2 className="t-display mt-3">{headline}</h2>
            <p className="mt-4 max-w-[36ch] text-muted">{intro}</p>
          </div>

          <div ref={listRef} className="relative pl-8 sm:pl-11">
            {/* the spine — empty until the scroll draws it */}
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[11px]" />
            <span
              data-faq-spine=""
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-0 w-px sm:left-[11px]"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-primary), color-mix(in srgb, var(--color-primary) 35%, transparent))',
              }}
            />

            {entries.map((entry, i) => {
              const isOpen = i === open;
              return (
                <div key={entry.q} data-faq-row="" className="relative border-b border-line">
                  {/* the node this question sits on */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 top-[26px] flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] sm:-left-11 ${
                      isOpen
                        ? 'border-primary bg-primary shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-primary)_16%,transparent)]'
                        : 'border-line-strong bg-canvas'
                    }`}
                  />

                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`contact-faq-${i}`}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={`t-h4 transition-colors duration-[var(--duration-slow)] ${
                          isOpen ? 'text-primary' : 'text-heading'
                        }`}
                      >
                        {entry.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-[3px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,color,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
                          isOpen
                            ? 'rotate-180 border-primary bg-primary-soft text-primary'
                            : 'border-line text-muted'
                        }`}
                      >
                        <Icon name="chevronDown" size={16} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`contact-faq-${i}`}
                    data-faq-panel=""
                    role="region"
                    aria-hidden={!isOpen}
                    className="h-0 overflow-hidden opacity-0"
                  >
                    <p className="max-w-[64ch] pb-6 text-muted">{entry.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
