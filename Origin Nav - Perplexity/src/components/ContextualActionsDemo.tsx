import React from "react";
import { Sparkles, Wand2, Languages, FileEdit, RotateCcw } from "lucide-react";

export default function ContextualActionsDemo() {
  const [selectedText, setSelectedText] = React.useState("");
  const [menuPosition, setMenuPosition] = React.useState<{ x: number; y: number } | null>(null);
  const [generatedText, setGeneratedText] = React.useState<string | null>(null);

  const text =
    "The quarterly results exceeded expectations with revenue growing 45% year-over-year. This demonstrates strong market demand for our products.";

  const handleTextSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const selectedStr = selection?.toString().trim();

    if (selectedStr && selectedStr.length > 0) {
      setSelectedText(selectedStr);
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setMenuPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + 8,
        });
      }
    } else {
      setSelectedText("");
      setMenuPosition(null);
      setGeneratedText(null);
    }
  };

  const actions = [
    {
      id: "improve",
      icon: Wand2,
      label: "Improve writing",
      description: "Make it clearer and more engaging",
      result: "The quarterly results significantly exceeded expectations, with revenue surging 45% year-over-year—a clear testament to the robust market demand for our innovative products.",
    },
    {
      id: "summarize",
      icon: FileEdit,
      label: "Summarize",
      description: "Create a concise version",
      result: "Q4 revenue grew 45% YoY, beating expectations.",
    },
    {
      id: "translate",
      icon: Languages,
      label: "Translate",
      description: "Convert to another language",
      result: "Les résultats trimestriels ont dépassé les attentes avec un chiffre d'affaires en croissance de 45 % d'une année sur l'autre.",
    },
  ];

  const handleAction = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId);
    if (action) {
      setGeneratedText(action.result);
    }
  };

  const handleClearSelection = () => {
    window.getSelection()?.removeAllRanges();
    setSelectedText("");
    setMenuPosition(null);
    setGeneratedText(null);
  };

  return (
    <div className="border border-border rounded-lg bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          Select any text to see contextual AI actions
        </span>
      </div>

      <div
        className="relative p-4 border border-border rounded-lg bg-muted/30 text-foreground leading-relaxed select-text cursor-text"
        onMouseUp={handleTextSelect}
      >
        {text}

        {/* Contextual Menu */}
        {menuPosition && selectedText && (
          <div
            className="absolute z-10 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[280px]"
            style={{
              left: `${Math.min(menuPosition.x, 400)}px`,
              top: `${menuPosition.y}px`,
            }}
          >
            <div className="space-y-1">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleAction(action.id)}
                    className="w-full flex items-start gap-3 p-2 rounded hover:bg-accent transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm mb-0.5">{action.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Generated Result */}
      {generatedText && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">AI-generated result</span>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <p className="text-foreground leading-relaxed">{generatedText}</p>
        </div>
      )}
    </div>
  );
}
