export function IntroductionPage() {
  return (
    <div className="w-full px-6 py-12">
      <div className="prose prose-sm max-w-none">
            <h1>Introduction to Origin</h1>
            <p>Below are some key terms we use when talking about the Origin design system.</p>

            <h2>Principles</h2>
            <p>
              Guiding principles to help us work in a consistent and purposeful way.{' '}
              <a href="#" className="text-primary hover:underline">View our Origin principles</a>.
            </p>

            <h2>Foundations</h2>
            <p>
              Visual elements like color, space, typography, and elevation that define our visual 
              language across products and platforms. It also includes non-visual elements like 
              accessibility and content standards that are fundamental to building our products.{' '}
              <a href="#" className="text-primary hover:underline">View our Foundation guidelines</a>.
            </p>

            <h2>Tokens</h2>
            <p>
              The coded representation of the design decisions found in the design system. These 
              values include, but are not limited to, foundational elements.{' '}
              <a href="/tokens" className="text-primary hover:underline">View our design Tokens</a>.
            </p>

            <h2>Components</h2>
            <p>
              Basic elements in an interface that are reusable across the product. These include 
              simple elements, like Buttons, or more complex elements, like Modal, that are built 
              from a group of simpler elements.{' '}
              <a href="/components" className="text-primary hover:underline">View our Components</a>.
            </p>

            <h2>Patterns</h2>
            <p>
              A reusable solution to a common design problem. For example, common, reusable form 
              layouts using individual form components.{' '}
              <a href="#" className="text-primary hover:underline">View our Pattern guidelines</a>.
            </p>

            <h2>Templates</h2>
            <p>
              A larger concept that comprises a whole layout of a page. Landing pages may follow a 
              common template.
            </p>

            <h2>Partners</h2>
            <p>
              We consider anyone who uses and/or contributes to Origin a partner. We aim to partner 
              with teams to produce a design system that reflects their diverse perspectives, needs, 
              and areas of expertise.
            </p>
          </div>
    </div>
  );
}
