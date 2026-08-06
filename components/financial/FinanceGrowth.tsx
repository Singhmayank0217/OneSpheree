'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { Button } from '@/components/ds/Button';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceGrowthSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Business Growth Solutions — the six practices that sit beyond compliance,
 * laid out as a bento: the two broadest (Virtual CFO, Certifications) take the
 * wide cells, the rest sit at single width. Cards arrive in a stagger and each
 * one's list writes itself in after the card lands, so a dense grid still
 * reads in an order rather than all at once.
 */
export function FinanceGrowth({ content }: { content: FinanceGrowthSection }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 26, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: EASE.reveal,
          stagger: STAGGER.cards,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-fc-practice]').forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('[data-fc-item]'),
          { opacity: 0, x: 12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: EASE.reveal,
            stagger: 0.05,
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="growth-solutions"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-x-clip border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 40% at 84% 92%, color-mix(in srgb, var(--violet-500) 28%, transparent), transparent 72%), radial-gradient(44% 36% at 12% 8%, color-mix(in srgb, var(--violet-400) 14%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.groups.map((group) => (
            <div
              key={group.title}
              data-fc-practice=""
              className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[6px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_26px_64px_-32px_rgba(20,184,166,.6)] lg:p-6 ${
                group.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 38%, transparent), transparent 72%)',
                }}
              />

              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:-translate-y-[2px]">
                  <ServiceIcon name={group.icon} size={20} />
                </span>
                <h3 className="t-h3 ondark-heading font-display">{group.title}</h3>
              </div>

              <p className="relative mt-3 max-w-[52ch] text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                {group.blurb}
              </p>

              <ul
                className={`relative mt-5 grid gap-2 border-t border-line-dark pt-4 ${
                  group.featured ? 'sm:grid-cols-2' : ''
                }`}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-fc-item=""
                    className="flex items-start gap-2.5 text-[length:var(--text-body-sm-size)] leading-[1.6] text-ondark-muted transition-colors duration-[var(--duration-base)] hover:text-ondark"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" className="mt-[4px] shrink-0" aria-hidden="true">
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="var(--blue-300)"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href={content.action.href} iconRight="arrowRight">
                {content.action.label}
              </Button>
            </Magnetic>
            <p className="text-[length:var(--text-body-sm-size)] text-ondark-muted">
              Every service above is delivered by the same practice, under one point of contact.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
