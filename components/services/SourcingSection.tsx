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
 * Product Sourcing — composition B (centered-stage archetype, supply-chain
 * artwork): under an oversized stroked numeral, a stylised GLOBAL SOURCING
 * MAP — an abstract graticule with a China origin and an India origin whose
 * shipping arcs draw toward a destination warehouse on scroll, passing a
 * quality-inspection gate that stamps PASS. The four sourcing services read
 * as a glass chip band beneath. Global sourcing, not stock photos.
 */
export function SourcingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sc-arc]',
        { strokeDashoffset: 360 },
        {
          strokeDashoffset: 0,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: '[data-sc-map]', start: 'top 78%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-sc-pass]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-sc-map]', start: 'top 52%', end: 'center 48%', scrub: 0.8 } }
      );
      // ships travel along the arcs
      gsap.to('[data-sc-ship]', { strokeDashoffset: -30, duration: 2.2, ease: 'none', repeat: -1 });
      gsap.to('[data-sc-numeral]', {
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 82% 60%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <div
        data-sc-numeral=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-[8%] hidden font-display font-extrabold leading-none text-transparent lg:block"
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

        {/* global sourcing map */}
        <Reveal delay={0.2} y={40}>
          <div data-sc-map="" aria-hidden="true" className="mx-auto mt-10 w-full max-w-[560px]">
            <svg viewBox="0 0 560 300" fill="none" className="w-full">
              {/* graticule */}
              <g stroke="rgba(255,255,255,.08)">
                <ellipse cx="280" cy="150" rx="264" ry="118" />
                <ellipse cx="280" cy="150" rx="180" ry="118" />
                <ellipse cx="280" cy="150" rx="90" ry="118" />
                <path d="M16 150h528M280 32v236" />
              </g>

              {/* origin: China */}
              <g>
                <circle cx="120" cy="94" r="6" fill="var(--violet-300)" />
                <text x="120" y="78" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">CHINA</text>
              </g>
              {/* origin: India */}
              <g>
                <circle cx="176" cy="206" r="6" fill="var(--blue-300)" />
                <text x="176" y="230" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">INDIA</text>
              </g>

              {/* shipping arcs (drawn on scroll) + travelling ships */}
              {[
                { d: 'M120 94 C 220 40 340 60 430 140', c: 'var(--violet-400)' },
                { d: 'M176 206 C 260 232 360 210 430 152', c: 'var(--blue-400)' },
              ].map((a, i) => (
                <g key={i}>
                  <path data-sc-arc="" d={a.d} stroke={a.c} strokeWidth="2" pathLength={360} strokeDasharray="360 360" style={{ filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--violet-500) 55%, transparent))' }} />
                  <path data-sc-ship="" d={a.d} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 27" opacity=".8" />
                </g>
              ))}

              {/* quality gate */}
              <g transform="translate(350 100)">
                <rect x="-10" y="-14" width="20" height="28" rx="5" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" />
                <path d="M-4 0l2.5 2.5L5 -4" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <g data-sc-pass="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <rect x="-22" y="18" width="44" height="16" rx="8" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1" />
                  <text x="0" y="30" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">QC PASS</text>
                </g>
              </g>

              {/* destination warehouse */}
              <g transform="translate(438 146)">
                <path d="M-20 14v-18l20-9 20 9v18z" fill="rgba(255,255,255,.05)" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M-9 14v-11h18v11" stroke="var(--violet-300)" strokeWidth="1.25" fill="none" />
                <text x="0" y="34" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">WAREHOUSE</text>
              </g>
            </svg>
          </div>
        </Reveal>

        {/* sourcing chips */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[820px] grid-cols-2 gap-2 sm:grid-cols-4">
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
