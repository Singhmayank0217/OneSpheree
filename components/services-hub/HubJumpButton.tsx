'use client';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ds/Button';
import { useLenis } from '@/providers/SmoothScrollProvider';

/**
 * In-page jump for the hub's "Explore Services" CTAs. A native hash link would
 * move the window behind Lenis's back — the next wheel event snaps straight
 * back to the old position — so the scroll is handed to Lenis when it is
 * running, with a plain scrollIntoView fallback (reduced motion, no JS yet).
 */
export function HubJumpButton({
  targetId,
  children,
  variant,
  size = 'lg',
}: {
  targetId: string;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const lenis = useLenis();

  return (
    <Button
      variant={variant}
      size={size}
      iconRight="arrowRight"
      onClick={() => {
        const el = document.getElementById(targetId);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.1 });
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children}
    </Button>
  );
}
