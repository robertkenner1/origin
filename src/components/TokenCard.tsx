import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
}

export function TokenCard({ 
  copyValue, 
  label, 
  preview, 
  variant = 'card',
  className 
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
    return (
      <button
        onClick={handleCopy}
        className={cn(
          "group flex items-center gap-2 rounded-full bg-white pl-1.5 pr-3 py-1.5 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer",
          className
        )}
      >
        {/* Preview (e.g., color swatch) */}
        {preview}
        
        {/* Label / Copied state with copy icon */}
        <span className="flex items-center gap-1.5">
          <span 
            className={cn(
              "text-xs font-medium transition-all duration-300 truncate",
              copied ? "text-foreground" : "text-foreground"
            )}
          >
            {copied ? 'Copied!' : label}
          </span>
          {/* Copy icon - appears on hover, checkmark when copied */}
          <span className="relative h-3 w-3 flex-shrink-0">
            <svg 
              className={cn(
                "absolute inset-0 h-3 w-3 text-muted-foreground transition-all duration-200",
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
                "absolute inset-0 h-3 w-3 text-foreground transition-all duration-200",
                copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  // Card variant (for icons, border radius, elevation, etc.)
  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-xl bg-white p-3 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer text-left w-full",
        className
      )}
    >
      {/* Preview area */}
      {preview && (
        <div className="relative h-8 w-8 flex items-center justify-center">
          {preview}
        </div>
      )}
      
      {/* Label / Copied state with copy icon */}
      <div className="flex items-center justify-center gap-1 w-full">
        <span 
          className={cn(
            "text-[10px] font-medium transition-all duration-300 truncate text-center",
            copied ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {copied ? 'Copied!' : label}
        </span>
        {/* Copy icon - appears on hover, checkmark when copied */}
        <span className="relative h-2.5 w-2.5 flex-shrink-0">
          <svg 
            className={cn(
              "absolute inset-0 h-2.5 w-2.5 text-muted-foreground transition-all duration-200",
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
              "absolute inset-0 h-2.5 w-2.5 text-foreground transition-all duration-200",
              copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
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
        "group flex flex-col items-center gap-3 rounded-xl bg-white p-4 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer text-left w-full",
        className
      )}
    >
      {/* Preview area */}
      <div className="h-12 flex items-center justify-center">
        {preview}
      </div>
      
      {/* Label / Copied state with copy icon */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        <span 
          className={cn(
            "text-xs font-medium transition-all duration-300 truncate text-center",
            copied ? "text-foreground" : "text-foreground group-hover:text-foreground"
          )}
        >
          {copied ? 'Copied!' : label}
        </span>
        {/* Copy icon - appears on hover, checkmark when copied */}
        <span className="relative h-3 w-3 flex-shrink-0">
          <svg 
            className={cn(
              "absolute inset-0 h-3 w-3 text-muted-foreground transition-all duration-200",
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
              "absolute inset-0 h-3 w-3 text-foreground transition-all duration-200",
              copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
    </button>
  );
}
