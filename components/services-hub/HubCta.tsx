'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Button, type ButtonVariant } from '@/components/ds/Button';
import { HubJumpButton } from './HubJumpButton';
import { servicesHub } from '@/data/services-hub';
import type { HubCtaContent } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Final CTA — composition: THE APERTURE (expanding light portal).
 *
 * The page opens on the hub ecosystem, whose centre is a small aperture of six
 * coloured segments. It closes on that same aperture reopened at full scale: a
 * light well emerges, concentric rings expand outward through it, and the six
 * division colours resolve on one ring — a threshold the reader is standing in
 * front of at the end of the journey. The statement is unmasked by a curtain
 * rise inside the portal, a threshold rule draws beneath it, and the actions
 * settle in last, once the light has stopped moving.
 *
 * Deliberately NOT: the per-word reveal used everywhere else on the site, a
 * travelling path (that is the Process section directly above, and the service
 * pages' growth horizon), converging modules (that is the hero), a specular
 * sweep, or drifting particles. Everything runs off ONE timeline so the
 * section reads as a single cinematic beat rather than several independent
 * animations, then hands over to a slow ambient loop that is paused whenever
 * the section is off screen.
 *
 * Geometry note: the portal's arc endpoints are literals (a 1200×900 stage
 * with the aperture centred on 600,430 and the segmented ring at r=430), so no
 * trigonometry runs during render and SSR matches the client exactly.
 */

/** the six 52° segments of the aperture, one per division */
const PORTAL_ARCS = [
  'M411.50 43.52A430 430 0 0 1 788.50 43.52',
  'M840.45 73.51A430 430 0 0 1 1028.95 400.00',
  'M1028.95 460.00A430 430 0 0 1 840.45 786.49',
  'M788.50 816.48A430 430 0 0 1 411.50 816.48',
  'M359.55 786.49A430 430 0 0 1 171.05 460.00',
  'M171.05 400.00A430 430 0 0 1 359.55 73.51',
];

/** faint structural rings — the portal's depth */
const PORTAL_RINGS = [
  { r: 200, o: 0.09 },
  { r: 300, o: 0.07 },
  { r: 545, o: 0.05 },
  { r: 665, o: 0.035 },
  { r: 800, o: 0.022 },
];

/**
 * Either CTA may be an in-page jump or a route. Jumps go through
 * HubJumpButton so Lenis performs the scroll (a bare hash link moves the
 * window behind its back).
 */
function renderCta(cta: { label: string; href: string }, variant?: ButtonVariant) {
  if (cta.href.startsWith('#')) {
    return (
      <HubJumpButton targetId={cta.href.slice(1)} variant={variant}>
        {cta.label}
      </HubJumpButton>
    );
  }
  return (
    <Button href={cta.href} size="lg" variant={variant} iconRight="arrowRight">
      {cta.label}
    </Button>
  );
}

