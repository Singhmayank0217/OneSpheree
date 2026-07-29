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
 * Market Expansion — composition C (asymmetric archetype, market-brief
 * artwork): the narrative sits offset left while a MARKET ENTRY BRIEF anchors
 * the right — an abstract territory map where expansion routes draw from the
 * home base to candidate markets and one is selected, an opportunity index
 * that climbs, competitive-density rows that resolve and a slow research scan
 * crossing the card as the section is read. The four deliverables flow as icon
 * pills. An evidence file, not a stock world map.
 */
export function MarketExpansionSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-me-line]',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.14, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-me-card]', start: 'top 74%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-me-meter]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-me-card]', start: 'top 70%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-me-route]',
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '[data-me-card]', start: 'top 72%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-me-market]',
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.12, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-me-card]', start: 'top 70%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-me-select]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-me-card]', start: 'top 56%', end: 'center 44%', scrub: 0.8 } }
      );

      // living-system ambient — a research scan crosses the brief and the
      // selected market keeps signalling, even when the scroll rests.
      const amb = gsap.timeline({ paused: true });
      amb.fromTo('[data-me-scan]', { xPercent: -20, opacity: 0 }, { xPercent: 520, opacity: 1, duration: 2.8, ease: 'sine.inOut', repeat: -1, repeatDelay: 4 }, 0);
      amb.fromTo('[data-me-selpulse]', { scale: 0.6, opacity: 0.55 }, { scale: 1.7, opacity: 0, duration: 2.6, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-me-flow]', { strokeDashoffset: -32, duration: 2.6, ease: 'none', repeat: -1 }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      gsap.to('[data-me-art]', {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // candidate markets reached from the home base; the last one is selected
  const markets = [
    { x: 44, y: 26, d: 'M96 52 C 78 34 60 26 44 26' },
    { x: 150, y: 20, d: 'M96 52 C 116 30 134 20 150 20' },
    { x: 162, y: 66, d: 'M96 52 C 124 50 146 58 162 66' },
  ];

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
            'radial-gradient(50% 45% at 75% 55%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%), radial-gradient(45% 40% at 12% 25%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* narrative — offset left */}
          <div className="lg:pr-8">
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[13ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[48ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
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

          {/* market entry brief */}
          <Reveal y={40}>
            <div data-me-card="" data-me-art="" aria-hidden="true" className="relative mx-auto max-w-[440px] overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5">
              {/* research scan — a slow light sweep across the brief */}
              <span
                data-me-scan=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4"
                style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--violet-300) 20%, transparent), transparent)' }}
              />
              {/* header: territory + brief seal */}
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--violet-500)_20%,transparent)] text-[var(--violet-300)]">
                  <ServiceIcon name="globe" size={22} />
                </span>
                <div className="flex-1">
                  <span data-me-line="" className="block h-2.5 w-3/4 rounded bg-[color-mix(in_srgb,var(--violet-400)_60%,transparent)]" />
                  <span data-me-line="" className="mt-1.5 block h-2 w-1/2 rounded bg-[rgba(255,255,255,.18)]" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-line-dark px-2 py-1 font-mono text-[8px] tracking-[1.5px] text-[var(--violet-200)]">
                  <ServiceIcon name="fileCheck" size={10} /> MARKET BRIEF
                </span>
              </div>

              {/* territory map — routes from the home base to candidate markets */}
              <div className="mt-4 border-t border-line-dark pt-3">
                <span className="font-mono text-[9px] tracking-[2px] text-ondark-muted">EXPANSION MAP</span>
                <svg viewBox="0 0 200 96" fill="none" className="mt-2 w-full">
                  {/* abstract territory grid */}
                  <g stroke="rgba(255,255,255,.07)">
                    <path d="M8 20h184M8 48h184M8 76h184M48 6v84M96 6v84M144 6v84" />
                  </g>
                  {/* expansion routes */}
                  {markets.map((m, i) => (
                    <path key={i} data-me-route="" d={m.d} stroke={i === markets.length - 1 ? 'var(--violet-300)' : 'rgba(255,255,255,.28)'} strokeWidth="1.25" strokeLinecap="round" pathLength={200} strokeDasharray="200 200" />
                  ))}
                  {/* travelling go-to-market signal on the chosen route */}
                  <path data-me-flow="" d={markets[markets.length - 1].d} stroke="#fff" strokeWidth="1.4" strokeDasharray="2 14" opacity=".7" strokeLinecap="round" />
                  {/* selected market keeps signalling at rest */}
                  <circle data-me-selpulse="" cx={markets[markets.length - 1].x} cy={markets[markets.length - 1].y} r="8" fill="none" stroke="var(--violet-300)" strokeWidth="1.25" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                  {markets.map((m, i) => (
                    <g key={i}>
                      {i === markets.length - 1 && (
                        <circle data-me-select="" cx={m.x} cy={m.y} r="11" fill="none" stroke="var(--violet-300)" strokeWidth="1.25" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                      )}
                      <circle
                        data-me-market=""
                        cx={m.x}
                        cy={m.y}
                        r={i === markets.length - 1 ? 4.5 : 3.5}
                        fill={i === markets.length - 1 ? 'var(--violet-300)' : 'rgba(255,255,255,.35)'}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                      />
                    </g>
                  ))}
                  {/* home base */}
                  <g transform="translate(96 52)">
                    <circle r="9" fill="color-mix(in srgb, var(--blue-500) 26%, transparent)" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
                    <path d="M-4 4v-6l4-3 4 3v6z" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>

              {/* opportunity index */}
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] text-ondark-muted">OPPORTUNITY INDEX</span>
                  <span className="font-mono text-[9px] text-[var(--violet-300)]">87</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[rgba(255,255,255,.09)]">
                  <div data-me-meter="" className="h-full rounded-full bg-gradient-to-r from-[var(--blue-400)] to-[var(--violet-400)]" style={{ width: '87%' }} />
                </div>
              </div>

              {/* competitive density rows */}
              <div className="mt-4 flex flex-col gap-2 border-t border-line-dark pt-3">
                {['DEMAND', 'COMPETITION', 'ENTRY COST'].map((lbl, i) => (
                  <div key={lbl} className="flex items-center gap-3">
                    <span className="w-[86px] shrink-0 font-mono text-[9px] tracking-[1px] text-ondark-muted">{lbl}</span>
                    <span data-me-line="" className="block h-1.5 flex-1 rounded bg-[rgba(255,255,255,.1)]" style={{ transformOrigin: '0 50%', width: `${90 - i * 16}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
