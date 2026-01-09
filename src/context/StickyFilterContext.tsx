import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface StickyFilterContextType {
  showFilters: boolean;
  filterContent: ReactNode | null;
  registerFilterBar: (element: HTMLElement | null, content: ReactNode) => void;
}

const StickyFilterContext = createContext<StickyFilterContextType | null>(null);

export function StickyFilterProvider({ children }: { children: ReactNode }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filterBarRef, setFilterBarRef] = useState<HTMLElement | null>(null);
  const [filterContent, setFilterContent] = useState<ReactNode | null>(null);

  const registerFilterBar = useCallback((element: HTMLElement | null, content: ReactNode) => {
    setFilterBarRef(element);
    setFilterContent(content);
  }, []);

  useEffect(() => {
    if (!filterBarRef) {
      setShowFilters(false);
      return;
    }

    const handleScroll = () => {
      const filterBarRect = filterBarRef.getBoundingClientRect();
      
      // Show filters in nav when the filter bar top has scrolled past the top of viewport
      // (i.e., when the filters would be hidden behind the nav)
      setShowFilters(filterBarRect.top <= 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filterBarRef]);

  return (
    <StickyFilterContext.Provider value={{ showFilters, filterContent, registerFilterBar }}>
      {children}
    </StickyFilterContext.Provider>
  );
}

export function useStickyFilter() {
  const context = useContext(StickyFilterContext);
  if (!context) {
    throw new Error('useStickyFilter must be used within StickyFilterProvider');
  }
  return context;
}
