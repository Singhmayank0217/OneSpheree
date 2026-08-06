'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { DURATION, EASE, STAGGER } from '@/lib/animations';
import type { FinanceOperationsSection, FinanceMetric } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/** A single dashboard tile: the figure counts up, then its meter fills. */
function MetricTile({ metric }: { metric: FinanceMetric }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const out = el.querySelector<HTMLElement>('[data-fc-figure]');
    const meter = el.querySelector<HTMLElement>('[data-fc-meter]');
    if (!out || !meter) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      out.textContent = String(metric.value.number);
      meter.style.transform = `scaleX(${metric.fill})`;
      return;
    }

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      tl.to(state, {
        n: metric.value.number,
        duration: DURATION.counter,
        ease: EASE.out,
        onUpdate: () => {
          out.textContent = String(Math.round(state.n));
        },
      }).fromTo(
        meter,
        { scaleX: 0 },
        { scaleX: metric.fill, duration: 1.1, ease: EASE.reveal, transformOrigin: '0% 50%' },
        0.15
      );
    }, el);

    return () => ctx.revert();
  }, [metric]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4 transition-[border-color,background-color] duration-[var(--duration-slow)] hover:border-[color-mix(in_srgb,var(--blue-300)_45%,transparent)] hover:bg-[rgba(255,255,255,.05)]"
    >
      <p className="font-mono text-[10.5px] uppercase tracking-[.18em] text-ondark-muted">{metric.label}</p>
      <p className="mt-3 flex items-baseline font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-none tracking-[-.02em] text-ondark">
        {metric.value.prefix && <span className="text-[var(--blue-300)]">{metric.value.prefix}</span>}
        <span data-fc-figure="">0</span>
        {metric.value.suffix && <span className="text-[var(--blue-300)]">{metric.value.suffix}</span>}
      </p>
      <span aria-hidden="true" className="mt-4 block h-[3px] w-full rounded-full bg-[rgba(255,255,255,.08)]">
        <span
          data-fc-meter=""
          className="block h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,color-mix(in_srgb,var(--violet-500)_80%,transparent),var(--blue-300))]"
          style={{ transform: 'scaleX(0)' }}
        />
      </span>
      <p className="mt-3 text-[length:var(--text-caption-size)] leading-[1.55] text-ondark-muted">{metric.caption}</p>
    </div>
  );
}

/**
 * Accounting & Business Operations — the finance function shown as the console
 * it actually is.
 *
 * A glass dashboard carries the operating metrics (counting up) and the close
 * series (bars drawing in from the baseline); the two service groups sit beside
 * it as the work that produces those numbers. This is the only chapter on the
 * page built around a data panel, which is what keeps it distinct from the
 * card grids either side of it.
 */
export function FinanceOperations({ content }: { content: FinanceOperationsSection }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fc-col]',
        { scaleY: 0, opacity: 0.2 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.85,
          ease: EASE.reveal,
          stagger: 0.05,
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = groupsRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fc-group]').forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll('[data-fc-line]'),
          { opacity: 0, x: 14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: EASE.reveal,
            stagger: STAGGER.cards,
            scrollTrigger: { trigger: group, start: 'top 84%', once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accounting-operations"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] overflow-x-clip border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(56% 44% at 18% 92%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%), radial-gradient(40% 34% at 82% 6%, color-mix(in srgb, var(--violet-400) 14%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ── the console ── */}
          <div className="rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] lg:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-line-dark pb-4">
              <p className="font-mono text-[11px] uppercase tracking-[.2em] text-[var(--blue-300)]">
                Finance Operations
              </p>
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[.16em] text-ondark-muted">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full bg-[var(--blue-300)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--violet-400)_25%,transparent)]"
                />
                Live cycle
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.metrics.map((metric) => (
                <MetricTile key={metric.label} metric={metric} />
              ))}
            </div>

            {/* the close series */}
            <div ref={chartRef} className="mt-5 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[.18em] text-ondark-muted">
                {content.seriesLabel}
              </p>
              <div className="mt-4 flex h-[104px] items-end gap-[6px]" aria-hidden="true">
                {content.series.map((v, i) => (
                  <span
                    key={i}
                    data-fc-col=""
                    className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,var(--blue-300),color-mix(in_srgb,var(--violet-500)_55%,transparent))]"
                    style={{ height: `${Math.round(v * 100)}%` }}
                  />
                ))}
              </div>
              <span aria-hidden="true" className="mt-2 block h-px w-full bg-line-dark" />
            </div>
          </div>

          {/* ── the work behind it ── */}
          <div ref={groupsRef} className="grid gap-4">
            {content.groups.map((group) => (
              <div
                key={group.title}
                data-fc-group=""
                className="group relative overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 backdrop-blur-[2px] transition-[border-color,background-color] duration-[var(--duration-slow)] hover:border-[color-mix(in_srgb,var(--blue-300)_45%,transparent)] hover:bg-[rgba(255,255,255,.05)] lg:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 100% at 50% -20%, color-mix(in srgb, var(--violet-400) 24%, transparent), transparent 72%)',
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)]">
                    <ServiceIcon name={group.icon} size={19} />
                  </span>
                  <h3 className="t-h3 ondark-heading font-display">{group.title}</h3>
                </div>
                <p className="relative mt-3 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                  {group.blurb}
                </p>
                <ul className="relative mt-4 flex flex-col divide-y divide-[var(--border-dark)] border-t border-line-dark">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-fc-line=""
                      className="flex items-center gap-3 py-2.5 text-[length:var(--text-body-sm-size)] text-ondark-muted transition-colors duration-[var(--duration-base)] hover:text-ondark"
                    >
                      <span
                        aria-hidden="true"
                        className="h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--blue-300)] opacity-70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
