import { BootFrame } from '@/components/loader/FableLoader';

/**
 * Route-loading fallback. Renders the Fable loader's exact opening frame
 * (dark backdrop, all animated elements are still at opacity 0 at t=0), so
 * the compile/stream window reads as the loader beginning — the piece then
 * continues seamlessly from this frame once the page mounts. Mostly a dev
 * artifact: the homepage is static in production and serves instantly.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: '#02040a' }}
    >
      <BootFrame />
    </div>
  );
}
