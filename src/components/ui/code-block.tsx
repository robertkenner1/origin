import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
  showCopy?: boolean;
}

export function CodeBlock({ children, className, language, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (copied) return; // Prevent multiple clicks
    
    const text = codeRef.current?.textContent || '';
    
    // Quick flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl p-4 transition-all duration-150",
        flash ? "ring-1 ring-border bg-muted" : "ring-0 ring-transparent bg-muted/50",
        className
      )}
    >
      {showCopy && (
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-300 text-sm text-muted-foreground",
            copied 
              ? "bg-transparent border border-transparent cursor-default" 
              : "bg-background/80 border border-border/50 hover:bg-muted cursor-pointer"
          )}
          aria-label="Copy code"
        >
          <span className="relative h-4 w-4 overflow-hidden">
            <svg 
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
                copied ? "opacity-0 scale-50" : "opacity-100 scale-100"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg 
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
                copied ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span 
            className="transition-all duration-300 ease-out"
            style={{ width: copied ? '46px' : '32px' }}
          >
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
      )}
      {language && (
        <span className="absolute top-3 left-4 text-xs text-muted-foreground font-medium uppercase">
          {language}
        </span>
      )}
      <div ref={codeRef} className={cn("overflow-x-auto", language && "pt-4")}>
        {children}
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={cn("bg-muted px-1.5 py-0.5 rounded text-foreground text-sm font-mono", className)}>
      {children}
    </code>
  );
}

