'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero artwork — THE SIGNAL FIELD.
 *
 * Communication drawn as infrastructure rather than decoration: eight inbound
 * channels arrive from beyond every edge of the frame and converge on one
 * receiver, two reply channels leave it, and along all of them small glints of
 * light travel continuously — enquiries coming in, answers going back out. The
 * receiver listens in slow concentric rings.
 *
 * Deliberately NOT: floating particles (nothing here is unattached — every
 * light is riding a channel), a rotating globe, a hexagonal node diagram (that
 * is the services hub's ecosystem), or a dashboard. There is no rotation and
 * no bounce anywhere; the whole field breathes on a 6–9 second cycle.
 *
 * Technique: every path carries `pathLength={100}`, so both the entrance draw
 * (dashoffset 100 → 0 over a full-length dash) and the travelling glints (a
 * 3-unit dash cycling the same offset) are pure stroke animations — no
 * MotionPath plugin, no layout, and nothing but transform/opacity/stroke
 * touched on the compositor. Geometry is literal, so SSR and client match.
 */

/** Inbound channels: every one ends on the receiver at 880,400. */
const CHANNELS = [
  { d: 'M-60 40 C 300 90, 560 190, 880 400', dur: 6.4 },
  { d: 'M-60 236 C 280 268, 520 318, 880 400', dur: 7.8 },
  { d: 'M-60 430 C 300 442, 560 408, 880 400', dur: 5.6 },
  { d: 'M-60 646 C 300 618, 560 498, 880 400', dur: 8.6 },
  { d: 'M-60 840 C 340 792, 620 578, 880 400', dur: 7.1 },
  { d: 'M420 -80 C 566 116, 702 218, 880 400', dur: 6.9 },
  { d: 'M712 900 C 768 700, 824 558, 880 400', dur: 5.9 },
  { d: 'M1280 712 C 1128 604, 986 498, 880 400', dur: 8.2 },
];

/** Reply channels leaving the receiver — the answer travelling back out. */
const REPLIES = [
  { d: 'M880 400 C 1006 336, 1108 296, 1280 258', dur: 6.2 },
  { d: 'M880 400 C 1014 432, 1126 476, 1280 536', dur: 7.4 },
];

/** Abstract sources sitting on the inbound channels. */
const SOURCES = [
  { cx: 126, cy: 92, r: 3.5 },
  { cx: 154, cy: 254, r: 2.5 },
  { cx: 208, cy: 428, r: 4 },
  { cx: 186, cy: 608, r: 2.5 },
  { cx: 312, cy: 742, r: 3.5 },
  { cx: 478, cy: 66, r: 2.5 },
  { cx: 742, cy: 786, r: 3 },
  { cx: 1158, cy: 646, r: 2.5 },
];

/** The receiver's listening rings, innermost first. */
const RINGS = [
  { r: 72, o: 0.22 },
  { r: 124, o: 0.15 },
  { r: 186, o: 0.1 },
  { r: 258, o: 0.06 },
  { r: 340, o: 0.035 },
];

export function ContactSignalField({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // resting composition: everything drawn, nothing moving
      gsap.set(el, { opacity: 1 });
      gsap.set('[data-sf-line]', { strokeDashoffset: 0 });
      gsap.set('[data-sf-glint]', { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      /* ── resting state ───────────────────────────────────────────────── */
      gsap.set(el, { opacity: 0 });
      gsap.set('[data-sf-line]', { strokeDashoffset: 100 });
      gsap.set('[data-sf-glint]', { opacity: 0, strokeDashoffset: 100 });
      gsap.set('[data-sf-ring]', { opacity: 0, scale: 0.62, transformOrigin: '880px 400px' });
      gsap.set('[data-sf-core]', { opacity: 0, scale: 0.4, transformOrigin: '880px 400px' });
      gsap.set('[data-sf-bloom]', { opacity: 0, scale: 0.7, transformOrigin: '880px 400px' });
      gsap.set('[data-sf-source]', { opacity: 0, scale: 0 });

      /* ── the field switches on: channels first, then the receiver ────── */
      const enter = gsap.timeline({ delay: 0.15 });
      enter
        .to(el, { opacity: 1, duration: 1.4, ease: 'sine.out' }, 0)
        .to('[data-sf-bloom]', { opacity: 1, scale: 1, duration: 2.1, ease: 'expo.out' }, 0)
        .to(
          '[data-sf-line]',
          { strokeDashoffset: 0, duration: 2.2, ease: 'expo.out', stagger: { each: 0.08, from: 'random' } },
          0.1
        )
        .to('[data-sf-source]', { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.06 }, 0.9)
        .to('[data-sf-ring]', { opacity: 1, scale: 1, duration: 1.7, ease: 'expo.out', stagger: 0.1 }, 0.75)
        .to('[data-sf-core]', { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 1.1);

      /* ── the traffic: glints riding every channel, forever ───────────── */
      const traffic = gsap.timeline({ paused: true });
      gsap.utils.toArray<SVGPathElement>('[data-sf-glint]').forEach((glint, i) => {
        const dur = Number(glint.dataset.dur) || 6.5;
        traffic
          .to(glint, { opacity: 1, duration: 0.8, ease: 'sine.out' }, i * 0.22)
          .fromTo(
            glint,
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: dur, ease: 'none', repeat: -1 },
            i * 0.22
          );
      });

      /* ── the receiver keeps listening ────────────────────────────────── */
      const ambient = gsap.timeline({ paused: true });
      ambient
        .to(
          '[data-sf-ring]',
          {
            scale: 1.055,
            duration: 7.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.7, from: 'start' },
          },
          0
        )
        .to('[data-sf-bloom]', { opacity: 0.62, scale: 1.08, duration: 6.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0)
        .to('[data-sf-core]', { opacity: 0.7, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0)
        .to(
          '[data-sf-source]',
          { opacity: 0.35, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.5, from: 'random' } },
          0
        );

      let inView = true;
      enter.eventCallback('onComplete', () => {
        if (inView) {
          traffic.play();
          ambient.play();
        }
      });

      // off-screen the whole field stops — the hero is tall and the reader
      // spends most of the page below it
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => {
          inView = isActive;
          if (isActive && enter.progress() === 1) {
            traffic.play();
            ambient.play();
          } else if (!isActive) {
            traffic.pause();
            ambient.pause();
          }
        },
      });

      // the field drifts a little slower than the page — depth, capped well
      // inside the spec's 40px parallax ceiling
      gsap.to(el, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className={className}>
      <svg viewBox="0 0 1200 820" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sf-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".40" />
            <stop offset="34%" stopColor="var(--violet-500)" stopOpacity=".20" />
            <stop offset="72%" stopColor="var(--violet-700)" stopOpacity=".06" />
            <stop offset="100%" stopColor="var(--violet-900)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sf-channel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".04" />
            <stop offset="62%" stopColor="var(--violet-300)" stopOpacity=".20" />
            <stop offset="100%" stopColor="var(--violet-400)" stopOpacity=".42" />
          </linearGradient>
          <linearGradient id="sf-reply" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".38" />
            <stop offset="100%" stopColor="var(--blue-300)" stopOpacity=".05" />
          </linearGradient>
        </defs>

        {/* the light the receiver sits in */}
        <circle data-sf-bloom="" cx="880" cy="400" r="420" fill="url(#sf-bloom)" />

        {/* listening rings */}
        {RINGS.map((ring) => (
          <circle
            key={ring.r}
            data-sf-ring=""
            cx="880"
            cy="400"
            r={ring.r}
            stroke="#FFFFFF"
            strokeOpacity={ring.o}
            strokeWidth="1"
          />
        ))}

        {/* inbound channels + the glints riding them */}
        {CHANNELS.map((channel, i) => (
          <g key={`in-${i}`}>
            <path
              data-sf-line=""
              d={channel.d}
              stroke="url(#sf-channel)"
              strokeWidth="1.25"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
            />
            <path
              data-sf-glint=""
              data-dur={channel.dur}
              d={channel.d}
              stroke="var(--violet-300)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="2.5 97.5"
            />
          </g>
        ))}

        {/* reply channels — the answer leaving */}
        {REPLIES.map((reply, i) => (
          <g key={`out-${i}`}>
            <path
              data-sf-line=""
              d={reply.d}
              stroke="url(#sf-reply)"
              strokeWidth="1.25"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
            />
            <path
              data-sf-glint=""
              data-dur={reply.dur}
              d={reply.d}
              stroke="var(--blue-300)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="2.5 97.5"
            />
          </g>
        ))}

        {/* the sources out in the field */}
        {SOURCES.map((s) => (
          <circle
            key={`${s.cx}-${s.cy}`}
            data-sf-source=""
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="var(--violet-300)"
            fillOpacity=".55"
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
        ))}

        {/* the receiver */}
        <g data-sf-core="">
          <circle cx="880" cy="400" r="26" fill="var(--violet-500)" fillOpacity=".16" />
          <circle cx="880" cy="400" r="26" stroke="var(--violet-300)" strokeOpacity=".5" strokeWidth="1" />
          <circle cx="880" cy="400" r="7" fill="var(--violet-300)" />
        </g>
      </svg>
    </div>
  );
}
