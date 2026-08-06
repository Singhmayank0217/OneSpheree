'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE } from '@/lib/animations';
import type { FinanceIndustriesSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Industries We Serve — sixteen sectors as a dense, quiet mosaic.
 *
 * Deliberately the lightest grid on the page: no descriptions, no expansion,
 * just icon and name. It arrives on a grid-order stagger (each tile a little
 * after the one to its left) and each tile lifts into an emerald glow on
 * hover — enough interaction to feel alive, not enough to compete with the
 * service chapters above it.
 */
export function FinanceIndustries({ content }: { content: FinanceIndustriesSection }) {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 22, scale: 0.96, filter: 'blur(5px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: EASE.reveal,
          stagger: { each: 0.05, from: 'start' },
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="industries"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 14% 8%, color-mix(in srgb, var(--violet-500) 24%, transparent), transparent 72%), radial-gradient(46% 38% at 88% 94%, color-mix(in srgb, var(--violet-400) 14%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <ul ref={gridRef} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {content.items.map((item) => (
            <li
              key={item.label}
              className="group relative flex items-center gap-3 overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.035)] p-4 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_22px_54px_-30px_rgba(20,184,166,.65)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(90% 120% at 12% 50%, color-mix(in srgb, var(--violet-400) 24%, transparent), transparent 72%)',
                }}
              />
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                <ServiceIcon name={item.icon} size={19} />
              </span>
              <span className="relative text-[length:var(--text-body-sm-size)] font-medium leading-[1.35] text-ondark-muted transition-colors duration-[var(--duration-base)] group-hover:text-white">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
