import React from "react";
import type { NavItem } from "./SidebarNav";

type ComponentPageTemplateProps = {
  page: NavItem;
  parent?: NavItem | null;
  selectedParent?: NavItem | null;
  onPageSelect?: (page: NavItem) => void;
};

export default function ComponentPageTemplate({
  page,
  parent,
  selectedParent,
  onPageSelect,
}: ComponentPageTemplateProps) {
  const handleSecondaryPageSelect = (selectedPage: NavItem) => {
    if (onPageSelect) {
      onPageSelect(selectedPage);
    }
  };
  
  return (
    <main className="flex-1 bg-background overflow-auto">
          <div className="p-12 pt-8 pl-[50px] w-full">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-[24px]">{page.title}</h1>
            {page.tag && (
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                {page.tag}
              </span>
            )}
          </div>
          
          {page.tag === "exp" && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-900">
                <strong>⚠️ Experimental:</strong> This is an experimental feature. APIs and designs may change.
              </p>
            </div>
          )}
          
          {page.sections && page.sections.length > 0 ? (
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h3 className="mb-4">{section.title}</h3>
                  <p className="text-muted-foreground">
                    Documentation and examples for {section.title.toLowerCase()}.
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">
                Documentation and guidelines for {page.title}.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
