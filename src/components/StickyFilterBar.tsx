import { useRef, useEffect, type ReactNode } from 'react';
import { useStickyFilter } from '@/context/StickyFilterContext';

interface StickyFilterBarProps {
  children: ReactNode;
}

export function StickyFilterBar({ children }: StickyFilterBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerFilterBar } = useStickyFilter();

  useEffect(() => {
    // Pass both the element ref and the content to render in the nav
    registerFilterBar(ref.current, children);
    return () => registerFilterBar(null, null);
  }, [registerFilterBar, children]);

  return (
    <div ref={ref} className="py-3">
      <div className="container mx-auto px-6">
        {children}
      </div>
    </div>
  );
}
