import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Lock } from 'lucide-react';
import { ALL_COLLECTIONS, getDefaultCollectionIds, type Collection } from './navigationConfig';

type SettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledCollections: string[];
  onCollectionsChange: (collectionIds: string[]) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
};

type CollectionItemProps = {
  collection: Collection;
  isEnabled: boolean;
  isHome: boolean;
  onToggle: (collectionId: string) => void;
};

const CollectionItem = ({
  collection,
  isEnabled,
  isHome,
  onToggle,
}: CollectionItemProps) => {
  const Icon = collection.icon;

  return (
    <div 
      className={`flex items-center justify-between pt-3.5 pb-3 border-t border-border first:border-t-0 ${
        isHome ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />}
        <span className="text-sm">{collection.title}</span>
      </div>
      
      {isHome ? (
        <Lock 
          className="w-4 h-4 text-muted-foreground/40"
          strokeWidth={1.5}
        />
      ) : (
        <Switch
          checked={isEnabled}
          onCheckedChange={() => onToggle(collection.id)}
          aria-label={isEnabled ? 'Enabled' : 'Disabled'}
        />
      )}
    </div>
  );
};

export function SettingsModal({
  open,
  onOpenChange,
  enabledCollections,
  onCollectionsChange,
  showLabels,
  onShowLabelsChange,
}: SettingsModalProps) {
  const [enabledCollectionIds, setEnabledCollectionIds] = useState<Set<string>>(
    new Set(enabledCollections)
  );

  useEffect(() => {
    if (open) {
      setEnabledCollectionIds(new Set(enabledCollections));
    }
  }, [open, enabledCollections]);

  // Sort collections: enabled/default first, then disabled
  const sortedCollections = [...ALL_COLLECTIONS].sort((a, b) => {
    const aEnabled = enabledCollectionIds.has(a.id);
    const bEnabled = enabledCollectionIds.has(b.id);
    
    // Enabled collections first
    if (aEnabled && !bEnabled) return -1;
    if (!aEnabled && bEnabled) return 1;
    
    // Within each group, maintain original order from ALL_COLLECTIONS
    return 0;
  });

  const handleToggleCollection = (collectionId: string) => {
    if (collectionId === 'home') return;
    
    const newEnabled = new Set(enabledCollectionIds);
    if (newEnabled.has(collectionId)) {
      newEnabled.delete(collectionId);
    } else {
      newEnabled.add(collectionId);
    }
    setEnabledCollectionIds(newEnabled);
    
    // Maintain original order from ALL_COLLECTIONS
    const enabledInOrder = ALL_COLLECTIONS
      .map(c => c.id)
      .filter(id => newEnabled.has(id));
    onCollectionsChange(enabledInOrder);
  };

  const handleReset = () => {
    const defaultEnabled = getDefaultCollectionIds();
    setEnabledCollectionIds(new Set(defaultEnabled));
    onCollectionsChange(defaultEnabled);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-8" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Customize sidebar</DialogTitle>
          <DialogDescription className="sr-only">
            Configure which collections appear in your navigation bar and choose between icons with text or icons only.
          </DialogDescription>
        </DialogHeader>

        {/* Collections Section */}
        <div className="pt-3 pb-6 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Show these tabs in the sidebar</h3>
          
          <div className="space-y-1">
            {sortedCollections.map((collection) => {
              const isHome = collection.id === 'home';
              const isEnabled = enabledCollectionIds.has(collection.id);
              
              return (
                <CollectionItem
                  key={collection.id}
                  collection={collection}
                  isEnabled={isEnabled}
                  isHome={isHome}
                  onToggle={handleToggleCollection}
                />
              );
            })}
          </div>
        </div>

          {/* Navigation Appearance Section */}
          <div className="pt-6 pb-6 space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Navigation Appearance</h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="nav-appearance"
                  checked={showLabels}
                  onChange={() => onShowLabelsChange(true)}
                  className="mt-0.5 w-4 h-4 text-foreground focus:ring-2 focus:ring-foreground cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium group-hover:text-foreground transition-colors">Icons & text</div>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="nav-appearance"
                  checked={!showLabels}
                  onChange={() => onShowLabelsChange(false)}
                  className="mt-0.5 w-4 h-4 text-foreground focus:ring-2 focus:ring-foreground cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium group-hover:text-foreground transition-colors">Icons only</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Makes navigation tabs smaller and more compact.
                  </p>
                </div>
              </label>
            </div>
          </div>

        <DialogFooter className="sm:justify-between">
          <Button 
            variant="ghost" 
            onClick={handleReset}
          >
            Reset to default
          </Button>
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
