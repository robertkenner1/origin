import { Link } from 'react-router-dom';

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
    id: 'logo',
    name: 'Logo',
    preview: (
      <svg width="140" height="140" viewBox="0 0 111 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
        <path d="M9.97852 0C16.7707 7.42797e-05 19.9561 3.48645 19.9561 11C19.956 18.5135 16.7707 21.9999 9.97852 22C3.18621 22 1.46999e-05 18.5136 0 11C0 3.48637 3.1862 0 9.97852 0ZM66.9375 0C72.9785 0 76.0744 2.46465 76.7656 7.93457H71.8965C71.3555 5.4701 69.9129 4.35742 66.9375 4.35742C63.3311 4.35748 61.7988 6.22141 61.7988 11C61.7988 15.8086 63.3311 17.6415 66.9375 17.6416C69.9129 17.6416 71.536 16.4098 71.9268 13.5547H65.1045V9.94824H76.8857V11.2705C76.8857 18.7841 73.4894 22 66.9375 22C60.1453 21.9999 56.96 18.5135 56.96 11C56.96 3.48644 60.1453 5.98633e-05 66.9375 0ZM34.7227 0.480469C36.2053 0.480495 37.5076 0.756736 38.6299 1.30762C39.7514 1.85898 40.623 2.64995 41.2441 3.68164C41.8649 4.71373 42.1758 5.93053 42.1758 7.33301C42.1758 8.73549 41.865 9.79049 41.2441 10.8223C40.6229 11.8544 39.4965 12.7161 38.3359 13.2012C38.129 13.2876 37.6843 13.4426 37.0879 13.6396L42.4541 21.501H36.6973L32.4111 15.1182C31.3493 15.4465 30.3054 15.7665 29.4287 16.0342V21.5186H24.5996V0.480469H34.7227ZM52.2168 21.5186H47.3779V0.480469H52.2168V21.5186ZM86.4795 21.5186H81.6406V0.480469H86.4795V21.5186ZM105.706 14.1855V0.480469H110.424V21.5186H105.585L96.8994 7.81445V21.5186H92.1807V0.480469H97.0195L105.706 14.1855ZM9.97852 4.35742C6.37198 4.35742 4.83887 6.19128 4.83887 11C4.83888 15.8087 6.37199 17.6416 9.97852 17.6416C13.6149 17.6415 15.1172 15.8086 15.1172 11C15.1172 6.19137 13.615 4.35749 9.97852 4.35742ZM29.4287 5.13867V11.3223C31.6834 10.7504 34.8855 9.92228 35.6396 9.64355C36.1607 9.45085 37.4795 9.01214 37.4795 7.33301C37.4795 5.3261 35.4902 5.13867 34.2354 5.13867H29.4287Z" fill="currentColor"/>
      </svg>
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
];

export function BrandPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-6 pt-12 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Brand</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {brandCategories.map((category) => (
            <Link
              key={category.id}
              to={`/brand/${category.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl bg-white p-5 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer"
            >
              {/* Preview Area */}
              <div className="flex h-64 w-full items-center justify-center">
                {category.preview}
              </div>
              
              {/* Label */}
              <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
