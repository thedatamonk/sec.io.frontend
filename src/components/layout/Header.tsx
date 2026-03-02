import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getHealth } from "@/lib/api-client";

interface HeaderProps {
  onReset: () => void;
  mode: "single" | "multi";
  onModeChange: (mode: "single" | "multi") => void;
}

export function Header({ onReset, mode, onModeChange }: HeaderProps) {
  const [healthy, setHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        await getHealth();
        if (!cancelled) setHealthy(true);
      } catch {
        if (!cancelled) setHealthy(false);
      }
    };
    check();
    const interval = setInterval(check, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold">Financial Analyst</h1>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              healthy === null
                ? "bg-muted-foreground"
                : healthy
                  ? "bg-emerald-400"
                  : "bg-red-400"
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {healthy === null
              ? "Checking..."
              : healthy
                ? "Backend connected"
                : "Backend offline"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className={mode === "single" ? "text-foreground" : "text-muted-foreground"}>
            Single Agent
          </span>
          <Switch
            checked={mode === "multi"}
            onCheckedChange={(checked) => onModeChange(checked ? "multi" : "single")}
            aria-label="Toggle multi-agent mode"
          />
          <span className={mode === "multi" ? "text-blue-400 font-medium" : "text-muted-foreground"}>
            Multi-Agent
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1.5" />
          New Analysis
        </Button>
      </div>
    </header>
  );
}
