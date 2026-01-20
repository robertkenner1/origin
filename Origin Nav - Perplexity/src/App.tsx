import React from 'react';
import SidebarNav from './components/SidebarNav';
import MainContent from './components/MainContent';
import { CommandPalette, CommandPaletteProvider } from './components/CommandPalette';
import SettingsModal from './components/SettingsModal';
import AboutNavigationModal from './components/AboutNavigationModal';
import { getNavigationFromCollections, getDefaultCollectionIds } from './components/NavPresets';
import type { NavItem } from './components/SidebarNav';

const ENABLED_COLLECTIONS_KEY = 'sds-enabled-collections';

type TabHistory = {
  parent: NavItem;
  page: NavItem;
};

export default function App() {
  // Load enabled collections from localStorage
  const [enabledCollections, setEnabledCollections] = React.useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(ENABLED_COLLECTIONS_KEY);
      return stored ? JSON.parse(stored) : getDefaultCollectionIds();
    } catch {
      return getDefaultCollectionIds();
    }
  });

  // Get navigation based on enabled collections
  const navigation = React.useMemo(() => getNavigationFromCollections(enabledCollections), [enabledCollections]);

  // Initialize with Home page (first item in NAV as both parent and page for root view)
  const [selectedParent, setSelectedParent] = React.useState<NavItem | null>(navigation[0]);
  const [selectedPage, setSelectedPage] = React.useState<NavItem | null>(navigation[0]);
  
  // Track navigation history for each tab
  const [tabHistory, setTabHistory] = React.useState<Map<string, TabHistory>>(new Map());
  const [lastClickedTab, setLastClickedTab] = React.useState<string | null>(null);
  
  // Ref for scrolling to top
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  
  // Modal states
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [aboutNavOpen, setAboutNavOpen] = React.useState(false);

  const handlePageSelect = (parent: NavItem | null, page: NavItem | null) => {
    setSelectedParent(parent);
    setSelectedPage(page);
    
    // Update tab history when navigating within a tab
    if (parent && page) {
      setTabHistory((prev) => {
        const newHistory = new Map(prev);
        newHistory.set(parent.title, { parent, page });
        return newHistory;
      });
    }
  };

  const handlePrimaryTabClick = (tab: NavItem) => {
    const isClickingSameTab = lastClickedTab === tab.title;
    const isOnTabRoot = selectedParent?.title === tab.title && selectedPage?.title === tab.title;
    const isOnThisTab = selectedParent?.title === tab.title;
    
    if (isClickingSameTab && isOnTabRoot) {
      // Third case: clicking same tab while on root -> scroll to top
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isClickingSameTab && isOnThisTab) {
      // Second case: clicking same tab while on child page -> go to root
      handlePageSelect(tab, tab);
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // First case: clicking different tab -> restore history or go to root
      const history = tabHistory.get(tab.title);
      if (history) {
        handlePageSelect(history.parent, history.page);
      } else {
        handlePageSelect(tab, tab);
      }
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }
    
    setLastClickedTab(tab.title);
  };

  const handleCollectionsChange = (collectionIds: string[]) => {
    setEnabledCollections(collectionIds);
    try {
      localStorage.setItem(ENABLED_COLLECTIONS_KEY, JSON.stringify(collectionIds));
    } catch {
      // Ignore localStorage errors
    }
    
    // Reset to home page with new collections
    const newNav = getNavigationFromCollections(collectionIds);
    setSelectedParent(newNav[0]);
    setSelectedPage(newNav[0]);
  };

  // Update selected pages when navigation changes
  React.useEffect(() => {
    const newNav = getNavigationFromCollections(enabledCollections);
    setSelectedParent(newNav[0]);
    setSelectedPage(newNav[0]);
  }, [enabledCollections]);

  return (
    <CommandPaletteProvider>
      <div className="h-screen bg-background flex w-full">
        <CommandPalette navigation={navigation} onNavigate={handlePageSelect} />
        <SidebarNav
          navigation={navigation}
          onPageSelect={handlePageSelect}
          onPrimaryTabClick={handlePrimaryTabClick}
          selectedParent={selectedParent}
          selectedPage={selectedPage}
          onSettingsClick={() => setSettingsOpen(true)}
          onAboutClick={() => setAboutNavOpen(true)}
        />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <MainContent 
            ref={mainContentRef}
            page={selectedPage}
            parent={selectedParent}
            navigation={navigation}
            onPageSelect={handlePageSelect}
          />
        </div>
        <SettingsModal
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          enabledCollections={enabledCollections}
          onCollectionsChange={handleCollectionsChange}
        />
        <AboutNavigationModal
          open={aboutNavOpen}
          onOpenChange={setAboutNavOpen}
        />
      </div>
    </CommandPaletteProvider>
  );
}
