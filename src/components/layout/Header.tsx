import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHealth } from "@/lib/api-client";

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
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
      <Button variant="ghost" size="sm" onClick={onReset}>
        <RotateCcw className="h-4 w-4 mr-1.5" />
        New Analysis
      </Button>
    </header>
  );
}
