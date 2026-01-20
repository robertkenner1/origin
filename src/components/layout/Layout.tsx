import type { ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="ml-[84px]">{children}</main>
    </div>
  );
}


