'use client';
import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { ProjectImage } from './ProjectImage';
import { GalleryLightbox } from './GalleryLightbox';
import type { GalleryProject } from '@/types/gallery';

/** Editorial image gallery with an accessible lightbox. */
export function ProjectGallery({ project }: { project: GalleryProject }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-label="Project gallery" className="relative">
      <Container className="pb-section-sm">
        <Reveal>
          <p className="t-eyebrow">Gallery</p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {project.galleryImages.map((img, i) => {
            const feature = i % 3 === 0;
            return (
              <Reveal key={img} className={feature ? 'sm:col-span-2 lg:col-span-4' : 'lg:col-span-2'}>
                <button
                  onClick={() => setOpen(i)}
                  aria-label={`Open image ${i + 1} of ${project.title}`}
                  className="group relative block w-full overflow-hidden rounded-lg bg-sunken"
                  style={{ aspectRatio: feature ? '16 / 9' : '1 / 1' }}
                >
                  <div className="absolute inset-0 transition-transform duration-[var(--duration-page)] ease-[var(--ease-out)] will-change-transform group-hover:scale-[1.04]">
                    <ProjectImage slug={`${project.slug}-${i}`} src={img} alt={`${project.title} — image ${i + 1}`} />
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {open !== null && (
        <GalleryLightbox project={project} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </section>
  );
}
