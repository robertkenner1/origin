export type SearchResultType = 'component' | 'token' | 'iconography' | 'design' | 'origin-101' | 'content' | 'pattern' | 'accessibility' | 'support' | 'whats-new';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  path: string;
  category?: string;
  keywords?: string[];
}

export const searchIndex: SearchResult[] = [
  // Components
  {
    id: 'component-button',
    type: 'component',
    title: 'Button',
    description: 'Primary interactive element for user actions',
    path: '/components/button',
    category: 'Components',
    keywords: ['button', 'click', 'action', 'primary', 'secondary', 'cta']
  },
  {
    id: 'component-checkbox',
    type: 'component',
    title: 'Checkbox',
    description: 'Selection control for multiple choices',
    path: '/components/checkbox',
    category: 'Components',
    keywords: ['checkbox', 'select', 'multiple', 'choice', 'form']
  },
  {
    id: 'component-icon-button',
    type: 'component',
    title: 'Icon Button',
    description: 'Button with icon for compact actions',
    path: '/components/icon-button',
    category: 'Components',
    keywords: ['icon', 'button', 'compact', 'action']
  },
  {
    id: 'component-text-field',
    type: 'component',
    title: 'Text Field',
    description: 'Input field for text entry',
    path: '/components/text-field',
    category: 'Components',
    keywords: ['input', 'text', 'field', 'form', 'entry']
  },
  {
    id: 'component-switch',
    type: 'component',
    title: 'Switch',
    description: 'Toggle control for binary choices',
    path: '/components/switch',
    category: 'Components',
    keywords: ['switch', 'toggle', 'on', 'off', 'binary']
  },
  {
    id: 'component-select',
    type: 'component',
    title: 'Select',
    description: 'Dropdown for selecting from a list of options',
    path: '/components/select',
    category: 'Components',
    keywords: ['select', 'dropdown', 'menu', 'options', 'picker']
  },
  {
    id: 'component-modal',
    type: 'component',
    title: 'Modal',
    description: 'Overlay dialog for focused interactions',
    path: '/components/modal',
    category: 'Components',
    keywords: ['modal', 'dialog', 'overlay', 'popup', 'lightbox']
  },
  {
    id: 'component-toast',
    type: 'component',
    title: 'Toast',
    description: 'Temporary notification message',
    path: '/components/toast',
    category: 'Components',
    keywords: ['toast', 'notification', 'message', 'alert', 'snackbar']
  },
  {
    id: 'component-tooltip',
    type: 'component',
    title: 'Tooltip',
    description: 'Contextual information on hover',
    path: '/components/tooltip',
    category: 'Components',
    keywords: ['tooltip', 'hover', 'hint', 'info', 'help']
  },
  {
    id: 'component-tabs',
    type: 'component',
    title: 'Tabs',
    description: 'Navigation between related content sections',
    path: '/components/tabs',
    category: 'Components',
    keywords: ['tabs', 'navigation', 'sections', 'panels']
  },
  {
    id: 'component-accordion',
    type: 'component',
    title: 'Accordion',
    description: 'Expandable content sections',
    path: '/components/accordion',
    category: 'Components',
    keywords: ['accordion', 'collapse', 'expand', 'disclosure']
  },
  {
    id: 'component-badge',
    type: 'component',
    title: 'Badge',
    description: 'Small label for status or count',
    path: '/components/badge',
    category: 'Components',
    keywords: ['badge', 'label', 'status', 'count', 'indicator']
  },
  {
    id: 'component-tag',
    type: 'component',
    title: 'Tag',
    description: 'Label for categorization',
    path: '/components/tag',
    category: 'Components',
    keywords: ['tag', 'label', 'category', 'chip']
  },
  {
    id: 'component-skeleton',
    type: 'component',
    title: 'Skeleton Loader',
    description: 'Loading placeholder for content',
    path: '/components/skeleton',
    category: 'Components',
    keywords: ['skeleton', 'loader', 'loading', 'placeholder']
  },
  {
    id: 'component-loader',
    type: 'component',
    title: 'Branded Loader',
    description: 'Loading spinner with brand styling',
    path: '/components/loader',
    category: 'Components',
    keywords: ['loader', 'spinner', 'loading', 'progress']
  },

  // Tokens - Color
  {
    id: 'token-color',
    type: 'token',
    title: 'Color',
    description: 'Color palette and semantic color tokens',
    path: '/tokens/color',
    category: 'Tokens',
    keywords: ['color', 'palette', 'theme', 'brand', 'semantic']
  },
  {
    id: 'token-typography',
    type: 'token',
    title: 'Typography',
    description: 'Type scale, fonts, and text styles',
    path: '/tokens/typography',
    category: 'Tokens',
    keywords: ['typography', 'font', 'text', 'heading', 'scale']
  },
  {
    id: 'token-spacing',
    type: 'token',
    title: 'Spacing',
    description: 'Spacing scale for margin and padding',
    path: '/tokens/spacing',
    category: 'Tokens',
    keywords: ['spacing', 'margin', 'padding', 'gap', 'scale']
  },
  {
    id: 'token-shadows',
    type: 'token',
    title: 'Shadows',
    description: 'Box shadow elevation tokens',
    path: '/tokens/shadows',
    category: 'Tokens',
    keywords: ['shadow', 'elevation', 'depth', 'layer']
  },
  {
    id: 'token-radius',
    type: 'token',
    title: 'Border Radius',
    description: 'Border radius values for rounded corners',
    path: '/tokens/radius',
    category: 'Tokens',
    keywords: ['radius', 'border', 'corner', 'rounded']
  },

  // Iconography
  {
    id: 'iconography-overview',
    type: 'iconography',
    title: 'Icons overview',
    description: 'Complete library of system icons',
    path: '/icons',
    category: 'Iconography',
    keywords: ['icon', 'icons', 'library', 'svg', 'iconography']
  },
  {
    id: 'iconography-guidelines',
    type: 'iconography',
    title: 'Usage guidelines',
    description: 'Best practices for using icons',
    path: '/icons/guidelines',
    category: 'Iconography',
    keywords: ['icon', 'guidelines', 'usage', 'best practices']
  },

  // Origin 101
  {
    id: 'origin-101-introduction',
    type: 'origin-101',
    title: 'Introduction',
    description: 'Get started with the Origin design system',
    path: '/origin-101',
    category: 'Origin 101',
    keywords: ['introduction', 'getting started', 'principles', 'foundations', 'origin 101']
  },
  {
    id: 'origin-101-installing',
    type: 'origin-101',
    title: 'Installing Origin',
    description: 'React components and JavaScript integration',
    path: '/origin-101/installing',
    category: 'Origin 101',
    keywords: ['installing', 'install', 'javascript', 'react', 'setup', 'npm']
  },

  // Content
  {
    id: 'content-overview',
    type: 'content',
    title: 'Content overview',
    description: 'Content guidelines and writing standards',
    path: '/content',
    category: 'Content',
    keywords: ['content', 'writing', 'guidelines', 'standards', 'copy']
  },
  {
    id: 'content-accessibility',
    type: 'content',
    title: 'Accessibility in content design',
    description: 'Creating accessible content for all users',
    path: '/content/accessibility',
    category: 'Content',
    keywords: ['accessibility', 'a11y', 'content', 'inclusive', 'design']
  },
  {
    id: 'content-best-practices',
    type: 'content',
    title: 'Best practices',
    description: 'Content writing best practices and standards',
    path: '/content/best-practices',
    category: 'Content',
    keywords: ['best practices', 'writing', 'guidelines', 'standards']
  },
  {
    id: 'content-generative-ai',
    type: 'content',
    title: 'Generative AI in product content',
    description: 'Guidelines for using AI in product content',
    path: '/content/generative-ai',
    category: 'Content',
    keywords: ['generative', 'ai', 'artificial intelligence', 'content', 'guidelines']
  },
  {
    id: 'content-voice-tone',
    type: 'content',
    title: 'Voice and tone',
    description: 'Voice and tone guidelines for Origin',
    path: '/content/voice-tone',
    category: 'Content',
    keywords: ['voice', 'tone', 'writing', 'style']
  },

  // Accessibility
  {
    id: 'accessibility-overview',
    type: 'accessibility',
    title: 'Accessibility',
    description: 'Accessibility guidelines and standards',
    path: '/accessibility',
    category: 'Accessibility',
    keywords: ['accessibility', 'a11y', 'wcag', 'aria', 'screen reader']
  },

  // Design
  {
    id: 'design-overview',
    type: 'design',
    title: 'Design overview',
    description: 'Brand guidelines and visual design language',
    path: '/brand',
    category: 'Design',
    keywords: ['brand', 'design', 'visual', 'guidelines', 'logo', 'illustrations']
  },

  // Patterns
  {
    id: 'patterns-overview',
    type: 'pattern',
    title: 'Pattern overview',
    description: 'Common UI patterns and solutions',
    path: '/patterns',
    category: 'Patterns',
    keywords: ['patterns', 'forms', 'empty states', 'disabled states']
  },
  {
    id: 'patterns-pro-plan',
    type: 'pattern',
    title: 'Pro plan branding',
    description: 'Pro plan branding patterns and guidelines',
    path: '/patterns/pro-plan',
    category: 'Patterns',
    keywords: ['pro', 'plan', 'branding', 'premium']
  },
  {
    id: 'patterns-disabled-states',
    type: 'pattern',
    title: 'Disabled, hidden, and read-only states',
    description: 'Patterns for disabled, hidden, and read-only UI states',
    path: '/patterns/disabled-states',
    category: 'Patterns',
    keywords: ['disabled', 'hidden', 'read-only', 'states']
  },
  {
    id: 'patterns-empty-states',
    type: 'pattern',
    title: 'Empty states',
    description: 'Empty state patterns and guidelines',
    path: '/patterns/empty-states',
    category: 'Patterns',
    keywords: ['empty', 'states', 'no data', 'blank']
  },
  {
    id: 'patterns-feedback-survey',
    type: 'pattern',
    title: 'Feedback survey',
    description: 'Feedback survey patterns and best practices',
    path: '/patterns/feedback-survey',
    category: 'Patterns',
    keywords: ['feedback', 'survey', 'user input']
  },
  {
    id: 'patterns-forms',
    type: 'pattern',
    title: 'Forms',
    description: 'Form patterns and layout guidelines',
    path: '/patterns/forms',
    category: 'Patterns',
    keywords: ['forms', 'input', 'validation', 'layout']
  },
  {
    id: 'patterns-grammarly-widget',
    type: 'pattern',
    title: 'Grammarly Widget',
    description: 'Grammarly Widget integration patterns',
    path: '/patterns/grammarly-widget',
    category: 'Patterns',
    keywords: ['grammarly', 'widget', 'extension', 'integration']
  },
  {
    id: 'patterns-text-transforms',
    type: 'pattern',
    title: 'Text transforms',
    description: 'Text transformation patterns and guidelines',
    path: '/patterns/text-transforms',
    category: 'Patterns',
    keywords: ['text', 'transforms', 'formatting', 'typography']
  },
  {
    id: 'patterns-underlines-highlights',
    type: 'pattern',
    title: 'Underlines and highlights',
    description: 'Underline and highlight patterns',
    path: '/patterns/underlines-highlights',
    category: 'Patterns',
    keywords: ['underlines', 'highlights', 'text', 'decoration']
  },

  // Support
  {
    id: 'support-overview',
    type: 'support',
    title: 'Support overview',
    description: 'Support and help resources',
    path: '/support',
    category: 'Support',
    keywords: ['support', 'help', 'faq', 'contact']
  },

  // What's New
  {
    id: 'whats-new-overview',
    type: 'whats-new',
    title: "What's new",
    description: 'Latest updates and changes',
    path: '/whats-new',
    category: "What's new",
    keywords: ['whats new', 'updates', 'changelog', 'new features']
  }
];

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  return searchIndex
    .map(item => {
      let score = 0;

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 100;
      }

      // Title starts with query
      if (item.title.toLowerCase().startsWith(normalizedQuery)) {
        score += 50;
      }

      // Title contains query
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 25;
      }

      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
