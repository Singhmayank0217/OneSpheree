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

const CX = 230;
const CY = 230;
/** Five risk blips placed round the radar, deterministic (no render randomness). */
const r2 = (n: number) => Math.round(n * 100) / 100; // 2dp — identical server/client string (avoids sin/cos ULP hydration drift)
const BLIPS = Array.from({ length: 5 }, (_, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180);
  const r = 96 + (i % 3) * 30;
  return { x: r2(CX + Math.cos(a) * r), y: r2(CY + Math.sin(a) * r), s: i % 2 ? 6 : 8 };
});

/**
 * Risk Assessment — composition F (new for this page): an artful RISK RADAR,
 * not a dashboard. Concentric range rings, a continuously rotating sweep, and
 * five category blips that surface as the section scrolls, over an editorial
 * headline with generous space. The five risk categories read below as glass
 * tokens. Represents monitoring and early detection, not reporting widgets.
 */
export function RiskDDSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-rk-sweep]', { rotation: 360, duration: 7, ease: 'none', repeat: -1, transformOrigin: `${CX}px ${CY}px` });
      gsap.fromTo(
        '[data-rk-blip]',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.16,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: { trigger: '[data-rk-radar]', start: 'top 78%', end: 'center 48%', scrub: 0.8 },
        }
      );
      gsap.to('[data-rk-radar]', {
        y: -18,
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
            'radial-gradient(55% 42% at 50% 55%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section text-center">
        <Reveal>
          <p className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
            <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
          </p>
        </Reveal>
        <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
        </Reveal>

        {/* risk radar */}
        <Reveal delay={0.2} y={40}>
          <div data-rk-radar="" aria-hidden="true" className="mx-auto mt-10 w-full max-w-[440px]">
            <svg viewBox="0 0 460 460" fill="none" className="w-full">
              <defs>
                <linearGradient id="rk-sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--violet-400)" stopOpacity="0" />
                  <stop offset="100%" stopColor="var(--violet-400)" stopOpacity=".38" />
                </linearGradient>
              </defs>
              {/* range rings + spokes */}
              <g stroke="rgba(255,255,255,.12)">
                <circle cx={CX} cy={CY} r="180" strokeDasharray="1 7" />
                <circle cx={CX} cy={CY} r="126" strokeDasharray="1 7" />
                <circle cx={CX} cy={CY} r="66" strokeDasharray="1 7" />
              </g>
              <g stroke="rgba(255,255,255,.08)">
                <path d={`M${CX} ${CY - 180}V${CY + 180}`} />
                <path d={`M${CX - 180} ${CY}H${CX + 180}`} />
                <path d={`M${CX - 127} ${CY - 127}L${CX + 127} ${CY + 127}`} />
                <path d={`M${CX + 127} ${CY - 127}L${CX - 127} ${CY + 127}`} />
              </g>

              {/* rotating sweep */}
              <g data-rk-sweep="">
                <path d={`M${CX} ${CY} L${CX + 180} ${CY} A180 180 0 0 0 ${CX + 155} ${CY - 92} Z`} fill="url(#rk-sweep)" />
                <line x1={CX} y1={CY} x2={CX + 180} y2={CY} stroke="var(--violet-300)" strokeWidth="1.5" opacity=".7" />
              </g>

              {/* category blips */}
              {BLIPS.map((b, i) => (
                <g data-rk-blip="" key={i} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle cx={b.x} cy={b.y} r={b.s + 6} fill="color-mix(in srgb, var(--violet-500) 20%, transparent)" />
                  <circle cx={b.x} cy={b.y} r={b.s} fill={i % 2 ? 'var(--blue-300)' : 'var(--violet-300)'} />
                </g>
              ))}

              {/* centre */}
              <circle cx={CX} cy={CY} r="10" fill="#0a0c10" stroke="var(--violet-300)" strokeWidth="2" />
              <circle cx={CX} cy={CY} r="3.5" fill="var(--violet-300)" />
            </svg>
          </div>
        </Reveal>

        {/* risk category tokens */}
        <Reveal>
          <p className="t-micro mt-12 text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="cards" className="mx-auto mt-4 grid max-w-[900px] grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
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
