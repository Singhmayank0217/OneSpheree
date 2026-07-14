export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-pulse rounded-full bg-brand" />
        <p className="t-caption">Preparing your experience…</p>
      </div>
    </div>
  );
}
