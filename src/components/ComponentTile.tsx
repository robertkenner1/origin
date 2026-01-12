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
      
      {/* Component Name with expand icon */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        <span className="text-xs font-medium text-foreground transition-colors truncate text-center">
          {name}
        </span>
        {/* Expand icon - appears on hover */}
        <svg 
          className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>
    </Link>
  );
}

