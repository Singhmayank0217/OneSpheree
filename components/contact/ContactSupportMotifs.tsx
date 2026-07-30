import type { SupportCategory } from '@/types/contact';

/**
 * One bespoke motif per support queue — the illustration on each card in
 * Section 4. Seven drawings, seven different gestures: a route climbs, columns
 * rise, a lens sweeps and marks, a shield seals, a team assembles, a catalogue
 * stacks, and three enquiries land in a tray.
 *
 * These animate on CSS transitions keyed off `data-active` on the card, not
 * GSAP: seven simultaneous timelines on one screen would be seven contexts and
 * seven tickers for what is a stroke-dashoffset and a couple of transforms. The
 * card owns the trigger (see ContactSupport); the motif only owns its drawing.
 *
 * Every element inherits `currentColor`, which each card sets to its division's
 * accent — so the same seven drawings carry six different identities plus the
 * house orange, with no per-motif colour logic.
 */

/** Shared transition shorthands — the timing language all seven motifs share. */
const DRAW = 'transition-[stroke-dashoffset] duration-[1100ms] ease-[var(--ease-out)] group-data-[active=true]:[stroke-dashoffset:0]';
const POP = 'origin-center scale-0 opacity-0 transition-[transform,opacity] duration-[620ms] ease-[var(--ease-out)] group-data-[active=true]:scale-100 group-data-[active=true]:opacity-100';
const RISE = 'origin-bottom scale-y-0 transition-transform duration-[700ms] ease-[var(--ease-out)] group-data-[active=true]:scale-y-100';
const FADE = 'opacity-0 transition-opacity duration-[800ms] ease-[var(--ease-out)] group-data-[active=true]:opacity-100';

/** `transform-box: fill-box` so scale/rotate pivot on the shape, not the viewBox. */
const FILL_BOX = { transformBox: 'fill-box' as const, transformOrigin: 'center' };

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 104 76" fill="none" aria-hidden="true" className="h-[76px] w-[104px] text-current">
      {children}
    </svg>
  );
}

/** Sales & Consulting — a route that climbs through three decision points. */
function ConsultingMotif() {
  return (
    <Frame>
      <line x1="10" y1="66" x2="96" y2="66" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
      <path
        d="M12 58 C 30 58, 34 36, 50 34 C 66 32, 72 18, 92 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
        className={DRAW}
      />
      {[
        { cx: 12, cy: 58, d: 0 },
        { cx: 50, cy: 34, d: 260 },
        { cx: 92, cy: 12, d: 520 },
      ].map((node) => (
        <circle
          key={node.cx}
          cx={node.cx}
          cy={node.cy}
          r="4.5"
          fill="currentColor"
          className={POP}
          style={{ ...FILL_BOX, transitionDelay: `${node.d}ms` }}
        />
      ))}
    </Frame>
  );
}

/** Digital Marketing — spend turning into columns of measured return. */
function MarketingMotif() {
  return (
    <Frame>
      <line x1="10" y1="66" x2="96" y2="66" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
      {[
        { x: 16, h: 22 },
        { x: 36, h: 36 },
        { x: 56, h: 50 },
        { x: 76, h: 62 },
      ].map((bar, i) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={64 - bar.h}
          width="12"
          height={bar.h}
          rx="3"
          fill="currentColor"
          fillOpacity={i === 3 ? '1' : '.42'}
          className={RISE}
          style={{ transformBox: 'fill-box', transformOrigin: 'center bottom', transitionDelay: `${i * 130}ms` }}
        />
      ))}
      <circle
        cx="82"
        cy="12"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        className={POP}
        style={{ ...FILL_BOX, transitionDelay: '620ms' }}
      />
    </Frame>
  );
}

/** Due Diligence — a lens crossing the record, and the finding marked. */
function DiligenceMotif() {
  return (
    <Frame>
      <rect x="14" y="10" width="52" height="58" rx="6" stroke="currentColor" strokeOpacity=".32" strokeWidth="1.5" />
      {[24, 34, 44, 54].map((y, i) => (
        <rect
          key={y}
          x="24"
          y={y}
          width={i % 2 === 0 ? 32 : 22}
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity=".38"
          className={FADE}
          style={{ transitionDelay: `${i * 110}ms` }}
        />
      ))}
      <g
        className="translate-x-[-14px] opacity-0 transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)] group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100"
        style={{ transitionDelay: '380ms' }}
      >
        <circle cx="72" cy="40" r="15" stroke="currentColor" strokeWidth="2" />
        <line x1="83" y1="51" x2="94" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M66 40 l4.5 4.5 L79 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="100"
          className={DRAW}
          style={{ transitionDelay: '900ms' }}
        />
      </g>
    </Frame>
  );
}

