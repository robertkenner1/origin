import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { StickyFilterBar } from '@/components/StickyFilterBar';
import { TokenCard } from '@/components/TokenCard';

// Superhuman Iconography - 409 production icons organized by functional category
const iconCategories: Record<string, string[]> = {
  'Navigation': [
    'arrow-clockwise', 'arrow-counter-clockwise', 'arrow-down', 'arrow-down-bars',
    'arrow-down-line', 'arrow-forward', 'arrow-left', 'arrow-left-line',
    'arrow-out-squircle', 'arrow-reply', 'arrow-return', 'arrow-right', 'arrow-right-line',
    'arrow-right-rectangle', 'arrow-share', 'arrow-up', 'arrow-up-bars', 'arrow-up-line',
    'arrow-upload', 'arrows-clockwise', 'arrows-collapse', 'arrows-expand', 'arrows-in-bar',
    'arrows-merge', 'arrows-out', 'arrows-reply-all', 'arrows-split',
    'caret-large-down', 'caret-large-left', 'caret-large-right', 'caret-large-up',
    'caret-small-double-down', 'caret-small-double-left', 'caret-small-double-right',
    'caret-small-double-up', 'caret-small-down', 'caret-small-left', 'caret-small-right',
    'caret-small-up', 'carets-in', 'carets-out', 'globe', 'house', 'house-fill',
    'map-pin', 'map-pin-fill', 'map-pin-stack', 'pop-in', 'pop-out',
    'sidebar-left', 'sidebar-left-arrow-left', 'sidebar-left-arrow-right',
    'sidebar-right', 'sidebar-right-arrow-left', 'sidebar-right-arrow-right',
  ],
  'Actions': [
    'check', 'check-squircle', 'check-squircle-fill', 'check-squircle-stack', 'checks',
    'copy', 'copy-pencil', 'eye', 'eye-slash', 'link', 'link-slash', 'links',
    'magnify-minus', 'magnify-plus', 'minus', 'minus-squircle', 'minus-squircle-fill',
    'pencil', 'pencil-line-dashes', 'pencil-path', 'pencil-plus', 'pencil-rays',
    'pencil-ruler', 'pencil-slash', 'pencil-sparkles', 'pencil-squircle',
    'plus', 'plus-squircle', 'plus-squircle-fill', 'push-pin', 'push-pin-slash',
    'scissors', 'search', 'search-fill', 'trash', 'x', 'x-squircle', 'x-squircle-fill',
  ],
  'Communication': [
    'at', 'bell', 'bell-fill', 'bell-ring', 'bell-slash', 'bell-z',
    'chat-dots-typing', 'chat-lines', 'chat-plus', 'chat-x', 'chats',
    'envelope', 'envelope-arrow-up', 'envelope-dot', 'envelope-fill', 'envelope-open', 'envelope-x',
    'megaphone', 'megaphone-slash', 'paper-plane', 'speaker', 'speaker-slash',
  ],
  'Media': [
    'film', 'image', 'image-caption', 'image-fill', 'image-stack', 'image-text',
    'monitor-play', 'music-note', 'pause', 'pause-fill', 'play', 'play-fill',
    'play-slash', 'play-slash-fill', 'skip-forward', 'skip-forward-fill',
    'stop', 'stop-fill',
  ],
  'Files': [
    'clipboard', 'file', 'file-arrow-counter-clockwise', 'file-arrow-in', 'file-arrow-up',
    'file-arrows-clockwise', 'file-csv', 'file-dashes', 'file-gear', 'file-link',
    'file-pdf', 'file-pencil', 'file-plus', 'file-question', 'file-search', 'file-stack',
    'file-xls', 'folder', 'folder-lock', 'folder-open', 'folder-plus',
    'note', 'note-gear', 'note-plus', 'note-stack', 'paperclip',
  ],
  'Data': [
    'arrow-down-sort', 'arrow-up-sort', 'arrows-sort-horizontal', 'arrows-sort-vertical',
    'arrow-trend-down-squircle', 'arrow-trend-up-squircle',
    'chart-area', 'chart-bar', 'chart-bubble', 'chart-flow', 'chart-label-x-axis',
    'chart-label-y-axis', 'chart-line', 'chart-line-smooth', 'chart-pie', 'chart-scatter',
    'chart-timeline', 'column', 'column-arrow-clockwise', 'column-header', 'column-lines',
    'column-plus', 'column-plus-left', 'column-plus-right', 'column-stack',
    'dollar-sign', 'dollar-sign-stack', 'formula', 'funnel', 'numbers', 'numbers-slash',
    'numbers-stack', 'percent', 'percent-stack', 'row', 'row-pencil', 'row-plus',
    'row-plus-down', 'row-plus-pencil', 'row-plus-up', 'row-stack', 'row-x', 'sum',
    'table', 'table-arrow-clockwise', 'table-column', 'table-database', 'table-freeze',
    'table-link', 'table-of-contents', 'table-pencil', 'table-row', 'table-sum',
  ],
  'Text': [
    'indent-less', 'indent-more', 'list-bullets', 'list-bullets-sparkle', 'list-carets',
    'list-checks', 'list-numbers', 'paragraph', 'text-a', 'text-a-squircle',
    'text-a-squircle-check', 'text-align-center', 'text-align-justify', 'text-align-left',
    'text-align-right', 'text-block-quote', 'text-bold', 'text-cursor', 'text-h-one',
    'text-h-three', 'text-h-two', 'text-h-zero', 'text-italic', 'text-line-spacing',
    'text-loupe', 'text-messages', 'text-overflow', 'text-pull-quote', 'text-scan',
    'text-size', 'text-strikethrough', 'text-t', 'text-t-slash', 'text-t-stack',
    'text-underline', 'text-wrap', 'textbox',
  ],
  'Status': [
    'circle', 'circle-fill', 'circle-inner-fill', 'circle-slash',
    'info', 'question-squircle', 'question-squircle-fill', 'spinner',
    'squircle', 'squircle-drop', 'squircle-plus', 'squircle-stripes-drop',
    'squircles-concentric', 'squircles-concentric-stack',
    'warning', 'warning-fill',
  ],
  'UI': [
    'blocks-plus', 'button', 'button-cursor', 'button-plus', 'button-search',
    'dots-nine', 'dots-six-horizontal', 'dots-six-vertical', 'dots-three-horizontal',
    'dots-three-vertical', 'dropdown', 'form', 'grid', 'gridlines',
    'group-left', 'group-left-slash', 'group-top', 'group-top-slash',
    'kanban', 'layout', 'lines-carets-in', 'lines-carets-out', 'lines-three',
    'lines-three-pencil', 'lines-three-sparkle', 'progress-bar', 'rectangle-vertical',
    'sliders', 'subitems', 'subitems-parent', 'toggle-left', 'toggle-right', 'toggles',
    'tooltip', 'tree-view', 'width-center-medium', 'width-center-narrow', 'width-center-wide',
    'width-equal', 'width-full', 'width-left-medium', 'width-left-narrow', 'width-left-wide',
  ],
  'Objects': [
    'basketball', 'book', 'book-a', 'book-open', 'book-sparkle', 'box-sparkle', 'box-x',
    'box-x-slash', 'building', 'building-search', 'calendar', 'calendar-arrow-up',
    'calendar-check', 'calendar-clock', 'calendar-stack', 'calendar-x', 'car', 'card',
    'card-stack', 'clock', 'clock-counter-clockwise', 'cloud', 'cloud-text', 'cocktail',
    'code', 'code-block', 'code-block-slash', 'coffee', 'credit-card', 'cube', 'dog',
    'fire', 'fish', 'gem', 'gift', 'graduation-cap', 'hourglass', 'hourglass-stack',
    'keyboard', 'laptop-cursor', 'lightbulb', 'lightbulb-fill', 'mobile', 'mobile-nav-bottom',
    'mobile-nav-left', 'moon', 'paintbrush', 'paintbrush-sparkles', 'pepper', 'printer',
    'puzzle', 'robot', 'rook', 'sun', 'target-cursor', 'test-case', 'the-slash',
    'tooltip', 'tray', 'trophy', 'wifi', 'wifi-slash',
  ],
  'People': [
    'smiley', 'smiley-fill', 'smiley-plus', 'thumbs-down', 'thumbs-up',
    'user', 'user-arrow-right', 'user-fill', 'user-plus', 'user-x', 'users', 'users-fill',
  ],
  'Symbols': [
    'bookmark', 'bookmark-fill', 'bug', 'flag', 'flag-fill', 'gear', 'hashtag',
    'heart', 'heart-fill', 'key', 'lightning', 'lightning-fill', 'lightning-stack',
    'lock', 'lock-fill', 'lock-open', 'lock-open-fill', 'lock-plus', 'lock-plus-fill',
    'shield-check', 'fingerprint', 'shapes', 'sparkles', 'star', 'star-fill', 'star-half-fill',
    'tag', 'tag-fill',
  ],
};

