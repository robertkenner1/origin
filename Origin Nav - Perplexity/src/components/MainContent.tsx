import React from "react";
import type { NavItem } from "./SidebarNav";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Card, CardContent } from "./ui/card";
import { FilterBar } from "./FilterBar";

type MainContentProps = {
  page: NavItem | null;
  parent?: NavItem | null;
  navigation: NavItem[];
  onPageSelect: (parent: NavItem | null, page: NavItem | null) => void;
};

const MainContent = React.forwardRef<HTMLDivElement, MainContentProps>(function MainContent(
  { page, parent, navigation, onPageSelect }, 
  ref
) {
  if (!page) {
    return (
      <main ref={ref} className="flex-1 bg-background overflow-auto">
        <div className="p-12">
          <div className="max-w-4xl">
            <p className="text-muted-foreground">Select a page from the navigation to view its content.</p>
          </div>
        </div>
      </main>
    );
  }

  // Check if this is a tab root page (parent matches page, meaning we're on the tab's root)
  const isTabRootPage = parent && page && parent.title === page.title;
  const isChildPage = parent && page && parent.title !== page.title;
  const isHomePage = page.title === "Home";

  // Get page subtitle based on page type
  const getPageSubtitle = () => {
    if (page.title === "Home") {
      return "Curation of all collections";
    } else if (isTabRootPage) {
      return `Collection containing curated pages within the ${page.title} section`;
    } else if (isChildPage) {
      return `Detailed documentation within the ${parent.title} collection`;
    }
    return "Page content";
  };

  // Get hierarchy items to display as cards
  const getHierarchyItems = () => {
    if (isHomePage) {
      // On Home page, show all collections except Home itself
      return navigation.filter(item => item.title !== "Home");
    } else if (isTabRootPage) {
      // On collection root page, show all child pages
      return parent?.children || [];
    }
    // Child pages don't show any cards
    return [];
  };

  const hierarchyItems = getHierarchyItems();

  const handleCardClick = (item: NavItem | { title: string }) => {
    if (isHomePage) {
      // Clicking a collection card from Home
      const navItem = item as NavItem;
      onPageSelect(navItem, navItem);
    } else if (isTabRootPage) {
      // Clicking a child page card
      onPageSelect(parent, item as NavItem);
    }
  };

  return (
    <main ref={ref} className="flex-1 bg-background overflow-auto flex flex-col">
      {/* Top nav bar - only show if we're on a child page */}
      {isChildPage && (
        <div className="w-full border-b border-border">
          <div className="px-12 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    className="text-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (parent) {
                        onPageSelect(parent, parent);
                      }
                    }}
                  >
                    {parent.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm">
                    {page.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <div className="p-12 w-full">
        <div className="max-w-6xl">
          <h1 className="mb-3 text-[24px]">{page.title}</h1>
          <p className="text-muted-foreground mb-8">{getPageSubtitle()}</p>
          
          {/* Filter Bar - show on pages with hierarchy items */}
          {hierarchyItems.length > 0 && <FilterBar />}
          
          {/* Hierarchy cards */}
          {hierarchyItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hierarchyItems.map((item) => {
                const Icon = 'icon' in item ? item.icon : null;
                const isCurrentPage = page.title === item.title && (!isHomePage);
                
                return (
                  <Card 
                    key={item.title}
                    className={`cursor-pointer transition-all hover:border-foreground/30 ${
                      isCurrentPage ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleCardClick(item)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        {Icon && (
                          <div className="mt-0.5">
                            <Icon className="w-5 h-5 text-foreground/60" strokeWidth={1.5} />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.title}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export default MainContent;