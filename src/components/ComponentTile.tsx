import { Link } from 'react-router-dom';
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
  const isUtility = category === 'utility';
  const codeSnippet = utilityCodeSnippets[preview] || `<${name} />`;

  return (
    <Link 
      to={`/components/${toSlug(name)}`}
      className="group flex flex-col items-start gap-3 rounded-xl bg-transparent p-0 border border-transparent transition-colors duration-200 cursor-pointer"
    >
      {/* Component Preview Area */}
      <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-white border-2 border-transparent group-hover:border-foreground transition-colors duration-200 overflow-hidden">
        {/* arrow-expand icon from Superhuman Iconography - positioned in top right corner */}
        <svg 
          className="absolute top-3 right-3 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" 
          viewBox="0 0 20 20"
          fill="none"
        >
          <g transform="translate(2, 2)">
            <path d="M7.53027 9.53027L2.56055 14.5H6.5V16H2.25C1.90269 16 1.57494 15.9188 1.28125 15.7783L1.28027 15.7803L1.27539 15.7754C0.81626 15.5541 0.444711 15.1829 0.223633 14.7236L0.219727 14.7197L0.220703 14.7178C0.0805311 14.4244 0 14.0968 0 13.75V9.5H1.5V13.4395L6.46973 8.46973L7.53027 9.53027Z" fill="currentColor" className="text-muted-foreground"/>
            <path d="M13.75 0C14.0968 4.58942e-06 14.4244 0.0805292 14.7178 0.220703L14.7197 0.219727L14.7236 0.223633C15.1829 0.444713 15.5541 0.816265 15.7754 1.27539L15.7803 1.28027L15.7783 1.28125C15.9188 1.57494 16 1.90269 16 2.25V6.5H14.5V2.56055L9.53027 7.53027L8.46973 6.46973L13.4395 1.5H9.5V0H13.75Z" fill="currentColor" className="text-muted-foreground"/>
          </g>
        </svg>
        
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
      <span className="text-xs font-medium text-foreground transition-colors truncate w-full">
        {name}
      </span>
    </Link>
  );
}

