export function JavaScriptPage() {
  return (
    <div className="w-full px-6 pt-3 pb-12">
      <div className="prose prose-sm max-w-none">
            <h1>JavaScript</h1>
            <p>
              The JavaScript library includes React components as well as tokens that can be used 
              directly in code or as CSS variables.
            </p>

            <h2>Installation</h2>
            <p>Installing the engineering library requires a connection to Artifactory</p>
            <p>Using your favorite npm package manager:</p>
            <pre><code>yarn/npm/pnpm install @superhuman/origin

// if you are working in the Coda repository 
yarn/npm/pnpm install @grammarly/origin</code></pre>

            <h3>Run the automations to migrate your codebase</h3>
            <p>
              There are breaking changes in the design system. To make migration easier, codemods are 
              provided to automatically update your codebase.
            </p>
            <p>
              <a href="#" className="text-primary hover:underline">Codemods documentation</a>.
            </p>
            
            <p>Breaking changes in v0:</p>
            <ul>
              <li>
                <strong>The ThemeProvider replaces ColorSchemeProvider</strong>
                <br />
                It continues to support light and dark modes, and now also allows switching between 
                Grammarly and Superhuman themes.
              </li>
              <li>
                <strong>New color tokens</strong>
                <br />
                To support the rebranding and introduction of the Superhuman theme, several color 
                tokens have been renamed and deprecated.
              </li>
            </ul>

            <h3>Update your internal documentation and Claude setup</h3>
            <p>
              Update any mentions of "GDS" in your project READMEs and internal guidelines to reflect Origin.
            </p>
            <p>
              Additionally, make sure your Claude setup uses the{' '}
              <a href="#" className="text-primary hover:underline">Design System Plugin</a> - it will 
              load the Origin context, ensuring your AI code suggestions stay aligned with the latest 
              design system.
            </p>

            <h2>Styles</h2>
            <p>You'll also want to include the Origin styles within one of your CSS files:</p>
            <pre><code>/** for modern bundlers **/
@import '@superhuman/origin' 

/** OR for webpack (MiniCssExtractPlugin) **/ 
@import '~@superhuman/origin/dist/index.css'</code></pre>

            <h3>Optional: fonts</h3>
            <p>
              You will also need the following if your app doesn't already provide the Inter and Matter fonts:
            </p>
            <pre><code>import '@superhuman/origin/dist/fonts.css'</code></pre>
            
            <p>
              If your app doesn't already set the font-family for the body, you may also need to add 
              the following CSS:
            </p>
            <pre><code>{`body {
  font-family: var(--font-stack-inter);
}`}</code></pre>

            <p>
              For optimal performance, and to avoid a flash of unstyled text, we recommend preloading 
              the fonts:
            </p>
            <pre><code>{`<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/inter-regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/inter-medium.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/inter-semibold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/inter-bold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/matter-semibold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://static-web.grammarly.com/shared/fonts/product/v1/matter-bold.woff2"
/>`}</code></pre>

            <h3>Optional: shadow DOM styles</h3>
            <p>
              By default, Origin attaches CSS variables to :root. If your app uses shadow DOM, you 
              probably also need them on :host:
            </p>
            <pre><code>import '@superhuman/origin/dist/shadow.css'</code></pre>

            <h2>Components</h2>
            <p>
              Components are provided via the @superhuman/origin package. They are built with React 
              and Typescript.
            </p>
            <p>
              See <a href="#" className="text-primary hover:underline">Components Status</a> for the 
              complete list of available components and relevant version information.
            </p>
            <p>Sample usage:</p>
            <pre><code>{`import { Tag } from "@superhuman/origin";

<Tag variant="warning" label="Beta" />;`}</code></pre>

            <h3>HTML Attribute Forwarding</h3>
            <p>
              All Origin components support standard HTML attributes, allowing you to add testing IDs, 
              analytics tracking, accessibility labels, and more without extra wrapper elements:
            </p>
            <pre><code>{`import { Button, TextField } from "@superhuman/origin";

// Data attributes for testing and analytics
<Button data-testid="submit-btn" data-analytics="checkout-submit">
  Submit
</Button>

// ARIA attributes for accessibility
<TextField
  label="Email"
  aria-describedby="email-hint"
  id="user-email"
/>

// className, inline styles and other standard attributes
<Tag
  variant="success"
  label="New"
  id="new-badge"
  className="custom-badge"
  style={{ marginLeft: 8 }}
/>`}</code></pre>
            <p>
              These attributes are forwarded to the primary interactive element (button, input, etc.) 
              within each component.
            </p>

            <h2>Tokens</h2>
            <p>
              The design system tokens are available as individual values in @superhuman/origin. 
              TypeScript types are also included.
            </p>
            <pre><code>import {`{ Tokens }`} from '@superhuman/origin'</code></pre>
            <p>CSS variables are also available, as demonstrated in the following sections.</p>

            <h3>Border Radius</h3>
            <p><strong>CSS</strong></p>
            <pre><code>{`.someSelector {
  border-radius: var(--radius-1);
}`}</code></pre>
            <p><strong>JavaScript</strong></p>
            <pre><code>{`import { Tokens } from "@superhuman/origin";

function Example() {
  return (
    <div
      style={{
        borderRadius: \`\${Tokens.Radius.RadiusHalf}rem\`,
      }}
    ></div>
  );
}`}</code></pre>

            <h3>Color</h3>
            <p>
              Most designs will use the Semantic palette with some additional colors pulled from the 
              Core palette when necessary.
            </p>
            <p><strong>CSS</strong></p>
            <pre><code>{`.someSelector {
  background: var(--color-background-base-default); /* semantic palette */
  color: var(--blue-40); /* core palette */
}`}</code></pre>
            <p><strong>JavaScript</strong></p>
            <pre><code>{`import { Tokens } from "@superhuman/origin";

function Example() {
  return (
    <div
      style={{
        background: Tokens.SemanticColor.Color.Background.Base.Default,
        color: Tokens.Color.Blue40,
      }}
    ></div>
  );
}`}</code></pre>

            <h3>Elevation</h3>
            <p><strong>CSS</strong></p>
            <pre><code>{`.elevation-high {
  border: var(--elevation-high-border);
  box-shadow: var(--elevation-high-shadow);
}`}</code></pre>
            <p><strong>JavaScript</strong></p>
            <pre><code>{`import { Tokens } from "@superhuman/origin";

const styles = {
  boxShadow: Tokens.Elevation.ElevationHigh.boxShadow,
  border: Tokens.Elevation.ElevationHigh.border,
};`}</code></pre>

            <h3>Iconography</h3>
            <p>
              React-components based on .svg assets are available. All icons are aria-hidden=true and 
              role="img" by default. See all <a href="/icons" className="text-primary hover:underline">available icons</a>.
            </p>
            <p><strong>Examples</strong></p>
            <p>Basic usage:</p>
            <pre><code>{`import { EmojiAnalyticalIcon } from 'grammarly/design-system'

<EmojiAnalyticalIcon />`}</code></pre>
            <p>Override any SVG element props:</p>
            <pre><code>{`import { EmojiAnalyticalIcon } from 'grammarly/design-system'

<EmojiAnalyticalIcon color fill viewBox width height ...any svg props... />`}</code></pre>
            <p>Override colors on some state (hover, active, etc.):</p>
            <pre><code>{`import { CopyIcon } from 'grammarly/design-system'

// variant 1 — JS API:
<CopyIcon fill="someColorHere" />

// variant 2 — pass classname and contol it via CSS:
<CopyIcon className="someCssClassHere" />`}</code></pre>
            <p>Add special a11y tags:</p>
            <pre><code>{`import { EmojiAnalyticalIcon } from 'grammarly/design-system'

<EmojiAnalyticalIcon title titleId desc descId />`}</code></pre>

            <h3>Space</h3>
            <p><strong>CSS</strong></p>
            <pre><code>{`.someSelector {
  padding: var(--space-1);
}`}</code></pre>
            <p><strong>JavaScript</strong></p>
            <pre><code>{`import { Tokens } from "@superhuman/origin";

function Example() {
  return (
    <div
      style={{
        padding: \`\${Tokens.Space.Space1}rem\`,
      }}
    ></div>
  );
}`}</code></pre>

            <h3>Typography</h3>
            <p>Typography is accessible as React components (Heading and Text).</p>
            <p>
              The necessary fonts and @font-face rules are available with the following import 
              (since version 6.11.0):
            </p>
            <pre><code>import '@superhuman/origin/dist/fonts.css'</code></pre>
            <p>The following CSS variables are also available as a convenience:</p>
            <ul>
              <li>--font-stack-inter</li>
              <li>--font-stack-matter</li>
            </ul>
            <p>For example, you could set the default font for your app like this:</p>
            <pre><code>{`body {
  font-family: var(--font-stack-inter);
}`}</code></pre>
            <p><strong>Usage</strong></p>
            <pre><code>{`import { Heading } from '@superhuman/origin'

<Heading as="h1" variant="heading-large">Hello GDS!</Heading>`}</code></pre>
            <p>With additional typography styles:</p>
            <pre><code>{`import { Text } from '@superhuman/origin'

<Text as="p" variant="text-medium" weight="bold" italic decoration="line-through">Hello GDS!</Text>`}</code></pre>

            <h2>Integration examples</h2>
            <p>For integration inspiration, check out:</p>
            <ul>
              <li>Granimals</li>
              <li>Extension</li>
              <li>Grammarly Editor</li>
            </ul>
          </div>
    </div>
  );
}
