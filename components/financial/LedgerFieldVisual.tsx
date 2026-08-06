'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Financial & Compliance hero artwork — a working ledger, not an abstraction.
 *
 * The composition is deliberately structured (terminal register, Apple
 * restraint): a balance sheet whose figures recalculate under a stepping audit
 * cursor, a scan pass across the sheet, statutory documents that arrive on an
 * audit-trail spine and earn a verification seal, compliance connections that
 * pulse from the sheet to each document, and a data strip that keeps moving
 * underneath. No cubes, particles or free-floating shapes: every element is a
 * financial object, aligned to a grid.
 *
 * The initial figures are hard-coded so server and client render identically;
 * GSAP only re-rolls them after mount. Decorative — hidden from assistive tech.
 */

const ROWS = [
  { label: 'Revenue', w: 96, dr: '48,20,000', cr: '—' },
  { label: 'Purchases', w: 120, dr: '21,64,500', cr: '—' },
  { label: 'Payroll', w: 86, dr: '9,42,800', cr: '—' },
  { label: 'GST Input Credit', w: 132, dr: '—', cr: '3,18,640' },
  { label: 'Depreciation', w: 108, dr: '1,96,200', cr: '—' },
  { label: 'Reserves', w: 78, dr: '—', cr: '12,84,060' },
];

const DOCS = [
  { code: 'GSTR-3B', meta: 'FILED' },
  { code: 'TDS 26Q', meta: 'FILED' },
  { code: 'ROC MGT-7', meta: 'FILED' },
];

const ROW_Y = (i: number) => 208 + i * 40;
const DOC_Y = (i: number) => 124 + i * 130;
/** initial heights of the data strip, in px above its baseline */
const BARS = [22, 34, 18, 41, 29, 47, 33, 52, 26, 44, 38, 56, 31, 49];

const fmt = (n: number) => n.toLocaleString('en-IN');

