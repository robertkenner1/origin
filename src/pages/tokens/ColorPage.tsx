import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { StickyFilterBar } from '@/components/StickyFilterBar';
import { TokenCard } from '@/components/TokenCard';

// Semantic Color tokens
const semanticColorTokens = [
  { name: 'Color.Background.Base.Default', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Background.Base.Subdued', value: '#292827', darkValue: '#292827' },
  { name: 'Color.Background.Base.Inverse', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Background.Brand.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Background.Brand.Subdued', value: '#3F256F', darkValue: '#3F256F' },
  { name: 'Color.Background.Clarity.Default', value: '#2551DA', darkValue: '#7D99F0' },
  { name: 'Color.Background.Correctness.Default', value: '#EB0A00', darkValue: '#FF7A74' },
  { name: 'Color.Background.Critical.Default', value: '#EB0A00', darkValue: '#FF7A74' },
  { name: 'Color.Background.Critical.Subdued', value: '#FFEAE9', darkValue: '#510300' },
  { name: 'Color.Background.Enterprise.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Background.Interactive.Default', value: '#027E6F', darkValue: '#2CC9B6' },
  { name: 'Color.Background.Neutral.Default', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Background.Pro.Default', value: '#FFBF47', darkValue: '#FFBF47' },
  { name: 'Color.Background.Success.Default', value: '#016A5E', darkValue: '#2CC9B6' },
  { name: 'Color.Background.Success.Subdued', value: '#EAFAF9', darkValue: '#014C43' },
  { name: 'Color.Background.Warning.Default', value: '#BD5200', darkValue: '#FFBF47' },
  { name: 'Color.Background.Warning.Subdued', value: '#FFF6E0', darkValue: '#7A3500' },
  { name: 'Color.Border.Addition.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Border.Base.Default', value: '#8D8A86', darkValue: '#8D8A86' },
  { name: 'Color.Border.Base.Subdued', value: '#474543', darkValue: '#474543' },
  { name: 'Color.Border.Base.Inverse', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Border.Brand.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Border.Brand.Subdued', value: '#533192', darkValue: '#533192' },
  { name: 'Color.Border.Business.Default', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Border.Business.Subdued', value: '#73716D', darkValue: '#73716D' },
  { name: 'Color.Border.Clarity.Default', value: '#4198D2', darkValue: '#4198D2' },
  { name: 'Color.Border.Correctness.Default', value: '#F00C00', darkValue: '#F00C00' },
  { name: 'Color.Border.Critical.Default', value: '#FF565E', darkValue: '#FF565E' },
  { name: 'Color.Border.Critical.Subdued', value: '#9F182D', darkValue: '#9F182D' },
  { name: 'Color.Border.Deletion.Default', value: '#8D8A86', darkValue: '#8D8A86' },
  { name: 'Color.Border.Delivery.Default', value: '#5E47E5', darkValue: '#A598F0' },
  { name: 'Color.Border.Elevated.Default', value: '#474543', darkValue: '#474543' },
  { name: 'Color.Border.Engagement.Default', value: '#016A5E', darkValue: '#2CC9B6' },
  { name: 'Color.Border.Focus.Default', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Border.Interactive.Default', value: '#F2F0EB', darkValue: '#F2F0EB' },
  { name: 'Color.Border.Plagiarism.Default', value: '#027D7D', darkValue: '#80F3F3' },
  { name: 'Color.Border.Pro.Default', value: '#FFA10A', darkValue: '#FFA10A' },
  { name: 'Color.Border.Success.Default', value: '#3AC7A1', darkValue: '#3AC7A1' },
  { name: 'Color.Border.Success.Subdued', value: '#005C54', darkValue: '#005C54' },
  { name: 'Color.Border.Warning.Default', value: '#FFBF47', darkValue: '#FFBF47' },
  { name: 'Color.Border.Warning.Subdued', value: '#BD5200', darkValue: '#BD5200' },
  { name: 'Color.Elevation.Base.Default', value: '#707070', darkValue: '#1C1C1C' },
  { name: 'Color.Elevation.Outline.Default', value: '#D9D9D9', darkValue: '#545454' },
  { name: 'Color.Highlight.Addition.Default', value: '#363040', darkValue: '#363040' },
  { name: 'Color.Highlight.Deletion.Default', value: '#363634', darkValue: '#363634' },
  { name: 'Color.Icon.Addition.Inverse', value: '#2CC9B6', darkValue: '#016A5E' },
  { name: 'Color.Icon.Agent.Default', value: '#FCFAF7', darkValue: '#FCFAF7' },
  { name: 'Color.Icon.Base.Default', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Icon.Base.Subdued', value: '#73716D', darkValue: '#73716D' },
  { name: 'Color.Icon.Base.Inverse', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Icon.Brand.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Icon.Critical.Default', value: '#FF565E', darkValue: '#FF565E' },
  { name: 'Color.Icon.Critical.Inverse', value: '#9F182D', darkValue: '#9F182D' },
  { name: 'Color.Icon.Delivery.Default', value: '#5E47E5', darkValue: '#A598F0' },
  { name: 'Color.Icon.Delivery.Inverse', value: '#A598F0', darkValue: '#5E47E5' },
  { name: 'Color.Icon.Interactive.Default', value: '#F2F0EB', darkValue: '#F2F0EB' },
  { name: 'Color.Icon.Pro.Default', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Icon.Pro.Inverse', value: '#FFBF47', darkValue: '#FFBF47' },
  { name: 'Color.Icon.Success.Default', value: '#3AC7A1', darkValue: '#3AC7A1' },
  { name: 'Color.Icon.Warning.Default', value: '#FF9D56', darkValue: '#FF9D56' },
  { name: 'Color.Icon.Warning.Inverse', value: '#C25000', darkValue: '#C25000' },
  { name: 'Color.Illustration.Fill.1', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Illustration.Fill.2', value: '#F2F0EB', darkValue: '#F2F0EB' },
  { name: 'Color.Illustration.Fill.Default', value: '#474543', darkValue: '#474543' },
  { name: 'Color.Illustration.Shadow.Default', value: '#474543', darkValue: '#474543' },
  { name: 'Color.Illustration.Stroke.1', value: '#8D8A86', darkValue: '#8D8A86' },
  { name: 'Color.Illustration.Stroke.2', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Illustration.Stroke.3', value: '#F2F0EB', darkValue: '#F2F0EB' },
  { name: 'Color.Illustration.Stroke.Default', value: '#474543', darkValue: '#474543' },
  { name: 'Color.Logo.Coda.Light', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Coda.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Coda.Primary', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Coda.Secondary', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Grammarly.Dark', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Logo.Grammarly.Light', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Grammarly.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Grammarly.Inverse', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Logo.Grammarly.Primary', value: '#027E6F', darkValue: '#027E6F' },
  { name: 'Color.Logo.Hero.Dark', value: '#421D24', darkValue: '#421D24' },
  { name: 'Color.Logo.Hero.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Mail.Light', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Mail.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Superhuman.Light', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Superhuman.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Logo.Superhuman.Primary', value: '#D4C7FF', darkValue: '#D4C7FF' },
  { name: 'Color.Logo.Superhuman.Secondary', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Text.Addition.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Text.Base.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Text.Base.Subdued', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Text.Base.Inverse', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Text.Brand.Default', value: '#BEA1F5', darkValue: '#BEA1F5' },
  { name: 'Color.Text.Critical.Default', value: '#FF565E', darkValue: '#FF565E' },
  { name: 'Color.Text.Dark.Default', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Text.Deletion.Default', value: '#BFBCB6', darkValue: '#BFBCB6' },
  { name: 'Color.Text.Enterprise.Default', value: '#1B0D6F', darkValue: '#1B0D6F' },
  { name: 'Color.Text.Light.Default', value: '#FFF', darkValue: '#FFF' },
  { name: 'Color.Text.Pro.Default', value: '#141413', darkValue: '#141413' },
  { name: 'Color.Text.Success.Default', value: '#3AC7A1', darkValue: '#3AC7A1' },
  { name: 'Color.Text.Warning.Default', value: '#FFBF47', darkValue: '#FFBF47' },
];

// Core Color tokens
const coreColorTokens = [
  { name: 'Blue0', value: '#F3F6FF' },
  { name: 'Blue10', value: '#D1DBFE' },
  { name: 'Blue20', value: '#ADBFF9' },
  { name: 'Blue30', value: '#7D99F0' },
  { name: 'Blue40', value: '#3E6CF4' },
  { name: 'Blue60', value: '#2551DA' },
  { name: 'Blue80', value: '#02379E' },
  { name: 'Blue90', value: '#000A62' },
  { name: 'Blue100', value: '#000A26' },
  { name: 'Gold0', value: '#FFF6E0' },
  { name: 'Gold10', value: '#FFEBB8' },
  { name: 'Gold20', value: '#FFDC85' },
  { name: 'Gold30', value: '#FFBF47' },
  { name: 'Gold40', value: '#FFA10A' },
  { name: 'Gold60', value: '#E57300' },
  { name: 'Gold80', value: '#BD5200' },
  { name: 'Gold90', value: '#7A3500' },
  { name: 'Gold100', value: '#1A0B00' },
  { name: 'Green0', value: '#EAFAF9' },
  { name: 'Green10', value: '#B1F0E8' },
  { name: 'Green20', value: '#73E1D4' },
  { name: 'Green30', value: '#2CC9B6' },
  { name: 'Green40', value: '#15A694' },
  { name: 'Green60', value: '#027E6F' },
  { name: 'Green80', value: '#016A5E' },
  { name: 'Green90', value: '#014C43' },
  { name: 'Green100', value: '#00231F' },
  { name: 'LightGreen', value: '#00E0AC' },
  { name: 'NeutralGray0', value: '#F5F5F5' },
  { name: 'NeutralGray10', value: '#EBEBEB' },
  { name: 'NeutralGray20', value: '#D9D9D9' },
  { name: 'NeutralGray30', value: '#BCBCBC' },
  { name: 'NeutralGray40', value: '#A8A8A8' },
  { name: 'NeutralGray60', value: '#707070' },
  { name: 'NeutralGray80', value: '#545454' },
  { name: 'NeutralGray90', value: '#2E2E2E' },
  { name: 'NeutralGray100', value: '#1C1C1C' },
  { name: 'Purple0', value: '#F7F6FE' },
  { name: 'Purple10', value: '#DDD9F9' },
  { name: 'Purple20', value: '#CAC3F7' },
  { name: 'Purple30', value: '#A598F0' },
  { name: 'Purple40', value: '#8675EB' },
  { name: 'Purple60', value: '#5E47E5' },
  { name: 'Purple80', value: '#3D27C0' },
  { name: 'Purple90', value: '#1B0D6F' },
  { name: 'Purple100', value: '#0E073B' },
  { name: 'Red0', value: '#FFEAE9' },
  { name: 'Red10', value: '#FFD1D0' },
  { name: 'Red20', value: '#FFA8A8' },
  { name: 'Red30', value: '#FF7A74' },
  { name: 'Red40', value: '#FF4D45' },
  { name: 'Red60', value: '#EB0A00' },
  { name: 'Red80', value: '#CD0800' },
  { name: 'Red90', value: '#8F0600' },
  { name: 'Red100', value: '#510300' },
  { name: 'Teal0', value: '#E6FDFD' },
  { name: 'Teal10', value: '#CCFAFA' },
  { name: 'Teal20', value: '#B3F8F8' },
  { name: 'Teal30', value: '#80F3F3' },
  { name: 'Teal40', value: '#00E6E6' },
  { name: 'Teal60', value: '#00C4C4' },
  { name: 'Teal80', value: '#027D7D' },
  { name: 'Teal90', value: '#005C5C' },
  { name: 'Teal100', value: '#001F1F' },
  { name: 'Transparent', value: '#FFFFFF00' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'YellowGreen', value: '#D5FF00' },
];

const categories = ['Semantic Color', 'Core Color'];

export function TokenColorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tokens
  const filteredTokens = {
    semanticColor: activeCategory === null || activeCategory === 'Semantic Color'
      ? semanticColorTokens.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : [],
    coreColor: activeCategory === null || activeCategory === 'Core Color'
      ? coreColorTokens.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : [],
  };

  // Keyboard shortcuts
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
          placeholder="Search color tokens"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-full border-2 border-transparent bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground hover:border-foreground focus:border-foreground focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 bg-white border-2",
              activeCategory === category
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-12">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Color</h1>
        </div>
      </div>

      <StickyFilterBar>
        {filterContent}
      </StickyFilterBar>

      <div className="w-full px-6 pt-4 pb-12">
        {/* Semantic Color Tokens */}
        {filteredTokens.semanticColor.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Semantic Color</h2>
            <div className="flex flex-wrap gap-3">
              {filteredTokens.semanticColor.map((token) => {
                const isWhiteish = ['#fff', '#ffffff', '#ffffff00'].includes(token.value.toLowerCase());
                return (
                  <TokenCard
                    key={token.name}
                    copyValue={token.name}
                    label={token.name.split('.').slice(-2).join('.')}
                    variant="pill"
                    swatchColor={token.value}
                    preview={
                      <div
                        className={cn("h-5 w-5 rounded-full flex-shrink-0", isWhiteish && "ring-1 ring-border/30")}
                        style={{ backgroundColor: token.value }}
                      />
                    }
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Core Color Tokens */}
        {filteredTokens.coreColor.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Core Color</h2>
            <div className="flex flex-wrap gap-3">
              {filteredTokens.coreColor.map((token) => {
                const isWhiteish = ['#fff', '#ffffff', '#ffffff00'].includes(token.value.toLowerCase());
                return (
                  <TokenCard
                    key={token.name}
                    copyValue={token.name}
                    label={token.name}
                    variant="pill"
                    swatchColor={token.value}
                    preview={
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full flex-shrink-0",
                          isWhiteish && "ring-1 ring-border/30",
                          token.value.toLowerCase() === '#ffffff00' && "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewBox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%23ccc%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%23ccc%22%2F%3E%3C%2Fsvg%3E')]"
                        )}
                        style={{ backgroundColor: token.value.toLowerCase() === '#ffffff00' ? undefined : token.value }}
                      />
                    }
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
