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
 * Contract Staffing — composition B (centered-stage archetype, scaling
 * artwork): under an oversized stroked numeral, a stylised WORKFORCE-SCALING
 * chart — a rising demand curve draws in while flexible-capacity bars extend
 * from the baseline to meet it on scroll, a travelling deploy signal runs the
 * curve and an ON-DEMAND badge stamps in. The four engagement models read as a
 * glass chip band beneath. Scale quickly, not stock photos.
 */
export function ContractStaffingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cs-bar]',
        { scaleY: 0 },
        {
          scaleY: 1,
          stagger: 0.12,
          ease: 'none',
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: '[data-cs-chart]', start: 'top 78%', end: 'center 46%', scrub: 0.8 },
        }
      );
      gsap.fromTo(
        '[data-cs-curve]',
        { strokeDashoffset: 360 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-cs-chart]', start: 'top 76%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-cs-badge]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-cs-chart]', start: 'top 52%', end: 'center 46%', scrub: 0.8 } }
      );

      // living-system ambient — a deploy signal keeps travelling the demand
      // curve, the field breathes and the target node pulses even at rest.
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-cs-signal]', { strokeDashoffset: -30, duration: 2.2, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-cs-glow]', { scale: 1.1, opacity: '+=0.05', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-cs-pulse]', { scale: 0.5, opacity: 0.5 }, { scale: 1.6, opacity: 0, duration: 3, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      gsap.to('[data-cs-numeral]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // flexible-capacity bars ramping toward the demand curve
  const bars = [
    { x: 60, h: 34 },
    { x: 130, h: 58 },
    { x: 200, h: 88 },
    { x: 270, h: 118 },
    { x: 340, h: 150 },
    { x: 410, h: 176 },
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
            'radial-gradient(55% 45% at 82% 60%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <div
        data-cs-numeral=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-[8%] hidden font-display font-extrabold leading-none text-transparent lg:block"
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

        {/* workforce-scaling chart */}
        <Reveal delay={0.2} y={40}>
          <div data-cs-chart="" aria-hidden="true" className="mx-auto mt-10 w-full max-w-[560px]">
            <svg viewBox="0 0 500 240" fill="none" className="w-full">
              <defs>
                <radialGradient id="cs-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--blue-400)" stopOpacity=".4" />
                  <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".1" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* breathing field glow */}
              <ellipse data-cs-glow="" cx="260" cy="130" rx="210" ry="110" fill="url(#cs-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              {/* axes */}
              <g stroke="rgba(255,255,255,.12)">
                <path d="M40 210H470M40 30v180" />
              </g>
              {/* gridlines */}
              <g stroke="rgba(255,255,255,.05)">
                <path d="M40 60h430M40 105h430M40 150h430" />
              </g>

              {/* flexible-capacity bars */}
              {bars.map((b, i) => (
                <rect
                  key={i}
                  data-cs-bar=""
                  x={b.x}
                  y={210 - b.h}
                  width="30"
                  height={b.h}
                  rx="4"
                  fill="url(#cs-bar)"
                  stroke="color-mix(in srgb, var(--violet-400) 45%, transparent)"
                  strokeWidth="1"
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              ))}
              <defs>
                <linearGradient id="cs-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".12" />
                </linearGradient>
              </defs>

              {/* demand curve (drawn on scroll) + travelling deploy signal */}
              <path
                data-cs-curve=""
                d="M50 188 C 150 176 210 120 300 88 C 360 66 420 48 460 40"
                stroke="var(--blue-300)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={360}
                strokeDasharray="360 360"
                style={{ filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--blue-400) 55%, transparent))' }}
              />
              <path
                data-cs-signal=""
                d="M50 188 C 150 176 210 120 300 88 C 360 66 420 48 460 40"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="3 27"
                opacity=".8"
              />

              {/* target node at peak demand — pulses at rest */}
              <circle data-cs-pulse="" cx="460" cy="40" r="10" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              <circle cx="460" cy="40" r="4" fill="var(--blue-300)" />

              {/* on-demand badge */}
              <g data-cs-badge="" transform="translate(410 40)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <rect x="-38" y="-13" width="76" height="26" rx="13" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">ON DEMAND</text>
              </g>
            </svg>
          </div>
        </Reveal>

        {/* engagement chips */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[820px] grid-cols-2 gap-2 sm:grid-cols-4">
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