export function LedgerFieldVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* ── entrance — the sheet builds, then the filings arrive ── */
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('[data-fc-sheet]', { opacity: 0, y: 26, scale: 0.97, duration: 0.9, transformOrigin: '50% 50%' })
        .from('[data-fc-row]', { opacity: 0, x: -14, duration: 0.5, stagger: 0.07 }, '-=0.5')
        .from('[data-fc-total]', { opacity: 0, duration: 0.5 }, '-=0.15')
        .from('[data-fc-doc]', { opacity: 0, x: 34, duration: 0.6, stagger: 0.14 }, '-=0.5')
        .from('[data-fc-node]', { scale: 0, duration: 0.4, stagger: 0.14, transformOrigin: '50% 50%' }, '-=0.7')
        .from('[data-fc-seal]', { scale: 0, opacity: 0, duration: 0.45, stagger: 0.14, transformOrigin: '50% 50%' }, '-=0.4')
        .from('[data-fc-bar]', { scaleY: 0, duration: 0.5, stagger: 0.03, transformOrigin: '50% 100%' }, '-=0.6');

      /* ── audit cursor — steps row to row, recalculating what it lands on ── */
      const cursor = gsap.timeline({ repeat: -1, repeatDelay: 0.5, delay: 1.6 });
      ROWS.forEach((_row, i) => {
        cursor
          .to('[data-fc-cursor]', { y: i * 40, duration: 0.42, ease: 'power2.inOut' }, i === 0 ? 0 : '+=0.55')
          .add(() => {
            // the figures on this row settle to a new value as it is checked.
            // Elements are read off `el` rather than by scoped selector text:
            // this callback fires long after the context closed, so the
            // selector would otherwise resolve document-wide.
            const cells = Array.from(el.querySelectorAll<SVGTextElement>(`[data-fc-cell="${i}"]`));
            cells.forEach((cell) => {
              if (cell.dataset.fcEmpty === 'true') return;
              const target = Math.round(gsap.utils.random(80000, 5200000));
              const state = { n: Number((cell.textContent ?? '0').replace(/\D/g, '')) || target };
              gsap.to(state, {
                n: target,
                duration: 0.55,
                ease: 'power2.out',
                onUpdate: () => {
                  cell.textContent = fmt(Math.round(state.n));
                },
              });
            });
            const tick = el.querySelectorAll(`[data-fc-tick="${i}"]`);
            if (tick.length) {
              gsap.fromTo(
                tick,
                { opacity: 0, scale: 0.4 },
                { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: '50% 50%' }
              );
            }
          }, '<');
      });

      /* ── scan pass over the sheet ── */
      gsap.to('[data-fc-scan]', { y: 396, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      /* ── compliance connections — a pulse travels sheet → document ── */
      gsap.fromTo(
        '[data-fc-pulse]',
        { strokeDashoffset: 260 },
        { strokeDashoffset: 0, duration: 1.9, ease: 'none', repeat: -1, stagger: 0.6, delay: 1.4 }
      );

      /* ── verification seals breathe, one after the other ── */
      gsap.to('[data-fc-seal]', {
        scale: 1.07,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
        delay: 2.4, // after the intro has popped each seal in
        transformOrigin: '50% 50%',
      });

      /* ── data strip — the market underneath, always moving ── */
      const bars = gsap.utils.toArray<SVGRectElement>('[data-fc-bar]');
      gsap.to(bars, {
        scaleY: () => gsap.utils.random(0.35, 1.3),
        duration: 1.6,
        ease: 'power2.inOut',
        stagger: 0.09,
        transformOrigin: '50% 100%',
        repeat: -1,
        repeatRefresh: true,
        delay: 2.7, // the strip settles into its drift once the intro has drawn it
      });

      /* ── ambient: a slow float, plus capped scroll parallax ── */
      gsap.to(el, { y: -10, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(el, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="fc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".5" />
            <stop offset="55%" stopColor="var(--violet-500)" stopOpacity=".18" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fc-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-300)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--blue-300)" stopOpacity=".4" />
            <stop offset="100%" stopColor="var(--blue-300)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fc-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--violet-500)" stopOpacity=".25" />
            <stop offset="100%" stopColor="var(--blue-300)" stopOpacity=".85" />
          </linearGradient>
          <clipPath id="fc-sheet-clip">
            <rect x="28" y="96" width="352" height="412" rx="16" />
          </clipPath>
        </defs>

        {/* emerald field behind the ledger */}
        <circle cx="300" cy="300" r="300" fill="url(#fc-glow)" opacity=".55" />

        {/* the terminal grid everything aligns to */}
        <g stroke="rgba(255,255,255,.05)" strokeWidth="1">
          {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((v) => (
            <line key={`v${v}`} x1={v} y1="40" x2={v} y2="580" />
          ))}
          {[100, 180, 260, 340, 420, 500].map((v) => (
            <line key={`h${v}`} x1="20" y1={v} x2="600" y2={v} />
          ))}
        </g>

        {/* ── compliance connections: sheet → audit spine → filing ── */}
        <g fill="none">
          {DOCS.map((doc, i) => {
            const d = `M380 ${ROW_Y(i * 2) - 4} C 400 ${ROW_Y(i * 2) - 4}, 400 ${DOC_Y(i) + 50}, 418 ${DOC_Y(i) + 50}`;
            return (
              <g key={doc.code}>
                <path d={d} stroke="rgba(255,255,255,.14)" strokeWidth="1" />
                <path
                  data-fc-pulse=""
                  d={d}
                  stroke="var(--blue-300)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="10 250"
                />
              </g>
            );
          })}
        </g>

        {/* ── the balance sheet ── */}
        <g data-fc-sheet="">
          <rect
            x="28"
            y="96"
            width="352"
            height="412"
            rx="16"
            fill="rgba(255,255,255,.045)"
            stroke="rgba(255,255,255,.16)"
          />

          {/* header */}
          <text
            x="52"
            y="134"
            fill="rgba(255,255,255,.82)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.14em' }}
          >
            BALANCE SHEET
          </text>
          <text
            x="356"
            y="134"
            textAnchor="end"
            fill="var(--blue-300)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em' }}
          >
            FY 2025–26
          </text>
          <line x1="28" y1="152" x2="380" y2="152" stroke="rgba(255,255,255,.16)" />

          {/* column heads */}
          <g
            fill="rgba(255,255,255,.42)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.18em' }}
          >
            <text x="52" y="180">
              PARTICULARS
            </text>
            <text x="272" y="180" textAnchor="end">
              DEBIT
            </text>
            <text x="356" y="180" textAnchor="end">
              CREDIT
            </text>
          </g>

          {/* audit cursor — the row currently under review */}
          <rect
            data-fc-cursor=""
            x="40"
            y={ROW_Y(0) - 21}
            width="328"
            height="32"
            rx="8"
            fill="color-mix(in srgb, var(--violet-400) 16%, transparent)"
            stroke="color-mix(in srgb, var(--blue-300) 45%, transparent)"
          />

          {/* ledger rows */}
          {ROWS.map((row, i) => (
            <g key={row.label} data-fc-row="">
              <rect x="52" y={ROW_Y(i) - 8} width={row.w} height="7" rx="3.5" fill="rgba(255,255,255,.2)" />
              <text
                data-fc-cell={i}
                data-fc-empty={row.dr === '—'}
                x="272"
                y={ROW_Y(i)}
                textAnchor="end"
                fill={row.dr === '—' ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.72)'}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
              >
                {row.dr}
              </text>
              <text
                data-fc-cell={i}
                data-fc-empty={row.cr === '—'}
                x="356"
                y={ROW_Y(i)}
                textAnchor="end"
                fill={row.cr === '—' ? 'rgba(255,255,255,.25)' : 'var(--blue-300)'}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
              >
                {row.cr}
              </text>
              {/* the checked marker this row earns as the cursor lands */}
              <g data-fc-tick={i} transform={`translate(44 ${ROW_Y(i) - 4})`} opacity="0">
                <path
                  d="M-3 0l2.4 2.6L4 -3"
                  stroke="var(--blue-300)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </g>
          ))}

          {/* totals */}
          <g data-fc-total="">
            <line x1="52" y1="440" x2="356" y2="440" stroke="rgba(255,255,255,.16)" />
            <text
              x="52"
              y="470"
              fill="rgba(255,255,255,.6)"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em' }}
            >
              TOTAL
            </text>
            <text
              x="272"
              y="470"
              textAnchor="end"
              fill="rgba(255,255,255,.9)"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}
            >
              81,23,500
            </text>
            <text
              x="356"
              y="470"
              textAnchor="end"
              fill="var(--blue-300)"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}
            >
              81,23,500
            </text>
            {/* balanced badge */}
            <g transform="translate(52 484)">
              <rect
                width="96"
                height="22"
                rx="11"
                fill="color-mix(in srgb, var(--violet-500) 34%, transparent)"
                stroke="color-mix(in srgb, var(--blue-300) 40%, transparent)"
              />
              <path
                d="M13 11.4l3 3 6-6.6"
                stroke="var(--blue-300)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text
                x="30"
                y="15"
                fill="rgba(255,255,255,.85)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em' }}
              >
                BALANCED
              </text>
            </g>
          </g>

          {/* scan pass */}
          <g clipPath="url(#fc-sheet-clip)">
            <rect data-fc-scan="" x="28" y="84" width="352" height="56" fill="url(#fc-scan)" />
          </g>
        </g>

        {/* ── audit trail spine ── */}
        <line x1="418" y1="120" x2="418" y2="508" stroke="rgba(255,255,255,.16)" strokeDasharray="2 7" />

        {/* ── statutory filings, verified ── */}
        {DOCS.map((doc, i) => (
          <g key={doc.code}>
            <circle data-fc-node="" cx="418" cy={DOC_Y(i) + 50} r="5" fill="var(--blue-300)" />
            <g data-fc-doc="">
              <rect
                x="438"
                y={DOC_Y(i)}
                width="160"
                height="100"
                rx="12"
                fill="rgba(255,255,255,.045)"
                stroke="rgba(255,255,255,.16)"
              />
              <text
                x="456"
                y={DOC_Y(i) + 30}
                fill="rgba(255,255,255,.8)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em' }}
              >
                {doc.code}
              </text>
              <rect x="456" y={DOC_Y(i) + 46} width="104" height="6" rx="3" fill="rgba(255,255,255,.16)" />
              <rect x="456" y={DOC_Y(i) + 60} width="72" height="6" rx="3" fill="rgba(255,255,255,.12)" />
              <text
                x="456"
                y={DOC_Y(i) + 86}
                fill="var(--blue-300)"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '.2em' }}
              >
                {doc.meta}
              </text>
              <g data-fc-seal="" transform={`translate(570 ${DOC_Y(i) + 26})`}>
                <circle
                  r="13"
                  fill="color-mix(in srgb, var(--violet-500) 40%, transparent)"
                  stroke="var(--blue-300)"
                  strokeWidth="1.2"
                />
                <circle r="18" stroke="rgba(255,255,255,.2)" strokeDasharray="2 4" fill="none" />
                <path
                  d="M-5 0l3.4 3.6L6 -4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </g>
          </g>
        ))}

        {/* ── data strip ── */}
        <g>
          <line x1="438" y1="568" x2="600" y2="568" stroke="rgba(255,255,255,.14)" />
          {BARS.map((h, i) => (
            <rect
              key={i}
              data-fc-bar=""
              x={438 + i * 12}
              y={568 - h}
              width="7"
              height={h}
              rx="2"
              fill="url(#fc-bar)"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
