import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ds/Button';
import { HubEcosystem } from './HubEcosystem';
import { HubJumpButton } from './HubJumpButton';
import type { HubHeroContent } from '@/types/services-hub';

/**
 * Hub hero — a centred POSTER composition, deliberately unlike the seven service
 * pages (all of which run a copy column beside their artwork). The statement
 * is set centre-stage and the connected-ecosystem diagram is the stage itself,
 * opening beneath the copy and bleeding into the section below.
 */
export function HubHero({ hero }: { hero: HubHeroContent }) {
  return (
    <section aria-label={hero.eyebrow} className="relative overflow-hidden bg-dark text-ondark">
      {/* warm stage tint — the hub's own orange, top-lit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 8%, color-mix(in srgb, var(--violet-500) 15%, transparent), transparent 70%), radial-gradient(45% 40% at 12% 78%, color-mix(in srgb, var(--blue-500) 9%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative pt-[128px] lg:pt-[132px]">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{hero.eyebrow}</p>
          </Reveal>
          <RevealText text={hero.headline} as="h1" className="t-hero ondark-heading mx-auto mt-4 max-w-[18ch]" immediate />
          <Reveal delay={0.3} className="mx-auto mt-6 flex max-w-[68ch] flex-col gap-4">
            {hero.description.map((p) => (
              <p key={p.slice(0, 24)} className="text-ondark-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <HubJumpButton targetId={hero.primaryCta.href.replace('#', '')}>
                {hero.primaryCta.label}
              </HubJumpButton>
              <Button href={hero.secondaryCta.href} size="lg" variant="outlineDark">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* the ecosystem stage — the artwork opens under the statement */}
      <div className="relative mx-auto mt-2 w-full max-w-[520px] px-gutter sm:mt-4">
        <HubEcosystem className="w-full" />
        {/* soft floor so the diagram dissolves into the section beneath */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-dark))' }}
        />
      </div>
    </section>
  );
}
