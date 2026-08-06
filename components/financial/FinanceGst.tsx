'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE } from '@/lib/animations';
import type { FinanceGstSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * GST Solutions — the ten stages as one horizontal line.
 *
 * The rail's progress is tied to scroll: as the section moves through the
 * viewport the emerald line advances, lighting each station as it passes and
 * swapping the detail panel beneath. Pointer and keyboard override the scroll
 * position, so a visitor can read any stage without scrubbing back to it.
 *
 * Below the `md` breakpoint the same ten stages render as a vertical timeline
 * (a ten-station horizontal rail cannot be read on a phone) — one data array,
 * two compositions, whichever the viewport can carry.
 */
export function FinanceGst({ content }: { content: FinanceGstSection }) {
  const railRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  /** true while the pointer/keyboard owns the selection */
  const pinned = useRef(false);
  const steps = content.steps;

  /* rail progress ← scroll */
  useEffect(() => {
    const el = railRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fc-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: '0% 50%',
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.7,
            onUpdate: (self) => {
              if (pinned.current) return;
              const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
              setActive((prev) => (prev === i ? prev : i));
            },
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [steps.length]);

  /* the detail panel crossfades whenever the station changes */
  useEffect(() => {
    const el = panelRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-fc-panel-line]'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: EASE.reveal, stagger: 0.06, overwrite: 'auto' }
      );
    }, el);
    return () => ctx.revert();
  }, [active]);

  /* the stacked (small-screen) timeline reveals station by station */
  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fc-stop]').forEach((stop) => {
        gsap.fromTo(
          stop,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE.reveal,
            scrollTrigger: { trigger: stop, start: 'top 88%', once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const select = (i: number) => {
    pinned.current = true;
    setActive(i);
  };
  const release = () => {
    pinned.current = false;
  };

  return (
    <section
      id="gst-solutions"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-hidden border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 44% at 50% 108%, color-mix(in srgb, var(--violet-500) 30%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        {/* ── horizontal rail (md and up) ── */}
        <div ref={railRef} className="mt-14 hidden md:block">
          <div className="relative h-[92px]">
            {/* base line + scrubbed progress */}
            <span aria-hidden="true" className="absolute left-0 right-0 top-[18px] h-px bg-line-dark" />
            <span
              data-fc-progress=""
              aria-hidden="true"
              className="absolute left-0 right-0 top-[18px] h-px bg-[linear-gradient(90deg,color-mix(in_srgb,var(--violet-500)_70%,transparent),var(--blue-300))]"
            />

            <ol className="relative flex">
              {steps.map((step, i) => {
                const isActive = i === active;
                const isPassed = i <= active;
                return (
                  <li key={step.code} className="flex flex-1 flex-col items-center">
                    <button
                      type="button"
                      onMouseEnter={() => select(i)}
                      onMouseLeave={release}
                      onFocus={() => select(i)}
                      onBlur={release}
                      onClick={() => select(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group flex cursor-pointer flex-col items-center gap-3 bg-transparent px-1 pt-[10px]"
                    >
                      <span className="sr-only">{step.title}</span>
                      <span
                        aria-hidden="true"
                        className={`h-[17px] w-[17px] rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:scale-[1.25] ${
                          isActive
                            ? 'scale-[1.25] border-[var(--blue-300)] bg-[var(--blue-300)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--violet-400)_28%,transparent)]'
                            : isPassed
                              ? 'border-[color-mix(in_srgb,var(--blue-300)_70%,transparent)] bg-[color-mix(in_srgb,var(--violet-400)_60%,transparent)]'
                              : 'border-line-dark bg-dark'
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`font-mono text-[11px] tracking-[.16em] transition-colors duration-[var(--duration-base)] ${
                          isActive ? 'text-[var(--blue-300)]' : 'text-ondark-muted group-hover:text-ondark'
                        }`}
                      >
                        {step.code}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`max-w-[104px] text-center text-[11.5px] leading-[1.35] transition-colors duration-[var(--duration-base)] ${
                          isActive ? 'text-ondark' : 'text-ondark-muted'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* the station currently under the line */}
          <div
            ref={panelRef}
            aria-live="polite"
            className="relative mt-10 overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-7 backdrop-blur-[2px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-[46%]"
              style={{
                background:
                  'radial-gradient(70% 120% at 0% 50%, color-mix(in srgb, var(--violet-400) 22%, transparent), transparent 72%)',
              }}
            />
            <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
              <span
                data-fc-panel-line=""
                className="font-mono text-[length:var(--text-caption-size)] tracking-[.2em] text-[var(--blue-300)]"
              >
                {`STAGE ${String(active + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`}
              </span>
              <div className="md:flex-1">
                <h3 data-fc-panel-line="" className="t-h3 ondark-heading font-display">
                  {steps[active].title}
                </h3>
                <p data-fc-panel-line="" className="mt-2 max-w-[70ch] text-ondark-muted">
                  {steps[active].blurb}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── stacked timeline (below md) ── */}
        <ol ref={listRef} className="relative mt-10 flex flex-col md:hidden">
          <span aria-hidden="true" className="absolute bottom-4 left-[9px] top-2 w-px bg-line-dark" />
          {steps.map((step) => (
            <li key={step.code} data-fc-stop="" className="relative flex gap-4 pb-7 last:pb-0">
              <span
                aria-hidden="true"
                className="relative z-10 mt-[6px] h-[19px] w-[19px] shrink-0 rounded-full border border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_55%,transparent)]"
              />
              <div>
                <p className="font-mono text-[11px] tracking-[.16em] text-[var(--blue-300)]">{step.code}</p>
                <h3 className="t-h4 ondark-heading mt-1 font-display">{step.title}</h3>
                <p className="mt-1.5 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
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
