'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fire & Safety hero artwork — an ENGINEERING BLUEPRINT, not emergency
 * graphics: a commercial building elevation on a drafting grid with its fire
 * protection network overlaid in glowing red technical lines — per-floor
 * detectors pinging in sequence, a ceiling sprinkler header, the riser main
 * dropping to a site hydrant, dimension marks, and a monitoring ring whose
 * sweep never sleeps. No firefighters, no flames. Colors ride the fire-theme
 * token remap (violet slot = deep red, blue slot = ember).
 */
export function FireProtectionIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // detector pings ripple in sequence, forever
      gsap.utils.toArray<SVGElement>('[data-fp-ping]').forEach((ping, i) => {
        gsap.fromTo(
          ping,
          { scale: 0.4, opacity: 0.9 },
          { scale: 2.2, opacity: 0, duration: 2.4, ease: 'power1.out', repeat: -1, delay: i * 0.55, transformOrigin: '50% 50%' }
        );
      });
      // the network line carries signal continuously
      gsap.to('[data-fp-net]', { strokeDashoffset: -64, duration: 2.6, ease: 'none', repeat: -1 });
      // monitoring sweep
      gsap.to('[data-fp-sweep]', { rotation: 360, duration: 6, ease: 'none', repeat: -1, transformOrigin: '506px 128px' });
      // gentle float + scroll parallax (same pacing as the other hero artworks)
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
          <radialGradient id="fp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".55" />
            <stop offset="60%" stopColor="var(--violet-500)" stopOpacity=".18" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
          <pattern id="fp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="rgba(255,255,255,.05)" />
          </pattern>
        </defs>

        {/* drafting grid + warm field */}
        <rect x="24" y="24" width="592" height="592" fill="url(#fp-grid)" />
        <circle cx="320" cy="340" r="290" fill="url(#fp-glow)" opacity=".2" />

        {/* building elevation (4 storeys) */}
        <g stroke="rgba(255,255,255,.34)" strokeWidth="1.5">
          <rect x="150" y="150" width="270" height="360" fill="rgba(255,255,255,.03)" />
          <path d="M150 240h270M150 330h270M150 420h270" />
          {/* roof plant */}
          <path d="M186 150v-26h58v26" />
        </g>
        {/* windows */}
        <g fill="rgba(255,255,255,.08)">
          {[168, 258, 348, 438].map((y) =>
            [172, 232, 292, 352].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="36" height="48" rx="2" />)
          )}
        </g>

        {/* dimension marks — architectural overlay */}
        <g stroke="rgba(255,255,255,.22)" strokeWidth="1">
          <path d="M132 150v360M126 150h12M126 510h12" />
          <path d="M150 528h270M150 522v12M420 522v12" />
        </g>
        <text x="96" y="334" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="var(--font-jetbrains), monospace" transform="rotate(-90 96 334)" letterSpacing="2">ELEV — 4F</text>

        {/* per-floor detectors + pings (red) */}
        {[196, 286, 376, 466].map((y, i) => (
          <g key={y}>
            <circle data-fp-ping="" cx={i % 2 ? 250 : 330} cy={y} r="10" stroke="var(--violet-400)" strokeWidth="1.5" fill="none" />
            <circle cx={i % 2 ? 250 : 330} cy={y} r="4" fill="var(--violet-400)" />
          </g>
        ))}

        {/* ceiling sprinkler header on top floor */}
        <g stroke="var(--blue-400)" strokeWidth="1.5">
          <path d="M162 176h246" />
          {[190, 250, 310, 370].map((x) => (
            <g key={x}>
              <path d={`M${x} 176v9`} />
              <path d={`M${x - 6} 190l6 -5 6 5`} fill="none" />
            </g>
          ))}
        </g>

        {/* riser main → site hydrant */}
        <path d="M420 176h34v368h-70" stroke="var(--blue-400)" strokeWidth="2" opacity=".8" />
        <g transform="translate(368 544)">
          <rect x="-9" y="-20" width="18" height="20" rx="3" fill="none" stroke="var(--blue-300)" strokeWidth="1.75" />
          <path d="M-9 -12h-7M9 -12h7M0 -20v-7M-5 0h10" stroke="var(--blue-300)" strokeWidth="1.75" strokeLinecap="round" />
        </g>
        <text x="392" y="574" fill="rgba(255,255,255,.35)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">HYDRANT</text>

        {/* glowing red network: detectors → monitoring panel */}
        <path
          data-fp-net=""
          d="M330 196 L466 196 L466 128 L482 128 M250 286 L466 286 L466 196 M330 376 L466 376 L466 286 M250 466 L466 466 L466 376"
          stroke="var(--violet-500)"
          strokeWidth="1.75"
          strokeDasharray="5 11"
          opacity=".85"
          style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--violet-500) 70%, transparent))' }}
        />

        {/* monitoring ring */}
        <g>
          <circle cx="506" cy="128" r="42" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.3)" />
          <circle cx="506" cy="128" r="30" stroke="rgba(255,255,255,.16)" strokeDasharray="2 5" />
          <g data-fp-sweep="">
            <path d="M506 128 L506 90" stroke="var(--violet-300)" strokeWidth="1.75" strokeLinecap="round" opacity=".8" />
          </g>
          <circle cx="506" cy="128" r="5" fill="var(--violet-400)" />
          <text x="506" y="186" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">MONITORED 24/7</text>
        </g>
      </svg>
    </div>
  );
}