// Build flat list of all icons with their category
const allIcons = Object.entries(iconCategories).flatMap(([category, icons]) =>
  icons.map(name => ({ name, category }))
);

// Categories in display order
const categories = Object.keys(iconCategories);

// Single icon used as preview for all icons (20x20 frame, transparent bg, black stroke)
function IconDisplay({ name: _name }: { name: string }) {
  return (
    <svg 
      className="h-5 w-5" 
      fill="none"
      stroke="#000000"
      strokeWidth={1.5}
      viewBox="0 0 20 20"
    >
      {/* Star icon as placeholder */}
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M10 2l2.09 4.26 4.71.69-3.4 3.32.8 4.68L10 12.77l-4.2 2.18.8-4.68-3.4-3.32 4.71-.69L10 2z" 
      />
    </svg>
  );
}

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Handle category click with scroll animation
  const handleCategoryClick = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    
    // Scroll the clicked button into center view
    const button = buttonRefs.current.get(category);
    const container = scrollContainerRef.current;
    
    if (button && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      // Calculate scroll position to center the button
      const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return allIcons.filter((icon) => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           icon.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Focus search field on "/" key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setSearchQuery('');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filterContent = (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search 409 icons"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-full border border-border bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            ref={(el) => {
              if (el) buttonRefs.current.set(category, el);
            }}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap bg-white border-2",
              activeCategory === category
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-border/40 hover:text-foreground hover:border-foreground/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="container mx-auto px-6 pt-12">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Icons</h1>
          <p className="text-muted-foreground mt-1">409 production-ready icons from the Superhuman Iconography set</p>
        </div>
      </div>

      {/* Filter Bar - content gets rendered in nav when scrolled */}
      <StickyFilterBar>
        {filterContent}
      </StickyFilterBar>

      <div className="container mx-auto px-6 pt-4 pb-12">
        {/* Results count */}
        {searchQuery && (
          <p className="mb-4 text-sm text-muted-foreground">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
          </p>
        )}
        
        {/* Icons Grid */}
        {filteredIcons.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-3">
            {filteredIcons.map((icon) => (
              <TokenCard
                key={`${icon.category}-${icon.name}`}
                copyValue={icon.name}
                label={icon.name}
                preview={<IconDisplay name={icon.name} />}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">No icons found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
