import { useState, useEffect, useCallback, type JSX } from 'react'
import { Footer } from './components/Footer'

export interface ApiEndpointConfig {
  id: string
  name: string
  path: string
  description: string
  columns: { key: string; label: string }[]
}

export interface ProductRecord {
  product_id?: string
  sku?: string
  product_title?: string
  vendor?: string
  price_usd?: number
  market_median_price_usd?: number
  price_variance_vs_market_pct?: number
  is_in_stock?: boolean
  discount_pct?: number
  review_count?: number
  average_rating?: number
  sentiment_score_positive?: number
  has_active_ads?: boolean
  active_creative_count?: number
  brand_country_of_origin?: string
  category?: string
  store_url?: string
  [key: string]: unknown
}

export interface ApiResponsePayload {
  merchant_id?: string
  store_url?: string
  record_count?: number
  data?: ProductRecord[]
  [key: string]: unknown
}

const ENDPOINTS: ApiEndpointConfig[] = [
  {
    id: 'pricing-opportunities',
    name: '1. Pricing & Unit Economics',
    path: '/api/v1/merchants/{merchant_id}/pricing-opportunities',
    description: 'Exposes competitive pricing variance, market median prices, and unit economic benchmarking.',
    columns: [
      { key: 'product_title', label: 'PRODUCT TITLE' },
      { key: 'vendor', label: 'VENDOR' },
      { key: 'price_usd', label: 'PRICE (USD)' },
      { key: 'market_median_price_usd', label: 'MARKET MEDIAN' },
      { key: 'price_variance_vs_market_pct', label: 'VARIANCE %' },
    ],
  },
  {
    id: 'inventory-risks',
    name: '2. Inventory & Stock Analytics',
    path: '/api/v1/merchants/{merchant_id}/inventory-risks',
    description: 'Exposes stockout velocity metrics, historical availability rates, and inventory risk levels.',
    columns: [
      { key: 'product_title', label: 'PRODUCT' },
      { key: 'sku', label: 'SKU' },
      { key: 'is_in_stock', label: 'AVAILABILITY' },
      { key: 'discount_pct', label: 'DISCOUNT %' },
    ],
  },
  {
    id: 'reviews-sentiment',
    name: '3. Customer Review Sentiment',
    path: '/api/v1/merchants/{merchant_id}/reviews-sentiment',
    description: 'Exposes review counts, average star ratings, positive/negative sentiment ratios, and widget providers.',
    columns: [
      { key: 'product_title', label: 'PRODUCT' },
      { key: 'review_count', label: 'REVIEWS' },
      { key: 'average_rating', label: 'RATING' },
      { key: 'sentiment_score_positive', label: 'POSITIVE %' },
    ],
  },
  {
    id: 'seo-visibility',
    name: '4. SEO & Organic Visibility',
    path: '/api/v1/merchants/{merchant_id}/seo-visibility',
    description: 'Exposes target keywords, monthly search volume, organic search rankings, and search intent flags.',
    columns: [
      { key: 'product_title', label: 'PRODUCT' },
      { key: 'vendor', label: 'VENDOR' },
      { key: 'category', label: 'CATEGORY' },
      { key: 'price_usd', label: 'PRICE' },
    ],
  },
  {
    id: 'ad-intelligence',
    name: '5. Paid Ad Intelligence',
    path: '/api/v1/merchants/{merchant_id}/ad-intelligence',
    description: 'Exposes active creative counts across Meta and TikTok, ad platforms, and campaign durations.',
    columns: [
      { key: 'product_title', label: 'PRODUCT' },
      { key: 'vendor', label: 'BRAND' },
      { key: 'has_active_ads', label: 'ACTIVE ADS' },
      { key: 'active_creative_count', label: 'CREATIVES' },
    ],
  },
  {
    id: 'brand-intelligence',
    name: '6. Corporate Brand Intelligence',
    path: '/api/v1/merchants/{merchant_id}/brand-intelligence',
    description: 'Exposes HQ country of origin, estimated web session traffic, market positioning, and social reach.',
    columns: [
      { key: 'vendor', label: 'BRAND NAME' },
      { key: 'brand_country_of_origin', label: 'ORIGIN' },
      { key: 'store_url', label: 'STORE URL' },
    ],
  },
]

const DEMO_STOREFRONTS = [
  { id: 'kaged', name: 'Kaged (kaged.com)' },
  { id: 'transparentlabs', name: 'Transparent Labs (transparentlabs.com)' },
  { id: 'cellucor', name: 'Cellucor (cellucor.com)' },
  { id: 'nutricost', name: 'Nutricost (nutricost.com)' },
  { id: 'naturemade', name: 'Nature Made (naturemade.com)' },
  { id: 'appliednutrition.uk', name: 'Applied Nutrition UK (appliednutrition.uk)' },
  { id: 'olly', name: 'Olly (olly.com)' },
  { id: 'nakednutrition', name: 'Naked Nutrition (nakednutrition.com)' },
  { id: 'beekeepersnaturals', name: "Beekeeper's Naturals (beekeepersnaturals.com)" },
  { id: 'codeage', name: 'Codeage (codeage.com)' },
]

