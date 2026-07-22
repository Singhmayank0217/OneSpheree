'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/animations/RevealText';
import type { ProcessStepItem } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/**
 * Our Proven Growth Process — composition K, the timeline. Desktop: a SNAKE —
 * steps 1–5 flow left→right, a curved connector turns the corner, steps 6–10
 * flow back right→left beneath; the line draws itself and cards resolve in
 * step order, all scrubbed to scroll. Mobile: the same journey as a vertical
 * rail. Minimal marks: dot, mono number, title.
 */
export function ProcessSection({ headline, steps }: { headline: string; steps: ProcessStepItem[] }) {
  const rootRef = useRef<HTMLElement>(null);
  // split evenly across the two rows of the snake — 10 steps → 5+5 (unchanged),
  // 6 steps → 3+3, etc. Columns follow the top row so both rows stay aligned.
  const half = Math.ceil(steps.length / 2);
  const row1 = steps.slice(0, half);
  const row2 = steps.slice(half);
  const cols = { gridTemplateColumns: `repeat(${row1.length}, minmax(0, 1fr))` };

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '[data-pr-desktop]', start: 'top 72%', end: 'bottom 55%', scrub: 0.8 },
      });
      tl.fromTo('[data-pr-line1]', { scaleX: 0 }, { scaleX: 1, duration: 5, transformOrigin: '0 50%' }, 0)
        .fromTo(
          '[data-pr-step]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 1 },
          0.2
        )
        .fromTo('[data-pr-curve]', { strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 1.6 }, 5)
        .fromTo('[data-pr-line2]', { scaleX: 0 }, { scaleX: 1, duration: 5, transformOrigin: '100% 50%' }, 6.4);
    });

    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        '[data-pr-mline]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: '50% 0%',
          scrollTrigger: { trigger: '[data-pr-mobile]', start: 'top 78%', end: 'bottom 65%', scrub: 0.8 },
        }
      );
      gsap.utils.toArray<HTMLElement>('[data-pr-mstep]').forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label={headline} className="relative overflow-hidden bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 55%, color-mix(in srgb, var(--violet-500) 10%, transparent), transparent 72%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <RevealText text={headline} as="h2" className="t-display ondark-heading max-w-[14ch]" />

        {/* ── desktop snake ─────────────────────────────────────────────── */}
        <div data-pr-desktop="" className="relative mt-14 hidden lg:block">
          {/* row 1 */}
          <div className="relative">
            <span aria-hidden="true" className="absolute left-0 right-10 top-[5px] h-px bg-[rgba(255,255,255,.10)]" />
            <span
              data-pr-line1=""
              aria-hidden="true"
              className="absolute left-0 right-10 top-[5px] h-px bg-gradient-to-r from-[var(--blue-400)] to-[var(--violet-400)]"
            />
            <div className="grid gap-6 pr-10" style={cols}>
              {row1.map((s, i) => (
                <div key={s.title} data-pr-step="" className="relative pt-7">
                  <span className="absolute left-0 top-[5px] h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 border-[var(--blue-300)] bg-[#0a0c10]" />
                  <p className="font-mono text-[length:var(--text-caption-size)] text-[var(--blue-300)]">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 max-w-[16ch] font-display text-[1.0625rem] font-bold leading-snug text-ondark">
                    {s.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {/* corner connector */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 120"
            fill="none"
            className="absolute right-0 top-[5px] h-[120px] w-[80px] -translate-y-px"
          >
            <path d="M0 1 H39 A40 40 0 0 1 79 41 V78 A40 40 0 0 1 39 118 H0" stroke="rgba(255,255,255,.10)" strokeWidth="1.5" />
            <path
              data-pr-curve=""
              d="M0 1 H39 A40 40 0 0 1 79 41 V78 A40 40 0 0 1 39 118 H0"
              stroke="var(--violet-400)"
              strokeWidth="1.5"
              pathLength={160}
              strokeDasharray="160 160"
            />
          </svg>
          {/* row 2 — reversed flow */}
          <div className="relative mt-[118px]">
            <span aria-hidden="true" className="absolute left-0 right-10 top-[5px] h-px bg-[rgba(255,255,255,.10)]" />
            <span
              data-pr-line2=""
              aria-hidden="true"
              className="absolute left-0 right-10 top-[5px] h-px bg-gradient-to-l from-[var(--violet-400)] to-[var(--blue-400)]"
            />
            <div className="grid gap-6 pr-10" style={{ direction: 'rtl', ...cols }}>
              {row2.map((s, i) => (
                <div key={s.title} data-pr-step="" className="relative pt-7" style={{ direction: 'ltr' }}>
                  <span className="absolute left-0 top-[5px] h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 border-[var(--violet-300)] bg-[#0a0c10]" />
                  <p className="font-mono text-[length:var(--text-caption-size)] text-[var(--violet-300)]">
                    {String(i + row1.length + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 max-w-[16ch] font-display text-[1.0625rem] font-bold leading-snug text-ondark">
                    {s.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── mobile vertical rail ─────────────────────────────────────── */}
        <div data-pr-mobile="" className="relative mt-10 lg:hidden">
          <span aria-hidden="true" className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-[rgba(255,255,255,.10)]" />
          <span
            data-pr-mline=""
            aria-hidden="true"
            className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-[var(--blue-400)] to-[var(--violet-400)]"
          />
          <div className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <div key={s.title} data-pr-mstep="" className="relative pl-8">
                <span className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-2 border-[var(--blue-300)] bg-[#0a0c10]" />
                <p className="font-mono text-[length:var(--text-caption-size)] text-[var(--blue-300)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-0.5 font-display text-[1.0625rem] font-bold leading-snug text-ondark">{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
