import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { getNavigationFromCollections, getDefaultCollectionIds, type NavItem } from './navigationConfig';
import { SunIcon, MoonIcon, SearchIcon } from '@/components/icons/CustomIcons';
import { cn } from '@/lib/utils';

type SidebarNavProps = {
  onSecondaryNavChange?: (isShowing: boolean) => void;
};

export function SidebarNav({ onSecondaryNavChange }: SidebarNavProps) {
  const location = useLocation();

  // Always show labels
  const showLabels = true;

  // Get all navigation items (all collections that are defaultVisible)
  const navigationItems = getNavigationFromCollections(getDefaultCollectionIds());

  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (item: NavItem) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Show hover menu if item has multiple children (more than 1) OR has groups
    if ((item.children && item.children.length > 1) || item.groups) {
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
  const secondaryNavItem = hoveredItem || (activeParentItem && ((activeParentItem.children && activeParentItem.children.length > 1) || activeParentItem.groups) ? activeParentItem : null);
  const shouldShowSecondaryNav = !!secondaryNavItem;

  // Notify parent when secondary nav visibility changes
  useEffect(() => {
    onSecondaryNavChange?.(shouldShowSecondaryNav);
  }, [shouldShowSecondaryNav, onSecondaryNavChange]);

  // Auto-expand groups that contain the current page
  useEffect(() => {
    if (secondaryNavItem?.groups) {
      const groupsToOpen = new Set<string>();
      secondaryNavItem.groups.forEach((group) => {
        if (group.children.some(child => child.path === location.pathname)) {
          groupsToOpen.add(group.title);
        }
      });
      if (groupsToOpen.size > 0) {
        setOpenGroups(prev => new Set([...prev, ...groupsToOpen]));
      }
    }
  }, [location.pathname, secondaryNavItem]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupTitle)) {
        next.delete(groupTitle);
      } else {
        next.add(groupTitle);
      }
      return next;
    });
  };

  // Helper function to render secondary nav list content (children and/or groups)
  const renderSecondaryNavList = (item: NavItem) => {
    // If item has groups, render accordion UI
    if (item.groups) {
      return (
        <motion.div
          key={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="overflow-auto flex-1 px-3 pt-3 pb-3"
        >
          <nav className="space-y-0.5">
            {/* Render any top-level children first (like "Component overview") */}
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

            {/* Render groups with accordion */}
            {item.groups.map((group) => {
              const isOpen = openGroups.has(group.title);

              return (
                <div key={group.title} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-colors text-sm text-muted-foreground hover:bg-[#EBEBEB] hover:text-foreground"
                  >
                    <span className="text-[13.5px] font-medium">{group.title}</span>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform',
                        isOpen && 'rotate-90'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 space-y-0.5">
                          {group.children.map((child) => {
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </motion.div>
      );
    }

    // Otherwise render flat children
    return (
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
  };

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
                <div className={cn(
                  'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                  location.pathname === '/search'
                    ? 'bg-[#EBEBEB]'
                    : 'group-hover:bg-[#EBEBEB]'
                )}>
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
    </div>
  );
}
