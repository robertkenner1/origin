import type { LucideIcon } from 'lucide-react';
import {
  HomeIcon,
  ComponentsIcon,
  TokensIcon,
  IconsIcon,
  DesignIcon,
  GettingStartedIcon,
  AccessibilityIcon,
  PatternsIcon,
  ContentIcon,
  SupportIcon,
  WhatsNewIcon,
} from '@/components/icons/CustomIcons';

export type NavItem = {
  title: string;
  label?: string; // Optional short label for navigation
  path: string;
  icon?: LucideIcon;
  children?: NavItem[];
  groups?: NavItemGroup[]; // For accordion/grouped navigation
};

export type NavItemGroup = {
  title: string;
  children: { title: string; path: string }[];
};

export type Collection = {
  id: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  description: string;
  children?: { title: string; path: string }[];
  groups?: NavItemGroup[]; // For accordion/grouped navigation
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
    id: 'brand',
    title: 'Design',
    label: 'Design',
    icon: DesignIcon as unknown as LucideIcon,
    description: 'Brand guidelines and visual design',
    children: [
      { title: 'Design overview', path: '/brand' },
      { title: 'Color', path: '/brand/color' },
      { title: 'Illustration', path: '/brand/illustrations' },
      { title: 'Typography', path: '/brand/typography' },
    ],
    defaultVisible: true,
  },
  {
    id: 'icons',
    title: 'Iconography',
    label: 'Iconography',
    icon: IconsIcon as unknown as LucideIcon,
    description: 'Icon library and guidelines',
    children: [
      { title: 'Icons overview', path: '/icons' },
      { title: 'Usage guidelines', path: '/icons/guidelines' },
      { title: 'Icon sets', path: '/icons/sets' },
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
      { title: 'Border radius', path: '/tokens/radius' },
      { title: 'Elevation', path: '/tokens/shadows' },
      { title: 'Space', path: '/tokens/spacing' },
    ],
    defaultVisible: true,
  },
  {
    id: 'origin-101',
    title: 'Origin 101',
    label: 'Origin 101',
    icon: GettingStartedIcon as unknown as LucideIcon,
    description: 'Get started with Origin',
    children: [
      { title: 'Introduction', path: '/origin-101' },
      { title: 'Installing Origin', path: '/origin-101/installing' },
    ],
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
    ],
    groups: [
      {
        title: 'Actions',
        children: [
          { title: 'Button', path: '/components/button' },
          { title: 'Button as link', path: '/components/button-link' },
          { title: 'Icon button', path: '/components/icon-button' },
        ],
      },
      {
        title: 'Feedback',
        children: [
          { title: 'Rating', path: '/components/rating' },
          { title: 'Verification code', path: '/components/verification' },
        ],
      },
      {
        title: 'Form',
        children: [
          { title: 'Checkbox', path: '/components/checkbox' },
          { title: 'Checkbox group', path: '/components/checkbox-group' },
          { title: 'Combobox', path: '/components/combobox' },
          { title: 'Radio group', path: '/components/radio-group' },
          { title: 'Search field', path: '/components/search' },
          { title: 'Select', path: '/components/select' },
          { title: 'Switch', path: '/components/switch' },
          { title: 'Text field', path: '/components/text-field' },
          { title: 'Textarea', path: '/components/textarea' },
        ],
      },
      {
        title: 'Images',
        children: [
          { title: 'Icon', path: '/components/icon' },
          { title: 'Illustration', path: '/components/illustration' },
          { title: 'Logo', path: '/components/logo' },
          { title: 'Sticker', path: '/components/sticker' },
        ],
      },
      {
        title: 'Indicators',
        children: [
          { title: 'Badge', path: '/components/badge' },
          { title: 'Plan tag', path: '/components/plan-tag' },
          { title: 'Tag', path: '/components/tag' },
        ],
      },
      {
        title: 'Content structure',
        children: [
          { title: 'Accordion', path: '/components/accordion' },
          { title: 'Box', path: '/components/box' },
          { title: 'Flex', path: '/components/flex' },
          { title: 'Tabs', path: '/components/tabs' },
        ],
      },
      {
        title: 'Loaders',
        children: [
          { title: 'Branded loader', path: '/components/loader' },
          { title: 'Circular loader', path: '/components/circular-loader' },
          { title: 'Skeleton loader', path: '/components/skeleton' },
        ],
      },
      {
        title: 'Navigation',
        children: [
          { title: 'Link', path: '/components/link' },
          { title: 'Menu', path: '/components/menu' },
        ],
      },
      {
        title: 'Overlays',
        children: [
          { title: 'Modal', path: '/components/modal' },
          { title: 'Popover', path: '/components/popover' },
          { title: 'Toast', path: '/components/toast' },
          { title: 'Tooltip', path: '/components/tooltip' },
        ],
      },
      {
        title: 'Typography',
        children: [
          { title: 'Heading', path: '/components/heading' },
          { title: 'Text', path: '/components/text' },
        ],
      },
      {
        title: 'Utilities',
        children: [
          { title: 'Form', path: '/components/form' },
          { title: 'Live announcer', path: '/accessibility/live-announcer' },
          { title: 'Portal container provider', path: '/accessibility/portal-container' },
          { title: 'Screen reader only', path: '/accessibility/screen-reader' },
          { title: 'Theme provider', path: '/accessibility/theme-provider' },
        ],
      },
    ],
    defaultVisible: true,
  },
  {
    id: 'content',
    title: 'Content',
    label: 'Content',
    icon: ContentIcon as unknown as LucideIcon,
    description: 'Content guidelines and writing standards',
    children: [
      { title: 'Accessibility in content design', path: '/content/accessibility' },
      { title: 'Best practices', path: '/content/best-practices' },
      { title: 'Generative AI in product content', path: '/content/generative-ai' },
      { title: 'Terminology', path: '/content/terminology' },
      { title: 'Voice and tone', path: '/content/voice-tone' },
      { title: 'Writing process', path: '/content/writing-process' },
    ],
    groups: [
      {
        title: 'Style',
        children: [
          { title: 'Formatting', path: '/content/style/formatting' },
          { title: 'Grammar', path: '/content/style/grammar' },
          { title: 'Numbers', path: '/content/style/numbers' },
          { title: 'Punctuation', path: '/content/style/punctuation' },
        ],
      },
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
      { title: 'Pro plan branding', path: '/patterns/pro-plan' },
      { title: 'Disabled, hidden, and read-only states', path: '/patterns/disabled-states' },
      { title: 'Empty states', path: '/patterns/empty-states' },
      { title: 'Feedback survey', path: '/patterns/feedback-survey' },
      { title: 'Text transforms', path: '/patterns/text-transforms' },
      { title: 'Underlines and highlights', path: '/patterns/underlines-highlights' },
    ],
    groups: [
      {
        title: 'Forms',
        children: [
          { title: 'Forms', path: '/patterns/forms' },
          { title: 'Errors in forms', path: '/patterns/forms/errors' },
        ],
      },
      {
        title: 'Grammarly Widget',
        children: [
          { title: 'Extension', path: '/patterns/grammarly-widget/extension' },
          { title: 'Windows and Mac', path: '/patterns/grammarly-widget/windows-mac' },
        ],
      },
    ],
    defaultVisible: true,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    label: 'a11y',
    icon: AccessibilityIcon as unknown as LucideIcon,
    description: 'Accessibility guidelines',
    children: [
      { title: 'a11y overview', path: '/accessibility' },
      { title: 'Best practices', path: '/accessibility/best-practices' },
      { title: 'Generative and context', path: '/accessibility/generative-context' },
    ],
    defaultVisible: true,
  },
  {
    id: 'support',
    title: 'Support',
    label: 'Support',
    icon: SupportIcon as unknown as LucideIcon,
    description: 'Support and help resources',
    children: [
      { title: 'Support overview', path: '/support' },
      { title: 'FAQ', path: '/support/faq' },
      { title: 'Contact', path: '/support/contact' },
    ],
    defaultVisible: false,
  },
  {
    id: 'whats-new',
    title: "What's New",
    label: "What's New",
    icon: WhatsNewIcon as unknown as LucideIcon,
    description: 'Latest updates and changes',
    children: [
      { title: "What's new overview", path: '/whats-new' },
      { title: 'Changelog', path: '/whats-new/changelog' },
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
      // If collection has groups, use those
      if (collection.groups) {
        return {
          title: collection.title,
          label: collection.label,
          path: collection.children?.[0]?.path || '/',
          icon: collection.icon,
          children: collection.children?.map(child => ({
            title: child.title,
            path: child.path,
          })),
          groups: collection.groups,
        };
      }

      // Otherwise use flat children
      // If collection has only one child that matches its title, it's a single page
      const isSinglePage = collection.children && collection.children.length === 1 &&
                          collection.children[0].title === collection.title;

      return {
        title: collection.title,
        label: collection.label,
        path: collection.children?.[0]?.path || '/',
        icon: collection.icon,
        children: isSinglePage ? undefined : collection.children?.map(child => ({
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
    title: 'Design',
    label: 'Design',
    path: '/brand',
    icon: DesignIcon as unknown as LucideIcon,
    children: [
      { title: 'Design overview', path: '/brand' },
      { title: 'Color', path: '/brand/color' },
      { title: 'Illustration', path: '/brand/illustrations' },
      { title: 'Typography', path: '/brand/typography' },
    ],
  },
  {
    title: 'Iconography',
    label: 'Iconography',
    path: '/icons',
    icon: IconsIcon as unknown as LucideIcon,
    children: [
      { title: 'Icons overview', path: '/icons' },
      { title: 'Usage guidelines', path: '/icons/guidelines' },
      { title: 'Icon sets', path: '/icons/sets' },
    ],
  },
  {
    title: 'Tokens',
    label: 'Tokens',
    path: '/tokens',
    icon: TokensIcon as unknown as LucideIcon,
    children: [
      { title: 'Token overview', path: '/tokens' },
      { title: 'Color', path: '/tokens/color' },
      { title: 'Border radius', path: '/tokens/radius' },
      { title: 'Elevation', path: '/tokens/shadows' },
      { title: 'Space', path: '/tokens/spacing' },
    ],
  },
  {
    title: 'Origin 101',
    label: 'Origin 101',
    path: '/origin-101',
    icon: GettingStartedIcon as unknown as LucideIcon,
    children: [
      { title: 'Introduction', path: '/origin-101' },
      { title: 'Installing Origin', path: '/origin-101/installing' },
    ],
  },
  {
    title: 'Components',
    label: 'Components',
    path: '/components',
    icon: ComponentsIcon as unknown as LucideIcon,
  },
  {
    title: 'Content',
    label: 'Content',
    path: '/content',
    icon: ContentIcon as unknown as LucideIcon,
    children: [
      { title: 'Content overview', path: '/content' },
      { title: 'Accessibility in content design', path: '/content/accessibility' },
      { title: 'Best practices', path: '/content/best-practices' },
      { title: 'Generative AI in product content', path: '/content/generative-ai' },
      { title: 'Style', path: '/content/style' },
      { title: 'Terminology', path: '/content/terminology' },
      { title: 'Voice and tone', path: '/content/voice-tone' },
      { title: 'Writing process', path: '/content/writing-process' },
    ],
  },
  {
    title: 'Patterns',
    label: 'Patterns',
    path: '/patterns',
    icon: PatternsIcon as unknown as LucideIcon,
    children: [
      { title: 'Pattern overview', path: '/patterns' },
      { title: 'Pro plan branding', path: '/patterns/pro-plan' },
      { title: 'Disabled, hidden, and read-only states', path: '/patterns/disabled-states' },
      { title: 'Empty states', path: '/patterns/empty-states' },
      { title: 'Feedback survey', path: '/patterns/feedback-survey' },
      { title: 'Forms', path: '/patterns/forms' },
      { title: 'Grammarly Widget', path: '/patterns/grammarly-widget' },
      { title: 'Text transforms', path: '/patterns/text-transforms' },
      { title: 'Underlines and highlights', path: '/patterns/underlines-highlights' },
    ],
  },
  {
    title: 'Accessibility',
    label: 'a11y',
    path: '/accessibility',
    icon: AccessibilityIcon as unknown as LucideIcon,
    children: [
      { title: 'a11y overview', path: '/accessibility' },
      { title: 'Best practices', path: '/accessibility/best-practices' },
      { title: 'Generative and context', path: '/accessibility/generative-context' },
    ],
  },
  {
    title: 'Support',
    label: 'Support',
    path: '/support',
    icon: SupportIcon as unknown as LucideIcon,
    children: [
      { title: 'Support overview', path: '/support' },
      { title: 'FAQ', path: '/support/faq' },
      { title: 'Contact', path: '/support/contact' },
    ],
  },
  {
    title: "What's new",
    label: "What's new",
    path: '/whats-new',
    icon: WhatsNewIcon as unknown as LucideIcon,
    children: [
      { title: "What's new overview", path: '/whats-new' },
      { title: 'Changelog', path: '/whats-new/changelog' },
    ],
  },
];
