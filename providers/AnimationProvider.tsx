'use client';
import { useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useLenis } from '@/providers/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

/** How long after a route change the new page is still considered to be
 *  settling. Generous on purpose — a late-committing route can refresh well
 *  after the navigation — and released the instant the visitor takes over. */
const SETTLE_MS = 2500;
/** Anything here means the visitor is driving now — stop holding the top. */
const HANDOVER = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;

/**
 * Route-change scroll and measurement owner.
 *
 * The bug this fixes: navigating to a long page from a scrolled long page
 * opened it part-way down. Next was doing its job — scrollY was measurably 0
 * right after the commit — and then something put the old offset back. The
 * stack named it: `window.scrollTo(0, 1453)` from `gsap/Observer` ← a trigger's
 * `refresh()` inside `_refreshAll`. That restore is deliberate in ScrollTrigger
 * (it stops a resize from throwing you down the page) and there is no per-call
 * opt-out; across a route change the position it restores belongs to the route
 * you just left. /contact showed it loudest only because it is a long page
 * usually reached from another long page — the mechanism is route-agnostic,
 * which is why the fix lives here rather than on the page.
 *
 * Refreshes come from everywhere — this provider, resize, `load`, components
 * re-measuring after their own animations — so instead of bracketing one call,
 * a navigation simply owns the scroll position until the page settles: assert
 * the top, then correct any scroll the visitor did not ask for until either
 * they touch the page or the settling window closes. `clearScrollMemory` also
 * takes the browser out of automatic scroll restoration, which is the same bug
 * arriving by a different door on reload and back/forward — restoring into the
 * middle of a scroll-driven section lands there before its triggers have
 * measured it.
 *
 * A URL that names a target (#anchor) is left alone; that scroll is intended.
 */
export function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    // let the new page paint, then re-measure every trigger against it
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (window.location.hash) return () => cancelAnimationFrame(raf);

    const toTop = () => {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      // invalidate AFTER the move: ScrollTrigger reads scroll through a cached
      // getter, and a refresh reading the pre-move cache would record — and
      // then restore — the position we just left
      ScrollTrigger.clearScrollMemory('manual');
    };
    // Held per frame rather than off the scroll event: a route that commits
    // late can be refreshed — and restored — in the same frame the guard is
    // installed, and a listener registered a moment too late would miss it.
    // The check is a single comparison; nothing runs once the page is settled.
    let hold = 0;
    const started = performance.now();
    const correct = () => {
      if (window.scrollY !== 0) toTop();
    };
    const tick = () => {
      correct();
      if (performance.now() - started < SETTLE_MS) hold = requestAnimationFrame(tick);
      else release();
    };
    const release = () => {
      cancelAnimationFrame(hold);
      window.removeEventListener('scroll', correct);
      HANDOVER.forEach((type) => window.removeEventListener(type, release));
    };

    toTop();
    // the scroll listener corrects inside the same frame as the restore, before
    // it can be painted; the rAF loop is the backstop for the case where the
    // route commits late and the restore lands before the listener is attached
    window.addEventListener('scroll', correct, { passive: true });
    hold = requestAnimationFrame(tick);
    HANDOVER.forEach((type) => window.addEventListener(type, release, { passive: true }));

    return () => {
      cancelAnimationFrame(raf);
      release();
    };
  }, [pathname, lenis]);

  return <>{children}</>;
}
