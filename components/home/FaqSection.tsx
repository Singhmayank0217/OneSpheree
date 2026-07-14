'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { Reveal } from '@/components/animations/Reveal';
import { faqItems } from '@/data/faq';
import { DURATION, EASE } from '@/lib/animations';

/**
 * FAQ — a premium accordion with editorial spacing: generous rows, hairline
 * dividers, GSAP height/opacity expansion, rotating chevron. One item open
 * at a time; fully keyboard accessible.
 */
export function FaqSection() {
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.utils.toArray<HTMLElement>('[data-faq-panel]', list).forEach((panel, i) => {
      const isOpen = i === open;
      if (reduced) {
        panel.style.height = isOpen ? 'auto' : '0px';
        panel.style.opacity = isOpen ? '1' : '0';
        return;
      }
      gsap.to(panel, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: DURATION.section / 2,
        ease: EASE.out,
        overwrite: 'auto',
      });
    });
  }, [open]);

  return (
    <section aria-label="Frequently asked questions" className="relative z-10">
      <Container className="py-section">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Reveal>
              <p className="t-eyebrow">FAQ</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-2">Common questions.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-body-lg mt-3 max-w-[320px] text-muted">
                Anything else — <a href="/contact">start the conversation</a>.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div ref={listRef} className="flex flex-col">
              {faqItems.map((item, i) => (
                <div key={item.q} className="border-t border-line last:border-b">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  >
                    <span className="t-h4">{item.q}</span>
                    <Icon
                      name="chevronDown"
                      size={20}
                      className={`shrink-0 text-muted transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
                        open === i ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  <div id={`faq-panel-${i}`} data-faq-panel="" className="h-0 overflow-hidden opacity-0">
                    <p className="max-w-[560px] pb-4 text-muted">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
