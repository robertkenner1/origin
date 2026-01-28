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
    size: ['medium', 'large', 'xlarge'],
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
    size: ['small', 'medium', 'large', 'xlarge'],
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
    size: ['medium', 'large', 'xlarge'],
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
  'text': {
    size: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  },
  'heading': {
    size: ['small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
  },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Accordion } from '@grammarly/design-system';

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
      { name: 'accessibilityLabelledBy', type: 'string', default: '—', description: 'ID of element that labels the accordion' },
      { name: 'bgColor', type: '"base-default" | "base-subdued"', default: '"base-default"', description: 'Defines the background color of the container' },
      { name: 'hasSeparators', type: 'boolean', default: 'true', description: 'Whether a border appears between Accordion Items' },
      { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Controls the size of the Accordion content' },
      { name: 'onExpandedChange', type: '(expandedIndices: number[]) => void', default: '—', description: 'Callback when expanded state changes' },
    ],
    examples: [],
  },
  'badge': {
    name: 'Badge',
    description: 'Badges display a count or status indicator, typically overlaid on another element like an icon or avatar.',
    preview: 'badge',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Badge } from '@grammarly/design-system';

function App() {
  return (
    <Badge
      count={5}
      variant="neutral"
      getAriaLabelText={(count) => \`\${count} new notifications\`}
    />
  );
}`,
    props: [
      { name: 'count', type: 'number', default: '—', description: 'Defines the count to display with formatting rules (101 → 99+, 1050 → 1K)' },
      { name: 'getAriaLabelText', type: '(count: string | number, specialCharBefore?: string, specialCharAfter?: string) => string', default: '—', description: 'Format aria label for screen readers' },
      { name: 'specialCharAfter', type: '"%"', default: '—', description: 'Special character to display after the count' },
      { name: 'specialCharBefore', type: '"+" | "-"', default: '—', description: 'Special character to display before the count' },
      { name: 'variant', type: '"neutral" | "business" | "addition" | "clarity" | "correctness" | "critical" | "deletion" | "delivery" | "engagement" | "plagiarism" | "premium" | "pro" | "success" | "warning"', default: '"neutral"', description: 'Variant color of the badge' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Button } from '@grammarly/design-system';

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
      { name: 'text', type: 'string', default: '—', description: "Used for the Button's label." },
      { name: 'children', type: 'React.Node', default: '—', description: "Used for the Button's label when more flexibility is needed outside of a simple string." },
      { name: 'accessibilityControls', type: 'string | undefined', default: 'undefined', description: 'ID of the element that this Button controls, like a Menu or Modal.' },
      { name: 'accessibilityExpanded', type: 'boolean', default: '—', description: 'When true, indicates if the control associated with the Button is expanded or collapsed.' },
      { name: 'accessibilityHasPopup', type: "'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false'", default: '—', description: 'Indicates the availability and type of interactive pop-up element that can be activated by the Button.' },
      { name: 'accessibilityLabel', type: 'string | undefined', default: 'undefined', description: 'Describes the Button when more context is needed outside of the `text`.' },
      { name: 'iconEnd', type: 'ReactNode | undefined', default: '—', description: 'Icon placed at the end of the Button. Icon is decorative and will be hidden from screen readers. For premium Buttons, only the premium Icon is allowed.' },
      { name: 'iconStart', type: 'ReactNode | undefined', default: '—', description: 'Icon placed at the start of the Button. Icon is decorative and will be hidden from screen readers. For premium Buttons, only the premium Icon is allowed.' },
      { name: 'isDisabled', type: 'boolean', default: '—', description: 'When true, removes the Button from the tab order and prevents interaction.' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether to show a circular loader, such as when the associated Form has been submitted.' },
      { name: 'shortcut', type: 'string', default: '—', description: 'Used to add a keyboard shortcut annotation within the Button. Does not apply to premium Buttons.' },
      { name: 'size', type: "'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge' | '4xlarge'", default: 'medium', description: 'Determines the height of the Button. The 2x, 3x, and 4x sizes should only be used on external web surfaces, not within the product.' },
      { name: 'tabIndex', type: 'number', default: '0', description: 'Determines the focus order for the Button. Should be changed only in rare cases.' },
      { name: 'type', type: "'button' | 'submit'", default: 'button', description: "When a Button is used to submit a form, type must be set to 'submit'." },
      { name: 'variant', type: "'primary' | 'ghost' | 'secondary' | 'tertiary' | 'critical' | 'premium' | 'pro' | 'enterprise'", default: 'primary', description: 'Styles the Button according to its use and required prominence.' },
      { name: 'width', type: "'full' | 'fixed'", default: 'fixed', description: 'Determines the width of the Button. Full width will stretch the Button to fit its container.' },
      { name: 'onClick', type: '(React.MouseEvent<HTMLButtonElement>) => void | <T>(e?: React.MouseEvent<HTMLElement>) => Promise<T>', default: '—', description: 'Event handler that is called when the Button is clicked. Promise can be used to display loading state of the Button.' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Checkbox } from '@grammarly/design-system';

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
      { name: 'defaultSelected', type: 'boolean', default: '—', description: 'Whether the element is selected (uncontrolled)' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Used to describe why this Checkbox has an error' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Additional context or guidance for the checkbox' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the element is disabled' },
      { name: 'isIndeterminate', type: 'boolean', default: 'false', description: 'Indeterminate visual representation (neither checked nor unchecked)' },
      { name: 'isOptional', type: 'boolean', default: '—', description: 'Whether the checkbox is optional' },
      { name: 'isRequired', type: 'boolean', default: '—', description: 'Whether the checkbox is required' },
      { name: 'isSelected', type: 'boolean', default: '—', description: 'Whether the element is selected (controlled)' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Controls visibility of the label' },
      { name: 'labelIndicatorForOptional', type: 'string', default: '"(Optional)"', description: 'Text to indicate optional status' },
      { name: 'labelIndicatorForRequired', type: 'string', default: '"(Required)"', description: 'Text to indicate required status' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the Checkbox and label' },
      { name: 'value', type: 'string', default: '—', description: 'The value when submitting an HTML form' },
      { name: 'onChange', type: '(isSelected: boolean) => void', default: '—', description: 'Handler when selection state changes' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Combobox, ComboboxItem } from '@grammarly/design-system';

function App() {
  return (
    <Combobox label="Select a fruit">
      <ComboboxItem value="apple">Apple</ComboboxItem>
      <ComboboxItem value="banana">Banana</ComboboxItem>
      <ComboboxItem value="cherry">Cherry</ComboboxItem>
    </Combobox>
  );
}`,
    props: [
      { name: 'children', type: 'React.Node', default: '—', description: 'ComboboxItem children' },
      { name: 'label', type: 'string', default: '—', description: 'The label displayed above the Combobox' },
      { name: 'defaultItems', type: 'string[]', default: '—', description: 'Default items to display' },
      { name: 'disabledItems', type: 'string[]', default: '—', description: 'Items that should be disabled' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the input' },
      { name: 'inputDecoration', type: 'React.Node', default: '—', description: 'Decoration element for the input' },
      { name: 'inputValue', type: 'string', default: '—', description: 'Current input text value (controlled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Combobox is disabled' },
      { name: 'isOptional', type: 'boolean', default: '—', description: 'Whether the combobox is optional' },
      { name: 'isRequired', type: 'boolean', default: '—', description: 'Whether the combobox is required' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '—', description: 'Whether to show or hide the label' },
      { name: 'labelIndicatorForOptional', type: 'string', default: '"(Optional)"', description: 'Text to indicate optional status' },
      { name: 'labelIndicatorForRequired', type: 'string', default: '"(Required)"', description: 'Text to indicate required status' },
      { name: 'listboxDisplay', type: '"top" | "bottom"', default: '"bottom"', description: 'Position of the listbox relative to input' },
      { name: 'noResultsMessage', type: 'string', default: '"No matching results"', description: 'Message shown when no items match filter' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text when empty (use rarely)' },
      { name: 'onInputChange', type: '(value: string) => void', default: '—', description: 'Handler when input text changes' },
      { name: 'onSelection', type: '(value: string) => void', default: '—', description: 'Handler when an item is selected' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Link } from '@grammarly/design-system';

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
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Additional context for screen readers when link text is truncated' },
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'The contents of the Link' },
      { name: 'display', type: '"inline" | "block" | "inline-block"', default: '"inline"', description: 'How Link is positioned relative to elements' },
      { name: 'download', type: 'string | boolean', default: '—', description: 'Indicates a file will be downloaded' },
      { name: 'id', type: 'string', default: '—', description: 'Element ID' },
      { name: 'target', type: '"_blank" | "_self" | "_parent" | "_top"', default: '—', description: 'Where the Link will be opened (automatically sets rel="noopener noreferrer" for _blank)' },
      { name: 'underline', type: '"always" | "hover"', default: '"always"', description: 'Whether underline shows always or on hover' },
      { name: 'variant', type: '"primary" | "secondary" | "inherit"', default: '"primary"', description: 'Sets the color of the Link text' },
      { name: 'weight', type: '"normal" | "bold"', default: '—', description: 'Font weight of the link text' },
      { name: 'onClick', type: 'React.MouseEventHandler<HTMLAnchorElement>', default: '—', description: 'Handler called when the link is clicked' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Modal, Button } from '@grammarly/design-system';

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
      { name: 'children', type: 'ReactNode', default: '—', description: 'Modal.Body and Modal.Footer components' },
      { name: 'title', type: 'string', default: '—', description: 'The title of the modal, displayed in the header (use directive verb+noun or question)' },
      { name: 'accessibilityLabelCloseButton', type: 'string', default: '"Close"', description: 'Accessibility label for close button' },
      { name: 'description', type: 'string', default: '—', description: 'Additional context beneath the title' },
      { name: 'dismissOnOutsideClick', type: 'boolean', default: 'true', description: 'Whether clicking outside closes the modal (passive modals only)' },
      { name: 'hasCloseButton', type: 'boolean', default: 'true', description: 'Whether modal has a close icon button (omit for transactional modals)' },
      { name: 'isOpen', type: 'boolean', default: '—', description: 'Whether the modal is currently visible (controlled)' },
      { name: 'role', type: '"dialog" | "alertdialog"', default: '"dialog"', description: 'Use alertdialog for errors/confirmations requiring immediate attention' },
      { name: 'target', type: 'Element | DocumentFragment', default: '—', description: 'Target element for portal rendering' },
      { name: 'width', type: '"small" | "medium"', default: '"medium"', description: 'Small is 480px, Medium is 640px (default)' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Handler when the Modal is about to close' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when the Modal has finished closing' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when the Modal has finished opening' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Popover } from '@grammarly/design-system';

function App() {
  return (
    <Popover>
      <Popover.Anchor>
        <Button>Show info</Button>
      </Popover.Anchor>
      <Popover.Content accessibilityLabel="Information about this feature" root={document.body}>
        <p>Additional information goes here.</p>
      </Popover.Content>
    </Popover>
  );
}`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'Popover.Anchor and Popover.Content components' },
      { name: 'dismissOnOutsideClick', type: 'boolean', default: 'true', description: 'Whether clicking outside closes the popover' },
      { name: 'initialOpen', type: 'boolean', default: 'false', description: 'Whether popover is initially open (uncontrolled)' },
      { name: 'open', type: 'boolean', default: 'false', description: 'Whether the popover is open (controlled)' },
      { name: 'placement', type: '"top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end"', default: '"top"', description: 'Where the popover appears (auto-adjusts if no space)' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when popover is hidden' },
      { name: 'onOpenChange', type: 'React.Dispatch<React.SetStateAction<boolean>>', default: '—', description: 'Handler when open state changes' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when popover is displayed' },
    ],
    examples: [],
  },
  'radio-group': {
    name: 'Radio Group',
    description: 'Radio groups allow users to select exactly one option from a set of mutually exclusive choices.',
    preview: 'radio-group',
    installation: 'npm install @grammarly/design-system',
    usage: `import { RadioGroup, RadioButton } from '@grammarly/design-system';

function App() {
  const [value, setValue] = useState('all');

  return (
    <RadioGroup
      legend="Notifications"
      value={value}
      onChange={setValue}
    >
      <RadioButton value="all">All notifications</RadioButton>
      <RadioButton value="important">Important only</RadioButton>
      <RadioButton value="none">None</RadioButton>
    </RadioGroup>
  );
}`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'RadioButton children' },
      { name: 'legend', type: 'string', default: '—', description: 'Describes the purpose of the Radio Group' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the group' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether all RadioButtons are disabled' },
      { name: 'isOptional', type: 'boolean', default: '—', description: 'Whether the radio group is optional' },
      { name: 'isRequired', type: 'boolean', default: '—', description: 'Whether the radio group is required' },
      { name: 'layout', type: '"column" | "row"', default: '"column"', description: 'Specify column or row layout (2-column default)' },
      { name: 'legendDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the legend' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the Radio group' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { SearchField } from '@grammarly/design-system';

function App() {
  const [query, setQuery] = useState('');

  return (
    <SearchField
      label="Search. Press Enter to search."
      value={query}
      onChange={setQuery}
      onSubmit={handleSearch}
      placeholder="Example: projects"
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label for the search field (include "Press Enter to search" if hidden)' },
      { name: 'accessibilityLabelClearButton', type: 'string', default: '"Clear search"', description: 'Accessibility label for clear button' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"hidden"', description: 'Whether to show or hide the label (hidden by default)' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text (required if label hidden, use "Example: [item]" or "Search [items]")' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the search field' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'onClear', type: '() => void', default: '—', description: 'Handler when clear button is clicked' },
      { name: 'onFocus', type: '(e: FocusEvent) => void', default: '—', description: 'Handler when field receives focus' },
      { name: 'onSubmit', type: '(value: string) => void', default: '—', description: 'Handler when Enter key is pressed' },
    ],
    examples: [],
  },
  'select': {
    name: 'Select',
    description: 'Select allows users to choose one option from a dropdown list of choices.',
    preview: 'select',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Select } from '@grammarly/design-system';

function App() {
  return (
    <Select
      label="Country"
      onChange={(value) => console.log(value)}
    >
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="uk">United Kingdom</Select.Option>
    </Select>
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'The label displayed above the Select' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the select' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Select is disabled' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Whether the select is optional' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Whether the select is required' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the label' },
      { name: 'labelIndicatorForOptional', type: 'string', default: '"(Optional)"', description: 'Text to indicate optional status' },
      { name: 'labelIndicatorForRequired', type: 'string', default: '"(Required)"', description: 'Text to indicate required status' },
      { name: 'name', type: 'string', default: '—', description: 'Name for form submission' },
      { name: 'value', type: 'string', default: '—', description: 'The selected value (controlled)' },
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
    installation: 'npm install @grammarly/design-system',
    usage: `import { Switch } from '@grammarly/design-system';

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
      { name: 'defaultSelected', type: 'boolean', default: 'false', description: 'Whether Switch is on by default (uncontrolled)' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Additional context displayed separately (explains benefit when on)' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the Switch is disabled' },
      { name: 'isSelected', type: 'boolean', default: 'false', description: 'Whether the Switch is on (controlled)' },
      { name: 'labelDisplay', type: '"left" | "right" | "top" | "hidden"', default: '"left"', description: 'Position of the label' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
      { name: 'ref', type: 'React.Element<HTMLInputElement>', default: '—', description: 'Ref to the input element' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the size of the Switch' },
      { name: 'value', type: 'string', default: '—', description: 'The value for HTML form submission' },
      { name: 'onChange', type: '(isSelected: boolean) => void', default: '—', description: 'Handler when Switch is toggled' },
    ],
    examples: [],
  },
  'tabs': {
    name: 'Tabs',
    description: 'Tabs organize content into separate views where only one tab panel is visible at a time.',
    preview: 'tabs',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Tabs } from '@grammarly/design-system';

function App() {
  return (
    <Tabs defaultSelectedTab="overview">
      <Tabs.TabList accessibilityLabel="Content sections">
        <Tabs.Tab id="overview" label="Overview" />
        <Tabs.Tab id="features" label="Features" />
        <Tabs.Tab id="pricing" label="Pricing" />
      </Tabs.TabList>
      <Tabs.Panel id="overview">Overview content</Tabs.Panel>
      <Tabs.Panel id="features">Features content</Tabs.Panel>
      <Tabs.Panel id="pricing">Pricing content</Tabs.Panel>
    </Tabs>
  );
}`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'Tab List and Tab Panels' },
      { name: 'defaultSelectedTab', type: 'string', default: '—', description: 'The first Tab activated by default (defaults to first tab)' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge" | "auto"', default: '"medium"', description: 'Determines the size of the Tabs (use "auto" for custom heights)' },
      { name: 'onChange', type: '(id: string) => void', default: '—', description: 'Handler when a Tab is selected' },
    ],
    examples: [],
  },
  'tag': {
    name: 'Tag',
    description: 'Tags label, classify, or draw attention to nearby elements. They communicate status, category, or other metadata.',
    preview: 'tag',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Tag } from '@grammarly/design-system';

function App() {
  return (
    <Tag
      label="New"
      variant="brand"
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Used for the content of a Tag (one or two words only)' },
      { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Extra context for screen readers' },
      { name: 'iconStart', type: 'ReactNode | undefined', default: '—', description: 'Custom icon to display on the left of the Tag' },
      { name: 'inline', type: 'boolean', default: 'false', description: 'When true, Tag displays inline with other elements' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Whether to show predefined icon for Premium/Pro/Tip variants' },
      { name: 'variant', type: '"brand" | "critical" | "neutral" | "premium" | "pro" | "success" | "tip" | "warning" | "inverse"', default: '"neutral"', description: 'Styles the Tag according to its semantic meaning' },
    ],
    examples: [],
  },
  'text-field': {
    name: 'Text Field',
    description: 'Text fields allow users to enter and edit single-line text. They support labels, placeholders, and validation states.',
    preview: 'text-field',
    installation: 'npm install @grammarly/design-system',
    usage: `import { TextField } from '@grammarly/design-system';

function App() {
  const [email, setEmail] = useState('');

  return (
    <TextField
      label="Email"
      value={email}
      onChange={setEmail}
      helperMessage="We'll never share your email."
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Displays the text label for the Text Field' },
      { name: 'accessibilityLabelHidePassword', type: 'string', default: '"Hide password"', description: 'Accessibility label for hide password button' },
      { name: 'accessibilityLabelShowPassword', type: 'string', default: '"Show password"', description: 'Accessibility label for show password button' },
      { name: 'autocomplete', type: '"bday" | "current-password" | "email" | "new-password" | "username" | "url" | "on" | "off"', default: '—', description: 'Tells browsers when to offer autocomplete' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the field' },
      { name: 'iconStart', type: 'ReactNode | undefined', default: '—', description: 'Decorative icon at the start of the input' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Whether the field is optional' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Whether the field is required' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the label' },
      { name: 'labelIndicatorForOptional', type: 'string', default: '"(Optional)"', description: 'Text to indicate optional status' },
      { name: 'labelIndicatorForRequired', type: 'string', default: '"(Required)"', description: 'Text to indicate required status' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
      { name: 'size', type: '"medium" | "large" | "xlarge"', default: '"medium"', description: 'Controls the height of the text field' },
      { name: 'type', type: '"text" | "url" | "tel" | "email" | "password" | "number" | "date" | "time" | "datetime-local"', default: '"text"', description: 'The input type' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'onFocus', type: '(e: FocusEvent) => void', default: '—', description: 'Handler when field receives focus' },
    ],
    examples: [],
  },
  'textarea': {
    name: 'Textarea',
    description: 'Textareas allow users to enter and edit multi-line text. They automatically resize or scroll to accommodate content.',
    preview: 'textarea',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Textarea } from '@grammarly/design-system';

function App() {
  const [message, setMessage] = useState('');

  return (
    <Textarea
      label="Message"
      value={message}
      onChange={setMessage}
      helperMessage="Maximum 500 characters"
      rows={3}
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Displays the text label for the Textarea' },
      { name: 'defaultValue', type: 'string', default: '—', description: 'The default value (uncontrolled)' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Error message to display' },
      { name: 'helperMessage', type: 'string', default: '—', description: 'Helper text below the field' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
      { name: 'isOptional', type: 'boolean', default: 'false', description: 'Whether the field is optional' },
      { name: 'isRequired', type: 'boolean', default: 'false', description: 'Whether the field is required' },
      { name: 'labelDisplay', type: '"visible" | "hidden"', default: '"visible"', description: 'Whether to show or hide the label' },
      { name: 'labelIndicatorForOptional', type: 'string', default: '"(Optional)"', description: 'Text to indicate optional status' },
      { name: 'labelIndicatorForRequired', type: 'string', default: '"(Required)"', description: 'Text to indicate required status' },
      { name: 'name', type: 'string', default: '—', description: 'The name for HTML form submission' },
      { name: 'placeholderMessage', type: 'string', default: '—', description: 'Placeholder text when empty (use rarely)' },
      { name: 'resizable', type: '"on" | "off" | "vertical" | "horizontal"', default: '"on"', description: 'Controls if and how the textarea can be resized' },
      { name: 'rows', type: 'number', default: '3', description: 'Initial height in rows' },
      { name: 'value', type: 'string', default: '—', description: 'The input value (controlled)' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Handler when value changes' },
      { name: 'onFocus', type: '(e: FocusEvent) => void', default: '—', description: 'Handler when field receives focus' },
    ],
    examples: [],
  },
  'toast': {
    name: 'Toast',
    description: 'Toasts provide brief, non-blocking feedback about an operation through a message that appears temporarily.',
    preview: 'toast',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Toast } from '@grammarly/design-system';

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
      { name: 'text', type: 'string', default: '—', description: 'The text shown in the Toast (limit to 5 words or fewer, max 10)' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Handler when Close button is clicked' },
      { name: 'primaryAction', type: 'ReactNode', default: '—', description: 'Primary action button (use Ghost Button variant)' },
      { name: 'secondaryAction', type: 'ReactNode', default: '—', description: 'Secondary action button (use Ghost Button variant only)' },
      { name: 'variant', type: '"default" | "critical" | "loading" | "success" | "warning"', default: '"default"', description: 'Changes the icon to convey system status' },
    ],
    examples: [],
  },
  'tooltip': {
    name: 'Tooltip',
    description: 'Tooltips display informative text when users hover over, focus on, or tap an element.',
    preview: 'tooltip',
    installation: 'npm install @grammarly/design-system',
    usage: `import { Tooltip } from '@grammarly/design-system';

function App() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          icon={InterfaceHelp}
          accessibilityLabel="Help"
        />
      </TooltipTrigger>
      <TooltipContent root={document.body}>
        Click for more information
      </TooltipContent>
    </Tooltip>
  );
}`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'Tooltip trigger and content' },
      { name: 'annotation', type: 'string', default: '—', description: 'Keyboard shortcut annotation text (dynamically displays OS-specific keys)' },
      { name: 'initialOpen', type: 'boolean', default: '—', description: 'Whether tooltip is initially open (uncontrolled)' },
      { name: 'open', type: 'boolean', default: '—', description: 'Whether tooltip is open (controlled)' },
      { name: 'openDelay', type: 'number', default: '—', description: 'Delay before showing (ms, default 200ms)' },
      { name: 'placement', type: '"top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end"', default: '—', description: 'Where the tooltip appears (defaults to top, auto-adjusts based on space)' },
      { name: 'onHide', type: '() => void', default: '—', description: 'Handler when Tooltip is hidden' },
      { name: 'onOpenChange', type: 'React.Dispatch<React.SetStateAction<boolean>>', default: '—', description: 'Handler when open state changes' },
      { name: 'onShow', type: '() => void', default: '—', description: 'Handler when Tooltip is shown' },
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

  // Reset state when componentId changes
  useEffect(() => {
    // Get fresh config for the new component
    const freshConfig = componentId ? componentControlsConfig[componentId] : null;

    window.scrollTo(0, 0);
    setActiveTab('Preview');
    setCodeCopied(false);
    setPreviewBg('white');

    // Reset controls to match new component
    setControls({
      variant: freshConfig?.variant?.[0] || 'primary',
      size: freshConfig?.size?.[0] || 'medium',
      state: 'rest',
      disabled: false,
      label: freshConfig?.defaultLabel || 'Button',
      width: 'fixed',
    });
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
            <div className="space-y-8">
              {/* Installation */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Installation</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      1. Import the CSS (if not done already).
                    </p>
                    <div className="rounded-lg bg-muted/50 border border-border p-4">
                      <pre className="text-sm font-mono text-foreground">
                        <code>@import "@grammarly/design-system";</code>
                      </pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      2. Import the {component.name} component in JS.
                    </p>
                    <div className="rounded-lg bg-muted/50 border border-border p-4">
                      <pre className="text-sm font-mono text-foreground">
                        <code>{`import { ${component.name} } from "@grammarly/design-system";`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Reference */}
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
            </div>
          )}

          {activeTab === 'Design' && (
                <div className="space-y-10">
                  {componentId === 'button' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use when it's possible for a user to take an action.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Offering navigation among sections within a page or to an external website. Instead, use a Link.</li>
                              <li>It's preferable to have a Button with only an Icon and no text label. Instead, use an Icon Button.</li>
                            </ul>
                          </div>
                          <div className="rounded-lg bg-muted/30 border border-border p-4">
                            <p className="font-medium text-foreground mb-2">Is it a Link or a Button?</p>
                            <p className="text-muted-foreground mb-3">
                              Links are used to navigate among pages, within sections of the same page, or to a location outside the app. They are also used for phone numbers and email addresses. If the URL in your browser changes after activating it, it's a Link.
                            </p>
                            <p className="text-muted-foreground">
                              A Button allows a user to do something along their current path—it doesn't take them out of it like a Link does. Buttons perform actions like <span className="font-medium text-foreground">Create snippet</span>, <span className="font-medium text-foreground">Open settings</span>, or <span className="font-medium text-foreground">Accept changes</span>.
                            </p>
                          </div>
                        </div>
                      </div>

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
                                <td className="px-4 py-3 text-muted-foreground">Default variant. Use only a single primary Button per surface to call attention to the highest-priority action available.</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">Ghost primary</td>
                                <td className="px-4 py-3 text-muted-foreground">Call attention to a high-priority action that appears more than once on a surface. Can also be used to style Buttons consistently within a surface or workflow.</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">Secondary</td>
                                <td className="px-4 py-3 text-muted-foreground">Medium level of emphasis for one or more actions that complement a primary Button.</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">Tertiary</td>
                                <td className="px-4 py-3 text-muted-foreground">Reduce emphasis on one or more actions that are not critical to completing the primary task.</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">Critical</td>
                                <td className="px-4 py-3 text-muted-foreground">Indicate a permanent or risky action, such as deleting something without any options for recovery.</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">Pro</td>
                                <td className="px-4 py-3 text-muted-foreground">Indicate a feature or action that is associated with a Pro plan. Only use the filled Star icon in this variant.</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">Enterprise</td>
                                <td className="px-4 py-3 text-muted-foreground">Indicate a feature or action that is associated with an Enterprise plan. This variant intentionally does not allow for an Icon.</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-foreground">Premium</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  <span className="italic">Deprecated in 2024.</span> Indicate a feature or action associated with a Premium plan.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
                        <p className="text-sm text-muted-foreground mb-6">Buttons come in small, medium, large, and xlarge sizes. Medium is the default and preferred; however, you might consider a small Button in compact UI or larger sizes where more space is available.</p>
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
                                <td className="px-4 py-3 text-muted-foreground">Compact UI, inline actions, data tables, toolbars.</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">Medium</td>
                                <td className="px-4 py-3 text-muted-foreground">Default size. Use for most standard interface actions.</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">Large</td>
                                <td className="px-4 py-3 text-muted-foreground">More space is available, prominent actions.</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-foreground">XLarge</td>
                                <td className="px-4 py-3 text-muted-foreground">Hero sections, landing pages, prominent CTAs.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <div className="space-y-5">
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Flexible width</h4>
                            <p className="text-sm text-muted-foreground">
                              Buttons are flexible in width by default. They have a standard Icon size, font size, and padding. The width flexes to accommodate text as written and an Icon if used. Text can wrap to the following line so that it will not truncate.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Full width</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Some smaller surfaces and specific components, such as Popover, use a full-width Button. Text can wrap to the following line so that it will not truncate.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              You can add a secondary or tertiary Button below a primary Button. You can stack up to two full-width Buttons.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Alignment */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Alignment</h3>
                        <div className="space-y-5">
                          <p className="text-sm text-muted-foreground">
                            Tertiary and ghost Buttons lack a visual border and their labels may appear misaligned when displayed with other content. To align a Button with its surrounding content, wrap it in a Flex container component and use the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">marginLeft</code> or <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">marginRight</code> props to make incremental adjustments.
                          </p>
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-3">Alignment to content</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Use the surrounding content to determine how to align the content of a tertiary or ghost Button.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border border-border p-4 bg-green-50/50 dark:bg-green-950/20">
                                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">✓ Do</p>
                                <p className="text-sm text-muted-foreground">Align the label or Icon of a tertiary or ghost Button to the surrounding content.</p>
                              </div>
                              <div className="rounded-lg border border-border p-4 bg-red-50/50 dark:bg-red-950/20">
                                <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2">✗ Don't</p>
                                <p className="text-sm text-muted-foreground">Do not allow staggered alignment with surrounding content.</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-3">Alignment to primary and secondary buttons</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              When stacking a tertiary or ghost Button below a primary or secondary Button, do <span className="font-semibold">not</span> change the margins. This allows the label or Icon to remain visually aligned.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border border-border p-4 bg-green-50/50 dark:bg-green-950/20">
                                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">✓ Do</p>
                                <p className="text-sm text-muted-foreground">Align the edge of a tertiary or ghost Button with a primary or secondary Button above it.</p>
                              </div>
                              <div className="rounded-lg border border-border p-4 bg-red-50/50 dark:bg-red-950/20">
                                <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2">✗ Don't</p>
                                <p className="text-sm text-muted-foreground">Do not change the margins of a tertiary or ghost button to align with the surrounding content.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'accordion' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <div>
                            <p className="font-medium text-foreground mb-2">Use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Organizing content into collapsible sections. For example, FAQs or other groups of information that aren't essential and may be hidden.</li>
                              <li>Grouping related information, such as product specifications or step-by-step instructions, into collapsible sections for better readability.</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Providing critical information that must remain visible.</li>
                              <li>The content is brief and doesn't require organization. In these cases, an Accordion may add unnecessary complexity.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Vertical scroll */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Vertical scroll</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>If an Accordion expands to be taller than the available height:</p>
                          <ul className="list-disc list-inside space-y-1 ml-1">
                            <li>On a regular page, the page scrolls to accommodate the content including expanded Accordion containers.</li>
                            <li>In a smaller container like the Mac/Win Onboarding window, the parent container would scroll.</li>
                          </ul>
                          <p className="italic">Note: Never add a scroll within an Accordion itself.</p>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'badge' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use when displaying numerical data related to a paired element, such as a label or Icon.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Displaying text. Instead, use a Tag.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Position */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Position</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Position a Badge so that it's clear to a user what it quantifies. Typical alignments include:</p>
                          <ul className="list-disc list-inside space-y-1 ml-1">
                            <li>Left of its related element</li>
                            <li>Right of its related element</li>
                            <li>Overlapping the top-right corner of its related element, ensuring that the underlying element remains clear</li>
                          </ul>
                        </div>
                      </div>

                      {/* Behavior - Maximum value */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Maximum value</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>A Badge can have up to two digits, and the maximum tally is 99. A Badge displays 99+ for values after 99, then 1K+ for all values after 1,000.</p>
                          <p>Percentages can have up to three digits and a percentage sign (%).</p>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'checkbox' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <div>
                            <p className="font-medium text-foreground mb-2">Use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>It's possible to select zero, one, or many options in a set.</li>
                              <li>Asking a user to agree to something, such as terms and conditions.</li>
                              <li>Asking a user to select an item, such as a row in a table.</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>It's possible to pick only one option from a set. Instead, use a Radio Group.</li>
                              <li>Checking one option would uncheck another option in the list. Instead, use a Radio Group or Radio Button Group.</li>
                              <li>A single item can be turned on and off independently from other options and effects of the state change are immediate. Instead, use a Switch.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Indeterminate state */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Indeterminate state</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>A Checkbox is in the indeterminate state when it is neither checked nor unchecked and the system can't determine which state to display. This scenario usually happens when a single Checkbox controls a group of Checkboxes, as in a table, and some but not all of the Checkboxes in the group are selected.</p>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'link' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            A Link can appear on its own, within a sentence or paragraph, or immediately following content.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Navigating to another page within the app or among sections within a page</li>
                              <li>Navigating to an external website outside of the app</li>
                              <li>Linking to emails and phone numbers</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Allowing a user to perform an action. Instead, use a Button.</li>
                              <li>Allowing a user to alter how content on a page is displayed. Instead, use a Button or Switch.</li>
                            </ul>
                          </div>
                          <div className="rounded-lg bg-muted/30 border border-border p-4">
                            <p className="font-medium text-foreground mb-2">Is it a Link or a Button?</p>
                            <p className="text-muted-foreground mb-3">
                              Links are used to navigate among pages, within sections of the same page, or to a location outside the app. They are also used for phone numbers and email addresses.
                            </p>
                            <p className="text-muted-foreground">
                              A Button allows a user to do something along their current path—it doesn't take them out of it like a Link does. Buttons perform actions like <span className="font-medium text-foreground">Create</span>, <span className="font-medium text-foreground">Save</span>, or <span className="font-medium text-foreground">Delete</span>.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Styling */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Styling</h3>
                        <div className="space-y-5">
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Inline Links</h4>
                            <p className="text-sm text-muted-foreground">
                              An inline Link appears within a sentence or as the last sentence of a paragraph. An underline should always be present, which is the component's default.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Standalone Links</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              A standalone Link appears on its own instead of inline with other text. Display the underline only when a user hovers over the Link.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Users can easily miss standalone Links. To improve scannability and usability, use visual cues like an Icon or bold text to make sure a Link commands attention.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Opening in a new tab or window */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Opening in a new tab or window</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Opening a Link in a new tab by default can cause accessibility issues and general user confusion. Open a new tab only when necessary, such as when:</p>
                          <ul className="list-disc list-inside space-y-1 ml-1">
                            <li>A user is allowed to choose this as their default preference.</li>
                            <li>A user is navigating from within the product experience to an outside page, such as from the Editor to a help center article.</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'modal' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Modals create friction in order to focus a user's attention. You can use this friction to intentionally slow a user down. However, employ this tactic in moderation, taking care to avoid unnecessary disruptions.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Displaying urgent information</li>
                              <li>Communicating that an immediate action is required</li>
                              <li>Collecting simple data without requiring a user to navigate to a new page</li>
                              <li>Preventing unexpected errors or context changes that may occur through a user's accidental selection</li>
                              <li>Confirming an action that can't be undone</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Displaying low- to medium-priority information. Instead, use a Popover.</li>
                              <li>Displaying an overlay that a user didn't summon. Instead, use a Popover.</li>
                              <li>Providing quick feedback or confirmation of a user's action. Instead, use a Toast.</li>
                              <li>Displaying large amounts of information or Forms with more than three rows of inputs. Instead, use a full page.</li>
                              <li>A Modal would be activated from within another Modal. Instead, try making the first Modal a full, standalone page.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Modal on top of another Modal */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Modal on top of another Modal</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Do not allow a Modal to open on top of or at the same time as another Modal.</p>
                          <p>Instead, consider if the content in the initial Modal could be placed directly on a full page. This allows the second Modal to open correctly on top of a full page instead of on top of another Modal.</p>
                        </div>
                      </div>

                      {/* Behavior - Closing Modals */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Closing Modals</h3>
                        <div className="space-y-5">
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Transactional or required acknowledgement</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              A user must take deliberate action to close a Modal that is transactional, collects data, or requires acknowledgment. This helps prevent a user from erasing their entries or breaking a workflow.
                            </p>
                            <p className="text-sm text-muted-foreground">Here are ways to close a transactional or required acknowledgment Modal:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1 text-sm">
                              <li><span className="font-medium">Complete task:</span> Complete the task and activate the primary Button.</li>
                              <li><span className="font-medium">Esc:</span> Press the Esc key on the keyboard.</li>
                              <li><span className="font-medium">Cancel:</span> Activate the tertiary Button to go back without saving or acknowledgment.</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-foreground mb-2">Passive</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Content in a passive Modal is considered supplementary, and dismissing it intentionally or accidentally doesn't negatively impact a user's experience.
                            </p>
                            <p className="text-sm text-muted-foreground">Here are ways to close a passive Modal:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1 text-sm">
                              <li><span className="font-medium">Complete task:</span> Complete the task and activate the primary Button.</li>
                              <li><span className="font-medium">Esc:</span> Press the Esc key on the keyboard.</li>
                              <li><span className="font-medium">Close Icon Button:</span> Activate the Close Icon Button in the upper-right corner.</li>
                              <li><span className="font-medium">Click or tap elsewhere:</span> Click or tap anywhere on the overlay outside of the Modal.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'combobox' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Combobox when a user can type to filter a list of options, when selecting a single item from a provided list, or when items contain content beyond a simple name.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Items can be presented all at once. Instead, use a Select or Radio Group.</li>
                              <li>Items are simple words without extra content. Instead, use a Select.</li>
                              <li>Multiple selections are needed. Instead, use Checkboxes.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Filtering */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Filtering</h3>
                        <p className="text-sm text-muted-foreground">
                          Users can type in the input field to filter the list of options. The listbox updates dynamically as the user types, showing only matching results.
                        </p>
                      </div>

                      {/* Behavior - Selection */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Selection</h3>
                        <p className="text-sm text-muted-foreground">
                          When a user selects an item from the list, the selected value appears in the input field and the listbox closes.
                        </p>
                      </div>

                      {/* Behavior - Custom values */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Custom values</h3>
                        <p className="text-sm text-muted-foreground">
                          Comboboxes can optionally allow custom values that aren't in the predefined list, enabling flexible user input.
                        </p>
                      </div>

                      {/* Behavior - Listbox positioning */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Listbox positioning</h3>
                        <p className="text-sm text-muted-foreground">
                          The listbox appears below the input by default, but automatically repositions above if there isn't enough space below.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'popover' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Popover for nice-to-know but not essential information, highlighting up to 3 UI elements, or presenting low to medium priority information.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>The interaction is familiar or expected. Instead, provide the information directly.</li>
                              <li>Instructions are essential and need to be persistent. Instead, use inline help text.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <p className="text-sm text-muted-foreground">
                          Popovers have a minimum width of 225px and a maximum width of 480px. The width adjusts based on content while staying within these bounds.
                        </p>
                      </div>

                      {/* Behavior - Placement */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placement</h3>
                        <p className="text-sm text-muted-foreground">
                          Popovers can be positioned in multiple directions relative to their trigger element. They automatically reposition if there isn't enough space in the preferred direction.
                        </p>
                      </div>

                      {/* Behavior - Opening and Closing */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Opening and Closing</h3>
                        <p className="text-sm text-muted-foreground">
                          Popovers open on click or hover of the trigger element. They close when clicking outside, pressing Escape, or clicking a close button if provided.
                        </p>
                      </div>

                      {/* Behavior - Multistep footer */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Multistep footer</h3>
                        <p className="text-sm text-muted-foreground">
                          For multistep popovers, include a footer with navigation buttons to move between steps and indicators showing progress.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'radio-group' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Radio Group when a single option selection is required and it's advantageous for users to see all options at once.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Zero, one, or many selections are needed. Instead, use Checkboxes.</li>
                              <li>There are more than 6 options. Instead, use a Select.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Layouts */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Layouts</h3>
                        <p className="text-sm text-muted-foreground">
                          Radio Groups can be arranged vertically or horizontally. Vertical layout is preferred for better scannability, while horizontal works well for compact spaces with few options.
                        </p>
                      </div>

                      {/* Behavior - Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Radio Groups are available in small and medium sizes. Choose based on the density of your interface and the importance of the selection.
                        </p>
                      </div>

                      {/* Behavior - Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          Include helper text below the Radio Group to provide additional context or instructions for the selection.
                        </p>
                      </div>

                      {/* Behavior - Error state */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error state</h3>
                        <p className="text-sm text-muted-foreground">
                          When validation fails, display an error state with a descriptive error message explaining what needs to be corrected.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'search-field' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Search Field when it's more efficient to search through a large set of items, for global website search, or when users need to find specific content quickly.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Collecting short text input that isn't for searching. Instead, use a Text Field.</li>
                              <li>There are fewer than 8 options to choose from. Instead, use a Select or Radio Group.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Search Fields are available in small, medium, and large sizes. Select the size that matches your interface hierarchy and available space.
                        </p>
                      </div>

                      {/* Behavior - Visible and hidden label */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Visible and hidden label</h3>
                        <p className="text-sm text-muted-foreground">
                          Labels can be visible above the field or visually hidden for accessibility while maintaining screen reader support. Use visible labels when context isn't clear from surrounding UI.
                        </p>
                      </div>

                      {/* Behavior - Activating search */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Activating search</h3>
                        <p className="text-sm text-muted-foreground">
                          Search can be activated by pressing Enter, clicking a search button, or automatically as the user types. Choose the activation method based on the search complexity and performance considerations.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'select' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Select when there are at least 2 predefined options, a single selection is required, and options are simple words or phrases.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Options can be presented all at once. Instead, use a Radio Group.</li>
                              <li>Multiple selections are needed. Instead, use Checkboxes or a multi-select component.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Opening and closing */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Opening and closing</h3>
                        <p className="text-sm text-muted-foreground">
                          The Select opens when clicking the trigger, revealing the list of options. It closes when an option is selected, clicking outside, or pressing Escape.
                        </p>
                      </div>

                      {/* Behavior - Hidden labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Hidden labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Labels can be visually hidden while remaining accessible to screen readers. Use this when the context makes the field's purpose clear without a visible label.
                        </p>
                      </div>

                      {/* Behavior - Disabled options */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Disabled options</h3>
                        <p className="text-sm text-muted-foreground">
                          Individual options can be disabled to indicate they're unavailable. Disabled options remain visible but cannot be selected.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'switch' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Switch for a choice to turn a single item on or off where the state change takes effect immediately.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Consent is required. Instead, use a Checkbox.</li>
                              <li>Options only take effect after a save or submit action. Instead, use a Checkbox or Radio Group.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Switches are available in small and medium sizes. Select the size that matches your interface density and the importance of the control.
                        </p>
                      </div>

                      {/* Behavior - Label positions */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Label positions</h3>
                        <p className="text-sm text-muted-foreground">
                          Labels can be positioned to the left or right of the Switch. Choose the position that best fits your layout and reading direction.
                        </p>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <p className="text-sm text-muted-foreground">
                          The Switch component has a fixed width, but the overall control width adapts to accommodate the label text.
                        </p>
                      </div>

                      {/* Behavior - Click area */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Click area</h3>
                        <p className="text-sm text-muted-foreground">
                          Both the Switch toggle and its label are clickable, providing a larger interactive area for easier activation.
                        </p>
                      </div>

                      {/* Behavior - Immediate effect */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Immediate effect</h3>
                        <p className="text-sm text-muted-foreground">
                          Changes take effect immediately when toggled, without requiring a save or submit action. This distinguishes Switches from Checkboxes in forms.
                        </p>
                      </div>

                      {/* Behavior - No error state */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">No error state</h3>
                        <p className="text-sm text-muted-foreground">
                          Switches do not have an error state because both on and off are valid states. If validation is needed, use a different component.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'tabs' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use Tabs when it's preferable to separate related content or when related content is logically separated into distinct sections.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>There is only one tab. Remove the Tabs component entirely.</li>
                              <li>Content is unrelated. Instead, use separate pages or sections.</li>
                              <li>For primary navigation. Instead, use a navigation menu.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Tabs are available in small and medium sizes. Choose the size that matches the hierarchy and density of your interface.
                        </p>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <p className="text-sm text-muted-foreground">
                          Tab width adjusts automatically based on label content. Tabs can be uniform width or variable width depending on the design needs.
                        </p>
                      </div>

                      {/* Behavior - Tab quantity */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Tab quantity</h3>
                        <p className="text-sm text-muted-foreground">
                          Use between 2 and 6 tabs for optimal usability. If more sections are needed, consider a different navigation pattern.
                        </p>
                      </div>

                      {/* Behavior - Overflow */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Overflow</h3>
                        <p className="text-sm text-muted-foreground">
                          When tabs don't fit in the available space, they can scroll horizontally or wrap to multiple rows, depending on the implementation.
                        </p>
                      </div>

                      {/* Behavior - Placement */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placement</h3>
                        <p className="text-sm text-muted-foreground">
                          Tabs are typically positioned at the top of their content area, but can also be placed at the bottom or sides when appropriate for the layout.
                        </p>
                      </div>

                      {/* Behavior - Nested tabs */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Nested tabs</h3>
                        <p className="text-sm text-muted-foreground">
                          Avoid nesting tabs within tabs as it creates confusion about the information hierarchy. Instead, reorganize content or use a different navigation pattern.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'tag' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use Tags when it's helpful to visually classify items or focus attention on specific attributes or categories.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>An interactive or action element is needed. Instead, use a Button or Link.</li>
                              <li>Displaying numerical data. Instead, use a Badge.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Variants */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Variants</h3>
                        <p className="text-sm text-muted-foreground">
                          Tags come in multiple color variants to help differentiate categories or convey meaning. Choose variants that align with your categorization system.
                        </p>
                      </div>

                      {/* Behavior - Icons */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Icons</h3>
                        <p className="text-sm text-muted-foreground">
                          Tags can include icons to provide additional visual cues. Icons can be placed before the text or used as a removable close button.
                        </p>
                      </div>

                      {/* Behavior - Inline positioning */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Inline positioning</h3>
                        <p className="text-sm text-muted-foreground">
                          Tags can be positioned inline with text or grouped together. When multiple tags are used, maintain consistent spacing between them.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'text-field' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Text Field when a short, typed response is required from the user.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Long-form content is expected. Instead, use a Textarea.</li>
                              <li>The input is for searching. Instead, use a Search Field.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Sizes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Text Fields are available in small, medium, and large sizes. Select the size based on your interface hierarchy and the importance of the input.
                        </p>
                      </div>

                      {/* Behavior - Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          Include helper text below the field to provide additional context, formatting requirements, or examples of expected input.
                        </p>
                      </div>

                      {/* Behavior - Error state */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error state</h3>
                        <p className="text-sm text-muted-foreground">
                          When validation fails, display an error state with a descriptive message explaining what went wrong and how to fix it.
                        </p>
                      </div>

                      {/* Behavior - Icon at start */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Icon at start</h3>
                        <p className="text-sm text-muted-foreground">
                          An icon can be placed at the start of the field to provide additional context about the expected input type, such as a calendar icon for dates.
                        </p>
                      </div>

                      {/* Behavior - Password type */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Password type</h3>
                        <p className="text-sm text-muted-foreground">
                          Text Fields can be configured as password type to mask sensitive input. Include a toggle to show/hide the password for user convenience.
                        </p>
                      </div>

                      {/* Behavior - Size */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Size</h3>
                        <p className="text-sm text-muted-foreground">
                          The width of the Text Field should reflect the expected length of the input. Shorter fields for brief inputs like zip codes, longer for email addresses.
                        </p>
                      </div>

                      {/* Behavior - Interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Interaction</h3>
                        <p className="text-sm text-muted-foreground">
                          Text Fields gain focus when clicked and show a focus ring. They support keyboard navigation and standard text editing shortcuts.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'textarea' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Textarea when long-form content wrapped into multiple lines is expected from the user.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>A short typed response is sufficient. Instead, use a Text Field.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Default rows and resizing */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Default rows and resizing</h3>
                        <p className="text-sm text-muted-foreground">
                          Textareas default to 3 rows of visible text and are resizable by default. Users can drag the bottom-right corner to adjust the height as needed.
                        </p>
                      </div>

                      {/* Behavior - Resizing options */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Resizing options</h3>
                        <p className="text-sm text-muted-foreground">
                          Textareas can be configured to resize vertically only, horizontally only, in both directions, or be fixed at a specific size depending on the use case.
                        </p>
                      </div>

                      {/* Behavior - Size */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Size</h3>
                        <p className="text-sm text-muted-foreground">
                          Textareas are available in small, medium, and large sizes. The size affects font size and padding, while the number of visible rows can be configured independently.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'toast' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Toast to provide feedback without interrupting the user's workflow. Messages should be brief, ideally fewer than 5 words with a maximum of 10 words.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>User interaction or consent is required. Instead, use a Modal.</li>
                              <li>Guiding users through a multi-step task. Instead, use inline guidance or a wizard.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Variants */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Variants</h3>
                        <p className="text-sm text-muted-foreground">
                          Toasts come in multiple variants including success, error, warning, and info to communicate the type of feedback being provided.
                        </p>
                      </div>

                      {/* Behavior - Optional actions */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Optional actions</h3>
                        <p className="text-sm text-muted-foreground">
                          Toasts can include up to 2 action buttons for quick interactions like "Undo" or "View details". Keep actions simple and relevant to the message.
                        </p>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <p className="text-sm text-muted-foreground">
                          Toasts have a minimum width of 210px and a maximum width of 400px. The width adjusts based on content while staying within these bounds.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'tooltip' ? (
                    <>
                      {/* Usage */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Usage</h3>
                        <div className="space-y-4 text-sm">
                          <p className="text-muted-foreground">
                            Use a Tooltip for short, text-only, inline descriptions of an element's purpose or function.
                          </p>
                          <div>
                            <p className="font-medium text-foreground mb-2">Do not use when:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                              <li>Actions or steps are needed. Instead, use a Popover.</li>
                              <li>Images or long text are required. Instead, use a Popover.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Behavior - Position */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Position</h3>
                        <p className="text-sm text-muted-foreground">
                          Tooltips can be positioned above, below, left, or right of the trigger element. They automatically reposition if there isn't enough space in the preferred direction.
                        </p>
                      </div>

                      {/* Behavior - Appearing */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Appearing</h3>
                        <p className="text-sm text-muted-foreground">
                          Tooltips appear after a 0.2 second delay when hovering over or focusing the trigger element. This delay prevents tooltips from appearing during quick mouse movements.
                        </p>
                      </div>

                      {/* Behavior - Width */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Width</h3>
                        <p className="text-sm text-muted-foreground">
                          Tooltips have a maximum width of 200px. Text wraps to multiple lines if needed, but keep content concise to maintain readability.
                        </p>
                      </div>

                      {/* Behavior - Height */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Height</h3>
                        <p className="text-sm text-muted-foreground">
                          Tooltip height adjusts automatically based on content. Keep messages brief to avoid overly tall tooltips that are difficult to read.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Generic Design content for other components */}
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
                    </>
                  )}
                </div>
              )}

              {activeTab === 'Accessibility' && (
                <div className="space-y-8">
                  {componentId === 'button' ? (
                    <>
                      {/* Overview */}
                      <div>
                        <p className="text-sm text-muted-foreground">
                          A Button is accessible to screen readers and included in a surface's focus order. The label should clearly describe the action.
                        </p>
                      </div>

                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityLabel</code> prop to explain any visually communicated information for people who use screen readers. For example, a <span className="font-semibold">Remove</span> Button in a table may have an <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityLabel</code> that says "Remove Microsoft Teams from blocked list."
                        </p>
                      </div>

                      {/* Focus Order */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Focus order</h3>
                        <p className="text-sm text-muted-foreground">
                          On rare occasions, it may be helpful to alter the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">tabIndex</code> of a Button. If the tab order is altered, it should follow a logical order that follows the visual order throughout the page: top to bottom and left to right. Consider the visual layout and a user's expectations when altering the tab order of a Button.
                        </p>
                      </div>

                      {/* Buttons for pop-ups */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Buttons for pop-ups</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          If a Button is used to show a dialog, like a Popover or Modal, the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityHasPopup</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityControls</code> props must be applied.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-1">
                          <li><code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityControls</code> should match the ID of the dialog.</li>
                          <li><code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityHasPopup</code> should be <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">true</code>.</li>
                        </ul>
                      </div>

                      {/* Keyboard Interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden text-sm">
                          <div className="flex border-b border-border bg-muted/30">
                            <div className="w-40 px-4 py-3 font-semibold text-foreground">Key</div>
                            <div className="flex-1 px-4 py-3 font-semibold text-foreground">Expected result</div>
                          </div>
                          <div className="flex border-b border-border">
                            <div className="w-40 px-4 py-3 text-foreground">
                              <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                            </div>
                            <div className="flex-1 px-4 py-3 text-muted-foreground">Moves focus to the Button.</div>
                          </div>
                          <div className="flex">
                            <div className="w-40 px-4 py-3 text-foreground">
                              <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Space</kbd> or <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Enter</kbd>
                            </div>
                            <div className="flex-1 px-4 py-3 text-muted-foreground">Activates the Button.</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'accordion' ? (
                    <>
                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses active accordion; moves sequentially top to bottom</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Space</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Expands or collapses focused accordion</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'badge' ? (
                    <>
                      {/* Screen reader */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Screen reader</h3>
                        <p className="text-sm text-muted-foreground">
                          For badges displaying 99+ or 1K+, screen readers should read the displayed value followed by the actual count to provide context to users.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'checkbox' ? (
                    <>
                      {/* Labels and legends */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels and legends</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">legendDisplay="hidden"</code> to hide the legend while keeping it accessible to screen readers.
                          </p>
                          <p>
                            Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">labelDisplay="hidden"</code> to hide individual checkbox labels while maintaining accessibility.
                          </p>
                        </div>
                      </div>

                      {/* Disabling options */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Disabling options</h3>
                        <p className="text-sm text-muted-foreground">
                          Individual checkbox options can be disabled to prevent user interaction while remaining visible in the interface.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses checkbox or checkbox group</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects or deselects the focused checkbox</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'combobox' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">labelDisplay="hidden"</code> to hide the label while keeping it accessible to screen readers.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Down arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Opens the list and focuses the first item</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Up arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Opens the list and focuses the last item</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects the highlighted item</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the list</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Tab</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Shift+Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the list and moves focus to the next or previous element</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'link' ? (
                    <>
                      {/* Visual distinction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Visual distinction</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            Links must stand out from adjacent content with either a 3:1 contrast ratio with surrounding text OR underlining.
                          </p>
                          <p>
                            Inline links should always be underlined to clearly distinguish them from surrounding text.
                          </p>
                        </div>
                      </div>

                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">accessibilityLabel</code> to provide additional context for screen reader users when the link text alone may not be sufficient.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the link</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'modal' ? (
                    <>
                      {/* Focus order */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Focus order</h3>
                        <p className="text-sm text-muted-foreground">
                          The modal container receives focus when opened, ensuring keyboard users are immediately aware of the context change.
                        </p>
                      </div>

                      {/* Role */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Role</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">role="alertdialog"</code> for modals that display errors or require confirmation from users.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the modal</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves through focusable elements within the modal (loops back to first element)</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Space</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the focused action or button</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'popover' ? (
                    <>
                      {/* Focus order */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Focus order</h3>
                        <p className="text-sm text-muted-foreground">
                          An accessibility label is required for proper focus management within the popover.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves through focusable elements (loops back to first element)</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Enter</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the focused action</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the popover</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'radio-group' ? (
                    <>
                      {/* Labels and legends */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels and legends</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">legendDisplay="hidden"</code> to hide the legend while keeping it accessible to screen readers.
                        </p>
                      </div>

                      {/* Disabling options */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Disabling options</h3>
                        <p className="text-sm text-muted-foreground">
                          Individual radio options can be disabled to prevent user interaction while remaining visible in the interface.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Tab</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Shift+Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves focus into the radio group</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Down arrow</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Right arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves to the next radio option</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Up arrow</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Left arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves to the previous radio option</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects or deselects the focused radio option</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'search-field' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            Labels can be visible or hidden. When using a hidden label, a placeholder is required to provide context to users.
                          </p>
                        </div>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses the input field; moves to clear button when present</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Clears the value (on clear button) or activates the onSubmit handler</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Clears the value when clear button is focused</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Clears the input value</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'select' ? (
                    <>
                      {/* Affordance */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Visual affordance</h3>
                        <p className="text-sm text-muted-foreground">
                          An independent visual affordance should be available to indicate that the select component is interactive.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses the select component</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Up arrow</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Down arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Opens the list and navigates through options</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Page Up</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Page Down</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves through options in increments of 10</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <span className="text-xs font-mono bg-muted rounded border border-border px-2 py-1">Letter/number keys</span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects the first matching option</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Enter</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects the highlighted option</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the list</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Home</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">End</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Jumps to the first or last option</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'switch' ? (
                    <>
                      {/* Status announcements */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Status announcements</h3>
                        <p className="text-sm text-muted-foreground">
                          Status changes should be announced to screen reader users to ensure they are aware when the switch state changes.
                        </p>
                      </div>

                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">labelDisplay="hidden"</code> to hide the label while keeping it accessible to screen readers.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves focus to the switch</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the toggle</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'tabs' ? (
                    <>
                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses the active tab</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Enter</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Selects the focused tab</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Right arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves to the next tab (loops to first)</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Left arrow</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves to the previous tab (loops to last)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'tag' ? (
                    <>
                      {/* Screen reader */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Screen reader</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            Tags are treated as plain text by screen readers. The content should be self-evident and not rely on visual presentation alone.
                          </p>
                          <p>
                            Color alone should not be used to communicate information. Always provide text or other visual cues alongside color.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'text-field' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">labelDisplay="hidden"</code> to hide the label while keeping it accessible to screen readers.
                        </p>
                      </div>

                      {/* Password fields */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Password fields</h3>
                        <p className="text-sm text-muted-foreground">
                          Password fields automatically include a show/hide button to allow users to toggle password visibility.
                        </p>
                      </div>

                      {/* Icons */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Icons</h3>
                        <p className="text-sm text-muted-foreground">
                          Icons in text fields are decorative by default and not announced to screen readers.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Focuses the input field; moves to icon button if present</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Enter</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the icon button when focused</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'textarea' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Use <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">labelDisplay="hidden"</code> to hide the label while keeping it accessible to screen readers.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves focus to the textarea</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'toast' ? (
                    <>
                      {/* Focus order */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Focus order</h3>
                        <p className="text-sm text-muted-foreground">
                          The first focusable item in a toast is usually the close button, allowing users to quickly dismiss notifications.
                        </p>
                      </div>

                      {/* Live announcer */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Live announcer</h3>
                        <p className="text-sm text-muted-foreground">
                          Toast components have a built-in live announcer that automatically notifies screen reader users when new toasts appear.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Tab</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Moves through interactive elements within the toast</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Closes the toast</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Enter</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Space</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the focused element</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'tooltip' ? (
                    <>
                      {/* Mouse accessibility */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Mouse accessibility</h3>
                        <p className="text-sm text-muted-foreground">
                          Tooltips are accessible with the mouse, appearing on hover and focus of the trigger element.
                        </p>
                      </div>

                      {/* Screen reader */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Screen reader</h3>
                        <p className="text-sm text-muted-foreground">
                          Screen readers will read the trigger element, followed by the tooltip content, and any keyboard shortcut information in sequence.
                        </p>
                      </div>

                      {/* Keyboard interaction */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard interaction</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-40">Key</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border mr-1">Space</kbd> / <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border ml-1">Enter</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Activates the tooltip on the focused element</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3">
                                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">Esc</kbd>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">Dismisses the tooltip</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Generic Accessibility content for other components */}
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
                    </>
                  )}
                </div>
              )}

              {activeTab === 'Content' && (
                <div className="space-y-8">
                  {componentId === 'button' ? (
                    <>
                      {/* Overview */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          A Button's label needs to clearly describe the action that happens when a user activates it.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Capitalize the plan name ("Pro" or "Enterprise") if used in a Button's text.
                        </p>
                      </div>

                      {/* Writing Best Practices */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Writing best practices</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use an imperative verb with a noun to provide clarity.</p>
                                  <p className="text-foreground font-medium">Download Grammarly</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use adverbs like "now" that don't provide additional context to a command.</p>
                                  <p className="text-muted-foreground font-medium">Download now</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use clear and distinct actions in paired Buttons.</p>
                                  <p className="text-foreground font-medium">Cancel subscription / Keep Pro</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use vague or similar words for opposing actions in a pair.</p>
                                  <p className="text-muted-foreground font-medium">Cancel subscription / Cancel</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use a single action per Button.</p>
                                  <p className="text-foreground font-medium">Save</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not combine two distinct actions in a single Button.</p>
                                  <p className="text-muted-foreground font-medium">Save and remember choice</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use commands that put a user in control, such as Accept, Back, Cancel, Close, Dismiss, Done, or OK.</p>
                                  <p className="text-foreground font-medium">Accept / Dismiss</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use phrases that put a user in a passive state or erode their sense of agency.</p>
                                  <p className="text-muted-foreground font-medium">Got it</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Add to dictionary</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case or ALL CAPS.</p>
                                  <p className="text-muted-foreground font-medium">ADD TO DICTIONARY</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use internal punctuation when necessary.</p>
                                  <p className="text-foreground font-medium">Re-send code</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use end punctuation, including exclamation points!</p>
                                  <p className="text-muted-foreground font-medium">Contact Support!</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'accordion' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use clear, unique labels that help users know what content is grouped inside.</p>
                                  <p className="text-foreground font-medium">Account settings</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not number labels.</p>
                                  <p className="text-muted-foreground font-medium">1. Account settings</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Order labels by priority, placing the most important item first.</p>
                                  <p className="text-foreground font-medium">Overview / Features / Pricing</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Account Settings</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Product details</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Content</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Keep content brief and scannable. A range of 45-85 characters is recommended.</p>
                          <p>If content includes a heading and the page has an H1, use H2 or H3 for the accordion heading.</p>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'badge' ? (
                    <>
                      {/* Writing best practices */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Writing best practices</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3 w-32">Accepted characters</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">Guidance</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">Numbers</td>
                                <td className="px-4 py-3 text-muted-foreground">Use numerical values to indicate counts or quantities</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">+ symbol</td>
                                <td className="px-4 py-3 text-muted-foreground">Use to indicate values beyond the maximum (e.g., 99+)</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 font-medium text-foreground">- symbol</td>
                                <td className="px-4 py-3 text-muted-foreground">Use for negative values when applicable</td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 font-medium text-foreground">%</td>
                                <td className="px-4 py-3 text-muted-foreground">Use for percentage values (up to three digits + %)</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-foreground">K</td>
                                <td className="px-4 py-3 text-muted-foreground">Use to abbreviate thousands (e.g., 1K+)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Design considerations */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Design considerations</h3>
                        <p className="text-sm text-muted-foreground">
                          When designing with badges, specify the maximum value or character count to ensure consistent rendering across different states.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'checkbox' ? (
                    <>
                      {/* Legend and labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Legend and labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep consistent structure and verb tense across all labels.</p>
                                  <p className="text-foreground font-medium">Save documents / Save images</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not vary structure between labels.</p>
                                  <p className="text-muted-foreground font-medium">Save documents / Saving images</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Enable notifications</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Enable Notifications</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep labels to a single line when possible.</p>
                                  <p className="text-foreground font-medium">Accept terms and conditions</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">State the benefit or outcome.</p>
                                  <p className="text-foreground font-medium">Get updates about new features</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use exclamation points.</p>
                                  <p className="text-muted-foreground font-medium">Get updates!</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use "Example:" to provide clarification.</p>
                                  <p className="text-foreground font-medium">Example: user@email.com</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use question marks.</p>
                                  <p className="text-muted-foreground font-medium">Need help?</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Be brief (140 characters or fewer). Use sentence case and end punctuation.</p>
                                  <p className="text-foreground font-medium">Password must be at least 8 characters.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'combobox' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use consistent structure across all labels.</p>
                                  <p className="text-foreground font-medium">Select country</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Select Country</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use singular form of nouns.</p>
                                  <p className="text-foreground font-medium">Choose file</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use plural when singular is appropriate.</p>
                                  <p className="text-muted-foreground font-medium">Choose files</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Keep to single line when possible.</p>
                                  <p className="text-foreground font-medium">Time zone</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* List items */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">List items</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Alphabetize items when possible to improve scannability.</p>
                          <p>Prioritize brevity and consistency across all list items.</p>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          State benefits, define unclear terms, make requirements clear, use "Example:" for clarification. Be brief (140 characters or fewer). Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Placeholder */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placeholder</h3>
                        <p className="text-sm text-muted-foreground">
                          Use placeholders rarely, only for nonessential information. Helper text is preferred for important guidance.
                        </p>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'link' ? (
                    <>
                      {/* Writing best practices */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Writing best practices</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use descriptive text that reflects the destination.</p>
                                  <p className="text-foreground font-medium">View privacy policy</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use generic phrases.</p>
                                  <p className="text-muted-foreground font-medium">Click here</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Explain the benefit before providing the link.</p>
                                  <p className="text-foreground font-medium">Learn more about security features</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use URLs as link text unless necessary.</p>
                                  <p className="text-muted-foreground font-medium">grammarly.com/features</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep links concise (up to 5 words in most cases).</p>
                                  <p className="text-foreground font-medium">Contact support</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Contact Support Team</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Include end punctuation for inline links.</p>
                                  <p className="text-foreground font-medium">Read the help article.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add punctuation to standalone links.</p>
                                  <p className="text-muted-foreground font-medium">View settings.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Download links */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Download links</h3>
                        <p className="text-sm text-muted-foreground">
                          Include details about the download: file type, language, and file size. Example: "Download user guide (PDF, English, 2.5 MB)"
                        </p>
                      </div>

                      {/* Accessibility */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Additional context</h3>
                        <p className="text-sm text-muted-foreground">
                          Use accessibilityLabel to include additional information that isn't visible but helps screen reader users understand the link's purpose.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'modal' ? (
                    <>
                      {/* Title */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Title</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use directive [verb]+[noun] structure.</p>
                                  <p className="text-foreground font-medium">Delete account</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Delete Account</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use question for destructive actions.</p>
                                  <p className="text-foreground font-medium">Delete this file?</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add question mark to non-questions.</p>
                                  <p className="text-muted-foreground font-medium">Save changes?</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Upload document</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                        <p className="text-sm text-muted-foreground">
                          Provides additional information to clarify the modal's purpose or context.
                        </p>
                      </div>

                      {/* Body */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Body</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Prioritize vital information. Follow Form writing guidelines for inputs. Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Footer Actions</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow Button documentation for action labels.
                        </p>
                      </div>

                      {/* Footer Multistep */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Footer Multistep</h3>
                        <p className="text-sm text-muted-foreground">
                          Use "Back" and "Next" for navigation. Use "OK" or an action verb (like "Complete" or "Save") for the last step.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'popover' ? (
                    <>
                      {/* Title */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Title</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use directive [verb]+[noun] structure.</p>
                                  <p className="text-foreground font-medium">Filter results</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Filter Results</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use direct questions when appropriate.</p>
                                  <p className="text-foreground font-medium">Need help?</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add question mark to non-questions.</p>
                                  <p className="text-muted-foreground font-medium">Settings?</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Quick actions</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Body */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Body</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Be brief (140 characters or fewer).</p>
                                  <p className="text-foreground font-medium">This setting applies to all documents.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use exclamation points.</p>
                                  <p className="text-muted-foreground font-medium">New feature available!</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use rhetorical questions to engage users.</p>
                                  <p className="text-foreground font-medium">Want to learn more?</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Want To Learn More?</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Add end punctuation even for fragments.</p>
                                  <p className="text-foreground font-medium">Updates available.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Footer */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Footer</h3>
                        <p className="text-sm text-muted-foreground">
                          Primary action follows Button documentation. For multistep popovers, use "Back" and "Next"; omit "Back" on first step; use "OK" on last step.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'radio-group' ? (
                    <>
                      {/* Legend and labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Legend and labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep consistent structure and verb tense.</p>
                                  <p className="text-foreground font-medium">Weekly / Monthly / Yearly</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not vary structure between labels.</p>
                                  <p className="text-muted-foreground font-medium">Weekly / Month / Per year</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Add specificity when needed.</p>
                                  <p className="text-foreground font-medium">Ship to billing address</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Ship To Billing Address</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Keep to single line when possible.</p>
                                  <p className="text-foreground font-medium">Standard delivery</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          State benefits, define unclear terms, make requirements clear, use "Example:" for clarification. Be brief (140 characters or fewer). Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'search-field' ? (
                    <>
                      {/* Label */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Label</h3>
                        <div className="space-y-4 text-sm">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Hidden label</h4>
                            <p className="text-muted-foreground mb-2">
                              When the label is visually hidden but provided for accessibility:
                            </p>
                            <p className="text-foreground font-medium">"Search [items]. Press Enter to search."</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Visible label</h4>
                            <p className="text-muted-foreground">
                              Follow Form input label guidelines: consistent structure, sentence case, single line preferred.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Placeholder */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placeholder</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use "Example: [item]" format to show sample input.</p>
                                  <p className="text-foreground font-medium">Example: San Francisco</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add end punctuation.</p>
                                  <p className="text-muted-foreground font-medium">Search documents.</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use "Search [items]" format.</p>
                                  <p className="text-foreground font-medium">Search products</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Search Products</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Search team members</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'select' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use consistent structure across all labels.</p>
                                  <p className="text-foreground font-medium">Billing frequency</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Billing Frequency</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use singular form of nouns.</p>
                                  <p className="text-foreground font-medium">Language</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use plural when singular is appropriate.</p>
                                  <p className="text-muted-foreground font-medium">Languages</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Keep to single line when possible.</p>
                                  <p className="text-foreground font-medium">Country or region</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* List of options */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">List of options</h3>
                        <p className="text-sm text-muted-foreground">
                          Alphabetize items when possible. Prioritize brevity and consistency across all options.
                        </p>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          State benefits, define unclear terms, make requirements clear, use "Example:" for clarification. Be brief (140 characters or fewer). Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Unselected option */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Unselected option</h3>
                        <p className="text-sm text-muted-foreground">
                          Use "Select", "Select an option", or a blank option. Apply consistently throughout your interface.
                        </p>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'switch' ? (
                    <>
                      {/* Referring to state changes */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Referring to state changes</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use "turn on" or "turn off" when describing actions.</p>
                                  <p className="text-foreground font-medium">Turn on notifications</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use "toggle" as a noun or verb.</p>
                                  <p className="text-muted-foreground font-medium">Toggle notifications</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Avoid using "switch" as a verb.</p>
                                  <p className="text-muted-foreground font-medium">Switch dark mode</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use positive phrasing.</p>
                                  <p className="text-foreground font-medium">Show password</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use negative phrasing.</p>
                                  <p className="text-muted-foreground font-medium">Hide password</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep to 3 or fewer words when possible.</p>
                                  <p className="text-foreground font-medium">Dark mode</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Dark Mode</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use consistent structure. Sentence case. Single line preferred.</p>
                                  <p className="text-foreground font-medium">Enable notifications</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Explain the benefit when the switch is on.</p>
                                  <p className="text-foreground font-medium">Receive updates about new features.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use exclamation points.</p>
                                  <p className="text-muted-foreground font-medium">Get notifications!</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use "Example:" to provide clarification.</p>
                                  <p className="text-foreground font-medium">Example: Product updates</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use question marks.</p>
                                  <p className="text-muted-foreground font-medium">Want this feature?</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Be brief (140 characters or fewer). Sentence case. End punctuation.</p>
                                  <p className="text-foreground font-medium">Sync settings across devices.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'tabs' ? (
                    <>
                      {/* Writing best practices */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Writing best practices</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Keep labels short and meaningful (1-2 words).</p>
                                  <p className="text-foreground font-medium">Overview</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not abbreviate or truncate labels.</p>
                                  <p className="text-muted-foreground font-medium">Docs...</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use nouns or noun phrases.</p>
                                  <p className="text-foreground font-medium">Settings</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use verb phrases.</p>
                                  <p className="text-muted-foreground font-medium">View settings</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use unique labels for each tab.</p>
                                  <p className="text-foreground font-medium">Profile / Security / Billing</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not number tabs.</p>
                                  <p className="text-muted-foreground font-medium">1. Profile / 2. Security</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Order by priority (left to right, most frequent first).</p>
                                  <p className="text-foreground font-medium">All / Active / Archived</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add end punctuation.</p>
                                  <p className="text-muted-foreground font-medium">Settings.</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">Account details</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Account Details</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'tag' ? (
                    <>
                      {/* Writing best practices */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Writing best practices</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use one or two words only.</p>
                                  <p className="text-foreground font-medium">In progress</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use long phrases.</p>
                                  <p className="text-muted-foreground font-medium">Currently in progress</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case.</p>
                                  <p className="text-foreground font-medium">New feature</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">New Feature</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use fragments without end punctuation.</p>
                                  <p className="text-foreground font-medium">Urgent</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add end punctuation.</p>
                                  <p className="text-muted-foreground font-medium">Urgent.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : componentId === 'text-field' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use consistent structure across all labels.</p>
                                  <p className="text-foreground font-medium">First name</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">First Name</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use singular form of nouns.</p>
                                  <p className="text-foreground font-medium">Email address</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use plural when singular is appropriate.</p>
                                  <p className="text-muted-foreground font-medium">Email addresses</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Keep to single line when possible.</p>
                                  <p className="text-foreground font-medium">Phone number</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          State benefits, define unclear terms, make requirements clear, use "Example:" for clarification. Be brief (140 characters or fewer). Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Placeholder */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placeholder</h3>
                        <p className="text-sm text-muted-foreground">
                          Use placeholders rarely, only for nonessential information. Helper text is preferred for important guidance.
                        </p>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'textarea' ? (
                    <>
                      {/* Labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Labels</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use consistent structure across all labels.</p>
                                  <p className="text-foreground font-medium">Description</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use Title Case.</p>
                                  <p className="text-muted-foreground font-medium">Description</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use singular form of nouns.</p>
                                  <p className="text-foreground font-medium">Comment</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use plural when singular is appropriate.</p>
                                  <p className="text-muted-foreground font-medium">Comments</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Keep to single line when possible.</p>
                                  <p className="text-foreground font-medium">Additional notes</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Helper text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Helper text</h3>
                        <p className="text-sm text-muted-foreground">
                          State benefits, define unclear terms, make requirements clear, use "Example:" for clarification. Be brief (140 characters or fewer). Use sentence case and end punctuation.
                        </p>
                      </div>

                      {/* Placeholder */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Placeholder</h3>
                        <p className="text-sm text-muted-foreground">
                          Use placeholders rarely, only for nonessential information. Helper text is preferred for important guidance.
                        </p>
                      </div>

                      {/* Error messages */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Error messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow form error message patterns for validation feedback.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'toast' ? (
                    <>
                      {/* Text */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Text</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Limit to 5 words or fewer (10 maximum). User should read in under 3 seconds.</p>
                                  <p className="text-foreground font-medium">File uploaded.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use exclamation points.</p>
                                  <p className="text-muted-foreground font-medium">Success!</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use simple past for completed actions.</p>
                                  <p className="text-foreground font-medium">Changes saved.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use question marks.</p>
                                  <p className="text-muted-foreground font-medium">Saved?</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use -ing form only for in-progress actions.</p>
                                  <p className="text-foreground font-medium">Uploading file...</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use unnecessary articles, pronouns, or adverbs.</p>
                                  <p className="text-muted-foreground font-medium">Your file was uploaded successfully.</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Always use end punctuation.</p>
                                  <p className="text-foreground font-medium">Update complete.</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Action labels */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Action labels</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow Button and Link writing documentation for action labels within toasts.
                        </p>
                      </div>
                    </>
                  ) : componentId === 'tooltip' ? (
                    <>
                      {/* Tooltips */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Tooltips</h3>
                        <div className="rounded-xl border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b border-border">
                                <th className="text-left font-semibold text-foreground px-4 py-3">✓ Do</th>
                                <th className="text-left font-semibold text-foreground px-4 py-3">✗ Don't</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Make clear the functionality or purpose of an element.</p>
                                  <p className="text-foreground font-medium">Bold text</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not use rich formatting or long text.</p>
                                  <p className="text-muted-foreground font-medium">Click here to make your text bold</p>
                                </td>
                              </tr>
                              <tr className="border-b border-border bg-muted/10">
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Provide only nonessential information.</p>
                                  <p className="text-foreground font-medium">Share document</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not include critical information users need.</p>
                                  <p className="text-muted-foreground font-medium">Required: Enter password</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Use sentence case. Add period only if complete sentence.</p>
                                  <p className="text-foreground font-medium">Save changes</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <p className="text-muted-foreground mb-2">Do not add period to fragments.</p>
                                  <p className="text-muted-foreground font-medium">Save changes.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Keyboard shortcuts */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard shortcuts</h3>
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p>Display keyboard shortcuts dynamically based on the user's operating system.</p>
                          <div>
                            <p className="font-semibold text-foreground mb-2">Shorten these keys:</p>
                            <p>Ctrl, Alt, Del, Esc, Fn</p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-2">Spell out these keys:</p>
                            <p>Tab, Enter, Return, Shift, Option, End, Home, Windows key</p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-2">Use symbols only for:</p>
                            <p>Command (⌘) and arrow keys</p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-2">Combinations:</p>
                            <p>Use + with no spaces (e.g., Ctrl+C, ⌘+S)</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Generic Content guidelines for other components */}
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
                    </>
                  )}
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
