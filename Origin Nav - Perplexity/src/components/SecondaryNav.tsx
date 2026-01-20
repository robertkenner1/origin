import React from "react";
import type { NavItem } from "./SidebarNav";

type SecondaryNavProps = {
  selectedParent: NavItem | null;
  selectedPage: NavItem | null;
  onPageSelect: (page: NavItem) => void;
};

export default function SecondaryNav({ selectedParent, selectedPage, onPageSelect }: SecondaryNavProps) {
  if (!selectedParent || !selectedParent.children) {
    return null;
  }

  return (
    <aside className="w-[280px] bg-secondary border-r border-sidebar-border overflow-auto flex-shrink-0">
      {/* Section Label */}
      <div className="pt-4 pb-2">
        <h2 className="text-xs text-sidebar-foreground/60 px-6">
          {selectedParent.title}
        </h2>
      </div>
      
      <div className="p-3 pt-0">
        <div className="space-y-0.5">
          {selectedParent.children.map((page) => {
            const isActivePage = selectedPage?.title === page.title;
            return (
              <button
                key={page.title}
                type="button"
                onClick={() => onPageSelect(page)}
                className={`w-full text-left block py-2 px-3 rounded transition-colors ${
                  isActivePage
                    ? "bg-accent text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span>{page.title}</span>
                  {page.tag && (
                    <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                      {page.tag}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
