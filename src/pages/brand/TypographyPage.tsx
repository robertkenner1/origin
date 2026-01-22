export function BrandTypographyPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Typography</h1>
          <p className="text-muted-foreground">
            Type scale, font families, and guidelines for consistent text styling.
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-muted/30 p-12">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-2xl bg-white border border-border/50">
              <span className="text-5xl font-bold text-foreground">Aa</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Typography Guidelines Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              This section will include type scale specifications, font family details, pairing guidelines, and accessibility recommendations.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
              <span className="bg-muted px-3 py-1 rounded-full">Type Scale</span>
              <span className="bg-muted px-3 py-1 rounded-full">Font Families</span>
              <span className="bg-muted px-3 py-1 rounded-full">Font Weights</span>
              <span className="bg-muted px-3 py-1 rounded-full">Line Heights</span>
              <span className="bg-muted px-3 py-1 rounded-full">Letter Spacing</span>
              <span className="bg-muted px-3 py-1 rounded-full">Web Fonts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
