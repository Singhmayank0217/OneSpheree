import Link from 'next/link';
import { Icon } from '@/components/ds/Icon';
import { Chip } from '@/components/ds/Chip';
import { ProjectImage } from '@/components/gallery/ProjectImage';
import { projectAspect } from '@/lib/gallery';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import type { PortfolioProject } from '@/types/portfolio';

function ImageBlock({ project, expanded }: { project: PortfolioProject; expanded: boolean }) {
  return (
    <div
      data-preveal=""
      className="relative overflow-hidden rounded-lg bg-sunken"
      style={{ aspectRatio: expanded ? '4 / 3' : projectAspect(project.slug) }}
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:scale-[1.04]">
        <ProjectImage slug={project.slug} src={project.coverImage} alt={project.title} />
      </div>
      <div className="absolute left-3 top-3">
        <StatusBadge status={project.status} />
      </div>
    </div>
  );
}

/** Compact meta pair used in the unfolded panel. */
function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="t-micro text-muted">{k}</p>
      <p className="mt-0.5 text-[length:var(--text-body-sm-size)] font-medium text-heading">{v}</p>
    </div>
  );
}

/**
 * Editorial portfolio card. Collapsed: image + service + title + two-line
 * overview + status. On click it unfolds (GSAP Flip, orchestrated by the grid)
 * into a full-width presentation board — image beside the full description, the
 * complete engagement meta, and a CTA through to the detail page. Not a modal,
 * not an accordion: the card itself reorganises in place.
 */
export function PortfolioCard({
  project,
  expanded,
  hidden,
  onToggle,
}: {
  project: PortfolioProject;
  expanded: boolean;
  hidden: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      data-portfolio-card=""
      data-slug={project.slug}
      className={cn(
        'group',
        hidden && 'portfolio-card--hidden',
        expanded && 'is-expanded sm:col-span-2 lg:col-span-3'
      )}
    >
      {!expanded ? (
        <button
          onClick={onToggle}
          aria-expanded={false}
          aria-label={`Expand ${project.title}`}
          className="block w-full rounded-lg text-left focus-visible:outline-none"
        >
          <ImageBlock project={project} expanded={false} />
          <div className="mt-3">
            <span className="t-micro text-primary">{project.service}</span>
            <h3 className="t-h4 mt-1 text-heading transition-colors duration-300 group-hover:text-primary">
              {project.title}
            </h3>
            <p className="t-caption mt-1 line-clamp-2 text-muted">{project.overview}</p>
          </div>
        </button>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-10">
          <button
            onClick={onToggle}
            aria-expanded
            aria-label={`Collapse ${project.title}`}
            className="block w-full rounded-lg text-left focus-visible:outline-none"
          >
            <ImageBlock project={project} expanded />
          </button>

          <div data-portfolio-panel="" className="lg:pt-1">
            <div className="flex items-center justify-between gap-3">
              <span className="t-eyebrow">{project.service}</span>
              <button
                onClick={onToggle}
                aria-label="Collapse"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-heading"
              >
                <Icon name="minus" size={16} />
              </button>
            </div>
            <h3 className="t-h2 mt-2">{project.title}</h3>
            <p className="mt-3 max-w-[60ch] text-muted">{project.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
              <Field k="Client" v={project.client} />
              <Field k="Service" v={project.service} />
              <Field k="Date" v={project.date} />
              <Field k="Duration" v={project.duration} />
              <Field k="Project type" v={project.projectType} />
              <Field k="Project value" v={project.projectValue} />
              <Field k="Location" v={project.location} />
              <Field k="Client satisfaction" v={project.clientSatisfaction} />
              <div className="col-span-2 sm:col-span-1">
                <p className="t-micro text-muted">Status</p>
                <p className="mt-1">
                  <StatusBadge status={project.status} className="!bg-sunken !text-heading backdrop-blur-none" />
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="t-micro text-muted">Technologies</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[length:var(--text-body-sm-size)] font-semibold text-white transition-transform hover:translate-x-0.5 hover:no-underline"
              >
                View full project
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
