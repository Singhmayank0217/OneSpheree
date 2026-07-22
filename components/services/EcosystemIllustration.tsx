'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero artwork — a connected digital-marketing ecosystem built from DS tokens:
 * a central search node, orbital system rings, rising growth bars, ad tiles,
 * an analytics pulse line and connection paths. Pure SVG (no photography),
 * with slow orbital drift + scroll parallax. Decorative only.
 */
export function EcosystemIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // continuous slow orbit
      gsap.to('[data-eco-orbit]', { rotation: 360, duration: 90, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('[data-eco-orbit-r]', { rotation: -360, duration: 140, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      // analytics pulse draws on loop
      gsap.fromTo(
        '[data-eco-pulse]',
        { strokeDashoffset: 240 },
        { strokeDashoffset: -240, duration: 7, ease: 'none', repeat: -1 }
      );
      // gentle float of the whole system
      gsap.to(el, { y: -10, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      // scroll parallax — the artwork trails the hero copy slightly
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
          <linearGradient id="eco-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--blue-500)" stopOpacity=".25" />
            <stop offset="100%" stopColor="var(--violet-400)" stopOpacity=".9" />
          </linearGradient>
          <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".9" />
            <stop offset="55%" stopColor="var(--violet-500)" stopOpacity=".35" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft field */}
        <circle cx="320" cy="320" r="300" fill="url(#eco-core)" opacity=".25" />

        {/* orbital system rings + satellite nodes */}
        <g data-eco-orbit="" opacity=".55">
          <circle cx="320" cy="320" r="236" stroke="rgba(255,255,255,.14)" strokeDasharray="2 7" />
          <circle cx="320" cy="84" r="7" fill="var(--blue-300)" />
          <circle cx="514" cy="450" r="5" fill="var(--violet-300)" />
          <circle cx="118" cy="410" r="4" fill="rgba(255,255,255,.6)" />
        </g>
        <g data-eco-orbit-r="" opacity=".45">
          <circle cx="320" cy="320" r="170" stroke="rgba(255,255,255,.18)" strokeDasharray="1 6" />
          <circle cx="490" cy="320" r="5" fill="var(--violet-300)" />
          <circle cx="200" cy="196" r="6" fill="var(--blue-300)" />
        </g>

        {/* connection paths */}
        <g stroke="rgba(255,255,255,.16)" strokeWidth="1">
          <path d="M320 320 L470 180" />
          <path d="M320 320 L160 210" />
          <path d="M320 320 L150 452" />
          <path d="M320 320 L488 462" />
        </g>

        {/* central search node */}
        <g>
          <circle cx="320" cy="320" r="64" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" />
          <circle cx="311" cy="311" r="24" stroke="var(--violet-300)" strokeWidth="3.5" />
          <path d="M329 329 L349 349" stroke="var(--violet-300)" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* growth bars (top-right) */}
        <g transform="translate(430 120)">
          <rect x="0" y="76" width="18" height="44" rx="4" fill="url(#eco-bar)" />
          <rect x="28" y="54" width="18" height="66" rx="4" fill="url(#eco-bar)" />
          <rect x="56" y="30" width="18" height="90" rx="4" fill="url(#eco-bar)" />
          <rect x="84" y="0" width="18" height="120" rx="4" fill="url(#eco-bar)" />
          <path d="M2 66 L36 44 L66 22 L96 -6" stroke="var(--blue-300)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M96 -6 l-10 1 M96 -6 l-2 10" stroke="var(--blue-300)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ad tiles (left) */}
        <g transform="translate(96 168)" opacity=".9">
          <rect width="96" height="64" rx="10" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.22)" />
          <rect x="10" y="12" width="42" height="7" rx="3.5" fill="var(--violet-300)" />
          <rect x="10" y="27" width="76" height="5" rx="2.5" fill="rgba(255,255,255,.3)" />
          <rect x="10" y="38" width="62" height="5" rx="2.5" fill="rgba(255,255,255,.2)" />
          <rect x="10" y="49" width="30" height="6" rx="3" fill="var(--blue-400)" />
        </g>
        <g transform="translate(70 260)" opacity=".7">
          <rect width="76" height="50" rx="9" fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,.16)" />
          <rect x="9" y="10" width="30" height="6" rx="3" fill="rgba(255,255,255,.35)" />
          <rect x="9" y="22" width="58" height="4" rx="2" fill="rgba(255,255,255,.2)" />
          <rect x="9" y="33" width="22" height="5" rx="2.5" fill="var(--violet-400)" />
        </g>

        {/* analytics pulse (bottom) */}
        <g transform="translate(150 470)">
          <rect x="-16" y="-28" width="372" height="88" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)" />
          <path
            data-eco-pulse=""
            d="M0 20 L48 20 L72 -8 L104 38 L138 6 L180 24 L214 -14 L252 30 L288 12 L340 12"
            stroke="var(--blue-300)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120 120"
          />
          <circle cx="214" cy="-14" r="4.5" fill="var(--violet-300)" />
        </g>

        {/* intelligence node cluster (bottom-right) */}
        <g transform="translate(452 392)" opacity=".85">
          <circle r="26" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.24)" />
          <circle r="9" fill="var(--violet-400)" opacity=".9" />
          <circle cx="44" cy="-18" r="4" fill="var(--blue-300)" />
          <circle cx="38" cy="26" r="3" fill="rgba(255,255,255,.55)" />
          <path d="M9 0 L40 -16 M9 4 L35 24" stroke="rgba(255,255,255,.2)" />
        </g>
      </svg>
    </div>
  );
}
