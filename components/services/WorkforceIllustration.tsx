'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Manpower Solutions hero artwork — a premium WORKFORCE ECOSYSTEM built from
 * DS tokens (retuned to royal blue by .mp-theme): a central organization hub,
 * an orbiting network of abstract professional nodes, an organizational
 * structure that branches beneath, a recruitment pipeline where a candidate
 * token advances through screening toward the org, and a slow workforce-
 * intelligence pulse. No people photography, no smiling teams — abstract
 * linework only.
 *
 * Motion (refinement pass): the illustration arrives on a staged GSAP timeline
 * that chains after the hero copy — hub → nodes → connection lines → pipeline —
 * then settles into a living-system ambient loop (breathing glow, layered hub
 * pulses, orbiting network, floating nodes, a travelling candidate, flowing
 * connection paths and a slow light sweep). A gentle pointer parallax separates
 * a near and a far depth layer. Everything is transform/opacity only, gated to
 * pause off-screen, and disabled under prefers-reduced-motion.
 */
export function WorkforceIllustration({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // ── entrance: staged, chains after the hero buttons (~0.4s) ──────────
      const enter = gsap.timeline({ delay: 0.45, defaults: { ease: 'power3.out' } });
      enter
        .from('[data-wf-glow]', { opacity: 0, duration: 0.9 }, 0)
        .from('[data-wf-hub]', { opacity: 0, scale: 0.6, duration: 0.7, ease: 'back.out(1.5)', transformOrigin: '50% 50%' }, 0.1)
        .from('[data-wf-onode]', { opacity: 0, scale: 0.4, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.08, transformOrigin: '50% 50%' }, 0.35)
        .from('[data-wf-ring]', { opacity: 0, duration: 0.8 }, 0.4)
        .from('[data-wf-struct]', { opacity: 0, duration: 0.7 }, 0.6)
        .from('[data-wf-card]', { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1, transformOrigin: '50% 50%' }, 0.65)
        .from('[data-wf-netbase]', { opacity: 0, duration: 0.7 }, 0.75)
        .from('[data-wf-net]', { opacity: 0, duration: 0.6 }, 0.85)
        .from('[data-wf-pipe]', { opacity: 0, duration: 0.7 }, 0.95)
        .from('[data-wf-gate]', { opacity: 0, scale: 0.5, duration: 0.5, transformOrigin: '50% 50%' }, 1.05)
        .from('[data-wf-cand]', { opacity: 0, scale: 0.4, duration: 0.5, ease: 'back.out(1.6)', transformOrigin: '50% 50%' }, 1.15);

      // ── ambient: the living system (paused off-screen for performance) ───
      const amb = gsap.timeline({ paused: true });
      amb.add('loop', 0);
      // slow network orbit
      amb.to('[data-wf-orbit]', { rotation: 360, duration: 130, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }, 'loop');
      amb.to('[data-wf-orbit-r]', { rotation: -360, duration: 170, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }, 'loop');
      // breathing central glow
      amb.to('[data-wf-glow]', { scale: 1.1, opacity: '+=0.06', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 'loop');
      // professional nodes + org cards float independently
      gsap.utils.toArray<SVGElement>('[data-wf-float]').forEach((p, i) => {
        amb.to(p, { y: i % 2 ? 10 : -10, duration: 3.2 + i * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 'loop');
      });
      // candidate token advances up the recruitment pipeline toward the org
      amb.to('[data-wf-cand]', {
        keyframes: [{ x: 0, y: 0 }, { x: 150, y: -70 }, { x: 300, y: -150 }],
        duration: 4.8, ease: 'power1.inOut', yoyo: true, repeat: -1,
      }, 'loop');
      // connection network flows
      amb.to('[data-wf-net]', { strokeDashoffset: -64, duration: 3, ease: 'none', repeat: -1 }, 'loop');
      // layered intelligence pulses radiating from the hub
      gsap.utils.toArray<SVGElement>('[data-wf-pulse]').forEach((ring, i) => {
        amb.fromTo(ring,
          { scale: 0.65, opacity: 0.5 },
          { scale: 1.35, opacity: 0, duration: 3.4, ease: 'power1.out', repeat: -1, delay: i * 1.7, transformOrigin: '50% 50%' },
          'loop');
      });
      // slow diagonal light sweep across the field
      amb.fromTo('[data-wf-sweep]',
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 3.4, ease: 'sine.inOut', repeat: -1, repeatDelay: 5, yoyo: false },
        'loop');

      // gentle whole-illustration float + start ambient once it settles in
      gsap.to(el, { y: -10, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      enter.eventCallback('onComplete', () => amb.play());
      // safety: also let ambient run if the entrance is interrupted
      gsap.delayedCall(2.4, () => amb.play());

      // pause the ambient loop when the hero is scrolled away
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? amb.play() : amb.pause()),
      });

      // scroll parallax on the whole illustration
      gsap.to(el, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      // ── pointer parallax: near/far depth separation (desktop, fine pointer) ─
      if (window.matchMedia('(pointer: fine)').matches) {
        const near = gsap.quickTo('[data-wf-near]', 'x', { duration: 0.8, ease: 'power3.out' });
        const nearY = gsap.quickTo('[data-wf-near]', 'y', { duration: 0.8, ease: 'power3.out' });
        const far = gsap.quickTo('[data-wf-far]', 'x', { duration: 1.1, ease: 'power3.out' });
        const farY = gsap.quickTo('[data-wf-far]', 'y', { duration: 1.1, ease: 'power3.out' });
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          near(dx * 16); nearY(dy * 16);
          far(dx * -8); farY(dy * -8);
        };
        const onLeave = () => { near(0); nearY(0); far(0); farY(0); };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        };
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="wf-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-300)" stopOpacity=".85" />
            <stop offset="55%" stopColor="var(--violet-500)" stopOpacity=".3" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wf-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity=".26" />
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="wf-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity=".07" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── far depth layer ─────────────────────────────────────────────── */}
        <g data-wf-far="">
          <circle data-wf-glow="" cx="320" cy="300" r="300" fill="url(#wf-core)" opacity=".24" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

          {/* orbiting professional network */}
          <g data-wf-orbit="" opacity=".62" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle data-wf-ring="" cx="320" cy="300" r="248" stroke="rgba(255,255,255,.12)" strokeDasharray="2 8" />
            {[
              { x: 320, y: 52 },
              { x: 548, y: 372 },
              { x: 92, y: 372 },
            ].map((n, i) => (
              <g key={i} data-wf-onode="" data-wf-float="" transform={`translate(${n.x} ${n.y})`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <circle r="21" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" />
                <circle cx="0" cy="-5" r="5" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" />
                <path d="M-8 9a8 8 0 0116 0" fill="none" stroke="var(--violet-300)" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            ))}
          </g>
          <g data-wf-orbit-r="" opacity=".5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle data-wf-ring="" cx="320" cy="300" r="176" stroke="rgba(255,255,255,.16)" strokeDasharray="1 6" />
            <circle cx="496" cy="300" r="5" fill="var(--violet-300)" />
            <circle cx="176" cy="196" r="6" fill="var(--blue-300)" />
            <circle cx="360" cy="474" r="5" fill="var(--blue-300)" />
          </g>

          {/* layered intelligence pulses behind the hub */}
          <circle data-wf-pulse="" cx="320" cy="300" r="60" fill="none" stroke="var(--blue-300)" strokeWidth="1.5" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <circle data-wf-pulse="" cx="320" cy="300" r="60" fill="none" stroke="var(--violet-300)" strokeWidth="1.25" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        </g>

        {/* ── near depth layer ────────────────────────────────────────────── */}
        <g data-wf-near="">
          {/* connection net */}
          <g data-wf-netbase="" stroke="rgba(255,255,255,.13)" strokeWidth="1">
            <path d="M320 300 L470 168" />
            <path d="M320 300 L156 214" />
            <path d="M320 300 L150 452" />
            <path d="M320 300 L490 452" />
          </g>
          <path
            data-wf-net=""
            d="M156 214 L320 300 L490 452"
            stroke="var(--violet-500)"
            strokeWidth="1.75"
            strokeDasharray="5 11"
            opacity=".8"
            style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--violet-500) 70%, transparent))' }}
          />

          {/* central organization hub */}
          <g data-wf-hub="" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle cx="320" cy="300" r="46" fill="color-mix(in srgb, var(--violet-500) 22%, transparent)" stroke="rgba(255,255,255,.35)" />
            <path d="M304 320v-30l16-8 16 8v30z" fill="rgba(255,255,255,.05)" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M312 320v-9h6v9M322 320v-9h6v9M310 300h20" stroke="#fff" strokeWidth="1.2" fill="none" />
          </g>

          {/* organizational structure branching beneath the hub */}
          <g data-wf-struct="" stroke="rgba(255,255,255,.2)" strokeWidth="1.25" fill="none">
            <path d="M320 346v22M320 368H214M320 368H426M214 368v18M426 368v18M320 368v18" />
          </g>
          {[214, 320, 426].map((x, i) => (
            <g key={i} data-wf-card="" data-wf-float="" transform={`translate(${x} 402)`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect x="-22" y="-16" width="44" height="34" rx="8" fill="url(#wf-card)" stroke="rgba(255,255,255,.24)" />
              <circle cx="0" cy="-4" r="4.5" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" />
              <path d="M-7 8a7 7 0 0114 0" fill="none" stroke="var(--violet-300)" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          ))}

          {/* recruitment pipeline — candidate token advancing toward the org */}
          <path data-wf-pipe="" d="M120 560 C 210 500 300 430 420 366" stroke="rgba(255,255,255,.16)" strokeWidth="1.25" strokeDasharray="4 6" />
          <g data-wf-gate="" transform="translate(270 470)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <rect x="-11" y="-14" width="22" height="28" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" />
            <path d="M-4.5 0l3 3 6-7" stroke="var(--blue-300)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <g data-wf-cand="" transform="translate(120 560)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle r="12" fill="color-mix(in srgb, var(--violet-500) 34%, #0a0f1c)" stroke="var(--violet-300)" strokeWidth="1.5" />
            <circle cx="0" cy="-3" r="3.5" fill="none" stroke="#fff" strokeWidth="1.3" />
            <path d="M-5 6a5 5 0 0110 0" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
          </g>

          {/* slow diagonal light sweep */}
          <g transform="rotate(18 320 320)">
            <rect data-wf-sweep="" x="210" y="-160" width="220" height="960" fill="url(#wf-sweep)" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
