import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  error: string;
  statusCode: number | null;
}

function getErrorTitle(statusCode: number | null): string {
  switch (statusCode) {
    case 404:
      return "Not Found";
    case 422:
      return "Unavailable Metric";
    case 429:
      return "Rate Limited";
    case 502:
      return "AI Service Unavailable";
    default:
      return "Error";
  }
}

function getUserMessage(statusCode: number | null, detail: string): string {
  switch (statusCode) {
    case 404:
      return detail || "The requested company or filing was not found in SEC EDGAR.";
    case 422:
      return detail || "The requested metric is not available for this filing.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 502:
      return "The AI service is temporarily unavailable. Please try again later.";
    default:
      return detail || "An unexpected error occurred.";
  }
}

export function ErrorAlert({ error, statusCode }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{getErrorTitle(statusCode)}</AlertTitle>
      <AlertDescription>{getUserMessage(statusCode, error)}</AlertDescription>
    </Alert>
  );
}
