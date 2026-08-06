import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { cn } from '@/lib/utils';
import type { FinanceSectionHeader } from '@/types/financial';

/**
 * The chapter header every Milestone 2 section opens with — numeral, rule,
 * eyebrow, headline, intro. One component so the seven divisions keep identical
 * vertical rhythm and type scale while their layouts below diverge completely.
 */
export function FinanceSectionHead({
  header,
  className,
  headingClassName,
  as = 'h2',
}: {
  header: FinanceSectionHeader;
  className?: string;
  headingClassName?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-[720px]', className)}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[length:var(--text-body-sm-size)] tracking-[.18em] text-[var(--blue-300)]">
            {header.index}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-[color-mix(in_srgb,var(--blue-300)_50%,transparent)]" />
          <p className="t-eyebrow t-eyebrow-ondark">{header.eyebrow}</p>
        </div>
      </Reveal>

      <RevealText
        text={header.headline}
        as={as}
        className={cn('t-h1 ondark-heading mt-4 font-display', headingClassName)}
      />

      <Reveal delay={0.15} className="mt-5 flex max-w-[62ch] flex-col gap-4">
        {header.intro.map((p) => (
          <p key={p.slice(0, 24)} className="text-ondark-muted">
            {p}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
