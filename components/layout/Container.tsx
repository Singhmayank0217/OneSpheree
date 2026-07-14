import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  narrow,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn('mx-auto w-full px-gutter', narrow ? 'max-w-narrow' : 'max-w-container', className)}>
      {children}
    </Tag>
  );
}
