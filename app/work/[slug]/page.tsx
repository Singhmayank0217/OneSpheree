import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectHero } from '@/components/gallery/ProjectHero';
import { ProjectStory } from '@/components/gallery/ProjectStory';
import { ProjectGallery } from '@/components/gallery/ProjectGallery';
import { RelatedProjects } from '@/components/gallery/RelatedProjects';
import { NextProject } from '@/components/gallery/NextProject';
import { galleryProjects } from '@/data/gallery';
import { getProjectBySlug } from '@/lib/gallery';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return galleryProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectStory project={project} />
      <ProjectGallery project={project} />
      <RelatedProjects project={project} />
      <NextProject project={project} />
    </>
  );
}
