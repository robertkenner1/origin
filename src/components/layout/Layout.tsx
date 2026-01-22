import { useState, type ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSecondaryNavActive, setIsSecondaryNavActive] = useState(false);
  const [showLabels, setShowLabels] = useState(() => {
    try {
      const stored = localStorage.getItem('origin-show-labels');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const primaryNavWidth = showLabels ? 84 : 60; // 84px with labels, 60px without
  const secondaryNavWidth = 240;
  const marginLeft = isSecondaryNavActive
    ? `${primaryNavWidth + secondaryNavWidth}px`
    : `${primaryNavWidth}px`;
  
  // Calculate content max-width: when labels are hidden, content can be wider
  const contentMaxWidth = showLabels ? '1400px' : '1424px'; // Extra 24px when labels are hidden

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav
        onSecondaryNavChange={setIsSecondaryNavActive}
        onShowLabelsChange={setShowLabels}
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


