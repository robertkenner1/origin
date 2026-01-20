import React from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import type { NavItem } from "./SidebarNav";

type CommandPaletteProps = {
  navigation: NavItem[];
  onNavigate: (parent: NavItem | null, page: NavItem) => void;
};

type SearchableItem = {
  page: NavItem;
  parent: NavItem | null;
  breadcrumb: string;
  searchText: string;
};

// Context to share the command palette state
const CommandPaletteContext = React.createContext<{
  setOpen: (open: boolean) => void;
}>({
  setOpen: () => {},
});

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext);
}

export function CommandPalette({ navigation, onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  // Build searchable items from navigation
  const searchableItems = React.useMemo(() => {
    const items: SearchableItem[] = [];

    navigation.forEach((navItem) => {
      if (navItem.title === "Home") {
        // Add Home page
        items.push({
          page: navItem,
          parent: null,
          breadcrumb: "Home",
          searchText: "home",
        });
      } else if (navItem.children) {
        // Add all children with breadcrumb
        navItem.children.forEach((child) => {
          const breadcrumb = `${navItem.title} > ${child.title}`;
          items.push({
            page: child,
            parent: navItem,
            breadcrumb,
            searchText: `${navItem.title} ${child.title}`.toLowerCase(),
          });

          // If the child has sections, add them too
          if (child.sections) {
            child.sections.forEach((section) => {
              const sectionBreadcrumb = `${navItem.title} > ${child.title} > ${section.title}`;
              items.push({
                page: child,
                parent: navItem,
                breadcrumb: sectionBreadcrumb,
                searchText: `${navItem.title} ${child.title} ${section.title}`.toLowerCase(),
              });
            });
          }
        });
      }
    });

    return items;
  }, [navigation]);

  // Keyboard shortcut listener
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: SearchableItem) => {
    setOpen(false);
    onNavigate(item.parent, item.page);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {searchableItems.map((item, index) => (
              <CommandItem
                key={`${item.breadcrumb}-${index}`}
                onSelect={() => handleSelect(item)}
                className="flex flex-col items-start gap-1 py-3"
              >
                <div className="font-medium">{item.page.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.breadcrumb}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// Provider component to wrap the app
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <CommandPaletteContext.Provider value={{ setOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

// Separate trigger button component
export function CommandPaletteTrigger() {
  const { setOpen } = useCommandPalette();

  return (
    <button
      onClick={() => setOpen(true)}
      type="button"
      className="p-1.5 rounded hover:bg-sidebar-accent transition-colors"
      aria-label="Quick find (⌘K)"
      title="Quick find (⌘K)"
    >
      <Search className="w-5 h-5 text-sidebar-foreground/60" />
    </button>
  );
}
