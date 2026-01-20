import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WhatsNewRail() {
  return (
    <aside className="w-[320px] bg-background border-l border-border p-8 overflow-auto">
      <h2 className="mb-6">What's New</h2>
      <div className="space-y-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[14px]">New Component: Data Table</h3>
              </div>
              <span className="text-xs text-muted-foreground block mb-2">Oct 10, 2025</span>
              <p className="text-muted-foreground text-[13px] mb-2">
                We've added a powerful new Data Table component with sorting, filtering, and pagination built in.
              </p>
              <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 text-[13px]">
                Learn more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[14px]">Updated Color Tokens</h3>
              </div>
              <span className="text-xs text-muted-foreground block mb-2">Oct 5, 2025</span>
              <p className="text-muted-foreground text-[13px] mb-2">
                Our color system has been refreshed with improved contrast ratios and better dark mode support.
              </p>
              <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 text-[13px]">
                Learn more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[14px]">Figma Plugin Update</h3>
              </div>
              <span className="text-xs text-muted-foreground block mb-2">Sep 28, 2025</span>
              <p className="text-muted-foreground text-[13px] mb-2">
                The SDS Figma plugin now supports auto-layout conversions and improved component variant suggestions.
              </p>
              <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 text-[13px]">
                Learn more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[14px]">iOS SDK v2.0 Released</h3>
              </div>
              <span className="text-xs text-muted-foreground block mb-2">Sep 20, 2025</span>
              <p className="text-muted-foreground text-[13px] mb-2">
                Major update to our iOS SDK with SwiftUI support and improved performance.
              </p>
              <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 text-[13px]">
                Learn more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
