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
 * Vendor Due Diligence — composition C (Social archetype, new artwork): an
 * asymmetric spread. A SUPPLIER-VERIFICATION NETWORK anchors the left — your
 * business at the hub, candidate suppliers on its edges, one factory node
 * earning a verified badge — while the narrative sits offset right and the
 * evaluations flow beneath as an icon-pill list. Edges carry continuously
 * flowing signal; the badge resolves on scroll; the whole map drifts.
 */
export function VendorDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-vd-edge]', { strokeDashoffset: -48, duration: 2.2, ease: 'none', repeat: -1 });
      gsap.fromTo(
        '[data-vd-badge]',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: el, start: 'top 60%', end: 'center 50%', scrub: 0.8 },
        }
      );
      gsap.to('[data-vd-art]', {
        y: -28,
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
            'radial-gradient(50% 45% at 25% 55%, color-mix(in srgb, var(--blue-500) 12%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 25%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* supplier-verification network */}
          <Reveal y={40} className="order-2 lg:order-1">
            <div data-vd-art="" aria-hidden="true" className="mx-auto w-full max-w-[500px]">
              <svg viewBox="0 0 500 420" fill="none" className="w-full">
                {/* edges hub → suppliers */}
                <g data-vd-edge-group="" stroke="rgba(255,255,255,.24)" strokeWidth="1.5" strokeDasharray="3 9">
                  <path data-vd-edge="" d="M250 210 L110 96" />
                  <path data-vd-edge="" d="M250 210 L410 110" />
                  <path data-vd-edge="" d="M250 210 L96 320" />
                  <path data-vd-edge="" d="M250 210 L392 336" />
                </g>

                {/* candidate supplier nodes */}
                <g transform="translate(110 96)">
                  <circle r="24" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
                  <path d="M-8 6h16v-8l-5-3v4l-5-3v10z" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" strokeLinejoin="round" />
                </g>
                <g transform="translate(410 110)">
                  <circle r="20" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
                  <path d="M-7 -6h10l4 4v8h-14z" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
                </g>
                <g transform="translate(96 320)">
                  <circle r="20" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
                  <circle cx="-2" cy="-2" r="6" stroke="var(--violet-300)" strokeWidth="1.6" />
                  <path d="M3 3l5 5" stroke="var(--violet-300)" strokeWidth="1.6" strokeLinecap="round" />
                </g>

                {/* the verified factory supplier */}
                <g transform="translate(392 336)">
                  <circle r="30" fill="color-mix(in srgb, var(--blue-500) 18%, transparent)" stroke="var(--blue-300)" strokeWidth="1.5" />
                  <path d="M-12 10a1 1 0 001 1h22a1 1 0 001-1v-16l-8 5v-5l-8 5v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1z" fill="none" stroke="var(--blue-200)" strokeWidth="1.5" strokeLinejoin="round" />
                  {/* verified badge */}
                  <g data-vd-badge="" transform="translate(22 -22)">
                    <circle r="13" fill="var(--violet-500)" stroke="#fff" strokeWidth="1.5" />
                    <path d="M-5 0l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                </g>

                {/* central hub — your business */}
                <g transform="translate(250 210)">
                  <circle r="46" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.32)" />
                  <circle r="12" fill="var(--violet-400)" opacity=".9" />
                  <circle r="30" stroke="color-mix(in srgb, var(--violet-400) 45%, transparent)" strokeDasharray="2 5" />
                </g>
              </svg>
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
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[14ch]" />
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
