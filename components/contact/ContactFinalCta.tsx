'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Magnetic } from '@/components/animations/Magnetic';
import { ContactAction } from './ContactAction';
import type { ContactFinalCtaContent } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 6 — the closing statement: THE ASCENT.
 *
 * A horizon is struck across the dark, a staircase of light climbs out of it
 * left to right, and the statement TRACKS IN over the top — letters set wide
 * and drawing together onto their final measure, the way a title lands. That
 * tracking-in is the section's signature and appears nowhere else on the page
 * or the site.
 *
 * Deliberately NOT the site's other endings: no expanding aperture or portal
 * rings (the services hub), no centred bloom behind a magnetic button (the home
 * page), no per-word rise, no drifting particles. Afterwards the staircase
 * breathes and one slow light passes behind the words — the page rests rather
 * than keeps performing, and it all stops when the section leaves the viewport.
 */

/** The staircase — 18 columns climbing to the right, with a little unevenness. */
const STEPS = [8, 12, 11, 17, 22, 20, 28, 34, 31, 40, 47, 44, 55, 62, 58, 71, 84, 96];

export function ContactFinalCta({ cta }: { cta: ContactFinalCtaContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* ── resting state ───────────────────────────────────────────────── */
      gsap.set('[data-cta-field]', { opacity: 0 });
      gsap.set('[data-cta-horizon]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-cta-glow]', { opacity: 0 });
      gsap.set('[data-cta-step]', { scaleY: 0, transformOrigin: 'center bottom', opacity: 0 });
      gsap.set('[data-cta-eyebrow]', { opacity: 0, y: 12 });
      gsap.set('[data-cta-title]', { opacity: 0, letterSpacing: '.19em', scale: 1.015 });
      gsap.set('[data-cta-rule]', { scaleX: 0 });
      gsap.set('[data-cta-body]', { opacity: 0, y: 16 });
      gsap.set('[data-cta-act]', { opacity: 0, y: 18 });
      gsap.set('[data-cta-sign]', { opacity: 0 });
      gsap.set('[data-cta-pass]', { opacity: 0, xPercent: -26 });

      /* ── the arrival: ground first, then the statement lands ─────────── */
      const enter = gsap.timeline({ paused: true });
      enter
        .to('[data-cta-field]', { opacity: 1, duration: 1.6, ease: 'sine.out' }, 0)
        .to('[data-cta-horizon]', { scaleX: 1, duration: 1.5, ease: 'expo.out' }, 0.1)
        .to('[data-cta-glow]', { opacity: 1, duration: 1.9, ease: 'sine.out' }, 0.25)
        .to(
          '[data-cta-step]',
          { scaleY: 1, opacity: 1, duration: 1.15, ease: 'expo.out', stagger: 0.045 },
          0.45
        )
        .to('[data-cta-eyebrow]', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8)
        // the tracking-in — wide letters drawing onto their measure, line by line
        .to(
          '[data-cta-title]',
          {
            opacity: 1,
            letterSpacing: '-.02em',
            scale: 1,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.12,
            clearProps: 'letterSpacing,scale',
          },
          1
        )
        .to('[data-cta-rule]', { scaleX: 1, duration: 1.1, ease: 'expo.out' }, 1.9)
        .to('[data-cta-body]', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.05)
        .to('[data-cta-act]', { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1 }, 2.25)
        .to('[data-cta-sign]', { opacity: 1, duration: 1, ease: 'sine.out' }, 2.6);

      /* ── afterwards: the ground breathes, one light passes ───────────── */
      const ambient = gsap.timeline({ paused: true });
      ambient
        .to(
          '[data-cta-step]',
          {
            opacity: 0.45,
            duration: 5.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.24, from: 'start' },
          },
          0
        )
        .to('[data-cta-glow]', { opacity: 0.6, duration: 6.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0)
        .fromTo(
          '[data-cta-pass]',
          { opacity: 0, xPercent: -26 },
          { opacity: 0.9, xPercent: 26, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 },
          0
        );

      let arrived = false;
      let inView = false;
      enter.eventCallback('onComplete', () => {
        arrived = true;
        if (inView) ambient.play();
      });

      ScrollTrigger.create({ trigger: el, start: 'top 74%', once: true, onEnter: () => enter.play() });
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => {
          inView = isActive;
          if (isActive && arrived) ambient.play();
          else ambient.pause();
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label={cta.headline.join(' ')}
      className="relative flex min-h-[86vh] items-center overflow-hidden bg-dark text-ondark"
    >
      {/* the field this all stands in */}
      <span
        data-cta-field=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 108%, color-mix(in srgb, var(--violet-900) 62%, transparent), transparent 70%)',
        }}
      />

      {/* the staircase climbing out of the horizon */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[42%] items-end gap-[4px] px-2 sm:gap-[8px] sm:px-6"
      >
        {STEPS.map((height, i) => (
          <span
            key={i}
            data-cta-step=""
            className="flex-1 rounded-t-[3px]"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, color-mix(in srgb, var(--violet-500) ${
                14 + i * 2
              }%, transparent), transparent)`,
            }}
          />
        ))}
      </span>

      {/* the horizon itself, and the warmth sitting on it */}
      <span
        data-cta-glow=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[42%] h-[220px] -translate-y-1/2"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 50%, color-mix(in srgb, var(--violet-500) 28%, transparent), transparent 74%)',
        }}
      />
      <span
        data-cta-horizon=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[42%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--violet-300) 70%, transparent) 45%, transparent)',
        }}
      />

      {/* the slow light passing behind the statement */}
      <span
        data-cta-pass=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[440px] w-[820px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in srgb, var(--violet-400) 20%, transparent), transparent 78%)',
        }}
      />

      {/* a scrim so the type never fights the ground */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(52% 40% at 50% 40%, rgba(10,12,16,.72), rgba(10,12,16,.28) 58%, transparent 80%)',
        }}
      />

      <Container className="relative z-10 py-[120px] text-center lg:py-[152px]">
        <p data-cta-eyebrow="" className="t-eyebrow t-eyebrow-ondark">
          {cta.eyebrow}
        </p>

        <h2 className="t-hero ondark-heading mx-auto mt-6 max-w-[24ch] lg:text-[4.25rem]">
          {cta.headline.map((line) => (
            <span key={line} data-cta-title="" className="block will-change-transform">
              {line}
            </span>
          ))}
        </h2>

        <span
          data-cta-rule=""
          aria-hidden="true"
          className="mx-auto mt-10 block h-px w-full max-w-[420px]"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--violet-400), transparent)',
          }}
        />

        <p data-cta-body="" className="mx-auto mt-9 max-w-[56ch] text-ondark-muted">
          {cta.description}
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <span data-cta-act="" className="inline-block">
            <Magnetic>
              <ContactAction cta={cta.primaryCta} />
            </Magnetic>
          </span>
          <span data-cta-act="" className="inline-block">
            <ContactAction cta={cta.secondaryCta} variant="outlineDark" />
          </span>
        </div>

        <p data-cta-sign="" className="t-micro mt-12 text-ondark-muted">
          {cta.signature}
        </p>
      </Container>
    </section>
  );
}
