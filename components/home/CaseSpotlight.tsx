'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { caseSpotlight } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

/**
 * Case-study chapter — one story told properly: Challenge → Approach →
 * Solution → Outcome as a connected flow. A hairline draws across the four
 * phases as the reader scrolls; the outcome phase carries the tint and the
 * headline metric.
 */
export function CaseSpotlight() {
  const flowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: flow, start: 'top 80%', end: 'bottom 55%', scrub: true },
        }
      );
    }, flow);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Case study" className="relative z-10">
      <Container className="py-section">
        <div className="mb-10 grid items-end gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal>
              <p className="t-eyebrow">Case study</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-2 max-w-[620px]">{caseSpotlight.title}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-caption mt-2">
                {caseSpotlight.client} · {caseSpotlight.industry}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:justify-self-end lg:text-right">
            <p className="font-display text-[clamp(3rem,6vw,4.5rem)] font-extrabold leading-none text-primary">
              {caseSpotlight.metric.value}
            </p>
            <p className="t-caption mt-1">{caseSpotlight.metric.label}</p>
          </Reveal>
        </div>

        <div ref={flowRef} className="relative">
          {/* connector that draws with scroll */}
          <span aria-hidden="true" className="absolute left-0 top-[5px] hidden h-px w-full bg-line lg:block">
            <span ref={lineRef} className="absolute inset-0 origin-left bg-primary" />
          </span>
          <Reveal stagger="cards" className="grid gap-6 lg:grid-cols-4 lg:gap-5">
            {caseSpotlight.phases.map((phase, i) => (
              <div key={phase.phase} className="relative lg:pt-5">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 hidden h-[11px] w-[11px] rounded-full border-2 lg:block ${
                    i === caseSpotlight.phases.length - 1
                      ? 'border-primary bg-primary'
                      : 'border-primary bg-canvas'
                  }`}
                />
                <p className="t-micro text-primary">{phase.phase}</p>
                <p className={`mt-2 ${i === caseSpotlight.phases.length - 1 ? 'text-heading' : 'text-muted'}`}>
                  {phase.text}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-8">
          <Button href="/case-studies" variant="ghost" iconRight="arrowRight">
            More Case Studies
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