export function HubCta({ cta }: { cta: HubCtaContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const cards = servicesHub.grid.cards;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* ── resting state ───────────────────────────────────────────────── */
      gsap.set('[data-portal-field]', { opacity: 0 });
      gsap.set('[data-portal-well]', { opacity: 0, scale: 0.72, transformOrigin: '50% 50%' });
      gsap.set('[data-portal-ring]', { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' });
      gsap.set('[data-portal-arc]', { opacity: 0, strokeDashoffset: 100 });
      gsap.set('[data-cta-rule]', { scaleX: 0 });
      gsap.set('[data-cta-eyebrow]', { opacity: 0 });
      gsap.set('[data-cta-headline]', { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 7 });
      gsap.set('[data-cta-threshold]', { scaleX: 0 });
      gsap.set('[data-cta-desc]', { opacity: 0, y: 16 });
      gsap.set('[data-cta-action]', { opacity: 0, y: 14, scale: 0.96 });
      gsap.set('[data-cta-halo]', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });
      gsap.set('[data-cta-spectrum] > span', { scaleX: 0 });

      /* ── the arrival: one sequence, light first, action last ─────────── */
      const enter = gsap.timeline({ paused: true });
      enter
        // ambience
        .to('[data-portal-field]', { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, 0)
        .to('[data-portal-well]', { opacity: 1, scale: 1, duration: 1.7, ease: 'expo.out' }, 0.1)
        // the portal opens
        .to(
          '[data-portal-ring]',
          { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', stagger: 0.09 },
          0.35
        )
        .to('[data-portal-arc]', { opacity: 1, duration: 0.5, ease: 'sine.out', stagger: 0.05 }, 0.75)
        .to(
          '[data-portal-arc]',
          { strokeDashoffset: 0, duration: 1.3, ease: 'expo.out', stagger: 0.05 },
          0.75
        )
        // the statement is uncovered inside the light
        .to('[data-cta-rule]', { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0.95)
        .to('[data-cta-eyebrow]', { opacity: 1, duration: 0.7, ease: 'sine.out' }, 1)
        .to(
          '[data-cta-headline]',
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            yPercent: 0,
            duration: 1.25,
            ease: 'expo.out',
            // the clip is removed once it has served its purpose, so no
            // clipping region survives the animation at any viewport
            onComplete: () => gsap.set('[data-cta-headline]', { clearProps: 'clipPath' }),
          },
          1.15
        )
        // the threshold, then the invitation
        .to('[data-cta-threshold]', { scaleX: 1, duration: 1.1, ease: 'expo.out' }, 1.85)
        .to('[data-cta-desc]', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2)
        .to('[data-cta-halo]', { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, 2.2)
        .to(
          '[data-cta-action]',
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out', stagger: 0.1 },
          2.3
        )
        .to(
          '[data-cta-spectrum] > span',
          { scaleX: 1, duration: 0.9, ease: 'power3.out', stagger: 0.07 },
          2.6
        );

      /* ── afterwards: the light keeps breathing, nothing travels ──────── */
      const ambient = gsap.timeline({ paused: true });
      ambient
        .to(
          '[data-portal-well]',
          { opacity: 0.86, scale: 1.06, duration: 6.2, ease: 'sine.inOut', yoyo: true, repeat: -1 },
          0
        )
        .to(
          '[data-portal-ring]',
          {
            scale: 1.014,
            duration: 8.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.9, from: 'center' },
          },
          0
        )
        .to(
          '[data-portal-arc]',
          { opacity: 0.55, duration: 5.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.5 },
          0
        )
        .to(
          '[data-cta-halo]',
          { opacity: 0.55, scale: 1.05, duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1 },
          0
        );

      // the ambient loop is held until the arrival has finished — several of
      // its properties are also driven by the entrance
      let arrived = false;
      let inView = false;
      enter.eventCallback('onComplete', () => {
        arrived = true;
        if (inView) ambient.play();
      });

      ScrollTrigger.create({ trigger: el, start: 'top 72%', once: true, onEnter: () => enter.play() });
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
    <section ref={rootRef} aria-label={cta.headline} className="relative overflow-hidden bg-dark text-ondark">
      {/* ── depth 1: the deep field this all sits in ── */}
      <span
        data-portal-field=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 76% at 50% 34%, color-mix(in srgb, var(--violet-900) 55%, transparent), transparent 72%)',
        }}
      />

      {/* ── depth 2: the portal ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] w-[min(1360px,168vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <svg viewBox="0 0 1200 900" fill="none" className="w-full">
          <defs>
            <radialGradient id="cta-portal-well" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".34" />
              <stop offset="34%" stopColor="var(--violet-500)" stopOpacity=".20" />
              <stop offset="70%" stopColor="var(--violet-600)" stopOpacity=".07" />
              <stop offset="100%" stopColor="var(--violet-700)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the light well behind the statement */}
          <circle data-portal-well="" cx="600" cy="430" r="470" fill="url(#cta-portal-well)" />

          {/* structural rings expanding outward */}
          {PORTAL_RINGS.map((ring) => (
            <circle
              key={ring.r}
              data-portal-ring=""
              cx="600"
              cy="430"
              r={ring.r}
              stroke="#fff"
              strokeOpacity={ring.o}
              strokeWidth="1"
            />
          ))}

          {/* the aperture — the six divisions, reopened at full scale */}
          {PORTAL_ARCS.map((d, i) => (
            <path
              key={cards[i].slug}
              data-portal-arc=""
              d={d}
              stroke={cards[i].accent.base}
              strokeOpacity=".34"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
            />
          ))}
        </svg>
      </span>

      {/* ── depth 3: a soft scrim so the statement always sits in front ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(46% 34% at 50% 40%, rgba(10,12,16,.82), rgba(10,12,16,.35) 55%, transparent 78%)',
        }}
      />

      {/* ── the statement ── */}
      <Container className="relative border-t border-line-dark">
        <div className="mx-auto flex min-h-[660px] max-w-[1000px] flex-col items-center justify-center py-[120px] text-center lg:min-h-[780px] lg:py-[152px]">
          <div className="flex items-center gap-4">
            <span
              data-cta-rule=""
              aria-hidden="true"
              className="h-px w-10 origin-right bg-gradient-to-r from-transparent to-[var(--violet-400)] sm:w-16"
            />
            <p data-cta-eyebrow="" className="t-eyebrow t-eyebrow-ondark">
              {cta.eyebrow}
            </p>
            <span
              data-cta-rule=""
              aria-hidden="true"
              className="h-px w-10 origin-left bg-gradient-to-l from-transparent to-[var(--violet-400)] sm:w-16"
            />
          </div>

          {/* The curtain rise happens on this wrapper. Its padding is in px,
              not em — em/ch here would resolve against the inherited body
              font, not the hero type — and is cancelled by matching negative
              margins so the clip box is larger than the glyphs without
              altering the layout. The clip is cleared once it finishes. */}
          <div data-cta-headline="" className="-mx-2 -mb-3 mt-7 px-2 pb-3">
            <h2 className="t-hero ondark-heading mx-auto max-w-[18ch]">{cta.headline}</h2>
          </div>

          <span
            data-cta-threshold=""
            aria-hidden="true"
            className="mt-10 block h-px w-full max-w-[460px] bg-gradient-to-r from-transparent via-[var(--violet-500)] to-transparent"
          />

          <p data-cta-desc="" className="mx-auto mt-9 max-w-[58ch] text-ondark-muted">
            {cta.description}
          </p>

          <div className="relative mt-11 flex flex-wrap justify-center gap-3">
            {/* the light settling around the invitation */}
            <span
              data-cta-halo=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[620px] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 76%)',
              }}
            />
            <span data-cta-action="" className="relative">
              {renderCta(cta.primaryCta)}
            </span>
            <span data-cta-action="" className="relative">
              {renderCta(cta.secondaryCta, 'outlineDark')}
            </span>
          </div>
        </div>
      </Container>

      {/* six divisions, one spectrum — the seam into the footer */}
      <div data-cta-spectrum="" aria-hidden="true" className="relative flex w-full">
        {cards.map((c) => (
          <span
            key={c.slug}
            className="h-[3px] flex-1"
            style={{ background: `linear-gradient(90deg, ${c.accent.base}, ${c.accent.glow})` }}
          />
        ))}
      </div>
    </section>
  );
}
