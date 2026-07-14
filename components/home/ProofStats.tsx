import { Container } from '@/components/layout/Container';
import { Counter } from '@/components/animations/Counter';
import { Reveal } from '@/components/animations/Reveal';
import { proofStats } from '@/data/stats';

/**
 * Statistics chapter — an editorial proof ledger on the dark surface that
 * began with Global Presence: oversized counters at alternating indents,
 * hairline rhythm, one supporting line each. Not cards.
 */
export function ProofStats() {
  return (
    <section aria-label="Proof in numbers" className="relative bg-dark-tint text-ondark">
      {/* dawn wash — the dark act settles back into the light field below it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] translate-y-full"
        style={{ background: 'linear-gradient(to bottom, var(--surface-dark), transparent)' }}
      />
      <Container className="py-section">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">Proof in numbers</p>
        </Reveal>
        <div className="mt-6">
          {proofStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.05}
              className={`grid items-baseline gap-2 border-t border-line-dark py-5 last:border-b lg:grid-cols-[1fr_1fr] ${
                i % 2 ? 'lg:pl-[12%]' : ''
              }`}
            >
              <p className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold leading-none text-ondark">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <div className="max-w-[380px]">
                <p className="t-h4 ondark-heading">{stat.label}</p>
                <p className="mt-1 text-ondark-muted">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
