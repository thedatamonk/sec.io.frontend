/** Recharts color tokens — matches CSS variables */
export const CHART_COLORS = {
  primary: "hsl(217, 91%, 60%)",    // blue-500
  positive: "hsl(160, 84%, 39%)",   // emerald-500
  negative: "hsl(0, 84%, 60%)",     // red-400
  grid: "hsl(215, 28%, 17%)",       // slate-800
  muted: "hsl(215, 16%, 47%)",      // slate-500
  amber: "hsl(38, 92%, 50%)",       // amber-500
} as const;

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: "hsl(222, 47%, 11%)",
  border: "1px solid hsl(215, 28%, 17%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 98%)",
} as const;
