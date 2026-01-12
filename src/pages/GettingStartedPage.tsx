import { GettingStartedLayout } from '@/components/layout/GettingStartedLayout';

export function GettingStartedPage() {
  return (
    <GettingStartedLayout>
      <div className="bg-white rounded-2xl p-12 shadow-sm">
        <div className="prose prose-sm max-w-none">
            <h1>Overview</h1>
            <p className="text-lg text-muted-foreground">
              The Origin System provides foundational tokens and components to accelerate your work while 
              providing consistency and accessibility across Superhuman product offerings.
            </p>

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

            <h2>Contributions</h2>
            <p>
              Please follow our <a href="#" className="text-primary hover:underline">contribution guidelines</a> if 
              you're interested in contributing a new component or updating an existing one.
            </p>

            <h2>Support</h2>
            <p>
              For any questions about development or components, see our <a href="#" className="text-primary hover:underline">support guide</a>.
            </p>
          </div>
        </div>
    </GettingStartedLayout>
  );
}
