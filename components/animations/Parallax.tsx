'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARALLAX_MAX } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/** Scroll parallax, capped at ±40px. speed −1…1 (negative = slower than scroll). */
export function Parallax({
  children,
  speed = -0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dist = Math.max(-1, Math.min(1, speed)) * PARALLAX_MAX;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -dist },
        {
          y: dist,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [speed]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
