import { EmptyState } from "./EmptyState";
import { CitationsPanel } from "./CitationsPanel";
import { ScratchpadPanel } from "./ScratchpadPanel";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { SourceCitation } from "@/types/api";

interface AnalysisData {
  citations: SourceCitation[];
  summary: string;
  scratchpad?: Record<string, unknown>;
}

interface DataPanelProps {
  analysis: AnalysisData;
  isLoading: boolean;
  error: string | null;
  errorStatus: number | null;
  mode: "single" | "multi";
}

export function DataPanel({
  analysis,
  isLoading,
  error,
  errorStatus,
  mode,
}: DataPanelProps) {
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorAlert error={error} statusCode={errorStatus} />
      </div>
    );
  }

  const hasCitations = analysis.citations.length > 0;
  const scratchpad = analysis.scratchpad;
  const tasks = (scratchpad?.tasks as unknown[]) ?? [];
  const taskCount = tasks.length;

  if (mode === "multi" && (hasCitations || scratchpad)) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Tabs defaultValue="citations" className="flex flex-col h-full">
          <div className="px-4 pt-4 shrink-0">
            <TabsList className="w-full">
              <TabsTrigger value="citations" className="flex-1">
                Citations
              </TabsTrigger>
              <TabsTrigger value="scratchpad" className="flex-1 gap-1.5">
                Agent Plan
                {taskCount > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs px-1.5 min-w-[1.25rem] h-5 font-medium">
                    {taskCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="citations" className="flex-1 overflow-auto mt-0">
            {hasCitations ? (
              <CitationsPanel citations={analysis.citations} />
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          <TabsContent value="scratchpad" className="flex-1 overflow-auto mt-0">
            {scratchpad ? (
              <ScratchpadPanel scratchpad={scratchpad} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm p-8">
                <p>No agent plan data available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (!hasCitations) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      <CitationsPanel citations={analysis.citations} />
    </div>
  );
}
