'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { ServiceSectionContent } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/**
 * Performance Marketing — composition B (nothing shared with SEO's split):
 * a full-width centered stage. The headline sits over an oversized stroked
 * numeral; the centerpiece is a conversion-funnel illustration whose stages
 * light up and whose lead particles fall through on scroll (scrubbed); the
 * platforms render as a glass chip band beneath.
 */
export function PerformanceSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // funnel stages light up in sequence as the section crosses the viewport
      gsap.fromTo(
        '[data-pf-stage]',
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: '[data-pf-funnel]', start: 'top 80%', end: 'center 45%', scrub: 0.8 },
        }
      );
      // lead particles drop through the funnel
      gsap.fromTo(
        '[data-pf-lead]',
        { y: -26, opacity: 0 },
        {
          y: 96,
          opacity: 1,
          stagger: 0.18,
          ease: 'none',
          scrollTrigger: { trigger: '[data-pf-funnel]', start: 'top 70%', end: 'center 40%', scrub: 1 },
        }
      );
      // background numeral drifts slower than the content (parallax)
      gsap.to('[data-pf-numeral]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={section.id}
      aria-label={section.headline}
      className="relative overflow-hidden bg-dark text-ondark"
    >
      {/* violet stage tint sweeping the other diagonal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 82% 60%, color-mix(in srgb, var(--violet-500) 15%, transparent), transparent 70%)',
        }}
      />
      {/* oversized stroked numeral behind the stage */}
      <div
        data-pf-numeral=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[8%] hidden font-display font-extrabold leading-none text-transparent lg:block"
        style={{ fontSize: 'clamp(12rem, 26vh, 20rem)', WebkitTextStroke: '1px rgba(255,255,255,.10)' }}
      >
        {section.index}
      </div>

      <Container className="relative border-t border-line-dark py-section text-center">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</p>
        </Reveal>
        <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
        </Reveal>

        {/* conversion funnel illustration */}
        <Reveal delay={0.2} y={40}>
          <div data-pf-funnel="" aria-hidden="true" className="relative mx-auto mt-10 w-full max-w-[520px]">
            <svg viewBox="0 0 520 300" fill="none" className="w-full">
              <defs>
                <linearGradient id="pf-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--blue-400)" stopOpacity=".55" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".85" />
                </linearGradient>
              </defs>
              {/* three funnel stages */}
              <g data-pf-stage="">
                <path d="M60 24 H460 L400 92 H120 Z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.22)" />
                <text x="260" y="64" textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="13" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">REACH</text>
              </g>
              <g data-pf-stage="">
                <path d="M132 104 H388 L340 168 H180 Z" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.26)" />
                <text x="260" y="142" textAnchor="middle" fill="rgba(255,255,255,.65)" fontSize="13" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">CLICKS</text>
              </g>
              <g data-pf-stage="">
                <path d="M192 180 H328 L296 240 H224 Z" fill="url(#pf-glow)" stroke="rgba(255,255,255,.35)" />
                <text x="260" y="216" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2" fontWeight="700">LEADS</text>
              </g>
              {/* lead particles that fall through on scroll */}
              <circle data-pf-lead="" cx="220" cy="70" r="5" fill="var(--blue-300)" />
              <circle data-pf-lead="" cx="262" cy="56" r="4" fill="var(--violet-300)" />
              <circle data-pf-lead="" cx="302" cy="74" r="4.5" fill="#fff" opacity=".8" />
              {/* result line */}
              <path d="M260 244 V272" stroke="rgba(255,255,255,.3)" strokeDasharray="2 5" />
              <circle cx="260" cy="282" r="7" fill="var(--violet-400)" />
            </svg>
          </div>
        </Reveal>

        {/* platform chip band */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-4">
          {section.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.045)] px-3 py-4 backdrop-blur-sm transition-colors duration-[var(--duration-base)] hover:border-[var(--violet-400)]"
            >
              <span className="text-[var(--violet-300)]">
                <ServiceIcon name={item.icon} size={21} />
              </span>
              <span className="text-[length:var(--text-body-sm-size)] font-medium leading-tight text-ondark">
                {item.label}
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
