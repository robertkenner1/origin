import { useState, useRef, useEffect } from 'react';
import { TokenCardLarge } from '@/components/TokenCard';

// Space tokens
const spaceTokens = [
  { name: 'Space0', value: '0 rem / 0 px' },
  { name: 'SpaceQuarter', value: '0.0625 rem / 1 px' },
  { name: 'SpaceHalf', value: '0.125 rem / 2 px' },
  { name: 'Space1', value: '0.25 rem / 4 px' },
  { name: 'Space1AndHalf', value: '0.375 rem / 6 px' },
  { name: 'Space2', value: '0.5 rem / 8 px' },
  { name: 'Space3', value: '0.75 rem / 12 px' },
  { name: 'Space4', value: '1 rem / 16 px' },
  { name: 'Space5', value: '1.25 rem / 20 px' },
  { name: 'Space6', value: '1.5 rem / 24 px' },
  { name: 'Space8', value: '2 rem / 32 px' },
  { name: 'Space10', value: '2.5 rem / 40 px' },
  { name: 'Space12', value: '3 rem / 48 px' },
  { name: 'Space14', value: '3.5 rem / 56 px' },
  { name: 'Space16', value: '4 rem / 64 px' },
  { name: 'Space18', value: '4.5 rem / 72 px' },
  { name: 'Space20', value: '5 rem / 80 px' },
];

export function TokenSpacingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tokens
  const filteredTokens = spaceTokens.filter(t =>
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
          <h1 className="text-3xl font-bold tracking-tight">Spacing</h1>

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
              placeholder="Search spacing tokens"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full border-2 border-transparent bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground hover:border-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-6 pt-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTokens.map((token) => {
            const pxMatch = token.value.match(/(\d+)\s*px/);
            const pxValue = pxMatch ? parseInt(pxMatch[1]) : 0;
            return (
              <TokenCardLarge
                key={token.name}
                copyValue={token.name}
                label={token.name}
                preview={
                  <div className="h-12 flex items-end justify-center">
                    <div
                      className="bg-primary rounded-sm"
                      style={{ width: `${Math.max(pxValue, 2)}px`, height: '32px' }}
                    />
                  </div>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
