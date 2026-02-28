import { EmptyState } from "./EmptyState";
import { CitationsPanel } from "./CitationsPanel";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import type { SourceCitation } from "@/types/api";

interface AnalysisData {
  citations: SourceCitation[];
  summary: string;
}

interface DataPanelProps {
  analysis: AnalysisData;
  isLoading: boolean;
  error: string | null;
  errorStatus: number | null;
}

export function DataPanel({
  analysis,
  isLoading,
  error,
  errorStatus,
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

  if (analysis.citations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      <CitationsPanel citations={analysis.citations} />
    </div>
  );
}
