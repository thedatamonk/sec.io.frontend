import { cn } from "@/lib/utils";
import { TypingIndicator } from "./TypingIndicator";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const hasAnalysis =
    message.analysisResponse != null &&
    message.analysisResponse.citations.length > 0;

  if (message.isLoading) {
    return (
      <div className="flex justify-start">
        <TypingIndicator />
      </div>
    );
  }

  if (message.error) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertCircle className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-medium text-destructive">Error</span>
          </div>
          <p className="text-sm text-foreground">{message.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {hasAnalysis && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-foreground/10">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span className="text-xs opacity-70">
              Analysis ready — see data panel
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
