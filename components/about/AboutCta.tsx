import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ds/Button';
import type { AboutCtaContent } from '@/types/about';

/**
 * Final CTA — a centred navy band that closes the page.
 *
 * One masked headline, one paragraph, two actions, and a thin brand seam into
 * the footer. The lighting is static: after five sections of reveals, the last
 * thing the page should do is hold still.
 */
export function AboutCta({ cta }: { cta: AboutCtaContent }) {
  return (
    <section aria-label={cta.eyebrow} className="relative overflow-hidden bg-dark text-ondark">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 90% at 50% 108%, color-mix(in srgb, var(--violet-500) 32%, transparent), transparent 70%), radial-gradient(50% 55% at 84% 8%, color-mix(in srgb, var(--blue-500) 16%, transparent), transparent 74%)',
        }}
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-[760px] flex-col items-center py-[104px] text-center lg:py-[136px]">
          <Reveal className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="block h-[6px] w-[6px] rounded-full"
              style={{ background: 'var(--accent-orange)' }}
            />
            <p className="t-eyebrow t-eyebrow-ondark">{cta.eyebrow}</p>
          </Reveal>

          <RevealText
            text={cta.headline}
            as="h2"
            className="t-hero ondark-heading mt-7 max-w-[20ch]"
          />

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-[56ch] text-ondark-muted">{cta.description}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href={cta.primaryCta.href} size="lg" iconRight="arrowRight">
                {cta.primaryCta.label}
              </Button>
              <Button href={cta.secondaryCta.href} size="lg" variant="outlineDark">
                {cta.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* the seam into the footer — navy, soft blue, and a single stroke of orange */}
      <div aria-hidden="true" className="relative flex w-full">
        <span className="h-[3px] flex-[7]" style={{ background: 'var(--gradient-brand)' }} />
        <span className="h-[3px] flex-[1]" style={{ background: 'var(--accent-orange)' }} />
      </div>
    </section>
  );
}
