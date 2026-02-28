import { MessageSquare } from "lucide-react";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import type { ChatMessage } from "@/types/chat";

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatPanel({
  messages,
  isLoading,
  onSendMessage,
}: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Chat</span>
      </div>

      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-2">
            <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="text-sm text-muted-foreground">
              Ask a question about a company's financials
            </p>
            <p className="text-xs text-muted-foreground/60">
              e.g. "Show Apple revenue for 2024" or "Compare MSFT EPS 2023 vs
              2024"
            </p>
          </div>
        </div>
      ) : (
        <ChatMessageList messages={messages} />
      )}

      <ChatInput isLoading={isLoading} onSend={onSendMessage} />
    </div>
  );
}
