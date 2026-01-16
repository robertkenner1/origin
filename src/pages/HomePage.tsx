export function HomePage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-6 py-12">
        {/* About Origin Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">About Origin</h2>
          <p className="text-muted-foreground max-w-3xl">
            Content coming soon.
          </p>
        </section>

        {/* Support Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p className="text-muted-foreground max-w-3xl">
            Content coming soon.
          </p>
        </section>

        {/* What's New Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">What's New</h2>
          <p className="text-muted-foreground max-w-3xl">
            Content coming soon.
          </p>
        </section>
      </div>
    </div>
  );
}


