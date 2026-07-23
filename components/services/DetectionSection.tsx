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
 * Fire Detection — composition A (sticky-split archetype, engineering
 * artwork): sticky narrative + a BUILDING CROSS-SECTION on the left — three
 * floors in blueprint linework, ceiling detectors pinging — while the four
 * systems scroll as a bordered list on the right. On scroll, an alarm signal
 * draws its path from the second-floor detector down the riser to the FACP
 * (fire alarm control panel), which lights when the signal arrives.
 */
export function DetectionSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGElement>('[data-dt-ping]').forEach((ping, i) => {
        gsap.fromTo(
          ping,
          { scale: 0.4, opacity: 0.9 },
          { scale: 2, opacity: 0, duration: 2.2, ease: 'power1.out', repeat: -1, delay: i * 0.7, transformOrigin: '50% 50%' }
        );
      });
      // the alarm signal draws to the panel as the section scrolls
      gsap.fromTo(
        '[data-dt-signal]',
        { strokeDashoffset: 300 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-dt-panel]',
        { opacity: 0.25 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 50%', end: 'center 55%', scrub: 0.8 },
        }
      );
      gsap.to('[data-dt-art]', {
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
            'radial-gradient(55% 45% at 18% 30%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative grid gap-12 border-t border-line-dark py-section lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-[14vh] lg:self-start">
          <Reveal>
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3" />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[46ch] text-ondark-muted">{section.description}</p>
          </Reveal>

          {/* building cross-section */}
          <Reveal delay={0.2} y={36}>
            <div data-dt-art="" aria-hidden="true" className="mt-8 max-w-[440px]">
              <svg viewBox="0 0 440 330" fill="none" className="w-full">
                {/* three-floor section */}
                <g stroke="rgba(255,255,255,.3)" strokeWidth="1.5">
                  <rect x="30" y="30" width="290" height="270" fill="rgba(255,255,255,.03)" />
                  <path d="M30 120h290M30 210h290" />
                </g>
                {/* ceiling detectors + pings per floor */}
                {[
                  { x: 120, y: 44 },
                  { x: 220, y: 134 },
                  { x: 150, y: 224 },
                ].map((d, i) => (
                  <g key={i}>
                    <path d={`M${d.x - 10} ${d.y - 14}h20`} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                    <circle data-dt-ping="" cx={d.x} cy={d.y} r="9" stroke="var(--violet-400)" strokeWidth="1.5" fill="none" />
                    <circle cx={d.x} cy={d.y} r="3.5" fill="var(--violet-400)" />
                  </g>
                ))}
                {/* alarm signal path: floor-2 detector → riser → FACP */}
                <path
                  data-dt-signal=""
                  d="M220 134 L332 134 L332 268 L368 268"
                  stroke="var(--violet-500)"
                  strokeWidth="2"
                  pathLength={300}
                  strokeDasharray="300 300"
                  style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--violet-500) 70%, transparent))' }}
                />
                {/* FACP */}
                <g data-dt-panel="">
                  <rect x="368" y="238" width="52" height="60" rx="6" fill="rgba(255,255,255,.05)" stroke="var(--violet-300)" strokeWidth="1.5" />
                  <circle cx="382" cy="254" r="3" fill="var(--violet-400)" />
                  <circle cx="394" cy="254" r="3" fill="var(--blue-300)" />
                  <path d="M378 268h32M378 278h24" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round" />
                  <text x="394" y="316" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">FACP</text>
                </g>
                {/* dimension tick */}
                <path d="M18 30v270M12 30h12M12 300h12" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
              </svg>
            </div>
          </Reveal>
        </div>

        {/* systems — bordered list */}
        <div>
          <Reveal>
            <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
          </Reveal>
          <Reveal stagger="cards" className="mt-3">
            {section.items.map((item, i) => (
              <div key={item.label} className="group flex items-center gap-3 border-t border-line-dark py-3.5 last:border-b">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line-dark text-[var(--violet-300)] transition-colors duration-[var(--duration-base)] group-hover:border-[var(--violet-300)]">
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
