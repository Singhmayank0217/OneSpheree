import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryExplorer } from '@/components/gallery/GalleryExplorer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'A cross-disciplinary portfolio from OneSpheree — marketing, due diligence, fire safety, e-commerce and workforce solutions delivered across every industry.',
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
