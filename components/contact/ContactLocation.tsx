'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { ContactAction } from './ContactAction';
import type { ContactLocationContent } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 3b — the office location.
 *
 * A live Google Maps embed of the Belurmath office, held in a premium frame:
 * the same rounded hairline card the rest of the page uses, a warm inner glow
 * behind it, and a corner plate naming the office so the frame reads as part of
 * the design system rather than a bare third-party iframe. The embed uses the
 * keyless `output=embed` form, so nothing here needs an API key or billing.
 *
 * Motion: the frame is UNVEILED — a clip-path wipe opens it from the bottom
 * while the address panel settles beside it. Deliberately restrained: the map
 * is live content, and animating around it would fight the map's own tiles.
 */
export function ContactLocation({ location }: { location: ContactLocationContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-loc-frame]', { clipPath: 'inset(0% 0% 100% 0%)', y: 22 });
      gsap.set('[data-loc-plate]', { opacity: 0, y: 12 });
      gsap.set('[data-loc-panel] > *', { opacity: 0, y: 20 });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
        .to(
          '[data-loc-frame]',
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.15,
            ease: 'expo.out',
            // the clip is dropped once it has served its purpose — a surviving
            // clip region would cut the map's own popups
            onComplete: () => gsap.set('[data-loc-frame]', { clearProps: 'clipPath' }),
          },
          0
        )
        .to(
          '[data-loc-panel] > *',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 },
          0.2
        )
        .to('[data-loc-plate]', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.75);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label={location.eyebrow} className="relative bg-canvas pb-section">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* ── the map ──────────────────────────────────────────────────── */}
          <div
            data-loc-frame=""
            className="relative overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-sm sm:p-3"
          >
            {/* the warm bed the map sits on */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 60% at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 72%)',
              }}
            />

            {/* The office plate sits in the frame's own chrome, above the map —
                NOT overlaid on it. Google's embed keeps its logo bottom-left,
                its place card top-left and its controls bottom-right, and their
                terms require the attribution stay visible, so the only safe
                place for our own label is outside the tile area. */}
            <div
              data-loc-plate=""
              className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1 px-3 pb-3 pt-2 sm:px-4"
            >
              <p className="t-micro text-primary">Head Office</p>
              <p className="text-[length:var(--text-body-sm-size)] font-semibold text-heading">
                {location.address[1]}
              </p>
              <p className="text-[length:var(--text-caption-size)] text-muted">{location.address[2]}</p>
            </div>

            <div className="relative h-[320px] overflow-hidden rounded-xl sm:h-[380px] lg:h-[calc(100%-52px)] lg:min-h-[420px]">
              <iframe
                src={location.mapEmbedUrl}
                title="OneSpheree head office on Google Maps — 11, Girish Ghosh Road, Belurmath, Howrah"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          {/* ── the address ──────────────────────────────────────────────── */}
          <div
            data-loc-panel=""
            className="flex flex-col justify-center rounded-2xl border border-line bg-card p-8 lg:p-10"
          >
            <p className="t-eyebrow">{location.eyebrow}</p>
            <h2 className="t-h2 mt-3">{location.headline}</h2>
            <p className="mt-4 text-muted">{location.description}</p>

            <address className="mt-7 flex gap-4 not-italic">
              <span
                aria-hidden="true"
                className="mt-[2px] flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
              >
                <Icon name="mapPin" size={20} />
              </span>
              <span className="flex flex-col">
                {location.address.map((line, i) => (
                  <span key={line} className={i === 0 ? 'font-semibold text-heading' : 'text-body'}>
                    {line}
                  </span>
                ))}
              </span>
            </address>

            <div className="mt-8">
              <ContactAction
                cta={{ label: location.mapsLabel, href: location.mapsUrl }}
                variant="secondary"
                icon="mapPin"
                newTab
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
