import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';

/** Eyebrow + heading + optional lede, with the DS reveal treatment. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  onDark,
  align = 'start',
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  onDark?: boolean;
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <Reveal className={cn('flex flex-col gap-2 max-w-[720px]', align === 'center' && 'items-center text-center mx-auto', className)}>
      {eyebrow && <p className={cn('t-eyebrow', onDark && 't-eyebrow-ondark')}>{eyebrow}</p>}
      <h2 className={cn('t-display', onDark && 'text-ondark')}>{title}</h2>
      {lede && <p className={cn('t-body-lg', onDark ? 'text-ondark-muted' : 'text-muted')}>{lede}</p>}
    </Reveal>
  );
}
