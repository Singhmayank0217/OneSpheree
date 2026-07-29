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

const TIERS = [
  { w: 300, count: '120', y: 54 },
  { w: 224, count: '48', y: 98 },
  { w: 150, count: '16', y: 142 },
  { w: 84, count: '4', y: 186 },
];

/**
 * Recruitment Process Outsourcing — composition E (workflow-rail archetype,
 * recruitment artwork): the stages (Sourcing → Screening → Interview → Offer)
 * sit as nodes on a vertical rail that draws itself while a signal travels
 * down; opposite (sticky) a RECRUITMENT FUNNEL — candidate tokens stream into a
 * narrowing four-tier funnel whose tiers resolve on scroll, ending in a single
 * HIRED token. End-to-end recruitment, run as one pipeline.
 */
export function RpoSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const rail = railRef.current;
      if (rail) {
        gsap.fromTo(
          '[data-rpo-railline]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: '50% 0%', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
        gsap.fromTo(
          '[data-rpo-signal]',
          { top: '0%' },
          { top: '97%', ease: 'none', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
      }
      // funnel tiers resolve + HIRED token lands on scroll
      gsap.fromTo(
        '[data-rpo-tier]',
        { scaleX: 0, opacity: 0.2 },
        { scaleX: 1, opacity: 1, stagger: 0.14, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-rpo-funnel]', start: 'top 76%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-rpo-hired]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-rpo-funnel]', start: 'top 52%', end: 'center 46%', scrub: 0.8 } }
      );

      // living-system ambient — candidates keep streaming in, the field breathes
      const amb = gsap.timeline({ paused: true });
      gsap.utils.toArray<SVGElement>('[data-rpo-drop]').forEach((d, i) => {
        amb.fromTo(d, { y: -18, opacity: 0 }, { y: 20, opacity: 1, duration: 1.8, ease: 'sine.in', repeat: -1, repeatDelay: 0.6, delay: i * 0.6 }, 0);
      });
      amb.to('[data-rpo-glow]', { scale: 1.12, opacity: '+=0.05', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-rpo-art]', { y: -12, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={section.id} aria-label={section.headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 85% 45%, color-mix(in srgb, var(--violet-500) 14%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* narrative + recruitment rail */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[15ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[48ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>

            <div ref={railRef} className="relative mt-4 pl-2">
              <span aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[rgba(255,255,255,.12)]" />
              <span data-rpo-railline="" aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[var(--violet-400)]" />
              <span
                data-rpo-signal=""
                aria-hidden="true"
                className="absolute left-[26px] top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[var(--violet-300)]"
                style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--violet-300) 80%, transparent)' }}
              />
              <Reveal stagger="text">
                {section.items.map((item, i) => (
                  <div key={item.label} className="relative flex items-center gap-4 py-3">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.22)] bg-[#0a0f1c] text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={16} />
                    </span>
                    <div>
                      <span className="font-medium text-ondark">{item.label}</span>
                      <span className="ml-2 font-mono text-[10px] text-ondark-muted opacity-60">STEP {i + 1}</span>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* sticky recruitment funnel */}
          <Reveal y={40} className="lg:sticky lg:top-[16vh] lg:self-start">
            <div data-rpo-art="" aria-hidden="true" className="mx-auto w-full max-w-[420px]">
              <svg data-rpo-funnel="" viewBox="0 0 440 300" fill="none" className="w-full">
                <defs>
                  <radialGradient id="rpo-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".4" />
                    <stop offset="65%" stopColor="var(--violet-500)" stopOpacity=".1" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="rpo-tier" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".5" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".16" />
                  </linearGradient>
                </defs>

                <ellipse data-rpo-glow="" cx="220" cy="140" rx="180" ry="130" fill="url(#rpo-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* candidate tokens streaming into the funnel */}
                {[196, 220, 244].map((x, i) => (
                  <circle key={i} data-rpo-drop="" cx={x} cy="24" r="5" fill="var(--blue-300)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                ))}

                {/* funnel tiers */}
                {TIERS.map((t, i) => (
                  <g key={i}>
                    <rect
                      data-rpo-tier=""
                      x={220 - t.w / 2}
                      y={t.y}
                      width={t.w}
                      height="30"
                      rx="6"
                      fill="url(#rpo-tier)"
                      stroke="color-mix(in srgb, var(--violet-400) 45%, transparent)"
                      strokeWidth="1"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    <text x="220" y={t.y + 20} textAnchor="middle" fill="#fff" fontSize="12" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1">{t.count}</text>
                  </g>
                ))}

                {/* connector to the hire */}
                <path d="M220 216v18" stroke="rgba(255,255,255,.2)" strokeWidth="1.25" strokeDasharray="3 5" />
                {/* HIRED token */}
                <g data-rpo-hired="" transform="translate(220 254)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <rect x="-44" y="-16" width="88" height="32" rx="16" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1" />
                  <path d="M-30 0l3 3 6-7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <text x="8" y="4" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">HIRED</text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
