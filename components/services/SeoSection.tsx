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
 * SEO — composition A: a sticky narrative column (numeral, headline, SERP
 * illustration) on the left while the ten deliverables scroll past as a
 * bordered editorial list on the right. The illustration's rank rows climb
 * on scroll (scrubbed), echoing "moving up the results page".
 */
export function SeoSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // the highlighted result row rises one slot as the section scrolls
      gsap.fromTo(
        '[data-seo-riser]',
        { y: 52 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-seo-arrow]',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 60%', end: 'center center', scrub: 0.8 },
        }
      );
      // slight parallax drift of the whole card against the sticky column
      gsap.to('[data-seo-art]', {
        y: -22,
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
      {/* section tint — cool blue field, distinct from the hero's violet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 18% 30%, color-mix(in srgb, var(--blue-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative grid gap-12 border-t border-line-dark py-section lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* sticky narrative + illustration */}
        <div className="lg:sticky lg:top-[14vh] lg:self-start">
          <Reveal>
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">
                {section.index}
              </span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3" />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[46ch] text-ondark-muted">{section.description}</p>
          </Reveal>

          {/* SERP illustration — search bar + result rows, one row ranking up */}
          <Reveal delay={0.2} y={36}>
            <div
              data-seo-art=""
              aria-hidden="true"
              className="mt-8 max-w-[440px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-4"
            >
              <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.18)] bg-[rgba(255,255,255,.05)] px-3 py-2">
                <ServiceIcon name="search" size={14} className="text-[var(--blue-300)]" />
                <span className="h-2 w-2/5 rounded bg-[rgba(255,255,255,.25)]" />
              </div>
              <div className="relative mt-3 flex flex-col gap-2 overflow-hidden">
                <div className="h-[46px] rounded-lg bg-[rgba(255,255,255,.05)] p-2.5">
                  <span className="block h-2 w-1/3 rounded bg-[rgba(255,255,255,.22)]" />
                  <span className="mt-1.5 block h-1.5 w-3/4 rounded bg-[rgba(255,255,255,.12)]" />
                </div>
                <div
                  data-seo-riser=""
                  className="relative z-10 h-[46px] rounded-lg border border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_22%,transparent)] p-2.5"
                >
                  <span className="block h-2 w-2/5 rounded bg-[var(--violet-300)]" />
                  <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-[rgba(255,255,255,.28)]" />
                  <span
                    data-seo-arrow=""
                    className="absolute -right-0.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--violet-500)] text-white"
                  >
                    <ServiceIcon name="trendingUp" size={14} />
                  </span>
                </div>
                <div className="h-[46px] rounded-lg bg-[rgba(255,255,255,.05)] p-2.5">
                  <span className="block h-2 w-1/4 rounded bg-[rgba(255,255,255,.22)]" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-[rgba(255,255,255,.12)]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* the deliverables — editorial bordered list */}
        <div>
          <Reveal>
            <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
          </Reveal>
          <Reveal stagger="cards" className="mt-3">
            {section.items.map((item, i) => (
              <div
                key={item.label}
                className="group flex items-center gap-3 border-t border-line-dark py-3.5 last:border-b"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line-dark text-[var(--blue-300)] transition-colors duration-[var(--duration-base)] group-hover:border-[var(--blue-300)]">
                  <ServiceIcon name={item.icon} size={18} />
                </span>
                <span className="font-medium text-ondark">{item.label}</span>
                <span className="ml-auto font-mono text-[length:var(--text-caption-size)] text-ondark-muted opacity-60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
