import { useState, type ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSecondaryNavPinned, setIsSecondaryNavPinned] = useState(false);
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
  const marginLeft = isSecondaryNavPinned 
    ? `${primaryNavWidth + secondaryNavWidth}px` 
    : `${primaryNavWidth}px`;

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav 
        onPinnedChange={setIsSecondaryNavPinned}
        onShowLabelsChange={setShowLabels}
      />
      <main 
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft }}
      >
        {children}
      </main>
    </div>
  );
}


