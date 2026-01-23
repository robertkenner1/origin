export function GlossaryPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold mb-6">Glossary</h1>
          <p className="text-base text-muted-foreground mb-8">
            Below are some key terms we use when talking about the Origin design system.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Principles</h2>
              <p className="text-base text-muted-foreground">
                Guiding principles to help us work in a consistent and purposeful way. View our Origin principles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Foundations</h2>
              <p className="text-base text-muted-foreground">
                Visual elements like color, space, typography, and elevation that define our visual language across products and platforms. It also includes non-visual elements like accessibility and content standards that are fundamental to building our products. View our Foundation guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Tokens</h2>
              <p className="text-base text-muted-foreground">
                The coded representation of the design decisions found in the design system. These values include, but are not limited to, foundational elements. View our design Tokens.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Components</h2>
              <p className="text-base text-muted-foreground">
                Basic elements in an interface that are reusable across the product. These include simple elements, like Buttons, or more complex elements, like Modal, that are built from a group of simpler elements. View our Components.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Patterns</h2>
              <p className="text-base text-muted-foreground">
                A reusable solution to a common design problem. For example, common, reusable form layouts using individual form components. View our Pattern guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Templates</h2>
              <p className="text-base text-muted-foreground">
                A larger concept that comprises a whole layout of a page. Landing pages may follow a common template.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Partners</h2>
              <p className="text-base text-muted-foreground">
                We consider anyone who uses and/or contributes to Origin a partner. We aim to partner with teams to produce a design system that reflects their diverse perspectives, needs, and areas of expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
