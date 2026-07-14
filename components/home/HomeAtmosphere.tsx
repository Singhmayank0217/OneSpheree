'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The page's continuous light field. One fixed layer of soft brand auroras
 * sits behind every chapter (z -1, above the canvas base, below all content).
 * The light chapters are transparent, so they read as one evolving surface
 * instead of stacked blocks; the dark chapters paint over it. As the whole
 * page scrolls, the auroras drift slowly in opposite directions — barely
 * perceptible, "almost alive" per the motion spec. Static under reduced motion.
 */
export function HomeAtmosphere() {
  const violetRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const emberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })
        .to(violetRef.current, { yPercent: 26, xPercent: 10, ease: 'none' }, 0)
        .to(blueRef.current, { yPercent: -22, xPercent: -12, ease: 'none' }, 0)
        .to(emberRef.current, { yPercent: 40, xPercent: 6, ease: 'none' }, 0);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* soft radial falloff — no CSS blur filter (large-radius blur on full-viewport
          layers is a compositor killer); the gradient itself provides the softness */}
      <div
        ref={violetRef}
        className="absolute left-[-12%] top-[6%] h-[62vh] w-[62vh] rounded-full opacity-60 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <div
        ref={blueRef}
        className="absolute right-[-10%] top-[42%] h-[58vh] w-[58vh] rounded-full opacity-55 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--blue-500) 12%, transparent), transparent 70%)',
        }}
      />
      <div
        ref={emberRef}
        className="absolute left-[35%] top-[72%] h-[50vh] w-[50vh] rounded-full opacity-45 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--violet-300) 11%, transparent), transparent 72%)',
        }}
      />
    </div>
  );
}
