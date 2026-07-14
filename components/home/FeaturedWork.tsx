'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { featuredProjects, type Project } from '@/data/projects';
import { DURATION, EASE } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const TILE_BG = {
  brand: 'linear-gradient(135deg, var(--violet-500), var(--blue-500))',
  violet: 'linear-gradient(150deg, var(--violet-600), var(--violet-900))',
  blue: 'linear-gradient(140deg, var(--blue-500), var(--blue-700))',
} as const;

/**
 * One work tile: masked scale-in reveal on scroll, gentle grow on hover.
 * The gradient composition is a placeholder for the named image slot
 * (project.imageSlot) — photography drops in without layout changes.
 */
function WorkTile({ project, tall }: { project: Project; tall?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block hover:no-underline"
      aria-label={`${project.title} — view project`}
    >
      <div className={`relative overflow-hidden rounded-xl ${tall ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}>
        <div
          data-work-visual=""
          data-image-slot={project.imageSlot}
          className="absolute inset-0 transition-transform duration-[var(--duration-page)] ease-[var(--ease-out)] group-hover:scale-[1.04]"
          style={{ backgroundImage: TILE_BG[project.tint] }}
        >
          {/* abstract composition until photography lands in the named slot */}
          <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[rgba(255,255,255,.25)]" />
          <span className="absolute bottom-[30%] left-[8%] h-px w-1/3 bg-[rgba(255,255,255,.35)]" />
          <span className="absolute right-[14%] top-[38%] h-16 w-12 rounded-md bg-[rgba(255,255,255,.12)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--overlay-scrim)_0%,transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 p-3 text-ondark lg:p-4">
          <p className="t-micro text-ondark-muted">
            {project.service} · {project.location} · {project.year}
          </p>
          <h3 className="t-h4 ondark-heading mt-1 max-w-[420px]">{project.title}</h3>
          <p className="mt-2 flex items-baseline gap-1.5 opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100">
            <span className="font-display text-[1.375rem] font-bold text-ondark">{project.metric.value}</span>
            <span className="t-caption text-ondark-muted">{project.metric.label}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/**
 * Featured work chapter — asymmetric editorial composition: one wide feature,
 * two offset tiles at staggered baselines, visuals mask-reveal with a scale
 * settle as they enter.
 */
export function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-work-visual]', el).forEach((visual) => {
        gsap.fromTo(
          visual,
          { scale: 1.14 },
          {
            scale: 1,
            duration: DURATION.pageIntro,
            ease: EASE.reveal,
            scrollTrigger: { trigger: visual, start: 'top 90%', once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Featured work">
      <Container className="py-section">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Reveal>
              <p className="t-eyebrow">Featured work</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-2 max-w-[520px]">Delivery you can walk through.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Button href="/work" variant="secondary" iconRight="arrowRight">
              View Work
            </Button>
          </Reveal>
        </div>

        <div ref={ref} className="grid gap-4 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <WorkTile project={featuredProjects[0]} />
          </Reveal>
          <Reveal delay={0.1}>
            <WorkTile project={featuredProjects[1]} tall />
          </Reveal>
          <Reveal delay={0.2} className="lg:mt-16">
            <WorkTile project={featuredProjects[2]} tall />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
