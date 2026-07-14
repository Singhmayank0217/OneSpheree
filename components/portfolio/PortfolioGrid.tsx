'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioEmpty } from './PortfolioEmpty';
import type { PortfolioProject } from '@/types/portfolio';

gsap.registerPlugin(Flip, ScrollTrigger);

const HIDDEN = { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, scale: 1.05 } as const;
const SHOWN = { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 } as const;

/**
 * Portfolio grid. Every project stays mounted; the visible set and the single
 * expanded card are both declarative. One GSAP Flip drives BOTH interactions —
 * filtering (cards leave / the layout repacks / cards enter) and unfolding (a
 * card grows to a full-width board, siblings reflow). Images uncover on entry
 * with a one-time mask reveal that is settled before any Flip so nothing
 * animates half-covered.
 */
export function PortfolioGrid({
  projects,
  visibleSlugs,
}: {
  projects: PortfolioProject[];
  visibleSlugs: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const prevState = useRef<Flip.FlipState | null>(null);
  const batch = useRef<ScrollTrigger[]>([]);
  const firstRun = useRef(true);

  const visible = new Set(visibleSlugs);
  const visibleKey = visibleSlugs.join('|');

  const settleReveals = () => {
    const el = containerRef.current;
    if (!el) return;
    batch.current.forEach((t) => t.kill());
    batch.current = [];
    gsap.set(gsap.utils.toArray<HTMLElement>('[data-preveal]', el), SHOWN);
  };

  // one-time mask reveal as cards enter the viewport
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const imgs = gsap.utils.toArray<HTMLElement>('[data-preveal]', el);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(imgs, SHOWN);
      return;
    }
    gsap.set(imgs, HIDDEN);
    batch.current = ScrollTrigger.batch(imgs, {
      start: 'top 88%',
      once: true,
      onEnter: (b) => gsap.to(b, { ...SHOWN, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });
    return () => batch.current.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flip for both filtering and unfolding (prev-state pattern for React)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-portfolio-card]', el);
    const from = prevState.current;
    prevState.current = Flip.getState(cards, { props: 'opacity' });

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!from || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    settleReveals();
    Flip.from(from, {
      duration: 0.62,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      stagger: 0.015,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3, ease: 'power2.in' }),
      onComplete: () => ScrollTrigger.refresh(),
    });

    // unfold: gently reveal the panel of the newly expanded card
    if (expanded) {
      const panel = el.querySelector<HTMLElement>('.is-expanded [data-portfolio-panel]');
      if (panel) gsap.from(panel, { opacity: 0, y: 14, duration: 0.45, delay: 0.12, ease: 'power2.out' });
    }
  }, [visibleKey, expanded]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <PortfolioCard
            key={p.slug}
            project={p}
            hidden={!visible.has(p.slug)}
            expanded={expanded === p.slug}
            onToggle={() => setExpanded((cur) => (cur === p.slug ? null : p.slug))}
          />
        ))}
      </div>
      {visibleSlugs.length === 0 && <PortfolioEmpty />}
    </div>
  );
}
