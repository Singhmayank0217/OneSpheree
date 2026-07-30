'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { Icon } from '@/components/ds/Icon';
import { useLenis } from '@/providers/SmoothScrollProvider';
import { cn } from '@/lib/utils';

/**
 * The enquiry outcome dialog — one component for both the success and the
 * failure ending.
 *
 * Motion: the backdrop darkens and blurs while the panel scales 95 → 100 and
 * settles; closing plays the same beat in reverse before the panel unmounts,
 * so it never vanishes mid-fade. GSAP drives both, and reduced motion gets the
 * end state with no animation at all.
 *
 * Accessibility: `role="dialog"` + `aria-modal`, labelled and described by its
 * own heading and body; focus moves to the action button on open and returns to
 * the element that opened it on close; Escape, the action button and a click on
 * the backdrop all close it; Tab is trapped inside the panel; and page scroll
 * (including Lenis) is frozen while it is up.
 */
export function ContactModal({
  open,
  variant,
  title,
  message,
  actionLabel,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  variant: 'success' | 'error';
  title: string;
  /** paragraphs of the body copy */
  message: string[];
  actionLabel: string;
  onClose: () => void;
  /** focus goes back here once the dialog closes */
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  const [render, setRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // mount as soon as it is asked for; unmounting waits for the exit animation
  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  useEffect(() => {
    if (!render) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (open) {
      actionRef.current?.focus();
      if (reduced) {
        gsap.set(overlay, { opacity: 1 });
        gsap.set(panel, { opacity: 1, scale: 1, y: 0 });
        return;
      }
      const tl = gsap
        .timeline()
        .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'sine.out' }, 0)
        .fromTo(
          panel,
          { opacity: 0, scale: 0.95, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' },
          0.04
        )
        .fromTo(
          panel.querySelectorAll('[data-modal-item]'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.44, ease: 'power3.out', stagger: 0.06 },
          0.16
        );
      return () => {
        tl.kill();
      };
    }

    // closing
    if (reduced) {
      setRender(false);
      return;
    }
    const tl = gsap
      .timeline({ onComplete: () => setRender(false) })
      .to(panel, { opacity: 0, scale: 0.96, y: 8, duration: 0.26, ease: 'power2.in' }, 0)
      .to(overlay, { opacity: 0, duration: 0.26, ease: 'sine.in' }, 0.04);
    return () => {
      tl.kill();
    };
  }, [open, render]);

  // return focus to whatever opened the dialog, once it is fully gone
  useEffect(() => {
    if (render) return;
    returnFocusRef?.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  // Escape to close, Tab trapped inside the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // freeze the page behind the dialog — Lenis owns the scroll, so it is stopped too
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
      lenis?.start();
    };
  }, [open, lenis]);

  if (!render) return null;

  const success = variant === 'success';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex items-center justify-center px-4 py-8"
      style={{ background: 'var(--overlay-scrim-strong)', backdropFilter: 'blur(10px)' }}
      onMouseDown={(e) => {
        // a click on the backdrop itself, not a drag that ended out here
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-body"
        className="relative w-full max-w-[520px] overflow-hidden rounded-xl border border-line-dark bg-dark-elevated p-8 text-ondark shadow-dark-lg sm:p-10"
      >
        {/* the state's own light, top-lit */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: success
              ? 'radial-gradient(90% 60% at 50% 0%, color-mix(in srgb, var(--violet-500) 20%, transparent), transparent 72%)'
              : 'radial-gradient(90% 60% at 50% 0%, rgba(209,67,67,.20), transparent 72%)',
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: success
              ? 'linear-gradient(90deg, transparent, var(--violet-400), transparent)'
              : 'linear-gradient(90deg, transparent, #E06666, transparent)',
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line-dark text-ondark-muted transition-[color,border-color,background-color] duration-[var(--duration-base)] hover:bg-[rgba(255,255,255,.06)] hover:text-ondark"
        >
          <Icon name="x" size={18} />
        </button>

        <div className="relative">
          <span
            data-modal-item=""
            aria-hidden="true"
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full border',
              success
                ? 'border-[color-mix(in_srgb,var(--violet-400)_55%,transparent)] text-[var(--violet-300)]'
                : 'border-[rgba(224,102,102,.55)] text-[#F0A5A5]'
            )}
            style={{
              background: success
                ? 'color-mix(in srgb, var(--violet-500) 14%, transparent)'
                : 'rgba(209,67,67,.14)',
            }}
          >
            <Icon name={success ? 'check' : 'alertTriangle'} size={26} />
          </span>

          <h2 data-modal-item="" id="contact-modal-title" className="t-h2 ondark-heading mt-6">
            {title}
          </h2>

          <div data-modal-item="" id="contact-modal-body" className="mt-4 flex flex-col gap-3">
            {message.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-ondark-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div data-modal-item="" className="mt-8">
            <button
              ref={actionRef}
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-[26px] py-[14px] font-sans text-[1rem] font-semibold text-white transition-[background-color,transform,box-shadow] duration-[var(--duration-fast)] hover:-translate-y-px hover:bg-primary-hover hover:shadow-sm active:translate-y-0 active:scale-[.98] sm:w-auto"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
