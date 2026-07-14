import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { Chip } from '@/components/ds/Chip';
import { Icon } from '@/components/ds/Icon';
import { ProjectImage } from '@/components/gallery/ProjectImage';
import { getDetailBlocks } from '@/lib/portfolio';
import type { DetailBlock, PortfolioProject } from '@/types/portfolio';

/**
 * Service-adaptive detail body. The block SEQUENCE differs per vertical
 * (see lib/portfolio → getDetailBlocks) while every block is rendered from the
 * same small set of primitives — one design language, six distinct shapes.
 */
export function PortfolioDetail({ project }: { project: PortfolioProject }) {
  const blocks = getDetailBlocks(project);
  return (
    <div className="relative">
      {blocks.map((block, i) => (
        <Block key={i} block={block} project={project} index={i} />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <p className="t-eyebrow">{children}</p>
    </Reveal>
  );
}

function Block({ block, project, index }: { block: DetailBlock; project: PortfolioProject; index: number }) {
  const first = index === 0;
  const pad = first ? 'pt-section-sm pb-6' : 'py-6';

  switch (block.type) {
    case 'prose':
      return (
        <Container className={pad}>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <SectionLabel>{block.label}</SectionLabel>
            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-lh)] text-body">
                {block.body}
              </p>
            </Reveal>
          </div>
        </Container>
      );

    case 'specs':
      return (
        <Container className={pad}>
          <SectionLabel>{block.label}</SectionLabel>
          <Reveal delay={0.05} className="mt-4 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2">
            {block.items.map((it) => (
              <div key={it.k} className="flex flex-col gap-0.5 border-b border-line pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="t-micro text-muted">{it.k}</span>
                <span className="font-medium text-heading sm:text-right">{it.v}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      );

    case 'metrics':
      return (
        <Container className={pad}>
          <SectionLabel>{block.label}</SectionLabel>
          <Reveal delay={0.05} stagger="stats" className="mt-4 grid grid-cols-2 gap-6 border-t border-line pt-6 lg:grid-cols-4">
            {block.items.map((m, i) => (
              <div key={i}>
                <p className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-primary">
                  {m.value}
                </p>
                <p className="t-caption mt-1.5">{m.label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      );

    case 'process':
      return (
        <Container className={pad}>
          <SectionLabel>{block.label}</SectionLabel>
          <div className="mt-4">
            {block.steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.05}
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-5 last:border-b lg:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-[length:var(--text-body-sm-size)] text-primary">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="t-h4">{s.title}</h3>
                  <p className="mt-1.5 max-w-[54ch] text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      );

    case 'chips':
      return (
        <Container className={pad}>
          <SectionLabel>{block.label}</SectionLabel>
          <Reveal delay={0.05} className="mt-3 flex flex-wrap gap-2">
            {block.items.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </Reveal>
        </Container>
      );

    case 'quote':
      return (
        <Container className={pad}>
          <Reveal className="border-l-2 border-primary pl-5 lg:pl-8">
            <p className="t-h3 max-w-[46ch] font-display font-semibold text-heading">“{block.body}”</p>
            <p className="t-caption mt-3 text-muted">— {block.attribution}</p>
          </Reveal>
        </Container>
      );

    case 'gallery':
      return (
        <Container className={pad}>
          <SectionLabel>{block.label}</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {project.galleryImages.map((img, i) => {
              const feature = i % 3 === 0;
              return (
                <Reveal key={img} className={feature ? 'sm:col-span-2 lg:col-span-4' : 'lg:col-span-2'}>
                  <div
                    className="group relative overflow-hidden rounded-lg bg-sunken"
                    style={{ aspectRatio: feature ? '16 / 9' : '1 / 1' }}
                  >
                    <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:scale-[1.04]">
                      <ProjectImage slug={`${project.slug}-${i}`} src={img} alt={`${project.title} — image ${i + 1}`} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      );

    case 'status':
      return (
        <Container className={pad}>
          <Reveal className="flex items-center gap-3 rounded-xl border border-line bg-sunken px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name={project.status === 'Completed' ? 'check' : 'clock'} size={18} />
            </span>
            <div>
              <p className="t-micro text-muted">{block.label}</p>
              <p className="font-medium text-heading">
                {project.status === 'Completed'
                  ? `Delivered and certified — ${project.date}.`
                  : `In delivery — on track as of ${project.date}.`}
              </p>
            </div>
          </Reveal>
        </Container>
      );
  }
}
