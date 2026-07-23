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
 * Fire Suppression — composition B (centered-stage archetype, engineering
 * artwork): under an oversized stroked numeral, a PROTECTED-ROOM schematic —
 * a sealed critical-asset room (server racks in linework), ceiling nozzles
 * whose discharge cones draw in on scroll as dashed engineering arcs, an
 * agent cylinder bank feeding the room, and a room-integrity readout that
 * fills to SEALED. Controlled environments, not emergency graphics. The six
 * technologies render as a glass chip band beneath.
 */
export function SuppressionSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sp-cone]',
        { strokeDashoffset: 120 },
        {
          strokeDashoffset: 0,
          stagger: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '[data-sp-room]', start: 'top 78%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-sp-integrity]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: '0 50%',
          scrollTrigger: { trigger: '[data-sp-room]', start: 'top 70%', end: 'center 45%', scrub: 0.8 },
        }
      );
      // agent feed line flows continuously
      gsap.to('[data-sp-feed]', { strokeDashoffset: -48, duration: 2.4, ease: 'none', repeat: -1 });
      gsap.to('[data-sp-numeral]', {
        yPercent: -18,
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
            'radial-gradient(55% 45% at 82% 60%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <div
        data-sp-numeral=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[8%] hidden font-display font-extrabold leading-none text-transparent lg:block"
        style={{ fontSize: 'clamp(12rem, 26vh, 20rem)', WebkitTextStroke: '1px rgba(255,255,255,.10)' }}
      >
        {section.index}
      </div>

      <Container className="relative border-t border-line-dark py-section text-center">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</p>
        </Reveal>
        <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
        </Reveal>

        {/* protected-room schematic */}
        <Reveal delay={0.2} y={40}>
          <div data-sp-room="" aria-hidden="true" className="mx-auto mt-10 w-full max-w-[540px]">
            <svg viewBox="0 0 540 320" fill="none" className="w-full">
              {/* agent cylinder bank */}
              <g stroke="var(--blue-300)" strokeWidth="1.5">
                {[0, 1, 2].map((i) => (
                  <g key={i} transform={`translate(${48 + i * 26} 196)`}>
                    <rect x="-8" y="0" width="16" height="52" rx="6" fill="rgba(255,255,255,.04)" />
                    <path d="M-4 0v-8h8v8" />
                  </g>
                ))}
              </g>
              <text x="74" y="278" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">AGENT BANK</text>
              {/* feed line to the room */}
              <path data-sp-feed="" d="M100 210 H162 V96 H196" stroke="var(--blue-400)" strokeWidth="1.75" strokeDasharray="4 8" />

              {/* sealed room */}
              <g stroke="rgba(255,255,255,.32)" strokeWidth="1.5">
                <rect x="196" y="60" width="300" height="200" fill="rgba(255,255,255,.03)" />
              </g>
              {/* server racks */}
              <g stroke="rgba(255,255,255,.28)" strokeWidth="1.25">
                {[236, 306, 376, 446].map((x) => (
                  <g key={x}>
                    <rect x={x} y="150" width="40" height="92" rx="3" fill="rgba(255,255,255,.04)" />
                    <path d={`M${x + 6} 166h28M${x + 6} 182h28M${x + 6} 198h28`} />
                    <circle cx={x + 33} cy={210 + 0} r="1.75" fill="var(--blue-300)" />
                  </g>
                ))}
              </g>
              {/* ceiling nozzles + discharge cones (drawn on scroll) */}
              {[266, 346, 426].map((x) => (
                <g key={x}>
                  <path d={`M${x - 7} 60v8h14v-8`} stroke="var(--violet-300)" strokeWidth="1.5" fill="none" />
                  <path
                    data-sp-cone=""
                    d={`M${x} 70 L${x - 34} 132 M${x} 70 L${x} 136 M${x} 70 L${x + 34} 132`}
                    stroke="var(--violet-400)"
                    strokeWidth="1.25"
                    strokeDasharray="3 6"
                    pathLength={120}
                    style={{ filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--violet-500) 60%, transparent))' }}
                  />
                </g>
              ))}
              {/* room-integrity readout */}
              <g>
                <rect x="196" y="286" width="300" height="6" rx="3" fill="rgba(255,255,255,.1)" />
                <rect data-sp-integrity="" x="196" y="286" width="300" height="6" rx="3" fill="var(--violet-500)" />
                <text x="196" y="312" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">ROOM INTEGRITY</text>
                <text x="496" y="312" textAnchor="end" fill="var(--violet-300)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">SEALED</text>
              </g>
            </svg>
          </div>
        </Reveal>

        {/* technology chips */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {section.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.045)] px-3 py-4 backdrop-blur-sm transition-colors duration-[var(--duration-base)] hover:border-[var(--violet-400)]"
            >
              <span className="text-[var(--violet-300)]">
                <ServiceIcon name={item.icon} size={21} />
              </span>
              <span className="text-[length:var(--text-body-sm-size)] font-medium leading-tight text-ondark">
                {item.label}
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
