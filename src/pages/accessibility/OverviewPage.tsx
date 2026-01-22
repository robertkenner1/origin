import { OverviewHeader } from '@/components/OverviewHeader';

export function AccessibilityOverviewPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Accessibility"
          description="Accessibility is fundamental to creating inclusive experiences. Our guidelines and components ensure that everyone can use our products effectively, regardless of their abilities or circumstances."
          backgroundColor="#D5F7EB"
        />
      </div>
    </div>
  );
}
