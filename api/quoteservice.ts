import type { MarketQuote, CompanyFundamentals } from '@/types/market'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/+$/, '')

/**
 * Fetches and normalizes market quote data for a requested symbol.
 */
export async function fetchMarketQuote(symbol: string): Promise<MarketQuote> {
  const sanitizedSymbol = encodeURIComponent(symbol.trim().toUpperCase())
  
  // Support both static mock endpoints and dynamic REST backends
  const endpointUrl = `${API_BASE_URL}/markets/quotes.json?symbol=${sanitizedSymbol}`

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to fetch market quote for ${sanitizedSymbol}`)
    }

    const rawData = await response.json()

    // Validate date format
    const timestamp = Date.parse(rawData.as_of)
    if (Number.isNaN(timestamp)) {
      throw new Error(`Invalid ISO date format received for symbol ${sanitizedSymbol}: ${rawData.as_of}`)
    }

    return {
      symbol: String(rawData.symbol || sanitizedSymbol),
      price: typeof rawData.price === 'number' ? rawData.price : Number(rawData.price).toFixed(2),
      currency: rawData.currency || 'USD',
      as_of: new Date(timestamp).toISOString(),
      source: rawData.source || 'consolidated',
      mode: rawData.mode || 'representative',
    }
  } catch (error) {
    console.error(`[quoteService] fetchMarketQuote failed for ${symbol}:`, error)
    throw error
  }
}

/**
 * Fetches company fundamentals for a requested ticker.
 */
export async function fetchCompanyFundamentals(ticker: string): Promise<CompanyFundamentals> {
  const sanitizedTicker = encodeURIComponent(ticker.trim().toUpperCase())
  const endpointUrl = `${API_BASE_URL}/companies/${sanitizedTicker}/fundamentals.json`

  const response = await fetch(endpointUrl, {
    headers: { 'Accept': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: Failed to fetch fundamentals for ${sanitizedTicker}`)
  }

  const rawData = await response.json()

  return {
    ticker: String(rawData.ticker || sanitizedTicker),
    revenue_ttm: Number(rawData.revenue_ttm || 0),
    gross_margin: Number(rawData.gross_margin || 0),
    period: String(rawData.period || 'N/A'),
    lineage_id: String(rawData.lineage_id || ''),
  }
}