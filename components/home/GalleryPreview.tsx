import type { CSSProperties } from 'react';
import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { galleryTiles, type GalleryTile } from '@/data/gallery';

const TILE_BG = {
  brand: 'linear-gradient(135deg, var(--violet-500), var(--blue-500))',
  violet: 'linear-gradient(150deg, var(--violet-600), var(--violet-900))',
  blue: 'linear-gradient(140deg, var(--blue-500), var(--blue-700))',
} as const;

function Tile({ tile }: { tile: GalleryTile }) {
  return (
    <div
      className={`relative h-44 shrink-0 overflow-hidden rounded-lg ${tile.wide ? 'w-[420px]' : 'w-[300px]'}`}
      style={{ backgroundImage: TILE_BG[tile.tint] }}
    >
      <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[rgba(255,255,255,.25)]" />
      <span className="absolute bottom-[36%] left-[10%] h-px w-2/5 bg-[rgba(255,255,255,.3)]" />
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,var(--overlay-scrim),transparent)] p-2">
        <p className="t-micro text-ondark-muted">{tile.category}</p>
        <p className="text-[length:var(--text-body-sm-size)] font-semibold text-ondark">{tile.title}</p>
      </div>
    </div>
  );
}

/**
 * Gallery preview — a full-bleed exhibition strip, not cards in a grid. Two
 * rows drift in opposite directions (transform-only, paused on hover); the
 * duplicated track makes the loop seamless. Reduced motion: rows stand still.
 */
export function GalleryPreview() {
  const rowA = galleryTiles.slice(0, 4);
  const rowB = galleryTiles.slice(4);
  return (
    <section aria-label="Gallery preview" className="overflow-hidden">
      <Container className="pb-6 pt-section-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Reveal>
              <p className="t-eyebrow">The gallery</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-h1 mt-2">Work you can see.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Button href="/work" variant="ghost" iconRight="arrowRight">
              Open the Gallery
            </Button>
          </Reveal>
        </div>
      </Container>

      <Reveal className="marquee-paused flex flex-col gap-3 pb-section-sm">
        <div aria-hidden="true" className="marquee-track gap-3 pr-3">
          {[...rowA, ...rowA].map((tile, i) => (
            <Tile key={`${tile.title}-${i}`} tile={tile} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="marquee-track marquee-reverse gap-3 pr-3"
          style={{ '--marquee-dur': '64s' } as CSSProperties}
        >
          {[...rowB, ...rowB].map((tile, i) => (
            <Tile key={`${tile.title}-${i}`} tile={tile} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
