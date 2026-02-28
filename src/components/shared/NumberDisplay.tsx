import { formatCurrency, formatPercentage, formatEps } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface NumberDisplayProps {
  value: number;
  format: "currency" | "percentage" | "eps" | "plain";
  className?: string;
}

export function NumberDisplay({ value, format, className }: NumberDisplayProps) {
  let formatted: string;
  switch (format) {
    case "currency":
      formatted = formatCurrency(value);
      break;
    case "percentage":
      formatted = formatPercentage(value);
      break;
    case "eps":
      formatted = formatEps(value);
      break;
    default:
      formatted = value.toLocaleString();
  }

  const isNegative = value < 0;
  const isPositivePercentage = format === "percentage" && value > 0;

  return (
    <span
      className={cn(
        "tabular-nums",
        isNegative && "text-red-400",
        isPositivePercentage && "text-emerald-400",
        className,
      )}
    >
      {formatted}
    </span>
  );
}
