import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { GalleryItem } from './GalleryItem';
import { getRelatedProjects } from '@/lib/gallery';
import type { GalleryProject } from '@/types/gallery';

/** Three projects nearest by service/industry. */
export function RelatedProjects({ project }: { project: GalleryProject }) {
  const related = getRelatedProjects(project, 3);
  return (
    <section aria-label="Related projects" className="relative">
      <Container className="py-section">
        <Reveal>
          <p className="t-eyebrow">Related work</p>
        </Reveal>
        <RevealText text="More from the portfolio." as="h2" className="t-display mt-2" />
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <GalleryItem key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
