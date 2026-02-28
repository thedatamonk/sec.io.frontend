# Sec.io UI

The frontend for [sec.io](https://github.com/thedatamonk/sec.io) — a conversational financial analysis tool that lets you query SEC EDGAR filings using natural language. Ask questions about a public company's financials, and get back charts, tables, and cited data points sourced directly from their SEC filings.

> **Backend repo:** https://github.com/thedatamonk/sec.io
> The backend must be running locally (or deployed) before this frontend is functional.

---

## What It Does

- Enter a **stock ticker** (e.g. `AAPL`, `MSFT`) to load a company's SEC filing data
- **Chat** with an LLM to query financial metrics — revenue, margins, EPS, cash flow, etc.
- View results as **time-series charts**, **comparison charts**, **metric cards**, and **raw data tables**
- See **citations** linking every data point back to the source SEC filing
- **Guardrails** flag LLM-computed math so you know when numbers were calculated vs. retrieved

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (Radix UI) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Project Structure

```
sec-llm-frontend/
├── src/
│   ├── App.tsx                    # Root component and layout orchestrator
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles
│   │
│   ├── components/
│   │   ├── chat/                  # Chat UI
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatMessageList.tsx
│   │   │   ├── ClarificationMessage.tsx
│   │   │   └── TypingIndicator.tsx
│   │   │
│   │   ├── data/                  # Data visualization
│   │   │   ├── DataPanel.tsx
│   │   │   ├── TimeSeriesChart.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── RawDataTable.tsx
│   │   │   ├── CitationsPanel.tsx
│   │   │   ├── ComputationsDisplay.tsx
│   │   │   ├── CsvDownloadButton.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── guardrails/            # LLM math and data warnings
│   │   │   ├── GuardrailsBanner.tsx
│   │   │   └── LLMMathBadge.tsx
│   │   │
│   │   ├── layout/                # Page layout
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   │
│   │   ├── shared/                # Reusable UI pieces
│   │   │   ├── ErrorAlert.tsx
│   │   │   ├── LoadingOverlay.tsx
│   │   │   └── NumberDisplay.tsx
│   │   │
│   │   └── ui/                    # shadcn/ui primitives
│   │
│   ├── hooks/
│   │   ├── use-chat.ts            # Chat state and message sending
│   │   ├── use-analysis.ts        # Analysis response processing
│   │   └── use-company-lookup.ts  # Ticker → company metadata
│   │
│   ├── lib/
│   │   ├── api-client.ts          # Fetch wrapper for backend API
│   │   ├── csv.ts                 # CSV export utilities
│   │   └── utils.ts               # General helpers
│   │
│   ├── constants/
│   │   ├── api.ts                 # API endpoint constants
│   │   └── theme.ts               # Theme constants
│   │
│   └── types/
│       ├── api.ts                 # API response types
│       └── chat.ts                # Chat message types
│
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json                # shadcn/ui config
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [sec.io backend](https://github.com/thedatamonk/sec.io) running on `http://localhost:8000`

### Installation

```bash
# Clone the repo
git clone https://github.com/thedatamonk/sec-llm-frontend
cd sec-llm-frontend

# Install dependencies
npm install
```

### Configuration

Create a `.env.development` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

If your backend is running on a different host or port, update this value accordingly.

### Running the App

```bash
# Start the development server (runs on http://localhost:3000)
npm run dev
```

### Other Commands

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Backend API

This frontend communicates with the following endpoints on the backend:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/company/{ticker}` | Look up company metadata by ticker |
| `POST` | `/api/chat` | Send a chat message and receive analysis |

See the [backend repo](https://github.com/thedatamonk/sec.io) for full API documentation.
