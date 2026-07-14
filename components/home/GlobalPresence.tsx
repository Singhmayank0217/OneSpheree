'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { offices } from '@/data/offices';
import { DURATION, EASE, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const VIEW = { w: 1000, h: 520 };
const hub = offices.find((o) => o.hub) ?? offices[0];

/** Quadratic arc between two nodes, bowing upward. */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const lift = Math.min(120, Math.abs(x2 - x1) * 0.28 + 30);
  return `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
}

/**
 * Global presence — an original network visualization, not a literal map:
 * a flattened-globe wireframe (graticule ellipses) with office nodes and
 * connection arcs that draw once on entry. Minimal, professional motion.
 */
export function GlobalPresence() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        svg.querySelectorAll('[data-arc]'),
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: DURATION.pageIntro,
          ease: EASE.inOut,
          stagger: STAGGER.images,
          scrollTrigger: { trigger: svg, start: 'top 75%', once: true },
        }
      );
      gsap.fromTo(
        svg.querySelectorAll('[data-node]'),
        { scale: 0, transformOrigin: 'center', opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: DURATION.section / 2,
          ease: EASE.reveal,
          stagger: STAGGER.stats,
          scrollTrigger: { trigger: svg, start: 'top 75%', once: true },
        }
      );
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Global presence" className="relative bg-dark text-ondark">
      {/* dusk wash — the dark act rises out of the light field above it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] -translate-y-full"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-dark))' }}
      />
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div>
            <Reveal>
              <p className="t-eyebrow t-eyebrow-ondark">Global presence</p>
            </Reveal>
            <RevealText text="One standard. Eighteen countries." as="h2" className="t-display ondark-heading mt-2" />
            <Reveal delay={0.15}>
              <p className="t-body-lg mt-3 max-w-[380px] text-ondark-muted">
                Delivery hubs coordinate local teams and partners, so every engagement runs the same way
                everywhere.
              </p>
            </Reveal>
            <Reveal stagger="cards" className="mt-6 flex flex-col">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="flex items-baseline justify-between border-t border-line-dark py-2 last:border-b"
                >
                  <p className="font-semibold text-ondark">
                    {office.city}
                    {office.hub && (
                      <span className="ml-1.5 align-middle font-mono text-[length:var(--text-micro-size)] uppercase tracking-[.08em] text-[var(--blue-300)]">
                        hub
                      </span>
                    )}
                  </p>
                  <p className="t-caption text-ondark-muted">{office.region}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              role="img"
              aria-label="Abstract network of OneSpheree delivery locations connected to the Dubai hub"
              className="w-full"
            >
              {/* flattened-globe wireframe */}
              <g fill="none" stroke="var(--ink-700)" strokeWidth="1" opacity=".7">
                <ellipse cx="500" cy="260" rx="470" ry="215" />
                <ellipse cx="500" cy="260" rx="330" ry="215" />
                <ellipse cx="500" cy="260" rx="160" ry="215" />
                <line x1="30" y1="260" x2="970" y2="260" />
                <path d="M 46 155 Q 500 60 954 155" />
                <path d="M 46 365 Q 500 460 954 365" />
              </g>
              {/* connection arcs from the hub */}
              <g fill="none" stroke="url(#arcGradient)" strokeWidth="1.5">
                {offices
                  .filter((o) => o.city !== hub.city)
                  .map((o) => (
                    <path
                      key={o.city}
                      data-arc=""
                      d={arcPath(hub.x, hub.y, o.x, o.y)}
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={1}
                    />
                  ))}
              </g>
              {/* office nodes */}
              {offices.map((o) => (
                <g key={o.city}>
                  <circle
                    className="node-pulse"
                    cx={o.x}
                    cy={o.y}
                    r={o.hub ? 10 : 7}
                    fill="none"
                    stroke="var(--blue-300)"
                    strokeWidth="1"
                  />
                  <circle data-node="" cx={o.x} cy={o.y} r={o.hub ? 5 : 3.5} fill="var(--blue-300)" />
                  <text
                    x={o.x + 12}
                    y={o.y + 4}
                    fill="var(--text-on-dark-muted)"
                    fontSize="15"
                    fontFamily="var(--font-mono)"
                  >
                    {o.city}
                  </text>
                </g>
              ))}
              <defs>
                <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--violet-500)" />
                  <stop offset="100%" stopColor="var(--blue-500)" />
                </linearGradient>
              </defs>
            </svg>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
