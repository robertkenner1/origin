import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavigationFromCollections, getDefaultCollectionIds, ALL_COLLECTIONS, type NavItem } from './navigationConfig';
import { SettingsModal } from './SettingsModal';
import { MoreIcon, CustomizeIcon, SunIcon, MoonIcon, SearchIcon } from '@/components/icons/CustomIcons';
import { cn } from '@/lib/utils';

const ENABLED_COLLECTIONS_KEY = 'origin-enabled-collections';
const SHOW_LABELS_KEY = 'origin-show-labels';
const NAV_MODE_KEY = 'origin-nav-mode';

type SidebarNavProps = {
  onNavigate?: (item: NavItem) => void;
  onSecondaryNavChange?: (isShowing: boolean) => void;
  onShowLabelsChange?: (showLabels: boolean) => void;
};

type NavMode = 'manual-pin' | 'auto-pin';

export function SidebarNav({ onNavigate, onSecondaryNavChange, onShowLabelsChange }: SidebarNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Load enabled collections from localStorage
  const [enabledCollections, setEnabledCollections] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(ENABLED_COLLECTIONS_KEY);
      return stored ? JSON.parse(stored) : getDefaultCollectionIds();
    } catch {
      return getDefaultCollectionIds();
    }
  });

  // Load show labels preference from localStorage
  const [showLabels, setShowLabels] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SHOW_LABELS_KEY);
      return stored !== null ? JSON.parse(stored) : true; // Default to true
    } catch {
      return true;
    }
  });

  // Always use auto-pin mode
  const navMode = 'auto-pin';
  
  // Get navigation based on enabled collections
  const navigationItems = getNavigationFromCollections(enabledCollections);
  
  // Get unpinned collections for the More menu
  const unpinnedCollections = ALL_COLLECTIONS.filter(
    collection => !enabledCollections.includes(collection.id)
  );

  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [moreButtonRect, setMoreButtonRect] = useState<DOMRect | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const moreMenuTimeoutRef = useRef<number | null>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  
  const handleCollectionsChange = (collectionIds: string[]) => {
    setEnabledCollections(collectionIds);
    try {
      localStorage.setItem(ENABLED_COLLECTIONS_KEY, JSON.stringify(collectionIds));
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleShowLabelsChange = (show: boolean) => {
    setShowLabels(show);
    onShowLabelsChange?.(show);
    try {
      localStorage.setItem(SHOW_LABELS_KEY, JSON.stringify(show));
    } catch {
      // Ignore localStorage errors
    }
  };



  const handlePrimaryClick = (item: NavItem) => {
    // Auto-pin mode: just navigate, secondary nav will appear based on route
    if (!item.children?.length || item.children.length === 1) {
      const targetPath = item.children?.[0]?.path || item.path;
      navigate(targetPath);
      onNavigate?.(item.children?.[0] || item);
      setHoveredItem(null);
    } else {
      // Navigate to first child
      const firstChild = item.children[0];
      if (firstChild) {
        navigate(firstChild.path);
        onNavigate?.(firstChild);
      }
      // Don't clear hoveredItem - let it transition naturally as the flyout won't show when it becomes active parent
    }
  };

  const handleMouseEnter = (item: NavItem) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Only show hover menu if item has multiple children (more than 1)
    if (item.children && item.children.length > 1) {
      setHoveredItem(item);
    } else {
      // Clear hover state for items without children
      setHoveredItem(null);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      // In auto-pin mode: Don't clear hover if it's the active parent item
      if (activeParentItem && hoveredItem?.title === activeParentItem.title) {
        return;
      }
      setHoveredItem(null);
    }, 100);
  };

  // Determine if a parent item should be active (if it or its child is selected)
  const isParentActive = (item: NavItem) => {
    // Check if current path matches the item's path exactly
    if (location.pathname === item.path) return true;
    // Check if current path starts with item path and has children
    if (item.children?.length && location.pathname.startsWith(item.path + '/')) return true;
    // Check if any child matches current path
    if (item.children?.some(child => child.path === location.pathname)) return true;
    return false;
  };

  // Get the currently active parent item (for simple mode)
  const getActiveParentItem = () => {
    return navigationItems.find(item => isParentActive(item));
  };

  // Determine which item should show its secondary nav based on active route
  const activeParentItem = getActiveParentItem();
  const shouldShowSecondaryNav = activeParentItem &&
    activeParentItem.children && activeParentItem.children.length > 1;

  // Notify parent when secondary nav visibility changes
  useEffect(() => {
    onSecondaryNavChange?.(!!shouldShowSecondaryNav);
  }, [shouldShowSecondaryNav, onSecondaryNavChange]);

  // Helper function to render secondary nav list content (children only)
  const renderSecondaryNavList = (item: NavItem) => (
    <div className="overflow-auto flex-1 px-3 pt-3 pb-3">
      <nav className="space-y-0.5">
        {item.children?.map((child) => {
          const isChildActive = location.pathname === child.path;
          return (
            <Link
              key={child.path}
              to={child.path}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-md transition-colors text-sm',
                isChildActive
                  ? 'bg-[var(--color-neutral-10)] text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-[var(--color-neutral-10)]/50 hover:text-foreground'
              )}
            >
              <span className="text-[13.5px]">{child.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="fixed left-0 top-0 z-50">
        {/* Container for Primary and Secondary Nav */}
        <div
          className={cn(
            'h-screen flex bg-background transition-all duration-200',
            // Width calculations
            shouldShowSecondaryNav
              ? showLabels ? 'w-[324px]' : 'w-[300px]'
              : showLabels ? 'w-[84px]' : 'w-[60px]'
          )}
          onMouseLeave={handleMouseLeave}
        >
        {/* Primary Navigation Sidebar */}
        <aside className={cn(
          "h-screen flex flex-col flex-shrink-0 relative z-20 border-r transition-all duration-150",
          showLabels ? "w-[84px]" : "w-[60px]",
          // Show border only when no secondary nav (hover or active) is visible
          !hoveredItem && !shouldShowSecondaryNav && !(activeParentItem?.children && activeParentItem.children.length > 1) ? 'border-border' : 'border-transparent'
        )}>
          {/* Navigation Content */}
          <div className="flex-1 overflow-auto py-3">
            <nav className="flex flex-col items-center gap-3">
              {/* Search */}
              <Link
                to="/search"
                onMouseEnter={() => setHoveredItem(null)}
                className={cn(
                  "flex flex-col items-center text-foreground group transition-all",
                  showLabels ? "gap-0.5" : "gap-0"
                )}
                aria-label="Search"
              >
                <div className={cn(
                  'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                  location.pathname === '/search'
                    ? 'bg-[var(--color-neutral-10)]'
                    : 'group-hover:bg-[var(--color-neutral-10)]/50'
                )}>
                  <SearchIcon className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform',
                    location.pathname === '/search' ? '' : 'opacity-80 group-hover:scale-105'
                  )} strokeWidth={1.5} />
                </div>
                {showLabels && (
                  <span
                    className={cn(
                      'leading-tight text-center transition-colors text-foreground',
                      location.pathname === '/search' ? '' : 'opacity-80 group-hover:opacity-100'
                    )}
                    style={{ fontSize: '10px' }}
                  >
                    Search
                  </span>
                )}
              </Link>

              {navigationItems.map((item) => {
                const isActive = isParentActive(item);
                const hasChildren = !!item.children?.length;
                const Icon = item.icon;
                // Show hover state when hovering over non-active items
                const isShowingChildren = hoveredItem?.title === item.title && activeParentItem?.title !== item.title;

                return (
                  <Link
                    key={item.path}
                    to={hasChildren && item.children?.[0] ? item.children[0].path : item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrimaryClick(item);
                    }}
                    onMouseEnter={() => handleMouseEnter(item)}
                    className={cn(
                      "flex flex-col items-center text-foreground group transition-all",
                      showLabels ? "gap-0.5" : "gap-0"
                    )}
                    aria-label={item.title}
                  >
                    <div className={cn(
                      'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                      isActive 
                        ? 'bg-[var(--color-neutral-10)]' 
                        : isShowingChildren
                        ? 'bg-[var(--color-neutral-10)]/50'
                        : 'group-hover:bg-[var(--color-neutral-10)]/50'
                    )}>
                      {Icon && <Icon className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform',
                        isActive ? '' : 'opacity-80 group-hover:scale-105'
                      )} strokeWidth={1.5} />}
                    </div>
                    {showLabels && (
                      <span 
                        className={cn(
                          'leading-tight text-center transition-colors text-foreground',
                          isActive ? '' : 'opacity-80 group-hover:opacity-100'
                        )}
                        style={{ fontSize: '10px' }}
                      >
                        {item.label || item.title}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              {/* More/Manage button - shows unpinned collections and settings, or just settings if no unpinned */}
              {unpinnedCollections.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  onMouseEnter={() => setHoveredItem(null)}
                  className={cn(
                    "flex flex-col items-center text-foreground group transition-all",
                    showLabels ? "gap-0.5" : "gap-0"
                  )}
                  aria-label="Customize sidebar"
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all group-hover:bg-[var(--color-neutral-10)]/50">
                    <CustomizeIcon className="w-5 h-5 flex-shrink-0 transition-transform opacity-80 group-hover:scale-105" />
                  </div>
                  {showLabels && (
                    <span 
                      className="leading-tight text-center transition-colors text-foreground opacity-80 group-hover:opacity-100"
                      style={{ fontSize: '10px' }}
                    >
                      Customize
                    </span>
                  )}
                </button>
              ) : (
                <div
                  ref={moreButtonRef}
                  className="relative"
                  onMouseEnter={() => {
                    if (moreMenuTimeoutRef.current) {
                      clearTimeout(moreMenuTimeoutRef.current);
                    }
                    if (moreButtonRef.current) {
                      const rect = moreButtonRef.current.getBoundingClientRect();
                      setMoreButtonRect(rect);
                    }
                    setHoveredItem(null);
                    setMoreMenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (moreMenuTimeoutRef.current) {
                      clearTimeout(moreMenuTimeoutRef.current);
                    }
                    moreMenuTimeoutRef.current = setTimeout(() => {
                      setMoreMenuOpen(false);
                      setMoreButtonRect(null);
                    }, 100);
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex flex-col items-center text-foreground group transition-all",
                      showLabels ? "gap-0.5" : "gap-0"
                    )}
                    aria-label="More"
                  >
                    <div className={cn(
                      'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                      moreMenuOpen
                        ? 'bg-[var(--color-neutral-10)]'
                        : 'group-hover:bg-[var(--color-neutral-10)]/50'
                    )}>
                      <MoreIcon className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform',
                        moreMenuOpen ? '' : 'opacity-80 group-hover:scale-105'
                      )} />
                    </div>
                    {showLabels && (
                      <span 
                        className={cn(
                          'leading-tight text-center transition-colors text-foreground',
                          moreMenuOpen ? '' : 'opacity-80 group-hover:opacity-100'
                        )}
                        style={{ fontSize: '10px' }}
                      >
                        More
                      </span>
                    )}
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Dark Mode Toggle at very bottom */}
          <div className="flex flex-col items-center pb-3">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              onMouseEnter={() => setHoveredItem(null)}
              className={cn(
                "flex flex-col items-center text-foreground group transition-all",
                showLabels ? "gap-0.5" : "gap-0"
              )}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all group-hover:bg-[var(--color-neutral-10)]/50">
                {isDarkMode ? (
                  <MoonIcon className="w-5 h-5 flex-shrink-0 transition-transform opacity-80 group-hover:scale-105" />
                ) : (
                  <SunIcon className="w-5 h-5 flex-shrink-0 transition-transform opacity-80 group-hover:scale-105" />
                )}
              </div>
              {showLabels && (
                <span
                  className="leading-tight text-center transition-colors text-foreground opacity-80 group-hover:opacity-100"
                  style={{ fontSize: '10px' }}
                >
                  {isDarkMode ? 'Light' : 'Dark'}
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* More Menu Dropdown */}
        <AnimatePresence>
          {moreMenuOpen && moreButtonRect && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed w-auto min-w-[220px] bg-background border border-border rounded-xl shadow-lg overflow-hidden z-[100]"
              style={{
                left: `${moreButtonRect.right + 8}px`,
                top: `${moreButtonRect.top}px`,
              }}
              onMouseEnter={() => {
                if (moreMenuTimeoutRef.current) {
                  clearTimeout(moreMenuTimeoutRef.current);
                }
                setHoveredItem(null);
                setMoreMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (moreMenuTimeoutRef.current) {
                  clearTimeout(moreMenuTimeoutRef.current);
                }
                moreMenuTimeoutRef.current = setTimeout(() => {
                  setMoreMenuOpen(false);
                  setMoreButtonRect(null);
                }, 100);
              }}
            >
              <div className="py-2 px-2">
                {unpinnedCollections.map((collection) => {
                  const Icon = collection.icon;
                  const path = collection.children[0]?.path || '/';

                  return (
                    <Link
                      key={collection.id}
                      to={path}
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--color-neutral-10)]/50 transition-colors"
                    >
                      {Icon && <Icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />}
                      <span className="text-sm font-normal text-[13.5px]">{collection.title}</span>
                    </Link>
                  );
                })}

                {/* Divider if there are unpinned collections */}
                {unpinnedCollections.length > 0 && (
                  <div className="my-2 border-t border-border -mx-2" />
                )}

                {/* Customize sidebar option */}
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(true);
                    setMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-[var(--color-neutral-10)]/50 transition-colors text-left"
                >
                  <CustomizeIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-normal text-[13.5px]">Customize sidebar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary Navigation - Auto-pinned based on active route */}
        {shouldShowSecondaryNav && activeParentItem && (
          <motion.div
            className="w-[240px] h-full flex flex-col flex-shrink-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {/* Tab-specific content */}
            {renderSecondaryNavList(activeParentItem)}
          </motion.div>
        )}
      </div>

      {/* Secondary Navigation - Hover flyout (absolute positioned outside container) */}
      <AnimatePresence>
        {/* Show hover when hovering over any item with children, but not if it's the active parent */}
        {hoveredItem && hoveredItem.children && hoveredItem.children.length > 1 && hoveredItem?.title !== activeParentItem?.title && (
          <motion.div
            className={cn(
              "absolute top-0 h-screen w-[240px] z-30 flex flex-col bg-background overflow-hidden transition-all duration-200",
              showLabels ? "left-[84px]" : "left-[60px]"
            )}
            style={{
              boxShadow: '4px 0 12px -2px rgba(0, 0, 0, 0.08)',
              borderRight: '1px solid var(--color-border)',
              clipPath: 'inset(0 -20px 0 0)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
          {/* Tab-specific content */}
          {renderSecondaryNavList(hoveredItem)}
        </motion.div>
        )}
      </AnimatePresence>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        enabledCollections={enabledCollections}
        onCollectionsChange={handleCollectionsChange}
        showLabels={showLabels}
        onShowLabelsChange={handleShowLabelsChange}
      />
    </div>
  );
}
