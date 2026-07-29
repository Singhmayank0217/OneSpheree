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
 * Marketplace Management — composition A (sticky-split archetype, commerce
 * artwork): a sticky narrative + a CONNECTED-MARKETPLACE hub — a central
 * brand node linked to six channel nodes, sync pulses travelling the spokes
 * and one unified "listings synced" ring closing on scroll — while the six
 * platforms scroll past as a bordered list on the right. One brand, every
 * marketplace, in sync.
 */
export function MarketplaceSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-mk-spoke]', { strokeDashoffset: -40, duration: 2.4, ease: 'none', repeat: -1 });
      gsap.utils.toArray<SVGElement>('[data-mk-node]').forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', repeat: -1, repeatDelay: 3.4, delay: i * 0.18, yoyo: false, transformOrigin: '50% 50%' }
        );
      });
      gsap.fromTo(
        '[data-mk-sync]',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: 0.8 } }
      );
      gsap.to('[data-mk-art]', {
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

          {/* connected-marketplace hub */}
          <Reveal delay={0.2} y={36}>
            <div data-mk-art="" aria-hidden="true" className="mt-8 max-w-[400px]">
              <svg viewBox="0 0 400 320" fill="none" className="w-full">
                {/* channel nodes round the hub */}
                {[
                  { x: 200, y: 40 },
                  { x: 330, y: 96 },
                  { x: 348, y: 224 },
                  { x: 200, y: 280 },
                  { x: 52, y: 224 },
                  { x: 70, y: 96 },
                ].map((n, i) => (
                  <g key={i}>
                    <path data-mk-spoke="" d={`M200 160 L${n.x} ${n.y}`} stroke="var(--violet-500)" strokeWidth="1.5" strokeDasharray="4 8" opacity=".7" />
                    <g data-mk-node="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                      <circle cx={n.x} cy={n.y} r="20" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" />
                      <path d={`M${n.x - 8} ${n.y - 1}l2-6h12l2 6M${n.x - 8} ${n.y - 1}v8h16v-8M${n.x - 8} ${n.y - 1}h16`} stroke="var(--violet-300)" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
                    </g>
                  </g>
                ))}
                {/* unified sync ring */}
                <circle data-mk-sync="" cx="200" cy="160" r="96" stroke="var(--blue-300)" strokeWidth="1.5" strokeDasharray="300 300" pathLength={300} opacity=".55" />
                {/* central brand hub */}
                <circle cx="200" cy="160" r="34" fill="color-mix(in srgb, var(--violet-500) 24%, transparent)" stroke="rgba(255,255,255,.35)" />
                <path d="M188 168l6-14 6 14M191 163h6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Reveal>
        </div>

        {/* platforms — bordered list */}
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
