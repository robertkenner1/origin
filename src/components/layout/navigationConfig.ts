import type { LucideIcon } from 'lucide-react';
import {
  HomeIcon,
  ComponentsIcon,
  TokensIcon,
  IconsIcon,
  DesignIcon,
  GettingStartedIcon,
  ContributingIcon,
  AccessibilityIcon,
  PatternsIcon,
} from '@/components/icons/CustomIcons';

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
    icon: HomeIcon as unknown as LucideIcon,
    description: 'Home page',
    children: [{ title: 'Home', path: '/' }],
    defaultVisible: true,
  },
  {
    id: 'components',
    title: 'Components',
    label: 'Components',
    icon: ComponentsIcon as unknown as LucideIcon,
    description: 'Component library',
    children: [
      { title: 'Component overview', path: '/components' },
      { title: 'Button', path: '/components/button' },
      { title: 'Checkbox', path: '/components/checkbox' },
      { title: 'Icon button', path: '/components/icon-button' },
      { title: 'Text field', path: '/components/text-field' },
      { title: 'Switch', path: '/components/switch' },
      { title: 'Select', path: '/components/select' },
      { title: 'Combobox', path: '/components/combobox' },
      { title: 'Radio group', path: '/components/radio-group' },
      { title: 'Textarea', path: '/components/textarea' },
      { title: 'Search field', path: '/components/search' },
      { title: 'Checkbox group', path: '/components/checkbox-group' },
      { title: 'Rating', path: '/components/rating' },
      { title: 'Verification code', path: '/components/verification' },
      { title: 'Toast', path: '/components/toast' },
      { title: 'Circular loader', path: '/components/circular-loader' },
      { title: 'Skeleton loader', path: '/components/skeleton' },
      { title: 'Branded loader', path: '/components/loader' },
      { title: 'Icon', path: '/components/icon' },
      { title: 'Badge', path: '/components/badge' },
      { title: 'Logo', path: '/components/logo' },
      { title: 'Tag', path: '/components/tag' },
      { title: 'Plan tag', path: '/components/plan-tag' },
      { title: 'Illustration', path: '/components/illustration' },
      { title: 'Sticker', path: '/components/sticker' },
      { title: 'Menu', path: '/components/menu' },
      { title: 'Tabs', path: '/components/tabs' },
      { title: 'Link', path: '/components/link' },
      { title: 'Button as link', path: '/components/button-link' },
      { title: 'Tooltip', path: '/components/tooltip' },
      { title: 'Modal', path: '/components/modal' },
      { title: 'Popover', path: '/components/popover' },
      { title: 'Accordion', path: '/components/accordion' },
      { title: 'Form', path: '/components/form' },
      { title: 'Box', path: '/components/box' },
      { title: 'Heading', path: '/components/heading' },
      { title: 'Text', path: '/components/text' },
      { title: 'Flex', path: '/components/flex' },
    ],
    defaultVisible: true,
  },
  {
    id: 'tokens',
    title: 'Tokens',
    label: 'Tokens',
    icon: TokensIcon as unknown as LucideIcon,
    description: 'Design tokens',
    children: [
      { title: 'Token overview', path: '/tokens' },
      { title: 'Color', path: '/tokens/color' },
      { title: 'Typography', path: '/tokens/typography' },
      { title: 'Spacing', path: '/tokens/spacing' },
      { title: 'Shadows', path: '/tokens/shadows' },
      { title: 'Border radius', path: '/tokens/radius' },
    ],
    defaultVisible: true,
  },
  {
    id: 'icons',
    title: 'Icons',
    label: 'Icons',
    icon: IconsIcon as unknown as LucideIcon,
    description: 'Icon library',
    children: [
      { title: 'Icons overview', path: '/icons' },
      { title: 'Usage guidelines', path: '/icons/guidelines' },
      { title: 'Icon sets', path: '/icons/sets' },
      { title: 'Accessibility', path: '/icons/accessibility' },
    ],
    defaultVisible: true,
  },
  {
    id: 'brand',
    title: 'Design',
    label: 'Design',
    icon: DesignIcon as unknown as LucideIcon,
    description: 'Brand guidelines',
    children: [
      { title: 'Design overview', path: '/brand' },
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
    icon: GettingStartedIcon as unknown as LucideIcon,
    description: 'Get started with Origin',
    children: [
      { title: 'Getting started overview', path: '/getting-started' },
      { title: 'Introduction to origin', path: '/getting-started/introduction' },
      { title: 'JavaScript', path: '/getting-started/javascript' },
    ],
    defaultVisible: false,
  },
  {
    id: 'contributing',
    title: 'Contributing',
    label: 'Contribute',
    icon: ContributingIcon as unknown as LucideIcon,
    description: 'Contribute to Origin',
    children: [
      { title: 'Contributing overview', path: '/contributing' },
      { title: 'Styling custom components', path: '/contributing/styling' },
      { title: 'Publishing components', path: '/contributing/publishing' },
    ],
    defaultVisible: false,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    label: 'a11y',
    icon: AccessibilityIcon as unknown as LucideIcon,
    description: 'Accessibility guidelines',
    children: [
      { title: 'a11y overview', path: '/accessibility' },
      { title: 'Live announcer', path: '/accessibility/live-announcer' },
      { title: 'Portal container provider', path: '/accessibility/portal-container' },
      { title: 'Screen reader only', path: '/accessibility/screen-reader' },
      { title: 'Theme provider', path: '/accessibility/theme-provider' },
      { title: 'Content design', path: '/accessibility/content-design' },
    ],
    defaultVisible: true,
  },
  {
    id: 'patterns',
    title: 'Patterns',
    label: 'Patterns',
    icon: PatternsIcon as unknown as LucideIcon,
    description: 'Design patterns',
    children: [
      { title: 'Pattern overview', path: '/patterns' },
      { title: 'Unified platform experience', path: '/patterns/unified-platform' },
      { title: 'Forms', path: '/patterns/forms' },
      { title: 'Empty states', path: '/patterns/empty-states' },
      { title: 'Disabled & hidden states', path: '/patterns/disabled-states' },
      { title: 'Pro plan branding', path: '/patterns/pro-plan' },
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
    icon: HomeIcon as unknown as LucideIcon,
  },
  {
    title: 'Components',
    label: 'Components',
    path: '/components',
    icon: ComponentsIcon as unknown as LucideIcon,
  },
  {
    title: 'Tokens',
    label: 'Tokens',
    path: '/tokens',
    icon: TokensIcon as unknown as LucideIcon,
  },
  {
    title: 'Icons',
    label: 'Icons',
    path: '/icons',
    icon: IconsIcon as unknown as LucideIcon,
  },
  {
    title: 'Design',
    label: 'Design',
    path: '/brand',
    icon: DesignIcon as unknown as LucideIcon,
    children: [
      { title: 'Design Overview', path: '/brand' },
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
    icon: GettingStartedIcon as unknown as LucideIcon,
    children: [
      { title: 'Getting Started Overview', path: '/getting-started' },
      { title: 'Introduction to origin', path: '/getting-started/introduction' },
      { title: 'JavaScript', path: '/getting-started/javascript' },
    ],
  },
  {
    title: 'Contributing',
    label: 'Contribute',
    path: '/contributing',
    icon: ContributingIcon as unknown as LucideIcon,
    children: [
      { title: 'Contributing Overview', path: '/contributing' },
      { title: 'Styling custom components', path: '/contributing/styling' },
      { title: 'Publishing components', path: '/contributing/publishing' },
    ],
  },
  {
    title: 'Accessibility',
    label: 'a11y',
    path: '/accessibility',
    icon: AccessibilityIcon as unknown as LucideIcon,
    children: [
      { title: 'a11y overview', path: '/accessibility' },
      { title: 'Live announcer', path: '/accessibility/live-announcer' },
      { title: 'Portal container provider', path: '/accessibility/portal-container' },
      { title: 'Screen reader only', path: '/accessibility/screen-reader' },
      { title: 'Theme provider', path: '/accessibility/theme-provider' },
      { title: 'Content design', path: '/accessibility/content-design' },
    ],
  },
  {
    title: 'Patterns',
    label: 'Patterns',
    path: '/patterns',
    icon: PatternsIcon as unknown as LucideIcon,
    children: [
      { title: 'Pattern Overview', path: '/patterns' },
      { title: 'Unified platform experience', path: '/patterns/unified-platform' },
      { title: 'Forms', path: '/patterns/forms' },
      { title: 'Empty states', path: '/patterns/empty-states' },
      { title: 'Disabled & hidden states', path: '/patterns/disabled-states' },
      { title: 'Pro plan branding', path: '/patterns/pro-plan' },
    ],
  },
];
