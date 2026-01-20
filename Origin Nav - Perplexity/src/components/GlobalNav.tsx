import React from "react";
import { Search, ChevronRight } from "lucide-react";
import type { NavItem } from "./SidebarNav";

type GlobalNavProps = {
  onSearchClick: () => void;
  selectedParent?: NavItem | null;
  selectedPage?: NavItem | null;
};

export default function GlobalNav({ onSearchClick, selectedParent, selectedPage }: GlobalNavProps) {
  const showBreadcrumbs = false; // Hidden for now

  return (
    <div className="w-full bg-background py-[18px] px-12 border-b">
      <div className="flex items-center gap-6">
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="flex items-center gap-2 text-sm flex-shrink-0">
            {selectedParent && (
              <>
                <span className="text-muted-foreground">{selectedParent.title}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </>
            )}
            <span className="text-foreground font-medium">{selectedPage.title}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="w-[400px]">
          <button
            type="button"
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-muted/40 hover:bg-muted/60 rounded-lg transition-colors group text-left"
          >
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-1">
              Find a component or ask AI for advice
            </span>
            <div className="flex items-center gap-1">
              <kbd className="text-xs bg-transparent">⌘</kbd>
              <kbd className="text-xs bg-transparent">K</kbd>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
