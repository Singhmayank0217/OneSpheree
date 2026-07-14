'use client';
import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * HBA-style scrubbed gallery motion. Each visible item gets two independent
 * scroll-linked animations:
 *   1. a clip-path mask reveal (curtain up) + scale 1.08→1 + fade + slight rise,
 *      scrubbed from ~80% viewport to centre — the image is exposed as it rises;
 *   2. a tiny parallax drift on an oversized inner layer, over its whole pass.
 *
 * Only transform / opacity / clip-path animate. `revealAll()` settles every
 * mask to its exposed state so filtering never flips a half-uncovered card;
 * the grid calls `refresh()` after a Flip so the parallax re-measures the new
 * layout without rebuilding the reveal.
 */
export function useGalleryReveal(containerRef: RefObject<HTMLElement | null>) {
  const revealTriggers = useRef<ScrollTrigger[]>([]);
  const parallaxTriggers = useRef<ScrollTrigger[]>([]);
  const built = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray<HTMLElement>('[data-gallery-item]', el);

    if (reduced) {
      items.forEach((item) => {
        const mask = item.querySelector<HTMLElement>('[data-greveal]');
        if (mask) gsap.set(mask, GALLERY.reveal.to);
      });
      return;
    }

    items.forEach((item) => {
      const mask = item.querySelector<HTMLElement>('[data-greveal]');
      const layer = item.querySelector<HTMLElement>('[data-gpar]');
      if (!mask) return;

      const reveal = gsap.fromTo(mask, GALLERY.reveal.from, {
        clipPath: GALLERY.reveal.to.clipPath,
        yPercent: GALLERY.reveal.to.yPercent,
        scale: GALLERY.reveal.to.scale,
        opacity: GALLERY.reveal.to.opacity,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: GALLERY.reveal.start,
          end: GALLERY.reveal.end,
          scrub: GALLERY.reveal.scrub,
        },
      });
      if (reveal.scrollTrigger) revealTriggers.current.push(reveal.scrollTrigger);

      if (layer) {
        const drift = gsap.fromTo(
          layer,
          { yPercent: -GALLERY.parallax.amount },
          {
            yPercent: GALLERY.parallax.amount,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: GALLERY.parallax.scrub,
            },
          }
        );
        if (drift.scrollTrigger) parallaxTriggers.current.push(drift.scrollTrigger);
      }
    });
    built.current = true;

    return () => {
      revealTriggers.current.forEach((t) => t.kill());
      parallaxTriggers.current.forEach((t) => t.kill());
      revealTriggers.current = [];
      parallaxTriggers.current = [];
      built.current = false;
    };
  }, [containerRef]);

  /** Settle every mask to exposed and retire the scroll reveals (kept parallax). */
  const revealAll = () => {
    const el = containerRef.current;
    if (!el) return;
    revealTriggers.current.forEach((t) => t.kill());
    revealTriggers.current = [];
    const masks = gsap.utils.toArray<HTMLElement>('[data-greveal]', el);
    gsap.set(masks, GALLERY.reveal.to);
  };

  return { revealAll };
}
