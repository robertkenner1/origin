import React from "react";
import { Send, Sparkles, ThumbsUp, ThumbsDown, Copy, RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function ConversationUIDemo() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm here to help you write better. What would you like to work on today?",
    },
    {
      id: 2,
      role: "user",
      content: "I need help making this email more professional: 'hey can u send me that report asap?'",
    },
    {
      id: 3,
      role: "assistant",
      content: "I'd be happy to help you make that email more professional. Here's a revised version:\n\n\"Hello,\n\nCould you please send me the report at your earliest convenience?\n\nThank you!\"",
      suggestions: [
        "Make it more formal",
        "Add urgency",
        "Make it friendlier"
      ]
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] border border-border rounded-lg bg-background">
      {/* Chat Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm">AI Writing Assistant</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className={message.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"}>
                {message.role === "assistant" ? <Sparkles className="w-4 h-4" /> : "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
              <div
                className={`rounded-lg px-4 py-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              
              {/* Assistant Actions */}
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Copy"
                  >
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Regenerate"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Thumbs up"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    aria-label="Thumbs down"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              )}

              {/* Quick Suggestions */}
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="px-3 py-1.5 text-xs bg-background border border-border rounded-full hover:bg-accent transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help with your writing..."
            className="resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} size="icon" className="h-auto">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
