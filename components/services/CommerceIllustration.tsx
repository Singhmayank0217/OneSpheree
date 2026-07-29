'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reselling & E-Commerce hero artwork — a premium COMMERCE ECOSYSTEM built
 * from DS tokens (retuned to amber/gold by .ec-theme): a central digital
 * storefront hub, an orbiting ring of marketplace nodes, floating product
 * cards that bob at their own rhythm, a logistics route with a package in
 * transit toward a warehouse, and glowing connection lines. No carts, no
 * people, no photography. Slow orbit + scroll parallax, decorative only.
 */
export function CommerceIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-ec-orbit]', { rotation: 360, duration: 120, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('[data-ec-orbit-r]', { rotation: -360, duration: 160, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      // floating product cards bob independently
      gsap.utils.toArray<SVGElement>('[data-ec-card]').forEach((card, i) => {
        gsap.to(card, { y: i % 2 ? 14 : -14, duration: 3 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      // package travels the logistics route toward the warehouse
      gsap.to('[data-ec-parcel]', {
        keyframes: [{ x: 0, y: 0 }, { x: 200, y: 30 }, { x: 396, y: 6 }],
        duration: 4.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
      // connection net flows
      gsap.to('[data-ec-net]', { strokeDashoffset: -64, duration: 3, ease: 'none', repeat: -1 });
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
          <radialGradient id="ec-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".85" />
            <stop offset="55%" stopColor="var(--violet-500)" stopOpacity=".3" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ec-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".28" />
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".12" />
          </linearGradient>
        </defs>

        <circle cx="320" cy="320" r="300" fill="url(#ec-core)" opacity=".24" />

        {/* connection net */}
        <g stroke="rgba(255,255,255,.14)" strokeWidth="1">
          <path d="M320 320 L470 168" />
          <path d="M320 320 L156 214" />
          <path d="M320 320 L150 452" />
          <path d="M320 320 L488 470" />
        </g>
        <path
          data-ec-net=""
          d="M156 214 L320 320 L488 470"
          stroke="var(--violet-500)"
          strokeWidth="1.75"
          strokeDasharray="5 11"
          opacity=".8"
          style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--violet-500) 70%, transparent))' }}
        />

        {/* orbiting marketplace nodes */}
        <g data-ec-orbit="" opacity=".6">
          <circle cx="320" cy="320" r="244" stroke="rgba(255,255,255,.12)" strokeDasharray="2 8" />
          {/* storefront node */}
          <g transform="translate(320 76)">
            <circle r="20" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <path d="M-9 -2l2-6h14l2 6M-9 -2v10h18v-10M-9 -2h18" stroke="var(--violet-300)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </g>
          {/* tag node */}
          <g transform="translate(528 452)">
            <circle r="18" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <path d="M6 -6l-9 9a1.5 1.5 0 000 2l4 4a1.5 1.5 0 002 0l9-9v-6zM4 -4h.01" stroke="var(--blue-300)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </g>
          {/* bag node */}
          <g transform="translate(112 452)">
            <circle r="18" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
            <path d="M-6 -4l-2 2v9a1 1 0 001 1h14a1 1 0 001-1v-9l-2-2zM-8 -2h16M4 0a2 2 0 01-8 0" stroke="var(--violet-300)" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
          </g>
        </g>
        <g data-ec-orbit-r="" opacity=".5">
          <circle cx="320" cy="320" r="172" stroke="rgba(255,255,255,.16)" strokeDasharray="1 6" />
          <circle cx="492" cy="320" r="5" fill="var(--violet-300)" />
          <circle cx="196" cy="206" r="6" fill="var(--blue-300)" />
        </g>

        {/* central storefront hub */}
        <g>
          <rect x="256" y="266" width="128" height="108" rx="12" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
          {/* awning */}
          <path d="M256 292h128" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" />
          <path d="M268 292v-10a8 8 0 0116 0M300 292v-10a8 8 0 0116 0M332 292v-10a8 8 0 0116 0" stroke="var(--violet-300)" strokeWidth="1.5" fill="none" />
          {/* window + door */}
          <rect x="270" y="306" width="34" height="52" rx="3" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.2)" />
          <rect x="316" y="306" width="52" height="52" rx="3" fill="color-mix(in srgb, var(--violet-500) 14%, transparent)" stroke="rgba(255,255,255,.2)" />
          <path d="M330 358v-30h24v30" stroke="var(--blue-300)" strokeWidth="1.25" fill="none" />
        </g>

        {/* floating product cards */}
        <g data-ec-card="" transform="translate(150 150)">
          <rect width="86" height="104" rx="10" fill="url(#ec-card)" stroke="rgba(255,255,255,.24)" />
          <rect x="12" y="12" width="62" height="46" rx="5" fill="rgba(255,255,255,.06)" />
          <circle cx="28" cy="30" r="6" fill="var(--violet-400)" opacity=".8" />
          <rect x="12" y="66" width="44" height="7" rx="3.5" fill="rgba(255,255,255,.28)" />
          <rect x="12" y="80" width="28" height="7" rx="3.5" fill="var(--violet-300)" />
        </g>
        <g data-ec-card="" transform="translate(420 380)">
          <rect width="78" height="94" rx="10" fill="url(#ec-card)" stroke="rgba(255,255,255,.22)" />
          <rect x="11" y="11" width="56" height="40" rx="5" fill="rgba(255,255,255,.06)" />
          <rect x="11" y="58" width="40" height="6" rx="3" fill="rgba(255,255,255,.28)" />
          <rect x="11" y="70" width="24" height="6" rx="3" fill="var(--blue-300)" />
        </g>
        <g data-ec-card="" transform="translate(438 158)">
          <rect width="64" height="46" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" />
          <path d="M12 24h14v-8l-5-3v4l-5-3v10z" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinejoin="round" />
          <rect x="34" y="14" width="20" height="5" rx="2.5" fill="rgba(255,255,255,.28)" />
          <rect x="34" y="24" width="14" height="5" rx="2.5" fill="var(--violet-300)" />
        </g>

        {/* logistics route + parcel in transit */}
        <path d="M120 512 C 220 552 420 500 520 528" stroke="rgba(255,255,255,.18)" strokeWidth="1.25" strokeDasharray="4 6" />
        {/* warehouse */}
        <g transform="translate(516 512)">
          <path d="M-18 12v-16l18-8 18 8v16z" fill="rgba(255,255,255,.05)" stroke="var(--blue-300)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M-8 12v-10h16v10" stroke="var(--blue-300)" strokeWidth="1.25" fill="none" />
        </g>
        <g data-ec-parcel="" transform="translate(120 512)">
          <rect x="-9" y="-9" width="18" height="18" rx="3" fill="color-mix(in srgb, var(--violet-500) 30%, #12100a)" stroke="var(--violet-300)" strokeWidth="1.5" />
          <path d="M-9 -1h18M0 -9v18" stroke="var(--violet-300)" strokeWidth="1" opacity=".7" />
        </g>
      </svg>
    </div>
  );
}
