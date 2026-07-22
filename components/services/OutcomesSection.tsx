import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Counter } from '@/components/animations/Counter';
import type { OutcomeCard } from '@/types/service-page';

/**
 * Business Outcomes We Deliver — composition L: pure editorial typography,
 * no card chrome, no dashboard styling. A three-column ledger of outcomes:
 * hairline top rules, oversized animated numerals (shared Counter), the
 * outcome as a heading, one measured line beneath. Representative program
 * figures — the measurable feel the brief asks for.
 */
export function OutcomesSection({ headline, cards }: { headline: string; cards: OutcomeCard[] }) {
  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 20% 60%, color-mix(in srgb, var(--blue-500) 10%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <RevealText text={headline} as="h2" className="t-display ondark-heading max-w-[14ch]" />
        <Reveal delay={0.1}>
          <p className="t-caption mt-3 text-ondark-muted">Representative results across active programs</p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={(i % 3) * 0.07} className="border-t border-line-dark pt-5">
              <p className="font-display text-[clamp(2.75rem,5vw,3.75rem)] font-extrabold leading-none">
                <span className="bg-gradient-to-r from-[var(--blue-300)] to-[var(--violet-300)] bg-clip-text text-transparent">
                  {c.stat.prefix}
                  <Counter value={c.stat.value} suffix={c.stat.suffix ?? ''} />
                </span>
              </p>
              <h3 className="mt-3 font-display text-[1.125rem] font-bold text-ondark">{c.label}</h3>
              <p className="mt-1 max-w-[36ch] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-ondark-muted">
                {c.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
