import { OverviewHeader } from '@/components/OverviewHeader';

export function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-12">
        <OverviewHeader
          title="Getting started"
          description="Begin your journey with Origin. Learn how to install, configure, and start building with our design system and component library."
          backgroundColor="#D1DBFE"
        />
      </div>
      <div className="w-full px-6 py-4 pb-12">
        <div className="prose prose-sm max-w-none">
            <h2>What's available</h2>
            <p>
              See <a href="#" className="text-primary hover:underline">Components Status</a> for available and upcoming components. 
              Note that components are only supported on Web platforms.
            </p>
            <p>
              We also supply tokens for our UI <a href="/tokens" className="text-primary hover:underline">foundations</a> such 
              as color, space, and typography.
            </p>

            <h2>Libraries</h2>
            <div className="grid grid-cols-2 gap-4 not-prose my-6">
              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-base font-semibold mb-2">Web (JavaScript)</h3>
                <p className="text-sm text-muted-foreground">
                  The JavaScript library includes React components as well as tokens that can be used directly in code 
                  or as CSS variables.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-base font-semibold mb-2">Styling Custom Components</h3>
                <p className="text-sm text-muted-foreground">
                  Do you need a custom component?
                </p>
              </div>
            </div>

            <h2>Support</h2>
            <p>
              For any questions about development or components, see our <a href="#" className="text-primary hover:underline">support guide</a>.
            </p>
        </div>
      </div>
    </div>
  );
}
