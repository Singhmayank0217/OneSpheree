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
 * Product Listing — composition C (asymmetric archetype, product-detail
 * artwork): an OPTIMIZED LISTING mock anchors the left — a marketplace
 * product-detail card whose star rating fills, whose SEO title and A+ content
 * blocks resolve, and whose buy-box "conversion" meter climbs as the section
 * scrolls — while the narrative sits offset right and the four optimisations
 * flow as icon pills. Editorial, not a screenshot.
 */
export function ListingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ls-star]',
        { opacity: 0.2, scale: 0.7 },
        { opacity: 1, scale: 1, stagger: 0.18, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-ls-card]', start: 'top 76%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-ls-line]',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.14, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-ls-card]', start: 'top 72%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-ls-meter]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-ls-card]', start: 'top 68%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.to('[data-ls-art]', {
        y: -26,
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
            'radial-gradient(50% 45% at 25% 55%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 25%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* optimized listing mock */}
          <Reveal y={40} className="order-2 lg:order-1">
            <div data-ls-card="" aria-hidden="true" className="mx-auto max-w-[440px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5">
              <div className="grid grid-cols-[0.8fr_1fr] gap-4">
                {/* gallery */}
                <div>
                  <div className="flex aspect-square items-center justify-center rounded-lg bg-[rgba(255,255,255,.05)]">
                    <ServiceIcon name="package" size={40} className="text-[var(--violet-300)]" />
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={`h-6 flex-1 rounded ${i === 0 ? 'bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)]' : 'bg-[rgba(255,255,255,.06)]'}`} />
                    ))}
                  </div>
                </div>
                {/* detail */}
                <div>
                  {/* SEO title lines */}
                  <span data-ls-line="" className="block h-2.5 w-full rounded bg-[color-mix(in_srgb,var(--violet-400)_60%,transparent)]" />
                  <span data-ls-line="" className="mt-1.5 block h-2.5 w-4/5 rounded bg-[color-mix(in_srgb,var(--violet-400)_45%,transparent)]" />
                  {/* rating */}
                  <div className="mt-2.5 flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} data-ls-star="" style={{ display: 'inline-flex' }} className="text-[var(--violet-300)]">
                        <ServiceIcon name="star" size={12} />
                      </span>
                    ))}
                    <span className="ml-1 font-mono text-[9px] text-ondark-muted">1,240</span>
                  </div>
                  {/* price + buy box */}
                  <p className="mt-3 font-display text-[1.25rem] font-extrabold text-ondark">₹1,499</p>
                  <div className="mt-2 rounded-md bg-[color-mix(in_srgb,var(--violet-500)_18%,transparent)] px-2 py-1 text-center font-mono text-[9px] tracking-[1.5px] text-[var(--violet-200)]">
                    IN STOCK
                  </div>
                </div>
              </div>

              {/* A+ content blocks */}
              <div className="mt-4 border-t border-line-dark pt-3">
                <span className="font-mono text-[9px] tracking-[2px] text-ondark-muted">A+ CONTENT</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} data-ls-line="" className="block h-1.5 rounded bg-[rgba(255,255,255,.1)]" style={{ width: `${94 - i * 16}%` }} />
                  ))}
                </div>
              </div>

              {/* conversion meter */}
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] text-ondark-muted">CONVERSION</span>
                  <span className="font-mono text-[9px] text-[var(--violet-300)]">OPTIMIZED</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[rgba(255,255,255,.09)]">
                  <div data-ls-meter="" className="h-full rounded-full bg-gradient-to-r from-[var(--blue-400)] to-[var(--violet-400)]" style={{ width: '86%' }} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* narrative — offset right */}
          <div className="order-1 lg:order-2 lg:pl-8">
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
        </div>
      </Container>
    </section>
  );
}
