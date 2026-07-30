'use client';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ds/Button';
import { useLenis } from '@/providers/SmoothScrollProvider';
import type { ContactLink } from '@/types/contact';

/**
 * Every call to action on this page — the hero pair, the location button, the
 * support cards, the closing pair — goes through here, because a contact page
 * mixes three kinds of destination and each needs different handling:
 *
 *   `#anchor`  an in-page jump, handed to Lenis (a native hash link moves the
 *              window behind Lenis's back and the next wheel event snaps back)
 *   `mailto:`  / `tel:` / external — a real anchor, opened by the browser
 *   `/route`   an internal route, through next/link
 *
 * `Button` already covers the last two via its `href` prop; this wrapper adds
 * the first and picks the right icon for each.
 */
export function ContactAction({
  cta,
  variant,
  size = 'lg',
  icon,
  className,
  offset = -72,
}: {
  cta: ContactLink;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** overrides the icon inferred from the destination */
  icon?: string;
  className?: string;
  /** scroll offset for in-page jumps, so the sticky navbar never covers the target */
  offset?: number;
}) {
  const lenis = useLenis();
  const isJump = cta.href.startsWith('#');
  const isMail = cta.href.startsWith('mailto:');
  const isTel = cta.href.startsWith('tel:');
  const inferred = isJump ? 'arrowRight' : isMail ? 'mail' : isTel ? 'phone' : 'arrowUpRight';

  if (!isJump) {
    return (
      <Button href={cta.href} variant={variant} size={size} iconRight={icon ?? inferred} className={className}>
        {cta.label}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      iconRight={icon ?? inferred}
      className={className}
      onClick={() => {
        const el = document.getElementById(cta.href.slice(1));
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {cta.label}
    </Button>
  );
}
