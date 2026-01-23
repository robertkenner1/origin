import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ComponentPreview } from '@/components/ComponentPreview';
import { ComponentTile } from '@/components/ComponentTile';
import { OverviewHeader } from '@/components/OverviewHeader';
import type { ComponentControls } from '@/components/ComponentPreview';

// Prop carousel row with wheel-like slide animation
function PropCarouselRow({
  propName,
  options,
  currentIndex,
  currentValue,
  onChange,
}: {
  propName: string;
  options: string[];
  currentIndex: number;
  currentValue: string;
  onChange: (value: string) => void;
}) {
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);
  const [prevValue, setPrevValue] = useState(currentValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrev = () => {
    if (options.length === 0) return;
    setPrevValue(currentValue);
    setAnimDirection('left'); // Click left = wheel rotates left = new enters from left
    setIsAnimating(true);
    const newIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    onChange(options[newIndex]);
  };

  const goToNext = () => {
    if (options.length === 0) return;
    setPrevValue(currentValue);
    setAnimDirection('right'); // Click right = wheel rotates right = new enters from right
    setIsAnimating(true);
    const newIndex = currentIndex >= options.length - 1 ? 0 : currentIndex + 1;
    onChange(options[newIndex]);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="group flex items-center gap-1 py-1.5">
      <span className="font-medium text-xs text-muted-foreground w-14 shrink-0">{propName}</span>
      <div className="ml-auto flex items-center gap-0.5">
        <button
          onClick={goToPrev}
          className="p-1 rounded text-muted-foreground/50 group-hover:text-foreground hover:bg-border/50 transition-colors"
          aria-label={`Previous ${propName}`}
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-16 text-center overflow-hidden relative h-4">
          {/* Exiting value */}
          <span 
            className={cn(
              "absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground transition-all duration-200 ease-out",
              // When clicking right: old exits to LEFT
              isAnimating && animDirection === 'right' && "-translate-x-full opacity-0",
              // When clicking left: old exits to RIGHT
              isAnimating && animDirection === 'left' && "translate-x-full opacity-0",
              !isAnimating && "translate-x-0 opacity-0"
            )}
          >
            {prevValue}
          </span>
          {/* Entering value */}
          <span 
            className={cn(
              "absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground transition-all duration-200 ease-out",
              // When clicking right: new enters from RIGHT (starts at right, animates to center)
              isAnimating && animDirection === 'right' && "animate-slide-in-right",
              // When clicking left: new enters from LEFT (starts at left, animates to center)
              isAnimating && animDirection === 'left' && "animate-slide-in-left",
              !isAnimating && "translate-x-0 opacity-100"
            )}
            style={isAnimating ? {
              animation: animDirection === 'right' 
                ? 'slideInFromRight 200ms ease-out forwards'
                : 'slideInFromLeft 200ms ease-out forwards'
            } : undefined}
          >
            {currentValue}
          </span>
        </div>
        <button
          onClick={goToNext}
          className="p-1 rounded text-muted-foreground/50 group-hover:text-foreground hover:bg-border/50 transition-colors"
          aria-label={`Next ${propName}`}
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Related component mappings - components that are similar or often used together
const relatedComponentsMap: Record<string, string[]> = {
  'accordion': ['tabs', 'modal', 'popover', 'menu'],
  'badge': ['tag', 'sticker', 'plan-tag', 'tooltip'],
  'branded-loader': ['circular-loader', 'skeleton-loader', 'button', 'modal'],
  'button': ['icon-button', 'button-as-link', 'link', 'menu'],
  'button-as-link': ['button', 'link', 'icon-button', 'menu'],
  'checkbox': ['checkbox-group', 'radio-group', 'switch', 'form'],
  'checkbox-group': ['checkbox', 'radio-group', 'form', 'switch'],
  'circular-loader': ['branded-loader', 'skeleton-loader', 'button', 'modal'],
  'combobox': ['select', 'search-field', 'text-field', 'menu'],
  'form': ['text-field', 'textarea', 'checkbox', 'select'],
  'icon': ['icon-button', 'button', 'badge', 'tooltip'],
  'icon-button': ['button', 'icon', 'tooltip', 'menu'],
  'illustration': ['icon', 'logo', 'badge', 'modal'],
  'link': ['button', 'button-as-link', 'menu', 'tabs'],
  'logo': ['icon', 'illustration', 'button', 'link'],
  'menu': ['popover', 'button', 'icon-button', 'select'],
  'modal': ['popover', 'toast', 'button', 'form'],
  'plan-tag': ['badge', 'tag', 'sticker', 'tooltip'],
  'popover': ['modal', 'tooltip', 'menu', 'button'],
  'radio-group': ['checkbox-group', 'checkbox', 'switch', 'form'],
  'rating': ['icon', 'form', 'badge', 'tooltip'],
  'search-field': ['text-field', 'combobox', 'select', 'form'],
  'select': ['combobox', 'menu', 'radio-group', 'form'],
  'skeleton-loader': ['branded-loader', 'circular-loader', 'text-field', 'badge'],
  'sticker': ['badge', 'tag', 'plan-tag', 'tooltip'],
  'switch': ['checkbox', 'radio-group', 'form', 'toggle'],
  'tabs': ['accordion', 'menu', 'link', 'button'],
  'tag': ['badge', 'sticker', 'plan-tag', 'button'],
  'text-field': ['textarea', 'search-field', 'combobox', 'form'],
  'textarea': ['text-field', 'form', 'modal', 'button'],
  'toast': ['modal', 'popover', 'badge', 'button'],
  'tooltip': ['popover', 'badge', 'icon-button', 'link'],
  'verification-code': ['text-field', 'form', 'button', 'modal'],
  // Utilities
  'box': ['flex', 'text', 'heading', 'theme-provider'],
  'flex': ['box', 'text', 'heading', 'theme-provider'],
  'text': ['heading', 'box', 'flex', 'link'],
  'heading': ['text', 'box', 'flex', 'link'],
  'theme-provider': ['portal-provider', 'box', 'flex', 'text'],
  'portal-provider': ['theme-provider', 'modal', 'popover', 'tooltip'],
  'screen-reader-only': ['live-announcer', 'button', 'link', 'text'],
  'live-announcer': ['screen-reader-only', 'toast', 'modal', 'button'],
};

// Define available controls per component type - Based on Origin Design System
const componentControlsConfig: Record<string, {
  variant?: string[];
  size?: string[];
  state?: string[];
  defaultLabel?: string;
  width?: string[];
  layout?: string[];
}> = {
  'accordion': { 
    size: ['small', 'medium', 'large'],
    state: ['rest', 'disabled'],
  },
  'badge': { 
    variant: ['neutral', 'brand', 'addition', 'critical', 'success', 'premium', 'pro', 'warning'],
    defaultLabel: '5' 
  },
  'branded-loader': { 
    size: ['small', 'medium', 'large'],
  },
  'button': { 
    variant: ['primary', 'secondary', 'tertiary', 'ghost', 'premium', 'critical', 'pro', 'enterprise'], 
    size: ['small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge', '4xlarge'], 
    state: ['rest', 'focus', 'disabled', 'loading'], 
    width: ['fixed', 'full'],
    defaultLabel: 'Button' 
  },
  'button-as-link': { 
    variant: ['primary', 'secondary', 'tertiary', 'ghost', 'premium', 'critical', 'pro', 'enterprise'], 
    size: ['small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge', '4xlarge'], 
    state: ['rest', 'focus', 'disabled'], 
    defaultLabel: 'Link' 
  },
  'checkbox': { 
    size: ['medium', 'large', 'xlarge'],
    state: ['rest', 'focus', 'disabled'], 
    defaultLabel: 'Accept terms and conditions' 
  },
  'checkbox-group': { 
    layout: ['column', 'row'], 
    state: ['rest', 'disabled'] 
  },
  'circular-loader': { 
    size: ['small', 'medium', 'large'],
    variant: ['default', 'inverse'],
  },
  'combobox': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  'form': {},
  'icon': { 
    size: ['small', 'medium', 'large'],
    variant: ['default', 'inverse', 'brand', 'business', 'addition', 'critical', 'deletion', 'success', 'premium', 'pro', 'warning', 'inherit'],
  },
  'icon-button': { 
    variant: ['primary', 'secondary', 'tertiary', 'ghost', 'premium'], 
    size: ['small', 'medium', 'large', 'xlarge'], 
    state: ['rest', 'focus', 'disabled', 'loading'] 
  },
  'illustration': {},
  'link': { 
    variant: ['primary', 'secondary'],
    state: ['rest', 'focus', 'disabled'], 
    defaultLabel: 'Learn more' 
  },
  'logo': {},
  'menu': { 
    state: ['rest', 'disabled'] 
  },
  'modal': { 
    width: ['small', 'medium'],
  },
  'plan-tag': { 
    variant: ['free', 'pro', 'enterprise', 'edu', 'business', 'premium'],
  },
  'popover': {},
  'radio-group': { 
    layout: ['column', 'row'], 
    size: ['medium', 'large', 'xlarge'],
    state: ['rest', 'focus', 'disabled'] 
  },
  'rating': {},
  'search-field': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  'select': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  'skeleton-loader': {},
  'sticker': { 
    variant: ['default', 'inverse'],
  },
  'switch': { 
    state: ['rest', 'focus', 'disabled'], 
    defaultLabel: 'Enable notifications' 
  },
  'tabs': { 
    size: ['small', 'medium', 'large', 'xlarge', 'auto'],
  },
  'tag': { 
    variant: ['neutral', 'premium', 'pro', 'tip', 'addition', 'warning', 'deletion'],
    defaultLabel: 'Label' 
  },
  'text-field': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  'textarea': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  'toast': { 
    variant: ['default', 'critical', 'loading', 'success', 'warning'], 
    defaultLabel: 'Changes saved' 
  },
  'tooltip': {},
  'verification-code': { 
    state: ['rest', 'focus', 'disabled', 'error'],
  },
  // Utilities - no visual controls, code-only
  'box': {},
  'flex': {},
  'text': {},
  'heading': {},
  'theme-provider': {},
  'portal-provider': {},
  'screen-reader-only': {},
  'live-announcer': {},
};

// Component metadata - Based on Origin Design System
const componentData: Record<string, {
  name: string;
  description: string;
  preview: string;
  installation: string;
  usage: string;
  props: Array<{ name: string; type: string; default: string; description: string }>;
  examples: Array<{ prop: string; variants: Array<{ label: string; value: string }> }>;
}> = {
  'accordion': {
    name: 'Accordion',
    description: 'Accordions organize related information and controls into collapsible sections, helping users focus on relevant content.',
    preview: 'accordion',
    installation: 'npm install @superhuman/origin',
    usage: `import { Accordion } from '@superhuman/origin';

function App() {
  return (
    <Accordion>
      <Accordion.Item title="Getting started">
        Learn the basics of using this component.
      </Accordion.Item>
      <Accordion.Item title="Configuration">
        Customize behavior and appearance.
      </Accordion.Item>
    </Accordion>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Used for the contents of the Accordion' },
      { name: 'bgColor', type: '"base-default" | "base-subdued"', default: '"base-default"', description: 'Defines the background color of the container' },
      { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Controls the size of the Accordion content' },
      { name: 'hasSeparators', type: 'boolean', default: 'true', description: 'Whether a border appears between Accordion Items' },
      { name: 'onExpandedChange', type: '(indices: number[]) => void', default: '—', description: 'Callback when expanded state changes' },
    ],
    examples: [],
  },
  'badge': {
    name: 'Badge',
    description: 'Badges display a count or status indicator, typically overlaid on another element like an icon or avatar.',
    preview: 'badge',
    installation: 'npm install @superhuman/origin',
    usage: `import { Badge } from '@superhuman/origin';

function App() {
  return (
    <Badge 
      count={5} 
      variant="brand"
      getAriaLabelText={(count) => \`\${count} new notifications\`} 
    />
  );
}`,
    props: [
      { name: 'count', type: 'number', default: '—', description: 'Defines the count to display with formatting rules (101 → 99+, 1050 → 1K)' },
      { name: 'variant', type: '"neutral" | "brand" | "addition" | "critical" | "success" | "premium" | "pro" | "warning"', default: '"neutral"', description: 'Variant color of the badge' },
      { name: 'specialCharBefore', type: '"+" | "-"', default: '—', description: 'Special character to display before the count' },
      { name: 'specialCharAfter', type: '"%"', default: '—', description: 'Special character to display after the count' },
      { name: 'getAriaLabelText', type: '(count, before?, after?) => string', default: '—', description: 'Format aria label for screen readers' },
    ],
    examples: [],
  },
  'branded-loader': {
    name: 'Loader',
    description: 'Loaders indicate that content is being loaded or an action is being processed.',
    preview: 'loader',
    installation: 'npm install @superhuman/origin',
    usage: `import { Loader } from '@superhuman/origin';

function App() {
  return (
    <Loader accessibilityLabel="Loading content">
      <Loader.Circular size="medium" />
    </Loader>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'The content to render in the Loader' },
      { name: 'accessibilityLabel', type: 'string', default: '"Loading"', description: 'Sets aria-label to convey context' },
      { name: 'shouldFocus', type: 'boolean', default: 'false', description: 'When true, moves focus to loader when loading starts' },
      { name: 'onLoaded', type: '() => void', default: '—', description: 'Callback when Loader is unmounted' },
    ],
    examples: [],
  },
  'button': {
    name: 'Button',
    description: 'Buttons allow users to take actions and make choices with a single tap. They communicate what action will occur when pressed.',
    preview: 'button',
    installation: 'npm install @superhuman/origin',
    usage: `import { Button } from '@superhuman/origin';

function App() {
  return (
    <Button 
      variant="primary" 
      size="medium"
      onClick={() => console.log('Clicked!')}
    >
      Click me
    </Button>
  );
}`,
    props: [
      { name: 'variant', type: '"primary" | "secondary" | "tertiary" | "ghost" | "premium" | "critical" | "pro" | "enterprise"', default: '"primary"', description: 'Look and feel of the Button' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge" | "2xlarge" | "3xlarge" | "4xlarge"', default: '"medium"', description: 'Size (height) of the Button' },
      { name: 'text', type: 'string', default: '—', description: 'Text inside the Button' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content for inside the Button' },
      { name: 'iconStart', type: 'IconProps["icon"]', default: '—', description: 'Icon to display on the left of the Button' },
      { name: 'iconEnd', type: 'IconProps["icon"]', default: '—', description: 'Icon to display on the right of the Button' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether to show a circular loader' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Button is disabled' },
      { name: 'width', type: '"full" | "fixed"', default: '"fixed"', description: 'Width of the Button' },
      { name: 'shortcut', type: 'string', default: '—', description: 'Keyboard shortcut on the right of the Button' },
      { name: 'type', type: '"submit" | "button"', default: '"button"', description: 'If Button is used within a form, set to "submit"' },
      { name: 'onClick', type: '(e: PressEvent) => void | Promise', default: '—', description: 'Handler for the click event. Can be async.' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Describes the Button when more context is needed' },
      { name: 'form', type: 'string', default: '—', description: 'Link form submit button to a form outside the button' },
    ],
    examples: [],
  },
  'button-as-link': {
    name: 'ButtonAsLink',
    description: 'A button styled element that navigates like a link. Use when you need button styling but anchor semantics for navigation.',
    preview: 'button-link',
    installation: 'npm install @superhuman/origin',
    usage: `import { ButtonAsLink } from '@superhuman/origin';

function App() {
  return (
    <ButtonAsLink 
      href="/dashboard"
      variant="primary"
    >
      Go to Dashboard
    </ButtonAsLink>
  );
}`,
    props: [
      { name: 'href', type: 'string', default: '—', description: 'The URL to navigate to' },
      { name: 'variant', type: '"primary" | "secondary" | "tertiary" | "ghost" | "premium" | "critical" | "pro" | "enterprise"', default: '"primary"', description: 'Look and feel of the ButtonAsLink' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge" | "2xlarge" | "3xlarge" | "4xlarge"', default: '"medium"', description: 'Size (height) of the ButtonAsLink' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content for inside the ButtonAsLink' },
      { name: 'target', type: '"_blank" | "_self"', default: '"_self"', description: 'Where to open the linked document' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the ButtonAsLink is disabled' },
    ],
    examples: [],
  },
  'checkbox': {
    name: 'Checkbox',
    description: 'Checkboxes offer a range of selections — zero, one, and many. Use when users can select multiple options from a list.',
    preview: 'checkbox',
    installation: 'npm install @superhuman/origin',
    usage: `import { Checkbox } from '@superhuman/origin';

function App() {
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    <Checkbox 
      isSelected={isSelected}
      onChange={setIsSelected}
    >
      Accept terms and conditions
    </Checkbox>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Used to display the label of a Checkbox' },
      { name: 'isSelected', type: 'boolean', default: '—', description: 'Whether the element is selected (controlled)' },
      { name: 'defaultSelected', type: 'boolean', default: '—', description: 'Whether the element is selected (uncontrolled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the element is disabled' },
      { name: 'isIndeterminate', type: 'boolean', default: 'false', description: 'Indeterminate visual representation' },
      { name: 'isReadOnly', type: 'boolean', default: 'false', description: 'Whether input can be selected but not changed' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the Checkbox and label' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Used to describe why this Checkbox has an error' },
      { name: 'onChange', type: '(isSelected: boolean) => void', default: '—', description: 'Handler when selection state changes' },
      { name: 'value', type: 'string', default: '—', description: 'The value when submitting an HTML form' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
    ],
    examples: [],
  },
  'checkbox-group': {
    name: 'Checkbox Group',
    description: 'A group of checkboxes that allows users to select multiple options from a related set.',
    preview: 'checkbox-group',
    installation: 'npm install @superhuman/origin',
    usage: `import { CheckboxGroup, Checkbox } from '@superhuman/origin';

function App() {
  const [selected, setSelected] = useState(['email']);
  
  return (
    <CheckboxGroup 
      value={selected}
      onChange={setSelected}
    >
      <Checkbox value="email">Email notifications</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
      <Checkbox value="sms">SMS alerts</Checkbox>
    </CheckboxGroup>
  );
}`,
    props: [
      { name: 'value', type: 'string[]', default: '—', description: 'The current value (controlled)' },
      { name: 'defaultValue', type: 'string[]', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'layout', type: '"column" | "row"', default: '"column"', description: 'Layout of the checkboxes' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
      { name: 'onChange', type: '(value: string[]) => void', default: '—', description: 'Handler when value changes' },
    ],
    examples: [],
  },
  'circular-loader': {
    name: 'Circular Loader',
    description: 'A circular spinning indicator that shows content is loading or an action is processing.',
    preview: 'circular-loader',
    installation: 'npm install @superhuman/origin',
    usage: `import { Loader } from '@superhuman/origin';

function App() {
  return (
    <Loader.Circular 
      size="medium" 
      variant="default" 
    />
  );
}`,
    props: [
      { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Determines the size of the Circular Loader' },
      { name: 'variant', type: '"default" | "inverse"', default: '"default"', description: 'Determines the color of the Circular Loader' },
    ],
    examples: [],
  },
  'combobox': {
    name: 'Combobox',
    description: 'A searchable input that combines text entry with a dropdown list of options, allowing users to filter and select.',
    preview: 'combobox',
    installation: 'npm install @superhuman/origin',
    usage: `import { Combobox } from '@superhuman/origin';

function App() {
  return (
    <Combobox label="Select a fruit">
      <Combobox.Item value="apple">Apple</Combobox.Item>
      <Combobox.Item value="banana">Banana</Combobox.Item>
      <Combobox.Item value="cherry">Cherry</Combobox.Item>
    </Combobox>
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label displayed above the Combobox' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text when empty' },
      { name: 'value', type: 'string', default: '—', description: 'The selected value (controlled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Combobox is disabled' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the input' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when selection changes' },
    ],
    examples: [],
  },
  'form': {
    name: 'Form',
    description: 'A container that groups form controls together, handling layout, validation, and submission.',
    preview: 'form',
    installation: 'npm install @superhuman/origin',
    usage: `import { Form, TextField, Button } from '@superhuman/origin';

function App() {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Heading>Contact Us</Form.Heading>
      <Form.Row>
        <TextField label="Name" name="name" />
      </Form.Row>
      <Form.Row>
        <TextField label="Email" name="email" />
      </Form.Row>
      <Form.Footer>
        <Button type="submit">Submit</Button>
      </Form.Footer>
    </Form>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Form content including fields and buttons' },
      { name: 'onSubmit', type: '(e: FormEvent) => void', default: '—', description: 'Handler when form is submitted' },
    ],
    examples: [],
  },
  'icon': {
    name: 'Icon',
    description: 'Icons provide visual context and improve usability by representing actions, objects, or concepts in a compact form.',
    preview: 'icon',
    installation: 'npm install @superhuman/origin',
    usage: `import { Icon, InterfaceSearch } from '@superhuman/origin';

function App() {
  return (
    <Icon 
      icon={InterfaceSearch} 
      size="medium"
      variant="default"
      accessibilityLabel="Search"
    />
  );
}`,
    props: [
      { name: 'icon', type: 'GDSIcon', default: '—', description: 'The icon component to render' },
      { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'The size of the icon' },
      { name: 'variant', type: '"default" | "inverse" | "brand" | "success" | "critical" | "warning" | "premium" | "pro" | "inherit"', default: '"default"', description: 'The color variant' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Label for screen readers' },
    ],
    examples: [],
  },
  'icon-button': {
    name: 'Icon Button',
    description: 'A compact button that displays only an icon, with a required tooltip for accessibility.',
    preview: 'icon-button',
    installation: 'npm install @superhuman/origin',
    usage: `import { IconButton, InterfacePlus } from '@superhuman/origin';

function App() {
  return (
    <IconButton 
      icon={InterfacePlus}
      accessibilityLabel="Add new item"
      variant="primary"
      size="medium"
    />
  );
}`,
    props: [
      { name: 'icon', type: 'IconProps["icon"]', default: '—', description: 'Icon to display inside the IconButton' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Describes the Icon Button. Also populates the Tooltip.' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge"', default: '"medium"', description: 'Size (height and width) of the Icon Button' },
      { name: 'variant', type: '"primary" | "secondary" | "tertiary" | "ghost" | "premium"', default: '"primary"', description: 'Look and feel of the Icon Button' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Icon Button is disabled' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether to show a loading state' },
      { name: 'onClick', type: '(e: PressEvent) => void', default: '—', description: 'Handler for click events' },
    ],
    examples: [],
  },
  'illustration': {
    name: 'Illustration',
    description: 'Decorative illustrations that add personality to empty states, success messages, and other UI moments.',
    preview: 'illustration',
    installation: 'npm install @superhuman/origin',
    usage: `import { Illustration } from '@superhuman/origin';

function App() {
  return (
    <Illustration 
      name="empty-inbox" 
      accessibilityLabel="No messages"
    />
  );
}`,
    props: [
      { name: 'name', type: 'string', default: '—', description: 'The illustration identifier' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Label for screen readers' },
    ],
    examples: [],
  },
  'link': {
    name: 'Link',
    description: 'Links navigate users to another page or resource. They should be clearly distinguishable from surrounding text.',
    preview: 'link',
    installation: 'npm install @superhuman/origin',
    usage: `import { Link } from '@superhuman/origin';

function App() {
  return (
    <Link 
      href="/about"
      variant="primary"
    >
      Learn more about us
    </Link>
  );
}`,
    props: [
      { name: 'href', type: 'string', default: '—', description: 'Destination for the Link' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'The contents of the Link' },
      { name: 'variant', type: '"primary" | "secondary"', default: '"primary"', description: 'Sets the color of the Link text' },
      { name: 'underline', type: '"always" | "hover"', default: '"always"', description: 'Whether underline shows always or on hover' },
      { name: 'display', type: '"inline" | "block" | "inline-block"', default: '"inline"', description: 'How Link is positioned relative to elements' },
      { name: 'target', type: '"_blank" | "_self" | "_parent" | "_top"', default: '—', description: 'Where the Link will be opened' },
      { name: 'download', type: 'boolean | string', default: '—', description: 'Indicates a file will be downloaded' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Descriptive text for screen readers' },
    ],
    examples: [],
  },
  'logo': {
    name: 'Logo',
    description: 'A component that displays brand logos across products in a variety of formats and configurations.',
    preview: 'logo',
    installation: 'npm install @superhuman/origin',
    usage: `import { Logo } from '@superhuman/origin';

function App() {
  return (
    <Logo 
      brand="grammarly" 
      variant="full"
    />
  );
}`,
    props: [
      { name: 'brand', type: 'string', default: '—', description: 'The brand to display' },
      { name: 'variant', type: 'string', default: '—', description: 'The logo variant (full, symbol, wordmark)' },
    ],
    examples: [],
  },
  'menu': {
    name: 'Menu',
    description: 'A menu displays a list of actions or options that a user can choose from, triggered by a button or other element.',
    preview: 'menu',
    installation: 'npm install @superhuman/origin',
    usage: `import { Menu, Button } from '@superhuman/origin';

function App() {
  return (
    <Menu>
      <Menu.Trigger>
        <Button>Options</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
        <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Menu trigger and content' },
      { name: 'placement', type: 'Placement', default: '"bottom-start"', description: 'Where the menu appears relative to trigger' },
      { name: 'isOpen', type: 'boolean', default: '—', description: 'Whether the menu is open (controlled)' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', default: '—', description: 'Handler when open state changes' },
    ],
    examples: [],
  },
  'modal': {
    name: 'Modal',
    description: 'Modals interrupt the user flow to capture attention for important information or actions that require immediate response.',
    preview: 'modal',
    installation: 'npm install @superhuman/origin',
    usage: `import { Modal, Button } from '@superhuman/origin';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm action"
        description="This action cannot be undone."
      >
        <Modal.Body>
          Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="critical">Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}`,
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Whether the modal is currently visible' },
      { name: 'title', type: 'string', default: '—', description: 'The title of the modal, displayed in the header' },
      { name: 'description', type: 'string', default: '—', description: 'Description beneath the title' },
      { name: 'width', type: '"small" | "medium"', default: '"medium"', description: 'Small is 480px, Medium is 640px' },
      { name: 'hasCloseButton', type: 'boolean', default: 'true', description: 'Whether modal has a close button in the corner' },
      { name: 'dismissOnOutsideClick', type: 'boolean', default: 'true', description: 'Whether clicking outside closes the modal' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Handler when the Modal is about to close' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when the Modal has opened' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when the Modal has closed' },
      { name: 'role', type: '"dialog" | "alertdialog"', default: '"dialog"', description: 'Used to notify screen reader of modal type' },
    ],
    examples: [],
  },
  'plan-tag': {
    name: 'Plan Tag',
    description: 'Plan tags indicate which subscription tier or feature set a user has access to.',
    preview: 'plan-tag',
    installation: 'npm install @superhuman/origin',
    usage: `import { PlanTag } from '@superhuman/origin';

function App() {
  return <PlanTag variant="pro" />;
}`,
    props: [
      { name: 'variant', type: '"free" | "pro" | "enterprise" | "edu" | "business" | "premium"', default: '—', description: 'The plan type to display' },
    ],
    examples: [],
  },
  'popover': {
    name: 'Popover',
    description: 'Popovers display rich content in a non-modal dialog that appears relative to a trigger element.',
    preview: 'popover',
    installation: 'npm install @superhuman/origin',
    usage: `import { Popover, Button } from '@superhuman/origin';

function App() {
  return (
    <Popover>
      <Popover.Anchor>
        <Button>Show info</Button>
      </Popover.Anchor>
      <Popover.Content>
        <p>Additional information goes here.</p>
      </Popover.Content>
    </Popover>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'PopoverAnchor and PopoverContent' },
      { name: 'placement', type: 'Placement', default: '"bottom"', description: 'Where the popover appears' },
      { name: 'isOpen', type: 'boolean', default: '—', description: 'Whether the popover is open (controlled)' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', default: '—', description: 'Handler when open state changes' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when popover is displayed' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when popover is hidden' },
    ],
    examples: [],
  },
  'radio-group': {
    name: 'Radio Group',
    description: 'Radio groups allow users to select exactly one option from a set of mutually exclusive choices.',
    preview: 'radio-group',
    installation: 'npm install @superhuman/origin',
    usage: `import { RadioGroup, Radio } from '@superhuman/origin';

function App() {
  const [value, setValue] = useState('all');
  
  return (
    <RadioGroup 
      legend="Notifications"
      value={value}
      onChange={setValue}
    >
      <Radio value="all">All notifications</Radio>
      <Radio value="important">Important only</Radio>
      <Radio value="none">None</Radio>
    </RadioGroup>
  );
}`,
    props: [
      { name: 'legend', type: 'string', default: '—', description: 'Describes the purpose of the Radio Group' },
      { name: 'legendDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the legend' },
      { name: 'value', type: 'string', default: '—', description: 'The selected value (controlled)' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'layout', type: '"column" | "row"', default: '"column"', description: 'Specify column or row layout' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the Radio group' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether all RadioButtons are disabled' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the group' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when selection changes' },
    ],
    examples: [],
  },
  'rating': {
    name: 'Rating',
    description: 'Rating components allow users to provide feedback using a star-based scale.',
    preview: 'rating',
    installation: 'npm install @superhuman/origin',
    usage: `import { Rating } from '@superhuman/origin';

function App() {
  const [rating, setRating] = useState(0);
  
  return (
    <Rating 
      value={rating}
      onChange={setRating}
      accessibilityLabel="Rate your experience"
    />
  );
}`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'The current rating value (0-5)' },
      { name: 'onChange', type: '(value: number) => void', default: '—', description: 'Handler when rating changes' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Label for screen readers' },
    ],
    examples: [],
  },
  'search-field': {
    name: 'Search Field',
    description: 'Search fields allow users to search and filter content by entering text queries.',
    preview: 'search',
    installation: 'npm install @superhuman/origin',
    usage: `import { SearchField } from '@superhuman/origin';

function App() {
  const [query, setQuery] = useState('');
  
  return (
    <SearchField 
      label="Search"
      value={query}
      onChange={setQuery}
      onSubmit={handleSearch}
      placeholder="Search..."
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label for the search field' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the field' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'onSubmit', type: '(value: string) => void', default: '—', description: 'Handler when search is submitted' },
      { name: 'onClear', type: '() => void', default: '—', description: 'Handler when clear button is clicked' },
    ],
    examples: [],
  },
  'select': {
    name: 'Select',
    description: 'Select allows users to choose one option from a dropdown list of choices.',
    preview: 'select',
    installation: 'npm install @superhuman/origin',
    usage: `import { Select } from '@superhuman/origin';

function App() {
  return (
    <Select 
      label="Country"
      onChange={(value) => console.log(value)}
    >
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </Select>
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label displayed above the Select' },
      { name: 'value', type: 'string', default: '—', description: 'The selected value (controlled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Select is disabled' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Adds "(Optional)" to the label' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Adds "(Required)" to the label' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the select' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the label' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when selection changes' },
    ],
    examples: [],
  },
  'skeleton-loader': {
    name: 'Skeleton Loader',
    description: 'Skeleton loaders provide a visual placeholder while content is loading, indicating the layout and reducing perceived wait time.',
    preview: 'skeleton',
    installation: 'npm install @superhuman/origin',
    usage: `import { SkeletonLoader } from '@superhuman/origin';

function App() {
  return (
    <SkeletonLoader accessibilityLabel="Loading content">
      <SkeletonLoader.Text lines={3} />
      <SkeletonLoader.Rectangle width={200} height={100} />
      <SkeletonLoader.Circle size={48} />
    </SkeletonLoader>
  );
}`,
    props: [
      { name: 'accessibilityLabel', type: 'string', default: '"Loading"', description: 'Label for screen readers' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Skeleton content (Text, Rectangle, Circle, etc.)' },
    ],
    examples: [],
  },
  'sticker': {
    name: 'Sticker',
    description: 'Stickers are decorative labels that highlight features, promotions, or status with visual emphasis.',
    preview: 'sticker',
    installation: 'npm install @superhuman/origin',
    usage: `import { Sticker } from '@superhuman/origin';

function App() {
  return (
    <Sticker variant="default">
      50% OFF
    </Sticker>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content of the sticker' },
      { name: 'variant', type: '"default" | "inverse"', default: '"default"', description: 'The visual style' },
    ],
    examples: [],
  },
  'switch': {
    name: 'Switch',
    description: 'Switches toggle a single setting on or off. They provide immediate feedback and are ideal for binary choices.',
    preview: 'switch',
    installation: 'npm install @superhuman/origin',
    usage: `import { Switch } from '@superhuman/origin';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <Switch 
      label="Enable notifications"
      isSelected={isEnabled}
      onChange={setIsEnabled}
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label for the Switch' },
      { name: 'labelDisplay', type: '"left" | "right" | "top" | "hidden"', default: '"left"', description: 'Position of the label' },
      { name: 'isSelected', type: 'boolean', default: 'false', description: 'Whether the Switch is on (controlled)' },
      { name: 'defaultSelected', type: 'boolean', default: 'false', description: 'Whether Switch is on by default (uncontrolled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Switch is disabled' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Additional context displayed separately' },
      { name: 'onChange', type: '(isSelected: boolean) => void', default: '—', description: 'Handler when Switch is toggled' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
    ],
    examples: [],
  },
  'tabs': {
    name: 'Tabs',
    description: 'Tabs organize content into separate views where only one tab panel is visible at a time.',
    preview: 'tabs',
    installation: 'npm install @superhuman/origin',
    usage: `import { Tabs } from '@superhuman/origin';

function App() {
  return (
    <Tabs defaultSelectedTab="overview">
      <Tabs.List>
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="features">Features</Tabs.Tab>
        <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel tabId="overview">Overview content</Tabs.Panel>
      <Tabs.Panel tabId="features">Features content</Tabs.Panel>
      <Tabs.Panel tabId="pricing">Pricing content</Tabs.Panel>
    </Tabs>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Tab List and Tab Panels' },
      { name: 'defaultSelectedTab', type: 'string', default: '—', description: 'The first Tab activated by default unless overridden' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge" | "auto"', default: '"medium"', description: 'Determines the size of the Tabs' },
      { name: 'onChange', type: '(id: string) => void', default: '—', description: 'Handler when a Tab is selected' },
    ],
    examples: [],
  },
  'tag': {
    name: 'Tag',
    description: 'Tags label, classify, or draw attention to nearby elements. They communicate status, category, or other metadata.',
    preview: 'tag',
    installation: 'npm install @superhuman/origin',
    usage: `import { Tag } from '@superhuman/origin';

function App() {
  return (
    <Tag 
      label="New" 
      variant="addition"
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Used for the content of a Tag' },
      { name: 'variant', type: '"neutral" | "premium" | "pro" | "tip" | "addition" | "warning" | "deletion"', default: '"neutral"', description: 'Styles the Tag according to its semantic meaning' },
      { name: 'iconStart', type: 'IconProps["icon"]', default: '—', description: 'Icon to display on the left of the Tag' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Whether to show icon for Premium/Tip variants' },
      { name: 'inline', type: 'boolean', default: 'false', description: 'When true, Tag displays inline' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Extra context for screen readers' },
    ],
    examples: [],
  },
  'text-field': {
    name: 'Text Field',
    description: 'Text fields allow users to enter and edit single-line text. They support labels, placeholders, and validation states.',
    preview: 'text-field',
    installation: 'npm install @superhuman/origin',
    usage: `import { TextField } from '@superhuman/origin';

function App() {
  const [email, setEmail] = useState('');
  
  return (
    <TextField 
      label="Email"
      value={email}
      onChange={setEmail}
      placeholder="you@example.com"
      helperMessage="We'll never share your email."
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Displays the text label for the Text Field' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text when empty' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'isReadOnly', type: 'boolean', default: 'false', description: 'Whether the field is read-only' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Adds "(Optional)" to the label' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Adds "(Required)" to the label' },
      { name: 'type', type: 'string', default: '"text"', description: 'The input type (text, email, password, etc.)' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the field' },
      { name: 'iconStart', type: 'IconProps["icon"]', default: '—', description: 'Icon at the start of the input' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the label' },
      { name: 'autocomplete', type: 'string', default: '—', description: 'Tells browsers when to offer autocomplete' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
    ],
    examples: [],
  },
  'textarea': {
    name: 'Textarea',
    description: 'Textareas allow users to enter and edit multi-line text. They automatically resize or scroll to accommodate content.',
    preview: 'textarea',
    installation: 'npm install @superhuman/origin',
    usage: `import { Textarea } from '@superhuman/origin';

function App() {
  const [message, setMessage] = useState('');
  
  return (
    <Textarea 
      label="Message"
      value={message}
      onChange={setMessage}
      placeholder="Type your message..."
      helperMessage="Maximum 500 characters"
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Displays the text label for the Textarea' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text when empty' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'isReadOnly', type: 'boolean', default: 'false', description: 'Whether the field is read-only' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Adds "(Optional)" to the label' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Adds "(Required)" to the label' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the field' },
      { name: 'maxLength', type: 'number', default: '—', description: 'Maximum number of characters' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
    ],
    examples: [],
  },
  'toast': {
    name: 'Toast',
    description: 'Toasts provide brief, non-blocking feedback about an operation through a message that appears temporarily.',
    preview: 'toast',
    installation: 'npm install @superhuman/origin',
    usage: `import { Toast } from '@superhuman/origin';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <Toast 
      text="Changes saved successfully"
      variant="success"
      onClose={() => setIsVisible(false)}
    />
  );
}`,
    props: [
      { name: 'text', type: 'string', default: '—', description: 'The text shown in the Toast' },
      { name: 'variant', type: '"default" | "critical" | "loading" | "success" | "warning"', default: '"default"', description: 'Changes the icon to convey system status' },
      { name: 'primaryAction', type: 'ReactNode', default: '—', description: 'Primary action button (Ghost Button)' },
      { name: 'secondaryAction', type: 'ReactNode', default: '—', description: 'Secondary action button (Ghost Button)' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Handler when Close button is clicked' },
    ],
    examples: [],
  },
  'tooltip': {
    name: 'Tooltip',
    description: 'Tooltips display informative text when users hover over, focus on, or tap an element.',
    preview: 'tooltip',
    installation: 'npm install @superhuman/origin',
    usage: `import { Tooltip, IconButton, InterfaceHelp } from '@superhuman/origin';

function App() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <IconButton 
          icon={InterfaceHelp}
          accessibilityLabel="Help"
        />
      </Tooltip.Trigger>
      <Tooltip.Content>
        Click for more information
      </Tooltip.Content>
    </Tooltip>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Tooltip trigger and content' },
      { name: 'placement', type: 'Placement', default: '"top"', description: 'Where the tooltip appears' },
      { name: 'openDelay', type: 'number', default: '200', description: 'Delay before showing (ms)' },
      { name: 'annotation', type: 'string', default: '—', description: 'Additional annotation text' },
      { name: 'open', type: 'boolean', default: 'false', description: 'Whether tooltip is open (controlled)' },
      { name: 'toggleOnClick', type: 'boolean', default: 'true', description: 'Toggle on click in uncontrolled mode' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Handler when open state changes' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when Tooltip is shown' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when Tooltip is hidden' },
    ],
    examples: [],
  },
  'verification-code': {
    name: 'Verification Code',
    description: 'Verification code inputs allow users to enter multi-digit codes like OTPs, PINs, or verification codes.',
    preview: 'verification',
    installation: 'npm install @superhuman/origin',
    usage: `import { VerificationCode } from '@superhuman/origin';

function App() {
  return (
    <VerificationCode 
      length={6}
      onComplete={(code) => verifyCode(code)}
      accessibilityLabel="Enter verification code"
    />
  );
}`,
    props: [
      { name: 'length', type: 'number', default: '6', description: 'Number of input fields' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the inputs are disabled' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the inputs' },
      { name: 'onComplete', type: '(code: string) => void', default: '—', description: 'Handler when all digits are entered' },
      { name: 'onChange', type: '(code: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
    ],
    examples: [],
  },
  // Utility Components
  'box': {
    name: 'Box',
    description: 'A foundational layout primitive that provides spacing, sizing, and basic styling through props. Use Box to build consistent layouts without writing custom CSS.',
    preview: 'box',
    installation: 'npm install @superhuman/origin',
    usage: `import { Box } from '@superhuman/origin';

function App() {
  return (
    <Box 
      padding="16" 
      backgroundColor="surface"
      borderRadius="8"
    >
      <p>Content goes here</p>
    </Box>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content to render inside the Box' },
      { name: 'padding', type: 'SpacingToken', default: '—', description: 'Padding on all sides (4, 8, 12, 16, 20, 24, 32, 40, 48)' },
      { name: 'paddingX', type: 'SpacingToken', default: '—', description: 'Horizontal padding (left and right)' },
      { name: 'paddingY', type: 'SpacingToken', default: '—', description: 'Vertical padding (top and bottom)' },
      { name: 'margin', type: 'SpacingToken', default: '—', description: 'Margin on all sides' },
      { name: 'backgroundColor', type: 'ColorToken', default: '—', description: 'Background color from the design system' },
      { name: 'borderRadius', type: 'RadiusToken', default: '—', description: 'Border radius (4, 8, 12, 16, full)' },
      { name: 'as', type: 'ElementType', default: '"div"', description: 'HTML element to render' },
    ],
    examples: [],
  },
  'flex': {
    name: 'Flex',
    description: 'A layout component for creating flexible one-dimensional layouts. Flex is built on CSS Flexbox and provides a clean API for common flex patterns.',
    preview: 'flex',
    installation: 'npm install @superhuman/origin',
    usage: `import { Flex } from '@superhuman/origin';

function App() {
  return (
    <Flex 
      direction="row" 
      gap="8" 
      align="center"
      justify="space-between"
    >
      <Button>Cancel</Button>
      <Button variant="primary">Save</Button>
    </Flex>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content to render inside the Flex container' },
      { name: 'direction', type: '"row" | "column" | "row-reverse" | "column-reverse"', default: '"row"', description: 'Main axis direction' },
      { name: 'align', type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: 'Alignment along the cross axis' },
      { name: 'justify', type: '"start" | "center" | "end" | "space-between" | "space-around"', default: '"start"', description: 'Distribution along the main axis' },
      { name: 'gap', type: 'SpacingToken', default: '—', description: 'Gap between flex items' },
      { name: 'wrap', type: '"wrap" | "nowrap" | "wrap-reverse"', default: '"nowrap"', description: 'Whether items wrap to new lines' },
      { name: 'as', type: 'ElementType', default: '"div"', description: 'HTML element to render' },
    ],
    examples: [],
  },
  'text': {
    name: 'Text',
    description: 'A typography component for rendering body text with consistent styling. Use Text for paragraphs, labels, captions, and any non-heading text content.',
    preview: 'text',
    installation: 'npm install @superhuman/origin',
    usage: `import { Text } from '@superhuman/origin';

function App() {
  return (
    <>
      <Text size="large" weight="semibold">
        Important information
      </Text>
      <Text size="small" color="muted">
        Additional details here
      </Text>
    </>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Text content to render' },
      { name: 'size', type: '"xsmall" | "small" | "medium" | "large" | "xlarge"', default: '"medium"', description: 'Font size' },
      { name: 'weight', type: '"regular" | "medium" | "semibold" | "bold"', default: '"regular"', description: 'Font weight' },
      { name: 'color', type: 'ColorToken', default: '"foreground"', description: 'Text color from the design system' },
      { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Text alignment' },
      { name: 'truncate', type: 'boolean', default: 'false', description: 'Whether to truncate with ellipsis' },
      { name: 'as', type: 'ElementType', default: '"span"', description: 'HTML element to render' },
    ],
    examples: [],
  },
  'heading': {
    name: 'Heading',
    description: 'A typography component for section headings with semantic HTML levels. Heading ensures proper document structure while allowing visual styling to be independent of semantic level.',
    preview: 'heading',
    installation: 'npm install @superhuman/origin',
    usage: `import { Heading } from '@superhuman/origin';

function App() {
  return (
    <>
      <Heading level={1} size="2xlarge">
        Page Title
      </Heading>
      <Heading level={2} size="large">
        Section Header
      </Heading>
    </>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Heading text content' },
      { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Semantic heading level (h1-h6)' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge" | "2xlarge" | "3xlarge"', default: '—', description: 'Visual size (independent of level)' },
      { name: 'weight', type: '"medium" | "semibold" | "bold"', default: '"semibold"', description: 'Font weight' },
      { name: 'color', type: 'ColorToken', default: '"foreground"', description: 'Text color from the design system' },
      { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Text alignment' },
    ],
    examples: [],
  },
  'theme-provider': {
    name: 'ThemeProvider',
    description: 'Provides theme context to all Origin components. ThemeProvider should wrap your app at the root level to enable theming, dark mode, and design tokens.',
    preview: 'theme-provider',
    installation: 'npm install @superhuman/origin',
    usage: `import { ThemeProvider } from '@superhuman/origin';

function App() {
  return (
    <ThemeProvider theme="light">
      <YourApp />
    </ThemeProvider>
  );
}

// With dark mode support
function AppWithDarkMode() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => setTheme(
        theme === 'light' ? 'dark' : 'light'
      )}>
        Toggle Theme
      </Button>
    </ThemeProvider>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Your app content' },
      { name: 'theme', type: '"light" | "dark" | "system"', default: '"light"', description: 'The active theme' },
      { name: 'colorScheme', type: '"default" | "brand"', default: '"default"', description: 'Color scheme variant' },
    ],
    examples: [],
  },
  'portal-provider': {
    name: 'PortalContainerProvider',
    description: 'Provides a custom container for portal-based components like modals, tooltips, and popovers. Use when you need portals to render inside a specific container instead of document.body.',
    preview: 'portal-provider',
    installation: 'npm install @superhuman/origin',
    usage: `import { PortalContainerProvider } from '@superhuman/origin';
import { useRef } from 'react';

function App() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef}>
      <PortalContainerProvider container={containerRef}>
        <Modal isOpen={isOpen}>
          This modal renders inside the container
        </Modal>
      </PortalContainerProvider>
    </div>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content that can use the portal container' },
      { name: 'container', type: 'RefObject<HTMLElement>', default: '—', description: 'Ref to the container element for portals' },
    ],
    examples: [],
  },
  'screen-reader-only': {
    name: 'ScreenReaderOnly',
    description: 'Visually hides content while keeping it accessible to screen readers. Use for additional context that sighted users can infer from visual cues but screen reader users need explicitly stated.',
    preview: 'screen-reader-only',
    installation: 'npm install @superhuman/origin',
    usage: `import { ScreenReaderOnly } from '@superhuman/origin';

function App() {
  return (
    <button>
      <Icon name="close" />
      <ScreenReaderOnly>Close dialog</ScreenReaderOnly>
    </button>
  );
}

// For form labels
function SearchForm() {
  return (
    <form>
      <ScreenReaderOnly as="label" htmlFor="search">
        Search
      </ScreenReaderOnly>
      <SearchField id="search" placeholder="Search..." />
    </form>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Content visible only to screen readers' },
      { name: 'as', type: 'ElementType', default: '"span"', description: 'HTML element to render' },
    ],
    examples: [],
  },
  'live-announcer': {
    name: 'LiveAnnouncer',
    description: 'Announces dynamic content changes to screen readers using ARIA live regions. Use for status messages, loading states, and other updates that users need to know about.',
    preview: 'live-announcer',
    installation: 'npm install @superhuman/origin',
    usage: `import { LiveAnnouncer, useLiveAnnouncer } from '@superhuman/origin';

// Provider setup at app root
function App() {
  return (
    <LiveAnnouncer>
      <YourApp />
    </LiveAnnouncer>
  );
}

// Usage in components
function SaveButton() {
  const { announce } = useLiveAnnouncer();
  
  const handleSave = async () => {
    await saveData();
    announce('Changes saved successfully', 'polite');
  };
  
  return <Button onClick={handleSave}>Save</Button>;
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'App content that can use the announcer' },
      { name: 'politeness', type: '"polite" | "assertive"', default: '"polite"', description: 'Default politeness level for announcements' },
    ],
    examples: [],
  },
};

export function ComponentDetailPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const [activeTab, setActiveTab] = useState('Preview');
  const [codeCopied, setCodeCopied] = useState(false);
  const [previewBg, setPreviewBg] = useState<'white' | 'transparent'>('white');
  const component = componentId ? componentData[componentId] : null;
  const controlsConfig = componentId ? componentControlsConfig[componentId] : null;
  
  const defaultControls: ComponentControls = {
    variant: controlsConfig?.variant?.[0] || 'primary',
    size: controlsConfig?.size?.[0] || 'medium',
    state: 'rest',
    disabled: false,
    label: controlsConfig?.defaultLabel || 'Button',
    width: 'fixed',
  };
  
  const [controls, setControls] = useState<ComponentControls>(defaultControls);

  // Scroll to top when navigating to a component page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [componentId]);

  // Generate dynamic usage code based on selected controls
  const generateUsageCode = () => {
    if (!component || !controlsConfig) return component?.usage || '';
    
    const props: string[] = [];
    
    // Add variant if different from default
    if (controlsConfig.variant && controls.variant && controls.variant !== controlsConfig.variant[0]) {
      props.push(`variant="${controls.variant}"`);
    }
    
    // Add size if different from default
    if (controlsConfig.size && controls.size && controls.size !== controlsConfig.size[0]) {
      props.push(`size="${controls.size}"`);
    }
    
    // Add width if different from default (for Button)
    if (controlsConfig.width && controls.width && controls.width !== 'fixed') {
      props.push(`width="${controls.width}"`);
    }
    
    // Add disabled/loading state
    if (controls.state === 'disabled') {
      props.push('isDisabled');
    } else if (controls.state === 'loading') {
      props.push('isLoading');
    }
    
    const propsString = props.length > 0 ? '\n      ' + props.join('\n      ') : '';
    const label = controls.label || defaultControls.label;
    
    // Generate appropriate JSX based on component type
    switch (componentId) {
      case 'button':
        return `import { Button } from '@superhuman/origin';

<Button${propsString}${propsString ? '\n    ' : ''}>
  ${label}
</Button>`;
      
      case 'button-as-link':
        return `import { ButtonAsLink } from '@superhuman/origin';

<ButtonAsLink 
  href="/destination"${propsString}
>
  ${label}
</ButtonAsLink>`;
      
      case 'icon-button':
        return `import { IconButton, InterfacePlus } from '@superhuman/origin';

<IconButton 
  icon={InterfacePlus}
  accessibilityLabel="Add item"${propsString}
/>`;
      
      case 'checkbox':
        return `import { Checkbox } from '@superhuman/origin';

<Checkbox${propsString}${propsString ? '\n    ' : ''}>
  ${label}
</Checkbox>`;
      
      case 'switch':
        return `import { Switch } from '@superhuman/origin';

<Switch 
  label="${label}"${propsString}
  onChange={(isSelected) => console.log(isSelected)}
/>`;
      
      case 'badge':
        return `import { Badge } from '@superhuman/origin';

<Badge 
  count={5}${propsString}
  getAriaLabelText={(count) => \`\${count} notifications\`}
/>`;
      
      case 'tag':
        return `import { Tag } from '@superhuman/origin';

<Tag 
  label="${label}"${propsString}
/>`;
      
      case 'text-field':
        return `import { TextField } from '@superhuman/origin';

<TextField 
  label="Email"
  placeholder="you@example.com"${propsString}
  onChange={(value) => console.log(value)}
/>`;
      
      case 'textarea':
        return `import { Textarea } from '@superhuman/origin';

<Textarea 
  label="Message"
  placeholder="Type here..."${propsString}
  onChange={(value) => console.log(value)}
/>`;
      
      case 'select':
        return `import { Select } from '@superhuman/origin';

<Select 
  label="Country"${propsString}
  onChange={(value) => console.log(value)}
>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</Select>`;
      
      case 'toast':
        return `import { Toast } from '@superhuman/origin';

<Toast 
  text="${label}"${propsString}
  onClose={() => setIsVisible(false)}
/>`;
      
      case 'modal':
        return `import { Modal, Button } from '@superhuman/origin';

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm action"${propsString}
>
  <Modal.Body>Content here</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button>Confirm</Button>
  </Modal.Footer>
</Modal>`;
      
      case 'tabs':
        return `import { Tabs } from '@superhuman/origin';

<Tabs${propsString}${propsString ? '\n    ' : ''}>
  <Tabs.List>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
</Tabs>`;
      
      case 'accordion':
        return `import { Accordion } from '@superhuman/origin';

<Accordion${propsString}${propsString ? '\n    ' : ''}>
  <Accordion.Item title="Section 1">
    Content for section 1
  </Accordion.Item>
  <Accordion.Item title="Section 2">
    Content for section 2
  </Accordion.Item>
</Accordion>`;
      
      case 'radio-group':
        return `import { RadioGroup, Radio } from '@superhuman/origin';

<RadioGroup 
  legend="Options"${propsString}
  onChange={(value) => console.log(value)}
>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</RadioGroup>`;
      
      case 'checkbox-group':
        return `import { CheckboxGroup, Checkbox } from '@superhuman/origin';

<CheckboxGroup${propsString}${propsString ? '\n    ' : ''}>
  <Checkbox value="a">Option A</Checkbox>
  <Checkbox value="b">Option B</Checkbox>
</CheckboxGroup>`;
      
      case 'circular-loader':
        return `import { Loader } from '@superhuman/origin';

<Loader.Circular${propsString}${propsString ? '\n    ' : ''} />`;
      
      case 'tooltip':
        return `import { Tooltip, Button } from '@superhuman/origin';

<Tooltip>
  <Tooltip.Trigger>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Helpful information
  </Tooltip.Content>
</Tooltip>`;
      
      case 'popover':
        return `import { Popover, Button } from '@superhuman/origin';

<Popover>
  <Popover.Anchor>
    <Button>Open</Button>
  </Popover.Anchor>
  <Popover.Content>
    Popover content here
  </Popover.Content>
</Popover>`;
      
      case 'menu':
        return `import { Menu, Button } from '@superhuman/origin';

<Menu>
  <Menu.Trigger>
    <Button>Options</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
    <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
  </Menu.Content>
</Menu>`;
      
      default:
        return component.usage;
    }
  };

  if (!component) {
    return (
      <div className="w-full px-6 pt-3 pb-12">
        <h1 className="text-2xl font-bold">Component not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full px-6 pt-3 pb-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <OverviewHeader
          title={component.name}
          description={component.description || "Interactive component for building user interfaces."}
          backgroundColor="#E8E0FF"
        />

        {/* Tabs - Full Width Row */}
        <div className="mt-8 border-b border-border">
          <div className="flex gap-2">
            {[
              { name: 'Preview', icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )},
              { name: 'API', icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              )},
              { name: 'Design', icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              )},
              { name: 'Accessibility', icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )},
              { name: 'Content', icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )},
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-base font-medium transition-colors relative",
                  activeTab === tab.name
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.icon}
                {tab.name}
                {activeTab === tab.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'Preview' && (
            <div>
              {/* Full-width Preview with floating Props Panel */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="relative">
                  <div
                    className={cn(
                      "flex min-h-[400px] items-center justify-center p-8 transition-all duration-150",
                      previewBg === 'white' && "bg-white"
                    )}
                    style={previewBg === 'transparent' ? {
                      // Checkerboard pattern
                      backgroundImage: `linear-gradient(45deg, #f7f7f7 25%, transparent 25%),
                                        linear-gradient(-45deg, #f7f7f7 25%, transparent 25%),
                                        linear-gradient(45deg, transparent 75%, #f7f7f7 75%),
                                        linear-gradient(-45deg, transparent 75%, #f7f7f7 75%)`,
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                      backgroundColor: '#ffffff',
                      // Dots pattern (alternative):
                      // backgroundImage: `radial-gradient(#d5d5d5 1px, transparent 1px)`,
                      // backgroundSize: '24px 24px',
                      // backgroundPosition: '0 0',
                    } : undefined}
                  >
                    <ComponentPreview type={component.preview} controls={controls} />
                  </div>

                  {/* Background toggle */}
                  <div className="absolute left-6 top-6 flex items-center gap-0.5 rounded-lg bg-white border border-border/50 px-2 py-1.5">
                    <button
                      onClick={() => setPreviewBg(previewBg === 'white' ? 'transparent' : 'white')}
                      className="p-1 rounded text-muted-foreground/50 hover:text-foreground hover:bg-border/50 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="w-20 text-center text-xs font-medium text-foreground">
                      {previewBg}
                    </span>
                    <button
                      onClick={() => setPreviewBg(previewBg === 'white' ? 'transparent' : 'white')}
                      className="p-1 rounded text-muted-foreground/50 hover:text-foreground hover:bg-border/50 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Floating Props Panel */}
                  {component.props.length > 0 && (() => {
                    // Only show controllable/visual props
                    const controllableProps = ['variant', 'size', 'text', 'isDisabled', 'disabled', 'isLoading', 'width'];
                    const excludedProps = ['type', 'onClick', 'onChange', 'onSubmit', 'accessibilityLabel', 'children', 'iconStart', 'iconEnd', 'shortcut'];
                    const visualProps = component.props.filter(p =>
                      !excludedProps.includes(p.name) && (
                        controllableProps.includes(p.name) ||
                        (p.type.includes('|') && !p.type.includes('=>') && p.type.split('|').length <= 10)
                      )
                    );

                    if (visualProps.length === 0) return null;

                    return (
                      <div className="absolute right-6 top-6 w-56 rounded-lg bg-white border border-border/50 max-h-[360px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border px-4 py-2.5">
                        <div>
                          {visualProps.map((prop) => {
                    const isUnionType = prop.type.includes('|') && !prop.type.includes('=>');
                    const isBoolean = prop.type === 'boolean';
                    
                    // Build options array for cycling
                    let options: string[] = [];
                    if (isBoolean) {
                      options = ['off', 'on'];
                    } else if (isUnionType) {
                      options = prop.type.split('|').map(o => o.trim().replace(/"/g, ''));
                    }
                    
                    const getCurrentValue = (): string => {
                      if (prop.name === 'variant') return controls.variant || options[0] || '';
                      if (prop.name === 'size') return controls.size || options[0] || '';
                      if (prop.name === 'width') return controls.width || options[0] || '';
                      if (prop.name === 'isDisabled' || prop.name === 'disabled') return controls.state === 'disabled' ? 'on' : 'off';
                      if (prop.name === 'isLoading') return controls.state === 'loading' ? 'on' : 'off';
                      if (prop.name === 'text' || prop.name === 'children') return controls.label || '';
                      return prop.default?.replace(/"/g, '') || options[0] || '';
                    };
                    
                    const handleChange = (value: string) => {
                      if (prop.name === 'variant') {
                        setControls({ ...controls, variant: value });
                      } else if (prop.name === 'size') {
                        setControls({ ...controls, size: value });
                      } else if (prop.name === 'width') {
                        setControls({ ...controls, width: value });
                      } else if (prop.name === 'isDisabled' || prop.name === 'disabled') {
                        const isOn = value === 'on';
                        setControls({ ...controls, state: isOn ? 'disabled' : 'rest', disabled: isOn });
                      } else if (prop.name === 'isLoading') {
                        const isOn = value === 'on';
                        setControls({ ...controls, state: isOn ? 'loading' : 'rest' });
                      } else if (prop.name === 'text' || prop.name === 'children') {
                        setControls({ ...controls, label: value });
                      }
                    };
                    
                    const currentValue = getCurrentValue();
                    
                    // Skip non-cyclable props (like free-form text)
                    if (options.length === 0) return null;
                    
                    const currentIndex = options.indexOf(currentValue);
                    
                            return (
                              <PropCarouselRow
                                key={prop.name}
                                propName={prop.name}
                                options={options}
                                currentIndex={currentIndex}
                                currentValue={currentValue}
                                onChange={handleChange}
                              />
                            );
                          })}
                        </div>

                        {/* Copy code button */}
                        <button
                          onClick={async () => {
                            if (codeCopied) return;
                            try {
                              await navigator.clipboard.writeText(generateUsageCode());
                              setCodeCopied(true);
                              setTimeout(() => setCodeCopied(false), 1200);
                            } catch (err) {
                              console.error('Failed to copy:', err);
                            }
                          }}
                          className={cn(
                            "w-full mt-3 flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200",
                            codeCopied
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          {codeCopied ? 'Copied!' : 'Copy code'}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'API' && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">API Reference</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Component props and their usage.
              </p>

              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Prop</th>
                      <th className="text-left font-semibold text-foreground px-4 py-3 w-48">Type</th>
                      <th className="text-left font-semibold text-foreground px-4 py-3">Description</th>
                      <th className="text-left font-semibold text-foreground px-4 py-3 w-32">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.props.map((prop, index) => (
                      <tr key={prop.name} className={cn(
                        "border-b border-border",
                        index % 2 === 1 && "bg-muted/10"
                      )}>
                        <td className="px-4 py-3 font-mono text-xs text-foreground font-medium">{prop.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.description || '—'}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Design' && (
                <div className="space-y-10">
                  {/* Variants */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Variants</h3>
                    <p className="text-sm text-muted-foreground mb-6">Each variant serves a specific purpose in the visual hierarchy.</p>
                    <div className="rounded-xl border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border">
                            <th className="text-left font-semibold text-foreground px-4 py-3 w-32">Variant</th>
                            <th className="text-left font-semibold text-foreground px-4 py-3">When to use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Primary</td>
                            <td className="px-4 py-3 text-muted-foreground">Main call-to-action. Use once per section for the most important action.</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">Secondary</td>
                            <td className="px-4 py-3 text-muted-foreground">Supporting actions that complement the primary action.</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Outline</td>
                            <td className="px-4 py-3 text-muted-foreground">Lower emphasis actions. Good for cancel or dismiss actions.</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">Ghost</td>
                            <td className="px-4 py-3 text-muted-foreground">Minimal visual weight. Use in toolbars or dense UI areas.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-foreground">Destructive</td>
                            <td className="px-4 py-3 text-muted-foreground">Dangerous or irreversible actions like delete or remove.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
                    <p className="text-sm text-muted-foreground mb-6">Choose the appropriate size based on context and available space.</p>
                    <div className="rounded-xl border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border">
                            <th className="text-left font-semibold text-foreground px-4 py-3 w-32">Size</th>
                            <th className="text-left font-semibold text-foreground px-4 py-3">When to use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Small</td>
                            <td className="px-4 py-3 text-muted-foreground">Compact spaces, inline actions, data tables, toolbars.</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">Medium</td>
                            <td className="px-4 py-3 text-muted-foreground">Default size. Use for most standard interface actions.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-foreground">Large</td>
                            <td className="px-4 py-3 text-muted-foreground">Hero sections, landing pages, prominent CTAs.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* States */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Interactive states</h3>
                    <p className="text-sm text-muted-foreground mb-6">Visual feedback for user interactions.</p>
                    <div className="rounded-xl border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border">
                            <th className="text-left font-semibold text-foreground px-4 py-3 w-32">State</th>
                            <th className="text-left font-semibold text-foreground px-4 py-3">Behavior</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Rest</td>
                            <td className="px-4 py-3 text-muted-foreground">Default appearance when not interacted with.</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">Hover</td>
                            <td className="px-4 py-3 text-muted-foreground">Cursor over the element. Slight background change.</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Active</td>
                            <td className="px-4 py-3 text-muted-foreground">Being clicked or tapped. Pressed appearance.</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">Focus</td>
                            <td className="px-4 py-3 text-muted-foreground">Keyboard focus. Shows focus ring for accessibility.</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="px-4 py-3 font-medium text-foreground">Disabled</td>
                            <td className="px-4 py-3 text-muted-foreground">Cannot be interacted with. Reduced opacity.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-foreground">Loading</td>
                            <td className="px-4 py-3 text-muted-foreground">Action in progress. Shows spinner, disables interaction.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Accessibility' && (
                <div className="space-y-8">
                  {/* Keyboard Navigation */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Keyboard navigation</h3>
                    <div className="rounded-xl border border-border overflow-hidden text-sm">
                      <div className="flex border-b border-border bg-muted/30">
                        <div className="w-24 px-4 py-3 font-semibold text-foreground">Key</div>
                        <div className="flex-1 px-4 py-3 font-semibold text-foreground">Action</div>
                      </div>
                      <div className="flex border-b border-border">
                        <div className="w-24 px-4 py-3 font-mono text-foreground">Tab</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Moves focus to the component</div>
                      </div>
                      <div className="flex border-b border-border bg-muted/10">
                        <div className="w-24 px-4 py-3 font-mono text-foreground">Enter</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Activates the component</div>
                      </div>
                      <div className="flex">
                        <div className="w-24 px-4 py-3 font-mono text-foreground">Space</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Activates the component</div>
                      </div>
                    </div>
                  </div>

                  {/* Screen Reader */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Screen reader</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">Role:</span> Uses native <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">button</code> element.</p>
                      <p><span className="font-medium text-foreground">Label:</span> Button text as accessible name. Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">aria-label</code> for icon-only.</p>
                      <p><span className="font-medium text-foreground">Disabled:</span> Announced as "dimmed" or "unavailable".</p>
                    </div>
                  </div>

                  {/* Focus */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Focus indicators</h3>
                    <p className="text-sm text-muted-foreground">
                      Visible focus ring meets WCAG 2.1 Level AA contrast requirements.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'Content' && (
                <div className="space-y-8">
                  {/* Writing Guidelines */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Writing guidelines</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">Be action-oriented:</span> Start with a verb that describes the action.</p>
                      <p><span className="font-medium text-foreground">Be concise:</span> Keep labels 1-3 words. Avoid "Click here" or "Please".</p>
                      <p><span className="font-medium text-foreground">Sentence case:</span> Capitalize only first word and proper nouns.</p>
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Label examples</h3>
                    <div className="rounded-xl border border-border overflow-hidden text-sm">
                      <div className="flex border-b border-border bg-muted/30">
                        <div className="flex-1 px-4 py-3 font-semibold text-foreground">✓ Do</div>
                        <div className="flex-1 px-4 py-3 font-semibold text-foreground">✗ Don't</div>
                      </div>
                      <div className="flex border-b border-border">
                        <div className="flex-1 px-4 py-3 text-foreground">Save</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Click here to save</div>
                      </div>
                      <div className="flex border-b border-border bg-muted/10">
                        <div className="flex-1 px-4 py-3 text-foreground">Delete account</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Delete</div>
                      </div>
                      <div className="flex">
                        <div className="flex-1 px-4 py-3 text-foreground">Add to cart</div>
                        <div className="flex-1 px-4 py-3 text-muted-foreground">Submit</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>

        {/* Related Components */}
        <RelatedComponents currentComponentId={componentId || ''} />
      </div>
    </div>
  );
}

// Related Components Section
function RelatedComponents({ currentComponentId }: { currentComponentId: string }) {
  const relatedIds = relatedComponentsMap[currentComponentId] || [];
  
  const relatedComponents = useMemo(() => {
    return relatedIds
      .filter(id => componentData[id])
      .slice(0, 4)
      .map(id => ({
        name: componentData[id].name,
        preview: componentData[id].preview,
      }));
  }, [relatedIds]);

  if (relatedComponents.length === 0) return null;

  return (
    <div className="pt-3 pb-4">
      <h2 className="text-xl font-semibold text-foreground mb-6">Related components</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedComponents.map((comp) => (
          <ComponentTile
            key={comp.name}
            name={comp.name}
            preview={comp.preview}
          />
        ))}
      </div>
    </div>
  );
}
