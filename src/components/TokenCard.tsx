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
        
        {/* Label / Copied state */}
        <span 
          className={cn(
            "text-xs font-medium transition-all duration-300 truncate",
            copied ? "text-foreground" : "text-foreground group-hover:text-foreground"
          )}
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
      
      {/* Label / Copied state */}
      <span 
        className={cn(
          "text-[10px] font-medium transition-all duration-300 truncate text-center w-full",
          copied ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}
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
        "group flex flex-col items-center gap-3 rounded-xl bg-white p-4 border border-transparent hover:border-border/50 transition-colors duration-200 cursor-pointer text-left w-full",
        className
      )}
    >
      {/* Preview area */}
      <div className="h-12 flex items-center justify-center">
        {preview}
      </div>
      
      {/* Label / Copied state */}
      <span 
        className={cn(
          "text-xs font-medium transition-all duration-300 truncate text-center w-full",
          copied ? "text-foreground" : "text-foreground group-hover:text-foreground"
        )}
      >
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}
