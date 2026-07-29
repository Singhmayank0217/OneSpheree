'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import type { HubFeature } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Why Businesses Choose OneSpheree — composition: TILT CARDS. Each card is a
 * physical object: it turns toward the pointer in 3D (max 7°, damped through
 * quickTo), its icon and heading stand off the surface on their own Z planes,
 * and a specular sheen tracks the light. Pointer work is skipped entirely on
 * coarse pointers and under reduced motion, where the cards stay flat.
 */
function TiltCard({ feature }: { feature: HubFeature }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return;

    const card = el.querySelector<HTMLElement>('[data-tilt-plane]');
    const sheen = el.querySelector<HTMLElement>('[data-tilt-sheen]');
    if (!card) return;

    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      rx(dy * -7);
      ry(dx * 7);
      if (sheen) {
        sheen.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        sheen.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="group h-full [perspective:900px]">
      <div
        data-tilt-plane=""
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.025)] p-6 transition-[border-color,background-color] duration-[var(--duration-slow)] [transform-style:preserve-3d] group-hover:border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] group-hover:bg-[rgba(255,255,255,.045)]"
      >
        {/* specular sheen — follows the light source */}
        <span
          data-tilt-sheen=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--violet-400) 20%, transparent), transparent 68%)',
          }}
        />
        {/* accent hairline lights across the top edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-[520ms] ease-[var(--ease-out)] group-hover:scale-x-100"
        />

        <span
          className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line-dark bg-[rgba(255,255,255,.05)] text-[var(--violet-300)] transition-colors duration-[var(--duration-base)] [transform:translateZ(34px)] group-hover:border-[color-mix(in_srgb,var(--violet-400)_50%,transparent)] group-hover:text-[var(--violet-200)]"
        >
          <ServiceIcon name={feature.icon} size={20} />
        </span>
        <h3 className="t-h4 ondark-heading relative mt-5 [transform:translateZ(22px)]">{feature.title}</h3>
        <p className="relative mt-2.5 text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted [transform:translateZ(12px)]">
          {feature.blurb}
        </p>
      </div>
    </div>
  );
}

export function HubWhy({
  eyebrow,
  headline,
  intro,
  features,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  features: HubFeature[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 30, rotateX: -12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
        }
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 15% 20%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{eyebrow}</p>
          </Reveal>
          <RevealText text={headline} as="h2" className="t-display ondark-heading mx-auto mt-3 max-w-[18ch]" />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[58ch] text-ondark-muted">{intro}</p>
          </Reveal>
        </div>

        {/* eight reasons read as 4 + 4; a three-column track would leave a
            ragged pair on the last row */}
        <div ref={gridRef} className="mt-12 grid gap-4 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <TiltCard key={f.title} feature={f} />
          ))}
        </div>
      </Container>
    </section>
  );
}
