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
 * Brand Management — composition D (fanned-boards archetype, brand-identity
 * artwork): a centered editorial opening, then a stack of BRAND BOARDS —
 * fanned identity sheets behind a front packaging mock carrying a logomark,
 * colour swatches and a private-label pack — facing a dotted-leader services
 * list. Boards fan open and a registered ® trademark stamp lands on scroll.
 */
export function BrandMgmtSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bm-sheet="1"]',
        { rotation: 0, x: 0 },
        { rotation: -8, x: -30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bm-sheet="2"]',
        { rotation: 0, x: 0 },
        { rotation: 8, x: 30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bm-stamp]',
        { scale: 0.5, rotation: -18, opacity: 0 },
        { scale: 1, rotation: -8, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: el, start: 'top 55%', end: 'center 50%', scrub: 0.8 } }
      );
      gsap.to('[data-bm-front]', {
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
          {/* fanned brand boards */}
          <Reveal y={40}>
            <div aria-hidden="true" className="relative mx-auto h-[330px] w-full max-w-[430px]">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  data-bm-sheet={n}
                  className="absolute left-1/2 top-5 h-[285px] w-[215px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4"
                >
                  <span className="block h-1.5 w-1/2 rounded bg-[rgba(255,255,255,.12)]" />
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={`h-8 rounded ${i === n ? 'bg-[color-mix(in_srgb,var(--violet-500)_35%,transparent)]' : 'bg-[rgba(255,255,255,.07)]'}`} />
                    ))}
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="mt-2 block h-1 rounded bg-[rgba(255,255,255,.08)]" style={{ width: `${84 - i * 12}%` }} />
                  ))}
                </div>
              ))}
              {/* front packaging mock */}
              <div
                data-bm-front=""
                className="absolute left-1/2 top-0 h-[300px] w-[232px] -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,.22)] bg-[#12100b] p-5 shadow-dark-lg"
              >
                {/* logomark */}
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_26%,transparent)]">
                    <ServiceIcon name="sparkles" size={18} className="text-[var(--violet-200)]" />
                  </span>
                  <span className="block h-2.5 w-1/2 rounded bg-[rgba(255,255,255,.3)]" />
                </div>
                {/* colour swatches */}
                <div className="mt-4 flex gap-1.5">
                  <span className="h-6 flex-1 rounded bg-[var(--violet-500)]" />
                  <span className="h-6 flex-1 rounded bg-[var(--violet-300)]" />
                  <span className="h-6 flex-1 rounded bg-[var(--blue-400)]" />
                  <span className="h-6 flex-1 rounded bg-[rgba(255,255,255,.16)]" />
                </div>
                {/* private-label pack */}
                <div className="mt-4 flex items-end justify-center gap-2">
                  <div className="flex h-24 w-16 flex-col items-center justify-center gap-1.5 rounded-md border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.05)]">
                    <ServiceIcon name="package" size={22} className="text-[var(--violet-300)]" />
                    <span className="block h-1.5 w-8 rounded bg-[var(--violet-300)]" />
                    <span className="block h-1 w-10 rounded bg-[rgba(255,255,255,.2)]" />
                  </div>
                  <div className="h-16 w-12 rounded-md border border-[rgba(255,255,255,.16)] bg-[rgba(255,255,255,.03)]" />
                </div>
                <span className="mt-4 block h-1 w-3/4 rounded bg-[rgba(255,255,255,.1)]" />
                {/* registered trademark stamp */}
                <div
                  data-bm-stamp=""
                  className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--violet-400)] bg-[#12100b]"
                >
                  <span className="absolute inset-1.5 rounded-full border border-dashed border-[color-mix(in_srgb,var(--violet-300)_60%,transparent)]" />
                  <span className="font-display text-[1.5rem] font-bold text-[var(--violet-300)]">®</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* services — dotted leaders */}
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
