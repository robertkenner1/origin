import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function SmartComposeDemo() {
  const [text, setText] = React.useState("");
  const [suggestion, setSuggestion] = React.useState("");
  const [showSuggestion, setShowSuggestion] = React.useState(false);

  const suggestions = {
    "I'm writing to follow up": " on our conversation from last week about the project timeline. I wanted to check in and see if you had a chance to review the proposal I sent over.",
    "Thank you for": " taking the time to meet with me yesterday. I really appreciated your insights on the market trends and look forward to collaborating on this initiative.",
    "I hope this email finds you well": ". I wanted to reach out regarding the upcoming product launch and discuss potential collaboration opportunities between our teams.",
    "Could you please": " share the latest version of the document when you get a chance? I'd like to review it before our meeting on Friday.",
  };

  const promptStarters = [
    "I'm writing to follow up",
    "Thank you for",
    "Could you please",
    "I hope this email finds you well",
  ];

  React.useEffect(() => {
    // Check if current text matches any suggestion trigger
    const matchedKey = Object.keys(suggestions).find((key) =>
      text.endsWith(key)
    );

    if (matchedKey) {
      setSuggestion(suggestions[matchedKey as keyof typeof suggestions]);
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
      setSuggestion("");
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && showSuggestion) {
      e.preventDefault();
      setText(text + suggestion);
      setSuggestion("");
      setShowSuggestion(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setText(prompt);
  };

  return (
    <div className="border border-border rounded-lg bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm">AI-powered writing assistant</span>
        </div>
        {showSuggestion && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            Press Tab to accept
          </span>
        )}
      </div>

      {/* Text Area */}
      <div className="relative p-4">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your message..."
            className="min-h-[200px] resize-none"
            rows={8}
          />
          {showSuggestion && (
            <div className="absolute top-0 left-0 right-0 p-3 pointer-events-none whitespace-pre-wrap">
              <span className="invisible">{text}</span>
              <span className="text-muted-foreground/50">{suggestion}</span>
            </div>
          )}
        </div>

        {/* Prompt Starters */}
        {text.length === 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Quick starters:</p>
            <div className="flex flex-wrap gap-2">
              {promptStarters.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent border border-border rounded-full transition-colors flex items-center gap-1"
                >
                  {prompt}
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3 bg-muted/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          <span>
            {text.length > 0
              ? "Type to continue or press Tab to accept suggestions"
              : "Click a quick starter or begin typing to see AI suggestions"}
          </span>
        </div>
      </div>
    </div>
  );
}
