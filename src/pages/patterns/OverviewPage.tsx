import { OverviewHeader } from '@/components/OverviewHeader';

export function PatternsOverviewPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-12 pb-12">
        <OverviewHeader
          title="Patterns"
          description="Design patterns are reusable solutions to common design problems. They provide tested approaches for creating consistent, effective user experiences across our products."
          backgroundColor="#DDD9F9"
        />
      </div>
    </div>
  );
}
