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
 * Corporate Due Diligence — composition A (SEO archetype, new artwork): a
 * sticky narrative + VERIFIED-DOSSIER illustration on the left while the
 * seven checks scroll past as a bordered editorial list on the right. Each
 * dossier field earns a checkmark and the official seal stamps in as the
 * section scrolls — "every record, confirmed at source".
 */
export function CorporateDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cd-tick]',
        { strokeDashoffset: 14, opacity: 0.2 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 72%', end: 'center center', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-cd-seal]',
        { scale: 0.5, rotation: -18, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: el, start: 'top 55%', end: 'center 55%', scrub: 0.8 },
        }
      );
      gsap.to('[data-cd-art]', {
        y: -22,
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
            'radial-gradient(55% 45% at 18% 30%, color-mix(in srgb, var(--blue-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative grid gap-12 border-t border-line-dark py-section lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* sticky narrative + dossier */}
        <div className="lg:sticky lg:top-[14vh] lg:self-start">
          <Reveal>
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">{section.index}</span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3" />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[46ch] text-ondark-muted">{section.description}</p>
          </Reveal>

          <Reveal delay={0.2} y={36}>
            <div
              data-cd-art=""
              aria-hidden="true"
              className="relative mt-8 max-w-[400px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5"
            >
              {/* document header */}
              <div className="flex items-center gap-2">
                <ServiceIcon name="building" size={16} className="text-[var(--blue-300)]" />
                <span className="h-2 w-1/3 rounded bg-[rgba(255,255,255,.28)]" />
                <span className="ml-auto rounded-full bg-[color-mix(in_srgb,var(--blue-500)_22%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--blue-200)]">
                  VERIFIED
                </span>
              </div>
              {/* validated registration rows */}
              <div className="mt-4 flex flex-col gap-2.5">
                {['CIN', 'GST', 'PAN', 'ISO'].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span className="w-9 font-mono text-[10px] text-ondark-muted">{f}</span>
                    <span className="h-1.5 flex-1 rounded bg-[rgba(255,255,255,.12)]" />
                    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
                      <circle cx="9" cy="9" r="8.5" fill="color-mix(in srgb, var(--blue-500) 24%, transparent)" />
                      <path
                        data-cd-tick=""
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
              {/* official seal */}
              <div
                data-cd-seal=""
                className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--violet-300)] bg-[color-mix(in_srgb,var(--violet-500)_26%,#0a0c10)]"
              >
                <span className="absolute inset-1.5 rounded-full border border-dashed border-[rgba(255,255,255,.4)]" />
                <ServiceIcon name="check" size={26} className="text-white" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* the checks — bordered list */}
        <div>
          <Reveal>
            <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
          </Reveal>
          <Reveal stagger="cards" className="mt-3">
            {section.items.map((item, i) => (
              <div key={item.label} className="group flex items-center gap-3 border-t border-line-dark py-3.5 last:border-b">
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
