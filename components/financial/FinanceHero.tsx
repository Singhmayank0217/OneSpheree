'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Magnetic } from '@/components/animations/Magnetic';
import { Button } from '@/components/ds/Button';
import { LedgerFieldVisual } from './LedgerFieldVisual';
import type { FinanceHeroContent } from '@/types/financial';

/**
 * Capability rail — the eight service pills.
 *
 * They arrive as one staggered pass, then a single emerald marker walks the
 * rail the way a reviewer walks a checklist: one pill lit at a time, never all
 * of them moving at once. Hover is CSS (a lift and a brighter edge) so the
 * pointer always wins over the ambient cycle.
 */
function CapabilityRail({ pills }: { pills: string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = gsap.utils.toArray<HTMLElement>('[data-fc-pill]', el);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 12, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', stagger: 0.06, delay: 0.55 }
      );

      const cycle = gsap.timeline({ repeat: -1, delay: 1.8 });
      items.forEach((item) => {
        const dot = item.querySelector('[data-fc-dot]');
        cycle
          .to(item, {
            backgroundColor: 'rgba(20,184,166,.14)',
            borderColor: 'rgba(52,211,153,.5)',
            color: '#FFFFFF',
            duration: 0.35,
            ease: 'power2.out',
          })
          .to(dot, { scale: 1.6, opacity: 1, duration: 0.35, ease: 'power2.out' }, '<')
          .to(item, {
            backgroundColor: 'rgba(255,255,255,.03)',
            borderColor: 'rgba(255,255,255,.14)',
            color: 'var(--text-on-dark-muted)',
            duration: 0.45,
            ease: 'power2.inOut',
          })
          .to(dot, { scale: 1, opacity: 0.55, duration: 0.45, ease: 'power2.inOut' }, '<');
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ul ref={ref} className="mt-8 flex max-w-[560px] flex-wrap gap-2">
      {pills.map((pill) => (
        <li
          key={pill}
          data-fc-pill=""
          className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.03)] px-[14px] py-[8px] text-[length:var(--text-body-sm-size)] font-medium text-ondark-muted transition-[transform,border-color,background-color,color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--blue-300)_60%,transparent)] hover:bg-[rgba(20,184,166,.16)] hover:text-white"
        >
          <span
            data-fc-dot=""
            aria-hidden="true"
            className="h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--blue-300)] opacity-55"
          />
          {pill}
        </li>
      ))}
    </ul>
  );
}

/**
 * Financial & Compliance hero — the division's opening chapter.
 *
 * Composition is the identity: the working ledger holds the left half at full
 * height, the editorial column sits right and reads top-down from the section
 * numeral. Deep teal surface, emerald light, nothing decorative that is not a
 * financial object.
 */
export function FinanceHero({ hero }: { hero: FinanceHeroContent }) {
  return (
    <section aria-label={hero.label} className="relative overflow-hidden bg-dark text-ondark">
      {/* stage light — emerald from the ledger side, deep teal in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 52% at 26% 42%, color-mix(in srgb, var(--violet-400) 20%, transparent), transparent 72%), radial-gradient(46% 44% at 92% 8%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 70%)',
        }}
      />

      <Container className="relative grid items-center gap-12 pb-section-sm pt-[128px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-0 lg:pt-[96px] lg:min-h-svh">
        {/* ── left: the animated ledger ── */}
        <Reveal
          delay={0.15}
          y={40}
          className="relative order-2 mx-auto w-full max-w-[560px] lg:order-1 lg:max-w-none"
        >
          <LedgerFieldVisual className="aspect-square w-full" />
        </Reveal>

        {/* ── right: the editorial column ── */}
        <div className="order-1 max-w-[600px] lg:order-2">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[length:var(--text-body-sm-size)] tracking-[.18em] text-[var(--blue-300)]">
                {hero.index}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[color-mix(in_srgb,var(--blue-300)_50%,transparent)]"
              />
              <p className="t-eyebrow t-eyebrow-ondark">{hero.label}</p>
            </div>
          </Reveal>

          <RevealText text={hero.headline} as="h1" className="t-hero ondark-heading mt-5" immediate />

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-[540px] text-ondark-muted">{hero.description}</p>
          </Reveal>

          <CapabilityRail pills={hero.pills} />

          <Reveal delay={0.7}>
            <div className="mt-9">
              <Magnetic>
                <Button href="/contact" iconRight="arrowRight">
                  Speak To A Compliance Advisor
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
