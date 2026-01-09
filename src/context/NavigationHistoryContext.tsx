import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// Map of tab root paths to their last visited paths
type NavigationHistory = Record<string, string>;

interface NavigationHistoryContextType {
  getLastPath: (tabRoot: string) => string;
  handleTabClick: (tabRoot: string, currentPath: string) => string | null;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType | null>(null);

// Tab roots for matching
const TAB_ROOTS = ['/', '/components', '/icons', '/brand', '/tokens'];

function getTabForPath(path: string): string | null {
  // Exact match for home
  if (path === '/') return '/';
  // Find matching tab (longest match first to handle nested routes)
  return TAB_ROOTS.filter(tab => tab !== '/').find(tab => path.startsWith(tab)) || null;
}

export function NavigationHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<NavigationHistory>({});

  const getLastPath = useCallback((tabRoot: string): string => {
    return history[tabRoot] || tabRoot;
  }, [history]);

  const handleTabClick = useCallback((tabRoot: string, currentPath: string): string | null => {
    const currentTab = getTabForPath(currentPath);
    const isOnSameTab = currentTab === tabRoot;
    const isOnTabRoot = currentPath === tabRoot;
    const isOnTabSubpage = currentPath.startsWith(tabRoot) && currentPath !== tabRoot;

    if (isOnTabRoot) {
      // Already on root - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null; // Don't navigate
    }
    
    if (isOnTabSubpage) {
      // On a subpage of this tab - go to root and clear history for this tab
      setHistory(prev => {
        const newHistory = { ...prev };
        delete newHistory[tabRoot];
        return newHistory;
      });
      return tabRoot;
    }
    
    // Coming from a different tab - save current path for the tab we're leaving
    if (currentTab && !isOnSameTab) {
      setHistory(prev => ({
        ...prev,
        [currentTab]: currentPath
      }));
    }
    
    // Go to saved path for target tab, or tab root if none saved
    const savedPath = history[tabRoot];
    return savedPath || tabRoot;
  }, [history]);

  return (
    <NavigationHistoryContext.Provider value={{ getLastPath, handleTabClick }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error('useNavigationHistory must be used within NavigationHistoryProvider');
  }
  return context;
}

