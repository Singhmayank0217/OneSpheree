'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Financial Advisory artwork — a projection panel.
 *
 * The trend line draws itself, its area fills underneath, a read-out marker
 * walks the curve (positions taken from the path itself with getPointAtLength,
 * so the dot sits exactly on the line at every frame), the funding-mix ring
 * sweeps to its share and the capital columns rise. Everything is a chart
 * element — this page's second visual, deliberately built from a different
 * vocabulary to the hero's ledger.
 */
const CURVE = 'M40 268 C 96 250, 130 232, 176 224 S 258 214, 300 186 S 380 150, 428 104';
const COLUMNS = [
  { x: 44, h: 46 },
  { x: 92, h: 68 },
  { x: 140, h: 58 },
  { x: 188, h: 86 },
  { x: 236, h: 74 },
  { x: 284, h: 104 },
  { x: 332, h: 92 },
  { x: 380, h: 124 },
];

export function AdvisoryChartVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const line = el.querySelector<SVGPathElement>('[data-ac-line]');
      const marker = el.querySelector<SVGGElement>('[data-ac-marker]');
      const len = line ? line.getTotalLength() : 0;

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });

      tl.from('[data-ac-panel]', { opacity: 0, y: 24, duration: 0.8, ease: EASE.reveal })
        .from('[data-ac-grid] line', { scaleX: 0, opacity: 0, duration: 0.5, stagger: 0.06, transformOrigin: '0% 50%' }, '-=0.5')
        .from('[data-ac-col]', { scaleY: 0, opacity: 0.3, duration: 0.7, ease: EASE.reveal, stagger: 0.06, transformOrigin: '50% 100%' }, '-=0.3');

      if (line && len) {
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, '-=0.5');
        tl.from('[data-ac-area]', { opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.9');
      }

      tl.from('[data-ac-ring]', { opacity: 0, duration: 0.6 }, '-=0.9')
        .fromTo(
          '[data-ac-ring-value]',
          { strokeDashoffset: 471 },
          { strokeDashoffset: 160, duration: 1.3, ease: EASE.reveal },
          '-=0.6'
        )
        .from('[data-ac-tick]', { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, '-=0.9');

      /* the read-out walks the curve, then keeps drifting along it */
      if (line && marker && len) {
        const state = { p: 0 };
        const place = () => {
          const pt = line.getPointAtLength(state.p * len);
          gsap.set(marker, { x: pt.x, y: pt.y });
        };
        place();
        tl.to(
          state,
          { p: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: place },
          '-=2.2'
        ).to(state, {
          p: 0.62,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          onUpdate: place,
        });
      }

      gsap.to(el, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 480 480" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="ac-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-300)" stopOpacity=".34" />
            <stop offset="100%" stopColor="var(--blue-300)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ac-col" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--violet-500)" stopOpacity=".3" />
            <stop offset="100%" stopColor="var(--violet-400)" stopOpacity=".85" />
          </linearGradient>
          <radialGradient id="ac-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".42" />
            <stop offset="100%" stopColor="var(--violet-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="240" cy="230" r="230" fill="url(#ac-glow)" opacity=".5" />

        {/* the projection panel */}
        <g data-ac-panel="">
          <rect
            x="16"
            y="40"
            width="448"
            height="300"
            rx="18"
            fill="rgba(255,255,255,.045)"
            stroke="rgba(255,255,255,.16)"
          />
          <text
            x="40"
            y="76"
            fill="rgba(255,255,255,.8)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.14em' }}
          >
            PROJECTION
          </text>
          <text
            x="440"
            y="76"
            textAnchor="end"
            fill="var(--blue-300)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em' }}
          >
            36 MONTHS
          </text>

          {/* gridlines */}
          <g data-ac-grid="" stroke="rgba(255,255,255,.08)">
            {[112, 152, 192, 232, 272].map((y) => (
              <line key={y} x1="40" y1={y} x2="440" y2={y} />
            ))}
          </g>

          {/* capital columns */}
          <g>
            {COLUMNS.map((col) => (
              <rect
                key={col.x}
                data-ac-col=""
                x={col.x}
                y={300 - col.h}
                width="26"
                height={col.h}
                rx="4"
                fill="url(#ac-col)"
                opacity=".75"
              />
            ))}
          </g>
          <line x1="40" y1="300" x2="440" y2="300" stroke="rgba(255,255,255,.2)" />

          {/* trend line + area */}
          <path data-ac-area="" d={`${CURVE} L 428 300 L 40 300 Z`} fill="url(#ac-area)" />
          <path
            data-ac-line=""
            d={CURVE}
            stroke="var(--blue-300)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* read-out marker */}
          <g data-ac-marker="">
            <circle r="16" fill="color-mix(in srgb, var(--violet-400) 22%, transparent)" />
            <circle r="6" fill="var(--blue-300)" stroke="#04211E" strokeWidth="2" />
          </g>
        </g>

        {/* funding mix ring */}
        <g transform="translate(96 400)">
          <circle data-ac-ring="" r="46" stroke="rgba(255,255,255,.14)" strokeWidth="10" fill="none" />
          <circle
            data-ac-ring-value=""
            r="46"
            stroke="var(--blue-300)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="289 471"
            strokeDashoffset="471"
            transform="rotate(-90)"
          />
          <text
            textAnchor="middle"
            y="6"
            fill="rgba(255,255,255,.9)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 15 }}
          >
            65%
          </text>
        </g>

        {/* read-outs */}
        <g transform="translate(176 366)">
          {[
            { label: 'WORKING CAPITAL', value: '1.8×' },
            { label: 'DEBT SERVICE', value: '1.6×' },
            { label: 'CASH RUNWAY', value: '14 MO' },
          ].map((tick, i) => (
            <g key={tick.label} data-ac-tick="" transform={`translate(0 ${i * 34})`}>
              <rect
                width="288"
                height="26"
                rx="8"
                fill="rgba(255,255,255,.04)"
                stroke="rgba(255,255,255,.12)"
              />
              <text
                x="14"
                y="17"
                fill="rgba(255,255,255,.55)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.16em' }}
              >
                {tick.label}
              </text>
              <text
                x="274"
                y="17"
                textAnchor="end"
                fill="var(--blue-300)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}
              >
                {tick.value}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
