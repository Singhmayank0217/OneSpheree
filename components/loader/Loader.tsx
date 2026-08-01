'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '@/providers/SmoothScrollProvider';
import { LOADER_BACKDROP } from './backdrop';

/**
 * DIGITAL ASSEMBLY — the OneSpheree launch loader.
 *
 * The brief this answers: nothing may wait on JavaScript. The overlay ships in
 * the server HTML and its ground layer, vignette and light beams are pure CSS,
 * so the first paint of the document IS the first frame of the piece — there is
 * no blank screen and no hydration gap to stare at. GSAP arrives late and only
 * choreographs what genuinely needs a timeline.
 *
 * Sequence (seconds, timeline-relative):
 *   0.00  backdrop + vignette, already painted
 *   0.00  violet and blue beams sweep the frame (CSS keyframes, no JS)
 *   0.05  the lattice draws — thin lines stroke in, nodes snap onto them
 *   0.55  the lockup assembles from seven vertical fragments; the lattice
 *         dissolves as the real mark lands on top of it
 *   1.25  a specular sweep passes across the logo, masked to its own pixels
 *   1.50  ONE BRAND. / UNLIMITED POSSIBILITIES. rises out of its mask
 *   2.00  the veil fades over the homepage that has been sitting beneath it
 *   ~2.45 unmounted
 *
 * Everything animated is transform or opacity — no layout, no filters, no
 * particle system, ~30 elements total.
 *
 * Skipping is decided before paint, never by unmounting something already on
 * screen: `prefers-reduced-motion` is a CSS rule, and the once-per-session
 * guard is a classList flip in a parser-blocking inline script. Both hide the
 * overlay in the same frame the browser first draws it.
 */

/** Vertical slices the lockup assembles from. */
const FRAGMENTS = 7;
const STORAGE_KEY = 'os-loader-played';
const LOCKUP = '/loader/onespheree-lockup.webp';
/** Source aspect of the lockup art (mark + wordmark, tagline cropped off). */
const LOCKUP_RATIO = '640 / 460';
const EXIT_MS = 420;
/** Keys that would scroll the page natively while Lenis is stopped. */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space', ' ']);

/**
 * Runs while the HTML is still parsing, above the overlay markup: a repeat
 * visit within the session flags <html> and the stylesheet hides the veil
 * before it is ever composited. Bypassed in development so the piece replays
 * on every refresh while iterating.
 */
const SKIP_SCRIPT =
  process.env.NODE_ENV === 'production'
    ? `try{if(sessionStorage.getItem('${STORAGE_KEY}'))document.documentElement.classList.add('os-loader-skip')}catch(e){}`
    : '';

/**
 * The lattice the logo assembles onto — a flattened node network sitting where
 * the sphere lands. Coordinates are in the mark's own 100×72 viewBox, so they
 * track the lockup at every size.
 */
const NODES = [
  [51.5, 2],
  [33, 10],
  [70, 10],
  [28, 27],
  [51.5, 22],
  [75, 27],
  [36, 43],
  [67, 43],
  [51.5, 49],
] as const;
const LINKS = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 5],
  [1, 4],
  [2, 4],
  [3, 6],
  [5, 7],
  [4, 6],
  [4, 7],
  [6, 8],
  [7, 8],
] as const;

const TAGLINE = ['One Brand.', 'Unlimited Possibilities.'];

type Phase = 'play' | 'exit' | 'done';

