'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';

gsap.registerPlugin(ScrollTrigger);

/** The statement, tokenized so key phrases can carry the brand color. */
const STATEMENT: { text: string; highlight?: boolean }[] = [
  { text: 'We believe every business deserves solutions as ambitious as its goals.' },
  { text: 'OneSpheree exists so growth, safety, and compliance never pull in different directions —' },
  { text: 'one team,', highlight: true },
  { text: 'accountable end to end.', highlight: true },
];

/**
 * About chapter — a single editorial statement in large type. Words sit dimmed
 * on the page and brighten as the scroll passes through them (scrubbed), so
 * reading pace and scroll pace become the same thing.
 */
export function AboutStatement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-word]'),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="About OneSpheree" className="relative z-10">
      {/* dawn wash — the dark service act resolves up into the light field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] -translate-y-full"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-canvas))' }}
      />
      <Container narrow className="py-section">
        <Reveal>
          <p className="t-eyebrow">About OneSpheree</p>
        </Reveal>
        <p
          ref={ref}
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.25] tracking-[-.01em] text-heading"
        >
          {STATEMENT.map((token, ti) =>
            token.text.split(' ').map((word, wi) => (
              <span
                key={`${ti}-${wi}`}
                data-word=""
                className={token.highlight ? 'text-primary' : undefined}
              >
                {word}{' '}
              </span>
            ))
          )}
        </p>
        <Reveal className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-4">
          <div>
            <p className="font-display text-[1.5rem] font-bold text-heading">One sphere</p>
            <p className="t-caption">Five disciplines, one accountable team</p>
          </div>
          <div>
            <p className="font-display text-[1.5rem] font-bold text-heading">18 countries</p>
            <p className="t-caption">Delivering to one global standard</p>
          </div>
          <div className="ms-auto">
            <Button href="/about" variant="ghost" iconRight="arrowRight">
              Our story
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
