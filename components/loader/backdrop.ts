/**
 * The loader's ground layer. Lives in its own module so the route-loading
 * fallback (app/loading.tsx, a server component) can paint the identical frame
 * without pulling in the loader's client bundle.
 */
export const LOADER_BACKDROP =
  'radial-gradient(120% 90% at 50% 42%, #0e1a34 0%, #070d1b 46%, #03050c 100%)';
