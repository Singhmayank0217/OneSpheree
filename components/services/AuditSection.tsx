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

const AUDIT_ROWS = [
  { label: 'MEANS OF EGRESS', pct: 92 },
  { label: 'DETECTION & ALARM', pct: 88 },
  { label: 'SUPPRESSION', pct: 95 },
  { label: 'SIGNAGE & LIGHTING', pct: 84 },
];

/**
 * Safety Audit — composition G (staggered-cards archetype, audit-sheet
 * artwork): the narrative and four audit services as two offset card columns
 * on the left; on the right an AUDIT SCORE SHEET — section scores filling as
 * horizontal bars on scroll, NFPA / IS code chips, and a FIRE NOC stamp that
 * rotates in once the sheet completes. Documentation, not marketing.
 */
export function AuditSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-au2-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.3,
          ease: 'none',
          transformOrigin: '0 50%',
          scrollTrigger: { trigger: '[data-au2-sheet]', start: 'top 75%', end: 'center 48%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-au2-stamp]',
        { scale: 0.5, rotation: -16, opacity: 0 },
        {
          scale: 1,
          rotation: -8,
          opacity: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: '[data-au2-sheet]', start: 'top 50%', end: 'center 50%', scrub: 0.8 },
        }
      );
      gsap.to('[data-au2-sheet]', {
        y: -22,
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
            'radial-gradient(55% 45% at 15% 60%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          {/* narrative + staggered service cards */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
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
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-3">
                    <span className="text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
              <Reveal stagger="cards" delay={0.1} className="flex flex-col gap-2 sm:mt-6">
                {section.items.filter((_, i) => i % 2 === 1).map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-3">
                    <span className="text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* audit score sheet */}
          <Reveal y={40}>
            <div
              data-au2-sheet=""
              aria-hidden="true"
              className="relative mx-auto max-w-[380px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[2px] text-ondark-muted">FIRE SAFETY AUDIT</span>
                <span className="font-mono text-[10px] text-ondark-muted opacity-60">FS-AUD-24</span>
              </div>
              <div className="mt-4 flex flex-col gap-3.5">
                {AUDIT_ROWS.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[9px] tracking-[1.5px] text-[rgba(255,255,255,.5)]">{row.label}</span>
                      <span className="font-mono text-[9px] text-[var(--blue-300)]">{row.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-[rgba(255,255,255,.09)]">
                      <div
                        data-au2-bar=""
                        className="h-full rounded-full bg-gradient-to-r from-[var(--blue-400)] to-[var(--violet-400)]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* code compliance chips */}
              <div className="mt-5 flex gap-2">
                {['NFPA', 'IS 2189', 'IS 15105'].map((c) => (
                  <span key={c} className="rounded-sm border border-[rgba(255,255,255,.18)] px-1.5 py-0.5 font-mono text-[9px] text-[rgba(255,255,255,.5)]">
                    {c}
                  </span>
                ))}
              </div>
              {/* NOC stamp */}
              <div
                data-au2-stamp=""
                className="absolute -bottom-5 right-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[var(--violet-400)] bg-[#100d0c]"
              >
                <span className="absolute inset-1.5 rounded-full border border-dashed border-[color-mix(in_srgb,var(--violet-300)_60%,transparent)]" />
                <span className="text-center font-mono text-[9px] leading-[1.5] tracking-[1px] text-[var(--violet-300)]">
                  FIRE
                  <br />
                  NOC
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
