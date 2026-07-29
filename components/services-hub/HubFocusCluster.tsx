'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { FocusMotif } from './HubFocusMotifs';
import type { HubFocusGroup } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * The focused practices — categories 05-08, each carrying one or two
 * capabilities. A full band per category would hand a single capability the
 * same weight as five, so they are laid out as a CONSTELLATION instead: a 2×2
 * grid whose row and column gaps carry connection lines that expand out from a
 * central junction as you scroll, with a feed line dropping in from the band
 * above. The lines sit exactly in the grid gaps, so they never cross a panel.
 *
 * Panels arrive on a progressive clip wipe rather than a fade-up, and their
 * capability cards wipe in behind them, so the whole cluster resolves
 * top-down instead of everything rising at once.
 */
export function HubFocusCluster({ groups }: { groups: HubFocusGroup[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // the feed line from the band above, then the junction, then the arms —
      // scrubbed, so the reader draws the connections themselves
      gsap.fromTo(
        '[data-feed]',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 92%', end: 'top 62%', scrub: 0.6 },
        }
      );
      gsap.fromTo(
        '[data-junction]',
        { scale: 0 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 70%', end: 'top 58%', scrub: 0.6 },
        }
      );
      gsap.fromTo(
        '[data-link-h]',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'center center',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 66%', end: 'center 62%', scrub: 0.7 },
        }
      );
      gsap.fromTo(
        '[data-link-v]',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'center center',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 66%', end: 'center 62%', scrub: 0.7 },
        }
      );

      // panels resolve with a progressive wipe, not a fade-up
      gsap.fromTo(
        '[data-focus-panel]',
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        }
      );
      gsap.fromTo(
        '[data-focus-cap]',
        { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.09,
          delay: 0.45,
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mt-14 lg:mt-20">
      {/* feed line down from the band above */}
      <span aria-hidden="true" className="absolute -top-14 left-1/2 hidden h-14 w-px -translate-x-1/2 lg:block lg:-top-20 lg:h-20">
        <span data-feed="" className="absolute inset-0 block bg-gradient-to-b from-transparent to-[var(--violet-500)] opacity-70" />
      </span>

      {/* the connection cross — these sit in the row/column gaps */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
        <span data-link-h="" className="absolute inset-0 block bg-gradient-to-r from-transparent via-[var(--violet-500)] to-transparent opacity-60" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block">
        <span data-link-v="" className="absolute inset-0 block bg-gradient-to-b from-transparent via-[var(--violet-500)] to-transparent opacity-60" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span data-junction="" className="block h-2.5 w-2.5 rounded-full bg-brand" />
      </span>

      {/* auto-rows-fr keeps both rows the same height, which is what puts the
          horizontal connector exactly in the row gap — with auto rows the
          taller second row pushes the container's centre line inside a panel */}
      <div className="grid gap-4 lg:auto-rows-fr lg:grid-cols-2 lg:gap-10">
        {groups.map((group) => (
          <article
            key={group.name}
            data-focus-panel=""
            className="group/panel relative flex flex-col overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.025)] p-6 transition-colors duration-[var(--duration-slow)] hover:border-[color-mix(in_srgb,var(--violet-400)_40%,transparent)] lg:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="font-mono text-[11px] tracking-[.14em] text-[var(--violet-300)]">{group.index}</p>
                <h3 className="t-h3 ondark-heading mt-2">{group.name}</h3>
                <p className="mt-3 max-w-[38ch] text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
                  {group.blurb}
                </p>
              </div>
              <div className="h-[92px] w-[92px] shrink-0 lg:h-[104px] lg:w-[104px]">
                <FocusMotif motif={group.motif} />
              </div>
            </div>

            <ul className="mt-auto flex flex-col gap-2.5 pt-7">
              {group.capabilities.map((cap) => (
                <li key={cap.name} data-focus-cap="">
                  <div className="group/cap relative overflow-hidden rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] p-4 transition-[transform,border-color,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-[4px] hover:border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] hover:bg-[rgba(255,255,255,.07)]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover/cap:opacity-100"
                      style={{
                        background:
                          'radial-gradient(100% 100% at 50% 100%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%)',
                      }}
                    />
                    <div className="relative flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-dark bg-[rgba(255,255,255,.05)] text-[var(--violet-300)] transition-colors duration-[var(--duration-base)] group-hover/cap:border-[color-mix(in_srgb,var(--violet-400)_50%,transparent)] group-hover/cap:text-[var(--violet-200)]">
                        <ServiceIcon name={cap.icon} size={17} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-medium leading-snug text-ondark">{cap.name}</h4>
                        <p className="mt-1.5 text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
                          {cap.blurb}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
