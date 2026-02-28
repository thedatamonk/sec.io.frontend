import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as USD currency.
 * Large values (>= 1B) are abbreviated: $391.04B, $12.3M, etc.
 */
export function formatCurrency(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

/** Format a decimal or percentage value as +2.09% / -1.5%. */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/** Format EPS value: $6.08 */
export function formatEps(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** Format any number based on the metric type. */
export function formatMetricValue(
  value: number,
  metric: string,
): string {
  if (metric === "eps") return formatEps(value);
  if (metric === "gross_margin") return formatPercentage(value);
  return formatCurrency(value);
}
