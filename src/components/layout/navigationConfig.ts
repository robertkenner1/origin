import { Home, Box, Layers, Image, Palette, BookOpen, Users, Accessibility, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  label?: string; // Optional short label for navigation
  path: string;
  icon?: LucideIcon;
  children?: NavItem[];
};

export type Collection = {
  id: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  description: string;
  children: { title: string; path: string }[];
  defaultVisible: boolean;
};

// All available collections in the system
export const ALL_COLLECTIONS: Collection[] = [
  {
    id: 'home',
    title: 'Home',
    label: 'Home',
    icon: Home,
    description: 'Home page',
    children: [{ title: 'Home', path: '/' }],
    defaultVisible: true,
  },
  {
    id: 'components',
    title: 'Components',
    label: 'Components',
    icon: Box,
    description: 'Component library',
    children: [
      { title: 'Overview', path: '/components' },
      { title: 'Button', path: '/components/button' },
      { title: 'Checkbox', path: '/components/checkbox' },
      { title: 'Icon Button', path: '/components/icon-button' },
      { title: 'Text Field', path: '/components/text-field' },
      { title: 'Switch', path: '/components/switch' },
      { title: 'Select', path: '/components/select' },
      { title: 'Combobox', path: '/components/combobox' },
      { title: 'Radio Group', path: '/components/radio-group' },
      { title: 'Textarea', path: '/components/textarea' },
      { title: 'Search Field', path: '/components/search' },
      { title: 'Checkbox Group', path: '/components/checkbox-group' },
      { title: 'Rating', path: '/components/rating' },
      { title: 'Verification Code', path: '/components/verification' },
      { title: 'Toast', path: '/components/toast' },
      { title: 'Circular Loader', path: '/components/circular-loader' },
      { title: 'Skeleton Loader', path: '/components/skeleton' },
      { title: 'Branded Loader', path: '/components/loader' },
      { title: 'Icon', path: '/components/icon' },
      { title: 'Badge', path: '/components/badge' },
      { title: 'Logo', path: '/components/logo' },
      { title: 'Tag', path: '/components/tag' },
      { title: 'Plan Tag', path: '/components/plan-tag' },
      { title: 'Illustration', path: '/components/illustration' },
      { title: 'Sticker', path: '/components/sticker' },
      { title: 'Menu', path: '/components/menu' },
      { title: 'Tabs', path: '/components/tabs' },
      { title: 'Link', path: '/components/link' },
      { title: 'ButtonAsLink', path: '/components/button-link' },
      { title: 'Tooltip', path: '/components/tooltip' },
      { title: 'Modal', path: '/components/modal' },
      { title: 'Popover', path: '/components/popover' },
      { title: 'Accordion', path: '/components/accordion' },
      { title: 'Form', path: '/components/form' },
      { title: 'Box', path: '/components/box' },
      { title: 'Heading', path: '/components/heading' },
      { title: 'Text', path: '/components/text' },
      { title: 'Flex', path: '/components/flex' },
      { title: 'ThemeProvider', path: '/components/theme-provider' },
      { title: 'PortalContainerProvider', path: '/components/portal-provider' },
      { title: 'LiveAnnouncer', path: '/components/live-announcer' },
      { title: 'ScreenReaderOnly', path: '/components/screen-reader-only' },
    ],
    defaultVisible: true,
  },
  {
    id: 'tokens',
    title: 'Tokens',
    label: 'Tokens',
    icon: Layers,
    description: 'Design tokens',
    children: [
      { title: 'Overview', path: '/tokens' },
      { title: 'Color', path: '/tokens/color' },
      { title: 'Typography', path: '/tokens/typography' },
      { title: 'Spacing', path: '/tokens/spacing' },
      { title: 'Shadows', path: '/tokens/shadows' },
      { title: 'Border Radius', path: '/tokens/radius' },
    ],
    defaultVisible: true,
  },
  {
    id: 'icons',
    title: 'Icons',
    label: 'Icons',
    icon: Image,
    description: 'Icon library',
    children: [
      { title: 'Browse', path: '/icons' },
      { title: 'Usage Guidelines', path: '/icons/guidelines' },
      { title: 'Icon Sets', path: '/icons/sets' },
      { title: 'Accessibility', path: '/icons/accessibility' },
    ],
    defaultVisible: true,
  },
  {
    id: 'brand',
    title: 'Brand',
    label: 'Brand',
    icon: Palette,
    description: 'Brand guidelines',
    children: [
      { title: 'Overview', path: '/brand' },
      { title: 'Illustrations', path: '/brand/illustrations' },
      { title: 'Logo', path: '/brand/logo' },
      { title: 'Typography', path: '/brand/typography' },
      { title: 'Color', path: '/brand/color' },
    ],
    defaultVisible: true,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    label: 'Start',
    icon: BookOpen,
    description: 'Get started with Origin',
    children: [
      { title: 'Overview', path: '/getting-started' },
      { title: 'Introduction to Origin', path: '/getting-started/introduction' },
      { title: 'JavaScript', path: '/getting-started/javascript' },
    ],
    defaultVisible: false,
  },
  {
    id: 'contributing',
    title: 'Contributing',
    label: 'Contribute',
    icon: Users,
    description: 'Contribute to Origin',
    children: [
      { title: 'Overview', path: '/contributing' },
      { title: 'Styling Custom Components', path: '/contributing/styling' },
      { title: 'Publishing Components', path: '/contributing/publishing' },
    ],
    defaultVisible: false,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    label: 'Access',
    icon: Accessibility,
    description: 'Accessibility guidelines',
    children: [
      { title: 'Overview', path: '/accessibility' },
      { title: 'Live Announcer', path: '/accessibility/live-announcer' },
      { title: 'Portal Container Provider', path: '/accessibility/portal-container' },
      { title: 'Screen Reader Only', path: '/accessibility/screen-reader' },
      { title: 'Theme Provider', path: '/accessibility/theme-provider' },
      { title: 'Content Design', path: '/accessibility/content-design' },
    ],
    defaultVisible: true,
  },
  {
    id: 'patterns',
    title: 'Patterns',
    label: 'Patterns',
    icon: LayoutGrid,
    description: 'Design patterns',
    children: [
      { title: 'Overview', path: '/patterns' },
      { title: 'Unified Platform Experience', path: '/patterns/unified-platform' },
      { title: 'Forms', path: '/patterns/forms' },
      { title: 'Empty States', path: '/patterns/empty-states' },
      { title: 'Disabled & Hidden States', path: '/patterns/disabled-states' },
      { title: 'Pro Plan Branding', path: '/patterns/pro-plan' },
    ],
    defaultVisible: false,
  },
];

