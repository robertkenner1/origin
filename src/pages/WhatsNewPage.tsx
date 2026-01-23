import { OverviewHeader } from '@/components/OverviewHeader';

export function WhatsNewPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="What's new"
          description="Stay up to date with the latest updates, improvements, and additions to the Origin design system."
          backgroundColor="#D5E0FF"
        />
      </div>
    </div>
  );
}
