import { LOADER_BACKDROP } from '@/components/loader/backdrop';

/**
 * Route-loading fallback. Paints the loader's ground layer, so the streaming
 * window and the loader's opening frame are the same surface — the transition
 * into the piece is invisible. Mostly a dev artifact: the homepage is static in
 * production and serves instantly.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: LOADER_BACKDROP }}
    />
  );
}
