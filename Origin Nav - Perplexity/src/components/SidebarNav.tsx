import React from "react";
import { Bell, User, Pin, Library, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type PageSection = {
  id: string;
  title: string;
};

export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
  sections?: PageSection[];
  tag?: string;
  icon?: React.ElementType;
};



type SidebarNavProps = {
  navigation: NavItem[];
  onPageSelect: (parent: NavItem | null, page: NavItem | null) => void;
  onPrimaryTabClick: (tab: NavItem) => void;
  selectedParent: NavItem | null;
  selectedPage: NavItem | null;
  onSettingsClick: () => void;
  onAboutClick: () => void;
};

export default function SidebarNav({
  navigation,
  onPageSelect,
  onPrimaryTabClick,
  selectedParent,
  selectedPage,
  onSettingsClick,
  onAboutClick,
}: SidebarNavProps) {
  const [hoveredItem, setHoveredItem] = React.useState<NavItem | null>(null);
  const [isPinned, setIsPinned] = React.useState(false);
  const [pinnedItem, setPinnedItem] = React.useState<NavItem | null>(null);
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isOverSecondaryNav = React.useRef(false);

  const handlePrimaryClick = (item: NavItem) => {
    // Use the new tab history handler
    onPrimaryTabClick(item);
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

  const handleSecondaryClick = (parent: NavItem, page: NavItem) => {
    onPageSelect(parent, page);
    // Don't close the secondary nav on click - let it stay open until mouse leaves
  };

  // Determine if a parent item should be active (if it or its child is selected)
  const isParentActive = (item: NavItem) => {
    // Highlight if this tab is selected as the root page (parent === page)
    if (selectedPage?.title === item.title) return true;
    // Highlight if this is the selected parent (we're viewing one of its children)
    if (selectedParent?.title === item.title) return true;
    return false;
  };

  const handlePinToggle = () => {
    if (!isPinned) {
      // We're pinning - save the hovered item
      if (hoveredItem && hoveredItem.children?.length) {
        setPinnedItem(hoveredItem);
        setIsPinned(true);
        // Keep hoveredItem if user is still over the secondary nav
        if (!isOverSecondaryNav.current) {
          setHoveredItem(null);
        }
      }
    } else {
      // Unpinning - keep the item visible if user is still hovering over it
      const itemToKeep = pinnedItem;
      setIsPinned(false);
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
          const isChildActive = selectedPage?.title === child.title && selectedParent?.title === item.title;
          return (
            <button
              key={child.title}
              type="button"
              onClick={() => handleSecondaryClick(item, child)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                isChildActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13.5px]">{child.title}</span>
                {child.tag && (
                  <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                    {child.tag}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="relative">
      {/* Container for Primary and Secondary Nav */}
      <div 
        className={`h-screen flex bg-sidebar ${isPinned && pinnedItem ? 'w-[300px]' : 'w-[60px]'}`}
        onMouseLeave={handleMouseLeave}
      >
      {/* Primary Navigation Sidebar */}
      <aside className="w-[60px] h-screen flex flex-col flex-shrink-0 relative z-20">
        {/* Header */}
        <div className="px-[12px] pt-[20px] pb-[4px] flex flex-col items-center">
          <div 
            className="w-8 h-8 flex items-center justify-center flex-shrink-0 cursor-pointer"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                animate={{ 
                  cx: isLogoHovered ? 14 : 14,
                  cy: isLogoHovered ? 14 : 9,
                  fillOpacity: isLogoHovered ? 0 : 0.35,
                  strokeWidth: isLogoHovered ? 2 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                r="8.5"
                fill="#D4B5A0"
                stroke="#D4B5A0"
              />
              <motion.circle 
                animate={{ 
                  cx: isLogoHovered ? 14 : 10,
                  cy: isLogoHovered ? 14 : 17,
                  fillOpacity: isLogoHovered ? 0 : 0.35,
                  strokeWidth: isLogoHovered ? 2 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                r="8.5"
                fill="#D4B5A0"
                stroke="#D4B5A0"
              />
              <motion.circle 
                animate={{ 
                  cx: isLogoHovered ? 14 : 18,
                  cy: isLogoHovered ? 14 : 17,
                  fillOpacity: isLogoHovered ? 0 : 0.35,
                  strokeWidth: isLogoHovered ? 2 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                r="8.5"
                fill="#D4B5A0"
                stroke="#D4B5A0"
              />
            </svg>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="flex flex-col items-center gap-1">
            {navigation.map((item) => {
              const isActive = isParentActive(item);
              const hasChildren = !!item.children?.length;
              const isLeafActive = !hasChildren && selectedPage?.title === item.title;
              const Icon = item.icon;
              const isSelected = isActive || isLeafActive;
              const isShowingChildren = !isPinned && hoveredItem?.title === item.title;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handlePrimaryClick(item)}
                  onMouseEnter={() => handleMouseEnter(item)}
                  className="w-[36px] h-[36px] flex items-center justify-center text-sidebar-foreground group rounded-md transition-all"
                  aria-label={item.title}
                >
                  <div className={`w-full h-full flex items-center justify-center rounded-md transition-all ${
                    isSelected 
                      ? "bg-sidebar-accent" 
                      : isShowingChildren
                      ? "bg-sidebar-accent/50"
                      : "group-hover:bg-sidebar-accent/50"
                  }`}>
                    {Icon && <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isSelected ? "" : "opacity-80 group-hover:scale-105"
                    }`} strokeWidth={1.5} />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="py-3 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onAboutClick}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-md hover:bg-sidebar-accent/50 transition-colors"
            aria-label="About navigation"
          >
            <Info className="w-5 h-5 text-sidebar-foreground/60" />
          </button>
          <button
            type="button"
            className="w-[36px] h-[36px] flex items-center justify-center rounded-md hover:bg-sidebar-accent/50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-sidebar-foreground/60" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Account"
          >
            <User className="w-4 h-4 text-sidebar-foreground/60" />
          </button>
        </div>
      </aside>

      {/* Secondary Navigation - Pinned (flex sibling) */}
      {isPinned && pinnedItem && pinnedItem.children?.length && (() => {
        const displayItem = hoveredItem || pinnedItem;
        return (
          <motion.div 
            className="w-[240px] h-full flex flex-col flex-shrink-0"
            animate={{ paddingTop: 10 }}
            exit={{ paddingTop: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
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
              <h3 className="font-medium text-sidebar-foreground">{displayItem.title}</h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSettingsClick();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md transition-colors text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  aria-label="Manage collections"
                >
                  <Library className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={handlePinToggle}
                  className="p-1.5 rounded-md transition-colors bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
                  aria-label="Unpin sidebar"
                >
                  <motion.div
                    initial={{ rotate: 45 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Pin 
                      className="w-4 h-4" 
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                  </motion.div>
                </button>
              </div>
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
          className="absolute left-[60px] top-0 h-screen w-[240px] z-30 flex flex-col bg-sidebar overflow-hidden"
          style={{
            boxShadow: '4px 0 12px -2px rgba(0, 0, 0, 0.08)',
            borderRight: '1px solid rgba(93, 52, 40, 0.08)',
            clipPath: 'inset(0 -20px 0 0)'
          }}
          animate={{ paddingTop: -5 }}
          exit={{ paddingTop: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
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
            <h3 className="font-medium text-sidebar-foreground">{hoveredItem.title}</h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSettingsClick();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md transition-colors text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                aria-label="Manage collections"
              >
                <Library className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={handlePinToggle}
                className="p-1.5 rounded-md transition-colors text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                aria-label="Pin sidebar"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Pin 
                    className="w-4 h-4" 
                    strokeWidth={1.5}
                    fill="none"
                  />
                </motion.div>
              </button>
            </div>
          </div>
          
          {/* Tab-specific content */}
          {renderSecondaryNavList(hoveredItem)}
        </motion.div>
      )}
    </div>
  );
}
