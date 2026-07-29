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

/** Channel partners the alliance distributes through. */
const PARTNERS = [58, 132, 208, 282];

/**
 * Partnership Consulting — composition G (panel archetype, alliance artwork):
 * the narrative and a bordered list of deliverables sit left; opposite a
 * PARTNER NETWORK panel — two organizations bound by an interlock that draws
 * itself, value flowing both ways along the link, an alliance ring closing
 * around it, and a distribution bracket branching down to channel partners that
 * activate one after another. An alliance being built, not a handshake photo.
 */
export function PartnershipSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // the two organizations arrive, then the interlock binds them
      gsap.fromTo(
        '[data-pn-org]',
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.14, ease: 'back.out(1.5)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-pn-art]', start: 'top 78%', once: true } }
      );
      gsap.fromTo(
        '[data-pn-lock]',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, stagger: 0.16, ease: 'none', scrollTrigger: { trigger: '[data-pn-art]', start: 'top 74%', end: 'center 50%', scrub: 0.8 } }
      );
      // the alliance ring closes around the interlock
      gsap.fromTo(
        '[data-pn-ring]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-pn-art]', start: 'top 70%', end: 'center 46%', scrub: 0.8 } }
      );
      // the distribution bracket extends and the channel partners land
      gsap.fromTo(
        '[data-pn-bracket]',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-pn-art]', start: 'top 64%', end: 'center 44%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-pn-partner]',
        { y: 16, scale: 0.75, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.11, ease: 'expo.out', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-pn-art]', start: 'top 58%', once: true } }
      );

      // living-system ambient — value keeps moving through the alliance and the
      // channel partners light in turn.
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-pn-flowa]', { strokeDashoffset: -32, duration: 2.4, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-pn-flowb]', { strokeDashoffset: 32, duration: 2.4, ease: 'none', repeat: -1 }, 0);
      amb.to('[data-pn-glow]', { scale: 1.09, opacity: '+=0.05', duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      gsap.utils.toArray<SVGElement>('[data-pn-lit]').forEach((lit, i) => {
        amb.to(lit, { opacity: 0.8, duration: 0.55, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: 4, delay: i * 0.7 }, 0);
      });
      gsap.utils.toArray<SVGElement>('[data-pn-flash]').forEach((f, i) => {
        amb.fromTo(f,
          { scale: 0.6, opacity: 0.6 },
          { scale: 1.6, opacity: 0, duration: 1.1, ease: 'power2.out', repeat: -1, repeatDelay: 4.4, delay: i * 0.7, transformOrigin: '50% 50%' },
          0);
      });
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      gsap.to('[data-pn-art]', {
        y: -22,
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
            'radial-gradient(50% 45% at 20% 40%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 70%), radial-gradient(45% 40% at 88% 70%, color-mix(in srgb, var(--blue-500) 10%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* narrative + deliverables */}
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

          {/* partner network panel */}
          <Reveal y={40}>
            <div data-pn-art="" aria-hidden="true" className="relative mx-auto w-full max-w-[440px] rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_22%,transparent)] text-[var(--violet-200)]">
                  <ServiceIcon name="link" size={18} />
                </span>
                <span className="font-mono text-[10px] tracking-[2px] text-ondark-muted">PARTNER NETWORK</span>
                <span className="ml-auto font-mono text-[10px] tracking-[1px] text-[var(--violet-300)]">4 CHANNELS</span>
              </div>

              <svg viewBox="0 0 340 240" fill="none" className="mt-3 w-full">
                <defs>
                  <radialGradient id="pn-glow-g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".4" />
                    <stop offset="65%" stopColor="var(--violet-500)" stopOpacity=".1" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="pn-node-g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".28" />
                    <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".1" />
                  </linearGradient>
                </defs>

                <ellipse data-pn-glow="" cx="170" cy="96" rx="160" ry="96" fill="url(#pn-glow-g)" opacity=".5" />

                {/* the alliance ring closing around the interlock */}
                <circle data-pn-ring="" cx="170" cy="74" r="46" stroke="var(--blue-300)" strokeWidth="1.4" strokeDasharray="300 300" pathLength={300} opacity=".5" />

                {/* value flowing both ways along the link */}
                <path d="M108 74h116" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
                <path data-pn-flowa="" d="M108 68h30" stroke="var(--violet-300)" strokeWidth="1.6" strokeDasharray="3 9" strokeLinecap="round" opacity=".85" />
                <path data-pn-flowb="" d="M202 80h30" stroke="var(--blue-300)" strokeWidth="1.6" strokeDasharray="3 9" strokeLinecap="round" opacity=".85" />

                {/* the two organizations */}
                <g data-pn-org="">
                  <rect x="44" y="48" width="64" height="52" rx="12" fill="url(#pn-node-g)" stroke="rgba(255,255,255,.28)" />
                  <path d="M64 88V64l12-8 12 8v24z" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M72 88v-8h8v8" fill="none" stroke="var(--violet-300)" strokeWidth="1.2" />
                </g>
                <g data-pn-org="">
                  <rect x="232" y="48" width="64" height="52" rx="12" fill="url(#pn-node-g)" stroke="rgba(255,255,255,.28)" />
                  <path d="M250 68l6-10h16l6 10" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M250 68v22h28V68" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M258 90v-10h12v10" fill="none" stroke="var(--blue-300)" strokeWidth="1.2" />
                </g>

                {/* the interlock that binds them */}
                <circle data-pn-lock="" cx="160" cy="74" r="17" stroke="var(--violet-300)" strokeWidth="2" pathLength={100} strokeDasharray="100 100" />
                <circle data-pn-lock="" cx="180" cy="74" r="17" stroke="var(--blue-300)" strokeWidth="2" pathLength={100} strokeDasharray="100 100" />

                {/* distribution bracket down to the channel partners */}
                <path
                  data-pn-bracket=""
                  d={`M170 120v22M${PARTNERS[0]} 142H${PARTNERS[3]}M${PARTNERS[0]} 142v16M${PARTNERS[1]} 142v16M${PARTNERS[2]} 142v16M${PARTNERS[3]} 142v16`}
                  stroke="rgba(255,255,255,.24)"
                  strokeWidth="1.4"
                  pathLength={100}
                  strokeDasharray="100 100"
                />

                {/* channel partners — activated in turn */}
                {PARTNERS.map((x, i) => (
                  <g key={i} transform={`translate(${x} 182)`}>
                    <circle data-pn-flash="" r="26" fill="none" stroke="var(--violet-300)" strokeWidth="1.3" opacity="0" />
                    <g data-pn-partner="">
                      <rect x="-24" y="-22" width="48" height="44" rx="10" fill="url(#pn-node-g)" stroke="rgba(255,255,255,.26)" />
                      <rect data-pn-lit="" x="-18" y="-16" width="36" height="10" rx="4" fill="var(--violet-400)" opacity=".14" />
                      <path d="M-12 6h24M-12 14h14" stroke="rgba(255,255,255,.32)" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
