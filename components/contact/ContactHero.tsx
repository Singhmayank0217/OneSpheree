'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { Magnetic } from '@/components/animations/Magnetic';
import { ContactSignalField } from './ContactSignalField';
import { ContactAction } from './ContactAction';
import type { ContactHeroContent } from '@/types/contact';

/**
 * Section 1 — the editorial hero.
 *
 * A left-weighted statement standing in front of the signal field, so the
 * headline reads as the message and the artwork as the medium carrying it.
 * Deliberately not the centred poster the services hub opens on.
 *
 * Motion: a MASKED LINE REVEAL. Each headline line lives in its own clipping
 * box and rises out of it, so the words are uncovered rather than faded — the
 * one gesture that belongs to this section and appears nowhere else on the
 * page. It runs on mount (the hero is above the fold; a ScrollTrigger would
 * fire mid-animation), and everything else settles after it: rule, eyebrow,
 * description, actions, scroll cue.
 */
export function ContactHero({ hero }: { hero: ContactHeroContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-hero-eyebrow]', { opacity: 0, x: -12 });
      gsap.set('[data-hero-line]', { yPercent: 108 });
      gsap.set('[data-hero-desc]', { opacity: 0, y: 18 });
      gsap.set('[data-hero-action]', { opacity: 0, y: 16 });
      gsap.set('[data-hero-cue]', { opacity: 0 });

      gsap
        .timeline({ delay: 0.25 })
        .to('[data-hero-rule]', { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0)
        .to('[data-hero-eyebrow]', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
        // the uncovering — the section's signature gesture
        .to('[data-hero-line]', { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.085 }, 0.3)
        .to('[data-hero-desc]', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.95)
        .to(
          '[data-hero-action]',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 },
          1.15
        )
        .to('[data-hero-cue]', { opacity: 1, duration: 0.8, ease: 'sine.out' }, 1.5);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label={hero.eyebrow}
      className="relative flex min-h-svh items-center overflow-hidden bg-dark text-ondark"
    >
      {/* the field fills the frame, weighted to the right where the receiver sits */}
      <ContactSignalField className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />

      {/* left scrim — the statement always sits in front of the traffic */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(10,12,16,.94) 0%, rgba(10,12,16,.86) 32%, rgba(10,12,16,.42) 58%, transparent 82%)',
        }}
      />

      {/* Top padding clears the fixed navbar and nothing more — the section is
          `items-center` on a full viewport, so any extra here reads as a gap
          between the nav and the statement. Matches the home hero exactly. */}
      <Container className="relative z-10 pb-12 pt-[120px]">
        <div className="max-w-[760px]">
          <div className="flex items-center gap-3">
            <span
              data-hero-rule=""
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--violet-400)] sm:w-16"
            />
            <p data-hero-eyebrow="" className="t-eyebrow t-eyebrow-ondark">
              {hero.eyebrow}
            </p>
          </div>

          {/* Each line gets its own clipping box. The negative margin cancels
              the padding that keeps descenders inside the mask, so the type
              sits on its normal baseline grid. */}
          <h1 className="t-hero ondark-heading mt-6 lg:text-[4.5rem] xl:text-[5rem]">
            {hero.headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[.08em] -mb-[.08em]">
                <span data-hero-line="" className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-desc="" className="t-body-lg mt-8 max-w-[62ch] text-ondark-muted">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span data-hero-action="" className="inline-block">
              <Magnetic>
                <ContactAction cta={hero.primaryCta} />
              </Magnetic>
            </span>
            <span data-hero-action="" className="inline-block">
              <ContactAction cta={hero.secondaryCta} variant="outlineDark" icon="clock" />
            </span>
          </div>
        </div>
      </Container>

      {/* scroll cue — the drawn line loop the rest of the site uses */}
      <div
        data-hero-cue=""
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="t-micro text-ondark-muted">Scroll</span>
        <span className="block h-10 w-px overflow-hidden bg-[rgba(255,255,255,.14)]">
          <span className="scroll-cue block h-full w-full bg-[var(--violet-400)]" />
        </span>
      </div>

      {/* seam into the enquiry section, which stays on the same dark stage */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-dark))' }}
      />
    </section>
  );
}
