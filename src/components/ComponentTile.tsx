import { Link, useLocation } from 'react-router-dom';
import { ComponentPreview } from './ComponentPreview';
import { CodeBlock } from './ui/code-block';

interface ComponentTileProps {
  name: string;
  preview: string;
  category?: 'component' | 'utility';
}

// Convert component name to URL-friendly slug
function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Code snippets for utility components
const utilityCodeSnippets: Record<string, string> = {
  'box': `<Box
  padding="16"
  backgroundColor="surface"
>
  {children}
</Box>`,
  'flex': `<Flex
  direction="row"
  gap="8"
  align="center"
>
  {children}
</Flex>`,
  'text': `<Text
  size="medium"
  color="primary"
>
  Hello world
</Text>`,
  'heading': `<Heading
  level={2}
  size="large"
>
  Page Title
</Heading>`,
  'theme-provider': `<ThemeProvider
  theme="light"
>
  <App />
</ThemeProvider>`,
  'portal-provider': `<PortalContainerProvider
  container={ref}
>
  {children}
</PortalContainerProvider>`,
  'screen-reader-only': `<ScreenReaderOnly>
  Hidden label for
  accessibility
</ScreenReaderOnly>`,
  'live-announcer': `<LiveAnnouncer
  message={status}
  politeness="polite"
/>`,
};

export function ComponentTile({ name, preview, category }: ComponentTileProps) {
  const location = useLocation();
  const isUtility = category === 'utility';
  const codeSnippet = utilityCodeSnippets[preview] || `<${name} />`;

  return (
    <Link 
      to={`/components/${toSlug(name)}`}
      state={{ fromSearch: location.search }}
      className="group flex flex-col items-center gap-3 rounded-xl bg-white p-5 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer"
    >
      {/* Component Preview Area */}
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-[#fafafa] overflow-hidden">
        {isUtility ? (
          <div className="w-full h-full flex items-center justify-center">
            <CodeBlock showCopy={false} className="bg-transparent">
              <pre className="text-[11px] leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                <code className="block whitespace-pre text-foreground">{codeSnippet}</code>
              </pre>
            </CodeBlock>
          </div>
        ) : (
          <ComponentPreview type={preview} interactive={false} />
        )}
      </div>
      
      {/* Component Name */}
      <span className="text-xs font-medium text-foreground group-hover:text-foreground transition-colors truncate w-full text-center">
        {name}
      </span>
    </Link>
  );
}

