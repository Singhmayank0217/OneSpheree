import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Icon } from '@/components/ds/Icon';
import type { AboutPanel, AboutVisionMissionContent } from '@/types/about';

/**
 * One panel — vision or mission. Hover lifts the card and warms its edge.
 *
 * The outer div exists so the card can be lifted on hover: this panel is a
 * direct child of <Reveal stagger>, and GSAP leaves its own `transform` inline
 * on the elements it animates, which would beat a class-level hover translate.
 * The reveal owns the wrapper; the hover owns the card inside it.
 */
function Panel({ panel, accent }: { panel: AboutPanel; accent: 'primary' | 'secondary' }) {
  const rule =
    accent === 'primary'
      ? 'bg-gradient-to-r from-[var(--violet-500)] to-[var(--blue-400)]'
      : 'bg-gradient-to-r from-[var(--blue-500)] to-[var(--violet-400)]';

  return (
    <div className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card p-7 shadow-xs transition-[transform,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md sm:p-9">
        {/* the top rule draws itself in on hover */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[.18] transition-transform duration-[520ms] ease-[var(--ease-out)] group-hover:scale-x-100 ${rule}`}
        />

        <p className="t-micro text-primary">{panel.label}</p>
        <h3 className="mt-5 font-display text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold leading-[1.25] tracking-[-.01em] text-heading">
          {panel.statement}
        </h3>
        <p className="mt-5 text-body">{panel.body}</p>

        <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-6">
          {panel.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[length:var(--text-body-sm-size)] text-body">
              <span className="mt-[2px] text-primary">
                <Icon name="check" size={16} />
              </span>
              <span className="min-w-0">{point}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

/**
 * Vision & mission — two premium panels on a soft brand-tinted band.
 *
 * The tint is the only surface change in the light half of the page; it lifts
 * the pair off the canvas without introducing another dark section.
 */
export function AboutVisionMission({ content }: { content: AboutVisionMissionContent }) {
  return (
    <section aria-label={content.eyebrow} className="relative bg-brand-soft py-section">
      <Container>
        <div className="max-w-[720px]">
          <Reveal className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="block h-[6px] w-[6px] rounded-full"
              style={{ background: 'var(--accent-orange)' }}
            />
            <p className="t-eyebrow">{content.eyebrow}</p>
          </Reveal>
          <RevealText text={content.headline} as="h2" className="t-display mt-5 max-w-[22ch]" />
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 max-w-[58ch] text-muted">{content.intro}</p>
          </Reveal>
        </div>

        {/* mt-10 → lg:mt-12 (80px → 96px). The DS overrides part of Tailwind's
            spacing scale, so `lg:mt-14` would be 56px — SMALLER than mt-12. */}
        <Reveal stagger="cards" className="mt-10 grid gap-5 lg:mt-12 lg:auto-rows-fr lg:grid-cols-2">
          <Panel panel={content.vision} accent="primary" />
          <Panel panel={content.mission} accent="secondary" />
        </Reveal>
      </Container>
    </section>
  );
}
