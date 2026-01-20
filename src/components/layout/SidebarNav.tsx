import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Library, MoreHorizontal } from 'lucide-react';
import { getNavigationFromCollections, getDefaultCollectionIds, ALL_COLLECTIONS, type NavItem } from './navigationConfig';
import { SettingsModal } from './SettingsModal';
import { cn } from '@/lib/utils';

const ENABLED_COLLECTIONS_KEY = 'origin-enabled-collections';

type SidebarNavProps = {
  onNavigate?: (item: NavItem) => void;
  onPinnedChange?: (isPinned: boolean) => void;
};

export function SidebarNav({ onNavigate, onPinnedChange }: SidebarNavProps) {
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
  
  // Get navigation based on enabled collections
  const navigationItems = getNavigationFromCollections(enabledCollections);
  
  // Get unpinned collections for the More menu
  const unpinnedCollections = ALL_COLLECTIONS.filter(
    collection => !enabledCollections.includes(collection.id)
  );
  
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [pinnedItem, setPinnedItem] = useState<NavItem | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [moreButtonRect, setMoreButtonRect] = useState<DOMRect | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const isOverSecondaryNav = useRef(false);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  
  const handleCollectionsChange = (collectionIds: string[]) => {
    setEnabledCollections(collectionIds);
    try {
      localStorage.setItem(ENABLED_COLLECTIONS_KEY, JSON.stringify(collectionIds));
    } catch {
      // Ignore localStorage errors
    }
  };

  const handlePrimaryClick = (item: NavItem) => {
    // If item has no children, just navigate normally (Link handles it)
    if (!item.children?.length) {
      onNavigate?.(item);
      return;
    }

    // If item has children, navigate to the first child
    const firstChild = item.children[0];
    if (firstChild) {
      navigate(firstChild.path);
      onNavigate?.(firstChild);
    }

    // If pinned, update the pinned item to the newly clicked item
    if (isPinned) {
      setPinnedItem(item);
    }
    // Collapse the secondary nav to reset it only if not pinned
    if (!isPinned) {
      setHoveredItem(null);
    }
  };

  const handleMouseEnter = (item: NavItem) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Only show hover menu if item has children
    if (item.children?.length) {
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      // When pinned, only clear hover if it's not the pinned item
      if (isPinned && hoveredItem === pinnedItem) {
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

  const handlePinToggle = () => {
    if (!isPinned) {
      // We're pinning - save the hovered item
      if (hoveredItem && hoveredItem.children?.length) {
        setPinnedItem(hoveredItem);
        setIsPinned(true);
        onPinnedChange?.(true);
        // Keep hoveredItem if user is still over the secondary nav
        if (!isOverSecondaryNav.current) {
          setHoveredItem(null);
        }
      }
    } else {
      // Unpinning - keep the item visible if user is still hovering over it
      const itemToKeep = pinnedItem;
      setIsPinned(false);
      onPinnedChange?.(false);
      setPinnedItem(null);
      // If user is still over the secondary nav, keep it as hovered
      if (isOverSecondaryNav.current && itemToKeep) {
        setHoveredItem(itemToKeep);
      }
    }
  };

  // Helper function to render secondary nav list content (children only)
  const renderSecondaryNavList = (item: NavItem) => (
    <div className="overflow-auto flex-1 px-2 pb-4">
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
          'h-screen flex bg-background border-r border-border',
          isPinned && pinnedItem ? 'w-[324px]' : 'w-[84px]'
        )}
        onMouseLeave={handleMouseLeave}
      >
        {/* Primary Navigation Sidebar */}
        <aside className="w-[84px] h-screen flex flex-col flex-shrink-0 relative z-20 border-r border-border">
          {/* Header */}
          <div className="px-[12px] pt-[20px] pb-[4px] flex flex-col items-center">
            <Link
              to="/"
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                <path d="M9.97852 0C16.7707 7.42797e-05 19.9561 3.48645 19.9561 11C19.956 18.5135 16.7707 21.9999 9.97852 22C3.18621 22 1.46999e-05 18.5136 0 11C0 3.48637 3.18620 0 9.97852 0ZM9.97852 4.35742C6.37198 4.35742 4.83887 6.19128 4.83887 11C4.83888 15.8087 6.37199 17.6416 9.97852 17.6416C13.6149 17.6415 15.1172 15.8086 15.1172 11C15.1172 6.19137 13.615 4.35749 9.97852 4.35742Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col items-center gap-3">
              {navigationItems.map((item) => {
                const isActive = isParentActive(item);
                const hasChildren = !!item.children?.length;
                const Icon = item.icon;
                const isShowingChildren = !isPinned && hoveredItem?.title === item.title;

                return (
                  <Link
                    key={item.path}
                    to={hasChildren && item.children?.[0] ? item.children[0].path : item.path}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault();
                      }
                      handlePrimaryClick(item);
                    }}
                    onMouseEnter={() => handleMouseEnter(item)}
                    className="flex flex-col items-center gap-0.5 text-foreground group transition-all"
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
                    <span 
                      className={cn(
                        'leading-tight text-center transition-colors',
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                      style={{ fontSize: '10.5px' }}
                    >
                      {item.label || item.title}
                    </span>
                  </Link>
                );
              })}
              
              {/* More/Manage button - shows unpinned collections and settings, or just settings if no unpinned */}
              {unpinnedCollections.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="flex flex-col items-center gap-0.5 text-foreground group transition-all"
                  aria-label="Manage collections"
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all group-hover:bg-[var(--color-neutral-10)]/50">
                    <Library className="w-5 h-5 flex-shrink-0 transition-transform opacity-80 group-hover:scale-105" strokeWidth={1.5} />
                  </div>
                  <span 
                    className="leading-tight text-center transition-colors text-muted-foreground group-hover:text-foreground"
                    style={{ fontSize: '10.5px' }}
                  >
                    Manage
                  </span>
                </button>
              ) : (
                <div 
                  ref={moreButtonRef}
                  className="relative"
                  onMouseEnter={() => {
                    if (moreButtonRef.current) {
                      setMoreButtonRect(moreButtonRef.current.getBoundingClientRect());
                    }
                    setMoreMenuOpen(true);
                  }}
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="flex flex-col items-center gap-0.5 text-foreground group transition-all"
                    aria-label="More"
                  >
                    <div className={cn(
                      'w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all',
                      moreMenuOpen
                        ? 'bg-[var(--color-neutral-10)]'
                        : 'group-hover:bg-[var(--color-neutral-10)]/50'
                    )}>
                      <MoreHorizontal className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform',
                        moreMenuOpen ? '' : 'opacity-80 group-hover:scale-105'
                      )} strokeWidth={1.5} />
                    </div>
                    <span 
                      className={cn(
                        'leading-tight text-center transition-colors',
                        moreMenuOpen ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                      style={{ fontSize: '10.5px' }}
                    >
                      More
                    </span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* More Menu Dropdown */}
        <AnimatePresence>
          {moreMenuOpen && moreButtonRect && unpinnedCollections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed w-[240px] bg-background border border-border rounded-lg shadow-lg overflow-hidden z-[100]"
              style={{
                left: `${moreButtonRect.right + 8}px`,
                top: `${moreButtonRect.top}px`,
              }}
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <div className="py-2">
                {unpinnedCollections.map((collection) => {
                  const Icon = collection.icon;
                  const isSinglePage = collection.children.length === 1 && 
                                      collection.children[0].title === collection.title;
                  const path = collection.children[0]?.path || '/';
                  
                  return (
                    <Link
                      key={collection.id}
                      to={path}
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-neutral-10)]/50 transition-colors"
                    >
                      {Icon && <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />}
                      <span className="text-sm">{collection.title}</span>
                    </Link>
                  );
                })}
                
                {/* Divider if there are unpinned collections */}
                {unpinnedCollections.length > 0 && (
                  <div className="my-1 border-t border-border" />
                )}
                
                {/* Manage collections option */}
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(true);
                    setMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 w-full hover:bg-[var(--color-neutral-10)]/50 transition-colors text-left"
                >
                  <Library className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm">Manage collections</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary Navigation - Pinned (flex sibling) */}
        {isPinned && pinnedItem && pinnedItem.children?.length && (() => {
          const displayItem = hoveredItem || pinnedItem;
          return (
            <motion.div 
              className="w-[240px] h-full flex flex-col flex-shrink-0 bg-background"
              animate={{ paddingTop: 10 }}
              exit={{ paddingTop: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onMouseEnter={() => {
                isOverSecondaryNav.current = true;
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
              }}
              onMouseLeave={() => {
                isOverSecondaryNav.current = false;
                handleMouseLeave();
              }}
            >
              {/* Global Header */}
              <div className="px-5 pt-4 pb-3 flex items-center justify-between">
                <h3 className="font-medium text-foreground">{displayItem.title}</h3>
                <button
                  type="button"
                  onClick={handlePinToggle}
                  className="p-1.5 rounded-md transition-colors bg-[var(--color-neutral-10)] hover:bg-[var(--color-neutral-10)]/80"
                  aria-label="Unpin sidebar"
                >
                  <motion.div
                    initial={{ rotate: 45 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <Pin 
                      className="w-4 h-4" 
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                  </motion.div>
                </button>
              </div>
              
              {/* Tab-specific content */}
              {renderSecondaryNavList(displayItem)}
            </motion.div>
          );
        })()}
      </div>

      {/* Secondary Navigation - Hover flyout (absolute positioned outside container) */}
      {!isPinned && hoveredItem && hoveredItem.children?.length && (
        <motion.div 
          className="absolute left-[84px] top-0 h-screen w-[240px] z-30 flex flex-col bg-background overflow-hidden"
          style={{
            boxShadow: '4px 0 12px -2px rgba(0, 0, 0, 0.08)',
            borderRight: '1px solid var(--color-border)',
            clipPath: 'inset(0 -20px 0 0)'
          }}
          animate={{ paddingTop: -5 }}
          exit={{ paddingTop: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseEnter={() => {
            isOverSecondaryNav.current = true;
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            isOverSecondaryNav.current = false;
            handleMouseLeave();
          }}
        >
          {/* Global Header */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <h3 className="font-medium text-foreground">{hoveredItem.title}</h3>
            <button
              type="button"
              onClick={handlePinToggle}
              className="p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-[var(--color-neutral-10)]/50 hover:text-foreground"
              aria-label="Pin sidebar"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 45 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Pin 
                  className="w-4 h-4" 
                  strokeWidth={1.5}
                  fill="none"
                />
              </motion.div>
            </button>
          </div>
          
          {/* Tab-specific content */}
          {renderSecondaryNavList(hoveredItem)}
        </motion.div>
      )}
      
      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        enabledCollections={enabledCollections}
        onCollectionsChange={handleCollectionsChange}
      />
    </div>
  );
}
