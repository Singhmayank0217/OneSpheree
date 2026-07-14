# OneSpheree — Enterprise Website

Next.js App Router · TypeScript · Tailwind (mapped to OneSpheree DS tokens) · GSAP + ScrollTrigger · Lenis

## Run

```bash
npm install
npm run dev
```

## Architecture

- `styles/variables.css` — Design System tokens, verbatim. Single source of truth; never hardcode values.
- `tailwind.config.ts` — every Tailwind utility maps to a token variable.
- `lib/animations.ts` — all easing/duration/stagger constants (Motion Specification).
- `providers/` — one Lenis instance, one GSAP registration.
- `components/ds/` — Design System primitive ports (Button, Icon, Badge…).
- `components/animations/` — Reveal, RevealText, Counter, Magnetic, Parallax wrappers.
- `data/` — all business content; components never hardcode copy.

See `../PLAN.md` for the full sitemap and build order.
