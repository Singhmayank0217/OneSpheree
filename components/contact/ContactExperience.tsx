'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { ContactDialogue } from './ContactDialogue';
import { ContactForm } from './ContactForm';
import type { ContactExperienceContent } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 2 — the contact experience, and the centrepiece of the page.
 *
 * A split stage that stays on the hero's dark surface: the argument on the
 * left, the glass form on the right. Keeping both on one continuous field is
 * what lets the form read as glass at all — the moment it sits on white it is
 * just a card.
 *
 * Motion: the left column is uncovered LATERALLY — headline lines wipe open
 * from the left edge behind a vertical rule that draws down beside them, which
 * is deliberately the opposite axis to the hero's vertical mask. The form runs
 * its own progressive field reveal (see ContactForm), so the two halves arrive
 * with different gestures rather than one shared fade.
 */
export function ContactExperience({ content }: { content: ContactExperienceContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-xp-spine]', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('[data-xp-eyebrow]', { opacity: 0, x: -10 });
      gsap.set('[data-xp-line]', { clipPath: 'inset(0% 100% 0% 0%)', x: -18 });
      gsap.set('[data-xp-copy]', { opacity: 0, y: 14 });
      gsap.set('[data-xp-art]', { opacity: 0, scale: 0.97 });
      gsap.set('[data-xp-assurance]', { opacity: 0, x: -14 });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 74%', once: true } })
        .to('[data-xp-spine]', { scaleY: 1, duration: 1.1, ease: 'expo.out' }, 0)
        .to('[data-xp-eyebrow]', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
        .to(
          '[data-xp-line]',
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            x: 0,
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.1,
            onComplete: () => gsap.set('[data-xp-line]', { clearProps: 'clipPath' }),
          },
          0.25
        )
        .to('[data-xp-copy]', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 }, 0.7)
        .to('[data-xp-art]', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 0.95)
        .to('[data-xp-assurance]', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, 1.15);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="enquiry"
      aria-label="Send an enquiry"
      className="relative scroll-mt-24 overflow-hidden bg-dark text-ondark"
    >
      {/* ambient warmth behind the glass, low and to the right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 46% at 82% 26%, color-mix(in srgb, var(--violet-500) 12%, transparent), transparent 72%), radial-gradient(46% 40% at 8% 88%, color-mix(in srgb, var(--blue-500) 7%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative py-section lg:py-[120px]">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1fr)] lg:gap-16">
          {/* ── the argument ─────────────────────────────────────────────── */}
          <div className="relative lg:pl-8">
            {/* the rule that draws down the column */}
            <span
              data-xp-spine=""
              aria-hidden="true"
              className="absolute left-0 top-1 hidden h-full w-px lg:block"
              style={{
                background:
                  'linear-gradient(to bottom, var(--violet-400), color-mix(in srgb, var(--violet-500) 30%, transparent) 45%, transparent)',
              }}
            />

            <p data-xp-eyebrow="" className="t-eyebrow t-eyebrow-ondark">
              {content.eyebrow}
            </p>

            <h2 className="t-display ondark-heading mt-4">
              {content.headline.map((line) => (
                <span key={line} data-xp-line="" className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-6 flex max-w-[54ch] flex-col gap-4">
              {content.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} data-xp-copy="" className="text-ondark-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-xp-art="" className="mt-10 max-w-[440px]">
              <ContactDialogue />
            </div>

            <ul className="mt-10 flex flex-col gap-5">
              {content.assurances.map((item) => (
                <li key={item.label} data-xp-assurance="" className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.12)] text-[var(--violet-300)]"
                    style={{ background: 'color-mix(in srgb, var(--violet-500) 10%, transparent)' }}
                  >
                    <Icon name={item.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-ondark">{item.label}</p>
                    <p className="mt-[2px] text-[length:var(--text-body-sm-size)] text-ondark-muted">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── the form ─────────────────────────────────────────────────── */}
          <ContactForm content={content.form} />
        </div>
      </Container>
    </section>
  );
}
