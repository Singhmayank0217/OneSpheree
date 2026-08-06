'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FinanceSectionHead } from './FinanceSectionHead';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceCorporateSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

type Box = { x: number; y: number; w: number; h: number };

/**
 * Draw a connection between two boxes, leaving from whichever edges face each
 * other — so the same function serves the desktop layout (hub between two
 * clusters, lines run horizontally) and the stacked one (lines run vertically).
 */
function connect(from: Box, to: Box): string {
  const fc = { x: from.x + from.w / 2, y: from.y + from.h / 2 };
  const tc = { x: to.x + to.w / 2, y: to.y + to.h / 2 };
  const horizontal = Math.abs(tc.x - fc.x) >= Math.abs(tc.y - fc.y);

  if (horizontal) {
    const right = tc.x > fc.x;
    const a = { x: right ? from.x + from.w : from.x, y: fc.y };
    const b = { x: right ? to.x : to.x + to.w, y: tc.y };
    const bend = Math.max(28, Math.abs(b.x - a.x) * 0.45);
    return `M${a.x} ${a.y} C ${a.x + (right ? bend : -bend)} ${a.y}, ${b.x - (right ? bend : -bend)} ${b.y}, ${b.x} ${b.y}`;
  }

  const down = tc.y > fc.y;
  const a = { x: fc.x, y: down ? from.y + from.h : from.y };
  const b = { x: tc.x, y: down ? to.y : to.y + to.h };
  const bend = Math.max(24, Math.abs(b.y - a.y) * 0.5);
  return `M${a.x} ${a.y} C ${a.x} ${a.y + (down ? bend : -bend)}, ${b.x} ${b.y - (down ? bend : -bend)}, ${b.x} ${b.y}`;
}

/**
 * Corporate Compliance — the two registers, wired to the entity between them.
 *
 * The connection lines are measured from the live layout rather than drawn at
 * fixed coordinates: the cards' positions are read after paint and re-read on
 * resize, so the same paths hold at any breakpoint (side by side on desktop,
 * stacked on a phone). They draw themselves once on arrival, then carry a slow
 * compliance pulse between the entity and each register. Purely decorative —
 * the section reads identically with the lines absent.
 */
export function FinanceCorporate({ content }: { content: FinanceCorporateSection }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const hub = hubRef.current;
    if (!wrap || !hub) return;
    const origin = wrap.getBoundingClientRect();
    const box = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
    };
    const hubBox = box(hub);
    const next = cardsRef.current.filter(Boolean).map((card) => connect(hubBox, box(card as Element)));
    setSize({ w: origin.width, h: origin.height });
    setPaths(next);
  }, []);

  useEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [measure]);

  /* draw the lines on arrival, then keep a pulse running along them */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !paths.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGPathElement>('[data-fc-wire]');
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: EASE.reveal,
          scrollTrigger: { trigger: wrap, start: 'top 78%', once: true },
        });
      });

      const pulses = gsap.utils.toArray<SVGPathElement>('[data-fc-flow]');
      pulses.forEach((pulse, i) => {
        const len = pulse.getTotalLength();
        gsap.set(pulse, { strokeDasharray: `12 ${len}` });
        gsap.fromTo(
          pulse,
          { strokeDashoffset: len + 12 },
          { strokeDashoffset: 0, duration: 2.4, ease: 'none', repeat: -1, delay: 1.2 + i * 0.8 }
        );
      });
    }, wrap);

    return () => ctx.revert();
  }, [paths]);

  /* the register rows arrive in a stagger */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fc-register]').forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('[data-fc-chip]'),
          { opacity: 0, y: 14, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            ease: EASE.reveal,
            stagger: STAGGER.cards,
            scrollTrigger: { trigger: card, start: 'top 84%', once: true },
          }
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="corporate-compliance"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(48% 40% at 50% 6%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section">
        <FinanceSectionHead header={content} />

        <div ref={wrapRef} className="relative mt-14">
          {/* measured compliance wiring */}
          {size.w > 0 && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              fill="none"
            >
              {paths.map((d, i) => (
                <g key={i}>
                  <path data-fc-wire="" d={d} stroke="rgba(255,255,255,.18)" strokeWidth="1.25" />
                  <path
                    data-fc-flow=""
                    d={d}
                    stroke="var(--blue-300)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity=".9"
                  />
                </g>
              ))}
            </svg>
          )}

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            {content.clusters.map((cluster, i) => (
              <div
                key={cluster.title}
                ref={(node) => {
                  cardsRef.current[i] = node;
                }}
                data-fc-register=""
                className={`group relative overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.04)] p-5 backdrop-blur-[2px] transition-[border-color,background-color,box-shadow] duration-[var(--duration-slow)] hover:border-[color-mix(in_srgb,var(--blue-300)_45%,transparent)] hover:bg-[rgba(255,255,255,.055)] hover:shadow-[0_26px_64px_-34px_rgba(20,184,166,.6)] lg:p-6 ${
                  i === 0 ? 'order-1' : 'order-3'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-45 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 100% at 50% 130%, color-mix(in srgb, var(--violet-500) 38%, transparent), transparent 72%)',
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--blue-300)_28%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_30%,transparent)] text-[var(--blue-300)]">
                    <ServiceIcon name={cluster.icon} size={19} />
                  </span>
                  <h3 className="t-h3 ondark-heading font-display">{cluster.title}</h3>
                </div>
                <p className="relative mt-3 text-[length:var(--text-body-sm-size)] leading-[1.7] text-ondark-muted">
                  {cluster.blurb}
                </p>
                <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
                  {cluster.items.map((item) => (
                    <li
                      key={item}
                      data-fc-chip=""
                      className="flex items-center gap-2 rounded-md border border-line-dark bg-[rgba(255,255,255,.03)] px-3 py-2.5 text-[length:var(--text-body-sm-size)] text-ondark-muted transition-[transform,border-color,background-color,color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--blue-300)_50%,transparent)] hover:bg-[rgba(20,184,166,.12)] hover:text-white"
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

            {/* the entity every filing points back to */}
            <div
              ref={hubRef}
              className="relative order-2 mx-auto flex w-[172px] flex-col items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--blue-300)_40%,transparent)] bg-[color-mix(in_srgb,var(--violet-500)_28%,transparent)] px-4 py-5 text-center backdrop-blur-[2px]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background:
                    'radial-gradient(90% 90% at 50% 50%, color-mix(in srgb, var(--violet-400) 30%, transparent), transparent 72%)',
                }}
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--blue-300)_55%,transparent)] bg-dark text-[var(--blue-300)]">
                <ServiceIcon name="building" size={20} />
              </span>
              <p className="relative font-mono text-[10.5px] uppercase tracking-[.2em] text-[var(--blue-300)]">
                {content.hub.label}
              </p>
              <p className="relative text-[length:var(--text-caption-size)] leading-[1.5] text-ondark-muted">
                {content.hub.caption}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
