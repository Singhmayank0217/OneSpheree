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
 * Section 3b — the illustrated location.
 *
 * A drawn district instead of a Google Maps iframe: block grid, three arteries,
 * a bypass band, a scatter of plots and one marker where the office is. An
 * embed would drop a third-party frame with its own typography, its own colours
 * and its own network cost into the middle of an editorial page; this stays on
 * the design system and hands the reader off to Maps by choice, through the
 * button, rather than by default.
 *
 * Motion: the district is SURVEYED. The grid resolves, the arteries draw
 * themselves along their own length, plots settle in, and only then does the
 * marker drop and start pulsing — a build order, not an entrance.
 */
export function ContactLocation({ location }: { location: ContactLocationContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-loc-road]', { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-loc-grid]', { opacity: 0 });
      gsap.set('[data-loc-road]', { strokeDashoffset: 100 });
      gsap.set('[data-loc-bypass]', { opacity: 0 });
      gsap.set('[data-loc-plot]', { opacity: 0, scale: 0.7, transformOrigin: 'center' });
      gsap.set('[data-loc-label]', { opacity: 0, y: 8 });
      gsap.set('[data-loc-marker]', { opacity: 0, y: -46 });
      gsap.set('[data-loc-halo]', { opacity: 0, scale: 0.4, transformOrigin: '520px 214px' });
      gsap.set('[data-loc-panel] > *', { opacity: 0, y: 20 });

      const survey = gsap.timeline({ paused: true });
      survey
        .to('[data-loc-grid]', { opacity: 1, duration: 1.3, ease: 'sine.out' }, 0)
        .to('[data-loc-bypass]', { opacity: 1, duration: 1.5, ease: 'sine.out' }, 0.15)
        .to('[data-loc-road]', { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.18 }, 0.2)
        .to('[data-loc-plot]', { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.045 }, 0.9)
        .to('[data-loc-label]', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 1.3)
        .to('[data-loc-halo]', { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 1.55)
        .to('[data-loc-marker]', { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 1.6)
        .to('[data-loc-panel] > *', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 }, 0.5);

      // the marker keeps signalling once it has landed
      const pulse = gsap.timeline({ paused: true });
      pulse
        .to('[data-loc-halo]', { scale: 1.16, opacity: 0.5, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0)
        .to('[data-loc-ping]', { scale: 2.6, opacity: 0, duration: 3, ease: 'power1.out', repeat: -1 }, 0);

      let inView = false;
      survey.eventCallback('onComplete', () => inView && pulse.play());

      ScrollTrigger.create({ trigger: el, start: 'top 78%', once: true, onEnter: () => survey.play() });
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => {
          inView = isActive;
          if (isActive && survey.progress() === 1) pulse.play();
          else pulse.pause();
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label={location.eyebrow} className="relative bg-canvas pb-section">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* ── the drawn district ───────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-2xl border border-line-dark bg-dark">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 60% at 52% 44%, color-mix(in srgb, var(--violet-500) 16%, transparent), transparent 74%)',
              }}
            />
            <svg viewBox="0 0 1000 480" fill="none" className="relative block h-full w-full">
              {/* block grid */}
              <g data-loc-grid="" stroke="rgba(255,255,255,.07)" strokeWidth="1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <line key={`v${i}`} x1={125 * i} y1="0" x2={125 * i} y2="480" />
                ))}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={`h${i}`} x1="0" y1={96 * i} x2="1000" y2={96 * i} />
                ))}
              </g>

              {/* the bypass — a broad soft band across the lower field */}
              <path
                data-loc-bypass=""
                d="M-20 452 C 220 424, 400 356, 640 340 C 800 330, 900 300, 1020 264 L 1020 480 L -20 480 Z"
                fill="color-mix(in srgb, var(--blue-500) 10%, transparent)"
              />

              {/* arteries */}
              {[
                'M-20 306 C 190 296, 336 254, 520 244 C 704 234, 850 200, 1020 172',
                'M118 500 C 176 392, 238 302, 306 -20',
                'M-20 92 C 232 118, 418 158, 640 202 C 812 236, 902 320, 1020 402',
              ].map((d, i) => (
                <path
                  key={d.slice(0, 12)}
                  data-loc-road=""
                  d={d}
                  stroke={i === 0 ? 'rgba(255,255,255,.30)' : 'rgba(255,255,255,.16)'}
                  strokeWidth={i === 0 ? 2.5 : 1.75}
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="100"
                />
              ))}

              {/* plots */}
              {[
                { x: 148, y: 138, w: 74, h: 44 },
                { x: 252, y: 190, w: 52, h: 52 },
                { x: 372, y: 118, w: 62, h: 38 },
                { x: 404, y: 288, w: 88, h: 40 },
                { x: 596, y: 128, w: 46, h: 62 },
                { x: 668, y: 258, w: 70, h: 42 },
                { x: 780, y: 148, w: 56, h: 46 },
                { x: 848, y: 252, w: 62, h: 36 },
                { x: 196, y: 352, w: 66, h: 40 },
                { x: 560, y: 384, w: 52, h: 34 },
              ].map((plot) => (
                <rect
                  key={`${plot.x}-${plot.y}`}
                  data-loc-plot=""
                  x={plot.x}
                  y={plot.y}
                  width={plot.w}
                  height={plot.h}
                  rx="6"
                  fill="rgba(255,255,255,.05)"
                  stroke="rgba(255,255,255,.10)"
                  strokeWidth="1"
                  style={{ transformBox: 'fill-box' }}
                />
              ))}

              {/* district labels */}
              {[
                { text: location.districts[0], x: 560, y: 172, anchor: 'start' as const },
                { text: location.districts[1], x: 806, y: 132, anchor: 'start' as const },
                { text: location.districts[2], x: 128, y: 436, anchor: 'start' as const },
                { text: location.districts[3], x: 300, y: 78, anchor: 'middle' as const },
              ].map((label) => (
                <text
                  key={label.text}
                  data-loc-label=""
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  fill="rgba(167,173,187,.85)"
                  style={{ font: '600 15px var(--font-sans)', letterSpacing: '.06em', textTransform: 'uppercase' }}
                >
                  {label.text}
                </text>
              ))}

              {/* the office */}
              <circle
                data-loc-halo=""
                cx="520"
                cy="214"
                r="58"
                fill="color-mix(in srgb, var(--violet-500) 22%, transparent)"
              />
              <circle
                data-loc-ping=""
                cx="520"
                cy="214"
                r="30"
                stroke="var(--violet-300)"
                strokeOpacity=".5"
                strokeWidth="1.5"
                style={{ transformOrigin: '520px 214px' }}
              />
              <g data-loc-marker="">
                <path
                  d="M520 186 a15 15 0 0 1 15 15 c0 11-15 27-15 27s-15-16-15-27a15 15 0 0 1 15-15z"
                  fill="var(--violet-500)"
                />
                <circle cx="520" cy="201" r="5.5" fill="#fff" />
              </g>
            </svg>
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
              <ContactAction cta={{ label: location.mapsLabel, href: location.mapsUrl }} variant="secondary" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
