'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ds/Button';
import type { ServiceCtaContent } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/**
 * Final CTA — the visual conclusion: a GROWTH HORIZON. An ascending path
 * climbs through waypoint nodes toward a rising light on the horizon line
 * (growth, partnership, arrival); the path draws in on scroll, the horizon
 * glow breathes slowly. Centered closing copy + both CTAs sit above it.
 * The section's darkness runs straight into the global footer beneath.
 */
export function ServiceCtaSection({ cta }: { cta: ServiceCtaContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cta-path]',
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.to('[data-cta-sun]', { opacity: 0.85, scale: 1.06, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
      gsap.to('[data-cta-art]', {
        y: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label={cta.headline} className="relative overflow-hidden bg-dark text-ondark">
      <Container className="relative pt-section text-center">
        <RevealText text={cta.headline} as="h2" className="t-hero ondark-heading mx-auto max-w-[14ch]" />
        <Reveal delay={0.15} className="mx-auto mt-5 flex max-w-[62ch] flex-col gap-3">
          {cta.description.map((p) => (
            <p key={p.slice(0, 24)} className="text-ondark-muted">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Button href={cta.primaryCta.href} size="lg" iconRight="arrowRight">
              {cta.primaryCta.label}
            </Button>
            <Button href={cta.secondaryCta.href} size="lg" variant="outlineDark">
              {cta.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* the growth horizon */}
      <div data-cta-art="" aria-hidden="true" className="relative mx-auto mt-4 w-full max-w-[1100px]">
        <svg viewBox="0 0 1100 300" fill="none" className="w-full" preserveAspectRatio="xMidYMax meet">
          <defs>
            <radialGradient id="cta-sun" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
              <stop offset="45%" stopColor="var(--violet-500)" stopOpacity=".22" />
              <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cta-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--blue-400)" />
              <stop offset="100%" stopColor="var(--violet-300)" />
            </linearGradient>
          </defs>
          {/* horizon glow */}
          <ellipse data-cta-sun="" cx="760" cy="300" rx="420" ry="210" fill="url(#cta-sun)" opacity=".65" />
          {/* horizon line */}
          <path d="M0 299 H1100" stroke="rgba(255,255,255,.16)" />
          {/* faint reference slopes */}
          <path d="M0 292 C 300 288 640 268 1100 190" stroke="rgba(255,255,255,.08)" />
          <path d="M0 296 C 340 292 700 282 1100 246" stroke="rgba(255,255,255,.05)" />
          {/* the ascending path */}
          <path
            data-cta-path=""
            d="M20 286 C 240 280 380 262 520 232 C 660 202 760 170 880 120 C 940 95 990 72 1050 44"
            stroke="url(#cta-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={900}
            strokeDasharray="900 900"
          />
          {/* waypoints */}
          <circle cx="20" cy="286" r="5" fill="var(--blue-300)" />
          <circle cx="520" cy="232" r="4" fill="rgba(255,255,255,.6)" />
          <circle cx="880" cy="120" r="4" fill="var(--violet-300)" />
          {/* arrival */}
          <g transform="translate(1050 44)">
            <circle r="12" fill="color-mix(in srgb, var(--violet-500) 35%, transparent)" stroke="var(--violet-300)" strokeWidth="1.5" />
            <circle r="4" fill="#fff" />
          </g>
        </svg>
      </div>
    </section>
  );
}
