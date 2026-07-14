import Link from 'next/link';
import { Icon } from '@/components/ds/Icon';
import { ProjectImage } from './ProjectImage';
import { projectAspect } from '@/lib/gallery';
import type { GalleryProject } from '@/types/gallery';

/**
 * One exhibition tile. Image layering (outer → in):
 *   mask (overflow-hidden, owns aspect ratio)
 *   └ [data-greveal]  scrubbed clip-path reveal + scale 1.08→1 + fade + rise
 *     └ [data-gpar]   oversized layer for the independent parallax drift
 *       └ hover layer scale on hover/focus (power3.out)
 *         └ ProjectImage
 * Hover also fades a scrim, slides the "View" label up, nudges the arrow, and
 * fades in the location. Fully a link, so hover state mirrors on keyboard focus.
 */
export function GalleryItem({ project, priority = false }: { project: GalleryProject; priority?: boolean }) {
  return (
    <article data-gallery-item="" data-slug={project.slug} className="group">
      <Link
        href={`/work/${project.slug}`}
        className="block rounded-lg hover:no-underline focus-visible:outline-none"
        aria-label={`${project.title} — ${project.service}, ${project.location}`}
      >
        <div
          className="relative overflow-hidden rounded-lg bg-sunken"
          style={{ aspectRatio: projectAspect(project.slug) }}
        >
          <div data-greveal="" className="absolute inset-0">
            <div data-gpar="" className="absolute inset-x-0 -top-[14%] h-[128%]">
              <div className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
                <ProjectImage slug={project.slug} src={project.coverImage} alt={project.title} priority={priority} />
              </div>
            </div>
          </div>

          {/* hover scrim + meta */}
          <div className="pointer-events-none absolute inset-0 bg-[var(--overlay-scrim)] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 font-display text-[1.0625rem] font-semibold text-white opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              View
              <span className="transition-transform duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:translate-x-[7px] group-focus-visible:translate-x-[7px]">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </span>
            <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[length:var(--text-caption-size)] text-white opacity-0 transition-opacity delay-75 duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:opacity-100 group-focus-visible:opacity-100">
              <Icon name="mapPin" size={12} />
              {project.location}
            </span>
          </div>

          {project.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-[rgba(255,255,255,.18)] px-2 py-[3px] text-[length:var(--text-micro-size)] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">
              Featured
            </span>
          )}
          {project.status === 'Ongoing' && (
            <span className="absolute right-3 top-3 rounded-full bg-[rgba(10,12,16,.4)] px-2 py-[3px] text-[length:var(--text-micro-size)] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">
              Ongoing
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between gap-2">
            <span className="t-micro text-primary">{project.service}</span>
            <span className="font-mono text-[length:var(--text-caption-size)] text-muted">{project.year}</span>
          </div>
          <h3 className="t-h4 mt-1 text-heading transition-[color,transform] duration-300 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:-translate-y-0.5 group-hover:text-primary">
            {project.title}
          </h3>
          <p className="t-caption mt-1 flex flex-wrap items-center gap-x-1.5">
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="mapPin" size={12} />
              {project.location}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
