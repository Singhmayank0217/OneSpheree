'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { cn } from '@/lib/utils';
import { GroupVisual } from './HubBeyondIllustrations';
import { HubFocusCluster } from './HubFocusCluster';
import type { HubBeyondContent, HubCapabilityGroup } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Beyond Services — composition: CAPABILITY GROUPS. Rather than one long list
 * of everything else OneSpheree does, the work is banded into groups: each
 * band opens with its own panoramic illustration beside a heavy editorial
 * heading, then lays its capabilities out as glass cards beneath. The bands
 * mirror each other left/right so the section reads as a series rather than a
 * repeated template.
 *
 * The capability cards are wrapped one level deep: GSAP owns the wrapper's
 * transform for the stagger, and the card underneath keeps its CSS hover lift
 * — an inline transform from GSAP would otherwise beat the hover class.
 */
function CapabilityGroup({ group, flipped }: { group: HubCapabilityGroup; flipped: boolean }) {
  const listRef = useRef<HTMLUListElement>(null);

  const wipe = group.reveal === 'wipe';
  const five = group.capabilities.length === 5;

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // 'wipe' is Part 2's progressive reveal — the card is uncovered from the
      // top rather than lifted into place, so the section does not close on a
      // third repetition of the same fade-up.
      const from = wipe ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 } : { opacity: 0, y: 26 };
      const to = wipe
        ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.85, stagger: 0.11 }
        : { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 };
      gsap.fromTo(list.children, from, {
        ...to,
        ease: 'power3.out',
        scrollTrigger: { trigger: list, start: 'top 84%', once: true },
      });
    }, list);
    return () => ctx.revert();
  }, [wipe]);

  return (
    <article className="border-t border-line-dark pt-10 lg:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
        <header className={cn(flipped && 'lg:order-2')}>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[.14em] text-[var(--violet-300)]">{group.index}</p>
          </Reveal>
          <RevealText text={group.name} as="h3" className="t-h1 ondark-heading mt-3 max-w-[14ch]" />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[48ch] text-ondark-muted">{group.blurb}</p>
          </Reveal>
        </header>

        <Reveal delay={0.15} y={30} className={cn('relative w-full', flipped && 'lg:order-1')}>
          <div className="aspect-[420/180] w-full overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.02)] p-4">
            <GroupVisual visual={group.visual} />
          </div>
        </Reveal>
      </div>

      <ul
        ref={listRef}
        className={cn(
          'mt-8 grid gap-3 sm:grid-cols-2',
          // five capabilities read best as 3 + 2 across a six-column track;
          // the three- and four-capability bands are untouched
          five ? 'lg:grid-cols-6' : group.capabilities.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        )}
      >
        {group.capabilities.map((cap, i) => (
          <li key={cap.name} className={cn(five && (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'))}>
            <div className="group/cap relative flex h-full flex-col overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.035)] p-5 transition-[transform,border-color,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] hover:bg-[rgba(255,255,255,.06)]">
              {/* light rises from the base on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover/cap:opacity-100"
                style={{
                  background:
                    'radial-gradient(100% 100% at 50% 100%, color-mix(in srgb, var(--violet-500) 24%, transparent), transparent 72%)',
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-[520ms] ease-[var(--ease-out)] group-hover/cap:scale-x-100"
              />

              <span className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line-dark bg-[rgba(255,255,255,.05)] text-[var(--violet-300)] transition-colors duration-[var(--duration-base)] group-hover/cap:border-[color-mix(in_srgb,var(--violet-400)_50%,transparent)] group-hover/cap:text-[var(--violet-200)]">
                <ServiceIcon name={cap.icon} size={18} />
              </span>
              <h4 className="relative mt-4 font-medium leading-snug text-ondark">{cap.name}</h4>
              <p className="relative mt-2 text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
                {cap.blurb}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function HubBeyond({ beyond }: { beyond: HubBeyondContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // The ambient glow evolves slowly across the whole ecosystem — pure
      // transform and opacity on a soft radial (no blur filter: a large
      // blurred layer animated on scroll stalls the compositor).
      const aura = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
      aura
        .to('[data-beyond-aura]', { x: 560, y: 220, duration: 19, ease: 'sine.inOut' }, 0)
        .to('[data-beyond-aura]', { opacity: 0.9, duration: 9.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => (isActive ? aura.play() : aura.pause()),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label={beyond.headline} className="relative overflow-hidden bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 40% at 78% 12%, color-mix(in srgb, var(--violet-500) 11%, transparent), transparent 72%)',
        }}
      />
      {/* the drifting aura — nested so GSAP owns its transform outright */}
      <span aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[22%] h-[620px] w-[900px]">
        <span
          data-beyond-aura=""
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--violet-500) 15%, transparent), transparent 76%)',
          }}
        />
      </span>
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="t-eyebrow t-eyebrow-ondark">{beyond.eyebrow}</p>
            </Reveal>
            <RevealText text={beyond.headline} as="h2" className="t-display ondark-heading mt-3 max-w-[15ch]" />
          </div>
          <Reveal delay={0.1} className="flex flex-col gap-3">
            {beyond.description.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[54ch] text-ondark-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-14 lg:gap-20">
          {beyond.groups.map((group, i) => (
            <CapabilityGroup key={group.name} group={group} flipped={i % 2 === 1} />
          ))}
        </div>

        {/* the focused practices — one or two capabilities each, so they are
            connected into a constellation rather than given a band apiece */}
        {beyond.focus && <HubFocusCluster groups={beyond.focus} />}
      </Container>
    </section>
  );
}
