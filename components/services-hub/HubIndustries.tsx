'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { cn } from '@/lib/utils';
import type { HubIndustry } from '@/types/services-hub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Industries We Serve — composition: EXPANDING PANELS. Eight vertical panels
 * stand side by side like spines on a shelf; the selected one opens and the
 * rest recede, so the section holds a lot of content in one screen and rewards
 * exploration. Selection follows hover and keyboard focus, and clicking works
 * on touch. Below the large breakpoint the panels unstack into a plain
 * readable list — no interaction required to read anything.
 */
export function HubIndustries({
  eyebrow,
  headline,
  intro,
  items,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  items: HubIndustry[];
}) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail.children,
        { opacity: 0, y: 26, scaleY: 0.94 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          transformOrigin: 'bottom center',
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: rail, start: 'top 82%', once: true },
        }
      );
    }, rail);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <Container className="relative border-t border-line-dark py-section">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="t-eyebrow t-eyebrow-ondark">{eyebrow}</p>
            </Reveal>
            <RevealText text={headline} as="h2" className="t-display ondark-heading mt-3 max-w-[12ch]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[52ch] text-ondark-muted">{intro}</p>
          </Reveal>
        </div>

        <div ref={railRef} className="mt-12 flex flex-col gap-2 lg:h-[420px] lg:flex-row">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  // NOTE: DS spacing is generous (p-6 = 48px), and padding is not
                  // compressible — with eight panels it would lock up most of the
                  // row and flatten the expansion. Collapsed panels therefore run
                  // a tighter horizontal padding, and the ratio is 6:1.
                  'group relative overflow-hidden rounded-lg border p-5 text-left transition-[flex-grow,padding,border-color,background-color] duration-[560ms] ease-[var(--ease-out)] lg:min-w-0 lg:py-6',
                  isActive
                    ? 'border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] bg-[rgba(255,255,255,.05)] lg:flex-[6] lg:px-6'
                    : 'border-line-dark bg-[rgba(255,255,255,.02)] lg:flex-[1] lg:px-4'
                )}
              >
                {/* accent wash on the open panel */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 transition-opacity duration-[560ms]',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{
                    background:
                      'radial-gradient(90% 70% at 15% 100%, color-mix(in srgb, var(--violet-500) 20%, transparent), transparent 72%)',
                  }}
                />

                <span className="relative flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2.5">
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors duration-[var(--duration-base)]',
                      isActive
                        ? 'bg-[color-mix(in_srgb,var(--violet-500)_28%,transparent)] text-[var(--violet-200)]'
                        : 'bg-[rgba(255,255,255,.06)] text-[var(--violet-300)]'
                    )}
                  >
                    <ServiceIcon name={item.icon} size={17} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[.12em] text-ondark-muted">{item.index}</span>
                </span>

                {/* collapsed spine label (large screens only) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-6 left-1/2 hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[.14em] text-ondark-muted transition-opacity duration-300 lg:block',
                    isActive && 'opacity-0'
                  )}
                  style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)' }}
                >
                  {item.name}
                </span>

                {/* open content — always readable below lg */}
                <span
                  className={cn(
                    'relative mt-4 block lg:absolute lg:inset-x-6 lg:bottom-6 lg:mt-0 lg:transition-opacity lg:duration-[420ms]',
                    isActive ? 'lg:opacity-100' : 'lg:pointer-events-none lg:opacity-0'
                  )}
                >
                  <span className="t-h4 ondark-heading block">{item.name}</span>
                  <span className="mt-2 block max-w-[34ch] text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
                    {item.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
