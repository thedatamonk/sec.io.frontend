import type { ChatResponse } from "./api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  analysisResponse?: ChatResponse;
  isLoading?: boolean;
  error?: string;
}

export interface ConversationState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}
