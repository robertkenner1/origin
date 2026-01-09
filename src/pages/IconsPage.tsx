import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { StickyFilterBar } from '@/components/StickyFilterBar';

// Icon categories from the Origin Design Toolkit Figma file
const iconCategories = {
  'All categories': [],
  'Outcomes': [
    'clarity', 'correctness', 'delivery', 'engagement', 'plagiarism', 'style-guide'
  ],
  'Flag': [
    'au', 'ca', 'gb', 'us', 'in'
  ],
  'Social': [
    'apple', 'facebook', 'google'
  ],
  'Apps': [
    'asana', 'auth0', 'calendly', 'classlink', 'confluence', 'deepl', 
    'google-calendar', 'google-chrome', 'google-docs', 'gdrive', 'gmail',
    'google-sheet', 'google-slide', 'giphy', 'hubspot', 'jira', 'legalsifter',
    'microsoft', 'microsoft-outlook', 'microsoft-word', 'monday', 'notion',
    'okta', 'one-drive', 'onelogin', 'pomodoro', 'salesforce', 'semrush',
    'sharepoint', 'slack', 'smartsheet', 'translate', 'todoist', 'unsplash',
    'wolfram', 'wrike'
  ],
  'Authorship': [
    'ai', 'ai-edited', 'fingerprint-toggle', 'human', 'human-ai',
    'human-grammarly', 'human-proofreading', 'human-unnatural', 'quotes',
    'sourced', 'sourced-edited', 'unverified'
  ],
  'Consent': [
    'control', 'safe', 'transparent', 'personalized-insights',
    'personalized-insights-off', 'smart-dictionary', 'smart-dictionary-off',
    'tailored-assistance', 'tailored-assistance-off', 'collect-logs', 'store-data'
  ],
  'Agents': [
    'ai-chat', 'ai-detector', 'expert-panel', 'plagiarism-checker', 'proofreader',
    'ai-grader', 'citation', 'paraphraser', 'humanizer', 'ai-vocabulary',
    'deep-writer', 'audience-reactions', 'go-chat', 'explainer', 'translator',
    'ai-rewriter', 'fact-checker'
  ],
  'Emoji': [
    'accusatory', 'admiring', 'anticipatory', 'anxious', 'apologetic',
    'appreciative', 'assertive', 'cautionary', 'compassionate-friendly',
    'concerned', 'confident', 'confused', 'constructive', 'curious-thoughtful',
    'defensive', 'diplomatic', 'direct', 'disheartening', 'dismayed',
    'dissatisfied', 'egocentric', 'empathetic', 'encouraging', 'excited',
    'expressionless', 'formal', 'frank', 'gloomy-depressing', 'impersonal',
    'informal', 'informative', 'inspirational', 'joyful', 'key-point',
    'neutral', 'objective', 'optimistic', 'read', 'regretful', 'skip',
    'smiling', 'sparkles', 'surprised', 'unassuming', 'urgent', 'worried', 'analytical'
  ],
  'Interface': [
    'analytics', 'apps', 'bell', 'bold', 'bookmark', 'bookmark-filled',
    'checkmark', 'chess', 'clear', 'close', 'color-picker-active', 'collapse',
    'collapse-right', 'controls', 'copy', 'credit-card', 'cut', 'dictionary',
    'deactivated', 'document', 'dot', 'dot-green', 'down', 'download',
    'draggable', 'dropdown-arrow-down', 'dropdown-arrow-right', 'dropdown-double-arrow',
    'edit', 'email', 'error', 'expand', 'export-xls', 'file-csv', 'file-doc',
    'file-docx', 'file-html', 'file-json', 'file-md', 'file-pdf', 'file-txt',
    'file-xls', 'file-xml', 'fingerprint', 'external-link', 'feedback', 'folder',
    'folder-move', 'folder-rename', 'globe', 'goals', 'heading-1', 'heading-2',
    'help', 'hide', 'highlight', 'history', 'home', 'inbox', 'image', 'ignore',
    'in-progress', 'info', 'insights', 'italic', 'key-filled', 'knowledge-hub',
    'left', 'link', 'lock', 'lock-rounded', 'logout', 'menu-expandable', 'minus',
    'money', 'more', 'more-vertical', 'mute', 'next', 'new', 'new-team',
    'no-connection', 'ok', 'offline', 'ordered-list', 'passkey', 'paste', 'pause',
    'plagiarism', 'play-filled', 'plus', 'premium', 'previous', 'print',
    'proofreader', 'redo', 'reload', 'remove', 'report', 'restore', 'rewards',
    'rewrite', 'right', 'search', 'security', 'security-check', 'settings',
    'show', 'snippets', 'snooze', 'sort', 'sort-2', 'sort-ascending',
    'sort-descending', 'sort-horizontal', 'sparkles', 'speed', 'spinner', 'star',
    'star-filled', 'status-check', 'styleguide', 'suggestions-settings',
    'suicide-prevention', 'textarea-resize', 'thumb-down', 'thumb-up', 'tip',
    'tone-detector', 'tone-empty', 'tools', 'transform', 'try-grammarly-business',
    'unordered-list', 'underline', 'undo', 'up', 'upload', 'user', 'warning',
    'writing', 'zoom'
  ],
};

