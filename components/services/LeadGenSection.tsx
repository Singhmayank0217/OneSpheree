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
 * Lead Generation — composition F: a lateral acquisition flow (nothing like
 * Performance's vertical funnel). Left: narrative. Right: a CONVERGING
 * STREAMS artwork — many prospect paths flow through a qualification gate
 * and emerge as a single qualified line ending in a verified badge; stream
 * dashes travel continuously, the badge draws in on scroll. The programs
 * render as two staggered card columns (offset second column).
 */
export function LeadGenSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // streams flow continuously toward the gate
      gsap.to('[data-lg-stream]', { strokeDashoffset: -60, duration: 2.4, ease: 'none', repeat: -1 });
      // the qualified line + badge resolve on scroll
      gsap.fromTo(
        '[data-lg-qualified]',
        { strokeDashoffset: 180 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-lg-badge]',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: el, start: 'top 55%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.to('[data-lg-art]', {
        y: -24,
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
            'radial-gradient(55% 45% at 15% 65%, color-mix(in srgb, var(--blue-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* narrative + staggered program cards */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">
                  {section.index}
                </span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[12ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[46ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Reveal stagger="cards" className="flex flex-col gap-2">
                {section.items.filter((_, i) => i % 2 === 0).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-3"
                  >
                    <span className="text-[var(--blue-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
              <Reveal stagger="cards" delay={0.1} className="flex flex-col gap-2 sm:mt-6">
                {section.items.filter((_, i) => i % 2 === 1).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-3"
                  >
                    <span className="text-[var(--blue-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* converging-streams artwork */}
          <Reveal y={40}>
            <div data-lg-art="" aria-hidden="true" className="mx-auto w-full max-w-[520px]">
              <svg viewBox="0 0 520 380" fill="none" className="w-full">
                <defs>
                  <linearGradient id="lg-q" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--blue-400)" />
                    <stop offset="100%" stopColor="var(--violet-400)" />
                  </linearGradient>
                </defs>
                {/* prospect streams converging on the gate */}
                {[
                  'M0 60 C 140 60 190 150 262 178',
                  'M0 130 C 120 130 200 168 262 184',
                  'M0 250 C 120 250 200 208 262 194',
                  'M0 320 C 140 320 190 230 262 200',
                ].map((d, i) => (
                  <path
                    key={i}
                    data-lg-stream=""
                    d={d}
                    stroke={i % 2 ? 'var(--blue-400)' : 'rgba(255,255,255,.35)'}
                    strokeWidth="1.75"
                    strokeDasharray="4 8"
                    opacity={0.5 + (i % 2) * 0.2}
                  />
                ))}
                {/* origin dots */}
                <circle cx="8" cy="60" r="4" fill="rgba(255,255,255,.5)" />
                <circle cx="8" cy="130" r="4" fill="var(--blue-300)" />
                <circle cx="8" cy="250" r="4" fill="var(--blue-300)" />
                <circle cx="8" cy="320" r="4" fill="rgba(255,255,255,.5)" />
                {/* qualification gate */}
                <rect x="258" y="150" width="14" height="82" rx="7" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" />
                <path d="M265 162 v58" stroke="var(--violet-300)" strokeWidth="2" strokeDasharray="2 4" />
                {/* single qualified line */}
                <path
                  data-lg-qualified=""
                  d="M272 191 H 430"
                  stroke="url(#lg-q)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="180 180"
                />
                {/* verified badge */}
                <g data-lg-badge="" transform="translate(456 191)">
                  <circle r="26" fill="color-mix(in srgb, var(--violet-500) 30%, transparent)" stroke="var(--violet-300)" strokeWidth="1.5" />
                  <path d="M-9 0 l6 6 12 -12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
                {/* labels */}
                <text x="120" y="30" fill="rgba(255,255,255,.4)" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">PROSPECTS</text>
                <text x="240" y="132" fill="rgba(255,255,255,.5)" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">QUALIFY</text>
                <text x="418" y="240" fill="rgba(255,255,255,.6)" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">QUALIFIED</text>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
