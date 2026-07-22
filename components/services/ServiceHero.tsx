import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ds/Button';
import { EcosystemIllustration } from './EcosystemIllustration';
import type { ServicePageHero } from '@/types/service-page';

/**
 * Service-page hero — dark opening chapter (Apple-product-page pacing):
 * editorial copy column beside the hero artwork, staged entrance via the
 * shared reveal primitives. Blueprint component: all copy arrives via data,
 * and `visual` lets each service supply its own illustration (defaults to the
 * Digital Marketing ecosystem so that page is unchanged).
 */
export function ServiceHero({ hero, visual }: { hero: ServicePageHero; visual?: ReactNode }) {
  return (
    <section aria-label={hero.eyebrow} className="relative bg-dark text-ondark">
      {/* stage tint — same visual language as the homepage dark chapters */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 75% 30%, color-mix(in srgb, var(--violet-500) 16%, transparent), transparent 70%), radial-gradient(50% 45% at 15% 80%, color-mix(in srgb, var(--blue-500) 10%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative grid items-center gap-10 pb-section-sm pt-[128px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-0 lg:pt-[96px] lg:min-h-svh">
        <div className="max-w-[640px]">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{hero.eyebrow}</p>
          </Reveal>
          <RevealText text={hero.headline} as="h1" className="t-hero ondark-heading mt-3" immediate />
          <Reveal delay={0.25} className="mt-6 flex max-w-[560px] flex-col gap-4">
            {hero.description.map((p) => (
              <p key={p.slice(0, 24)} className="text-ondark-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button href={hero.primaryCta.href} iconRight="arrowRight">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outlineDark">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          {visual ?? <EcosystemIllustration className="aspect-square w-full" />}
        </Reveal>
      </Container>
    </section>
  );
}
