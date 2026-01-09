import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Map of tab root paths to their last visited paths
type NavigationHistory = Record<string, string>;

interface NavigationHistoryContextType {
  getLastPath: (tabRoot: string) => string;
  handleTabClick: (tabRoot: string, currentPath: string) => string | null;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType | null>(null);

export function NavigationHistoryProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [history, setHistory] = useState<NavigationHistory>({});

  // Track path changes and update history for the current tab
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which tab this path belongs to
    const tabs = ['/components', '/icons', '/illustrations', '/tokens', '/patterns'];
    const matchingTab = tabs.find(tab => currentPath.startsWith(tab));
    
    if (matchingTab && currentPath !== matchingTab) {
      // We're on a sub-page, save it
      setHistory(prev => ({
        ...prev,
        [matchingTab]: currentPath
      }));
    }
  }, [location.pathname]);

  const getLastPath = useCallback((tabRoot: string): string => {
    return history[tabRoot] || tabRoot;
  }, [history]);

  const handleTabClick = useCallback((tabRoot: string, currentPath: string): string | null => {
    const lastPath = history[tabRoot];
    const isOnTabRoot = currentPath === tabRoot;
    const isOnTabSubpage = currentPath.startsWith(tabRoot) && currentPath !== tabRoot;
    const isOnDifferentTab = !currentPath.startsWith(tabRoot);

    if (isOnTabRoot) {
      // Already on root - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null; // Don't navigate
    }
    
    if (isOnTabSubpage) {
      // On a subpage of this tab - go to root and clear history
      setHistory(prev => {
        const newHistory = { ...prev };
        delete newHistory[tabRoot];
        return newHistory;
      });
      return tabRoot;
    }
    
    if (isOnDifferentTab && lastPath && lastPath !== tabRoot) {
      // Coming from different tab - go to last visited path
      return lastPath;
    }
    
    // Default - go to tab root
    return tabRoot;
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

