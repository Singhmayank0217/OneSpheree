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

// milestone corners of the ascending learning path
const STEPS = [
  { x: 70, y: 164 },
  { x: 130, y: 128 },
  { x: 190, y: 92 },
  { x: 250, y: 52 },
];

/**
 * Training & Skill Development — composition G (learning-journey archetype,
 * growth artwork): the narrative + a bordered programme list sit left; opposite
 * a LEARNING PATH panel — an ascending staircase that draws on scroll with
 * milestone nodes lighting in sequence, a signal climbing it, a graduation
 * marker at the summit and a CERTIFIED seal. Talent developed, skills grown.
 */
export function TrainingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-tr-path]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-tr-panel]', start: 'top 76%', end: 'center 48%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-tr-step]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.14, ease: 'back.out(1.6)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-tr-panel]', start: 'top 72%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-tr-grad]',
        { scale: 0.4, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, ease: 'back.out(1.6)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-tr-panel]', start: 'top 58%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-tr-stamp]',
        { scale: 0.5, rotation: -14, opacity: 0 },
        { scale: 1, rotation: -8, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-tr-panel]', start: 'top 52%', end: 'center 44%', scrub: 0.8 } }
      );

      // living-system ambient — a learner signal keeps climbing, the panel breathes
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-tr-signal]', { strokeDashoffset: -30, duration: 2.4, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-tr-glow]', { scale: 1.12, opacity: '+=0.05', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-tr-seal]', { scale: 0.85, opacity: 0.6 }, { scale: 1.15, opacity: 0, duration: 2.8, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-tr-art]', { y: -12, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={section.id} aria-label={section.headline} className="relative overflow-hidden bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 20% 40%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 70%, color-mix(in srgb, var(--blue-500) 10%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* narrative + programme list */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
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

          {/* learning path panel */}
          <Reveal y={40}>
            <div data-tr-art="" aria-hidden="true" className="relative mx-auto w-full max-w-[440px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_22%,transparent)] text-[var(--violet-200)]">
                  <ServiceIcon name="graduationCap" size={18} />
                </span>
                <span className="font-mono text-[10px] tracking-[2px] text-ondark-muted">LEARNING PATH</span>
                <span className="ml-auto font-mono text-[10px] tracking-[1px] text-[var(--violet-300)]">+4 LEVELS</span>
              </div>

              <svg data-tr-panel="" viewBox="0 0 340 230" fill="none" className="mt-3 w-full">
                <defs>
                  <radialGradient id="tr-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".4" />
                    <stop offset="65%" stopColor="var(--violet-500)" stopOpacity=".1" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse data-tr-glow="" cx="180" cy="130" rx="170" ry="110" fill="url(#tr-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* baseline */}
                <path d="M20 204 H320" stroke="rgba(255,255,255,.12)" />

                {/* ascending staircase — static rail + drawn progress */}
                <path d="M20 204 H70 V164 H130 V128 H190 V92 H250 V52 H300" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
                <path
                  data-tr-path=""
                  d="M20 204 H70 V164 H130 V128 H190 V92 H250 V52 H300"
                  stroke="var(--violet-400)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={300}
                  strokeDasharray="300 300"
                  style={{ filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--violet-500) 55%, transparent))' }}
                />
                {/* learner signal climbing the path */}
                <path
                  data-tr-signal=""
                  d="M20 204 H70 V164 H130 V128 H190 V92 H250 V52 H300"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="3 27"
                  opacity=".8"
                />

                {/* milestone nodes + level labels */}
                {STEPS.map((s, i) => (
                  <g key={i}>
                    <circle data-tr-step="" cx={s.x} cy={s.y} r="5.5" fill="var(--violet-300)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                    <text x={s.x} y={s.y - 12} textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1">{`L${i + 1}`}</text>
                  </g>
                ))}

                {/* graduation marker at the summit */}
                <g data-tr-grad="" transform="translate(300 52)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle r="16" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1.25" />
                  <path d="M-9 -1l9-4 9 4-9 4z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M0 3v5M-5 1v4a5 2.4 0 0010 0v-4" fill="none" stroke="#fff" strokeWidth="1.2" />
                </g>
              </svg>

              {/* CERTIFIED seal */}
              <div
                data-tr-stamp=""
                className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--violet-400)] bg-[#0b1120]"
              >
                <span data-tr-seal="" className="absolute inset-0 rounded-full border border-[var(--violet-300)]" />
                <span className="absolute inset-1.5 rounded-full border border-dashed border-[color-mix(in_srgb,var(--violet-300)_60%,transparent)]" />
                <span className="font-mono text-[8px] font-bold tracking-[.5px] text-[var(--violet-200)]">CERTIFIED</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
