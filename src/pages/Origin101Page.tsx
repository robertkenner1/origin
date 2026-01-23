import { OverviewHeader } from '@/components/OverviewHeader';

export function Origin101Page() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Origin 101"
          description="Get started with the Origin design system. Learn the fundamentals, installation process, and how to integrate Origin into your projects."
          backgroundColor="#FFE5D9"
        />
      </div>
    </div>
  );
}
