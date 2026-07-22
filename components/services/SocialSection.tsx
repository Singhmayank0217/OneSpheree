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
 * Social Media Marketing — composition C (shares nothing with SEO's sticky
 * split or Performance's centered funnel): an asymmetric spread. The
 * engagement-orbit artwork anchors the LEFT while the narrative sits offset
 * RIGHT; the services flow beneath as a wrapped cloud of icon pills. Orbit
 * bubbles counter-rotate continuously; the whole artwork drifts on scroll.
 */
export function SocialSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-soc-orbit]', { rotation: 360, duration: 60, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      // bubbles counter-rotate so they stay upright while orbiting
      gsap.to('[data-soc-bubble]', { rotation: -360, duration: 60, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('[data-soc-art]', {
        y: -30,
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 25% 55%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 20%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* engagement orbit artwork — anchors the left */}
          <Reveal y={40} className="order-2 lg:order-1">
            <div data-soc-art="" aria-hidden="true" className="mx-auto w-full max-w-[460px]">
              <svg viewBox="0 0 460 460" fill="none" className="w-full">
                <defs>
                  <radialGradient id="soc-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".9" />
                    <stop offset="100%" stopColor="var(--violet-600)" stopOpacity=".5" />
                  </radialGradient>
                </defs>
                {/* audience field */}
                <circle cx="230" cy="230" r="206" stroke="rgba(255,255,255,.10)" strokeDasharray="2 8" />
                <circle cx="230" cy="230" r="140" stroke="rgba(255,255,255,.14)" strokeDasharray="1 6" />
                {/* brand core */}
                <circle cx="230" cy="230" r="52" fill="url(#soc-core)" />
                <circle cx="230" cy="230" r="52" stroke="rgba(255,255,255,.4)" />
                <path d="M214 236c4 8 12 12 16 12s12-4 16-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="216" cy="220" r="4" fill="#fff" />
                <circle cx="244" cy="220" r="4" fill="#fff" />
                {/* orbiting engagement bubbles (counter-rotated to stay upright) */}
                <g data-soc-orbit="">
                  <g transform="translate(230 90)">
                    <g data-soc-bubble="">
                      <rect x="-26" y="-18" width="52" height="36" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.3)" />
                      <path d="M-8 0 a8 8 0 0 1 16 0 c0 6 -8 10 -8 10 s-8 -4 -8 -10z" fill="var(--violet-300)" transform="translate(0 -3) scale(.9)" />
                    </g>
                  </g>
                  <g transform="translate(362 292)">
                    <g data-soc-bubble="">
                      <circle r="24" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.3)" />
                      <path d="M-9 -2 h18 M-9 3 h11" stroke="var(--blue-300)" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </g>
                  <g transform="translate(98 300)">
                    <g data-soc-bubble="">
                      <circle r="21" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.3)" />
                      <path d="M-6 1 l4 4 8 -9" stroke="var(--violet-300)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </g>
                  </g>
                  <g transform="translate(120 128)">
                    <g data-soc-bubble="">
                      <circle r="17" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.24)" />
                      <path d="M0 -5 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6z" fill="var(--blue-300)" />
                    </g>
                  </g>
                </g>
                {/* reach ripples */}
                <circle cx="230" cy="230" r="86" stroke="color-mix(in srgb, var(--violet-400) 40%, transparent)" />
              </svg>
            </div>
          </Reveal>

          {/* narrative — offset right */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">
                  {section.index}
                </span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[14ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[48ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
            {/* flowing icon-pill cloud */}
            <Reveal stagger="text" className="mt-3 flex flex-wrap gap-2">
              {section.items.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-dark bg-[rgba(255,255,255,.05)] py-1.5 pl-2 pr-3 text-[length:var(--text-body-sm-size)] font-medium text-ondark transition-colors duration-[var(--duration-base)] hover:border-[var(--violet-400)]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--violet-500)_22%,transparent)] text-[var(--violet-300)]">
                    <ServiceIcon name={item.icon} size={13} />
                  </span>
                  {item.label}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
