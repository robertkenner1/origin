import { OverviewHeader } from '@/components/OverviewHeader';

export function ContributingPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3">
        <OverviewHeader
          title="Contributing"
          description="We welcome and greatly appreciate contributions to Origin. Learn how to add components, update existing ones, and propose new designs that benefit the entire product ecosystem."
          backgroundColor="#FFD1D0"
        />
      </div>
      <div className="w-full px-6 py-4 pb-12">
        <div className="prose prose-sm max-w-none">
          <h2>Adding a component in code</h2>
          <p>
            We welcome and greatly appreciate contributions to Origin! Listed below are the resources 
            and guidelines for contributing.
          </p>

          <h2>Adding a component in code</h2>
          <p>If you wish to add a component to Origin, follow the steps below:</p>
          <ol>
            <li>
              Discuss the potential contribution with the Origin team in{' '}
              <a href="#" className="text-primary hover:underline">#ask-origin-design-system</a>
            </li>
            <li>
              Read the{' '}
              <a href="#" className="text-primary hover:underline">contribution process guidelines</a>
            </li>
            <li>
              Write a schema doc based on{' '}
              <a href="#" className="text-primary hover:underline">this template</a>
            </li>
            <li>Once the schema is written, share for review in #ask-origin-design-system</li>
            <li>
              After the schema is approved,{' '}
              <a href="#" className="text-primary hover:underline">development begins</a>!
            </li>
          </ol>
          <p>Always feel free to ask questions along the way!</p>

          <h2>Updating a current component</h2>
          <p>
            If you'd like to add a new variation of a component that's already implemented in code, 
            or you find a bug you'd like to fix, please reach out in{' '}
            <a href="#" className="text-primary hover:underline">#ask-origin-design-system</a> and 
            the Origin team will help coordinate your update.
          </p>

          <h2>Proposing a new component design</h2>
          <p>
            If you would like to propose a new component candidate for Origin, please join{' '}
            <a href="#" className="text-primary hover:underline">Office Hours</a> to discuss your 
            use case and provide context.
          </p>
          <p>Successful component candidates will:</p>
          <ul>
            <li>Solve a problem that can't be solved with an existing component or pattern</li>
            <li>Scale to fit different use cases in the product</li>
            <li>Meet accessibility standards</li>
            <li>Use Origin Foundations styles</li>
            <li>
              Be designed with flexibility in mind, allowing for future updates and improvements 
              without major changes to the system
            </li>
          </ul>

          <h2>Guidelines and templates</h2>
          <div className="grid grid-cols-2 gap-4 not-prose my-6">
            <div className="p-6 rounded-xl border border-border">
              <h3 className="text-base font-semibold mb-2">Component conventions</h3>
              <p className="text-sm text-muted-foreground">
                Refer to the following guidelines whenever you're adding or updating a component.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border">
              <h3 className="text-base font-semibold mb-2">Component page template</h3>
              <p className="text-sm text-muted-foreground">
                This template shows the required and optional portions for a component detail page. 
                We follow the Brand Style Guide and some specific writing conventions to keep a 
                consistent style. Read the writing conventions.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border">
              <h3 className="text-base font-semibold mb-2">Writing conventions</h3>
              <p className="text-sm text-muted-foreground">
                We use these conventions to keep a consistent style across new documentation pages 
                in GDS. These writing conventions should not be applied to the product. Instead, 
                reference the Content Design System in Origin.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border">
              <h3 className="text-base font-semibold mb-2">Publishing your design components</h3>
              <p className="text-sm text-muted-foreground">
                This page details the process for designers to add and publish components to the 
                Origin Design Toolkit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
