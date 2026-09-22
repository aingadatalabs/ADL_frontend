/**
 * Represents a normalized financial market quote snapshot.
 */
export interface MarketQuote {
  symbol: string;
  /** Serialized float or string representation of symbol price */
  price: number | string;
  currency: 'USD' | 'EUR' | 'GBP' | string;
  /** ISO-8601 UTC timestamp string (e.g. 2026-09-05T14:32:01Z) */
  as_of: string;
  source: string;
  mode?: 'live' | 'delayed' | 'representative';
  change_percent?: string;
  volume_24h?: number;
}

/**
 * Represents public company financial fundamentals and metrics.
 */
export interface CompanyFundamentals {
  ticker: string;
  revenue_ttm: number;
  gross_margin: number;
  period: string;
  lineage_id: string;
}

/**
 * API Response Envelope for market intelligence queries.
 */
export interface ApiResponseEnvelope<T> {
  data: T;
  meta: {
    trace_id: string;
    executed_at: string;
    cached: boolean;
  };
}