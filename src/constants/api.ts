export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ENDPOINTS = {
  health: "/api/health",
  chat: "/api/chat",
  company: (ticker: string) => `/api/company/${ticker}`,
} as const;
