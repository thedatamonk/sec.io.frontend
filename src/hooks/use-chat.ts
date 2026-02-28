import { useCallback, useState } from "react";
import { postChat, ApiClientError } from "@/lib/api-client";
import type { ChatResponse, ConversationMessage } from "@/types/api";
import type { ChatMessage } from "@/types/chat";

let messageCounter = 0;
function nextId(): string {
  return `msg-${++messageCounter}-${Date.now()}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationMessage[]
  >([]);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);
      setErrorStatus(null);

      // Add user message to UI
      const userMsg: ChatMessage = {
        id: nextId(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Add loading placeholder
      const loadingId = nextId();
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          isLoading: true,
        },
      ]);
      setIsLoading(true);

      try {
        const response = await postChat({
          message: content,
          conversation_history: conversationHistory,
        });

        setConversationHistory([
          ...conversationHistory,
          { role: "user", content },
          { role: "assistant", content: response.answer },
        ]);
        setCurrentAnalysis(response);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? {
                  ...m,
                  content: response.answer,
                  isLoading: false,
                  analysisResponse: response,
                }
              : m,
          ),
        );
      } catch (err) {
        const detail =
          err instanceof ApiClientError
            ? err.detail
            : "An unexpected error occurred";
        const status =
          err instanceof ApiClientError ? err.status : 500;

        setError(detail);
        setErrorStatus(status);

        // Replace loading message with error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? { ...m, content: detail, isLoading: false, error: detail }
              : m,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [conversationHistory, isLoading],
  );

  const resetConversation = useCallback(() => {
    setMessages([]);
    setConversationHistory([]);
    setCurrentAnalysis(null);
    setIsLoading(false);
    setError(null);
    setErrorStatus(null);
    messageCounter = 0;
  }, []);

  return {
    messages,
    currentAnalysis,
    isLoading,
    error,
    errorStatus,
    sendMessage,
    resetConversation,
  };
}