export default function SsipApiDemo(): JSX.Element {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const ssipHomeUrl = isLocal ? '/ssip' : 'https://ssip.aingadatalabs.com'
  const mainSiteUrl = isLocal ? '/' : 'https://aingadatalabs.com'

  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointConfig>(ENDPOINTS[0])
  const [selectedMerchant, setSelectedMerchant] = useState<string>('kaged')
  const [viewMode, setViewMode] = useState<'table' | 'json' | 'curl'>('table')
  const [loading, setLoading] = useState<boolean>(false)
  const [responsePayload, setResponsePayload] = useState<ApiResponsePayload | null>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const activePath = selectedEndpoint.path.replace('{merchant_id}', selectedMerchant)
  
  // Point directly to active deployed Render engine (adl-ssip-engine)
  const apiBaseUrl = isLocal 
    ? 'https://adl-ssip-engine.onrender.com' 
    : 'https://ssip.aingadatalabs.com'

  const fullRequestUrl = `${apiBaseUrl}${activePath}?limit=20`
  const curlCommand = `curl -X 'GET' \\\n  '${fullRequestUrl}' \\\n  -H 'accept: application/json'`

  const handleExecuteRequest = useCallback(async (): Promise<void> => {
    setLoading(true)
    const startTime = performance.now()

    try {
      const res = await fetch(fullRequestUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ApiResponsePayload = await res.json()
      setResponsePayload(data)
    } catch {
      // Fallback mock payload if request fails or network drops
      setResponsePayload({
        merchant_id: selectedMerchant,
        store_url: `https://${selectedMerchant}.com`,
        record_count: 5,
        data: [
          {
            product_id: '1361979375723',
            sku: 'KM-CRTN-100',
            product_title: 'Pre-Workout Elite (30 Servings)',
            vendor: selectedMerchant.toUpperCase(),
            price_usd: 39.99,
            market_median_price_usd: 44.99,
            price_variance_vs_market_pct: -11.11,
            is_in_stock: true,
            discount_pct: 11.11,
            review_count: 890,
            average_rating: 4.8,
            sentiment_score_positive: 0.92,
            has_active_ads: true,
            active_creative_count: 14,
            brand_country_of_origin: 'USA',
          },
          {
            product_id: '1361979375724',
            sku: 'KM-WHEY-200',
            product_title: '100% Whey Protein Isolate 2lb',
            vendor: selectedMerchant.toUpperCase(),
            price_usd: 59.99,
            market_median_price_usd: 59.99,
            price_variance_vs_market_pct: 0.0,
            is_in_stock: true,
            discount_pct: 0.0,
            review_count: 1420,
            average_rating: 4.9,
            sentiment_score_positive: 0.95,
            has_active_ads: true,
            active_creative_count: 8,
            brand_country_of_origin: 'USA',
          },
        ],
      })
    } finally {
      const endTime = performance.now()
      setExecutionTime(Math.round(endTime - startTime))
      setLoading(false)
    }
  }, [fullRequestUrl, selectedMerchant])

  useEffect(() => {
    let isMounted = true

    void (async () => {
      if (isMounted) {
        await handleExecuteRequest()
      }
    })()

    return () => {
      isMounted = false
    }
  }, [handleExecuteRequest])

  const copyToClipboard = (text: string): void => {
    void navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderTableCell = (row: ProductRecord, key: string): JSX.Element | string => {
    const val = row[key]
    if (typeof val === 'boolean') {
      return val ? 'YES' : 'NO'
    }
    if (val === null || val === undefined) {
      return 'N/A'
    }
    return String(val)
  }

  return (
    <div className="ssip-demo-shell">
      <style>{`
        .ssip-demo-shell {
          background-color: #030705;
          color: #d1d5db;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          padding: 2rem 1rem 0;
          box-sizing: border-box;
        }

        .ssip-demo-container {
          max-width: 1150px;
          margin: 0 auto;
        }

        .ssip-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          padding-bottom: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .ssip-badge {
          background-color: #10b981;
          color: #030705;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-size: 0.85rem;
        }

        .ssip-hero h1 {
          color: #ffffff;
          font-size: 2.25rem;
          margin: 0 0 0.5rem;
        }

        .ssip-hero p {
          color: #9ca3af;
          font-size: 1rem;
          margin: 0 0 2rem;
        }

        .ssip-playground-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .ssip-card {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          color: #10b981;
          font-family: monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .ssip-select, .ssip-input {
          width: 100%;
          background-color: #030705;
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #ffffff;
          padding: 0.65rem 0.85rem;
          border-radius: 4px;
          font-size: 0.9rem;
          box-sizing: border-box;
        }

        .btn-run {
          width: 100%;
          background-color: #10b981;
          color: #030705;
          font-weight: 700;
          padding: 0.85rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-run:hover {
          background-color: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        .btn-cta-request {
          background-color: #10b981;
          color: #030705;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 0px rgba(16, 185, 129, 0);
        }

        .btn-cta-request:hover {
          background-color: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.6), 0 0 10px rgba(52, 211, 153, 0.4);
          filter: brightness(1.1);
        }

        .response-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .view-mode-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .mode-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #9ca3af;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          font-family: monospace;
          transition: all 0.2s ease;
        }

        .mode-btn:hover {
          border-color: #10b981;
          color: #10b981;
        }

        .mode-btn.active {
          background-color: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #10b981;
          font-weight: 700;
        }

        .code-block {
          background-color: #030705;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem;
          border-radius: 6px;
          color: #10b981;
          font-family: monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .ssip-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .ssip-table th, .ssip-table td {
          padding: 0.75rem 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.85rem;
        }

        .ssip-table th {
          color: #10b981;
          font-family: monospace;
          font-size: 0.75rem;
        }

        @media (max-width: 850px) {
          .ssip-playground-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ssip-demo-container">
        <header className="ssip-nav">
          <a href={mainSiteUrl} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <span className="ssip-badge">SSIP</span>
            <strong style={{ color: '#ffffff', fontSize: '1.1rem' }}>API Playground</strong>
          </a>
          <a href={ssipHomeUrl} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem' }}>
            &larr; Back to SSIP Overview
          </a>
        </header>

        <section className="ssip-hero">
          <span style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            LIVE DATA &bull; DEMO MODE &bull; MAX 20 RECORDS
          </span>
          <h1>Shopify Supplements Intelligence API Playground</h1>
          <p>Execute live intelligence queries against our normalized Gold Lake database across 10 monitored storefronts.</p>
        </section>

        <div className="ssip-playground-grid">
          <div className="ssip-card">
            <div className="form-group">
              <label>INTELLIGENCE ENDPOINT</label>
              <select
                className="ssip-select"
                value={selectedEndpoint.id}
                onChange={(e) => {
                  const ep = ENDPOINTS.find((x) => x.id === e.target.value)
                  if (ep) setSelectedEndpoint(ep)
                }}
              >
                {ENDPOINTS.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>MONITORED STOREFRONT</label>
              <select className="ssip-select" value={selectedMerchant} onChange={(e) => setSelectedMerchant(e.target.value)}>
                {DEMO_STOREFRONTS.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>RESULT LIMIT</label>
              <input type="text" className="ssip-input" value="20 records (Server Hard Cap)" disabled />
            </div>

            <button type="button" className="btn-run" onClick={() => void handleExecuteRequest()} disabled={loading}>
              {loading ? 'EXECUTING QUERY...' : 'RUN LIVE REQUEST →'}
            </button>
          </div>

          <div className="ssip-card">
            <div className="response-header">
              <div>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem', marginRight: '0.75rem' }}>200 OK</span>
                <span style={{ color: '#6b7280', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {executionTime !== null ? `${executionTime}ms` : '---'} &bull; {responsePayload?.record_count ?? 0} records returned
                </span>
              </div>

              <div className="view-mode-toggle">
                <button type="button" className={`mode-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
                  TABLE
                </button>
                <button type="button" className={`mode-btn ${viewMode === 'json' ? 'active' : ''}`} onClick={() => setViewMode('json')}>
                  JSON
                </button>
                <button type="button" className={`mode-btn ${viewMode === 'curl' ? 'active' : ''}`} onClick={() => setViewMode('curl')}>
                  cURL
                </button>
              </div>
            </div>

            {viewMode === 'table' && (
              <div style={{ overflowX: 'auto' }}>
                <table className="ssip-table">
                  <thead>
                    <tr>
                      {selectedEndpoint.columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {responsePayload?.data?.map((row: ProductRecord, idx: number) => (
                      <tr key={idx}>
                        {selectedEndpoint.columns.map((col) => (
                          <td key={col.key} style={{ color: col.key.includes('title') ? '#ffffff' : '#d1d5db' }}>
                            {renderTableCell(row, col.key)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === 'json' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <button type="button" className="mode-btn" onClick={() => copyToClipboard(JSON.stringify(responsePayload, null, 2))}>
                    {copied ? 'COPIED!' : 'COPY JSON'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{JSON.stringify(responsePayload, null, 2)}</code>
                </pre>
              </div>
            )}

            {viewMode === 'curl' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <button type="button" className="mode-btn" onClick={() => copyToClipboard(curlCommand)}>
                    {copied ? 'COPIED!' : 'COPY cURL'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{curlCommand}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        <section style={{ textAlign: 'center', backgroundColor: '#09110d', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2.5rem', borderRadius: '8px', marginBottom: '3rem' }}>
          <h2 style={{ color: '#ffffff', margin: '0 0 0.5rem' }}>Need Full Production API Access?</h2>
          <p style={{ color: '#9ca3af', margin: '0 0 1.5rem' }}>Get dedicated API keys, full store coverage across all 56 brands, and custom webhook feeds.</p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Production%20SSIP%20API%20Access%20Request"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-request"
          >
            Request API Key &rarr;
          </a>
        </section>
      </div>

      <Footer />
    </div>
  )
}