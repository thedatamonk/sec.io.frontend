import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface LLMMathBadgeProps {
  llmComputedMath: boolean;
}

export function LLMMathBadge({ llmComputedMath }: LLMMathBadgeProps) {
  if (llmComputedMath) {
    return (
      <Badge
        variant="destructive"
        className="text-xs gap-1"
      >
        <ShieldAlert className="h-3 w-3" />
        LLM Math
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="text-xs gap-1 border-emerald-500/30 text-emerald-400"
    >
      <ShieldCheck className="h-3 w-3" />
      Deterministic
    </Badge>
  );
}