// Build flat list of all icons with their category
const allIcons = Object.entries(iconCategories)
  .filter(([category]) => category !== 'All categories')
  .flatMap(([category, icons]) => 
    icons.map(icon => ({ name: icon, category }))
  );

// Simple icon representations
function IconPlaceholder({ category }: { name: string; category: string }) {
  // Generate a consistent color based on category
  const categoryColors: Record<string, string> = {
    'Outcomes': '#714cb6',
    'Flag': '#027e6f',
    'Social': '#1877f2',
    'Apps': '#ee5a29',
    'Authorship': '#602639',
    'Consent': '#00897b',
    'Agents': '#7c3aed',
    'Emoji': '#f59e0b',
    'Interface': '#64748b',
  };
  
  const color = categoryColors[category] || '#64748b';
  
  // Return a simple SVG placeholder that hints at the icon type
  return (
    <div 
      className="flex h-10 w-10 items-center justify-center rounded-lg"
      style={{ backgroundColor: `${color}15` }}
    >
      <svg 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill={color}
      >
        {category === 'Emoji' ? (
          <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        ) : category === 'Flag' ? (
          <rect x="3" y="5" width="14" height="10" rx="1" fill="none" stroke={color} strokeWidth="1.5" />
        ) : category === 'Apps' ? (
          <rect x="4" y="4" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
        ) : (
          <path 
            d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a1 1 0 110 2 1 1 0 010-2zm1 8H9v-4h2v4z" 
            fill={color}
          />
        )}
      </svg>
    </div>
  );
}

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = Object.keys(iconCategories);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return allIcons.filter((icon) => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           icon.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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
          placeholder="Search icons"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-full border border-border bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex items-center gap-2">
        {categories.filter(c => c !== 'All categories').map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
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
          <h1 className="text-3xl font-bold tracking-tight">Icons</h1>
        </div>
      </div>

      {/* Filter Bar - content gets rendered in nav when scrolled */}
      <StickyFilterBar>
        {filterContent}
      </StickyFilterBar>

      <div className="container mx-auto px-6 pt-4 pb-12">
        {/* Results count */}
        {searchQuery && (
          <p className="mb-4 text-sm text-muted-foreground">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
          </p>
        )}
        
        {/* Icons Grid */}
        {filteredIcons.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {filteredIcons.map((icon) => (
              <div
                key={`${icon.category}-${icon.name}`}
                className="group flex flex-col items-center gap-3 rounded-xl bg-white p-4 border border-border/50 hover:bg-[#fafafa] hover:border-border transition-colors duration-200 cursor-pointer"
                title={`${icon.category} / ${icon.name}`}
              >
                <IconPlaceholder name={icon.name} category={icon.category} />
                <span className="text-xs font-medium text-foreground group-hover:text-foreground transition-colors truncate w-full text-center">
                  {icon.name}
                </span>
              </div>
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
            <h3 className="text-lg font-semibold">No icons found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
