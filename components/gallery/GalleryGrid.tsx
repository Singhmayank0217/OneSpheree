'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryItem } from './GalleryItem';
import { GalleryEmpty } from './GalleryEmpty';
import { useGalleryReveal } from '@/hooks/useGalleryReveal';
import type { GalleryProject } from '@/types/gallery';

gsap.registerPlugin(Flip, ScrollTrigger);

/**
 * The exhibition grid. Every project is always in the DOM; filtering toggles a
 * `--hidden` class and GSAP Flip animates the remaining items to their new
 * positions (enter/leave fades for the delta) — no reflow jump, no reload.
 * Initial entrance is handled by the scroll reveal; the first user action calls
 * `revealAll()` so nothing flips in half-uncovered.
 */
export function GalleryGrid({
  projects,
  visibleSlugs,
}: {
  projects: GalleryProject[];
  visibleSlugs: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { revealAll } = useGalleryReveal(containerRef);
  const firstRun = useRef(true);
  const visibleKey = visibleSlugs.join('|');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = gsap.utils.toArray<HTMLElement>('[data-gallery-item]', el);
    const visible = new Set(visibleSlugs);
    const apply = () =>
      items.forEach((it) => it.classList.toggle('gallery-item--hidden', !visible.has(it.dataset.slug!)));

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (firstRun.current) {
      firstRun.current = false;
      apply();
      return;
    }
    if (reduced) {
      apply();
      return;
    }

    revealAll(); // settle any mid-reveal item before capturing Flip state
    const state = Flip.getState(items, { props: 'opacity' });
    apply();
    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      stagger: 0.015,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }),
      // re-measure parallax triggers against the reorganised layout
      onComplete: () => ScrollTrigger.refresh(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleKey]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3"
        aria-live="polite"
      >
        {projects.map((p, i) => (
          <GalleryItem key={p.slug} project={p} priority={i < 3} />
        ))}
      </div>
      {visibleSlugs.length === 0 && <GalleryEmpty />}
    </div>
  );
}
