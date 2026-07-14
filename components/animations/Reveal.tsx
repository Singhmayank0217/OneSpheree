'use client';
import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REVEAL_FROM, REVEAL_TO, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section-reveal wrapper: fade + translateY + blur reduction on scroll entry.
 * `stagger` animates direct children instead of the wrapper (cards, stats…).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  stagger,
  delay = 0,
  y = REVEAL_FROM.y,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: keyof typeof STAGGER;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...REVEAL_FROM, y },
        {
          ...REVEAL_TO,
          delay,
          stagger: stagger ? STAGGER[stagger] : 0,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [stagger, delay, y]);
  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
