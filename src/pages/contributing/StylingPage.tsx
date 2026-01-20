export function StylingPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="prose prose-sm max-w-none">
            <h1>Styling Custom Components with GDS</h1>
            
            <h2>Do you need a custom component?</h2>
            <p>
              It's easy to tell if you can rely on the design system or if you need to build a custom 
              component.
            </p>
            <p>
              If a component matches most of your requirements but not all, reach out on Slack at{' '}
              <strong>#ask-origin-design-system</strong>. We can help update that component as needed 
              or, in some cases, give you tips on how to cover the gaps with CSS styling.
            </p>
            <p>
              You can also reach out to a Product Designer to see if there's flexibility to align the 
              proposed design to Origin standards.
            </p>
            <p>
              If you land on creating a custom component, reach out to the Origin team and clarify 
              your use case before starting any work. We'll let you know if something similar is 
              already on our roadmap, or help you evaluate how to meet our accessibility standards.
            </p>

            <h2>Why are custom components useful?</h2>
            <p>
              Origin aspires to cover as many needs as possible for teams to build product UI, but 
              sometimes custom components are beneficial. There are some common reasons:
            </p>
            <ul>
              <li>
                You need a component that's on the Origin roadmap, but it won't be built in time for 
                your particular launch.
              </li>
              <li>
                You need a component that isn't on the Origin roadmap, and we don't have a timeline 
                for when it will be available.
              </li>
              <li>You need a component that is too specific to be part of the design system.</li>
            </ul>
            <p>
              While building something twice is not ideal, it may be the best way to ensure a product 
              ships on time. The Origin team needs enough time to build an ideal experience that can 
              live as a reusable part of our design system. Similarly, Origin maintains components that 
              can be applied in multiple scenarios, so extremely unique components will likely not be 
              included in the system.
            </p>
            <p>
              No matter the reason for creating a custom component, we rely on you to take care that 
              all components still match Superhuman's visual style and follow accessibility best 
              practices. Origin offers design tokens, typography, and utility components to help you 
              do that.
            </p>

            <h2>Creating custom components</h2>
            <p>
              If you have confirmed with the Origin team that a custom component is truly the only 
              option, there are a few approaches you can take.
            </p>

            <h3>Use Origin primitive components</h3>
            <p>
              Origin offers primitive components that you can combine to create more complex 
              components. Flex, Text, Heading, and Icon are usually all you need to create a 
              component—or at least a solid foundation for one.
            </p>
            <p>
              These components reference our design tokens and allow you to more easily maintain a 
              consistent, accessible visual style for your custom component. This example of a card 
              demonstrates how to use these utility components to achieve a specific goal.
            </p>
            <p>
              Visit the component documentation and Storybook to browse examples that might spark 
              inspiration for your use case.
            </p>

            <pre><code>{`<Flex
  gap={6}
  direction="column"
  padding={4}
  width={400}
  borderColor="base-subdued"
  borderRadius={2}
>
  <Flex gap={2} align="center" marginLeft={-1}>
    <Icon
      icon={OutcomeCorrectnessIcon}
      size="medium"
      accessibilityLabel="Correctness Category"
    />
    <Text variant="text-small" as="p">
      Correctness
    </Text>
    <Text variant="text-small" as="span">
      ‧
    </Text>
    <Text variant="text-small" as="p">
      Capitalize the word
    </Text>
    <IconButton
      accessibilityLabel="Details about this correction"
      icon={InfoIcon}
      variant="tertiary"
      onClick={() => {}}
    />
  </Flex>
  <Flex gap={1}>
    <ScreenReaderOnly>delete "today (spelling t o d a y)"</ScreenReaderOnly>
    <Text variant="text-medium" as="p" decoration="line-through">
      today
    </Text>
    <ScreenReaderOnly>
      insert "Today (spelling capital T o d a y)"
    </ScreenReaderOnly>
    <Text as="p" weight="bold">
      Today
    </Text>{" "}
    is a great day!
  </Flex>
  <Flex justify="space-between" align="center" gap={4} marginLeft={-2}>
    <Button
      variant="tertiary"
      text="Previous"
      accessibilityLabel="Back to previous step"
    />
    <Text as="p" variant="text-small">
      3 of 6<ScreenReaderOnly>Suggestions</ScreenReaderOnly>
    </Text>
    <Button text="Next" accessibilityLabel="Next step" />
  </Flex>
</Flex>`}</code></pre>

            <h3>Style third-party components</h3>
            <p><strong>Before beginning this process:</strong></p>
            <p>
              Reach out to the Origin team and clarify your use case. We'll let you know if something 
              similar is already on our roadmap, or help you evaluate how to meet our accessibility 
              standards.
            </p>
            <p>
              For complex components, it may be advantageous to start with a third-party component and 
              style it using Origin design tokens to match Superhuman's visual language.
            </p>
            <p>
              We strongly recommend using <strong>React Aria hooks</strong> as your base whenever 
              possible. React Aria is already included in many of our repositories. Using this library 
              helps to create a more accessible component; however, you will still need to review your 
              component with our accessibility team.
            </p>
            <p>
              You will use React Aria's class names to apply Origin styling through tokens. The tokens 
              are how you ensure the colors, borders, spacing, and typography are consistent with 
              other parts of the Superhuman product.
            </p>

            <h4>Examples</h4>
            <p><strong>Breadcrumbs</strong></p>
            <p>
              The Breadcrumb component from React Aria has smaller font sizes and different colors 
              than we use at Grammarly. It also doesn't follow our styling for underlines on Links.
            </p>
            <p>
              By applying Origin tokens to change the typography, text decoration, and color, it 
              becomes harmonious with other components in our design system.
            </p>
            <pre><code>{`function ExampleContent() {
  const styles = \`
    .custom-breadcrumb-list-item {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        text-decoration-thickness: 1.5px;
        text-underline-offset: var(--space-1);
    }

    .custom-breadcrumb-list-item-active {
        text-decoration: underline;
        text-decoration-color: var(--color-border-brand-default);
    }
    
    .custom-breadcrumb-list-item-active:hover {
        text-decoration-line: underline;
        text-decoration-thickness: max(1.5px, 0.0625rem);
    }
    ;\`;

  return (
    <div>
      <style>{styles}</style>
      <Text as="p" variant="text-large">
        React Aria Breadcrumbs styled with Origin tokens
      </Text>
      <BreadcrumbsExample />
    </div>
  );
}`}</code></pre>

            <p><strong>TreeView</strong></p>
            <p>Another example of a third-party component is TreeView.</p>
            <p>
              Notice how the styling changes the overall look and usability in the before and after. 
              The original component is compact, has no icons, and uses Arial font for text. In the 
              Origin version, we've applied Superhuman's visual design language across icons, color, 
              font, spacing, and borders.
            </p>
            <p><strong>Example TreeView CSS using Origin Tokens</strong></p>
            <pre><code>{`ul.tree {
    border: 0.5px solid var(--neutral-gray-40);
    border-radius: var(--radius-1);
    padding: var(--space-4);
    max-width: 100%;
    max-height: 500px;
}

.treeItem > div:hover {
    border: 1px solid var(--neutral-gray-40);
    border-radius: var(--radius-1);
    background-color: var(--neutral-gray-5);
}

.label {
    padding-left: var(--space-1);
    font-size: 0.875rem;
    font-family: var(--font-stack-inter);
}

:global(.MuiTreeItem-root div.Mui-focused),
:global(.MuiTreeItem-root div.Mui-selected),
:global(.MuiTreeItem-root div.Mui-selected.Mui-focused) {
    border: 1px solid var(--neutral-gray-40);
    border-radius: var(--radius-1);
    background-color: var(--neutral-gray-0) !important;
    font-weight: bold;
}`}</code></pre>

            <h2>What you need to know</h2>
            <p>
              We recognize that custom components will always be needed. However, keep in mind that 
              custom components are a last resort.
            </p>
            <p>
              Origin components are thoroughly tested, documented, and maintained. By creating a custom 
              component, you assume responsibility for its quality and upkeep.
            </p>
            <p>
              When a custom component is your only option, we will provide you with the tools you need 
              to create consistent, accessible components that blend seamlessly into the rest of 
              Superhuman's product.
            </p>
            <p>
              If you have any questions or want to discuss a solution, reach out on Slack at{' '}
              <strong>#ask-origin-design-system</strong> or sign up for our Office Hours.
            </p>
          </div>
    </div>
  );
}
