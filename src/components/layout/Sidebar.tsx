import { Search, Building2, TrendingUp, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CompanyInfo } from "@/types/api";

const SUPPORTED_METRICS = [
  "Revenue",
  "Net Income",
  "EPS",
  "Gross Margin",
  "Operating Income",
];

interface SidebarProps {
  ticker: string;
  company: CompanyInfo | null;
  isLooking: boolean;
  lookupError: string | null;
  onTickerChange: (value: string) => void;
}

export function Sidebar({
  ticker,
  company,
  isLooking,
  lookupError,
  onTickerChange,
}: SidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 border-r border-border bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">S</span>
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">
          SEC-LLM
        </span>
      </div>

      <Separator />

      {/* Ticker search */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ticker (e.g. AAPL)"
            value={ticker}
            onChange={(e) => onTickerChange(e.target.value)}
            className="pl-9 uppercase"
          />
          {isLooking && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          )}
        </div>
        {lookupError && (
          <p className="text-xs text-destructive">{lookupError}</p>
        )}
      </div>

      {/* Company card */}
      {company && (
        <div className="px-4 pb-4">
          <Card className="bg-secondary/50">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                {company.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {company.ticker}
                </Badge>
                {company.exchanges?.map((ex) => (
                  <Badge key={ex} variant="secondary" className="text-xs">
                    {ex}
                  </Badge>
                ))}
              </div>
              {company.sic_description && (
                <p className="text-xs text-muted-foreground">
                  {company.sic_description}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Separator />

      {/* Supported metrics */}
      <div className="p-4 flex-1">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" />
          Supported Metrics
        </h3>
        <div className="space-y-1">
          {SUPPORTED_METRICS.map((m) => (
            <div
              key={m}
              className="text-sm text-sidebar-foreground/80 px-2 py-1 rounded-md hover:bg-sidebar-accent transition-colors"
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          Data from SEC EDGAR filings
        </p>
      </div>
    </aside>
  );
}
