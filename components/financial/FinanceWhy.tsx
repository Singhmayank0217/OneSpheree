'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { EASE, STAGGER } from '@/lib/animations';
import type { FinanceWhyContent } from '@/types/financial';

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-masked heading that can also paint phrases in the emerald highlight —
 * the shared <RevealText> only accepts a plain string, and this statement needs
 * both behaviours at once. Highlight membership is resolved per word, so the
 * mask boxes stay one-word-wide and the colour follows the phrase.
 */
function highlightedWordIndices(words: string[], highlights: string[]): Set<number> {
  const marked = new Set<number>();
  const normalise = (w: string) => w.replace(/[^a-z0-9]/gi, '').toLowerCase();
  highlights.forEach((phrase) => {
    const target = phrase.split(' ').map(normalise);
    for (let i = 0; i + target.length <= words.length; i += 1) {
      if (target.every((t, k) => normalise(words[i + k]) === t)) {
        target.forEach((_, k) => marked.add(i + k));
      }
    }
  });
  return marked;
}

function StatementHeading({ text, highlights }: { text: string; highlights: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');
  const marked = highlightedWordIndices(words, highlights);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-word]'),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE.reveal,
          stagger: STAGGER.text,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h2
      ref={ref}
      data-reveal=""
      aria-label={text}
      className="t-display ondark-heading mt-5 max-w-[16ch] font-display"
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[.08em] -mb-[.08em] align-top">
            <span
              data-word=""
              className={`inline-block will-change-transform${marked.has(i) ? ' text-[var(--blue-300)]' : ''}`}
            >
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </h2>
  );
}

/**
 * Why Financial Compliance Matters — the argument, set as a split.
 *
 * Left: one large statement that holds its position while the page moves past
 * it (sticky on desktop). Right: the four reasons, revealed in sequence — each
 * one draws its own rule, lifts its numeral and settles its copy, so the column
 * reads as a list being written rather than a block that faded in.
 */
export function FinanceWhy({ content }: { content: FinanceWhyContent }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-fc-point]');
      items.forEach((item) => {
        // the first entry has no rule above it, so each target is checked
        // before it is tweened — GSAP warns on empty selections
        const rule = item.querySelectorAll('[data-fc-rule]');
        const marker = item.querySelectorAll('[data-fc-marker]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 82%', once: true } });
        if (rule.length) {
          tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.reveal, transformOrigin: '0% 50%' });
        }
        tl.fromTo(
          item.querySelectorAll('[data-fc-stagger]'),
          { opacity: 0, y: 18, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: EASE.reveal, stagger: STAGGER.text },
          rule.length ? '-=0.5' : 0
        );
        if (marker.length) {
          tl.fromTo(
            marker,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.6, ease: EASE.reveal, transformOrigin: '50% 0%' },
            '-=0.55'
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-compliance"
      aria-label={content.eyebrow}
      className="relative scroll-mt-[88px] border-t border-line-dark bg-dark text-ondark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 12% 12%, color-mix(in srgb, var(--violet-500) 22%, transparent), transparent 72%)',
        }}
      />

      <Container className="relative grid gap-12 py-section lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* ── the statement ── */}
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <p className="t-eyebrow t-eyebrow-ondark">{content.eyebrow}</p>
          </Reveal>
          <StatementHeading text={content.headline} highlights={content.highlights} />
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-16 bg-[color-mix(in_srgb,var(--blue-300)_60%,transparent)]"
              />
              <span className="font-mono text-[length:var(--text-caption-size)] tracking-[.18em] text-ondark-muted">
                COMPLIANCE · GOVERNANCE · GROWTH
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── the argument ── */}
        <div>
          <Reveal>
            <p className="t-body-lg max-w-[58ch] text-ondark-muted">{content.intro}</p>
          </Reveal>

          <ol ref={listRef} className="mt-12 flex flex-col">
            {content.points.map((point, i) => (
              <li key={point.index} data-fc-point="" className="relative pb-9 pt-9 first:pt-0">
                {/* the rule belongs BETWEEN entries, so the first one goes without */}
                {i > 0 && (
                  <span
                    data-fc-rule=""
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-full bg-line-dark"
                  />
                )}
                <div className="flex gap-5">
                  <div className="flex flex-col items-center gap-3 pt-1">
                    <span
                      data-fc-stagger=""
                      className="font-mono text-[length:var(--text-caption-size)] tracking-[.16em] text-[var(--blue-300)]"
                    >
                      {point.index}
                    </span>
                    <span
                      data-fc-marker=""
                      aria-hidden="true"
                      className="hidden w-px flex-1 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--blue-300)_55%,transparent),transparent)] sm:block"
                    />
                  </div>
                  <div className="max-w-[52ch]">
                    <h3 data-fc-stagger="" className="t-h3 ondark-heading font-display">
                      {point.title}
                    </h3>
                    <p
                      data-fc-stagger=""
                      className="mt-3 text-[length:var(--text-body-sm-size)] leading-[1.75] text-ondark-muted"
                    >
                      {point.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
