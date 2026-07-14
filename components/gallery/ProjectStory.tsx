import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { getProjectNarrative } from '@/lib/gallery';
import type { GalleryProject } from '@/types/gallery';

const STEPS = ['Challenge', 'Approach', 'Execution', 'Results'] as const;

/** Challenge → Approach → Execution → Results, with the headline metric pinned. */
export function ProjectStory({ project }: { project: GalleryProject }) {
  const n = getProjectNarrative(project);
  const body: Record<(typeof STEPS)[number], string> = {
    Challenge: n.challenge,
    Approach: n.approach,
    Execution: n.execution,
    Results: n.results,
  };

  return (
    <section aria-label="Project story" className="relative">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-[18vh] lg:self-start">
            <Reveal>
              <p className="t-eyebrow">The work</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-h1 mt-2 max-w-[12ch]">How we delivered it.</h2>
            </Reveal>
            {project.metric && (
              <Reveal delay={0.2} className="mt-6 border-t border-line pt-4">
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none text-primary">
                  {project.metric.value}
                </p>
                <p className="t-caption mt-1">{project.metric.label}</p>
              </Reveal>
            )}
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <Reveal
                key={step}
                delay={i * 0.05}
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-5 last:border-b lg:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-primary">0{i + 1}</span>
                <div>
                  <h3 className="t-h3">{step}</h3>
                  <p className="mt-2 max-w-[54ch] text-muted">{body[step]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
