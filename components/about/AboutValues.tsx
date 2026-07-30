import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import type { AboutValuesContent } from '@/types/about';

/**
 * Company values — the quietest section on the page, and deliberately so: no
 * cards, no shadows, no icons. Six values on a hairline grid, each numbered in
 * the brand orange (the one place the accent appears at any size). Hover fills
 * the hairline with the brand gradient — the whole interaction.
 */
export function AboutValues({ content }: { content: AboutValuesContent }) {
  return (
    <section aria-label={content.eyebrow} className="relative bg-canvas pb-section">
      <Container>
        <div className="max-w-[680px] border-t border-line pt-section">
          <Reveal className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="block h-[6px] w-[6px] rounded-full"
              style={{ background: 'var(--accent-orange)' }}
            />
            <p className="t-eyebrow">{content.eyebrow}</p>
          </Reveal>
          <RevealText text={content.headline} as="h2" className="t-display mt-5" />
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 max-w-[56ch] text-muted">{content.intro}</p>
          </Reveal>
        </div>

        <Reveal stagger="cards" className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {content.values.map((value) => (
            <div key={value.index} className="group">
              <span aria-hidden="true" className="block h-[2px] w-full bg-line">
                <span className="block h-full origin-left scale-x-[.22] bg-brand transition-transform duration-[520ms] ease-[var(--ease-out)] group-hover:scale-x-100" />
              </span>
              <p
                className="mt-5 font-mono text-[11px] tracking-[.18em]"
                style={{ color: 'var(--accent-orange)' }}
              >
                {value.index}
              </p>
              <h3 className="t-h4 mt-3">{value.title}</h3>
              <p className="mt-2.5 max-w-[38ch] text-[length:var(--text-body-sm-size)] leading-relaxed text-muted">
                {value.blurb}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
