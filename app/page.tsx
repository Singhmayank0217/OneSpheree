import { FableLoader } from '@/components/loader/FableLoader';
import { Hero } from '@/components/home/Hero';
import { ServiceScenes } from '@/components/home/ServiceScenes';
import { AboutStatement } from '@/components/home/AboutStatement';
import { WhyOneSpheree } from '@/components/home/WhyOneSpheree';
import { IndustriesReveal } from '@/components/home/IndustriesReveal';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { GlobalPresence } from '@/components/home/GlobalPresence';
import { ProofStats } from '@/components/home/ProofStats';
import { TestimonialStage } from '@/components/home/TestimonialStage';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactCTA } from '@/components/home/ContactCTA';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
});

/**
 * Home — one continuous scroll story in three acts:
 * dark act I (hero → service transformation scenes, ending in a light handoff),
 * light act II (about → why → industries → work → gallery → case),
 * dark act III (global presence → proof), then the light close (testimonials,
 * FAQ) and the dark send-off (contact CTA → footer).
 */
export default function HomePage() {
  return (
    <>
      <FableLoader />
      <Hero />
      <ServiceScenes />
      <AboutStatement />
      <WhyOneSpheree />
      <IndustriesReveal />
      <FeaturedWork />
      <GalleryPreview />
      <PortfolioPreview />
      <GlobalPresence />
      <ProofStats />
      <TestimonialStage />
      <FaqSection />
      <ContactCTA />
    </>
  );
}
