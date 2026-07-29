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
 * Business Consulting — composition B (centered-stage archetype, advisory
 * artwork): under an oversized stroked numeral, a STRATEGY MATRIX — diagnostic
 * findings plot across four quadrants, a trajectory draws from the current
 * state up into the high-performance quadrant, flanking before/after bars
 * resolve and an OPTIMIZED badge stamps in on scroll. The four advisory tracks
 * read as a glass chip band beneath. A consulting engagement, not a dashboard.
 */
export function BusinessConsultingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bc-quad]',
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '[data-bc-art]', start: 'top 80%', end: 'center 50%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bc-dot]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.07, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-bc-art]', start: 'top 76%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bc-track]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-bc-art]', start: 'top 72%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bc-bar]',
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.1, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: '[data-bc-art]', start: 'top 76%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-bc-badge]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-bc-art]', start: 'top 54%', end: 'center 44%', scrub: 0.8 } }
      );

      // living-system ambient — the improvement signal keeps travelling the
      // trajectory, the target state pulses and the field breathes at rest.
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-bc-signal]', { strokeDashoffset: -30, duration: 2.4, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-bc-glow]', { scale: 1.1, opacity: '+=0.05', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-bc-pulse]', { scale: 0.5, opacity: 0.5 }, { scale: 1.6, opacity: 0, duration: 3, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-bc-hot]', { opacity: 0.5, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      gsap.to('[data-bc-numeral]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // diagnostic findings plotted across the matrix
  const dots = [
    { x: 196, y: 206 },
    { x: 224, y: 178 },
    { x: 182, y: 164 },
    { x: 246, y: 214 },
    { x: 292, y: 152 },
    { x: 316, y: 118 },
  ];
  // before (left) and after (right) operating bars
  const before = [22, 34, 28];
  const after = [58, 74, 66];

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
        data-bc-numeral=""
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

        {/* strategy matrix */}
        <Reveal delay={0.2} y={40}>
          <div data-bc-art="" aria-hidden="true" className="mx-auto mt-10 w-full max-w-[580px]">
            <svg viewBox="0 0 520 280" fill="none" className="w-full">
              <defs>
                <radialGradient id="bc-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--blue-400)" stopOpacity=".38" />
                  <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".1" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bc-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
                  <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".1" />
                </linearGradient>
              </defs>

              {/* breathing field glow */}
              <ellipse data-bc-glow="" cx="260" cy="140" rx="200" ry="120" fill="url(#bc-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

              {/* matrix frame + quadrant split */}
              <g stroke="rgba(255,255,255,.14)">
                <path d="M150 250h224M150 34v216" />
              </g>
              <g stroke="rgba(255,255,255,.07)">
                <path d="M262 42v208M156 142h212" />
              </g>
              {/* the high-performance quadrant, lit */}
              <rect data-bc-quad="" data-bc-hot="" x="264" y="44" width="104" height="96" rx="8" fill="color-mix(in srgb, var(--violet-400) 30%, transparent)" opacity=".28" />
              <rect data-bc-quad="" x="154" y="44" width="104" height="96" rx="8" fill="rgba(255,255,255,.025)" />
              <rect data-bc-quad="" x="154" y="146" width="104" height="100" rx="8" fill="rgba(255,255,255,.025)" />
              <rect data-bc-quad="" x="264" y="146" width="104" height="100" rx="8" fill="rgba(255,255,255,.025)" />

              {/* axis labels */}
              <text x="150" y="24" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">PERFORMANCE</text>
              <text x="374" y="266" textAnchor="end" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">EFFICIENCY</text>

              {/* diagnostic findings */}
              {dots.map((d, i) => (
                <circle key={i} data-bc-dot="" cx={d.x} cy={d.y} r="3.5" fill="rgba(255,255,255,.35)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              ))}

              {/* trajectory: current state → target state */}
              <path
                data-bc-track=""
                d="M186 216 C 232 206 268 152 330 92"
                stroke="var(--blue-300)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={300}
                strokeDasharray="300 300"
                style={{ filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--blue-400) 55%, transparent))' }}
              />
              <path data-bc-signal="" d="M186 216 C 232 206 268 152 330 92" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 27" opacity=".8" />

              {/* current state */}
              <circle cx="186" cy="216" r="6" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.4" />
              {/* target state — pulses at rest */}
              <circle data-bc-pulse="" cx="330" cy="92" r="12" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              <circle cx="330" cy="92" r="5" fill="var(--violet-300)" />

              {/* optimized badge */}
              <g data-bc-badge="" transform="translate(392 74)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <rect x="-38" y="-13" width="76" height="26" rx="13" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">OPTIMIZED</text>
              </g>

              {/* flanking operating bars — current (left) vs improved (right) */}
              <g>
                <text x="30" y="24" fill="rgba(255,255,255,.32)" fontSize="8" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">CURRENT</text>
                {before.map((h, i) => (
                  <rect key={i} data-bc-bar="" x={30 + i * 26} y={250 - h} width="16" height={h} rx="4" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.18)" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }} />
                ))}
                <text x="412" y="24" fill="var(--violet-300)" fontSize="8" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2" opacity=".8">IMPROVED</text>
                {after.map((h, i) => (
                  <rect key={i} data-bc-bar="" x={412 + i * 26} y={250 - h} width="16" height={h} rx="4" fill="url(#bc-bar)" stroke="color-mix(in srgb, var(--violet-400) 45%, transparent)" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }} />
                ))}
              </g>
            </svg>
          </div>
        </Reveal>

        {/* advisory chips */}
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
