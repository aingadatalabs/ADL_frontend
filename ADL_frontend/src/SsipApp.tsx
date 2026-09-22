import { useState, useRef, type JSX } from 'react'
import { Footer } from './components/Footer'

export interface CatalogProduct {
  id: string
  title: string
  vendor: string
  priceUsd: number
  marketMedianUsd: number
  variancePct: number
  inStock: boolean
  reviewCount: number
  rating: number
  positiveSentimentPct: number
  activeAds: boolean
  creativesCount: number
  originCountry: string
}

const SAMPLE_CATALOG: CatalogProduct[] = [
  {
    id: 'prod_001',
    title: 'Grass-Fed Whey Isolate 2lb',
    vendor: 'TRANSPARENT LABS',
    priceUsd: 59.99,
    marketMedianUsd: 64.99,
    variancePct: -7.69,
    inStock: true,
    reviewCount: 1420,
    rating: 4.9,
    positiveSentimentPct: 94.2,
    activeAds: true,
    creativesCount: 12,
    originCountry: 'USA',
  },
  {
    id: 'prod_002',
    title: 'Pre-Workout Elite (30 Servings)',
    vendor: 'KAGED',
    priceUsd: 39.99,
    marketMedianUsd: 44.99,
    variancePct: -11.11,
    inStock: true,
    reviewCount: 890,
    rating: 4.8,
    positiveSentimentPct: 89.5,
    activeAds: true,
    creativesCount: 14,
    originCountry: 'USA',
  },
  {
    id: 'prod_003',
    title: 'Legend Pre-Workout V2',
    vendor: 'GHOST',
    priceUsd: 44.99,
    marketMedianUsd: 49.99,
    variancePct: -10.0,
    inStock: true,
    reviewCount: 2150,
    rating: 4.9,
    positiveSentimentPct: 96.1,
    activeAds: true,
    creativesCount: 18,
    originCountry: 'USA',
  },
  {
    id: 'prod_004',
    title: 'C4 Ultimate Shred (20 Servings)',
    vendor: 'CELLUCOR',
    priceUsd: 49.99,
    marketMedianUsd: 49.99,
    variancePct: 0.0,
    inStock: false,
    reviewCount: 630,
    rating: 4.5,
    positiveSentimentPct: 82.0,
    activeAds: false,
    creativesCount: 0,
    originCountry: 'USA',
  },
  {
    id: 'prod_005',
    title: 'Smoothie Protein Blend 1kg',
    vendor: 'NUTRICOST',
    priceUsd: 27.95,
    marketMedianUsd: 32.5,
    variancePct: -14.0,
    inStock: true,
    reviewCount: 310,
    rating: 4.6,
    positiveSentimentPct: 88.4,
    activeAds: true,
    creativesCount: 6,
    originCountry: 'USA',
  },
]

