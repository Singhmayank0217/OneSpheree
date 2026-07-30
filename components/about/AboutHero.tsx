import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Parallax } from '@/components/animations/Parallax';
import { Button } from '@/components/ds/Button';
import type { AboutHeroContent } from '@/types/about';

/**
 * About hero — a quiet, premium opening on deep navy.
 *
 * Motion is deliberately restrained: the statement arrives as a masked reveal,
 * one line at a time (the shared RevealText), the lede and actions follow on a
 * short delay, and the two light blooms behind everything drift on a capped
 * parallax. Nothing is pinned and nothing is scrubbed.
 */
export function AboutHero({ hero }: { hero: AboutHeroContent }) {
  return (
    <section aria-label={hero.eyebrow} className="relative overflow-hidden bg-dark text-ondark">
      {/* premium lighting — two soft blooms on their own plane */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Parallax speed={-0.4} className="absolute inset-0">
          <span
            className="absolute -left-[12%] -top-[18%] h-[70vh] w-[70vh]"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--violet-500) 30%, transparent), transparent 68%)',
            }}
          />
        </Parallax>
        <Parallax speed={0.35} className="absolute inset-0">
          <span
            className="absolute -right-[10%] top-[24%] h-[62vh] w-[62vh]"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--blue-500) 22%, transparent), transparent 70%)',
            }}
          />
        </Parallax>
        {/* a fine grid, barely there — gives the navy some structure */}
        <span
          className="absolute inset-0 opacity-[.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px)',
            backgroundSize: '76px 76px',
            maskImage: 'radial-gradient(80% 70% at 50% 40%, #000, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(80% 70% at 50% 40%, #000, transparent 78%)',
          }}
        />
      </div>

      <Container className="relative flex min-h-[88svh] flex-col justify-center pb-20 pt-[152px] lg:pb-24">
        <Reveal className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="block h-[6px] w-[6px] rounded-full"
            style={{ background: 'var(--accent-orange)' }}
          />
          <p className="t-eyebrow t-eyebrow-ondark">{hero.eyebrow}</p>
        </Reveal>

        {/* The type scale lives on the <h1> and the lines inherit it. It must:
            `max-w` is in `ch`, and ch resolves against the element's OWN
            font-size — on a bare <h1> that is the inherited 16px body font, so
            the measure would come out ~5x too narrow and every line would wrap. */}
        <h1 className="mt-7 max-w-[19ch] font-display text-[clamp(2.5rem,6.4vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-.025em] text-[var(--ink-0)]">
          {hero.lines.map((line, i) => (
            <RevealText key={line} text={line} as="span" immediate delay={0.15 + i * 0.14} className="block" />
          ))}
        </h1>

        <Reveal delay={0.6} className="mt-8 max-w-[62ch]">
          <p className="t-body-lg text-ondark-muted">{hero.lede}</p>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} size="lg" iconRight="arrowRight">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="outlineDark">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-line-dark pt-7 lg:mt-20">
          <Reveal stagger="stats" className="grid gap-7 sm:grid-cols-3">
            {hero.facts.map((fact) => (
              <div key={fact.label}>
                <p className="font-display text-[1.625rem] font-bold leading-none text-[var(--ink-0)]">
                  {fact.value}
                </p>
                <p className="mt-2 text-[length:var(--text-body-sm-size)] leading-snug text-ondark-muted">
                  {fact.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
