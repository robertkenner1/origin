import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import { PanelLeft, Library, Pin, MousePointer, Grip, CircleDot, History } from 'lucide-react';

type AboutNavigationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AboutNavigationModal({
  open,
  onOpenChange,
}: AboutNavigationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-8" hideCloseButton>
        <DialogHeader>
          <DialogTitle>About this navigation system</DialogTitle>
          <DialogDescription>
            A thoughtful approach to hierarchical navigation inspired by Notion
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 pb-6 space-y-6">
          {/* Icon-only Sidebar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PanelLeft className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Icon-only sidebar</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The primary navigation uses a compact 60px icon-only sidebar that stays fixed on the left. 
              Icons are stacked vertically with a clean, minimal aesthetic. This approach maximizes screen 
              real estate while keeping all collections accessible.
            </p>
          </div>

          {/* Hover Interactions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Hover flyout panels</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hovering over a collection icon reveals a flyout panel showing all child pages within 
              that collection. This keeps the interface clean while providing quick access to deep 
              navigation. The flyout appears instantly and follows your cursor movement between icons.
            </p>
          </div>

          {/* Pinning Behavior */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Global pinning</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click the pin icon in any flyout to keep that panel open permanently. This is useful 
              when working within a specific collection. The pinned panel persists across page 
              navigations and only one panel can be pinned at a time—pinning a new collection 
              automatically unpins the previous one.
            </p>
          </div>

          {/* Parent Highlighting */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Parent tab highlighting</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The parent collection icon remains highlighted when viewing any child page within it. 
              This provides clear context about where you are in the navigation hierarchy, making it 
              easy to understand your current location at a glance.
            </p>
          </div>

          {/* Tab History */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Smart tab history</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each collection remembers the last page you visited. Clicking a collection icon returns 
              you to that saved position. Clicking the same tab again takes you to its root page, and 
              a third click scrolls to the top—providing efficient navigation patterns for power users.
            </p>
          </div>

          {/* Collection Management */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Library className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Collection management</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Library icon opens a modal where you can customize which collections appear in your 
              navigation. Pin collections to show them in the sidebar, or unpin to hide them. The Home 
              collection is always visible and cannot be removed.
            </p>
          </div>

          {/* Drag and Drop */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Grip className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-medium">Drag to reorder</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In the collection management modal, drag the grip handles to reorder your collections. 
              Changes apply in real-time to the navigation bar, allowing you to organize your 
              workspace exactly how you want it.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
