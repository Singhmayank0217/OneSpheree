'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Parallax } from '@/components/animations/Parallax';
import { DURATION, EASE, STAGGER } from '@/lib/animations';
import type { FinanceProofContent, FinanceStat } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * The statistic itself.
 *
 * Two behaviours, one register: a figure counts up from zero on arrival, while
 * a wordmark rises character by character out of a mask. Both run once, on
 * scroll entry, and both render their final state immediately under reduced
 * motion — the number never sits at 0 for a reader who has asked for stillness.
 */
function StatValue({ value }: { value: FinanceStat['value'] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if ('number' in value) {
        const out = el.querySelector<HTMLElement>('[data-fc-num]');
        if (!out) return;
        if (reduced) {
          out.textContent = String(value.number);
          return;
        }
        const state = { n: 0 };
        gsap.to(state, {
          n: value.number,
          duration: DURATION.counter,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            out.textContent = String(Math.round(state.n));
          },
        });
      } else if (!reduced) {
        gsap.fromTo(
          el.querySelectorAll('[data-fc-char]'),
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: EASE.reveal,
            stagger: 0.035,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [value]);

  if ('number' in value) {
    return (
      <span ref={ref} className="flex items-baseline font-display text-[clamp(2.75rem,5vw,3.75rem)] font-extrabold leading-[1] tracking-[-.02em] text-ondark">
        {value.prefix && <span className="text-[var(--blue-300)]">{value.prefix}</span>}
        <span data-fc-num="">0</span>
        {value.suffix && <span className="text-[var(--blue-300)]">{value.suffix}</span>}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="flex font-display text-[clamp(2rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-.02em] text-ondark"
    >
      <span className="sr-only">{value.word}</span>
      {value.word.split('').map((char, i) => (
        <span key={`${char}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[.1em] -mb-[.1em]">
          <span data-fc-char="" className="inline-block will-change-transform">
            {char === '-' ? '‑' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Why Businesses Choose OneSphereee — the closing proof of Milestone 1.
 *
 * Four statistics on glass, each with its own measure rule that draws as the
 * card arrives. Cards stagger in; the section's ambient emerald plate drifts on
 * a capped parallax so the chapter has depth without motion for its own sake.
 */
export function FinanceProof({ content }: { content: FinanceProofContent }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
      tl.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 28, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: DURATION.section, ease: EASE.reveal, stagger: STAGGER.stats }
      ).fromTo(
        el.querySelectorAll('[data-fc-measure]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: EASE.reveal, stagger: STAGGER.stats, transformOrigin: '0% 50%' },
        '-=0.75'
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-onespheree"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-hidden border-t border-line-dark bg-dark text-ondark"
    >
      <Parallax speed={-0.6} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(46% 46% at 50% 0%, color-mix(in srgb, var(--violet-400) 20%, transparent), transparent 70%), radial-gradient(60% 50% at 50% 110%, color-mix(in srgb, var(--violet-500) 30%, transparent), transparent 72%)',
          }}
        />
      </Parallax>

      <Container className="relative py-section">
        <div className="max-w-[680px]">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{content.eyebrow}</p>
          </Reveal>
          <RevealText text={content.headline} as="h2" className="t-h1 ondark-heading mt-4 font-display" />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[58ch] text-ondark-muted">{content.intro}</p>
          </Reveal>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-6 backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_24px_60px_-30px_rgba(20,184,166,.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-50 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% -30%, color-mix(in srgb, var(--violet-400) 26%, transparent), transparent 72%)',
                }}
              />

              <div className="relative flex min-h-[76px] items-end">
                <StatValue value={stat.value} />
              </div>

              {/* the measure rule — draws as the card lands */}
              <span
                data-fc-measure=""
                aria-hidden="true"
                className="relative mt-5 h-px w-full bg-[linear-gradient(90deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_60%,transparent))]"
              />

              <p className="relative mt-4 font-display text-[1.0625rem] font-bold text-ondark">{stat.label}</p>
              <p className="relative mt-2 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                {stat.blurb}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
