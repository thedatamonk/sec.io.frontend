import { HelpCircle } from "lucide-react";

interface ClarificationMessageProps {
  content: string;
}

export function ClarificationMessage({ content }: ClarificationMessageProps) {
  return (
    <div className="flex gap-2 items-start max-w-[85%]">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
        <div className="flex items-center gap-1.5 mb-1">
          <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-medium text-amber-400">
            Clarification needed
          </span>
        </div>
        <p className="text-sm text-foreground">{content}</p>
      </div>
    </div>
  );
}
