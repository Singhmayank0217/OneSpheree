import Image from 'next/image';
import { HAS_REAL_IMAGERY, projectGradient, projectMotif } from '@/lib/gallery';

/**
 * The project image slot. When `HAS_REAL_IMAGERY` is on and a file exists at
 * `src`, this renders a lazy, responsive `next/image` (blur placeholder, modern
 * formats). Until then it paints a deterministic token-gradient composition in
 * the exact same box — no broken images, no eager network load, photo-ready.
 *
 * Fills its positioned parent; the parent owns aspect ratio, overflow, radius,
 * and the reveal / hover transforms.
 */
export function ProjectImage({
  slug,
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: {
  slug: string;
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (HAS_REAL_IMAGERY) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover"
      />
    );
  }

  const motif = projectMotif(slug);
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ backgroundImage: projectGradient(slug) }}
    >
      {/* editorial composition — varied per project so the grid never repeats */}
      {motif === 0 && (
        <>
          <span className="absolute -right-[12%] -top-[12%] aspect-square w-1/2 rounded-full border border-[rgba(255,255,255,.22)]" />
          <span className="absolute bottom-[26%] left-[10%] h-px w-2/5 bg-[rgba(255,255,255,.28)]" />
        </>
      )}
      {motif === 1 && (
        <>
          <span className="absolute left-1/2 top-1/2 aspect-square w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,.2)]" />
          <span className="absolute left-1/2 top-1/2 aspect-square w-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,.12)]" />
        </>
      )}
      {motif === 2 && (
        <>
          <span className="absolute right-[14%] top-[18%] h-2/3 w-px bg-[rgba(255,255,255,.24)]" />
          <span className="absolute bottom-[18%] left-[14%] aspect-square w-1/4 rounded-md bg-[rgba(255,255,255,.12)]" />
        </>
      )}
      {motif === 3 && (
        <>
          <span className="absolute -left-[8%] top-[12%] aspect-square w-2/5 rounded-full border border-[rgba(255,255,255,.18)]" />
          <span className="absolute right-[16%] top-1/2 h-px w-1/3 -translate-y-1/2 bg-[rgba(255,255,255,.26)]" />
        </>
      )}
      {/* soft depth so the flat gradient reads as a composed image */}
      <span className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,rgba(255,255,255,.12),transparent_55%)]" />
    </div>
  );
}
