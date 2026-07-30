'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The illustration beside the enquiry copy — THE BRIEF BECOMING A PLAN.
 *
 * A loop in five beats: an empty sheet is framed, three lines of a brief write
 * themselves onto it, a light travels along the arc between the two panels, and
 * on the far side a plan builds — four columns rising to a marked outcome. It
 * clears and starts again, slowly.
 *
 * It reads as the section's argument in one image: you send the brief, we send
 * back a shape. Small, quiet and on a long cycle, so it never competes with the
 * form sitting next to it.
 */
export function ContactDialogue({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // the finished composition, held still
      gsap.set('[data-dg-frame]', { strokeDashoffset: 0 });
      gsap.set('[data-dg-line]', { scaleX: 1 });
      gsap.set('[data-dg-arc]', { strokeDashoffset: 0 });
      gsap.set('[data-dg-bar]', { scaleY: 1 });
      gsap.set('[data-dg-mark]', { opacity: 1, strokeDashoffset: 0 });
      gsap.set('[data-dg-glint]', { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const rest = () => {
        gsap.set('[data-dg-frame]', { strokeDashoffset: 100 });
        gsap.set('[data-dg-line]', { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('[data-dg-arc]', { strokeDashoffset: 100 });
        gsap.set('[data-dg-glint]', { opacity: 0, strokeDashoffset: 100 });
        gsap.set('[data-dg-bar]', { scaleY: 0, transformOrigin: 'center bottom' });
        gsap.set('[data-dg-mark]', { opacity: 0, strokeDashoffset: 100 });
        gsap.set('[data-dg-stage]', { opacity: 1 });
      };
      rest();

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6, onRepeat: rest });
      loop
        // 1 — the sheet is framed
        .to('[data-dg-frame]', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.5 }, 0)
        // 2 — the brief writes itself
        .to('[data-dg-line]', { scaleX: 1, duration: 0.55, ease: 'power2.out', stagger: 0.16 }, 0.75)
        // 3 — it travels across
        .to('[data-dg-arc]', { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 1.7)
        .to('[data-dg-glint]', { opacity: 1, duration: 0.2 }, 1.85)
        .to('[data-dg-glint]', { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' }, 1.85)
        .to('[data-dg-glint]', { opacity: 0, duration: 0.3 }, 2.85)
        // 4 — the plan builds
        .to('[data-dg-bar]', { scaleY: 1, duration: 0.7, ease: 'expo.out', stagger: 0.11 }, 2.6)
        // 5 — and lands
        .to('[data-dg-mark]', { opacity: 1, duration: 0.3 }, 3.35)
        .to('[data-dg-mark]', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 3.4)
        // clear, ready to start over
        .to('[data-dg-stage]', { opacity: 0, duration: 0.7, ease: 'sine.inOut' }, 6.1);

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => (isActive ? loop.play() : loop.pause()),
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className={className}>
      <svg viewBox="0 0 440 210" fill="none" className="w-full">
        <g data-dg-stage="">
          {/* the brief */}
          <rect
            data-dg-frame=""
            x="10"
            y="34"
            width="156"
            height="142"
            rx="12"
            stroke="rgba(255,255,255,.18)"
            strokeWidth="1"
            pathLength={100}
            strokeDasharray="100"
          />
          {[
            { y: 66, w: 108 },
            { y: 92, w: 124 },
            { y: 118, w: 84 },
            { y: 144, w: 100 },
          ].map((line, i) => (
            <rect
              key={line.y}
              data-dg-line=""
              x="30"
              y={line.y}
              width={line.w}
              height="6"
              rx="3"
              fill={i === 0 ? 'var(--violet-300)' : 'rgba(255,255,255,.24)'}
              fillOpacity={i === 0 ? '.75' : '1'}
            />
          ))}

          {/* the crossing */}
          <path
            data-dg-arc=""
            d="M178 105 C 202 62, 244 62, 268 105"
            stroke="rgba(255,255,255,.22)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="100"
            pathLength={100}
          />
          <path
            data-dg-glint=""
            d="M178 105 C 202 62, 244 62, 268 105"
            stroke="var(--violet-300)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 96"
            pathLength={100}
          />

          {/* the plan */}
          <rect
            data-dg-frame=""
            x="278"
            y="34"
            width="152"
            height="142"
            rx="12"
            stroke="rgba(255,255,255,.18)"
            strokeWidth="1"
            pathLength={100}
            strokeDasharray="100"
          />
          <line x1="296" y1="152" x2="414" y2="152" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
          {[
            { x: 300, h: 32, accent: false },
            { x: 328, h: 52, accent: false },
            { x: 356, h: 74, accent: false },
            { x: 384, h: 96, accent: true },
          ].map((bar) => (
            <rect
              key={bar.x}
              data-dg-bar=""
              x={bar.x}
              y={150 - bar.h}
              width="18"
              height={bar.h}
              rx="4"
              fill={bar.accent ? 'var(--violet-400)' : 'rgba(255,255,255,.18)'}
              fillOpacity={bar.accent ? '.85' : '1'}
              style={{ transformBox: 'fill-box' }}
            />
          ))}
          <path
            data-dg-mark=""
            d="M386 46 l4.5 4.5 L400 41"
            stroke="var(--violet-300)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray="100"
          />
        </g>
      </svg>
    </div>
  );
}