export function Loader() {
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('play');

  // Decide before the first client paint whether this visit animates at all.
  // The overlay is already on screen at this point (server HTML + CSS), so a
  // skip here is a same-frame unmount, not a flash.
  useLayoutEffect(() => {
    let played = false;
    if (process.env.NODE_ENV === 'production') {
      try {
        played = sessionStorage.getItem(STORAGE_KEY) === '1';
      } catch {}
    }
    if (played || window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('done');
  }, []);

  // The choreography. One timeline, torn down with the context.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (phase !== 'play' || !root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setPhase('exit'),
      });

      tl.to('[data-l-link]', { strokeDashoffset: 0, duration: 0.45, stagger: 0.025, ease: 'power2.out' }, 0.04)
        .to('[data-l-node]', { opacity: 1, scale: 1, duration: 0.28, stagger: 0.028, ease: 'back.out(2.2)' }, 0.15)
        // the lockup arrives fragment by fragment: odd bands drop in, even
        // ones rise — an engineered interlock rather than an explosion
        .fromTo(
          '[data-l-frag]',
          { yPercent: (i: number) => (i % 2 ? -14 : 14), scaleY: 0.82 },
          { opacity: 1, yPercent: 0, scaleY: 1, duration: 0.5, stagger: 0.045 },
          0.45
        )
        // the scaffold retires the moment the real mark is legible
        .to('[data-l-lattice]', { opacity: 0, duration: 0.42, ease: 'power2.inOut' }, 0.8)
        // specular pass, clipped to the logo's own pixels by the mask
        .fromTo(
          '[data-l-sheen]',
          { xPercent: -66, opacity: 1 },
          { xPercent: 66, duration: 0.6, ease: 'power2.inOut' },
          1.02
        )
        .to('[data-l-rule]', { scaleX: 1, duration: 0.6, ease: 'expo.out' }, 1.15)
        .fromTo(
          '[data-l-line]',
          { yPercent: 112 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.07 },
          1.18
        )
        // a beat on the finished statement, then the veil lifts — 2.0s of
        // choreography plus a 0.42s dissolve, ~2.4s end to end
        .to({}, { duration: 0.25 }, 1.75);
    }, root);

    return () => ctx.revert();
  }, [phase]);

  // Scroll stays put while the piece plays — Lenis owns wheel and touch, the
  // key blocker covers the rest. No overflow:hidden, so no scrollbar jump and
  // no invalidated ScrollTrigger measurements.
  useEffect(() => {
    if (phase !== 'play') return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key) || SCROLL_KEYS.has(e.code)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
    };
  }, [phase, lenis]);

  // Exit: the veil dissolves over a homepage that has been rendered and
  // settled underneath the whole time — the hero is simply uncovered.
  useEffect(() => {
    if (phase !== 'exit') return;
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    const tween = gsap.to(rootRef.current, {
      opacity: 0,
      duration: EXIT_MS / 1000,
      ease: 'power2.inOut',
      onComplete: () => setPhase('done'),
    });
    return () => {
      tween.kill();
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <>
      {/* hoisted to <head> by React — the lockup is in flight before the
          fragments need it, which is the only asset the piece waits on */}
      <link rel="preload" as="image" href={LOCKUP} type="image/webp" fetchPriority="high" />
      {SKIP_SCRIPT ? <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} /> : null}
      <div
        ref={rootRef}
        className="os-loader"
        aria-hidden="true"
        style={{ background: LOADER_BACKDROP, pointerEvents: phase === 'exit' ? 'none' : 'auto' }}
      >
        {/* light beams — CSS keyframes, running from the document's first paint */}
        <span className="os-beam os-beam--violet" />
        <span className="os-beam os-beam--blue" />
        <span className="os-loader__vignette" />

        <div className="os-loader__stage">
          <div className="os-mark" style={{ aspectRatio: LOCKUP_RATIO }}>
            {/* the lattice: thin lines stroke in, nodes snap onto the joints */}
            <svg
              data-l-lattice=""
              className="os-mark__lattice"
              viewBox="0 0 100 72"
              fill="none"
              aria-hidden="true"
            >
              {LINKS.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  data-l-link=""
                  x1={NODES[a][0]}
                  y1={NODES[a][1]}
                  x2={NODES[b][0]}
                  y2={NODES[b][1]}
                  stroke="var(--blue-400, #60a5fa)"
                  strokeWidth="0.35"
                  strokeOpacity="0.55"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
              ))}
              {NODES.map(([x, y], i) => (
                <circle
                  key={i}
                  data-l-node=""
                  cx={x}
                  cy={y}
                  r={i % 4 === 0 ? 1.5 : 1}
                  fill="var(--violet-300, #c4b5fd)"
                />
              ))}
            </svg>

            {/* The lockup, sliced into vertical fragments. Every fragment is a
                full copy of the art clipped to its own band — the bands overlap
                by a hair so the seated logo never shows a seam between them. */}
            <div className="os-mark__frags">
              {Array.from({ length: FRAGMENTS }, (_, i) => {
                const left = (i * 100) / FRAGMENTS;
                const right = 100 - ((i + 1) * 100) / FRAGMENTS;
                const bleed = 0.4;
                return (
                  <span
                    key={i}
                    data-l-frag=""
                    style={{
                      backgroundImage: `url(${LOCKUP})`,
                      clipPath: `inset(0 ${Math.max(right - bleed, 0)}% 0 ${Math.max(left - bleed, 0)}%)`,
                    }}
                  />
                );
              })}
            </div>

            {/* specular sweep, masked to the logo's own silhouette */}
            <span
              className="os-mark__sheenmask"
              style={{ maskImage: `url(${LOCKUP})`, WebkitMaskImage: `url(${LOCKUP})` }}
            >
              <span data-l-sheen="" className="os-mark__sheen" />
            </span>
          </div>

          <div className="os-tag">
            <span data-l-rule="" className="os-tag__rule" />
            {TAGLINE.map((line) => (
              <span key={line} className="os-tag__mask">
                <span data-l-line="" className="os-tag__line">
                  {line}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
