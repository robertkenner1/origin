import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Calculate luminance to determine if we should use white or black text
function getContrastColor(hexColor: string): 'white' | 'black' {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance using the formula:
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? 'black' : 'white';
}

interface TokenCardProps {
  /** The code/value to copy to clipboard */
  copyValue: string;
  /** The visible label for the token */
  label: string;
  /** Optional preview content (icon, color swatch, etc.) */
  preview?: ReactNode;
  /** Layout variant */
  variant?: 'pill' | 'card';
  /** Additional className */
  className?: string;
  /** For pill variant with color swatches - the hex color value to calculate contrast */
  swatchColor?: string;
}

export function TokenCard({ 
  copyValue, 
  label, 
  preview, 
  variant = 'card',
  className,
  swatchColor
}: TokenCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (copied) return; // Prevent multiple clicks
    
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [copyValue, copied]);

  if (variant === 'pill') {
    const iconColor = swatchColor ? getContrastColor(swatchColor) : 'currentColor';
    
    return (
      <button
        onClick={handleCopy}
        className={cn(
          "group flex items-center gap-2 rounded-full bg-white pl-1.5 pr-3 py-1.5 border-2 border-transparent hover:border-foreground transition-colors duration-200 cursor-pointer",
          className
        )}
      >
        {/* Preview (e.g., color swatch) with copy icon overlay */}
        <div className="relative h-5 w-5 flex-shrink-0">
          {preview}
          {/* Copy icon - appears on hover in center of swatch, checkmark when copied */}
          <span className="absolute inset-0 flex items-center justify-center">
            <svg 
              className={cn(
                "h-3 w-3 transition-all duration-200",
                copied ? "opacity-0 scale-50" : "opacity-0 group-hover:opacity-100"
              )} 
              fill="none" 
              stroke={iconColor}
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg 
              className={cn(
                "absolute h-3 w-3 transition-all duration-200",
                copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )} 
              fill="none" 
              stroke={iconColor}
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
        
        {/* Label / Copied state */}
        <span 
          className={cn(
            "text-xs font-medium transition-all duration-300 truncate",
            copied ? "text-foreground" : "text-foreground"
          )}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {copied ? 'Copied!' : label}
        </span>
      </button>
    );
  }

  // Card variant (for icons, border radius, elevation, etc.)
  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative flex flex-col items-start gap-2 rounded-xl bg-white p-3 border-2 border-transparent hover:border-foreground transition-colors duration-200 cursor-pointer text-left w-full",
        className
      )}
    >
      {/* Copy icon - positioned in top right corner */}
      <span className="absolute top-3 right-3 h-5 w-5 flex-shrink-0">
        <svg 
          className={cn(
            "absolute inset-0 h-5 w-5 text-muted-foreground transition-all duration-200",
            copied ? "opacity-0 scale-50" : "opacity-0 group-hover:opacity-100"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg 
          className={cn(
            "absolute inset-0 h-5 w-5 text-foreground transition-all duration-200",
            copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </span>

      {/* Preview area */}
      {preview && (
        <div className="relative flex items-center justify-center">
          {preview}
        </div>
      )}
      
      {/* Label / Copied state */}
      <span 
        className={cn(
          "text-xs font-medium transition-all duration-300 truncate w-full",
          copied ? "text-foreground" : "text-foreground"
        )}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}

// Larger card variant for tokens that need more preview space
interface TokenCardLargeProps {
  copyValue: string;
  label: string;
  preview: ReactNode;
  className?: string;
}

export function TokenCardLarge({ 
  copyValue, 
  label, 
  preview,
  className 
}: TokenCardLargeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (copied) return;
    
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [copyValue, copied]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-xl bg-white p-4 border-2 border-transparent hover:border-foreground transition-colors duration-200 cursor-pointer text-left w-full",
        className
      )}
    >
      {/* Copy icon - positioned in top right corner */}
      <span className="absolute top-4 right-4 h-5 w-5 flex-shrink-0">
        <svg 
          className={cn(
            "absolute inset-0 h-5 w-5 text-muted-foreground transition-all duration-200",
            copied ? "opacity-0 scale-50" : "opacity-0 group-hover:opacity-100"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg 
          className={cn(
            "absolute inset-0 h-5 w-5 text-foreground transition-all duration-200",
            copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </span>

      {/* Preview area */}
      <div className="h-12 flex items-center justify-start">
        {preview}
      </div>
      
      {/* Label / Copied state */}
      <span 
        className={cn(
          "text-xs font-medium transition-all duration-300 truncate w-full",
          copied ? "text-foreground" : "text-foreground"
        )}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}
