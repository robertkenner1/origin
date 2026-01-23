import { useState, type ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSecondaryNavActive, setIsSecondaryNavActive] = useState(false);

  const primaryNavWidth = 84; // Always show labels
  const secondaryNavWidth = 240;
  const marginLeft = isSecondaryNavActive
    ? `${primaryNavWidth + secondaryNavWidth}px`
    : `${primaryNavWidth}px`;

  const contentMaxWidth = '1400px';

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav
        onSecondaryNavChange={setIsSecondaryNavActive}
      />
      <main
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft }}
      >
        <div
          className="transition-all duration-300 ease-in-out"
          style={{ maxWidth: contentMaxWidth, margin: '0 auto' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}


