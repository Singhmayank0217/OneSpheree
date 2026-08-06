'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Icon } from '@/components/ds/Icon';
import { CardVisual } from './HubCardVisuals';
import type { HubServiceCard } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * The interactive services grid — seven editorial cards, each carrying its own
 * colour identity and its own artwork. Hover (or keyboard focus) runs that
 * division's animation; on touch devices, where there is no hover, the card
 * plays once as it scrolls into view so nothing is hidden from those visitors.
 *
 * The accent is passed down as a CSS custom property so the card's whole
 * hover state — border, glow, numeral, arrow — retunes from one value.
 */
function ServiceCard({ card, className }: { card: HubServiceCard; className?: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // touch / no-hover devices: play the artwork once on arrival
    if (!window.matchMedia('(hover: none)').matches) return;
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      once: true,
      onEnter: () => setActive(true),
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ '--accent': card.accent.base, '--accent-glow': card.accent.glow } as CSSProperties}
    >
      <Link
        href={`/services/${card.slug}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.02)] transition-[transform,border-color,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--accent)_65%,transparent)] hover:bg-[rgba(255,255,255,.035)] hover:no-underline focus-visible:-translate-y-[6px]"
      >
        {/* artwork stage */}
        <div className="relative aspect-[320/170] w-full overflow-hidden border-b border-line-dark">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 100%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 72%)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute left-4 top-4 z-10 font-mono text-[11px] tracking-[.1em] text-ondark-muted transition-colors duration-[var(--duration-base)] group-hover:text-[var(--accent-glow)]"
          >
            {card.index}
          </span>
          <div className="absolute inset-0">
            <CardVisual visual={card.visual} active={active} accent={card.accent} />
          </div>
        </div>

        {/* copy */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="t-h3 ondark-heading">{card.name}</h3>
          <p className="mt-1.5 text-[length:var(--text-body-sm-size)] font-medium text-[var(--accent-glow)]">
            {card.headline}
          </p>
          <p className="mt-3 text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
            {card.description}
          </p>

          {/* gateway affordance — styled as a button, but it is a span: the
              whole card is already the link, and a button inside an anchor is
              invalid markup */}
          <span className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 rounded-md border border-line-dark px-[18px] py-[10px] text-[length:var(--text-body-sm-size)] font-semibold text-ondark transition-[background-color,border-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-white">
              Explore Service
              <span className="inline-flex transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-[3px]">
                <Icon name="arrowRight" size={16} />
              </span>
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export function HubServicesGrid({
  eyebrow,
  headline,
  intro,
  cards,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: HubServiceCard[];
}) {
  return (
    <section id="services-grid" aria-label={headline} className="relative scroll-mt-[88px] bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 80% 15%, color-mix(in srgb, var(--violet-500) 10%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="t-eyebrow t-eyebrow-ondark">{eyebrow}</p>
            </Reveal>
            <RevealText text={headline} as="h2" className="t-display ondark-heading mt-3 max-w-[12ch]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[54ch] text-ondark-muted">{intro}</p>
          </Reveal>
        </div>

        <Reveal stagger="cards" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <ServiceCard
              key={card.slug}
              card={card}
              /* a three-track final row carrying one card is centred rather
                 than left hanging under the first column */
              className={
                i === cards.length - 1 && cards.length % 3 === 1 ? 'lg:col-start-2' : undefined
              }
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
