import { useState } from 'react';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-12 pb-12">
        <div className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full px-4 py-3 text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
            autoFocus
          />
        </div>

        {searchQuery && (
          <div className="mt-8">
            <p className="text-sm text-muted-foreground">
              Search results for "{searchQuery}" will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
