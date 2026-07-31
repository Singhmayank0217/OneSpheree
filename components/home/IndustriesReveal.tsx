'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { industries } from '@/data/industries';
import { DURATION, EASE } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const TINT_BG = {
  violet: 'linear-gradient(135deg, var(--violet-500), var(--violet-700))',
  blue: 'linear-gradient(135deg, var(--blue-500), var(--blue-700))',
} as const;

/**
 * Industries chapter — no grid. Oversized display rows mask up into view one
 * by one; the active row (hover / focus, first by default) expands via GSAP
 * to reveal the outcome line and a tinted composition band.
 */
export function IndustriesReveal() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [showPhotos, setShowPhotos] = useState(false);

  // The composition band only exists from lg up. Browsers still fetch lazy
  // images inside a `display:none` branch, so the photography is mounted only
  // once the viewport actually qualifies — phones never pay for it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setShowPhotos(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // masked row reveal on scroll entry
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-industry-name]', list).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: DURATION.section,
            ease: EASE.reveal,
            scrollTrigger: { trigger: el.parentElement, start: 'top 88%', once: true },
          }
        );
      });
    }, list);
    return () => ctx.revert();
  }, []);

  // GSAP height expansion for the active row's detail panel
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panels = gsap.utils.toArray<HTMLElement>('[data-industry-panel]', list);
    panels.forEach((panel, i) => {
      const open = i === active;
      const photo = panel.querySelector<HTMLElement>('[data-industry-photo]');
      if (reduced) {
        panel.style.height = open ? 'auto' : '0px';
        panel.style.opacity = open ? '1' : '0';
        if (photo) {
          photo.style.opacity = open ? '1' : '0';
          photo.style.transform = 'none';
        }
        return;
      }
      gsap.to(panel, {
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
        duration: DURATION.section / 2,
        ease: EASE.out,
        overwrite: 'auto',
      });
      // the photograph rides the same beat: the outgoing one fades and eases
      // back out of its frame while the incoming one settles in — a crossfade
      // between two rows rather than a hard swap
      if (photo) {
        gsap.to(photo, {
          opacity: open ? 1 : 0,
          scale: open ? 1 : 1.06,
          duration: DURATION.section / 2,
          ease: EASE.out,
          overwrite: 'auto',
        });
      }
    });
  }, [active, showPhotos]);

  return (
    <section aria-label="Industries">
      <Container className="py-section">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Reveal>
              <p className="t-eyebrow">Industries</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-2 max-w-[560px]">
                Built for the sectors that run the real economy.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="t-body-lg max-w-[320px] text-muted">
              Six sectors, one delivery standard — move through them.
            </p>
          </Reveal>
        </div>

        <div ref={listRef}>
          {industries.map((industry, i) => (
            <div
              key={industry.slug}
              className="border-t border-line last:border-b"
              onMouseEnter={() => setActive(i)}
            >
              <Link
                href={`/industries/${industry.slug}`}
                onFocus={() => setActive(i)}
                className="group flex items-baseline gap-3 py-3 hover:no-underline lg:gap-5"
              >
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-muted transition-colors duration-[var(--duration-base)] group-hover:text-primary">
                  {industry.index}
                </span>
                <span className="block overflow-hidden">
                  <span
                    data-industry-name=""
                    data-reveal=""
                    className={`block font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.06] tracking-[-.015em] transition-colors duration-[var(--duration-base)] ${
                      active === i ? 'text-heading' : 'text-[var(--ink-300)]'
                    } group-hover:text-heading`}
                  >
                    {industry.name}
                  </span>
                </span>
              </Link>
              <div data-industry-panel="" className="h-0 overflow-hidden opacity-0">
                <div className="grid gap-4 pb-5 pl-[calc(3rem+12px)] lg:grid-cols-[1fr_280px] lg:items-center">
                  <p className="t-body-lg max-w-[480px] text-muted">{industry.outcome}</p>
                  <div
                    aria-hidden="true"
                    className="relative hidden h-20 overflow-hidden rounded-lg lg:block"
                    style={{ backgroundImage: TINT_BG[industry.tint] }}
                  >
                    {/* the sector photograph; the brand tint stays underneath
                        as the surface it loads onto */}
                    {showPhotos && (
                      <div
                        data-industry-photo=""
                        className="absolute inset-0 opacity-0"
                        style={{ transform: 'scale(1.06)' }}
                      >
                        <Image
                          src={industry.image}
                          alt={industry.imageAlt}
                          fill
                          sizes="280px"
                          quality={90}
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
