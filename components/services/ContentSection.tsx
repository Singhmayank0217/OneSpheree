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
 * Content Marketing — composition E, the magazine spread: a centered
 * editorial headline opens the section; below it a tall FANNED-PAGES
 * artwork (article spreads with typographic lines and a lifted pull-quote
 * sheet) faces a TABLE-OF-CONTENTS list — dotted leaders, mono folio
 * numbers, no card chrome. The sheets fan wider as the section scrolls.
 */
export function ContentSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // sheets fan open on scroll
      gsap.fromTo(
        '[data-ct-sheet="1"]',
        { rotation: 0, x: 0 },
        { rotation: -7, x: -26, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-ct-sheet="3"]',
        { rotation: 0, x: 0 },
        { rotation: 7, x: 26, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      // the pull-quote sheet lifts slightly against the fan (parallax)
      gsap.to('[data-ct-quote]', {
        y: -18,
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
      className="relative bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 80% 35%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        {/* centered editorial opening */}
        <div className="text-center">
          <Reveal>
            <p className="flex items-baseline justify-center gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">
                {section.index}
              </span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* fanned editorial pages */}
          <Reveal y={40}>
            <div aria-hidden="true" className="relative mx-auto h-[320px] w-full max-w-[420px]">
              {/* back sheets */}
              <div
                data-ct-sheet="1"
                className="absolute left-1/2 top-4 h-[280px] w-[210px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4"
              >
                <span className="block h-2 w-2/3 rounded bg-[rgba(255,255,255,.14)]" />
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${88 - (i % 3) * 14}%` }} />
                ))}
              </div>
              <div
                data-ct-sheet="3"
                className="absolute left-1/2 top-4 h-[280px] w-[210px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4"
              >
                <span className="block h-2 w-1/2 rounded bg-[rgba(255,255,255,.14)]" />
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${92 - ((i + 1) % 3) * 16}%` }} />
                ))}
              </div>
              {/* front pull-quote sheet */}
              <div
                data-ct-quote=""
                className="absolute left-1/2 top-0 h-[292px] w-[224px] -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,.22)] bg-[#10141d] p-5 shadow-dark-lg"
              >
                <span className="block h-2.5 w-3/4 rounded bg-[color-mix(in_srgb,var(--violet-400)_70%,transparent)]" />
                <span className="mt-2 block h-1.5 w-1/2 rounded bg-[rgba(255,255,255,.18)]" />
                <div className="mt-4 border-l-2 border-[var(--violet-400)] pl-3">
                  <span className="block h-1.5 w-11/12 rounded bg-[rgba(255,255,255,.30)]" />
                  <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-[rgba(255,255,255,.30)]" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-[rgba(255,255,255,.30)]" />
                </div>
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.10)]" style={{ width: `${90 - (i % 2) * 18}%` }} />
                ))}
                <span className="mt-4 inline-block rounded-full bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--violet-300)]">
                  EST. READ 4 MIN
                </span>
              </div>
            </div>
          </Reveal>

          {/* table-of-contents list */}
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
                  <span
                    aria-hidden="true"
                    className="mx-1 min-w-6 flex-1 self-center border-b border-dotted border-[rgba(255,255,255,.22)]"
                  />
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
