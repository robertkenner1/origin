export function HomePage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Origin Design Toolkit
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A comprehensive design system documentation for building consistent, 
            accessible, and beautiful user interfaces.
          </p>
          <div className="flex gap-4">
            <a
              href="/components"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse Components
            </a>
            <a
              href="/patterns"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              View Patterns
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

