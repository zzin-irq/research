export default function Dashboard() {
  return (
    <>
      <h1 className="font-serif text-3xl">Dashboard</h1>
      <p className="mt-2 text-text-muted">Overview of recent edits, drafts, and upcoming events.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Drafts', '4'],
          ['Published this month', '11'],
          ['Upcoming events', '3']
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-border bg-surface p-5">
            <p className="text-sm text-text-muted">{label}</p>
            <p className="mt-1 text-2xl font-medium">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
