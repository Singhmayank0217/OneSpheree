/**
 * Central motion constants — the single place where timings, eases and
 * staggers live (per the motion specification). GSAP durations are seconds.
 */

export const EASE = {
  /** primary CSS curve — for transitions declared in stylesheets */
  css: 'cubic-bezier(.22,.61,.36,1)',
  /** counters, damped follows */
  out: 'power2.out',
  /** section / text reveals */
  reveal: 'power3.out',
  inOut: 'power2.inOut',
} as const;

export const DURATION = {
  hover: 0.18,
  card: 0.22,
  nav: 0.25,
  section: 0.8,
  pageIntro: 1.2,
  hero: 1.6,
  counter: 2,
} as const;

export const STAGGER = {
  nav: 0.04,
  text: 0.06,
  cards: 0.08,
  images: 0.1,
  stats: 0.12,
} as const;

/** Section-reveal preset: fade + translateY + blur reduction. */
export const REVEAL_FROM = { opacity: 0, y: 24, filter: 'blur(6px)' } as const;
export const REVEAL_TO = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: DURATION.section,
  ease: EASE.reveal,
} as const;

/** Parallax hard cap in px (spec: 20–40px, never more). */
export const PARALLAX_MAX = 40;

/**
 * Work-gallery motion language (HBA-inspired). Scrubbed clip-path mask reveal
 * with a subtle scale-down + fade, an independent parallax drift, and hover
 * timings. Reveal is tied to scroll: it begins at ~80% viewport and completes
 * near centre. Only transform / opacity / clip-path are animated.
 */
export const GALLERY = {
  reveal: {
    /** hidden: curtain closed from the top, image slightly enlarged + risen */
    from: { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 8, scale: 1.08, opacity: 0 },
    /** exposed: full frame, settled to 1.0 */
    to: { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, scale: 1, opacity: 1 },
    start: 'top 80%',
    end: 'top 48%',
    /** smoothing on the scrub so it trails the scroll like the reference */
    scrub: 0.8,
  },
  /** independent parallax drift as ±% of the (oversized) image layer height */
  parallax: { amount: 6, scrub: 1 },
  /** hover — premium, no bounce (spec: 250–350ms, power3.out) */
  hover: { arrowShiftPx: 7, imageScale: 1.04 },
} as const;
