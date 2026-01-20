import type { NavItem } from './SidebarNav';
import { Home, Palette, Cookie, Smile, LayoutGrid, FileText, Accessibility, Sparkles, Code, BookOpen } from 'lucide-react';

export type Collection = {
  id: string;
  title: string;
  icon: any;
  description: string;
  children: { title: string }[];
  defaultVisible: boolean; // Whether it shows in primary nav by default
};

// All available collections in the system
export const ALL_COLLECTIONS: Collection[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    description: "Curation of all collections",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-1",
    title: "Collection 1",
    icon: Palette,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
      { title: "Page 5" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-2",
    title: "Collection 2",
    icon: Cookie,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
      { title: "Page 5" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-3",
    title: "Collection 3",
    icon: Smile,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
      { title: "Page 5" },
      { title: "Page 6" },
      { title: "Page 7" },
      { title: "Page 8" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-4",
    title: "Collection 4",
    icon: LayoutGrid,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
      { title: "Page 5" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-5",
    title: "Collection 5",
    icon: FileText,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-6",
    title: "Collection 6",
    icon: Accessibility,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
      { title: "Page 5" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-7",
    title: "Collection 7",
    icon: Sparkles,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-8",
    title: "Collection 8",
    icon: Code,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
      { title: "Page 4" },
    ],
    defaultVisible: true,
  },
  {
    id: "collection-9",
    title: "Collection 9",
    icon: BookOpen,
    description: "A collection of related pages",
    children: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Page 3" },
    ],
    defaultVisible: true,
  },
];

// Convert collections to NavItems for the navigation
// Preserves the order specified in enabledCollectionIds
export function getNavigationFromCollections(enabledCollectionIds: string[]): NavItem[] {
  return enabledCollectionIds
    .map(id => ALL_COLLECTIONS.find(c => c.id === id))
    .filter((collection): collection is Collection => collection !== undefined)
    .map(collection => ({
      title: collection.title,
      children: collection.children,
      icon: collection.icon,
    }));
}

// Get default visible collection IDs
export function getDefaultCollectionIds(): string[] {
  return ALL_COLLECTIONS
    .filter(c => c.defaultVisible)
    .map(c => c.id);
}
