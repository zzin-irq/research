export function LoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[40vh] flex items-center justify-center text-text-muted"
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}
