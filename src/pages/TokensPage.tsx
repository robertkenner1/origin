import { Link } from 'react-router-dom';
import { OverviewHeader } from '@/components/OverviewHeader';

const tokenCategories = [
  {
    id: 'color',
    name: 'Color',
    preview: (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#BEA1F5]" />
          <div className="w-8 h-8 rounded-full bg-[#2CC9B6]" />
          <div className="w-8 h-8 rounded-full bg-[#FFBF47]" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#FF565E]" />
          <div className="w-8 h-8 rounded-full bg-[#7D99F0]" />
          <div className="w-8 h-8 rounded-full bg-[#BFBCB6]" />
        </div>
      </div>
    ),
  },
  {
    id: 'typography',
    name: 'Typography',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold text-foreground tracking-tight">Aa</span>
        <span className="text-2xl font-medium text-muted-foreground">Bb</span>
      </div>
    ),
  },
  {
    id: 'spacing',
    name: 'Spacing',
    preview: (
      <div className="flex items-end justify-center gap-2">
        <div className="w-3 h-8 bg-foreground rounded-sm" />
        <div className="w-3 h-16 bg-foreground rounded-sm" />
        <div className="w-3 h-24 bg-foreground rounded-sm" />
        <div className="w-3 h-16 bg-foreground rounded-sm" />
        <div className="w-3 h-8 bg-foreground rounded-sm" />
      </div>
    ),
  },
  {
    id: 'shadows',
    name: 'Shadows',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 bg-white rounded-lg" style={{ boxShadow: '0px 1px 4px 0.5px rgba(0,0,0,0.08)' }} />
        <div className="w-12 h-12 bg-white rounded-lg" style={{ boxShadow: '0px 1px 8px 0.5px rgba(0,0,0,0.1)' }} />
        <div className="w-12 h-12 bg-white rounded-lg" style={{ boxShadow: '0px 2px 12px 0.5px rgba(0,0,0,0.12)' }} />
      </div>
    ),
  },
  {
    id: 'radius',
    name: 'Border radius',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 bg-foreground rounded-none" />
        <div className="w-12 h-12 bg-foreground rounded-md" />
        <div className="w-12 h-12 bg-foreground rounded-2xl" />
        <div className="w-12 h-12 bg-foreground rounded-full" />
      </div>
    ),
  },
];

export function TokensPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 pt-3 pb-12">
        <OverviewHeader
          title="Tokens"
          description="Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure flexibility and unity across all product experiences."
          backgroundColor="#FFEBB8"
        />

        <div className="grid grid-cols-2 gap-6">
          {tokenCategories.map((category) => (
            <Link
              key={category.id}
              to={`/tokens/${category.id}`}
              className="group relative flex flex-col items-start gap-3 rounded-xl bg-white p-5 border-2 border-transparent hover:border-foreground transition-colors duration-200 cursor-pointer"
            >
              {/* arrow-expand icon */}
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
