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
 * Executive Search — composition C (asymmetric archetype, leadership-dossier
 * artwork): a CONFIDENTIAL leadership shortlist card anchors the left — an
 * abstract executive profile under a confidential seal, whose credential lines
 * resolve, whose "leadership match" meter climbs, and whose talent-map plots a
 * shortlist with one candidate selected as the section scrolls — while the
 * narrative sits offset right and the four deliverables flow as icon pills.
 * Discreet and editorial, not a screenshot.
 */
export function ExecutiveSearchSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-es-line]',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.14, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-es-card]', start: 'top 74%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-es-meter]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: '[data-es-card]', start: 'top 70%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-es-plot]',
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.12, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-es-card]', start: 'top 72%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-es-select]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-es-card]', start: 'top 56%', end: 'center 44%', scrub: 0.8 } }
      );

      // living-system ambient — a light sweep scans the dossier and the
      // selected candidate pulses on the talent map, even when scroll rests.
      const amb = gsap.timeline({ paused: true });
      amb.fromTo('[data-es-scan]', { xPercent: -20, opacity: 0 }, { xPercent: 520, opacity: 1, duration: 2.8, ease: 'sine.inOut', repeat: -1, repeatDelay: 4 }, 0);
      amb.fromTo('[data-es-selpulse]', { scale: 0.6, opacity: 0.55 }, { scale: 1.7, opacity: 0, duration: 2.6, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      gsap.to('[data-es-art]', {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // talent-map shortlist dots; the last is the selected candidate
  const plot = [
    { x: 26, y: 40 },
    { x: 70, y: 22 },
    { x: 104, y: 54 },
    { x: 150, y: 30 },
  ];

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
          {/* confidential leadership dossier */}
          <Reveal y={40} className="order-2 lg:order-1">
            <div data-es-card="" data-es-art="" aria-hidden="true" className="relative mx-auto max-w-[440px] overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5">
              {/* dossier scan — a slow light sweep across the card */}
              <span
                data-es-scan=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4"
                style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--violet-300) 20%, transparent), transparent)' }}
              />
              {/* header: profile + confidential seal */}
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--violet-500)_20%,transparent)] text-[var(--violet-300)]">
                  <ServiceIcon name="briefcase" size={22} />
                </span>
                <div className="flex-1">
                  <span data-es-line="" className="block h-2.5 w-3/4 rounded bg-[color-mix(in_srgb,var(--violet-400)_60%,transparent)]" />
                  <span data-es-line="" className="mt-1.5 block h-2 w-1/2 rounded bg-[rgba(255,255,255,.18)]" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-line-dark px-2 py-1 font-mono text-[8px] tracking-[1.5px] text-[var(--violet-200)]">
                  <ServiceIcon name="shield" size={10} /> CONFIDENTIAL
                </span>
              </div>

              {/* credential rows */}
              <div className="mt-4 flex flex-col gap-2 border-t border-line-dark pt-3">
                {['EXPERIENCE', 'TENURE', 'REFERENCES'].map((lbl, i) => (
                  <div key={lbl} className="flex items-center gap-3">
                    <span className="w-[76px] shrink-0 font-mono text-[9px] tracking-[1px] text-ondark-muted">{lbl}</span>
                    <span data-es-line="" className="block h-1.5 flex-1 rounded bg-[rgba(255,255,255,.1)]" style={{ transformOrigin: '0 50%', width: `${88 - i * 12}%` }} />
                  </div>
                ))}
              </div>

              {/* leadership match meter */}
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] text-ondark-muted">LEADERSHIP MATCH</span>
                  <span className="font-mono text-[9px] text-[var(--violet-300)]">94%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[rgba(255,255,255,.09)]">
                  <div data-es-meter="" className="h-full rounded-full bg-gradient-to-r from-[var(--blue-400)] to-[var(--violet-400)]" style={{ width: '94%' }} />
                </div>
              </div>

              {/* talent map */}
              <div className="mt-4 border-t border-line-dark pt-3">
                <span className="font-mono text-[9px] tracking-[2px] text-ondark-muted">TALENT MAP</span>
                <svg viewBox="0 0 180 72" fill="none" className="mt-2 w-full">
                  <g stroke="rgba(255,255,255,.08)">
                    <path d="M8 36h164M90 8v56" />
                  </g>
                  {/* selected candidate keeps pulsing at rest */}
                  <circle data-es-selpulse="" cx="150" cy="30" r="8" fill="none" stroke="var(--violet-300)" strokeWidth="1.25" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                  {plot.map((p, i) => (
                    <g key={i}>
                      {i === plot.length - 1 && (
                        <circle data-es-select="" cx={p.x} cy={p.y} r="10" fill="none" stroke="var(--violet-300)" strokeWidth="1.25" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                      )}
                      <circle
                        data-es-plot=""
                        cx={p.x}
                        cy={p.y}
                        r={i === plot.length - 1 ? 4.5 : 3.5}
                        fill={i === plot.length - 1 ? 'var(--violet-300)' : 'rgba(255,255,255,.35)'}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                      />
                    </g>
                  ))}
                </svg>
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
