// Mirrors backend Pydantic models exactly

// --- response.py ---

export interface SourceCitation {
  ticker: string;
  filing_type: string;
  filing_date: string | null;
  fiscal_period: string;
}

export interface ChatResponse {
  answer: string;
  citations: SourceCitation[];
  scratchpad?: Record<string, unknown>;
}

// --- financial.py ---

export interface FilingMetadata {
  company: string;
  ticker: string;
  cik: string;
  filing_type: string;
  filing_date: string | null;
  fiscal_year: number;
  quarter: number | null;
  fiscal_period_end: string | null;
}

export interface IncomeStatementData {
  metadata: FilingMetadata;
  revenue: number | null;
  cost_of_revenue: number | null;
  gross_profit: number | null;
  operating_income: number | null;
  net_income: number | null;
  eps_basic: number | null;
  eps_diluted: number | null;
}

// --- query.py ---

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history: ConversationMessage[];
}

// --- company lookup ---

export interface CompanyInfo {
  name: string;
  ticker: string;
  cik: string;
  exchanges: string[];
  sic: string;
  sic_description: string;
  category: string;
  entity_type: string;
}

// --- health ---

export interface HealthResponse {
  status: string;
}

// --- error ---

export interface ApiErrorDetail {
  detail: string;
}
