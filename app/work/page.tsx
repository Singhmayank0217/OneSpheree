import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryExplorer } from '@/components/gallery/GalleryExplorer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our Work — Client Projects & Case Studies',
  description:
    'Browse OneSpheree\'s project gallery — real-world engagements across digital marketing, fire safety, due diligence, e-commerce, manpower solutions, sales consulting, and financial compliance delivered for clients worldwide.',
  path: '/work',
});

/** The Work / Gallery page — a premium editorial exhibition of OneSpheree projects. */
export default function WorkPage() {
  return (
    <>
      <GalleryHero />
      <GalleryExplorer />
    </>
  );
}
