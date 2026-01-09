import { useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ComponentTile } from '@/components/ComponentTile';
import { StickyFilterBar } from '@/components/StickyFilterBar';
import { cn } from '@/lib/utils';

// Status types (kept for component info)
export type ComponentStatus = 'available' | 'beta' | 'in-progress' | 'not-available' | 'not-applicable';

export interface ComponentStatusInfo {
  figma: ComponentStatus;
  react: ComponentStatus;
  docs: ComponentStatus;
  a11y: ComponentStatus;
  since: string;
  lastUpdate: string;
}

// Component categories
type ComponentCategory = 
  | 'Inputs'
  | 'Feedback'
  | 'Data Display'
  | 'Navigation'
  | 'Overlay'
  | 'Layout'
  | 'Utilities';

export interface ComponentInfo {
  name: string;
  preview: string;
  status: ComponentStatusInfo;
  category: ComponentCategory;
}

// Component data from the Origin Design Toolkit (ordered by popularity within each category)
export const components: ComponentInfo[] = [
  // Inputs (by popularity)
  { name: 'Button', preview: 'button', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.1', lastUpdate: '6.1.0' } },
  { name: 'Checkbox', preview: 'checkbox', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.3.0', lastUpdate: '7.0-beta.2' } },
  { name: 'Icon Button', preview: 'icon-button', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.1', lastUpdate: '6.1.0' } },
  { name: 'Text Field', preview: 'text-field', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.1', lastUpdate: '6.24.0' } },
  { name: 'Switch', preview: 'switch', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.1.0', lastUpdate: '6.1.0' } },
  { name: 'Select', preview: 'select', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.15.0', lastUpdate: '6.15.0' } },
  { name: 'Combobox', preview: 'combobox', category: 'Inputs', status: { figma: 'available', react: 'in-progress', docs: 'available', a11y: 'available', since: '6.4.0', lastUpdate: '6.1.0' } },
  { name: 'Radio Group', preview: 'radio-group', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '4.0.0', lastUpdate: '6.1.0' } },
  { name: 'Textarea', preview: 'textarea', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.3.0', lastUpdate: '6.34.0' } },
  { name: 'Search Field', preview: 'search', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.1', lastUpdate: '7.0-beta.2' } },
  { name: 'Checkbox Group', preview: 'checkbox-group', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.18.0', lastUpdate: '6.19.0' } },
  { name: 'Rating', preview: 'rating', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.36.0', lastUpdate: '6.36.0' } },
  { name: 'Verification Code', preview: 'verification', category: 'Inputs', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.20.0', lastUpdate: '6.24.0' } },
  
  // Feedback (by popularity)
  { name: 'Toast', preview: 'toast', category: 'Feedback', status: { figma: 'available', react: 'in-progress', docs: 'available', a11y: 'in-progress', since: '6.2.0', lastUpdate: '6.19.0' } },
  { name: 'Circular Loader', preview: 'circular-loader', category: 'Feedback', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.18.0', lastUpdate: '6.19.0' } },
  { name: 'Skeleton Loader', preview: 'skeleton', category: 'Feedback', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.13.0', lastUpdate: '6.27.0' } },
  { name: 'Branded Loader', preview: 'loader', category: 'Feedback', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.18.0', lastUpdate: '6.19.0' } },
  
  // Data Display (by popularity)
  { name: 'Icon', preview: 'icon', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.1', lastUpdate: '6.2.0' } },
  { name: 'Badge', preview: 'badge', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '4.0.0', lastUpdate: '6.25.0' } },
  { name: 'Logo', preview: 'logo', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.42.0', lastUpdate: '6.43.0' } },
  { name: 'Tag', preview: 'tag', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '4.0.0', lastUpdate: '6.34.0' } },
  { name: 'Plan Tag', preview: 'plan-tag', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.16.0', lastUpdate: '6.29.0' } },
  { name: 'Illustration', preview: 'illustration', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.26.0', lastUpdate: '6.47.0' } },
  { name: 'Sticker', preview: 'sticker', category: 'Data Display', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.18.0', lastUpdate: '6.25.0' } },
  
  // Navigation (by popularity)
  { name: 'Menu', preview: 'menu', category: 'Navigation', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.20.0', lastUpdate: '6.42.0' } },
  { name: 'Tabs', preview: 'tabs', category: 'Navigation', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.6.0', lastUpdate: '6.22.0' } },
  { name: 'Link', preview: 'link', category: 'Navigation', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.7.0', lastUpdate: '6.2.0' } },
  { name: 'ButtonAsLink', preview: 'button-link', category: 'Navigation', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'available', since: '6.19.0', lastUpdate: '7.0-beta.2' } },
  
  // Overlay (by popularity)
  { name: 'Tooltip', preview: 'tooltip', category: 'Overlay', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '4.0.0', lastUpdate: '6.33.3' } },
  { name: 'Modal', preview: 'modal', category: 'Overlay', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.3.0', lastUpdate: '6.39.0' } },
  { name: 'Popover', preview: 'popover', category: 'Overlay', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.10.0', lastUpdate: '6.15.0' } },
  
  // Layout (by popularity)
  { name: 'Accordion', preview: 'accordion', category: 'Layout', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '6.30.0', lastUpdate: '6.30.0' } },
  { name: 'Form', preview: 'form', category: 'Layout', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.3.0', lastUpdate: '6.14.0' } },
  
  // Utilities (by popularity)
  { name: 'Box', preview: 'box', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'not-applicable', since: '5.0.0', lastUpdate: '6.0.0' } },
  { name: 'Heading', preview: 'heading', category: 'Utilities', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.0', lastUpdate: '6.34.0' } },
  { name: 'Text', preview: 'text', category: 'Utilities', status: { figma: 'available', react: 'available', docs: 'available', a11y: 'available', since: '5.0.0', lastUpdate: '6.34.0' } },
  { name: 'Flex', preview: 'flex', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'not-applicable', since: '5.0.0', lastUpdate: '6.0.0' } },
  { name: 'ThemeProvider', preview: 'theme-provider', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'not-applicable', since: '5.0.0', lastUpdate: '6.0.0' } },
  { name: 'PortalContainerProvider', preview: 'portal-provider', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'not-applicable', since: '6.0.0', lastUpdate: '6.0.0' } },
  { name: 'LiveAnnouncer', preview: 'live-announcer', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'available', since: '6.0.0', lastUpdate: '6.0.0' } },
  { name: 'ScreenReaderOnly', preview: 'screen-reader-only', category: 'Utilities', status: { figma: 'not-applicable', react: 'available', docs: 'available', a11y: 'available', since: '6.0.0', lastUpdate: '6.0.0' } },
];

// All available categories
const categories: ComponentCategory[] = [
  'Inputs',
  'Feedback', 
  'Data Display',
  'Navigation',
  'Overlay',
  'Layout',
  'Utilities',
];

export function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get filter state from URL params
  const searchQuery = searchParams.get('search') || '';
  const activeCategory = (searchParams.get('category') as ComponentCategory | 'All') || 'All';
  
  // Update URL params when filters change
  const setSearchQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams, { replace: true });
  };
  
  const setActiveCategory = (category: ComponentCategory | 'All') => {
    const newParams = new URLSearchParams(searchParams);
    if (category !== 'All') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  // Filter components based on search query and category
  const filteredComponents = components.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || component.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Focus search field on "/" key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setSearchQuery('');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filterContent = (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search components"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-full border border-border bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? 'All' : category)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground border border-primary"
                : "bg-white text-muted-foreground hover:bg-[#fafafa] hover:border-border border border-border/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="container mx-auto px-6 pt-12">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        </div>
      </div>

      {/* Filter Bar - content gets rendered in nav when scrolled */}
      <StickyFilterBar>
        {filterContent}
      </StickyFilterBar>

      <div className="container mx-auto px-6 pt-4 pb-12">
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <ComponentTile
                key={component.name}
                name={component.name}
                preview={component.preview}
                category={component.category === 'Utilities' ? 'utility' : 'component'}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">No components found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
