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
 * Permanent Staffing — composition A (sticky-split archetype, workforce
 * artwork): a sticky narrative + a TALENT NETWORK — a central organization
 * node linked to abstract professional nodes, connection pulses travelling the
 * spokes and a "team assembled" ring closing on scroll — while the four hiring
 * tracks scroll past as a bordered list on the right. The right people, placed
 * for the long term.
 */
export function PermanentStaffingSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // living-system ambient — keeps breathing when the scroll stops, paused
      // off-screen so idle sections cost nothing.
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-ps-spoke]', { strokeDashoffset: -40, duration: 2.4, ease: 'none', repeat: -1 }, 0);
      gsap.utils.toArray<SVGElement>('[data-ps-node]').forEach((node, i) => {
        amb.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', repeat: -1, repeatDelay: 3.4, delay: i * 0.18, transformOrigin: '50% 50%' },
          0
        );
      });
      amb.to('[data-ps-glow]', { scale: 1.12, opacity: '+=0.05', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-ps-pulse]', { scale: 0.6, opacity: 0.45 }, { scale: 1.4, opacity: 0, duration: 3.2, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-ps-rot]', { rotation: 360, duration: 64, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      // team-assembled ring closes on scroll
      gsap.fromTo(
        '[data-ps-ring]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: 0.8 } }
      );
      // the hub arrives with a scale + settle — entrance variety beyond fade-up
      gsap.from('[data-ps-hub]', { scale: 0.7, rotate: -6, opacity: 0, duration: 0.9, ease: 'back.out(1.5)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-ps-art]', start: 'top 80%', once: true } });

      gsap.to('[data-ps-art]', {
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

          {/* talent network */}
          <Reveal delay={0.2} y={36}>
            <div data-ps-art="" aria-hidden="true" className="mt-8 max-w-[400px]">
              <svg viewBox="0 0 400 320" fill="none" className="w-full">
                <defs>
                  <radialGradient id="ps-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".5" />
                    <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".12" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* breathing glow + slow decorative ring + intelligence pulse */}
                <circle data-ps-glow="" cx="200" cy="160" r="120" fill="url(#ps-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle data-ps-rot="" cx="200" cy="160" r="132" stroke="rgba(255,255,255,.08)" strokeWidth="1" strokeDasharray="2 10" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle data-ps-pulse="" cx="200" cy="160" r="40" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                {/* professional nodes round the org hub */}
                {[
                  { x: 200, y: 40 },
                  { x: 330, y: 96 },
                  { x: 348, y: 224 },
                  { x: 200, y: 280 },
                  { x: 52, y: 224 },
                  { x: 70, y: 96 },
                ].map((n, i) => (
                  <g key={i}>
                    <path data-ps-spoke="" d={`M200 160 L${n.x} ${n.y}`} stroke="var(--violet-500)" strokeWidth="1.5" strokeDasharray="4 8" opacity=".7" />
                    <g data-ps-node="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                      <circle cx={n.x} cy={n.y} r="20" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" />
                      <circle cx={n.x} cy={n.y - 5} r="4.5" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" />
                      <path d={`M${n.x - 7} ${n.y + 8}a7 7 0 0114 0`} fill="none" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinecap="round" />
                    </g>
                  </g>
                ))}
                {/* team-assembled ring */}
                <circle data-ps-ring="" cx="200" cy="160" r="96" stroke="var(--blue-300)" strokeWidth="1.5" strokeDasharray="300 300" pathLength={300} opacity=".55" />
                {/* central organization hub */}
                <g data-ps-hub="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle cx="200" cy="160" r="34" fill="color-mix(in srgb, var(--violet-500) 24%, transparent)" stroke="rgba(255,255,255,.35)" />
                  <path d="M186 176v-22l14-7 14 7v22z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M193 176v-7h5v7M202 176v-7h5v7M190 160h20" stroke="#fff" strokeWidth="1.1" fill="none" />
                </g>
              </svg>
            </div>
          </Reveal>
        </div>

        {/* hiring tracks — bordered list */}
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
