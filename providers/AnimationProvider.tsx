'use client';
import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

/** Refreshes ScrollTrigger on route change so pinned sections measure correctly. */
export function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    // let the new page paint, then re-measure
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return <>{children}</>;
}
