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
 * Employee Background Verification — composition E (new for this page):
 * narrative + staggered check cards on the left, a CREDENTIAL-RECORD dossier
 * on the right whose fields (identity, employment, education, screening,
 * address) each earn a verified mark in sequence as the section scrolls, then
 * a clearance seal resolves. Secure documentation, verified — no photography.
 */
export function EmployeeDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const rows = ['Identity', 'Employment', 'Education', 'Screening', 'Address'];

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ev-tick]',
        { strokeDashoffset: 14, opacity: 0.15 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 72%', end: 'center center', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-ev-clear]',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: el, start: 'top 52%', end: 'center 52%', scrub: 0.8 },
        }
      );
      gsap.to('[data-ev-art]', {
        y: -24,
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
            'radial-gradient(55% 45% at 20% 40%, color-mix(in srgb, var(--blue-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          {/* narrative + staggered check cards */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[14ch]" />
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
                    <span className="text-[var(--blue-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
              <Reveal stagger="cards" delay={0.1} className="flex flex-col gap-2 sm:mt-6">
                {section.items.filter((_, i) => i % 2 === 1).map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-3">
                    <span className="text-[var(--blue-300)]">
                      <ServiceIcon name={item.icon} size={17} />
                    </span>
                    <span className="text-[length:var(--text-body-sm-size)] font-medium text-ondark">{item.label}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* credential-record dossier */}
          <Reveal y={40}>
            <div
              data-ev-art=""
              aria-hidden="true"
              className="relative mx-auto max-w-[380px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--blue-500)_20%,transparent)] text-[var(--blue-300)]">
                  <ServiceIcon name="idCard" size={18} />
                </span>
                <div className="flex-1">
                  <span className="block h-2 w-2/3 rounded bg-[rgba(255,255,255,.26)]" />
                  <span className="mt-1.5 block h-1.5 w-2/5 rounded bg-[rgba(255,255,255,.12)]" />
                </div>
                <span className="rounded-full bg-[color-mix(in_srgb,var(--blue-500)_22%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--blue-200)]">CLEARED</span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {rows.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 border-t border-line-dark pt-2.5">
                    <span className="w-[74px] font-mono text-[10px] uppercase tracking-wide text-ondark-muted">{f}</span>
                    <span className="h-1.5 flex-1 rounded bg-[rgba(255,255,255,.12)]" />
                    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
                      <circle cx="9" cy="9" r="8.5" fill="color-mix(in srgb, var(--blue-500) 24%, transparent)" />
                      <path
                        data-ev-tick=""
                        d="M5 9l2.6 2.6L13 6"
                        pathLength={14}
                        strokeDasharray="14 14"
                        stroke="var(--blue-200)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              {/* clearance seal */}
              <div
                data-ev-clear=""
                className="absolute -bottom-4 -right-3 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--blue-300)] bg-[color-mix(in_srgb,var(--blue-500)_28%,#0a0c10)]"
              >
                <span className="absolute inset-1.5 rounded-full border border-dashed border-[rgba(255,255,255,.4)]" />
                <ServiceIcon name="shield" size={24} className="text-white" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
