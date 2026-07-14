'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Magnetic } from '@/components/animations/Magnetic';
import { RevealText } from '@/components/animations/RevealText';
import { HeroStats } from './HeroStats';
import { DURATION, EASE } from '@/lib/animations';
import { site } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

/** Staged-build timing (seconds) — background drifts in first, brand story follows. */
const STAGE = {
  eyebrow: 0.2,
  headline: 0.35,
  subtitle: 0.85,
  ctas: 1.0,
  stats: 1.2,
  scrollCue: 1.8,
} as const;

/**
 * Home hero — DS Hero section (dark stage, violet/blue glow, centered editorial
 * type) built as a slow 1.4s entrance over the network-sphere particle field.
 * Scrolling out eases the content up faster than the background (continuity
 * into the services chapter), capped at transform/opacity.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // staged entrance — every element carries its own beat in data-hero-item
      section.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: DURATION.section, ease: EASE.reveal, delay: Number(el.dataset.heroItem) }
        );
      });
      // exit: content lifts and dims ahead of the background as the next section arrives
      gsap.to(contentRef.current, {
        yPercent: -10,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-dark text-ondark"
    >
      {/* background: DS glow + particle network sphere (static glow is the no-JS fallback) */}
      <div aria-hidden="true" className="bg-hero-glow absolute inset-0" />
      <HeroBackground />

      <Container className="relative">
        <div ref={contentRef} className="pb-12 pt-[120px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
            <p data-hero-item={STAGE.eyebrow} data-reveal="" className="t-eyebrow t-eyebrow-ondark">
              Enterprise Business Solutions
            </p>
            <RevealText
              text={site.tagline}
              as="h1"
              className="t-hero ondark-heading"
              immediate
              delay={STAGE.headline}
            />
            <p
              data-hero-item={STAGE.subtitle}
              data-reveal=""
              className="t-body-lg max-w-[560px] text-ondark-muted"
            >
              {site.name} unifies digital marketing, fire safety, due diligence, e-commerce, workforce and
              consulting solutions into one accountable partner for enterprise growth.
            </p>
            <div data-hero-item={STAGE.ctas} data-reveal="" className="mt-1 flex flex-wrap justify-center gap-2">
              <Magnetic>
                <Button href="/contact" size="lg" iconRight="arrowRight">
                  Get a Consultation
                </Button>
              </Magnetic>
              <Button href="/services" size="lg" variant="outlineDark">
                Explore Services
              </Button>
            </div>
          </div>
          <div data-hero-item={STAGE.stats} data-reveal="" className="mt-10">
            <HeroStats countDelay={STAGE.stats} />
          </div>
        </div>
      </Container>

      <div
        data-hero-item={STAGE.scrollCue}
        data-reveal=""
        aria-hidden="true"
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="t-micro text-ondark-muted">Scroll</span>
        <span className="scroll-cue block h-[40px] w-px bg-[rgba(255,255,255,.35)]" />
      </div>
    </section>
  );
}
