import { Link } from 'react-router-dom';
import { OverviewHeader } from '@/components/OverviewHeader';

// Sample illustration placeholders (same as IllustrationsPage)
function IllustrationSample({ name, type }: { name: string; type: 'empty' | 'success' | 'spot' }) {
  const colors = {
    empty: { primary: '#9ca3af', secondary: '#e5e7eb', accent: '#d1d5db' },
    success: { primary: '#10b981', secondary: '#d1fae5', accent: '#6ee7b7' },
    spot: { primary: '#8b5cf6', secondary: '#ede9fe', accent: '#c4b5fd' },
  };
  const c = colors[type];

  if (type === 'empty') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12">
        <defs>
          <linearGradient id={`empty-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.secondary} />
            <stop offset="100%" stopColor={c.accent} />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="24" fill={`url(#empty-${name})`} />
        <circle cx="28" cy="28" r="16" fill="none" stroke={c.primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      </svg>
    );
  }
  
  if (type === 'success') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12">
        <defs>
          <linearGradient id={`success-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.secondary} />
            <stop offset="100%" stopColor={c.accent} />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="24" fill={`url(#success-${name})`} />
        <path d="M18 28L25 35L38 22" fill="none" stroke={c.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 56 56" className="h-12 w-12">
      <defs>
        <linearGradient id={`spot-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.secondary} />
          <stop offset="100%" stopColor={c.accent} />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="40" height="32" rx="4" fill={`url(#spot-${name})`} />
      <circle cx="20" cy="24" r="6" fill={c.primary} opacity="0.6" />
    </svg>
  );
}

// Superhuman color ramp (from Figma) - 4 palettes, 9 shades each
const brandColorPalettes = [
  { name: 'Neutral', colors: ['#141413', '#292827', '#474543', '#73716D', '#8D8A86', '#BFBCB6', '#DEDBD5', '#F2F0EB', '#FCFAF7'] },
  { name: 'Purple', colors: ['#281647', '#3F256F', '#533192', '#714CB6', '#8861CA', '#BEA1F5', '#D4C7FF', '#E8E0FF', '#F7F5FF'] },
  { name: 'Green', colors: ['#17261F', '#0C4243', '#005C54', '#148072', '#26A28B', '#3AC7A1', '#98EBCD', '#D5F7EB', '#F4FDFA'] },
  { name: 'Mulberry', colors: ['#421D24', '#5E1F3D', '#792D5B', '#8D3D72', '#A34E8A', '#BF619F', '#DA7CBA', '#F0B8DC', '#FFDCF3'] },
];

const brandCategories = [
  {
    id: 'color',
    name: 'Color',
    preview: (
      <div className="flex flex-col items-center justify-center gap-3">
        {brandColorPalettes.map((palette, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {palette.colors.map((color, j) => (
              <div
                key={j}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'illustrations',
    name: 'Illustrations',
    preview: (
      <div className="flex items-center justify-center gap-4">
        <IllustrationSample name="preview-1" type="empty" />
        <IllustrationSample name="preview-2" type="success" />
        <IllustrationSample name="preview-3" type="spot" />
      </div>
    ),
  },
  {
    id: 'typography',
    name: 'Typography',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold text-foreground tracking-tight">Aa</span>
        <span className="text-2xl font-medium text-muted-foreground">Bb Cc</span>
        <span className="text-sm text-muted-foreground/60">1234567890</span>
      </div>
    ),
  },
];

export function BrandPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Design"
          description="Our brand identity is built on principles of clarity, confidence, and sophistication. These design guidelines ensure consistent visual communication across all touchpoints."
          backgroundColor="#F0B8DC"
        />
        <div className="mt-8"></div>

        <div className="grid grid-cols-2 gap-6">
          {brandCategories.map((category) => (
            <Link
              key={category.id}
              to={`/brand/${category.id}`}
              className="group relative flex flex-col items-start gap-3 rounded-xl bg-white p-5 border-2 border-transparent hover:border-foreground transition-colors duration-200 cursor-pointer"
            >
              {/* arrow-expand icon from Superhuman Iconography - positioned in top right corner */}
              <svg 
                className="absolute top-5 right-5 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" 
                viewBox="0 0 20 20"
                fill="none"
              >
                <g transform="translate(2, 2)">
                  <path d="M7.53027 9.53027L2.56055 14.5H6.5V16H2.25C1.90269 16 1.57494 15.9188 1.28125 15.7783L1.28027 15.7803L1.27539 15.7754C0.81626 15.5541 0.444711 15.1829 0.223633 14.7236L0.219727 14.7197L0.220703 14.7178C0.0805311 14.4244 0 14.0968 0 13.75V9.5H1.5V13.4395L6.46973 8.46973L7.53027 9.53027Z" fill="currentColor" className="text-muted-foreground"/>
                  <path d="M13.75 0C14.0968 4.58942e-06 14.4244 0.0805292 14.7178 0.220703L14.7197 0.219727L14.7236 0.223633C15.1829 0.444713 15.5541 0.816265 15.7754 1.27539L15.7803 1.28027L15.7783 1.28125C15.9188 1.57494 16 1.90269 16 2.25V6.5H14.5V2.56055L9.53027 7.53027L8.46973 6.46973L13.4395 1.5H9.5V0H13.75Z" fill="currentColor" className="text-muted-foreground"/>
                </g>
              </svg>

              {/* Preview Area */}
              <div className="flex h-64 w-full items-center justify-center">
                {category.preview}
              </div>
              
              {/* Label */}
              <span className="text-sm font-medium text-foreground transition-colors w-full">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
