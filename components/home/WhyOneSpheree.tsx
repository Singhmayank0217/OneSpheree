import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { whyEntries } from '@/data/why';

/**
 * Why chapter — an editorial ledger, not icon cards. The heading column stays
 * sticky while six numbered entries pass by on the right; rows respond to
 * hover with an index color shift and a slight title slide (CSS only).
 */
export function WhyOneSpheree() {
  return (
    <section aria-label="Why OneSpheree">
      <Container className="py-section">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="lg:sticky lg:top-[20vh] lg:self-start">
            <Reveal>
              <p className="t-eyebrow">Why OneSpheree</p>
            </Reveal>
            <RevealText
              text="Enterprise scale, without enterprise friction."
              as="h2"
              className="t-display mt-2"
            />
            <Reveal delay={0.15}>
              <p className="t-body-lg mt-3 max-w-[380px] text-muted">
                The reasons clients stay are simpler than the programs we run.
              </p>
            </Reveal>
          </div>

          <Reveal stagger="cards" className="flex flex-col">
            {whyEntries.map((entry) => (
              <div
                key={entry.index}
                className="group grid grid-cols-[3rem_1fr] gap-3 border-t border-line py-4 transition-colors duration-[var(--duration-base)] last:border-b lg:grid-cols-[4rem_1fr_1.2fr]"
              >
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-muted transition-colors duration-[var(--duration-base)] group-hover:text-primary">
                  {entry.index}
                </span>
                <h3 className="t-h3 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:translate-x-1">
                  {entry.title}
                </h3>
                <p className="col-start-2 mt-1 text-muted lg:col-start-3 lg:mt-0">{entry.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
