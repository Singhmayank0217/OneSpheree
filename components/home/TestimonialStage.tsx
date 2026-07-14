'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { testimonials } from '@/data/testimonials';
import { DURATION, EASE } from '@/lib/animations';

const ROTATE_SECONDS = 7;

/**
 * Testimonials — a quote stage, not a carousel. One large quote holds the
 * room; every few seconds the next one rises in (GSAP crossfade). A thin
 * progress line shows the interval; hover or focus pauses it; the index
 * buttons switch directly. Reduced motion: no auto-rotation.
 */
export function TestimonialStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // entrance of the incoming quote
  useEffect(() => {
    const el = quoteRef.current;
    if (!el || reduced()) return;
    const tween = gsap.fromTo(
      el.children,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: DURATION.section, ease: EASE.reveal, stagger: 0.08 }
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  // interval + progress line
  useEffect(() => {
    if (reduced()) return;
    progressTween.current?.kill();
    progressTween.current = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: ROTATE_SECONDS,
        ease: 'none',
        onComplete: () => setActive((a) => (a + 1) % testimonials.length),
      }
    );
    if (paused) progressTween.current.pause();
    return () => {
      progressTween.current?.kill();
    };
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <section
      aria-label="What clients say"
      className="relative z-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container narrow className="py-section">
        <Reveal>
          <p className="t-eyebrow">What clients say</p>
        </Reveal>
        <div className="relative mt-6 min-h-[16rem] lg:min-h-[14rem]" aria-live="polite">
          <div ref={quoteRef} key={active}>
            <blockquote className="font-display text-[clamp(1.625rem,3.4vw,2.5rem)] font-semibold leading-[1.3] tracking-[-.01em] text-heading">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-[.9375rem] font-bold text-white"
              >
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold text-heading">{t.name}</span>
                <span className="t-caption block">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex gap-1" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((item, i) => (
              <button
                key={item.company}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial from ${item.company}`}
                onClick={() => setActive(i)}
                className={`h-[10px] w-[10px] rounded-full transition-colors duration-[var(--duration-base)] ${
                  i === active ? 'bg-primary' : 'bg-[var(--ink-300)] hover:bg-[var(--ink-400)]'
                }`}
              />
            ))}
          </div>
          <span className="relative block h-px w-32 bg-line" aria-hidden="true">
            <span ref={progressRef} className="absolute inset-0 origin-left scale-x-0 bg-primary" />
          </span>
          <span className="t-caption font-mono" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </Container>
    </section>
  );
}
