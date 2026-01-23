import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { searchContent, type SearchResult, type SearchResultType } from '@/data/searchIndex';

const TYPE_LABELS: Record<SearchResultType, string> = {
  component: 'Components',
  token: 'Tokens',
  iconography: 'Iconography',
  design: 'Design',
  'origin-101': 'Origin 101',
  content: 'Content',
  pattern: 'Patterns',
  accessibility: 'Accessibility',
  support: 'Support',
  'whats-new': "What's new"
};

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  const isExactMatch = text.toLowerCase() === query.toLowerCase();

  if (isExactMatch) {
    return <span className="font-semibold" style={{ color: '#1C1C1C' }}>{text}</span>;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="font-semibold" style={{ color: '#1C1C1C' }}>{part}</span>
        ) : (
          <span key={i} style={{ color: '#73716D' }}>{part}</span>
        )
      )}
    </>
  );
}

function SearchResultItem({ result, query }: { result: SearchResult; query: string }) {
  return (
    <Link
      to={result.path}
      className="group inline-flex items-center gap-2 px-4 py-2 text-lg hover:rounded-full hover:bg-[#EBEBEB] transition-all"
    >
      <span>{highlightText(result.title, query)}</span>
      <ArrowUpRight className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 text-foreground transition-all" strokeWidth={2} />
    </Link>
  );
}

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => searchContent(searchQuery), [searchQuery]);

  const groupedResults = useMemo(() => {
    const groups: Record<SearchResultType, SearchResult[]> = {
      component: [],
      token: [],
      iconography: [],
      design: [],
      'origin-101': [],
      content: [],
      pattern: [],
      accessibility: [],
      support: [],
      'whats-new': []
    };

    results.forEach(result => {
      groups[result.type].push(result);
    });

    return groups;
  }, [results]);

  const hasResults = results.length > 0;

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        {/* Search Input */}
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components, tokens, icons, and documentation..."
            className="w-full px-4 py-3 pr-20 text-base rounded-full border-2 border-transparent bg-white placeholder:text-muted-foreground hover:border-foreground focus:border-foreground focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-8 max-w-3xl">
            {hasResults ? (
              <>
                {/* Grouped Results */}
                {Object.entries(groupedResults).map(([type, items]) => {
                  if (items.length === 0) return null;

                  return (
                    <div key={type} className="mb-12">
                      <h2 className="text-xs font-normal text-muted-foreground mb-3">
                        {TYPE_LABELS[type as SearchResultType]}
                      </h2>
                      <div className="flex flex-col gap-1 -mx-4">
                        {items.map((result) => (
                          <div key={result.id}>
                            <SearchResultItem
                              result={result}
                              query={searchQuery}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>
                <h2 className="text-xs font-normal text-muted-foreground">
                  No results found for "{searchQuery}"
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
