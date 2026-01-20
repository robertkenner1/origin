import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StickyFilterBar } from '@/components/StickyFilterBar';
import { TokenCard } from '@/components/TokenCard';

// Illustration data
const illustrationCategories = {
  'Empty': [
    'birding', 'cactus', 'cookie', 'hat', 'painting', 'plane', 'sand', 'scribe', 'work', 'write'
  ],
  'Success': [
    'birding', 'cactus', 'cookie', 'hat', 'painting', 'plane', 'sand', 'scribe', 'work', 'write', 'check'
  ],
  'Spot': [
    'celebrate', 'issue', 'chat-double', 'chat-check', 'doc-sparkles', 'doc-award', 
    'doc-magic', 'doc-check', 'doc-double-check', 'doc', 'chart-user', 'target',
    'doc-on-brand', 'coin', 'line-graph', 'detect-ai-text', 'plagiarism'
  ],
};

const allIllustrations = Object.entries(illustrationCategories)
  .flatMap(([category, illustrations]) => 
    illustrations.map(illustration => ({ name: illustration, category }))
  );

const illustrationCategoryList = Object.keys(illustrationCategories);

// Illustration placeholder
function IllustrationPlaceholder({ name, category }: { name: string; category: string }) {
  const categoryColors: Record<string, { primary: string; secondary: string; accent: string }> = {
    'Empty': { primary: '#9ca3af', secondary: '#e5e7eb', accent: '#d1d5db' },
    'Success': { primary: '#10b981', secondary: '#d1fae5', accent: '#6ee7b7' },
    'Spot': { primary: '#8b5cf6', secondary: '#ede9fe', accent: '#c4b5fd' },
  };
  
  const colors = categoryColors[category] || categoryColors['Spot'];

  if (category === 'Empty') {
    return (
      <svg viewBox="0 0 56 56" className="h-full w-full">
        <defs>
          <linearGradient id={`empty-grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="24" fill={`url(#empty-grad-${name})`} />
        <circle cx="28" cy="28" r="16" fill="none" stroke={colors.primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <circle cx="28" cy="28" r="4" fill={colors.primary} opacity="0.4" />
        <line x1="20" y1="36" x2="36" y2="36" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    );
  }
  
  if (category === 'Success') {
    return (
      <svg viewBox="0 0 56 56" className="h-full w-full">
        <defs>
          <linearGradient id={`success-grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="24" fill={`url(#success-grad-${name})`} />
        <path
          d="M18 28L25 35L38 22"
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="42" cy="16" r="2" fill={colors.primary} opacity="0.6" />
        <circle cx="14" cy="20" r="1.5" fill={colors.primary} opacity="0.4" />
      </svg>
    );
  }

  // Spot illustrations
  return (
    <svg viewBox="0 0 56 56" className="h-full w-full">
      <defs>
        <linearGradient id={`spot-grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.secondary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="40" height="32" rx="4" fill={`url(#spot-grad-${name})`} />
      <circle cx="20" cy="24" r="6" fill={colors.primary} opacity="0.6" />
      <rect x="30" y="20" width="12" height="3" rx="1.5" fill={colors.primary} opacity="0.5" />
      <rect x="30" y="26" width="8" height="3" rx="1.5" fill={colors.primary} opacity="0.3" />
      <path d="M12 38L22 30L30 36L44 26" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function BrandIllustrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter illustrations
  const filteredIllustrations = useMemo(() => {
    return allIllustrations.filter((illustration) => {
      const matchesSearch = illustration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           illustration.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || illustration.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Keyboard shortcuts
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
          placeholder="Search illustrations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-full border-2 border-transparent bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground hover:border-foreground focus:border-foreground focus:outline-none"
        />
      </div>
      
      {/* Category filters */}
      <div className="flex items-center gap-2">
        {illustrationCategoryList.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 bg-white border-2",
              activeCategory === category
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-12">
        <div className="mb-4">
          <Link 
            to="/brand" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Brand
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Illustrations</h1>
        </div>
      </div>

      <StickyFilterBar>
        {filterContent}
      </StickyFilterBar>

      <div className="w-full px-6 pt-4 pb-12">
        {filteredIllustrations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredIllustrations.map((illustration, index) => (
              <TokenCard
                key={`${illustration.category}-${illustration.name}-${index}`}
                copyValue={illustration.name}
                label={illustration.name.replace(/-/g, ' ')}
                variant="card"
                preview={
                  <div className="h-14 w-14">
                    <IllustrationPlaceholder name={illustration.name} category={illustration.category} />
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">No illustrations found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search term or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

