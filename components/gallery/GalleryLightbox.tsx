'use client';
import { useEffect } from 'react';
import { Icon } from '@/components/ds/Icon';
import { ProjectImage } from './ProjectImage';
import type { GalleryProject } from '@/types/gallery';

/** Accessible image lightbox — Escape closes, arrows navigate, scroll locked. */
export function GalleryLightbox({
  project,
  index,
  onClose,
  onNavigate,
}: {
  project: GalleryProject;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const total = project.galleryImages.length;
  const go = (dir: number) => onNavigate((index + dir + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % total);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, total, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery, image ${index + 1} of ${total}`}
      className="fixed inset-0 z-modal flex items-center justify-center bg-[var(--overlay-scrim-strong)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,.3)] text-white transition-colors hover:bg-[rgba(255,255,255,.12)]"
      >
        <Icon name="x" size={22} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,.3)] text-white transition-colors hover:bg-[rgba(255,255,255,.12)] lg:left-6"
      >
        <Icon name="chevronRight" size={22} className="rotate-180" />
      </button>

      <figure
        className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-xl bg-sunken"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectImage
          slug={`${project.slug}-${index}`}
          src={project.galleryImages[index]}
          alt={`${project.title} — image ${index + 1}`}
          priority
          sizes="90vw"
        />
      </figure>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,.3)] text-white transition-colors hover:bg-[rgba(255,255,255,.12)] lg:right-6"
      >
        <Icon name="chevronRight" size={22} />
      </button>

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[length:var(--text-body-sm-size)] text-white">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}
