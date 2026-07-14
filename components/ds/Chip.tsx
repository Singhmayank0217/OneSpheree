import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';

/** DS Chip port — pill label, optional active + removable states. */
export function Chip({
  children,
  active,
  onRemove,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] rounded-full border px-[12px] py-[6px] text-[length:var(--text-body-sm-size)] font-medium',
        active ? 'border-primary bg-primary text-white' : 'border-line bg-card text-body',
        className
      )}
    >
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove" className="inline-flex cursor-pointer">
          <Icon name="x" size={13} />
        </button>
      )}
    </span>
  );
}
