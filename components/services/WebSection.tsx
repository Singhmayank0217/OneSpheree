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
 * Website Design & Development — composition D (new in this page): a
 * full-width RESPONSIVE-FRAMES banner leads the section — one interface
 * carried across desktop, tablet and phone outlines, each frame drifting at
 * its own parallax rate — followed by a two-column editorial row and a
 * joined 3-column tile grid (the only section using the hairline-grid tiles
 * at scale). No laptops, no code, no photography — abstract UI frames only.
 */
export function WebSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // each device frame drifts at a different rate — depth without blur
      gsap.to('[data-web-desktop]', {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to('[data-web-tablet]', {
        y: -46,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to('[data-web-phone]', {
        y: -68,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      // the shared UI bar sweeps across the desktop frame once on entry
      gsap.fromTo(
        '[data-web-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: '0 50%',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 30%', scrub: 0.8 },
        }
      );
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
            'radial-gradient(60% 45% at 50% 0%, color-mix(in srgb, var(--blue-500) 12%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark pt-section">
        {/* responsive frames banner — one interface, three widths */}
        <Reveal y={40}>
          <div aria-hidden="true" className="relative mx-auto flex max-w-[980px] items-end justify-center gap-4 px-2 lg:gap-8">
            {/* desktop frame */}
            <div data-web-desktop="" className="w-[58%] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-2.5">
              <div className="flex items-center gap-1 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,255,255,.3)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,255,255,.2)]" />
                <span className="ml-2 h-2 flex-1 rounded bg-[rgba(255,255,255,.08)]" />
              </div>
              <div className="rounded-lg bg-[rgba(255,255,255,.03)] p-3">
                <span className="block h-3 w-1/2 rounded bg-[color-mix(in_srgb,var(--violet-400)_65%,transparent)]" />
                <span className="mt-2 block h-1.5 w-4/5 rounded bg-[rgba(255,255,255,.16)]" />
                <span className="mt-1 block h-1.5 w-3/5 rounded bg-[rgba(255,255,255,.10)]" />
                <span data-web-progress="" className="mt-3 block h-1 w-full rounded bg-[var(--blue-400)]" />
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  <span className="block h-10 rounded bg-[rgba(255,255,255,.06)]" />
                  <span className="block h-10 rounded bg-[rgba(255,255,255,.06)]" />
                  <span className="block h-10 rounded bg-[color-mix(in_srgb,var(--violet-500)_28%,transparent)]" />
                </div>
              </div>
            </div>
            {/* tablet frame */}
            <div data-web-tablet="" className="w-[24%] rounded-xl border border-line-dark bg-[rgba(255,255,255,.05)] p-2">
              <div className="rounded-lg bg-[rgba(255,255,255,.03)] p-2.5">
                <span className="block h-2.5 w-2/3 rounded bg-[color-mix(in_srgb,var(--violet-400)_65%,transparent)]" />
                <span className="mt-1.5 block h-1 w-full rounded bg-[rgba(255,255,255,.14)]" />
                <span className="mt-1 block h-1 w-3/4 rounded bg-[rgba(255,255,255,.09)]" />
                <span className="mt-2 block h-8 rounded bg-[rgba(255,255,255,.06)]" />
                <span className="mt-1.5 block h-5 w-1/2 rounded bg-[var(--blue-500)] opacity-70" />
              </div>
            </div>
            {/* phone frame */}
            <div data-web-phone="" className="w-[13%] rounded-2xl border border-line-dark bg-[rgba(255,255,255,.06)] p-1.5">
              <div className="rounded-xl bg-[rgba(255,255,255,.03)] p-2">
                <span className="mx-auto block h-1 w-1/3 rounded bg-[rgba(255,255,255,.25)]" />
                <span className="mt-2 block h-2 w-3/4 rounded bg-[color-mix(in_srgb,var(--violet-400)_65%,transparent)]" />
                <span className="mt-1 block h-1 w-full rounded bg-[rgba(255,255,255,.13)]" />
                <span className="mt-1 block h-6 rounded bg-[rgba(255,255,255,.06)]" />
                <span className="mt-1.5 block h-3.5 rounded-full bg-[var(--violet-500)] opacity-80" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* editorial row */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">
                  {section.index}
                </span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[14ch]" />
          </div>
          <Reveal delay={0.15} className="lg:pt-10">
            <p className="max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        {/* joined tile grid */}
        <Reveal>
          <p className="t-micro mt-10 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mb-section-sm mt-3 grid gap-px overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.06)] sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-dark p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--blue-500)_16%,transparent)] text-[var(--blue-300)]">
                <ServiceIcon name={item.icon} size={17} />
              </span>
              <span className="font-medium text-ondark">{item.label}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
