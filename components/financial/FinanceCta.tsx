'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Magnetic } from '@/components/animations/Magnetic';
import { Button } from '@/components/ds/Button';
import type { FinanceCtaSection } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/** Fixed coordinates — the network must render identically on server and client. */
const NODES = [
  { x: 90, y: 120, r: 4 },
  { x: 250, y: 60, r: 3 },
  { x: 210, y: 300, r: 5 },
  { x: 120, y: 470, r: 3 },
  { x: 400, y: 180, r: 4 },
  { x: 380, y: 420, r: 3 },
  { x: 560, y: 90, r: 3 },
  { x: 600, y: 300, r: 5.5 },
  { x: 540, y: 520, r: 3 },
  { x: 760, y: 180, r: 4 },
  { x: 800, y: 430, r: 3 },
  { x: 950, y: 110, r: 3 },
  { x: 980, y: 320, r: 5 },
  { x: 1120, y: 220, r: 3 },
  { x: 1080, y: 500, r: 4 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 4],
  [2, 4],
  [2, 3],
  [3, 5],
  [4, 6],
  [4, 5],
  [5, 7],
  [6, 7],
  [7, 9],
  [5, 8],
  [8, 10],
  [9, 10],
  [9, 11],
  [10, 12],
  [11, 12],
  [12, 13],
  [12, 14],
];

/**
 * The closing backdrop: a financial network, drawn once and then kept alive by
 * pulses moving between nodes. It is slow on purpose — this is the section a
 * reader stops at, so the motion has to sit behind the words rather than pull
 * against them.
 */
function NetworkBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      tl.fromTo(
        '[data-fc-edge]',
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.035 }
      ).fromTo(
        '[data-fc-dot]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.04, transformOrigin: '50% 50%' },
        '-=0.7'
      );

      gsap.to('[data-fc-dot]', {
        opacity: 0.55,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.22, from: 'random' },
        delay: 1.4,
      });

      gsap.utils.toArray<SVGPathElement>('[data-fc-pulse]').forEach((pulse, i) => {
        const len = pulse.getTotalLength();
        gsap.set(pulse, { strokeDasharray: `14 ${len}` });
        gsap.fromTo(
          pulse,
          { strokeDashoffset: len + 14 },
          { strokeDashoffset: 0, duration: 3.2, ease: 'none', repeat: -1, delay: 0.9 + i * 0.75 }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="h-full w-full opacity-[.55]"
      >
        <g stroke="rgba(255,255,255,.14)" strokeWidth="1">
          {EDGES.map(([a, b], i) => (
            <line key={i} data-fc-edge="" x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>

        {/* the four routes that carry a pulse */}
        <g stroke="var(--blue-300)" strokeWidth="2" strokeLinecap="round" fill="none">
          {[
            [0, 2, 4, 6, 7],
            [3, 5, 8, 10, 12],
            [7, 9, 11, 12],
            [12, 13],
          ].map((route, i) => (
            <path
              key={i}
              data-fc-pulse=""
              d={route.map((n, k) => `${k === 0 ? 'M' : 'L'}${NODES[n].x} ${NODES[n].y}`).join(' ')}
            />
          ))}
        </g>

        <g fill="var(--blue-300)">
          {NODES.map((node, i) => (
            <circle key={i} data-fc-dot="" cx={node.x} cy={node.y} r={node.r} />
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * Final call to action — the page's last chapter.
 *
 * Deep emerald light, the network behind it, one statement and two magnetic
 * actions. It is the only section on the page with no list, no grid and no
 * data panel: everything here points at starting the conversation.
 */
export function FinanceCta({ content }: { content: FinanceCtaSection }) {
  return (
    <section
      id="financial-cta"
      aria-label="Speak to the financial and compliance team"
      className="relative scroll-mt-[88px] overflow-hidden border-t border-line-dark bg-dark text-ondark"
    >
      {/* the emerald wash this section closes on */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 120%, color-mix(in srgb, var(--violet-500) 55%, transparent), transparent 72%), radial-gradient(46% 44% at 12% 6%, color-mix(in srgb, var(--violet-400) 22%, transparent), transparent 70%)',
        }}
      />

      <NetworkBackdrop />

      <Container className="relative py-section">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-[color-mix(in_srgb,var(--blue-300)_50%,transparent)]" />
              <p className="t-eyebrow t-eyebrow-ondark">Financial &amp; Compliance Services</p>
              <span aria-hidden="true" className="h-px w-10 bg-[color-mix(in_srgb,var(--blue-300)_50%,transparent)]" />
            </div>
          </Reveal>

          <RevealText text={content.headline} as="h2" className="t-display ondark-heading mt-6 font-display" />

          <Reveal delay={0.15} className="mx-auto mt-6 flex max-w-[68ch] flex-col gap-4">
            {content.description.map((p) => (
              <p key={p.slice(0, 24)} className="t-body-lg text-ondark-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button href={content.primaryCta.href} size="lg" iconRight="arrowRight">
                  {content.primaryCta.label}
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={content.secondaryCta.href} size="lg" variant="outlineDark">
                  {content.secondaryCta.label}
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
