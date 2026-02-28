import { useCallback, useEffect, useRef, useState } from "react";
import { getCompany, ApiClientError } from "@/lib/api-client";
import type { CompanyInfo } from "@/types/api";

export function useCompanyLookup() {
  const [ticker, setTicker] = useState("");
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [isLooking, setIsLooking] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lookup = useCallback((value: string) => {
    setTicker(value);
    setLookupError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const cleaned = value.trim().toUpperCase();
    if (!cleaned) {
      setCompany(null);
      return;
    }
    if (cleaned.length > 5) {
      setCompany(null);
      setLookupError("No such ticker found");
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLooking(true);
      try {
        const info = await getCompany(cleaned);
        setCompany(info);
        setLookupError(null);
      } catch (err) {
        setCompany(null);
        if (err instanceof ApiClientError && err.status === 404) {
          setLookupError("No such ticker found");
        } else {
          setLookupError("Lookup failed");
        }
      } finally {
        setIsLooking(false);
      }
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { ticker, company, isLooking, lookupError, lookup };
}
