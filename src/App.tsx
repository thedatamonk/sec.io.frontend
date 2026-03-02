import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DataPanel } from "@/components/data/DataPanel";
import { useChat } from "@/hooks/use-chat";
import { useAnalysis } from "@/hooks/use-analysis";
import { useCompanyLookup } from "@/hooks/use-company-lookup";

export default function App() {
  const [mode, setMode] = useState<"single" | "multi">("single");

  const {
    messages,
    currentAnalysis,
    isLoading,
    error,
    errorStatus,
    sendMessage,
    resetConversation,
  } = useChat(mode);

  const analysis = useAnalysis(currentAnalysis);
  const { ticker, company, isLooking, lookupError, lookup } =
    useCompanyLookup();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        ticker={ticker}
        company={company}
        isLooking={isLooking}
        lookupError={lookupError}
        onTickerChange={lookup}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onReset={resetConversation} mode={mode} onModeChange={setMode} />
        <MainLayout
          chatPanel={
            <ChatPanel
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
            />
          }
          dataPanel={
            <DataPanel
              analysis={analysis}
              isLoading={isLoading}
              error={error}
              errorStatus={errorStatus}
              mode={mode}
            />
          }
        />
      </div>
    </div>
  );
}
