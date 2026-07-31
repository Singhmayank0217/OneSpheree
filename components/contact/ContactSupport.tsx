'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { SupportMotif } from './ContactSupportMotifs';
import type { SupportCategory } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 4 — business support.
 *
 * Not a row of contact tiles: seven queues, each carrying the colour of the
 * practice that owns it (the same hexes the service pages and the hub cards
 * use), so choosing a queue is visibly choosing a team. General Enquiries takes
 * the full width at the end — it is the catch-all, and reading as a band rather
 * than a tile says so.
 *
 * Motion: CARD ACTIVATION, and every card is on its own trigger. A card lights
 * when it personally reaches 82% of the viewport — its accent floods in, its
 * numeral brightens, and its motif draws itself — so the row wakes up
 * one-by-one as the reader passes rather than all at once on a section stagger.
 * Hover and keyboard focus light a card early. Once lit, a card stays lit; the
 * drawings are illustrations, not a loop demanding attention.
 */
function SupportCard({ category, index, wide }: { category: SupportCategory; index: number; wide: boolean }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => setActive(true),
    });
    return () => trigger.kill();
  }, []);

  const mailto = `mailto:${category.email}?subject=${encodeURIComponent(`Enquiry — ${category.name}`)}`;

  return (
    <article
      ref={ref}
      data-active={active}
      data-support-card=""
      onMouseEnter={() => setActive(true)}
      onFocus={() => setActive(true)}
      style={{ '--accent': category.accent } as CSSProperties}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-line bg-canvas p-6 transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)] hover:bg-card hover:shadow-md sm:p-7 ${
        wide ? 'md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-10' : ''
      }`}
    >
      {/* the queue's own light, held back until the card is active */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-out)] group-data-[active=true]:opacity-100"
        style={{
          background:
            'radial-gradient(78% 58% at 88% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-[900ms] ease-[var(--ease-out)] group-data-[active=true]:scale-x-100"
        style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
      />

      <div className={`relative flex items-start justify-between gap-4 ${wide ? 'lg:w-[280px] lg:shrink-0' : ''}`}>
        <span style={{ color: category.accent }}>
          <SupportMotif motif={category.motif} />
        </span>
        <span className="t-micro text-muted transition-colors duration-[var(--duration-slow)] group-data-[active=true]:text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`relative ${wide ? 'lg:flex-1' : ''}`}>
        <h3 className={`t-h4 ${wide ? 'mt-5 lg:mt-0' : 'mt-5'}`}>{category.name}</h3>
        <p className="mt-2 max-w-[46ch] text-[length:var(--text-body-sm-size)] text-muted">{category.description}</p>
      </div>

      <div
        className={`relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 ${
          wide ? 'lg:mt-0 lg:shrink-0 lg:flex-col lg:items-start' : 'mt-auto pt-6'
        }`}
      >
        <a
          href={mailto}
          className="inline-flex items-center gap-2 text-[length:var(--text-body-sm-size)] font-semibold transition-[gap,color] duration-[var(--duration-base)] hover:gap-[10px]"
          style={{ color: category.accent }}
        >
          <Icon name="mail" size={16} />
          {category.email}
        </a>
        {category.href && (
          <Link
            href={category.href}
            className="inline-flex items-center gap-[6px] text-[length:var(--text-body-sm-size)] text-muted transition-colors duration-[var(--duration-base)] hover:text-heading"
          >
            View the practice
            <Icon name="arrowUpRight" size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}

export function ContactSupport({
  eyebrow,
  headline,
  intro,
  categories,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  categories: SupportCategory[];
}) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="support" aria-label={eyebrow} className="relative scroll-mt-24 bg-card">
      <Container className="py-section">
        <div ref={headRef} className="max-w-[760px]">
          <p className="t-eyebrow">{eyebrow}</p>
          <h2 className="t-display mt-3">{headline}</h2>
          <p className="t-body-lg mt-4 text-muted">{intro}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <SupportCard
              key={category.id}
              category={category}
              index={i}
              wide={i === categories.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
