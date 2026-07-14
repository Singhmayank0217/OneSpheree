'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/** Animated statistic counter — 2s, power2.out, runs once on scroll entry. */
export function Counter({
  value,
  suffix = '',
  className,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  className?: string;
  /** seconds — lets staged builds (hero) start the count with the reveal */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value,
        duration: DURATION.counter,
        ease: EASE.out,
        delay,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(state.n)}${suffix}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix, delay]);
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
