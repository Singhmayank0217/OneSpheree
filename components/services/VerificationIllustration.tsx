'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Due Diligence hero artwork — a corporate-intelligence / verification field
 * built from DS tokens: a central secure document that earns a verified seal,
 * an orbiting ring of check nodes (compliance, identity, records, search), a
 * scanning sweep across the document, and connection paths. Pure SVG (no
 * people, desks, or photography), blue-leaning for a trust/verification tone,
 * with a slow orbit + scroll parallax. Decorative only.
 */
export function VerificationIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-vf-orbit]', { rotation: 360, duration: 110, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('[data-vf-orbit-r]', { rotation: -360, duration: 150, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      // scanning sweep drifts down and back across the document
      gsap.to('[data-vf-scan]', { y: 150, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      // the verified seal breathes
      gsap.to('[data-vf-seal]', { scale: 1.05, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' });
      gsap.to(el, { y: -10, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(el, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="vf-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--blue-300)" stopOpacity=".85" />
            <stop offset="55%" stopColor="var(--blue-500)" stopOpacity=".3" />
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vf-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-300)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--blue-300)" stopOpacity=".55" />
            <stop offset="100%" stopColor="var(--blue-300)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="vf-doc">
            <rect x="232" y="196" width="176" height="230" rx="12" />
          </clipPath>
        </defs>

        <circle cx="320" cy="320" r="300" fill="url(#vf-core)" opacity=".22" />

        {/* orbital verification nodes */}
        <g data-vf-orbit="" opacity=".6">
          <circle cx="320" cy="320" r="248" stroke="rgba(255,255,255,.12)" strokeDasharray="2 8" />
          {/* shield / compliance node */}
          <g transform="translate(320 72)">
            <circle r="19" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <path d="M0 -9l7 3v5c0 5-4 8-7 9-3-1-7-4-7-9v-5z" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" />
          </g>
          {/* search node */}
          <g transform="translate(528 452)">
            <circle r="17" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <circle cx="-2" cy="-2" r="6" stroke="var(--violet-300)" strokeWidth="1.6" />
            <path d="M3 3l6 6" stroke="var(--violet-300)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          {/* records node */}
          <g transform="translate(112 452)">
            <circle r="17" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <path d="M-7 -7h10l4 4v10h-14z" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" />
            <path d="M-4 0h8M-4 4h6" stroke="var(--blue-300)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
        <g data-vf-orbit-r="" opacity=".5">
          <circle cx="320" cy="320" r="176" stroke="rgba(255,255,255,.16)" strokeDasharray="1 6" />
          <g transform="translate(496 320)">
            <circle r="6" fill="var(--violet-300)" />
          </g>
          <g transform="translate(176 210)">
            <circle r="5" fill="var(--blue-300)" />
          </g>
        </g>

        {/* connection paths */}
        <g stroke="rgba(255,255,255,.14)" strokeWidth="1">
          <path d="M320 320 L320 96" />
          <path d="M320 320 L508 440" />
          <path d="M320 320 L132 440" />
        </g>

        {/* central secure document */}
        <g>
          <rect x="232" y="196" width="176" height="230" rx="12" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" />
          <path d="M256 232h96M256 252h128" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round" />
          {/* verified field rows */}
          {[292, 320, 348].map((y, i) => (
            <g key={y}>
              <rect x="256" y={y} width={i === 1 ? 96 : 82} height="8" rx="4" fill="rgba(255,255,255,.16)" />
              <g transform={`translate(372 ${y + 4})`}>
                <circle r="8" fill="color-mix(in srgb, var(--blue-500) 30%, transparent)" />
                <path d="M-3.5 0l2.5 2.5 4.5-5" stroke="var(--blue-200)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            </g>
          ))}
          {/* scanning sweep */}
          <g clipPath="url(#vf-doc)">
            <rect data-vf-scan="" x="232" y="188" width="176" height="34" fill="url(#vf-scan)" />
          </g>
        </g>

        {/* verified seal */}
        <g data-vf-seal="" transform="translate(392 404)">
          <circle r="34" fill="color-mix(in srgb, var(--violet-500) 26%, transparent)" stroke="var(--violet-300)" strokeWidth="1.5" />
          <circle r="26" stroke="rgba(255,255,255,.35)" strokeDasharray="2 4" />
          <path d="M-11 0l7 7 13-15" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
