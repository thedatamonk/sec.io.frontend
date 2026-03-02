import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import type {
  ChatResponse,
  ChatRequest,
  CompanyInfo,
  HealthResponse,
} from "@/types/api";

export class ApiClientError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail: string;
    try {
      const body = await res.json();
      detail = body.detail || res.statusText;
    } catch {
      detail = res.statusText;
    }
    throw new ApiClientError(res.status, detail);
  }

  return res.json() as Promise<T>;
}

export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>(ENDPOINTS.health);
}

export function getCompany(ticker: string): Promise<CompanyInfo> {
  return request<CompanyInfo>(ENDPOINTS.company(ticker));
}

export function postChat(
  body: ChatRequest,
  mode: "single" | "multi" = "single"
): Promise<ChatResponse> {
  const qs = mode === "multi" ? "?mode=multi" : "";
  return request<ChatResponse>(`${ENDPOINTS.chat}${qs}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
