'use client';
import { useEffect, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/** Line-by-line text reveal (opacity + translateY, word-masked). */
export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** animate on mount (hero) instead of on scroll */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = el.querySelectorAll<HTMLElement>('[data-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.section,
          ease: EASE.reveal,
          stagger: STAGGER.text,
          delay,
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, immediate]);
  return (
    <Tag ref={ref} data-reveal="" className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        // the joining space must live OUTSIDE the overflow-hidden box — trailing
        // whitespace inside an inline-block is trimmed and words would run together
        <span key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[.08em] -mb-[.08em] align-top">
            <span data-word="" className="inline-block will-change-transform">
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  );
}
