import React from "react";
import { Check, X, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

export default function InlineSuggestionsDemo() {
  const [text, setText] = React.useState(
    "The team should of completed the project by now. Their going to present they're findings tomorrow."
  );
  const [dismissedSuggestions, setDismissedSuggestions] = React.useState<number[]>([]);

  const suggestions = [
    {
      id: 1,
      original: "should of",
      replacement: "should have",
      start: 9,
      end: 18,
      reason: "Grammar: Use 'should have' instead of 'should of'",
    },
    {
      id: 2,
      original: "Their",
      replacement: "They're",
      start: 48,
      end: 53,
      reason: "Grammar: Use 'They're' (they are) instead of 'Their' (possessive)",
    },
    {
      id: 3,
      original: "they're",
      replacement: "their",
      start: 72,
      end: 79,
      reason: "Grammar: Use 'their' (possessive) instead of 'they're' (they are)",
    },
  ];

  const [activeSuggestion, setActiveSuggestion] = React.useState<number | null>(null);

  const applySuggestion = (suggestionId: number) => {
    const suggestion = suggestions.find((s) => s.id === suggestionId);
    if (!suggestion) return;

    const newText = text.replace(suggestion.original, suggestion.replacement);
    setText(newText);
    setDismissedSuggestions([...dismissedSuggestions, suggestionId]);
    setActiveSuggestion(null);
  };

  const dismissSuggestion = (suggestionId: number) => {
    setDismissedSuggestions([...dismissedSuggestions, suggestionId]);
    setActiveSuggestion(null);
  };

  const activeSuggestions = suggestions.filter((s) => !dismissedSuggestions.includes(s.id));

  const renderTextWithHighlights = () => {
    if (activeSuggestions.length === 0) {
      return <span>{text}</span>;
    }

    const parts = [];
    let lastIndex = 0;

    activeSuggestions.forEach((suggestion, idx) => {
      // Add text before the suggestion
      if (suggestion.start > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>{text.substring(lastIndex, suggestion.start)}</span>
        );
      }

      // Add the highlighted suggestion
      parts.push(
        <span
          key={`suggestion-${suggestion.id}`}
          className="relative cursor-pointer underline decoration-wavy decoration-red-500 decoration-2 underline-offset-4 bg-red-50 px-0.5"
          onClick={() => setActiveSuggestion(suggestion.id)}
        >
          {text.substring(suggestion.start, suggestion.end)}
        </span>
      );

      lastIndex = suggestion.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  const activeSuggestionData = activeSuggestion
    ? suggestions.find((s) => s.id === activeSuggestion)
    : null;

  return (
    <div className="border border-border rounded-lg bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          {activeSuggestions.length} suggestion{activeSuggestions.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="relative">
        <div className="p-4 border border-border rounded-lg bg-muted/30 text-foreground leading-relaxed">
          {renderTextWithHighlights()}
        </div>

        {activeSuggestionData && (
          <div className="absolute top-full mt-2 left-4 right-4 p-4 bg-card border border-border rounded-lg shadow-lg z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded">
                    Grammar
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{activeSuggestionData.reason}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-muted-foreground">
                    {activeSuggestionData.original}
                  </span>
                  <span className="text-sm">→</span>
                  <span className="text-sm text-primary">
                    {activeSuggestionData.replacement}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => applySuggestion(activeSuggestionData.id)}
                  className="gap-1"
                >
                  <Check className="w-3 h-3" />
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dismissSuggestion(activeSuggestionData.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeSuggestions.length === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-800">All suggestions have been addressed!</span>
        </div>
      )}
    </div>
  );
}
