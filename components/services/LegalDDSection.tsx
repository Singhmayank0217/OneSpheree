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
 * Legal Due Diligence — composition D (Content archetype, new artwork): a
 * centered editorial opening, then a LEGAL CASE-FILE spread — fanned counsel
 * documents with a magnifier examining a clause and a scales-of-justice
 * accent — facing a dotted-leader review list. The case files fan open and
 * the magnifier settles on scroll: legal intelligence, examined at source.
 */
export function LegalDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-lg-sheet="1"]',
        { rotation: 0, x: 0 },
        { rotation: -8, x: -30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-lg-sheet="2"]',
        { rotation: 0, x: 0 },
        { rotation: 8, x: 30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-lg-glass]',
        { x: -24, y: 12 },
        { x: 8, y: -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top 72%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.to('[data-lg-front]', {
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
            'radial-gradient(50% 45% at 78% 35%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
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
          {/* fanned legal case-files */}
          <Reveal y={40}>
            <div aria-hidden="true" className="relative mx-auto h-[320px] w-full max-w-[420px]">
              <div data-lg-sheet="1" className="absolute left-1/2 top-4 h-[280px] w-[210px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4">
                <span className="block h-2 w-1/2 rounded bg-[rgba(255,255,255,.14)]" />
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${86 - (i % 3) * 14}%` }} />
                ))}
              </div>
              <div data-lg-sheet="2" className="absolute left-1/2 top-4 h-[280px] w-[210px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4">
                <span className="block h-2 w-2/5 rounded bg-[rgba(255,255,255,.14)]" />
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${92 - ((i + 1) % 3) * 16}%` }} />
                ))}
              </div>
              {/* front contract sheet */}
              <div data-lg-front="" className="absolute left-1/2 top-0 h-[292px] w-[226px] -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,.22)] bg-[#10121b] p-5 shadow-dark-lg">
                <div className="flex items-center gap-2">
                  <ServiceIcon name="scale" size={16} className="text-[var(--violet-300)]" />
                  <span className="h-2 w-1/3 rounded bg-[rgba(255,255,255,.3)]" />
                  <span className="ml-auto font-mono text-[10px] text-ondark-muted">CASE</span>
                </div>
                <span className="mt-4 block h-1.5 w-3/4 rounded bg-[rgba(255,255,255,.18)]" />
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.10)]" style={{ width: `${92 - (i % 2) * 20}%` }} />
                ))}
                {/* highlighted clause */}
                <span className="mt-2 block h-3 w-4/5 rounded bg-[color-mix(in_srgb,var(--violet-500)_24%,transparent)]" />
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.10)]" style={{ width: `${80 - i * 12}%` }} />
                ))}
                {/* magnifier examining the clause */}
                <svg data-lg-glass="" width="72" height="72" viewBox="0 0 72 72" className="absolute bottom-6 right-3">
                  <circle cx="30" cy="30" r="22" fill="rgba(10,12,20,.55)" stroke="var(--violet-300)" strokeWidth="2.5" />
                  <path d="M46 46l16 16" stroke="var(--violet-300)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M22 30h16M22 36h11" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* review list — dotted leaders */}
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
