import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Surface = 'canvas' | 'card' | 'dark' | 'heroTint' | 'darkTint';
const surfaces: Record<Surface, string> = {
  canvas: 'bg-canvas',
  card: 'bg-card',
  dark: 'bg-dark text-ondark',
  heroTint: 'bg-hero-tint',
  darkTint: 'bg-dark-tint text-ondark',
};

export function Section({
  children,
  surface = 'canvas',
  id,
  className,
  label,
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={cn('relative py-section', surfaces[surface], className)}>
      {children}
    </section>
  );
}
