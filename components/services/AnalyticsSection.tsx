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

/** Polar bars for the data bloom — deterministic, no randomness at render. */
const BLOOM = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
  const wave = Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.6) * 0.5;
  const len = 42 + (wave * 0.5 + 0.5) * 74;
  return { a, len, hot: i % 7 === 0 };
});

/**
 * Analytics & BI — composition H, the finale: an artistic DATA BLOOM (a
 * polar burst of measurement bars around concentric reading rings — a
 * visualization as artwork, not a dashboard) sits center-stage; the
 * narrative opens offset-left above it; the reporting capabilities close
 * the section as a centered row of mono readout tokens. The bloom's bars
 * grow on scroll and the ring rotates almost imperceptibly. Ends with a
 * quiet transition band preparing the trust chapters that follow.
 */
export function AnalyticsSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-an-bar]',
        { scaleY: 0.12 },
        {
          scaleY: 1,
          ease: 'none',
          stagger: { each: 0.012, from: 'center' },
          scrollTrigger: { trigger: '[data-an-bloom]', start: 'top 80%', end: 'center 45%', scrub: 0.8 },
        }
      );
      gsap.to('[data-an-bloom] svg', { rotation: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.4 }, transformOrigin: '50% 50%' });
      // quiet end-transition: the closing band's glow eases in
      gsap.fromTo(
        '[data-an-next]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.8,
          scrollTrigger: { trigger: '[data-an-next]', start: 'top 92%', once: true },
        }
      );
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
            'radial-gradient(55% 40% at 50% 62%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark pt-section">
        {/* offset-left narrative */}
        <div className="max-w-[640px]">
          <Reveal>
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--blue-300)]">
                {section.index}
              </span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mt-3" />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        {/* the data bloom */}
        <Reveal y={40}>
          <div data-an-bloom="" aria-hidden="true" className="mx-auto mt-6 w-full max-w-[560px]">
            <svg viewBox="0 0 560 460" fill="none" className="w-full">
              {/* reading rings */}
              <g transform="translate(280 240)">
                <circle r="52" stroke="rgba(255,255,255,.14)" strokeDasharray="1 5" />
                <circle r="96" stroke="rgba(255,255,255,.10)" strokeDasharray="1 6" />
                <circle r="142" stroke="rgba(255,255,255,.07)" strokeDasharray="1 7" />
                {/* polar measurement bars */}
                {BLOOM.map((b, i) => {
                  const x1 = Math.cos(b.a) * 56;
                  const y1 = Math.sin(b.a) * 56;
                  const x2 = Math.cos(b.a) * (56 + b.len);
                  const y2 = Math.sin(b.a) * (56 + b.len);
                  return (
                    <line
                      key={i}
                      data-an-bar=""
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={b.hot ? 'var(--violet-300)' : i % 2 ? 'var(--blue-400)' : 'rgba(255,255,255,.30)'}
                      strokeWidth={b.hot ? 3 : 2}
                      strokeLinecap="round"
                      opacity={b.hot ? 0.95 : 0.55}
                      style={{ transformOrigin: `${x1}px ${y1}px`, transformBox: 'fill-box' }}
                    />
                  );
                })}
                {/* insight core */}
                <circle r="34" fill="color-mix(in srgb, var(--violet-500) 24%, transparent)" stroke="rgba(255,255,255,.3)" />
                <path d="M-12 8 L-4 -2 L4 4 L14 -10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            </svg>
          </div>
        </Reveal>

        {/* readout tokens */}
        <Reveal>
          <p className="t-micro text-center text-ondark-muted">{section.itemsLabel}</p>
        </Reveal>
        <Reveal stagger="text" className="mx-auto mt-3 flex max-w-[820px] flex-wrap justify-center gap-2">
          {section.items.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-md border border-line-dark bg-[rgba(255,255,255,.04)] px-3 py-2 font-mono text-[length:var(--text-caption-size)] uppercase tracking-[.06em] text-ondark transition-colors duration-[var(--duration-base)] hover:border-[var(--blue-300)]"
            >
              <span className="text-[var(--blue-300)]">
                <ServiceIcon name={item.icon} size={14} />
              </span>
              {item.label}
            </span>
          ))}
        </Reveal>

        {/* quiet transition toward the trust chapters that follow */}
        <div data-an-next="" className="relative mt-16 pb-10 text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px]"
            style={{
              background:
                'radial-gradient(60% 100% at 50% 100%, color-mix(in srgb, var(--violet-500) 14%, transparent), transparent 70%)',
            }}
          />
          <span aria-hidden="true" className="mx-auto block h-8 w-px bg-gradient-to-b from-transparent to-[rgba(255,255,255,.35)]" />
          <p className="t-micro relative mt-3 text-ondark-muted">
            The numbers are only half the story — the proof follows
          </p>
        </div>
      </Container>
    </section>
  );
}
