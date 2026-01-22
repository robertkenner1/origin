import { useState, useRef, useEffect } from 'react';
import { TokenCardLarge } from '@/components/TokenCard';

// Elevation tokens
const elevationTokens = [
  { name: 'Elevation100', value: 'boxShadow: 0px 1px 4px 0.5px var(--color-border-base-default-f3)', deprecated: true },
  { name: 'Elevation200', value: 'boxShadow: 0px 1px 8px 0.5px var(--color-border-base-default-f5)', deprecated: true },
  { name: 'Elevation300', value: 'boxShadow: 0px 2px 12px 0.5px var(--color-border-base-default-f5)', deprecated: true },
  { name: 'ElevationLow', value: 'boxShadow: 0px 1px 4px 0.5px var(--color-elevation-base-default-f5)' },
  { name: 'ElevationMedium', value: 'boxShadow: 0px 1px 8px 0.5px var(--color-elevation-base-default-f4)' },
  { name: 'ElevationHigh', value: 'boxShadow: 0px 2px 12px 0.5px var(--color-elevation-base-default-f3)' },
];

const shadowMap: Record<string, string> = {
  'Elevation100': '0px 1px 4px 0.5px rgba(0,0,0,0.1)',
  'Elevation200': '0px 1px 8px 0.5px rgba(0,0,0,0.12)',
  'Elevation300': '0px 2px 12px 0.5px rgba(0,0,0,0.12)',
  'ElevationLow': '0px 1px 4px 0.5px rgba(0,0,0,0.08)',
  'ElevationMedium': '0px 1px 8px 0.5px rgba(0,0,0,0.1)',
  'ElevationHigh': '0px 2px 12px 0.5px rgba(0,0,0,0.12)',
};

export function TokenShadowsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tokens
  const filteredTokens = elevationTokens.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Shadows</h1>

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
              placeholder="Search shadow tokens"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full border-2 border-transparent bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground hover:border-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-6 pt-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTokens.map((token) => (
            <TokenCardLarge
              key={token.name}
              copyValue={token.name}
              label={token.name}
              preview={
                <div
                  className="w-12 h-12 bg-white rounded-lg"
                  style={{ boxShadow: shadowMap[token.name] || '0px 1px 4px rgba(0,0,0,0.1)' }}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
