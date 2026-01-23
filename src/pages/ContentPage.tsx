import { OverviewHeader } from '@/components/OverviewHeader';

export function ContentPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Content"
          description="Guidelines for writing clear, consistent, and effective content across the Origin design system. Learn our voice, tone, and writing standards."
          backgroundColor="#F8D5E8"
        />
      </div>
    </div>
  );
}
