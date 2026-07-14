import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { galleryProjects } from '@/data/gallery';

/** Work page hero — large editorial headline over the continuous light field. */
export function GalleryHero() {
  return (
    <section aria-label="Selected work" className="relative">
      <Container className="pb-6 pt-[132px] lg:pb-10 lg:pt-[168px]">
        <Reveal>
          <p className="t-eyebrow">Work</p>
        </Reveal>
        <RevealText
          text="Everything we've made."
          as="h1"
          className="t-hero mt-3 max-w-[14ch]"
          immediate
        />
        <Reveal delay={0.2}>
          <p className="t-body-lg mt-5 max-w-reading text-muted">
            A visual record of the work OneSpheree has made — brand systems, websites, campaigns,
            storefronts, fire-safety installations, spaces and product photography across all six verticals.
            Browse the {galleryProjects.length}-piece gallery by discipline.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
