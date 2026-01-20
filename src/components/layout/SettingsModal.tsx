import { useState, useRef, useEffect } from 'react';
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
import { Pin, GripVertical, Lock } from 'lucide-react';
import { ALL_COLLECTIONS, getDefaultCollectionIds, type Collection } from './navigationConfig';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';

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
  const ref = useRef<HTMLDivElement>(null);

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
    canDrop: () => isEnabled,
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      if (!isEnabled) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (hoverIndex === 0) return;
      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  preview(drop(ref));

  const Icon = collection.icon;
  const canDrag = isEnabled && !isHome;

  return (
    <div
      ref={canDrag ? ref : null}
      className={`flex items-center justify-between py-2 ${
        isHome ? 'opacity-60' : ''
      } ${isDragging ? 'opacity-40' : ''} ${isOver && canDrag ? 'bg-[var(--color-neutral-10)]/50' : ''}`}
    >
      <div className="flex items-center gap-3">
        {canDrag ? (
          <div
            ref={drag as unknown as React.Ref<HTMLDivElement>}
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
          !isHome ? 'hover:bg-[var(--color-neutral-10)]/80' : ''
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

export function SettingsModal({
  open,
  onOpenChange,
  enabledCollections,
  onCollectionsChange,
}: SettingsModalProps) {
  const [orderedCollectionIds, setOrderedCollectionIds] = useState<string[]>(() => {
    const allIds = ALL_COLLECTIONS.map(c => c.id);
    const remaining = allIds.filter(id => !enabledCollections.includes(id));
    return [...enabledCollections, ...remaining];
  });

  const [pinnedCollectionIds, setPinnedCollectionIds] = useState<Set<string>>(
    new Set(enabledCollections)
  );

  useEffect(() => {
    if (open) {
      const allIds = ALL_COLLECTIONS.map(c => c.id);
      const unpinned = allIds.filter(id => !enabledCollections.includes(id));
      setOrderedCollectionIds([...enabledCollections, ...unpinned]);
      setPinnedCollectionIds(new Set(enabledCollections));
    }
  }, [open, enabledCollections]);

  const handleToggleCollection = (collectionId: string) => {
    if (collectionId === 'home') return;
    
    const newPinned = new Set(pinnedCollectionIds);
    if (newPinned.has(collectionId)) {
      newPinned.delete(collectionId);
    } else {
      newPinned.add(collectionId);
    }
    setPinnedCollectionIds(newPinned);
    
    const pinnedInOrder = orderedCollectionIds.filter(id => newPinned.has(id));
    onCollectionsChange(pinnedInOrder);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (fromIndex === 0 || toIndex === 0) return;
    
    const newOrder = [...orderedCollectionIds];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setOrderedCollectionIds(newOrder);
    
    const pinnedInOrder = newOrder.filter(id => pinnedCollectionIds.has(id));
    onCollectionsChange(pinnedInOrder);
  };

  const handleReset = () => {
    const defaultOrder = ALL_COLLECTIONS.map(c => c.id);
    const defaultEnabled = getDefaultCollectionIds();
    setOrderedCollectionIds(defaultOrder);
    setPinnedCollectionIds(new Set(defaultEnabled));
    onCollectionsChange(defaultEnabled);
  };

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
              Pin or unpin collections to customize your navigation bar. Unpinned collections appear in the More menu. Drag to reorder.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 pb-6">
            <div className="space-y-1">
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
    </DndProvider>
  );
}
