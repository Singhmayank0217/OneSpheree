import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { FeatureCard } from '@/types/service-page';

/**
 * Why Businesses Choose OneSpheree — composition J: a BENTO of feature
 * cards. The two flagship advantages span wide across the top; six more
 * complete the field below. Every card is its own Reveal (independent
 * trigger, per the brief), carries an icon, title, short explanation, and a
 * ghost numeral watermark; hover lifts the hairline to brand.
 */
export function WhySection({ headline, features }: { headline: string; features: FeatureCard[] }) {
  return (
    <section aria-label={headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 75% 70%, color-mix(in srgb, var(--blue-500) 11%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <RevealText text={headline} as="h2" className="t-display ondark-heading max-w-[16ch]" />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 0.06}
              className={f.featured ? 'lg:col-span-3' : 'lg:col-span-2'}
            >
              <div className="group relative h-full overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.035)] p-5 transition-colors duration-[var(--duration-base)] hover:border-[color-mix(in_srgb,var(--blue-400)_55%,transparent)] lg:p-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-display text-[5rem] font-extrabold leading-none text-transparent opacity-60"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,.07)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex h-10 w-10 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--blue-500)_16%,transparent)] text-[var(--blue-300)]">
                  <ServiceIcon name={f.icon} size={19} />
                </span>
                <h3 className="relative mt-4 font-display text-[1.125rem] font-bold text-ondark">
                  {f.title}
                </h3>
                <p className="relative mt-1.5 max-w-[40ch] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-ondark-muted">
                  {f.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
