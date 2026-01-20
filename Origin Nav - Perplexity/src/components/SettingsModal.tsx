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
import { Pin, GripVertical, Lock } from 'lucide-react';
import { ALL_COLLECTIONS, type Collection } from './NavPresets';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';

type SettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledCollections: string[];
  onCollectionsChange: (collectionIds: string[]) => void;
};

type DraggableCollectionItemProps = {
  collection: Collection;
  index: number;
  isEnabled: boolean;
  isHome: boolean;
  onToggle: (collectionId: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
};

const DraggableCollectionItem = ({
  collection,
  index,
  isEnabled,
  isHome,
  onToggle,
  onMove,
}: DraggableCollectionItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'collection',
    item: { index },
    canDrag: !isHome,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'collection',
    canDrop: () => isEnabled, // Only allow drops on enabled items
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      if (!isEnabled) return; // Can't drop on unpinned items
      
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't allow drops at index 0 (Home position)
      if (hoverIndex === 0) return;
      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  // Combine refs
  preview(drop(ref));

  const Icon = collection.icon;
  const canDrag = isEnabled && !isHome;

  return (
    <div
      ref={canDrag ? ref : null}
      className={`flex items-center justify-between py-2 ${
        isHome ? 'opacity-60' : ''
      } ${isDragging ? 'opacity-40' : ''} ${isOver && canDrag ? 'bg-sidebar-accent/50' : ''}`}
    >
      <div className="flex items-center gap-3">
        {canDrag ? (
          <div
            ref={drag}
            className="cursor-grab active:cursor-grabbing"
          >
            <GripVertical 
              className="w-4 h-4 text-muted-foreground/40" 
              strokeWidth={1.5}
            />
          </div>
        ) : (
          <div className="w-4" />
        )}
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />}
        <span className="text-sm">{collection.title}</span>
      </div>
      
      <button
        type="button"
        onClick={() => onToggle(collection.id)}
        disabled={isHome}
        className={`p-1.5 rounded transition-colors ${
          !isHome ? 'hover:bg-sidebar-accent/80' : ''
        }`}
        aria-label={isHome ? 'Locked' : isEnabled ? 'Unpin' : 'Pin'}
      >
        {isHome ? (
          <Lock 
            className="w-4 h-4 text-muted-foreground/40"
            strokeWidth={1.5}
          />
        ) : (
          <motion.div
            animate={{ rotate: isEnabled ? 0 : 45 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Pin 
              className="w-4 h-4 text-foreground"
              strokeWidth={1.5}
              fill={isEnabled ? 'currentColor' : 'none'}
            />
          </motion.div>
        )}
      </button>
    </div>
  );
};

export default function SettingsModal({
  open,
  onOpenChange,
  enabledCollections,
  onCollectionsChange,
}: SettingsModalProps) {
  // Track the order of ALL collections (both pinned and unpinned)
  const [orderedCollectionIds, setOrderedCollectionIds] = React.useState<string[]>(() => {
    // Start with enabled collections, then add any missing ones
    const allIds = ALL_COLLECTIONS.map(c => c.id);
    const remaining = allIds.filter(id => !enabledCollections.includes(id));
    return [...enabledCollections, ...remaining];
  });

  // Track which collections are pinned
  const [pinnedCollectionIds, setPinnedCollectionIds] = React.useState<Set<string>>(
    new Set(enabledCollections)
  );

  // Update local state when modal opens or enabledCollections changes
  React.useEffect(() => {
    if (open) {
      // Rebuild the order: enabled first, then unpinned
      const allIds = ALL_COLLECTIONS.map(c => c.id);
      const unpinned = allIds.filter(id => !enabledCollections.includes(id));
      setOrderedCollectionIds([...enabledCollections, ...unpinned]);
      setPinnedCollectionIds(new Set(enabledCollections));
    }
  }, [open, enabledCollections]);

  const handleToggleCollection = (collectionId: string) => {
    // Can't toggle Home
    if (collectionId === 'home') return;
    
    const newPinned = new Set(pinnedCollectionIds);
    if (newPinned.has(collectionId)) {
      newPinned.delete(collectionId);
    } else {
      newPinned.add(collectionId);
    }
    setPinnedCollectionIds(newPinned);
    
    // Pass only pinned collections in their order to parent
    const pinnedInOrder = orderedCollectionIds.filter(id => newPinned.has(id));
    onCollectionsChange(pinnedInOrder);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    // Don't allow moving to or from index 0 (Home is locked at top)
    if (fromIndex === 0 || toIndex === 0) return;
    
    const newOrder = [...orderedCollectionIds];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setOrderedCollectionIds(newOrder);
    
    // Pass only pinned collections in their order to parent
    const pinnedInOrder = newOrder.filter(id => pinnedCollectionIds.has(id));
    onCollectionsChange(pinnedInOrder);
  };

  const handleReset = () => {
    // Reset to default order: all collections in their original order, all pinned
    const defaultOrder = ALL_COLLECTIONS.map(c => c.id);
    setOrderedCollectionIds(defaultOrder);
    setPinnedCollectionIds(new Set(defaultOrder));
    onCollectionsChange(defaultOrder);
  };

  // Split into pinned and unpinned collections
  const pinnedCollections = orderedCollectionIds
    .filter(id => pinnedCollectionIds.has(id))
    .map(id => ALL_COLLECTIONS.find(c => c.id === id))
    .filter((c): c is Collection => c !== undefined);

  const unpinnedCollections = orderedCollectionIds
    .filter(id => !pinnedCollectionIds.has(id))
    .map(id => ALL_COLLECTIONS.find(c => c.id === id))
    .filter((c): c is Collection => c !== undefined);

  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] p-8" hideCloseButton>
          <DialogHeader>
            <DialogTitle>Manage collections</DialogTitle>
            <DialogDescription>
              Pin or unpin collections to customize your navigation bar. Drag to reorder.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 pb-6">
            <div className="space-y-1">
              {/* Pinned collections */}
              {pinnedCollections.map((collection, index) => {
                const isHome = collection.id === 'home';
                
                return (
                  <DraggableCollectionItem
                    key={collection.id}
                    collection={collection}
                    index={index}
                    isEnabled={true}
                    isHome={isHome}
                    onToggle={handleToggleCollection}
                    onMove={handleMove}
                  />
                );
              })}
              
              {/* Unpinned collections */}
              {unpinnedCollections.map((collection, index) => {
                return (
                  <DraggableCollectionItem
                    key={collection.id}
                    collection={collection}
                    index={pinnedCollections.length + index}
                    isEnabled={false}
                    isHome={false}
                    onToggle={handleToggleCollection}
                    onMove={handleMove}
                  />
                );
              })}
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button 
              variant="ghost" 
              onClick={handleReset}
            >
              Pin all collections
            </Button>
            <DialogClose asChild>
              <Button variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}
