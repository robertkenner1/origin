import { useState, type ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSecondaryNavPinned, setIsSecondaryNavPinned] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav onPinnedChange={setIsSecondaryNavPinned} />
      <main 
        className="transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: isSecondaryNavPinned ? '324px' : '84px' // 84px primary nav + 240px secondary nav when pinned
        }}
      >
        {children}
      </main>
    </div>
  );
}


