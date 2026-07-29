'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { cn } from '@/lib/utils';
import type { HubProcessStep } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Process — composition: a DRAWN SPINE. One vertical rail runs the length of
 * the section and fills as you scroll (scrubbed, so the line is literally
 * drawn by the reader); each stage alternates across the rail and its node
 * snaps in when the line reaches it. On narrow screens the rail moves to the
 * left edge and every stage sits to its right.
 */
export function HubProcess({
  eyebrow,
  headline,
  intro,
  steps,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  steps: HubProcessStep[];
}) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // the rail draws with the scroll
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 72%', end: 'bottom 78%', scrub: 0.6 },
        }
      );

      // Each stage arrives as the line reaches it. Queried from the list, not
      // through gsap.utils.toArray — gsap.context scopes selector strings
      // handed to gsap methods, but toArray still searches the whole document.
      Array.from(list.querySelectorAll<HTMLElement>('[data-step]')).forEach((step) => {
        const node = step.querySelector('[data-step-node]');
        const body = step.querySelector('[data-step-body]');
        gsap
          .timeline({ scrollTrigger: { trigger: step, start: 'top 76%', once: true } })
          .fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' })
          .fromTo(
            body,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.32'
          );
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 85% 60%, color-mix(in srgb, var(--blue-500) 10%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{eyebrow}</p>
          </Reveal>
          <RevealText text={headline} as="h2" className="t-display ondark-heading mx-auto mt-3 max-w-[16ch]" />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[58ch] text-ondark-muted">{intro}</p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative mx-auto mt-14 max-w-[940px]">
          {/* the rail — the fill is a separate, untransformed layer so the
              scrubbed scaleY can own its transform outright */}
          <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-2 w-px -translate-x-1/2 lg:left-1/2">
            <span className="absolute inset-0 bg-line-dark" />
            <span
              data-rail-fill=""
              className="absolute inset-0 bg-gradient-to-b from-[var(--violet-400)] via-[var(--violet-500)] to-[var(--blue-500)]"
            />
          </span>

          {steps.map((step, i) => {
            const leftSide = i % 2 === 0;
            return (
              <li key={step.title} data-step="" className="relative pb-12 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-20">
                {/* node on the rail */}
                <span aria-hidden="true" className="absolute left-[15px] top-1 -translate-x-1/2 lg:left-1/2">
                  <span
                    data-step-node=""
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--violet-400)_60%,transparent)] bg-dark"
                  >
                    <span className="h-[9px] w-[9px] rounded-full bg-brand" />
                  </span>
                </span>

                <div
                  data-step-body=""
                  className={cn(
                    'pl-11 lg:pl-0',
                    leftSide ? 'lg:pr-4 lg:text-right' : 'lg:col-start-2 lg:pl-4'
                  )}
                >
                  <p className="font-mono text-[11px] tracking-[.14em] text-[var(--violet-300)]">{step.index}</p>
                  <h3 className="t-h2 ondark-heading mt-2">{step.title}</h3>
                  <p
                    className={cn(
                      'mt-3 max-w-[46ch] text-ondark-muted',
                      leftSide ? 'lg:ml-auto' : ''
                    )}
                  >
                    {step.blurb}
                  </p>
                </div>
              </li>
            );
          })}

          {/* terminal marker — the line arrives */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-[15px] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-brand lg:left-1/2"
          />
        </ol>
      </Container>
    </section>
  );
}
