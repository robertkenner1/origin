import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigationHistory } from '@/context/NavigationHistoryContext';
import { useStickyFilter } from '@/context/StickyFilterContext';

const navItems = [
  { name: 'Home', path: '/' },
  { 
    name: 'Getting Started', 
    path: '/getting-started',
    subItems: [
      { name: 'Overview', path: '/getting-started' },
      { name: 'Introduction to Origin', path: '/getting-started/introduction' },
      { name: 'JavaScript', path: '/getting-started/javascript' },
      { name: 'Styling Custom Components', path: '/getting-started/styling' },
    ]
  },
  { name: 'Components', path: '/components' },
  { name: 'Icons', path: '/icons' },
  { 
    name: 'Brand', 
    path: '/brand',
    subItems: [
      { name: 'Illustrations', path: '/brand/illustrations' },
      { name: 'Logo', path: '/brand/logo' },
      { name: 'Typography', path: '/brand/typography' },
      { name: 'Color', path: '/brand/color' },
    ]
  },
  { name: 'Tokens', path: '/tokens' },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleTabClick } = useNavigationHistory();
  const { showFilters, filterContent } = useStickyFilter();
  
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getActiveIndex = () => {
    return navItems.findIndex(item => 
      item.path === '/' 
        ? location.pathname === '/'
        : location.pathname.startsWith(item.path)
    );
  };

  // Update indicator position
  const updateIndicator = () => {
    const activeIndex = getActiveIndex();
    if (activeIndex === -1) return;
    
    const activeItem = navItems[activeIndex];
    const activeTab = tabRefs.current.get(activeItem.path);
    const nav = navRef.current;
    
    if (activeTab && nav) {
      const navRect = nav.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      setIndicator({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
      });
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  };

  // Update on route change
  useLayoutEffect(() => {
    updateIndicator();
  }, [location.pathname]);

  // Update on mount and resize
  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, []);

  // Handle scroll to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onTabClick = (e: React.MouseEvent, item: { name: string; path: string }) => {
    e.preventDefault();
    const targetPath = handleTabClick(item.path, location.pathname);
    
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b-[1px] border-border/30 transition-colors duration-200",
      isScrolled ? "bg-background" : "bg-transparent"
    )}>
      <div className="container mx-auto h-16 px-6 relative">
        {/* Navigation Content */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-between px-6 transition-opacity duration-300",
            showFilters ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="w-[100px] flex items-center">
            <Link to="/" className="flex items-center">
              <svg width="80" height="16" viewBox="0 0 111 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.97852 0C16.7707 7.42797e-05 19.9561 3.48645 19.9561 11C19.956 18.5135 16.7707 21.9999 9.97852 22C3.18621 22 1.46999e-05 18.5136 0 11C0 3.48637 3.1862 0 9.97852 0ZM66.9375 0C72.9785 0 76.0744 2.46465 76.7656 7.93457H71.8965C71.3555 5.4701 69.9129 4.35742 66.9375 4.35742C63.3311 4.35748 61.7988 6.22141 61.7988 11C61.7988 15.8086 63.3311 17.6415 66.9375 17.6416C69.9129 17.6416 71.536 16.4098 71.9268 13.5547H65.1045V9.94824H76.8857V11.2705C76.8857 18.7841 73.4894 22 66.9375 22C60.1453 21.9999 56.96 18.5135 56.96 11C56.96 3.48644 60.1453 5.98633e-05 66.9375 0ZM34.7227 0.480469C36.2053 0.480495 37.5076 0.756736 38.6299 1.30762C39.7514 1.85898 40.623 2.64995 41.2441 3.68164C41.8649 4.71373 42.1758 5.93053 42.1758 7.33301C42.1758 8.73549 41.865 9.79049 41.2441 10.8223C40.6229 11.8544 39.4965 12.7161 38.3359 13.2012C38.129 13.2876 37.6843 13.4426 37.0879 13.6396L42.4541 21.501H36.6973L32.4111 15.1182C31.3493 15.4465 30.3054 15.7665 29.4287 16.0342V21.5186H24.5996V0.480469H34.7227ZM52.2168 21.5186H47.3779V0.480469H52.2168V21.5186ZM86.4795 21.5186H81.6406V0.480469H86.4795V21.5186ZM105.706 14.1855V0.480469H110.424V21.5186H105.585L96.8994 7.81445V21.5186H92.1807V0.480469H97.0195L105.706 14.1855ZM9.97852 4.35742C6.37198 4.35742 4.83887 6.19128 4.83887 11C4.83888 15.8087 6.37199 17.6416 9.97852 17.6416C13.6149 17.6415 15.1172 15.8086 15.1172 11C15.1172 6.19137 13.615 4.35749 9.97852 4.35742ZM29.4287 5.13867V11.3223C31.6834 10.7504 34.8855 9.92228 35.6396 9.64355C36.1607 9.45085 37.4795 9.01214 37.4795 7.33301C37.4795 5.3261 35.4902 5.13867 34.2354 5.13867H29.4287Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>
          
          <nav ref={navRef} className="relative flex items-center justify-center gap-0.5">
            {/* Animated pill indicator */}
            <div
              className={cn(
                "absolute h-8 rounded-full",
                isInitialized ? "transition-all duration-300 ease-out" : ""
              )}
              style={{
                left: indicator.left,
                width: indicator.width,
                backgroundColor: 'var(--color-neutral-10)',
              }}
            />
            
            {navItems.map((item) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  ref={(el) => {
                    if (el) tabRefs.current.set(item.path, el);
                  }}
                  to={item.path}
                  onClick={(e) => onTabClick(e, item)}
                  className={cn(
                    'relative z-10 px-3 py-1.5 text-sm font-medium transition-colors rounded-full',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="w-[100px] flex items-center justify-end">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Support
            </a>
          </div>
        </div>

        {/* Filter Content - fades in when scrolled */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center px-6 transition-opacity duration-300",
            showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {filterContent}
        </div>
      </div>
    </header>
  );
}
