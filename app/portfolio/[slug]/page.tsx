import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioProjectHero } from '@/components/portfolio/PortfolioProjectHero';
import { PortfolioDetail } from '@/components/portfolio/PortfolioDetail';
import { RelatedPortfolio } from '@/components/portfolio/RelatedPortfolio';
import { NextPortfolioProject } from '@/components/portfolio/NextPortfolioProject';
import { portfolioProjects } from '@/data/portfolio';
import { getPortfolioBySlug } from '@/lib/portfolio';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.overview,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <PortfolioProjectHero project={project} />
      <PortfolioDetail project={project} />
      <RelatedPortfolio project={project} />
      <NextPortfolioProject project={project} />
    </>
  );
}
