import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const accessibilityPages = [
  { name: 'Overview', path: '/accessibility' },
  { name: 'Live Announcer', path: '/accessibility/live-announcer' },
  { name: 'Portal Container Provider', path: '/accessibility/portal-container' },
  { name: 'Screen Reader Only', path: '/accessibility/screen-reader' },
  { name: 'Theme Provider', path: '/accessibility/theme-provider' },
  { name: 'Content Design', path: '/accessibility/content-design' },
];

export function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-6 py-12 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-56 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            {accessibilityPages.map((page) => {
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

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
