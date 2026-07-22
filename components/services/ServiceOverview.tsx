import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { ServiceIcon } from './ServiceIcon';
import type { ServiceOverviewContent } from '@/types/service-page';

/** Wrap each highlight phrase of the statement in brand color. */
function renderStatement(statement: string, highlights: string[]): ReactNode[] {
  let parts: ReactNode[] = [statement];
  highlights.forEach((phrase, hi) => {
    parts = parts.flatMap((part): ReactNode[] => {
      if (typeof part !== 'string' || !part.includes(phrase)) return [part];
      const [before, ...rest] = part.split(phrase);
      return [
        before,
        <span key={`h${hi}`} className="text-[var(--violet-300)]">
          {phrase}
        </span>,
        rest.join(phrase),
      ];
    });
  });
  return parts;
}

/**
 * Overview — the editorial bridge between the hero and the service sections.
 * A large statement with brand-lit phrases, a supporting line, and the four
 * division pillars as a bordered rail. Distinct composition from the hero:
 * centered editorial column over a hairline grid.
 */
export function ServiceOverview({ overview }: { overview: ServiceOverviewContent }) {
  return (
    <section id="overview" aria-label="Division overview" className="relative bg-dark text-ondark">
      <Container narrow className="relative py-section">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark text-center">{overview.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-h1 ondark-heading mx-auto mt-4 max-w-[24ch] text-center font-display">
            {renderStatement(overview.statement, overview.highlights)}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-[62ch] text-center text-ondark-muted">{overview.support}</p>
        </Reveal>
      </Container>

      <Container className="pb-section">
        <Reveal stagger="cards" className="grid gap-px overflow-hidden rounded-xl border border-line-dark bg-[rgba(255,255,255,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {overview.pillars.map((p) => (
            <div key={p.label} className="flex flex-col gap-2 bg-dark p-4 lg:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_18%,transparent)] text-[var(--violet-300)]">
                <ServiceIcon name={p.icon} size={19} />
              </span>
              <p className="mt-1 font-display text-[1.0625rem] font-bold text-ondark">{p.label}</p>
              <p className="text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-ondark-muted">
                {p.blurb}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
