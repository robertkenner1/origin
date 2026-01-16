import { Outlet, Link, useLocation } from 'react-router-dom';

const subItems = [
  { name: 'Overview', path: '/patterns' },
  { name: 'Unified Platform Experience', path: '/patterns/unified-platform' },
  { name: 'Forms', path: '/patterns/forms' },
  { name: 'Empty States', path: '/patterns/empty-states' },
  { name: 'Disabled & Hidden States', path: '/patterns/disabled-states' },
  { name: 'Pro Plan Branding', path: '/patterns/pro-plan' },
];

export function PatternsLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background/50 p-6">
        <nav className="space-y-1">
          {subItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
