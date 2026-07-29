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
 * Order Management — composition E (workflow-rail archetype, fulfillment
 * artwork): the stages (Inventory → Warehousing → Shipping → Support) sit as
 * nodes on a vertical rail that draws itself while a signal travels down;
 * opposite (sticky) a FULFILMENT FLOW diagram — an order entering a warehouse,
 * a pick/pack bin, a dispatch lane with a parcel continuously moving out to a
 * delivery pin, and a live order-status readout. Connected fulfilment, not a
 * dashboard.
 */
export function OrderMgmtSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const rail = railRef.current;
      if (rail) {
        gsap.fromTo(
          '[data-om-railline]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: '50% 0%', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
        gsap.fromTo(
          '[data-om-signal]',
          { top: '0%' },
          { top: '97%', ease: 'none', scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 } }
        );
      }
      // dispatch lane flows + a parcel rides out to delivery
      gsap.to('[data-om-lane]', { strokeDashoffset: -48, duration: 2, ease: 'none', repeat: -1 });
      gsap.to('[data-om-parcel]', { keyframes: [{ x: 0 }, { x: 150 }], duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: false, repeatDelay: 0.2 });
      gsap.to('[data-om-graph]', { y: -14, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
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
          {/* narrative + fulfillment rail */}
          <div>
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

            <div ref={railRef} className="relative mt-4 pl-2">
              <span aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[rgba(255,255,255,.12)]" />
              <span data-om-railline="" aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[var(--violet-400)]" />
              <span
                data-om-signal=""
                aria-hidden="true"
                className="absolute left-[26px] top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[var(--violet-300)]"
                style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--violet-300) 80%, transparent)' }}
              />
              <Reveal stagger="text">
                {section.items.map((item, i) => (
                  <div key={item.label} className="relative flex items-center gap-4 py-3">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.22)] bg-[#100d0b] text-[var(--violet-300)]">
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

          {/* sticky fulfilment flow */}
          <Reveal y={40} className="lg:sticky lg:top-[16vh] lg:self-start">
            <div data-om-graph="" aria-hidden="true" className="mx-auto w-full max-w-[440px]">
              <svg viewBox="0 0 440 300" fill="none" className="w-full">
                {/* order in */}
                <g transform="translate(40 60)">
                  <rect x="-16" y="-14" width="32" height="28" rx="4" fill="rgba(255,255,255,.05)" stroke="var(--violet-300)" strokeWidth="1.5" />
                  <path d="M-16 -6h32" stroke="var(--violet-300)" strokeWidth="1" opacity=".6" />
                  <text y="34" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">ORDER</text>
                </g>
                {/* warehouse */}
                <g transform="translate(160 60)">
                  <path d="M-26 18v-24l26-11 26 11v24z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.32)" strokeWidth="1.5" strokeLinejoin="round" />
                  {/* pick/pack bins */}
                  {[-14, 0, 14].map((x) => (
                    <rect key={x} x={x - 5} y="2" width="10" height="14" rx="1.5" fill="rgba(255,255,255,.06)" stroke="var(--blue-300)" strokeWidth="1" />
                  ))}
                  <text y="46" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">WAREHOUSE</text>
                </g>
                {/* dispatch lane + moving parcel */}
                <path data-om-lane="" d="M200 60 H392" stroke="var(--violet-400)" strokeWidth="2" strokeDasharray="4 8" />
                <g data-om-parcel="" transform="translate(226 60)">
                  <rect x="-8" y="-8" width="16" height="16" rx="2.5" fill="color-mix(in srgb, var(--violet-500) 30%, #100d0b)" stroke="var(--violet-300)" strokeWidth="1.5" />
                  <path d="M-8 -1h16M0 -8v16" stroke="var(--violet-300)" strokeWidth="0.75" opacity=".7" />
                </g>
                {/* delivery pin */}
                <g transform="translate(404 60)">
                  <path d="M0 12c6-8 8-11 8-15a8 8 0 10-16 0c0 4 2 7 8 15z" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cy="-3" r="3" fill="var(--violet-300)" />
                  <text y="34" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">DELIVERED</text>
                </g>

                {/* live status readout */}
                <g transform="translate(40 168)">
                  <rect width="360" height="96" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)" />
                  <text x="16" y="28" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">ORDER STATUS</text>
                  {[
                    { y: 48, label: 'PICKED', on: true },
                    { y: 66, label: 'PACKED', on: true },
                    { y: 84, label: 'IN TRANSIT', on: false },
                  ].map((r) => (
                    <g key={r.label} transform={`translate(16 ${r.y})`}>
                      <circle cx="4" cy="-3" r="4" fill={r.on ? 'var(--violet-400)' : 'rgba(255,255,255,.2)'} />
                      <text x="16" y="0" fill={r.on ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.4)'} fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">{r.label}</text>
                    </g>
                  ))}
                  {/* SLA meter */}
                  <g transform="translate(230 44)">
                    <text fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">SLA</text>
                    <rect y="8" width="114" height="6" rx="3" fill="rgba(255,255,255,.1)" />
                    <rect y="8" width="98" height="6" rx="3" fill="var(--violet-500)" />
                    <text y="34" fill="var(--violet-300)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">98% ON TIME</text>
                  </g>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
