import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Icon } from '@/components/ds/Icon';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { cn } from '@/lib/utils';
import type { AboutExpertise, AboutExpertiseContent } from '@/types/about';

/**
 * One practice. The whole card is the link, and hover does three quiet things
 * at once: the card lifts, the icon tile takes the brand colour, and the arrow
 * steps right. No JavaScript — CSS transitions only.
 *
 * The outer div is the <Reveal stagger> child: GSAP leaves an inline transform
 * on what it animates, which would beat the card's hover translate.
 */
function ExpertiseCard({ item, className }: { item: AboutExpertise; className?: string }) {
  return (
    <div className={cn('h-full', className)}>
      <Link
        href={`/services/${item.slug}`}
        className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-line-strong hover:no-underline hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-primary-soft text-primary transition-colors duration-[var(--duration-base)] group-hover:border-transparent group-hover:bg-primary group-hover:text-white">
            <ServiceIcon name={item.icon} size={20} />
          </span>
          <span className="font-mono text-[11px] tracking-[.16em] text-muted">{item.index}</span>
        </div>

        <h3 className="t-h4 mt-5 text-heading">{item.name}</h3>
        <p className="mt-2.5 text-[length:var(--text-body-sm-size)] leading-relaxed text-muted">{item.blurb}</p>

        <ul className="mb-6 mt-5 flex flex-wrap gap-1.5">
          {item.capabilities.map((capability) => (
            <li
              key={capability}
              className="rounded-full border border-line bg-sunken px-3 py-1 text-[length:var(--text-caption-size)] text-body"
            >
              {capability}
            </li>
          ))}
        </ul>

        {/* mt-auto pins the action to the bottom edge — grid rows stretch, so the
            cards in a row stay one height even when their blurbs differ */}
        <span className="mt-auto flex items-center gap-1.5 border-t border-line pt-5 text-[length:var(--text-body-sm-size)] font-semibold text-primary">
          Explore practice
          <span className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1">
            <Icon name="arrowRight" size={16} />
          </span>
        </span>
      </Link>
    </div>
  );
}

/**
 * Our expertise — the seven practices our people came from, each opening its own
 * service page. A plain three-track grid: the point of this section is legibility
 * and breadth, not choreography.
 */
export function AboutExpertise({ content }: { content: AboutExpertiseContent }) {
  return (
    <section aria-label={content.eyebrow} className="relative bg-canvas py-section">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
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
              <p className="t-body-lg mt-5 max-w-[58ch] text-muted">{content.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="shrink-0">
            <Link
              href={content.cta.href}
              className="link-underline inline-flex items-center gap-1.5 text-[length:var(--text-body-sm-size)] font-semibold text-primary"
            >
              {content.cta.label}
              <Icon name="arrowUpRight" size={16} />
            </Link>
          </Reveal>
        </div>

        <Reveal stagger="cards" className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:auto-rows-fr lg:grid-cols-3">
          {content.items.map((item, i) => (
            <ExpertiseCard
              key={item.slug}
              item={item}
              /* a three-track final row carrying one practice is centred
                 rather than left hanging under the first column */
              className={
                i === content.items.length - 1 && content.items.length % 3 === 1
                  ? 'lg:col-start-2'
                  : undefined
              }
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
