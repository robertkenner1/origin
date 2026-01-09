import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';

export interface ComponentControls {
  variant?: string;
  size?: string;
  state?: string;
  disabled?: boolean;
  label?: string;
  width?: string;
}

interface ComponentPreviewProps {
  type: string;
  controls?: ComponentControls;
  interactive?: boolean; // Whether to enable full interactivity (detail page) vs static (gallery)
}

export function ComponentPreview({ type, controls, interactive = true }: ComponentPreviewProps) {
  const { 
    variant = 'primary', 
    size = 'medium', 
    state = 'rest',
    disabled = false, 
    label = 'Button',
    width = 'fixed'
  } = controls || {};
  
  const isDisabled = disabled || state === 'disabled';
  const isLoading = state === 'loading';
  const isFocus = state === 'focus';

  // Internal state for interactive components
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [switchOn, setSwitchOn] = useState(variant === 'on');
  const [activeTab, setActiveTab] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState(variant === 'checked');
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('Option 1');
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('');
  const [comboboxSelected, setComboboxSelected] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [radioSelected, setRadioSelected] = useState(0);
  const [checkboxGroupState, setCheckboxGroupState] = useState([true, false, false]);
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [toastVisible, setToastVisible] = useState(true);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');

  switch (type) {
    case 'accordion':
      return (
        <InteractiveAccordion 
          interactive={interactive} 
          disabled={isDisabled}
          size={size}
          openIndex={accordionOpen}
          onToggle={(i) => interactive && !isDisabled && setAccordionOpen(accordionOpen === i ? null : i)}
        />
      );

    case 'badge':
      return (
        <div className={cn(
          "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold",
          variant === 'neutral' && "bg-[#73716d] text-white",
          variant === 'brand' && "bg-[#714cb6] text-white",
          variant === 'addition' && "bg-[#027e6f] text-white",
          variant === 'critical' && "bg-[#ee5a29] text-white",
          variant === 'success' && "bg-[#027e6f] text-white",
          variant === 'premium' && "bg-gradient-to-r from-[#ffbf47] to-[#ff9500] text-[#141413]",
          variant === 'pro' && "bg-[#ffbf47] text-[#141413]",
          variant === 'warning' && "bg-[#ffbf47] text-[#141413]",
          // Fallback for old variants
          variant === 'primary' && "bg-[#714cb6] text-white",
          variant === 'secondary' && "bg-[#73716d] text-white",
          variant === 'error' && "bg-[#ee5a29] text-white",
        )}>
          {label || '5'}
        </div>
      );

    case 'loader':
      return (
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#d4c7ff] to-[#b8a5f0]" />
      );

    case 'button':
      return (
        <Button 
          className={cn(
            "font-semibold rounded-lg transition-all relative",
            // Variants with built-in hover/active
            variant === 'primary' && "bg-[#714cb6] text-white hover:bg-[#5f3fa0] active:bg-[#4a3080] active:scale-[0.98]",
            variant === 'secondary' && "bg-transparent border border-[#714cb6] text-[#714cb6] hover:bg-[#714cb6]/10 active:bg-[#714cb6]/20 active:scale-[0.98]",
            variant === 'tertiary' && "bg-transparent text-[#714cb6] hover:bg-[#714cb6]/10 active:bg-[#714cb6]/20 active:scale-[0.98]",
            variant === 'ghost' && "bg-transparent text-foreground hover:bg-muted active:bg-muted/80 active:scale-[0.98]",
            variant === 'premium' && "bg-gradient-to-r from-[#ffbf47] to-[#ff9500] text-[#141413] hover:from-[#ffc85c] hover:to-[#ffa319] active:scale-[0.98]",
            variant === 'critical' && "bg-[#ee5a29] text-white hover:bg-[#d94a1a] active:bg-[#c43d15] active:scale-[0.98]",
            variant === 'pro' && "bg-[#ffbf47] text-[#141413] hover:bg-[#ffc85c] active:scale-[0.98]",
            variant === 'enterprise' && "bg-[#714cb6] text-white hover:bg-[#5f3fa0] active:scale-[0.98]",
            // Focus state (forced)
            isFocus && "ring-2 ring-[#714cb6] ring-offset-2",
            // Sizes (Origin sizes)
            size === 'small' && "px-3 py-1 text-sm h-8",
            size === 'medium' && "px-4 py-2 text-sm h-9",
            size === 'large' && "px-5 py-2.5 h-10",
            size === 'xlarge' && "px-6 py-3 text-base h-11",
            size === '2xlarge' && "px-7 py-3.5 text-base h-12",
            size === '3xlarge' && "px-8 py-4 text-lg h-14",
            size === '4xlarge' && "px-10 py-5 text-lg h-16",
            // Width
            width === 'full' && "w-full",
            // Disabled
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
            // Loading
            isLoading && "cursor-wait"
          )}
          disabled={isDisabled}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {label}
            </span>
          ) : label}
        </Button>
      );

    case 'button-link':
      return (
        <Button 
          className={cn(
            "font-semibold rounded-lg underline",
            variant === 'primary' && "bg-[#714cb6] hover:bg-[#5f3fa0] text-white",
            variant === 'secondary' && "bg-transparent text-[#714cb6] hover:bg-[#714cb6]/10",
            size === 'sm' && "px-3 py-1 text-sm h-8",
            size === 'md' && "px-6 py-2 h-10",
            size === 'lg' && "px-8 py-3 text-lg h-12",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          {label || 'ButtonAsLink'}
        </Button>
      );

    case 'checkbox':
      return (
        <InteractiveCheckbox
          interactive={interactive}
          disabled={isDisabled}
          checked={checkboxChecked}
          onToggle={() => interactive && !isDisabled && setCheckboxChecked(!checkboxChecked)}
          label={label}
          isFocus={isFocus}
          size={size}
        />
      );

    case 'checkbox-group':
      return (
        <InteractiveCheckboxGroup
          interactive={interactive}
          disabled={isDisabled}
          checkedState={checkboxGroupState}
          onToggle={(i) => {
            if (interactive && !isDisabled) {
              const newState = [...checkboxGroupState];
              newState[i] = !newState[i];
              setCheckboxGroupState(newState);
            }
          }}
        />
      );

    case 'circular-loader':
      return (
        <div className={cn(
          "animate-spin rounded-full border-2 border-t-transparent",
          // Sizes
          size === 'small' && "h-4 w-4 border-2",
          size === 'medium' && "h-6 w-6 border-2",
          size === 'large' && "h-10 w-10 border-3",
          // Variant colors
          variant === 'default' && "border-[#714cb6]",
          variant === 'inverse' && "border-white",
          // Fallback
          !variant && "border-[#714cb6]",
        )} />
      );

    case 'combobox':
      return (
        <InteractiveCombobox
          interactive={interactive}
          disabled={isDisabled}
          isOpen={comboboxOpen}
          value={comboboxValue}
          selected={comboboxSelected}
          onToggle={() => interactive && !isDisabled && setComboboxOpen(!comboboxOpen)}
          onInputChange={(v) => setComboboxValue(v)}
          onSelect={(v) => { setComboboxSelected(v); setComboboxValue(v); setComboboxOpen(false); }}
          variant={variant}
        />
      );

    case 'form':
      return (
        <InteractiveForm
          interactive={interactive}
          disabled={isDisabled}
          nameValue={formName}
          emailValue={formEmail}
          onNameChange={(v) => interactive && setFormName(v)}
          onEmailChange={(v) => interactive && setFormEmail(v)}
        />
      );

    case 'icon': {
      const iconColorClass: Record<string, string> = {
        default: 'text-foreground',
        inverse: 'text-white',
        brand: 'text-[#714cb6]',
        business: 'text-[#714cb6]',
        addition: 'text-[#027e6f]',
        critical: 'text-[#ee5a29]',
        deletion: 'text-[#ee5a29]',
        success: 'text-[#027e6f]',
        premium: 'text-[#ffbf47]',
        pro: 'text-[#ffbf47]',
        warning: 'text-[#ffbf47]',
        inherit: 'text-inherit',
      };
      return (
        <svg className={cn(
          iconColorClass[variant] || 'text-foreground',
          size === 'small' && "h-4 w-4",
          size === 'medium' && "h-6 w-6",
          size === 'large' && "h-8 w-8",
        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }

    case 'icon-button':
      return (
        <button className={cn(
          "flex items-center justify-center rounded-lg transition-all relative cursor-pointer",
          // Variants with built-in hover/active
          variant === 'primary' && "bg-[#714cb6] hover:bg-[#5f3fa0] active:bg-[#4a3080] active:scale-[0.95]",
          variant === 'secondary' && "bg-transparent border border-[#714cb6] hover:bg-[#714cb6]/10 active:bg-[#714cb6]/20 active:scale-[0.95]",
          variant === 'tertiary' && "bg-transparent hover:bg-muted active:bg-muted/80 active:scale-[0.95]",
          variant === 'ghost' && "bg-transparent hover:bg-muted active:bg-muted/80 active:scale-[0.95]",
          variant === 'premium' && "bg-gradient-to-r from-[#ffbf47] to-[#ff9500] hover:from-[#ffc85c] hover:to-[#ffa319] active:scale-[0.95]",
          // Focus (forced)
          isFocus && "ring-2 ring-[#714cb6] ring-offset-2",
          // Sizes (Origin sizes)
          size === 'small' && "h-8 w-8",
          size === 'medium' && "h-10 w-10",
          size === 'large' && "h-12 w-12",
          size === 'xlarge' && "h-14 w-14",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          isLoading && "cursor-wait"
        )}>
          {isLoading ? (
            <svg className={cn(
              "animate-spin",
              size === 'small' && "h-4 w-4",
              size === 'medium' && "h-5 w-5",
              size === 'large' && "h-6 w-6",
              size === 'xlarge' && "h-7 w-7",
              variant === 'primary' ? "text-white" : variant === 'premium' ? "text-[#141413]" : "text-[#714cb6]"
            )} viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className={cn(
              size === 'small' && "h-4 w-4",
              size === 'medium' && "h-5 w-5",
              size === 'large' && "h-6 w-6",
              size === 'xlarge' && "h-7 w-7",
              variant === 'primary' ? "text-white" : variant === 'premium' ? "text-[#141413]" : "text-[#714cb6]"
            )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      );

    case 'illustration':
      return (
        <div className="flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 64 64" className="h-full w-full">
            <circle cx="32" cy="28" r="12" fill="#ff4d45" />
            <rect x="16" y="38" width="32" height="20" rx="4" fill="#f5f5f5" stroke="#141413" strokeWidth="2" />
            <circle cx="26" cy="48" r="6" fill="#00e6e6" stroke="#141413" strokeWidth="1.5" />
            <circle cx="38" cy="48" r="6" fill="#00e6e6" stroke="#141413" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'link':
      return (
        <span className="border-b-2 border-[#714cb6] text-[#714cb6]">{label || 'Link'}</span>
      );

    case 'logo':
      return (
        <div className="flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#027e6f]">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ee5a29]" />
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4c7ff]" />
        </div>
      );

    case 'menu':
      return (
        <InteractiveMenu
          interactive={interactive}
          disabled={isDisabled}
          isOpen={menuOpen}
          onToggle={() => interactive && !isDisabled && setMenuOpen(!menuOpen)}
          onClose={() => setMenuOpen(false)}
        />
      );

    case 'modal':
      return (
        <InteractiveModal
          interactive={interactive}
          isOpen={modalOpen}
          onOpen={() => interactive && setModalOpen(true)}
          onClose={() => setModalOpen(false)}
          width={controls?.width || size || 'medium'}
        />
      );

    case 'plan-tag': {
      const planConfig: Record<string, { bg: string; text: string; icon?: boolean }> = {
        free: { bg: 'bg-[#f2f0eb]', text: 'text-foreground' },
        pro: { bg: 'bg-[#ffbf47]', text: 'text-[#141413]', icon: true },
        enterprise: { bg: 'bg-[#714cb6]', text: 'text-white' },
        edu: { bg: 'bg-[#00e6e6]', text: 'text-[#141413]' },
        business: { bg: 'bg-[#714cb6]', text: 'text-white' },
        premium: { bg: 'bg-gradient-to-r from-[#ffbf47] to-[#ff9500]', text: 'text-[#141413]', icon: true },
      };
      const config = planConfig[variant] || planConfig.free;
      const displayName = variant.charAt(0).toUpperCase() + variant.slice(1);
      
      return (
        <div className={cn(
          "inline-flex items-center gap-1 rounded-br-2xl rounded-tl-2xl rounded-tr-2xl px-4 py-1.5 font-medium",
          config.bg,
          config.text
        )}>
          {config.icon && (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          <span>{displayName}</span>
        </div>
      );
    }

    case 'popover':
      return (
        <InteractivePopover
          interactive={interactive}
          isOpen={popoverOpen}
          onToggle={() => interactive && setPopoverOpen(!popoverOpen)}
          onClose={() => setPopoverOpen(false)}
        />
      );

    case 'radio-group':
      return (
        <InteractiveRadioGroup
          interactive={interactive}
          disabled={isDisabled}
          selected={radioSelected}
          onSelect={(i) => interactive && !isDisabled && setRadioSelected(i)}
          isFocus={isFocus}
          size={size}
          layout={controls?.variant === 'horizontal' ? 'row' : 'column'}
        />
      );

    case 'rating':
      return (
        <InteractiveRating
          interactive={interactive}
          value={rating}
          hoverValue={ratingHover}
          onRate={(v) => interactive && setRating(v)}
          onHover={(v) => interactive && setRatingHover(v)}
        />
      );

    case 'search':
      return (
        <InteractiveSearchField
          interactive={interactive}
          disabled={isDisabled}
          value={searchValue}
          onChange={(v) => interactive && setSearchValue(v)}
          isFocus={isFocus}
        />
      );

    case 'select':
      return (
        <InteractiveSelect
          interactive={interactive}
          disabled={isDisabled}
          isOpen={selectOpen}
          value={selectValue}
          onToggle={() => interactive && !isDisabled && setSelectOpen(!selectOpen)}
          onSelect={(v) => { setSelectValue(v); setSelectOpen(false); }}
          variant={variant}
        />
      );

    case 'skeleton':
      return (
        <div className="w-40 space-y-2 rounded-lg bg-white p-3">
          <div className="h-3 w-3/4 animate-pulse rounded bg-[#f2f0eb]" />
          <div className="h-3 w-full animate-pulse rounded bg-[#f2f0eb]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-[#f2f0eb]" />
        </div>
      );

    case 'sticker':
      return (
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full font-bold text-lg",
          variant === 'default' && "bg-[#ffbf47] text-[#141413]",
          variant === 'inverse' && "bg-[#292827] text-white",
        )}>
          50%
        </div>
      );

    case 'switch':
      return (
        <InteractiveSwitch
          interactive={interactive}
          disabled={isDisabled}
          isOn={switchOn}
          onToggle={() => interactive && !isDisabled && setSwitchOn(!switchOn)}
          label={label}
        />
      );

    case 'tabs':
      return (
        <InteractiveTabs
          interactive={interactive}
          activeIndex={activeTab}
          onTabClick={(i) => interactive && setActiveTab(i)}
          size={size}
        />
      );

    case 'tag':
      return (
        <div className={cn(
          "rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1",
          variant === 'neutral' && "bg-[#f2f0eb] text-foreground",
          variant === 'premium' && "bg-gradient-to-r from-[#ffbf47] to-[#ff9500] text-[#141413]",
          variant === 'pro' && "bg-[#ffbf47] text-[#141413]",
          variant === 'tip' && "bg-[#e6fdfd] text-[#006666]",
          variant === 'addition' && "bg-[#e6f7f5] text-[#027e6f]",
          variant === 'warning' && "bg-[#fff5e6] text-[#cc7a00]",
          variant === 'deletion' && "bg-[#fce8e8] text-[#ee5a29]",
          // Fallback for old variants
          variant === 'default' && "bg-[#f2f0eb] text-foreground",
          variant === 'primary' && "bg-[#714cb6] text-white",
          variant === 'success' && "bg-[#027e6f] text-white",
          variant === 'error' && "bg-[#ee5a29] text-white",
        )}>
          {(variant === 'premium' || variant === 'pro') && (
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          {label || 'Label'}
        </div>
      );

    case 'text-field':
      return (
        <InteractiveTextField
          interactive={interactive}
          disabled={isDisabled}
          value={textFieldValue}
          onChange={(v) => interactive && setTextFieldValue(v)}
          variant={variant}
          isFocus={isFocus}
        />
      );

    case 'textarea':
      return (
        <InteractiveTextarea
          interactive={interactive}
          disabled={isDisabled}
          value={textareaValue}
          onChange={(v) => interactive && setTextareaValue(v)}
          variant={variant}
          isFocus={isFocus}
        />
      );

    case 'toast':
      return (
        <InteractiveToast
          interactive={interactive}
          isVisible={toastVisible}
          onDismiss={() => interactive && setToastVisible(false)}
          onShow={() => setToastVisible(true)}
          variant={variant}
          label={label}
        />
      );

    case 'tooltip':
      return (
        <InteractiveTooltip
          interactive={interactive}
          isVisible={tooltipVisible}
          onMouseEnter={() => interactive && setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          label={label}
        />
      );

    case 'verification':
      return (
        <div className="flex gap-2">
          {['3', '8', '1', '4', '2', '9'].map((digit, i) => (
            <div key={i} className={cn(
              "flex h-8 w-6 items-center justify-center rounded border bg-white text-sm font-medium",
              disabled ? "border-[#dedbd5] text-muted-foreground" : "border-[#8d8a86]"
            )}>
              {digit}
            </div>
          ))}
        </div>
      );

    // Utility Components - Code Preview Style
    case 'box':
      return (
        <UtilityCodePreview code={`<Box
  padding="16"
  backgroundColor="surface"
>
  {children}
</Box>`} />
      );

    case 'flex':
      return (
        <UtilityCodePreview code={`<Flex
  direction="row"
  gap="8"
  align="center"
>
  {children}
</Flex>`} />
      );

    case 'text':
      return (
        <UtilityCodePreview code={`<Text
  size="medium"
  color="primary"
>
  Hello world
</Text>`} />
      );

    case 'heading':
      return (
        <UtilityCodePreview code={`<Heading
  level={2}
  size="large"
>
  Page Title
</Heading>`} />
      );

    case 'theme-provider':
      return (
        <UtilityCodePreview code={`<ThemeProvider
  theme="light"
>
  <App />
</ThemeProvider>`} />
      );

    case 'portal-provider':
      return (
        <UtilityCodePreview code={`<PortalContainerProvider
  container={ref}
>
  {children}
</PortalContainerProvider>`} />
      );

    case 'screen-reader-only':
      return (
        <UtilityCodePreview code={`<ScreenReaderOnly>
  Hidden label for
  accessibility
</ScreenReaderOnly>`} />
      );

    case 'live-announcer':
      return (
        <UtilityCodePreview code={`<LiveAnnouncer
  message={status}
  politeness="polite"
/>`} />
      );

    default:
      return (
        <div className="h-12 w-12 rounded-lg bg-muted" />
      );
  }
}

// Utility Code Preview Component
function UtilityCodePreview({ code }: { code: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CodeBlock showCopy={false} className="bg-transparent">
        <pre className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
          <code className="block whitespace-pre text-foreground">{code}</code>
        </pre>
      </CodeBlock>
    </div>
  );
}

// Interactive Accordion Component
function InteractiveAccordion({ 
  interactive, 
  disabled, 
  openIndex, 
  onToggle,
  size = 'medium'
}: { 
  interactive: boolean;
  disabled: boolean;
  openIndex: number | null;
  onToggle: (index: number) => void;
  size?: string;
}) {
  const items = [
    { title: 'Getting started', content: 'Learn the basics of using this component in your project.' },
    { title: 'Configuration', content: 'Customize behavior and appearance with these options.' },
    { title: 'Examples', content: 'See real-world usage patterns and best practices.' },
  ];

  return (
    <div className={cn(
      "rounded-lg border border-[#dedbd5] bg-white overflow-hidden",
      disabled && "opacity-50",
      // Width based on size
      size === 'small' && "w-56",
      size === 'medium' && "w-64",
      size === 'large' && "w-80",
    )}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => onToggle(i)}
            disabled={disabled}
            className={cn(
              "flex w-full items-center gap-2 text-left transition-colors",
              i !== items.length - 1 && openIndex !== i && "border-b border-[#dedbd5]",
              interactive && !disabled && "hover:bg-[#f9f8f6] cursor-pointer",
              !interactive && "cursor-default",
              // Padding based on size
              size === 'small' && "px-3 py-2",
              size === 'medium' && "px-4 py-3",
              size === 'large' && "px-5 py-4",
            )}
          >
            <span className={cn(
              "flex-1 font-medium text-foreground",
              size === 'small' && "text-xs",
              size === 'medium' && "text-sm",
              size === 'large' && "text-base",
            )}>{item.title}</span>
            <svg 
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                openIndex === i && "rotate-180",
                size === 'small' && "h-3 w-3",
                size === 'medium' && "h-4 w-4",
                size === 'large' && "h-5 w-5",
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-200",
            openIndex === i ? "max-h-32" : "max-h-0"
          )}>
            <div className={cn(
              "text-muted-foreground",
              i !== items.length - 1 && "border-b border-[#dedbd5]",
              size === 'small' && "px-3 pb-2 text-xs",
              size === 'medium' && "px-4 pb-3 text-sm",
              size === 'large' && "px-5 pb-4 text-base",
            )}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Interactive Switch Component
function InteractiveSwitch({ 
  interactive, 
  disabled, 
  isOn, 
  onToggle,
  label 
}: { 
  interactive: boolean;
  disabled: boolean;
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", disabled && "opacity-50")}>
      <span className="text-sm font-medium">{label || 'Toggle setting'}</span>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors duration-200",
          isOn ? "bg-[#602639]" : "bg-[#8d8a86]",
          interactive && !disabled && "cursor-pointer",
          !interactive && "cursor-default"
        )}
      >
        <div className={cn(
          "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
          isOn && "translate-x-5"
        )} />
      </button>
    </div>
  );
}

// Interactive Tabs Component
function InteractiveTabs({ 
  interactive, 
  activeIndex, 
  onTabClick,
  size = 'medium'
}: { 
  interactive: boolean;
  activeIndex: number;
  onTabClick: (index: number) => void;
  size?: string;
}) {
  const tabs = ['Overview', 'Features', 'Pricing'];
  const tabContent = [
    'Get an overview of the product and its key benefits.',
    'Explore all the powerful features available to you.',
    'Find the perfect plan for your needs and budget.',
  ];

  return (
    <div className={cn(
      size === 'small' && "w-56",
      size === 'medium' && "w-64",
      size === 'large' && "w-80",
      size === 'xlarge' && "w-96",
      size === 'auto' && "w-auto",
    )}>
      <div className="flex gap-1 border-b border-[#dedbd5]">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => onTabClick(i)}
            className={cn(
              "font-medium transition-colors",
              activeIndex === i 
                ? "border-b-2 border-[#714cb6] text-[#714cb6]" 
                : "text-muted-foreground",
              interactive && "hover:text-foreground cursor-pointer",
              !interactive && "cursor-default",
              // Size variations
              size === 'small' && "px-2 pb-1.5 text-xs",
              size === 'medium' && "px-3 pb-2 text-sm",
              size === 'large' && "px-4 pb-2.5 text-base",
              size === 'xlarge' && "px-5 pb-3 text-lg",
              size === 'auto' && "px-4 pb-2 text-sm",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={cn(
        "text-muted-foreground",
        size === 'small' && "p-3 text-xs",
        size === 'medium' && "p-4 text-sm",
        size === 'large' && "p-5 text-base",
        size === 'xlarge' && "p-6 text-lg",
        size === 'auto' && "p-4 text-sm",
      )}>
        {tabContent[activeIndex]}
      </div>
    </div>
  );
}

// Interactive Checkbox Component
function InteractiveCheckbox({ 
  interactive, 
  disabled, 
  checked, 
  onToggle,
  label,
  isFocus,
  size = 'medium'
}: { 
  interactive: boolean;
  disabled: boolean;
  checked: boolean;
  onToggle: () => void;
  label?: string;
  isFocus?: boolean;
  size?: string;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2",
        disabled && "opacity-50",
        interactive && !disabled && "cursor-pointer",
        !interactive && "cursor-default"
      )}
    >
      <div className={cn(
        "flex items-center justify-center rounded transition-colors",
        checked ? "bg-[#602639]" : "border-2 border-[#8d8a86] bg-white",
        interactive && !disabled && !checked && "hover:border-[#602639]",
        isFocus && "ring-2 ring-[#602639] ring-offset-2",
        // Sizes
        size === 'medium' && "h-5 w-5",
        size === 'large' && "h-6 w-6",
        size === 'xlarge' && "h-7 w-7",
      )}>
        {checked && (
          <svg className={cn(
            "text-white",
            size === 'medium' && "h-3.5 w-3.5",
            size === 'large' && "h-4 w-4",
            size === 'xlarge' && "h-5 w-5",
          )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={cn(
        "font-medium",
        size === 'medium' && "text-sm",
        size === 'large' && "text-base",
        size === 'xlarge' && "text-lg",
      )}>{label || 'Accept terms and conditions'}</span>
    </button>
  );
}

// Interactive Select Component
function InteractiveSelect({
  interactive,
  disabled,
  isOpen,
  value,
  onToggle,
  onSelect,
  variant,
}: {
  interactive: boolean;
  disabled: boolean;
  isOpen: boolean;
  value: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
  variant: string;
}) {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  
  return (
    <div className={cn("relative w-48 space-y-1", disabled && "opacity-50")}>
      <span className="text-sm font-medium">Label</span>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left",
          variant === 'error' ? "border-[#ee5a29]" : "border-[#8d8a86]",
          interactive && !disabled && "cursor-pointer hover:border-[#714cb6]",
          !interactive && "cursor-default"
        )}
      >
        <span className="text-sm">{value}</span>
        <svg className={cn(
          "h-4 w-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-lg border border-[#dedbd5] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm text-left hover:bg-[#f9f8f6]",
                value === option && "bg-[#f2f0eb] font-medium"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Interactive Combobox Component
function InteractiveCombobox({
  interactive,
  disabled,
  isOpen,
  value,
  selected,
  onToggle,
  onInputChange,
  onSelect,
  variant,
}: {
  interactive: boolean;
  disabled: boolean;
  isOpen: boolean;
  value: string;
  selected: string;
  onToggle: () => void;
  onInputChange: (value: string) => void;
  onSelect: (value: string) => void;
  variant: string;
}) {
  const allOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const filteredOptions = allOptions.filter(o => 
    o.toLowerCase().includes(value.toLowerCase())
  );
  
  return (
    <div className={cn("relative w-48 space-y-1", disabled && "opacity-50")}>
      <span className="text-sm font-medium">Label</span>
      <div className={cn(
        "flex items-center rounded-lg border bg-white px-3 py-2",
        variant === 'error' ? "border-[#ee5a29]" : "border-[#8d8a86]",
        isOpen && "border-[#714cb6] ring-2 ring-[#714cb6]/20"
      )}>
        <input
          type="text"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={onToggle}
          placeholder={selected || "Search..."}
          disabled={disabled}
          className={cn(
            "flex-1 text-sm bg-transparent outline-none",
            !interactive && "pointer-events-none"
          )}
        />
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-40 overflow-auto rounded-lg border border-[#dedbd5] bg-white shadow-lg">
          {filteredOptions.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm text-left hover:bg-[#f9f8f6]",
                selected === option && "bg-[#f2f0eb] font-medium"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Interactive Modal Component
function InteractiveModal({
  interactive,
  width = 'medium',
}: {
  interactive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  width?: string;
}) {
  return (
    <div className={cn(
      "rounded-xl border border-[#dedbd5] bg-white shadow-lg",
      width === 'small' && "w-56",
      width === 'medium' && "w-72",
    )}>
      <div className="flex items-center justify-between border-b border-[#dedbd5] p-4">
        <div>
          <div className="font-semibold">Confirm action</div>
        </div>
        <button
          className={cn(
            "rounded-full p-1 text-muted-foreground",
            interactive && "hover:bg-muted cursor-pointer"
          )}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 text-sm text-muted-foreground">
        Modal content goes here.
      </div>
      <div className="flex justify-end gap-2 bg-[#fcfaf7] p-4 rounded-b-xl">
        <button 
          className={cn(
            "rounded-lg bg-[#714cb6] px-4 py-1.5 text-sm font-medium text-white",
            interactive && "hover:bg-[#5f3fa0] cursor-pointer"
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

// Interactive Tooltip Component
function InteractiveTooltip({
  label,
}: {
  interactive: boolean;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  label?: string;
}) {
  return (
    <div className="relative rounded-md bg-[#292827] px-3 py-1.5 text-xs text-white">
      {label || 'Helpful tooltip'}
      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#292827]" />
    </div>
  );
}

// Interactive Popover Component
function InteractivePopover({
  interactive,
}: {
  interactive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative w-44 rounded-xl bg-[#292827] p-3 text-white">
      <div className="text-sm font-semibold">Quick actions</div>
      <div className="text-xs text-[#bfbcb6] mb-2">Choose an option</div>
      <button 
        className={cn(
          "w-full rounded-lg bg-[#bea1f5] py-1.5 text-xs font-semibold text-[#141413]",
          interactive && "hover:bg-[#d4c7ff] cursor-pointer"
        )}
      >
        Got it
      </button>
      <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#292827]" />
    </div>
  );
}

// Interactive Menu Component
function InteractiveMenu({
  interactive,
  disabled,
}: {
  interactive: boolean;
  disabled: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className={cn("w-40 rounded-md border border-[#dedbd5] bg-white shadow-lg", disabled && "opacity-50")}>
      <button
        disabled={disabled}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm text-left",
          interactive && !disabled && "hover:bg-[#f9f8f6] cursor-pointer"
        )}
      >
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>New file</span>
      </button>
      <button
        disabled={disabled}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm text-left",
          interactive && !disabled && "hover:bg-[#f9f8f6] cursor-pointer"
        )}
      >
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span>Open folder</span>
      </button>
      <button
        disabled={disabled}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm text-left",
          interactive && !disabled && "hover:bg-[#f9f8f6] cursor-pointer"
        )}
      >
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span>Save</span>
      </button>
    </div>
  );
}

// Interactive Radio Group Component
function InteractiveRadioGroup({
  interactive,
  disabled,
  selected,
  onSelect,
  isFocus,
  size = 'medium',
  layout = 'column',
}: {
  interactive: boolean;
  disabled: boolean;
  selected: number;
  onSelect: (index: number) => void;
  isFocus?: boolean;
  size?: string;
  layout?: string;
}) {
  const options = ['All notifications', 'Important only', 'None'];
  
  return (
    <div className={cn(disabled && "opacity-50")}>
      <span className={cn(
        "font-semibold block",
        size === 'medium' && "text-sm mb-2",
        size === 'large' && "text-base mb-2.5",
        size === 'xlarge' && "text-lg mb-3",
      )}>Notifications</span>
      <div className={cn(
        layout === 'column' && "space-y-2",
        layout === 'row' && "flex gap-4",
      )}>
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 text-left",
              layout === 'column' && "w-full",
              interactive && !disabled && "cursor-pointer"
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-full border-2 transition-colors",
              selected === i ? "border-[#602639]" : "border-[#8d8a86]",
              interactive && !disabled && selected !== i && "hover:border-[#602639]",
              isFocus && selected === i && "ring-2 ring-[#602639] ring-offset-2",
              // Size
              size === 'medium' && "h-5 w-5",
              size === 'large' && "h-6 w-6",
              size === 'xlarge' && "h-7 w-7",
            )}>
              {selected === i && <div className={cn(
                "rounded-full bg-[#602639]",
                size === 'medium' && "h-2.5 w-2.5",
                size === 'large' && "h-3 w-3",
                size === 'xlarge' && "h-3.5 w-3.5",
              )} />}
            </div>
            <span className={cn(
              size === 'medium' && "text-sm",
              size === 'large' && "text-base",
              size === 'xlarge' && "text-lg",
            )}>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Interactive Checkbox Group Component
function InteractiveCheckboxGroup({
  interactive,
  disabled,
  checkedState,
  onToggle,
}: {
  interactive: boolean;
  disabled: boolean;
  checkedState: boolean[];
  onToggle: (index: number) => void;
}) {
  const options = ['Email updates', 'Push notifications', 'SMS alerts'];
  
  return (
    <div className={cn("space-y-2", disabled && "opacity-50")}>
      <span className="text-sm font-semibold">Preferences</span>
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onToggle(i)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center gap-2 text-left",
            interactive && !disabled && "cursor-pointer"
          )}
        >
          <div className={cn(
            "flex h-5 w-5 items-center justify-center rounded transition-colors",
            checkedState[i] ? "bg-[#602639]" : "border-2 border-[#8d8a86] bg-white",
            interactive && !disabled && !checkedState[i] && "hover:border-[#602639]"
          )}>
            {checkedState[i] && (
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm">{option}</span>
        </button>
      ))}
    </div>
  );
}

// Interactive Rating Component
function InteractiveRating({
  interactive,
  value,
  hoverValue,
  onRate,
  onHover,
}: {
  interactive: boolean;
  value: number;
  hoverValue: number;
  onRate: (value: number) => void;
  onHover: (value: number) => void;
}) {
  const displayValue = hoverValue || value;
  
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium">Rate your experience</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            className={cn(
              interactive && "cursor-pointer"
            )}
          >
            <svg 
              className={cn(
                "h-6 w-6 transition-colors",
                star <= displayValue ? "text-[#ffbf47] fill-[#ffbf47]" : "text-muted-foreground"
              )} 
              fill={star <= displayValue ? "currentColor" : "none"}
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        ))}
      </div>
      {value > 0 && <span className="text-xs text-muted-foreground">{value} out of 5 stars</span>}
    </div>
  );
}

// Interactive Text Field Component
function InteractiveTextField({
  interactive,
  disabled,
  value,
  onChange,
  variant,
  isFocus,
}: {
  interactive: boolean;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  variant: string;
  isFocus?: boolean;
}) {
  return (
    <div className={cn("w-48 space-y-1", disabled && "opacity-50")}>
      <span className="text-sm font-medium">Email</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors",
          variant === 'error' ? "border-[#ee5a29]" : "border-[#8d8a86]",
          interactive && !disabled && "focus:border-[#714cb6] focus:ring-2 focus:ring-[#714cb6]/20",
          isFocus && "border-[#714cb6] ring-2 ring-[#714cb6]/20",
          !interactive && "pointer-events-none"
        )}
      />
      {variant === 'error' && (
        <span className="text-xs text-[#ee5a29]">Please enter a valid email</span>
      )}
    </div>
  );
}

// Interactive Textarea Component
function InteractiveTextarea({
  interactive,
  disabled,
  value,
  onChange,
  variant,
  isFocus,
}: {
  interactive: boolean;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  variant: string;
  isFocus?: boolean;
}) {
  return (
    <div className={cn("w-48 space-y-1", disabled && "opacity-50")}>
      <span className="text-sm font-medium">Message</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        rows={3}
        className={cn(
          "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors resize-none",
          variant === 'error' ? "border-[#ee5a29]" : "border-[#8d8a86]",
          interactive && !disabled && "focus:border-[#714cb6] focus:ring-2 focus:ring-[#714cb6]/20",
          isFocus && "border-[#714cb6] ring-2 ring-[#714cb6]/20",
          !interactive && "pointer-events-none"
        )}
      />
    </div>
  );
}

// Interactive Search Field Component
function InteractiveSearchField({
  interactive,
  disabled,
  value,
  onChange,
  isFocus,
}: {
  interactive: boolean;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  isFocus?: boolean;
}) {
  return (
    <div className={cn("w-48 space-y-1", disabled && "opacity-50")}>
      <span className="text-sm font-medium">Search</span>
      <div className={cn(
        "flex items-center gap-2 rounded-lg border bg-white px-3 py-2",
        "border-[#8d8a86]",
        isFocus && "border-[#714cb6] ring-2 ring-[#714cb6]/20"
      )}>
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          disabled={disabled}
          className={cn(
            "flex-1 text-sm bg-transparent outline-none",
            !interactive && "pointer-events-none"
          )}
        />
        {value && interactive && (
          <button
            onClick={() => onChange('')}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Interactive Toast Component
function InteractiveToast({
  interactive,
  variant,
  label,
}: {
  interactive: boolean;
  isVisible: boolean;
  onDismiss: () => void;
  onShow: () => void;
  variant: string;
  label?: string;
}) {
  // Origin Toast variants
  const bgColor = {
    default: "bg-[#292827]",
    success: "bg-[#292827]",
    critical: "bg-[#292827]",
    warning: "bg-[#292827]",
    loading: "bg-[#292827]",
    // Legacy variants
    error: "bg-[#292827]",
    info: "bg-[#292827]",
  }[variant] || "bg-[#292827]";
  
  const iconColor = {
    default: "text-white",
    success: "text-[#00c9b1]",
    critical: "text-[#ee5a29]",
    warning: "text-[#ffbf47]",
    loading: "text-[#714cb6]",
    error: "text-[#ee5a29]",
    info: "text-[#714cb6]",
  }[variant] || "text-white";
  
  return (
    <div className={cn(
      "flex w-64 items-start gap-3 rounded-lg p-4 shadow-lg",
      bgColor
    )}>
      {variant === 'loading' ? (
        <div className="h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-[#714cb6] border-t-transparent" />
      ) : (
        <svg className={cn("h-5 w-5 flex-shrink-0", iconColor)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {(variant === 'success') && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
          {(variant === 'critical' || variant === 'error') && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
          {variant === 'warning' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
          {(variant === 'info' || variant === 'default' || !['success', 'critical', 'error', 'warning', 'loading'].includes(variant)) && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
        </svg>
      )}
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{label || 'Changes saved'}</div>
      </div>
      <button
        className={cn(
          "flex-shrink-0 rounded p-0.5 text-white/70",
          interactive && "hover:bg-white/20 hover:text-white cursor-pointer"
        )}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Interactive Form Component
function InteractiveForm({
  interactive,
  disabled,
  nameValue,
  emailValue,
  onNameChange,
  onEmailChange,
}: {
  interactive: boolean;
  disabled: boolean;
  nameValue: string;
  emailValue: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}) {
  return (
    <form className={cn("w-56 space-y-4", disabled && "opacity-50")} onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="John Doe"
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border border-[#8d8a86] bg-white px-3 py-2 text-sm outline-none transition-colors",
            interactive && !disabled && "focus:border-[#714cb6] focus:ring-2 focus:ring-[#714cb6]/20",
            !interactive && "pointer-events-none"
          )}
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={emailValue}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="john@example.com"
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border border-[#8d8a86] bg-white px-3 py-2 text-sm outline-none transition-colors",
            interactive && !disabled && "focus:border-[#714cb6] focus:ring-2 focus:ring-[#714cb6]/20",
            !interactive && "pointer-events-none"
          )}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={cn(
          "w-full rounded-lg bg-[#714cb6] py-2 text-sm font-medium text-white",
          interactive && !disabled && "hover:bg-[#5f3fa0] cursor-pointer",
          disabled && "cursor-not-allowed"
        )}
      >
        Submit
      </button>
    </form>
  );
}