// Convert collections to NavItems for the navigation
export function getNavigationFromCollections(enabledCollectionIds: string[]): NavItem[] {
  return enabledCollectionIds
    .map(id => ALL_COLLECTIONS.find(c => c.id === id))
    .filter((collection): collection is Collection => collection !== undefined)
    .map(collection => {
      // If collection has only one child that matches its title, it's a single page
      const isSinglePage = collection.children.length === 1 && 
                          collection.children[0].title === collection.title;
      
      return {
        title: collection.title,
        label: collection.label,
        path: collection.children[0].path,
        icon: collection.icon,
        children: isSinglePage ? undefined : collection.children.map(child => ({
          title: child.title,
          path: child.path,
        })),
      };
    });
}

// Get default visible collection IDs
export function getDefaultCollectionIds(): string[] {
  return ALL_COLLECTIONS
    .filter(c => c.defaultVisible)
    .map(c => c.id);
}

// Legacy export for backwards compatibility (uses all collections by default)
export const navigationItems: NavItem[] = [
  {
    title: 'Home',
    label: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'Components',
    label: 'Components',
    path: '/components',
    icon: Box,
  },
  {
    title: 'Tokens',
    label: 'Tokens',
    path: '/tokens',
    icon: Layers,
  },
  {
    title: 'Icons',
    label: 'Icons',
    path: '/icons',
    icon: Image,
  },
  {
    title: 'Brand',
    label: 'Brand',
    path: '/brand',
    icon: Palette,
    children: [
      { title: 'Overview', path: '/brand' },
      { title: 'Illustrations', path: '/brand/illustrations' },
      { title: 'Logo', path: '/brand/logo' },
      { title: 'Typography', path: '/brand/typography' },
      { title: 'Color', path: '/brand/color' },
    ],
  },
  {
    title: 'Getting Started',
    label: 'Start',
    path: '/getting-started',
    icon: BookOpen,
    children: [
      { title: 'Overview', path: '/getting-started' },
      { title: 'Introduction to Origin', path: '/getting-started/introduction' },
      { title: 'JavaScript', path: '/getting-started/javascript' },
    ],
  },
  {
    title: 'Contributing',
    label: 'Contribute',
    path: '/contributing',
    icon: Users,
    children: [
      { title: 'Overview', path: '/contributing' },
      { title: 'Styling Custom Components', path: '/contributing/styling' },
      { title: 'Publishing Components', path: '/contributing/publishing' },
    ],
  },
  {
    title: 'Accessibility',
    label: 'Access',
    path: '/accessibility',
    icon: Accessibility,
    children: [
      { title: 'Overview', path: '/accessibility' },
      { title: 'Live Announcer', path: '/accessibility/live-announcer' },
      { title: 'Portal Container Provider', path: '/accessibility/portal-container' },
      { title: 'Screen Reader Only', path: '/accessibility/screen-reader' },
      { title: 'Theme Provider', path: '/accessibility/theme-provider' },
      { title: 'Content Design', path: '/accessibility/content-design' },
    ],
  },
  {
    title: 'Patterns',
    label: 'Patterns',
    path: '/patterns',
    icon: LayoutGrid,
    children: [
      { title: 'Overview', path: '/patterns' },
      { title: 'Unified Platform Experience', path: '/patterns/unified-platform' },
      { title: 'Forms', path: '/patterns/forms' },
      { title: 'Empty States', path: '/patterns/empty-states' },
      { title: 'Disabled & Hidden States', path: '/patterns/disabled-states' },
      { title: 'Pro Plan Branding', path: '/patterns/pro-plan' },
    ],
  },
];
