import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavigationFromCollections, getDefaultCollectionIds, ALL_COLLECTIONS, type NavItem } from './navigationConfig';
import { SettingsModal } from './SettingsModal';
import { MoreIcon, CustomizeIcon, SunIcon, MoonIcon, SearchIcon } from '@/components/icons/CustomIcons';
import { cn } from '@/lib/utils';

const ENABLED_COLLECTIONS_KEY = 'origin-enabled-collections';
const SHOW_LABELS_KEY = 'origin-show-labels';

type SidebarNavProps = {
  onNavigate?: (item: NavItem) => void;
  onSecondaryNavChange?: (isShowing: boolean) => void;
  onShowLabelsChange?: (showLabels: boolean) => void;
};

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
  const navContainerRef = useRef<HTMLDivElement>(null);
  
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

  // Get the currently active parent item
  const getActiveParentItem = () => {
    return navigationItems.find(item => isParentActive(item));
  };

  const activeParentItem = getActiveParentItem();

  // Determine which item to show in secondary nav: hovered takes priority, then active
  const secondaryNavItem = hoveredItem || (activeParentItem && activeParentItem.children && activeParentItem.children.length > 1 ? activeParentItem : null);
  const shouldShowSecondaryNav = !!secondaryNavItem;

  // Notify parent when secondary nav visibility changes
  useEffect(() => {
    onSecondaryNavChange?.(shouldShowSecondaryNav);
  }, [shouldShowSecondaryNav, onSecondaryNavChange]);

  // Helper function to render secondary nav list content (children only)
  const renderSecondaryNavList = (item: NavItem) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      className="overflow-auto flex-1 px-3 pt-3 pb-3"
    >
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
                  ? 'bg-[#EBEBEB] font-medium'
                  : 'text-muted-foreground hover:bg-[#EBEBEB] hover:text-foreground'
              )}
              style={isChildActive ? { color: '#1C1C1C' } : undefined}
            >
              <span className="text-[13.5px]">{child.title}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
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
          // Show border only when no secondary nav is visible
          !shouldShowSecondaryNav ? 'border-border' : 'border-transparent'
        )}>
          {/* Navigation Content */}
          <div className="flex-1 overflow-auto py-3">
            <nav className="flex flex-col items-center gap-3">
              {/* Search */}
              <Link
                to="/search"
                onMouseEnter={() => setHoveredItem(null)}
                className="flex flex-col items-center group transition-all"
                aria-label="Search"
              >
                <div
                  className={cn(
                    'w-[36px] h-[36px] flex items-center justify-center rounded-md',
                    location.pathname === '/search' && 'bg-[#EBEBEB]'
                  )}
                  style={location.pathname !== '/search' ? {
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)',
                    backgroundOrigin: 'padding-box, border-box',
                    backgroundClip: 'padding-box, border-box'
                  } : undefined}
                >
                  <SearchIcon
                    className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                    strokeWidth={1.5}
                    style={{ color: location.pathname === '/search' ? '#1C1C1C' : '#73716D' }}
                  />
                </div>
              </Link>

              {navigationItems.map((item) => {
                const isActive = isParentActive(item);
                const hasChildren = !!item.children?.length;
                const Icon = item.icon;
                // Show highlight if this item is currently showing in secondary nav
                const isShowingInSecondaryNav = secondaryNavItem?.title === item.title;

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
                      "flex flex-col items-center group transition-all",
                      showLabels ? "gap-0.5" : "gap-0"
                    )}
                    aria-label={item.title}
                  >
                    <div className={cn(
                      'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                      isActive
                        ? 'bg-[#EBEBEB]'
                        : isShowingInSecondaryNav
                        ? 'bg-[#EBEBEB]'
                        : 'group-hover:bg-[#EBEBEB]'
                    )}>
                      {Icon && <Icon
                        className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                        strokeWidth={1.5}
                        style={{ color: isActive ? '#1C1C1C' : '#73716D' }}
                      />}
                    </div>
                    {showLabels && (
                      <span
                        className="leading-tight text-center transition-colors"
                        style={{ fontSize: '10px', color: '#73716D' }}
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
                    "flex flex-col items-center group transition-all",
                    showLabels ? "gap-0.5" : "gap-0"
                  )}
                  aria-label="Customize sidebar"
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all group-hover:bg-[#EBEBEB]">
                    <CustomizeIcon
                      className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ color: '#73716D' }}
                    />
                  </div>
                  {showLabels && (
                    <span
                      className="leading-tight text-center transition-colors"
                      style={{ fontSize: '10px', color: '#73716D' }}
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
                      "flex flex-col items-center group transition-all",
                      showLabels ? "gap-0.5" : "gap-0"
                    )}
                    aria-label="More"
                  >
                    <div className={cn(
                      'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                      moreMenuOpen
                        ? 'bg-[#EBEBEB]'
                        : 'group-hover:bg-[#EBEBEB]'
                    )}>
                      <MoreIcon
                        className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                        style={{ color: moreMenuOpen ? '#1C1C1C' : '#73716D' }}
                      />
                    </div>
                    {showLabels && (
                      <span
                        className="leading-tight text-center transition-colors"
                        style={{ fontSize: '10px', color: '#73716D' }}
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
              className="flex flex-col items-center group transition-all"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all group-hover:bg-[#EBEBEB]">
                {isDarkMode ? (
                  <MoonIcon
                    className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ color: '#73716D' }}
                  />
                ) : (
                  <SunIcon
                    className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ color: '#73716D' }}
                  />
                )}
              </div>
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EBEBEB] transition-colors"
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
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-[#EBEBEB] transition-colors text-left"
                >
                  <CustomizeIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-normal text-[13.5px]">Customize sidebar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Single Secondary Navigation - shows for hover or active selection */}
        {shouldShowSecondaryNav && secondaryNavItem && (
          <div
            className="w-[240px] h-full flex flex-col flex-shrink-0 bg-background"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
            {/* Tab-specific content with fade transition */}
            <AnimatePresence mode="wait">
              {renderSecondaryNavList(secondaryNavItem)}
            </AnimatePresence>
          </div>
        )}
      </div>

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