/** Fire & Safety — the shield closing around the hazard. */
function SafetyMotif() {
  return (
    <Frame>
      {[30, 42].map((r, i) => (
        <circle
          key={r}
          cx="52"
          cy="40"
          r={r}
          stroke="currentColor"
          strokeOpacity={i === 0 ? '.18' : '.1'}
          strokeWidth="1"
          className={POP}
          style={{ ...FILL_BOX, transitionDelay: `${400 + i * 180}ms` }}
        />
      ))}
      <path
        d="M52 10 l22 9 v14 c0 14-9.5 22-22 25 -12.5-3-22-11-22-25 V19 z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
        className={DRAW}
      />
      <path
        d="M52 26 c 4 4.5 6 8 6 12 a6 6 0 01-12 0 c0-2.5 1.5-4.5 3-6 .5 2.5 3 3 3 3 -1-3.5 0-6 0-9z"
        fill="currentColor"
        className={POP}
        style={{ ...FILL_BOX, transitionDelay: '700ms' }}
      />
    </Frame>
  );
}

/** Manpower Solutions — a team assembling onto one line. */
function ManpowerMotif() {
  return (
    <Frame>
      <line
        x1="16"
        y1="58"
        x2="88"
        y2="58"
        stroke="currentColor"
        strokeWidth="1.5"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
        className={DRAW}
      />
      {[22, 52, 82].map((cx, i) => (
        <g key={cx} className={POP} style={{ ...FILL_BOX, transitionDelay: `${240 + i * 170}ms` }}>
          <circle cx={cx} cy={i === 1 ? 20 : 26} r={i === 1 ? 9 : 7} stroke="currentColor" strokeWidth="2" />
          <path
            d={`M${cx - (i === 1 ? 13 : 11)} 52 a${i === 1 ? 13 : 11} ${i === 1 ? 13 : 11} 0 0 1 ${
              (i === 1 ? 13 : 11) * 2
            } 0`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </Frame>
  );
}

/** Reselling & E-Commerce — a catalogue stacking, priced and listed. */
function CommerceMotif() {
  return (
    <Frame>
      {[
        { x: 14, y: 40, d: 0 },
        { x: 42, y: 28, d: 150 },
        { x: 70, y: 16, d: 300 },
      ].map((box) => (
        <g key={box.x} className={POP} style={{ ...FILL_BOX, transitionDelay: `${box.d}ms` }}>
          <rect x={box.x} y={box.y} width="22" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
          <line
            x1={box.x + 5}
            y1={box.y + 7}
            x2={box.x + 17}
            y2={box.y + 7}
            stroke="currentColor"
            strokeOpacity=".5"
            strokeWidth="1.5"
          />
        </g>
      ))}
      <line x1="10" y1="70" x2="96" y2="70" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
      <circle
        cx="92"
        cy="52"
        r="6"
        fill="currentColor"
        className={POP}
        style={{ ...FILL_BOX, transitionDelay: '480ms' }}
      />
    </Frame>
  );
}

/** General Enquiries — three enquiries landing in one tray. */
function GeneralMotif() {
  return (
    <Frame>
      {['M20 8 C 28 26, 40 34, 50 44', 'M52 6 L52 42', 'M84 8 C 76 26, 64 34, 54 44'].map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeOpacity=".45"
          strokeWidth="1.75"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="100"
          className={DRAW}
          style={{ transitionDelay: `${i * 160}ms` }}
        />
      ))}
      <path
        d="M18 46 h20 l5 8 h18 l5-8 h20 v16 a4 4 0 01-4 4 H22 a4 4 0 01-4-4 z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
        className={DRAW}
        style={{ transitionDelay: '420ms' }}
      />
    </Frame>
  );
}

const MOTIFS: Record<SupportCategory['motif'], () => React.ReactElement> = {
  consulting: ConsultingMotif,
  marketing: MarketingMotif,
  diligence: DiligenceMotif,
  safety: SafetyMotif,
  manpower: ManpowerMotif,
  commerce: CommerceMotif,
  general: GeneralMotif,
};

export function SupportMotif({ motif }: { motif: SupportCategory['motif'] }) {
  const Drawing = MOTIFS[motif];
  return <Drawing />;
}
