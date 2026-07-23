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
 * Design & Engineering — composition D (fanned-sheets archetype, drafting
 * artwork): a centered editorial opening, then a stack of ISSUED DRAWINGS —
 * fanned CAD sheets behind a front sheet carrying a title block, sprinkler
 * plan linework, dimension strings and a hydraulic-calculation column —
 * facing a dotted-leader deliverables list. Sheets fan open and the title
 * block's revision row stamps in on scroll. Documentation, not marketing.
 */
export function DesignEngSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-de-sheet="1"]',
        { rotation: 0, x: 0 },
        { rotation: -8, x: -30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-de-sheet="2"]',
        { rotation: 0, x: 0 },
        { rotation: 8, x: 30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-de-rev]',
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: el, start: 'top 55%', end: 'center 50%', scrub: 0.8 } }
      );
      gsap.to('[data-de-front]', {
        y: -16,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
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
            'radial-gradient(50% 45% at 78% 35%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="text-center">
          <Reveal>
            <p className="flex items-baseline justify-center gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* fanned issued drawings */}
          <Reveal y={40}>
            <div aria-hidden="true" className="relative mx-auto h-[330px] w-full max-w-[430px]">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  data-de-sheet={n}
                  className="absolute left-1/2 top-5 h-[285px] w-[215px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4"
                >
                  <span className="block h-1.5 w-1/2 rounded bg-[rgba(255,255,255,.12)]" />
                  <div className="mt-3 h-[130px] rounded border border-[rgba(255,255,255,.08)]" />
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${84 - i * 12}%` }} />
                  ))}
                </div>
              ))}
              {/* front CAD sheet */}
              <div
                data-de-front=""
                className="absolute left-1/2 top-0 h-[300px] w-[232px] -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,.22)] bg-[#12100f] p-4 shadow-dark-lg"
              >
                {/* sprinkler plan linework */}
                <svg viewBox="0 0 200 130" fill="none" className="w-full">
                  <rect x="8" y="6" width="184" height="118" stroke="rgba(255,255,255,.2)" />
                  <path d="M8 52h184M74 6v118M140 6v118" stroke="rgba(255,255,255,.1)" />
                  {/* sprinkler runs */}
                  <path d="M22 28h160M22 88h160" stroke="var(--blue-400)" strokeWidth="1.25" strokeDasharray="3 5" />
                  {[40, 74, 108, 142, 176].map((x) => (
                    <g key={x}>
                      <circle cx={x} cy="28" r="3" stroke="var(--violet-400)" fill="none" />
                      <circle cx={x} cy="88" r="3" stroke="var(--violet-400)" fill="none" />
                    </g>
                  ))}
                  {/* dimension string */}
                  <path d="M22 112h160M22 108v8M182 108v8" stroke="rgba(255,255,255,.28)" strokeWidth="0.75" />
                </svg>
                {/* hydraulic calc column */}
                <div className="mt-2 flex gap-3">
                  <div className="flex-1">
                    {['Q = 1350 L/min', 'P = 6.4 bar', 'K = 80'].map((t) => (
                      <p key={t} className="font-mono text-[9px] leading-[1.7] text-[rgba(255,255,255,.45)]">
                        {t}
                      </p>
                    ))}
                  </div>
                  {/* title block */}
                  <div className="w-[92px] border border-[rgba(255,255,255,.22)] p-1.5">
                    <p className="font-mono text-[8px] text-[rgba(255,255,255,.5)]">ONESPHEREE</p>
                    <p className="font-mono text-[8px] text-[rgba(255,255,255,.3)]">DWG FP-101</p>
                    <p className="font-mono text-[8px] text-[rgba(255,255,255,.3)]">SCALE 1:100</p>
                    <p data-de-rev="" className="mt-1 inline-block rounded-sm bg-[color-mix(in_srgb,var(--violet-500)_28%,transparent)] px-1 font-mono text-[8px] text-[var(--violet-300)]">
                      REV A — ISSUED
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* deliverables — dotted leaders */}
          <div>
            <Reveal>
              <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
            <Reveal stagger="text" className="mt-3">
              {section.items.map((item, i) => (
                <div key={item.label} className="flex items-baseline gap-2.5 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 -translate-y-0.5 items-center justify-center rounded-sm text-[var(--violet-300)]">
                    <ServiceIcon name={item.icon} size={16} />
                  </span>
                  <span className="shrink-0 font-medium text-ondark">{item.label}</span>
                  <span aria-hidden="true" className="mx-1 min-w-6 flex-1 self-center border-b border-dotted border-[rgba(255,255,255,.22)]" />
                  <span className="shrink-0 font-mono text-[length:var(--text-caption-size)] text-ondark-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
