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
 * Sales Strategy — composition A (sticky-split archetype, revenue-engine
 * artwork): a sticky narrative beside a REVENUE PIPELINE — stacked qualifying
 * stages that widen into place on scroll, prospect tokens travelling down the
 * spine, a conversion ring closing and a revenue node pulsing at the outlet —
 * while the four build tracks scroll past as a bordered list on the right.
 * A system that turns demand into revenue, not a sales cliché.
 */
export function SalesStrategySection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // pipeline stages widen into place as the section is read
      gsap.fromTo(
        '[data-ss-stage]',
        { scaleX: 0.25, opacity: 0.25 },
        {
          scaleX: 1,
          opacity: 1,
          stagger: 0.14,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: '[data-ss-art]', start: 'top 78%', end: 'center 48%', scrub: 0.8 },
        }
      );
      // conversion ring closes on scroll
      gsap.fromTo(
        '[data-ss-ring]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: 0.8 } }
      );

      // living-system ambient — prospects keep flowing, the outlet keeps
      // converting and the field breathes when the scroll stops.
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-ss-flow]', { strokeDashoffset: -36, duration: 2.2, ease: 'none', repeat: -1 }, 0);
      gsap.utils.toArray<SVGElement>('[data-ss-token]').forEach((t, i) => {
        amb.fromTo(
          t,
          { y: -74, opacity: 0 },
          { y: 96, opacity: 1, duration: 3.4, ease: 'power1.in', repeat: -1, delay: i * 1.1 },
          0
        );
      });
      amb.to('[data-ss-glow]', { scale: 1.12, opacity: '+=0.05', duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-ss-pulse]', { scale: 0.6, opacity: 0.5 }, { scale: 1.5, opacity: 0, duration: 3, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.to('[data-ss-rot]', { rotation: 360, duration: 68, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });

      // the revenue outlet arrives with a scale + settle
      gsap.from('[data-ss-outlet]', { scale: 0.7, opacity: 0, duration: 0.9, ease: 'back.out(1.5)', transformOrigin: '50% 50%', scrollTrigger: { trigger: '[data-ss-art]', start: 'top 80%', once: true } });

      gsap.to('[data-ss-art]', {
        y: -22,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // qualifying stages, narrowing toward the revenue outlet
  const stages = [
    { y: 44, w: 260, label: 'MARKET' },
    { y: 84, w: 212, label: 'QUALIFIED' },
    { y: 124, w: 164, label: 'PIPELINE' },
    { y: 164, w: 116, label: 'CLOSED' },
  ];

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

          {/* revenue pipeline */}
          <Reveal delay={0.2} y={36}>
            <div data-ss-art="" aria-hidden="true" className="mt-8 max-w-[400px]">
              <svg viewBox="0 0 400 320" fill="none" className="w-full">
                <defs>
                  <radialGradient id="ss-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".45" />
                    <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".12" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ss-stage" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--violet-500)" stopOpacity=".14" />
                    <stop offset="50%" stopColor="var(--violet-400)" stopOpacity=".42" />
                    <stop offset="100%" stopColor="var(--violet-500)" stopOpacity=".14" />
                  </linearGradient>
                </defs>

                {/* breathing field + slow decorative ring */}
                <circle data-ss-glow="" cx="200" cy="150" r="126" fill="url(#ss-glow)" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle data-ss-rot="" cx="200" cy="150" r="140" stroke="rgba(255,255,255,.08)" strokeWidth="1" strokeDasharray="2 10" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* qualifying stages */}
                {stages.map((s) => (
                  <g key={s.label} data-ss-stage="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                    <rect x={200 - s.w / 2} y={s.y} width={s.w} height="28" rx="14" fill="url(#ss-stage)" stroke="rgba(255,255,255,.22)" />
                    <text x="200" y={s.y + 18} textAnchor="middle" fill="rgba(255,255,255,.65)" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">
                      {s.label}
                    </text>
                  </g>
                ))}

                {/* pipeline spine + travelling prospect tokens */}
                <path d="M200 44v152" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
                <path data-ss-flow="" d="M200 44v152" stroke="var(--violet-300)" strokeWidth="2" strokeDasharray="4 12" opacity=".75" strokeLinecap="round" />
                {[0, 1, 2].map((i) => (
                  <circle key={i} data-ss-token="" cx="200" cy="120" r="4.5" fill="var(--blue-300)" opacity="0" />
                ))}

                {/* conversion ring around the revenue outlet */}
                <circle data-ss-ring="" cx="200" cy="240" r="46" stroke="var(--blue-300)" strokeWidth="1.5" strokeDasharray="300 300" pathLength={300} opacity=".55" />
                <circle data-ss-pulse="" cx="200" cy="240" r="30" fill="none" stroke="var(--blue-300)" strokeWidth="1.4" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* revenue outlet */}
                <g data-ss-outlet="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle cx="200" cy="240" r="32" fill="color-mix(in srgb, var(--violet-500) 24%, transparent)" stroke="rgba(255,255,255,.35)" />
                  <path d="M200 226v28M207 231h-10a4.5 4.5 0 000 9h6a4.5 4.5 0 010 9h-11" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </Reveal>
        </div>

        {/* build tracks — bordered list */}
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
