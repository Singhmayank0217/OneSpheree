import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Icon } from '@/components/ds/Icon';
import type { AboutReasonsContent } from '@/types/about';

/**
 * Why businesses choose OneSpheree — the second navy band, and the page's one
 * moment of contrast in the middle of the light half.
 *
 * An editorial two-column: the claim on the left, the four reasons as hairline
 * rows on the right. Rows are not cards and do not lift; hovering brightens the
 * row and steps its rule, which is enough on a dark surface.
 */
export function AboutReasons({ content }: { content: AboutReasonsContent }) {
  return (
    <section aria-label={content.eyebrow} className="relative overflow-hidden bg-dark text-ondark">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(65% 55% at 18% 12%, color-mix(in srgb, var(--violet-500) 18%, transparent), transparent 72%), radial-gradient(55% 50% at 92% 88%, color-mix(in srgb, var(--blue-500) 14%, transparent), transparent 74%)',
        }}
      />

      <Container className="relative py-section">
        {/* two explicit tracks — see the note in AboutIntro on why not cols-12 */}
        <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-10">
          <div>
            <Reveal className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block h-[6px] w-[6px] rounded-full"
                style={{ background: 'var(--accent-orange)' }}
              />
              <p className="t-eyebrow t-eyebrow-ondark">{content.eyebrow}</p>
            </Reveal>
            <RevealText
              text={content.headline}
              as="h2"
              className="t-display ondark-heading mt-5 max-w-[16ch]"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[44ch] text-ondark-muted">{content.intro}</p>
            </Reveal>
          </div>

          <div className="mt-12 lg:mt-0">
            <Reveal stagger="cards" className="flex flex-col">
              {content.reasons.map((reason) => (
                <div key={reason.index} className="group border-t border-line-dark last:border-b">
                  <div className="flex items-start gap-5 py-7 transition-colors duration-[var(--duration-slow)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line-dark bg-[rgba(255,255,255,.04)] text-[var(--blue-300)] transition-colors duration-[var(--duration-base)] group-hover:border-[color-mix(in_srgb,var(--blue-300)_45%,transparent)] group-hover:text-[var(--blue-200)]">
                      <Icon name={reason.icon} size={20} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] tracking-[.16em] text-[var(--blue-300)]">
                          {reason.index}
                        </span>
                        <h3 className="t-h4 ondark-heading">{reason.title}</h3>
                      </div>
                      <p className="mt-2.5 max-w-[52ch] text-[length:var(--text-body-sm-size)] leading-relaxed text-ondark-muted">
                        {reason.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
