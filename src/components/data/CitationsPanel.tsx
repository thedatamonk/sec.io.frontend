import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SourceCitation } from "@/types/api";

interface CitationsPanelProps {
  citations: SourceCitation[];
}

export function CitationsPanel({ citations }: CitationsPanelProps) {
  if (citations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground p-4">
        No source citations available
      </p>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
        Data sourced from SEC EDGAR filings
      </p>
      {citations.map((cite, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
        >
          <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {cite.ticker}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {cite.filing_type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {cite.fiscal_period}
              </span>
            </div>
            {cite.filing_date && (
              <p className="text-xs text-muted-foreground">
                Filed: {cite.filing_date}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
