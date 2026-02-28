import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  return (
    <div className="flex flex-col h-full p-6 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Analyzing SEC filings...</span>
      </div>

      {/* Chart skeleton */}
      <Skeleton className="h-[350px] w-full rounded-lg" />

      {/* Table skeleton rows */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}
