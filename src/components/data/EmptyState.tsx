import { BarChart3 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <BarChart3 className="h-16 w-16 text-muted-foreground/20 mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground mb-1">
        No data yet
      </h3>
      <p className="text-sm text-muted-foreground/60 max-w-sm">
        Ask a question in the chat to see financial charts, data tables, and
        source citations here.
      </p>
    </div>
  );
}
