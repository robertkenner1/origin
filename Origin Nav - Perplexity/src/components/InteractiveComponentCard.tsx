import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Box } from "lucide-react";

type InteractiveComponentCardProps = {
  title: string;
  onClick: () => void;
  children: (isHovered: boolean) => React.ReactNode;
};

export default function InteractiveComponentCard({
  title,
  onClick,
  children,
}: InteractiveComponentCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-left group"
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow bg-gradient-to-br from-muted/30 to-muted/50">
        <CardContent className="p-0">
          <div className="h-32 flex items-center justify-center p-6">
            {children(isHovered)}
          </div>
        </CardContent>
        <CardFooter className="px-4 pt-2.5 pb-3 border-t bg-background flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            <Box className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm">{title}</span>
        </CardFooter>
      </Card>
    </button>
  );
}
