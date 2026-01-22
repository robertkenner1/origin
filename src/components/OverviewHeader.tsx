interface OverviewHeaderProps {
  title: string;
  description: string;
  backgroundColor?: string;
}

export function OverviewHeader({ title, description, backgroundColor = '#F2F0EB' }: OverviewHeaderProps) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden mb-8">
      <div className="flex">
        {/* Text Content */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Image Placeholder */}
        <div
          className="w-[600px]"
          style={{ backgroundColor }}
        />
      </div>
    </div>
  );
}
