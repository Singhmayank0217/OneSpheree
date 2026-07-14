'use client';
import type { ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

/** Wraps a CTA with subtle magnetic attraction (max ~10px). */
export function Magnetic({ children, strength = 10 }: { children: ReactNode; strength?: number }) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
