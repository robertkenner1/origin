import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const patternsPages = [
  { name: 'Overview', path: '/patterns' },
  { name: 'Unified Platform Experience', path: '/patterns/unified-platform' },
  { name: 'Forms', path: '/patterns/forms' },
  { name: 'Empty States', path: '/patterns/empty-states' },
  { name: 'Disabled & Hidden States', path: '/patterns/disabled-states' },
  { name: 'Pro Plan Branding', path: '/patterns/pro-plan' },
];

export function PatternsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-56 flex-shrink-0 px-6 py-12">
          <nav className="sticky top-24 space-y-1">
            {patternsPages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white'
                  )}
                  style={isActive ? { backgroundColor: 'var(--color-neutral-10)' } : undefined}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Divider */}
        <div className="border-l border-border"></div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-12 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
