interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="w-full px-6 py-12">
      <div className="prose prose-neutral max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-muted-foreground">
          Content coming soon.
        </p>
      </div>
    </div>
  );
}