export default function SsipApp(): JSX.Element {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const mainSiteUrl = isLocal ? '/' : 'https://aingadatalabs.com'

  const [activeTab, setActiveTab] = useState<'catalog' | 'pricing' | 'api'>('catalog')
  const [searchTerm, setSearchTerm] = useState('')

  // Scroll target ref for smoothly navigating down to the catalog section
  const catalogSectionRef = useRef<HTMLDivElement | null>(null)

  const filteredCatalog = SAMPLE_CATALOG.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToCatalog = () => {
    setActiveTab('catalog')
    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navigateToPlayground = () => {
    window.location.href = '/ssip/api-demo'
  }

  return (
    <div className="ssip-app-shell">
      <style>{`
        .ssip-app-shell {
          background-color: #030705;
          color: #d1d5db;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          padding: 2rem 1.5rem 0;
          box-sizing: border-box;
        }

        .ssip-container {
          max-width: 1150px;
          margin: 0 auto;
        }

        .ssip-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          padding-bottom: 1.25rem;
          margin-bottom: 3rem;
        }

        .ssip-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
        }

        .ssip-brand-tag {
          background-color: #10b981;
          color: #030705;
          font-weight: 800;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.85rem;
        }

        .ssip-brand-name {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.15rem;
        }

        .ssip-back-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .ssip-back-link:hover {
          color: #10b981;
        }

        .ssip-hero-section {
          margin-bottom: 3.5rem;
        }

        .ssip-status-badge {
          color: #10b981;
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .ssip-hero-section h1 {
          color: #ffffff;
          font-size: 2.75rem;
          font-weight: 800;
          margin: 0 0 1rem;
          line-height: 1.15;
        }

        .ssip-hero-section p {
          color: #9ca3af;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 780px;
          margin: 0 0 2rem;
        }

        .ssip-cta-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 3.5rem;
        }

        .btn-primary {
          background-color: #10b981;
          color: #030705;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }

        .btn-primary:hover {
          background-color: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        .btn-secondary {
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-weight: 600;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }

        .btn-secondary:hover {
          border-color: #10b981;
          color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.25);
        }

        .ssip-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .ssip-metric-card {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .metric-title {
          color: #6b7280;
          font-size: 0.75rem;
          font-family: monospace;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          color: #ffffff;
          font-size: 2.25rem;
          font-weight: 800;
          display: block;
          margin-bottom: 0.25rem;
        }

        .metric-sub {
          color: #10b981;
          font-size: 0.85rem;
        }

        .ssip-tabs-header {
          display: flex;
          gap: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          scroll-margin-top: 2rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: #6b7280;
          font-family: monospace;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.75rem 0.25rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          color: #10b981;
          border-bottom-color: #10b981;
        }

        .tab-btn:hover {
          color: #10b981;
        }

        .ssip-search-bar {
          width: 100%;
          background-color: #09110d;
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #ffffff;
          padding: 0.85rem 1.15rem;
          border-radius: 6px;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          box-sizing: border-box;
        }

        .ssip-table-wrapper {
          overflow-x: auto;
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          margin-bottom: 3.5rem;
        }

        .ssip-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .ssip-data-table th, .ssip-data-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.9rem;
        }

        .ssip-data-table th {
          color: #10b981;
          font-family: monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }

        .tag-stock {
          color: #10b981;
          font-weight: 600;
        }

        .tag-out {
          color: #ef4444;
          font-weight: 600;
        }
      `}</style>

      <div className="ssip-container">
        <nav className="ssip-top-nav">
          <a href={mainSiteUrl} className="ssip-brand">
            <span className="ssip-brand-tag">SSIP</span>
            <span className="ssip-brand-name">Shopify Supplements Intelligence</span>
          </a>
          <a href={mainSiteUrl} className="ssip-back-link">
            &larr; Return to Ainga Data Labs
          </a>
        </nav>

        <section className="ssip-hero-section">
          <span className="ssip-status-badge">
            &bull; PIPELINE OPERATIONAL &bull; LAST SNAPSHOT: 8 MIN AGO
          </span>
          <h1>Shopify Supplements Intelligence</h1>
          <p>
            A continuously updated intelligence layer for the supplement e-commerce market. SSIP monitors 56 Shopify storefronts and transforms changing product catalogs, prices, variants, discounts, and availability into structured, time-aware market data.
          </p>

          <div className="ssip-cta-group">
            <button
              type="button"
              className="btn-primary"
              onClick={scrollToCatalog}
            >
              Explore Intelligence &rarr;
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={navigateToPlayground}
            >
              API Access &rarr;
            </button>
          </div>
        </section>

        <section className="ssip-metrics-grid">
          <div className="ssip-metric-card">
            <span className="metric-title">STOREFRONTS MONITORED</span>
            <strong className="metric-value">56</strong>
            <span className="metric-sub">Active Shopify Brands</span>
          </div>
          <div className="ssip-metric-card">
            <span className="metric-title">PRODUCT RECORDS</span>
            <strong className="metric-value">20,078</strong>
            <span className="metric-sub">Normalized SKUs</span>
          </div>
          <div className="ssip-metric-card">
            <span className="metric-title">VARIANTS TRACKED</span>
            <strong className="metric-value">1,482</strong>
            <span className="metric-sub">Flavors & Sizes</span>
          </div>
          <div className="ssip-metric-card">
            <span className="metric-title">DATA FRESHNESS</span>
            <strong className="metric-value">&lt; 12m</strong>
            <span className="metric-sub">Snapshot Frequency</span>
          </div>
        </section>

        {/* TARGET ELEMENT FOR SMOOTH AUTO-SCROLL REDIRECT */}
        <div ref={catalogSectionRef} className="ssip-tabs-header">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            PRODUCT CATALOG
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            PRICING INTELLIGENCE
          </button>
          <button
            type="button"
            className="tab-btn"
            onClick={navigateToPlayground}
          >
            API PLAYGROUND &rarr;
          </button>
        </div>

        {activeTab === 'catalog' && (
          <section>
            <input
              type="text"
              className="ssip-search-bar"
              placeholder="Search by product title or vendor (e.g., Transparent Labs, Pre-Workout)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="ssip-table-wrapper">
              <table className="ssip-data-table">
                <thead>
                  <tr>
                    <th>PRODUCT TITLE</th>
                    <th>VENDOR</th>
                    <th>PRICE (USD)</th>
                    <th>MARKET MEDIAN</th>
                    <th>VARIANCE</th>
                    <th>AVAILABILITY</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalog.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{item.title}</td>
                      <td>{item.vendor}</td>
                      <td>${item.priceUsd.toFixed(2)}</td>
                      <td>${item.marketMedianUsd.toFixed(2)}</td>
                      <td style={{ color: item.variancePct < 0 ? '#10b981' : '#d1d5db' }}>
                        {item.variancePct > 0 ? `+${item.variancePct}%` : `${item.variancePct}%`}
                      </td>
                      <td>
                        {item.inStock ? (
                          <span className="tag-stock">IN STOCK</span>
                        ) : (
                          <span className="tag-out">OUT OF STOCK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'pricing' && (
          <section style={{ backgroundColor: '#09110d', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '2rem', marginBottom: '3.5rem' }}>
            <h2 style={{ color: '#ffffff', margin: '0 0 0.5rem' }}>Pricing & Margin Delta Analytics</h2>
            <p style={{ color: '#9ca3af', margin: '0 0 1.5rem' }}>
              Real-time variance signals against aggregated supplement market medians across whey isolates, pre-workouts, and recovery formulas.
            </p>
            <div className="ssip-table-wrapper" style={{ marginBottom: 0 }}>
              <table className="ssip-data-table">
                <thead>
                  <tr>
                    <th>BRAND</th>
                    <th>RATING</th>
                    <th>REVIEWS</th>
                    <th>POSITIVE %</th>
                    <th>ACTIVE ADS</th>
                    <th>CREATIVES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalog.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{item.vendor}</td>
                      <td>{item.rating} / 5.0</td>
                      <td>{item.reviewCount}</td>
                      <td style={{ color: '#10b981' }}>{item.positiveSentimentPct}%</td>
                      <td>{item.activeAds ? 'YES' : 'NO'}</td>
                      <td>{item.creativesCount} active</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}