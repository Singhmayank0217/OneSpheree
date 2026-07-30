import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import type { AboutIntroContent } from '@/types/about';

/**
 * Who we are — the honest introduction: a young company, experienced people.
 *
 * A two-column editorial: the argument on the left, the three beliefs it rests
 * on stacked as hairline rows on the right. Opaque canvas, so the page's own
 * navy identity is not tinted by the global light field behind it.
 */
export function AboutIntro({ intro }: { intro: AboutIntroContent }) {
  return (
    <section aria-label={intro.eyebrow} className="relative bg-canvas py-section">
      <Container>
        {/* An explicit two-track grid, not grid-cols-12: the DS remaps Tailwind's
            spacing scale, so a gap on a twelve-track grid is applied eleven
            times (gap-x-16 is 128px here, not 64px) and blows the container out.
            minmax(0,…) keeps a long word from widening a track. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-10">
          <div>
            <Reveal className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block h-[6px] w-[6px] rounded-full"
                style={{ background: 'var(--accent-orange)' }}
              />
              <p className="t-eyebrow">{intro.eyebrow}</p>
            </Reveal>

            <RevealText text={intro.headline} as="h2" className="t-display mt-5 max-w-[24ch]" />

            <Reveal delay={0.1} className="mt-7 flex flex-col gap-5">
              {intro.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="t-body-lg max-w-[62ch] text-body">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <div className="mt-14 lg:mt-0">
            <Reveal stagger="cards" className="flex flex-col">
              {intro.points.map((point, i) => (
                <div
                  key={point.title}
                  className="group border-t border-line py-6 last:border-b first:pt-0 lg:first:pt-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[.16em] text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="t-h4">{point.title}</h3>
                      <p className="mt-2 text-[length:var(--text-body-sm-size)] leading-relaxed text-muted">
                        {point.blurb}
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
