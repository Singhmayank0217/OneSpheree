'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { IndustryItem } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/**
 * Industries We Serve — composition I: an interactive MOSAIC. Cards vary in
 * span for editorial rhythm; each carries a cursor-tracked accent spotlight
 * (a radial brand glow that follows the pointer via CSS custom properties —
 * one delegated listener, transform/opacity-free hover cost) plus a hairline
 * that lights on hover. Cards stagger in from the center on scroll.
 */
export function IndustriesSection({
  headline,
  intro,
  items,
}: {
  headline: string;
  intro: string;
  items: IndustryItem[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    // cursor-tracked spotlight — one delegated handler for the whole mosaic
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('[data-ind-card]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    grid.addEventListener('mousemove', onMove);

    let ctx: gsap.Context | undefined;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-ind-card]',
          { opacity: 0, y: 26, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: { each: 0.05, from: 'center', grid: 'auto' },
            scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
          }
        );
      }, grid);
    }
    return () => {
      grid.removeEventListener('mousemove', onMove);
      ctx?.revert();
    };
  }, []);

  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 40% at 30% 25%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <RevealText text={headline} as="h2" className="t-display ondark-heading max-w-[12ch]" />
          <Reveal delay={0.1}>
            <p className="max-w-[52ch] text-ondark-muted">{intro}</p>
          </Reveal>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6"
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              data-ind-card=""
              className={`group relative overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.035)] p-4 transition-colors duration-[var(--duration-base)] hover:border-[color-mix(in_srgb,var(--violet-400)_60%,transparent)] ${
                item.wide ? 'col-span-2' : ''
              }`}
            >
              {/* cursor-tracked accent light */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--violet-500) 22%, transparent), transparent 70%)',
                }}
              />
              <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-[rgba(255,255,255,.06)] text-[var(--violet-300)] transition-colors duration-[var(--duration-base)] group-hover:bg-[color-mix(in_srgb,var(--violet-500)_24%,transparent)]">
                <ServiceIcon name={item.icon} size={17} />
              </span>
              <p className="relative mt-6 font-medium leading-snug text-ondark">{item.label}</p>
              <span className="relative mt-1 block font-mono text-[10px] text-ondark-muted opacity-50">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
