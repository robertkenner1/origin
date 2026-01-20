import React from "react";

type FilterBarProps = {
  showFilters?: boolean;
};

export function FilterBar({ showFilters = true }: FilterBarProps) {
  if (!showFilters) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status Dropdown */}
        <select className="pl-3 pr-10 py-1.5 text-sm rounded-md border border-border bg-background text-foreground cursor-pointer hover:border-foreground/40 transition-colors" style={{ width: 'fit-content' }}>
          <option>Status: All</option>
          <option>Status: Stable</option>
          <option>Status: Beta</option>
          <option>Status: Deprecated</option>
        </select>

        {/* Platform Dropdown */}
        <select className="pl-3 pr-10 py-1.5 text-sm rounded-md border border-border bg-background text-foreground cursor-pointer hover:border-foreground/40 transition-colors" style={{ width: 'fit-content' }}>
          <option>Platform: All</option>
          <option>Platform: Web</option>
          <option>Platform: Mobile</option>
          <option>Platform: Admin</option>
          <option>Platform: Email</option>
        </select>

        {/* Intent Dropdown */}
        <select className="pl-3 pr-10 py-1.5 text-sm rounded-md border border-border bg-background text-foreground cursor-pointer hover:border-foreground/40 transition-colors" style={{ width: 'fit-content' }}>
          <option>Intent: All</option>
          <option>Intent: Actions</option>
          <option>Intent: Navigation</option>
          <option>Intent: Inputs</option>
          <option>Intent: Feedback</option>
          <option>Intent: Data</option>
        </select>

        {/* Interaction Level Dropdown */}
        <select className="pl-3 pr-10 py-1.5 text-sm rounded-md border border-border bg-background text-foreground cursor-pointer hover:border-foreground/40 transition-colors" style={{ width: 'fit-content' }}>
          <option>Interaction: All</option>
          <option>Interaction: Static</option>
          <option>Interaction: Interactive</option>
          <option>Interaction: Stateful</option>
          <option>Interaction: Managed</option>
        </select>
      </div>
    </div>
  );
}