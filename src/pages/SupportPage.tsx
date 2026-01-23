import { OverviewHeader } from '@/components/OverviewHeader';

export function SupportPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Support"
          description="Find help, resources, and answers to common questions about the Origin design system. We're here to support your journey."
          backgroundColor="#E5D5F8"
        />
      </div>
    </div>
  );
}
