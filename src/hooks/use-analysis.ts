import { useMemo } from "react";
import type { ChatResponse } from "@/types/api";

export function useAnalysis(analysis: ChatResponse | null) {
  return useMemo(() => {
    if (!analysis) {
      return { citations: [], summary: "" };
    }
    return {
      citations: analysis.citations,
      summary: analysis.answer,
    };
  }, [analysis]);
}
