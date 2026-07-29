'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ServiceIcon } from './ServiceIcon';
import type { ServiceSectionContent } from '@/types/service-page';

gsap.registerPlugin(ScrollTrigger);

/**
 * Payroll & Compliance — composition D (fanned-sheets archetype, payroll
 * artwork): a centered editorial opening, then a stack of statutory documents —
 * fanned PF/ESI and labour-compliance sheets behind a front PAYSLIP carrying
 * earning/deduction rows and a net-pay figure — facing a dotted-leader services
 * list. Sheets fan open and a PF·ESI compliance seal lands on scroll.
 */
export function PayrollSection({ section }: { section: ServiceSectionContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-pc-sheet="1"]',
        { rotation: 0, x: 0 },
        { rotation: -8, x: -30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-pc-sheet="2"]',
        { rotation: 0, x: 0 },
        { rotation: 8, x: 30, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 45%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-pc-rowbar]',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.12, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { trigger: el, start: 'top 68%', end: 'center 46%', scrub: 0.8 } }
      );
      gsap.fromTo(
        '[data-pc-stamp]',
        { scale: 0.5, rotation: -18, opacity: 0 },
        { scale: 1, rotation: -8, opacity: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: el, start: 'top 55%', end: 'center 50%', scrub: 0.8 } }
      );
      gsap.to('[data-pc-front]', {
        y: -16,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      // living-system ambient — the field breathes and the seal glows at rest
      const amb = gsap.timeline({ paused: true });
      amb.to('[data-pc-glow]', { scale: 1.12, opacity: '+=0.05', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' }, 0);
      amb.fromTo('[data-pc-seal]', { scale: 0.85, opacity: 0.6 }, { scale: 1.15, opacity: 0, duration: 2.8, ease: 'power1.out', repeat: -1, transformOrigin: '50% 50%' }, 0);
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? amb.play() : amb.pause()) });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={section.id} aria-label={section.headline} className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 78% 35%, color-mix(in srgb, var(--violet-500) 13%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative border-t border-line-dark py-section">
        <div className="text-center">
          <Reveal>
            <p className="flex items-baseline justify-center gap-2">
              <span className="font-mono text-[length:var(--text-body-sm-size)] text-[var(--violet-300)]">{section.index}</span>
              <span className="t-eyebrow t-eyebrow-ondark">{section.eyebrow}</span>
            </p>
          </Reveal>
          <RevealText text={section.headline} as="h2" className="t-display ondark-heading mx-auto mt-3" />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-[52ch] text-ondark-muted">{section.description}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* fanned payroll documents */}
          <Reveal y={40}>
            <div aria-hidden="true" className="relative mx-auto h-[330px] w-full max-w-[430px]">
              {/* breathing glow behind the stack */}
              <div
                data-pc-glow=""
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 68%)' }}
              />
              {/* fanned statutory sheets */}
              {[1, 2].map((n) => (
                <div
                  key={n}
                  data-pc-sheet={n}
                  className="absolute left-1/2 top-5 h-[285px] w-[215px] -translate-x-1/2 rounded-lg border border-line-dark bg-[rgba(255,255,255,.03)] p-4"
                >
                  <span className="block h-1.5 w-2/5 rounded bg-[color-mix(in_srgb,var(--blue-400)_50%,transparent)]" />
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="mt-2.5 block h-1 rounded bg-[rgba(255,255,255,.09)]" style={{ width: `${90 - i * 6}%` }} />
                  ))}
                </div>
              ))}
              {/* front payslip */}
              <div
                data-pc-front=""
                className="absolute left-1/2 top-0 h-[300px] w-[232px] -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,.22)] bg-[#0b1120] p-5 shadow-dark-lg"
              >
                {/* header */}
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--violet-500)_26%,transparent)]">
                    <ServiceIcon name="wallet" size={18} className="text-[var(--violet-200)]" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[2px] text-ondark-muted">PAYSLIP</span>
                </div>
                {/* earning / deduction rows */}
                <div className="mt-4 flex flex-col gap-2.5">
                  {['BASIC', 'HRA', 'PF', 'ESI'].map((r) => (
                    <div key={r} className="flex items-center gap-2">
                      <span className="w-8 shrink-0 font-mono text-[8px] tracking-[1px] text-ondark-muted">{r}</span>
                      <span className="h-1.5 flex-1 rounded bg-[rgba(255,255,255,.08)]">
                        <span data-pc-rowbar="" className="block h-full rounded bg-[color-mix(in_srgb,var(--violet-400)_55%,transparent)]" style={{ transformOrigin: '0 50%' }} />
                      </span>
                    </div>
                  ))}
                </div>
                {/* net pay */}
                <div className="mt-4 border-t border-line-dark pt-3">
                  <span className="font-mono text-[8px] tracking-[1.5px] text-ondark-muted">NET PAY</span>
                  <p className="font-display text-[1.5rem] font-extrabold text-ondark">₹ 68,400</p>
                </div>
                {/* PF·ESI compliance seal */}
                <div
                  data-pc-stamp=""
                  className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--violet-400)] bg-[#0b1120]"
                >
                  <span data-pc-seal="" className="absolute inset-0 rounded-full border border-[var(--violet-300)]" />
                  <span className="absolute inset-1.5 rounded-full border border-dashed border-[color-mix(in_srgb,var(--violet-300)_60%,transparent)]" />
                  <span className="font-mono text-[9px] font-bold tracking-[1px] text-[var(--violet-200)]">PF·ESI</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* services — dotted leaders */}
          <div>
            <Reveal>
              <p className="t-micro text-ondark-muted">{section.itemsLabel}</p>
            </Reveal>
            <Reveal stagger="text" className="mt-3">
              {section.items.map((item, i) => (
                <div key={item.label} className="flex items-baseline gap-2.5 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 -translate-y-0.5 items-center justify-center rounded-sm text-[var(--violet-300)]">
                    <ServiceIcon name={item.icon} size={16} />
                  </span>
                  <span className="shrink-0 font-medium text-ondark">{item.label}</span>
                  <span aria-hidden="true" className="mx-1 min-w-6 flex-1 self-center border-b border-dotted border-[rgba(255,255,255,.22)]" />
                  <span className="shrink-0 font-mono text-[length:var(--text-caption-size)] text-ondark-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
