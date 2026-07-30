'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import type { OfficeCard } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 3 — office information.
 *
 * The page steps off the dark stage here: five large editorial cards on the
 * light canvas, sized 2-2-2 / 3-3 on a six-column grid so the row rhythm reads
 * as a spread rather than a leftover gap.
 *
 * Motion: a STAGGERED DEPTH arrival. The row is given perspective and the cards
 * come forward out of it — rotated back on X, pushed away on Z, scaled down —
 * settling in sequence. Nothing here fades up: the gesture is distance closing,
 * which no other section on the page uses.
 */
export function ContactOffices({
  eyebrow,
  headline,
  intro,
  cards,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: OfficeCard[];
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-of-head] > *', { opacity: 0, y: 18 });
      gsap.set('[data-of-card]', {
        opacity: 0,
        y: 64,
        z: -260,
        rotateX: 9,
        scale: 0.94,
        transformOrigin: 'center top',
      });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 76%', once: true } })
        .to('[data-of-head] > *', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08 }, 0)
        .to(
          '[data-of-card]',
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.095,
            clearProps: 'transform',
          },
          0.25
        );
    }, el);

    return () => ctx.revert();
  }, []);

  /** 2-2-2 on the first row, 3-3 on the second — a six-column editorial split. */
  const span = (index: number) => (index < 3 ? 'lg:col-span-2' : 'lg:col-span-3');

  return (
    <section ref={rootRef} aria-label={eyebrow} className="relative bg-canvas">
      <Container className="py-section">
        <div data-of-head="" className="max-w-[720px]">
          <p className="t-eyebrow">{eyebrow}</p>
          <h2 className="t-display mt-3">{headline}</h2>
          <p className="t-body-lg mt-4 text-muted">{intro}</p>
        </div>

        <div
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 0%' }}
        >
          {cards.map((card, i) => (
            <article
              key={card.id}
              data-of-card=""
              className={`group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card p-6 transition-[transform,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] hover:shadow-md sm:p-7 ${span(
                i
              )} ${i === cards.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              {/* the orange edge that lights on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:scale-x-100"
              />

              <div className="flex items-center justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary transition-[background-color,color,transform] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:scale-[1.06] group-hover:bg-primary group-hover:text-white"
                >
                  <Icon name={card.icon} size={22} />
                </span>
                <p className="t-micro text-muted">{card.kind}</p>
              </div>

              <h3 className="t-h4 mt-5">{card.title}</h3>

              <div className="mt-3 flex flex-col gap-[6px]">
                {card.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="w-fit text-body transition-colors duration-[var(--duration-base)] hover:text-primary"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="text-body">
                      {line.text}
                    </p>
                  )
                )}
              </div>

              {card.note && (
                <p className="t-caption mt-auto pt-5">
                  <span className="mr-2 inline-block h-[3px] w-[3px] -translate-y-[3px] rounded-full bg-primary align-middle" />
                  {card.note}
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
