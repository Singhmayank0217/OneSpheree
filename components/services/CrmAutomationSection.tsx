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

/** Pipeline stages of the board — x origin, label, resident deal cards. */
const COLUMNS = [
  { x: 16, label: 'LEAD', cards: 3 },
  { x: 124, label: 'QUALIFY', cards: 2 },
  { x: 232, label: 'PROPOSE', cards: 2 },
  { x: 340, label: 'WON', cards: 1 },
];

/**
 * CRM & Sales Automation — composition E (workflow-rail archetype, pipeline
 * artwork): the four capabilities sit as steps on a vertical rail that draws
 * itself while a signal travels down; opposite (sticky) a CRM PIPELINE BOARD —
 * stage columns of deal cards where one deal advances stage to stage on its
 * own, hand-off arrows firing in sequence beneath it and a reporting strip
 * drawing below. Automation doing the moving, not a screenshot of a dashboard.
 */
export function CrmAutomationSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // the rail draws down as the steps are read, a signal riding its head
      const rail = railRef.current;
      if (rail) {
        gsap.fromTo(
          '[data-cr-railline]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: '50% 0%', scrollTrigger: { trigger: rail, start: 'top 76%', end: 'bottom 62%', scrub: 0.7 } }
        );
        gsap.fromTo(
          '[data-cr-signal]',
          { y: 0 },
          { y: () => rail.offsetHeight - 20, ease: 'none', scrollTrigger: { trigger: rail, start: 'top 76%', end: 'bottom 62%', scrub: 0.7 } }
        );
      }

      // the board assembles: columns, then the cards already in play
      gsap.fromTo(
        '[data-cr-col]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '[data-cr-board]', start: 'top 80%', once: true } }
      );
      gsap.fromTo(
        '[data-cr-card]',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.06, ease: 'back.out(1.5)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-cr-board]', start: 'top 74%', once: true } }
      );
      gsap.fromTo(
        '[data-cr-spark]',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-cr-board]', start: 'top 62%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-cr-chip]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-cr-board]', start: 'top 56%', end: 'center 44%', scrub: 0.8 } }
      );

      // living-system ambient — the pipeline keeps working on its own.
      const amb = gsap.timeline({ paused: true });
      // a deal advances LEAD → QUALIFY → PROPOSE → WON, then a new one starts
      amb.fromTo('[data-cr-deal]',
        { x: 0, y: 0, opacity: 0 },
        {
          keyframes: [
            { opacity: 1, duration: 0.4 },
            { x: 108, y: -40, duration: 0.9, ease: 'power3.inOut', delay: 0.7 },
            { x: 216, y: -40, duration: 0.9, ease: 'power3.inOut', delay: 0.7 },
            { x: 324, y: -80, duration: 0.9, ease: 'power3.inOut', delay: 0.7 },
            { opacity: 0, duration: 0.5, delay: 0.9 },
          ],
          repeat: -1,
          repeatDelay: 0.6,
        }, 0);
      // hand-off arrows fire just as the deal crosses them
      gsap.utils.toArray<SVGElement>('[data-cr-arrow]').forEach((a, i) => {
        amb.to(a, { opacity: 1, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: 6.6, delay: 1.1 + i * 1.6 }, 0);
      });
      amb.to('[data-cr-won]', { opacity: 0.85, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
      amb.to('[data-cr-glow]', { scale: 1.08, opacity: '+=0.05', duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });
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
            'radial-gradient(55% 45% at 85% 45%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* narrative + implementation rail */}
          <div>
            <Reveal>
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
                <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
              </p>
            </Reveal>
            <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[15ch]" />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[48ch] text-ondark-muted">{section.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-micro mt-8 text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>

            <div ref={railRef} className="relative mt-4 pl-2">
              <span aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[rgba(255,255,255,.12)]" />
              <span data-cr-railline="" aria-hidden="true" className="absolute left-[26px] top-3 h-[calc(100%-24px)] w-px bg-[var(--violet-400)]" />
              <span
                data-cr-signal=""
                aria-hidden="true"
                className="absolute left-[26px] top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[var(--violet-300)]"
                style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--violet-300) 80%, transparent)' }}
              />
              <Reveal stagger="text">
                {section.items.map((item, i) => (
                  <div key={item.label} className="relative flex items-center gap-4 py-3">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.22)] bg-[#0a0f1c] text-[var(--violet-300)]">
                      <ServiceIcon name={item.icon} size={16} />
                    </span>
                    <div>
                      <span className="font-medium text-ondark">{item.label}</span>
                      <span className="ml-2 font-mono text-[10px] text-ondark-muted opacity-60">PHASE {i + 1}</span>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          {/* sticky pipeline board */}
          <Reveal y={40} className="lg:sticky lg:top-[16vh] lg:self-start">
            <div data-cr-board="" aria-hidden="true" className="mx-auto w-full max-w-[440px]">
              <svg viewBox="0 0 440 330" fill="none" className="w-full">
                <defs>
                  <radialGradient id="cr-glow-g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".4" />
                    <stop offset="64%" stopColor="var(--violet-500)" stopOpacity=".1" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="cr-deal-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
                    <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".28" />
                  </linearGradient>
                </defs>

                <ellipse data-cr-glow="" cx="220" cy="150" rx="200" ry="130" fill="url(#cr-glow-g)" opacity=".5" />

                {/* stage columns */}
                {COLUMNS.map((col, ci) => (
                  <g key={col.label} data-cr-col="">
                    <rect
                      data-cr-won={ci === COLUMNS.length - 1 ? '' : undefined}
                      x={col.x}
                      y="14"
                      width="96"
                      height="24"
                      rx="8"
                      fill={ci === COLUMNS.length - 1 ? 'color-mix(in srgb, var(--violet-500) 30%, transparent)' : 'rgba(255,255,255,.06)'}
                      stroke={ci === COLUMNS.length - 1 ? 'var(--violet-300)' : 'rgba(255,255,255,.18)'}
                      opacity={ci === COLUMNS.length - 1 ? '.55' : '1'}
                    />
                    <text x={col.x + 48} y="30" textAnchor="middle" fill="rgba(255,255,255,.62)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">
                      {col.label}
                    </text>
                    <rect x={col.x} y="46" width="96" height="214" rx="10" fill="rgba(255,255,255,.028)" stroke="rgba(255,255,255,.1)" />
                    {Array.from({ length: col.cards }, (_, i) => (
                      <g key={i} data-cr-card="">
                        <rect x={col.x + 10} y={58 + i * 40} width="76" height="32" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
                        <path d={`M${col.x + 20} ${70 + i * 40}h34M${col.x + 20} ${79 + i * 40}h22`} stroke="rgba(255,255,255,.24)" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    ))}
                  </g>
                ))}

                {/* automated hand-offs between stages */}
                {[118, 226, 334].map((x, i) => (
                  <g key={i} data-cr-arrow="" opacity=".18">
                    <path d={`M${x - 7} 272h14M${x + 2} 267l5 5-5 5`} stroke="var(--violet-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                ))}

                {/* the deal the automation moves */}
                <g data-cr-deal="" opacity="0">
                  <rect x="26" y="178" width="76" height="32" rx="8" fill="url(#cr-deal-g)" stroke="var(--violet-300)" strokeWidth="1.2" />
                  <path d="M36 190h34M36 199h22" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".75" />
                  <circle cx="94" cy="186" r="3.5" fill="var(--blue-300)" />
                </g>

                {/* reporting strip */}
                <path d="M16 292H424" stroke="rgba(255,255,255,.1)" />
                <text x="16" y="314" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">PIPELINE REPORTING</text>
                <path
                  data-cr-spark=""
                  d="M150 320l30-10 30 4 30-14 30 4 30-12"
                  stroke="var(--blue-300)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                  strokeDasharray="100 100"
                />
                <g data-cr-chip="" transform="translate(388 310)">
                  <rect x="-46" y="-12" width="92" height="24" rx="12" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1" />
                  <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="1.5">AUTOMATED</text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
