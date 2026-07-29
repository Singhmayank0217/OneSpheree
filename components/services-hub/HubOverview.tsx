'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Counter } from '@/components/animations/Counter';
import { servicesHub } from '@/data/services-hub';
import type { HubOverviewContent } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Services Overview — composition: the SPECTRUM. An editorial statement sits
 * above a single hairline broken into the six divisions' colours; the segments
 * draw out from their left edge in sequence as the section arrives, reading as
 * one continuous band rather than six separate things. The figures beneath
 * count up on entry. No cards, no icons — the section's whole motion language
 * is the drawn line.
 */
export function HubOverview({ overview }: { overview: HubOverviewContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const cards = servicesHub.grid.cards;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-spectrum-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.09,
          scrollTrigger: { trigger: '[data-spectrum]', start: 'top 82%', once: true },
        }
      );
      gsap.fromTo(
        '[data-spectrum-label]',
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.09,
          delay: 0.35,
          scrollTrigger: { trigger: '[data-spectrum]', start: 'top 82%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label={overview.eyebrow} className="relative bg-dark text-ondark">
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="t-eyebrow t-eyebrow-ondark">{overview.eyebrow}</p>
            </Reveal>
            <RevealText text={overview.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[14ch]" />
          </div>
          <Reveal delay={0.1} className="flex flex-col gap-4 lg:pt-3">
            {overview.body.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[62ch] text-ondark-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* the spectrum — six divisions read as one continuous band */}
        <div data-spectrum="" className="mt-12 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-6">
          {cards.map((c) => (
            <div key={c.slug}>
              <span
                data-spectrum-bar=""
                className="block h-[3px] w-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${c.accent.base}, ${c.accent.glow})` }}
              />
              <span
                data-spectrum-label=""
                className="mt-3 block font-mono text-[10px] uppercase tracking-[.1em] text-ondark-muted"
              >
                {c.index} {c.short}
              </span>
            </div>
          ))}
        </div>

        {/* the figures */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-dark pt-8 sm:grid-cols-4">
          {overview.figures.map((f) => (
            <Reveal key={f.label}>
              <p className="font-display text-[2.5rem] font-bold leading-none tracking-[-.02em] text-ondark">
                {f.prefix}
                <Counter value={f.value} suffix={f.suffix} />
              </p>
              <p className="mt-2 text-[length:var(--text-body-sm-size)] text-ondark-muted">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
