import { useState, type JSX } from 'react'

export default function SsipApp(): JSX.Element {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const mainSiteUrl = isLocal ? '/' : 'https://aingadatalabs.com'

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStorefront, setFilterStorefront] = useState('ALL')
  const [activeTab, setActiveTab] = useState<'catalog' | 'pricing' | 'api'>('catalog')

  const products = [
    { name: 'Pre-Workout Elite (30 Servings)', storefront: 'Kaged', price: 39.99, prevPrice: 44.99, delta: '-$5.00 (-11.1%)', status: 'IN STOCK', observedAt: '08:42 UTC' },
    { name: 'Grass-Fed Whey Isolate 2lb', storefront: 'Transparent Labs', price: 59.99, prevPrice: 59.99, delta: '$0.00 (0.0%)', status: 'IN STOCK', observedAt: '08:40 UTC' },
    { name: 'Legend Pre-Workout V2', storefront: 'Ghost', price: 44.99, prevPrice: 49.99, delta: '-$5.00 (-10.0%)', status: 'SALE', observedAt: '08:35 UTC' },
    { name: 'C4 Ultimate Shred (20 Servings)', storefront: 'Cellucor', price: 29.99, prevPrice: 34.99, delta: '-$5.00 (-14.2%)', status: 'OUT OF STOCK', observedAt: '08:21 UTC' },
    { name: 'Hydration Electrolyte Powder', storefront: 'Gorilla Mind', price: 34.99, prevPrice: 34.99, delta: '$0.00 (0.0%)', status: 'IN STOCK', observedAt: '08:18 UTC' },
    { name: 'Plant Protein Organic Isolate', storefront: 'Onnit', price: 49.99, prevPrice: 54.99, delta: '-$5.00 (-9.1%)', status: 'IN STOCK', observedAt: '08:12 UTC' },
  ]

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStorefront = filterStorefront === 'ALL' || p.storefront === filterStorefront
    return matchesSearch && matchesStorefront
  })

  return (
    <div className="ssip-shell">
      <style>{`
        .ssip-shell {
          background-color: #030705;
          color: #d1d5db;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        .ssip-container {
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

        .ssip-nav-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
        }

        .ssip-badge {
          background-color: #10b981;
          color: #030705;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-size: 0.85rem;
        }

        .ssip-hero {
          margin-bottom: 3rem;
        }

        .ssip-status-strip {
          color: #10b981;
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ssip-hero h1 {
          color: #ffffff;
          font-size: 2.5rem;
          margin: 0 0 1rem;
          line-height: 1.2;
        }

        .ssip-hero p {
          color: #9ca3af;
          max-width: 780px;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }

        .ssip-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3rem;
        }

        .ssip-kpi-card {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 1.5rem;
        }

        .ssip-kpi-label {
          color: #6b7280;
          font-size: 0.75rem;
          font-family: monospace;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .ssip-kpi-val {
          color: #ffffff;
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .ssip-kpi-sub {
          color: #10b981;
          font-size: 0.8rem;
        }

        .ssip-tabs-nav {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.5rem;
        }

        .ssip-tab-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          padding: 0.75rem 0.25rem;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .ssip-tab-btn.active {
          color: #10b981;
          border-bottom-color: #10b981;
        }

        .ssip-panel {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 4rem;
        }

        .ssip-filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .ssip-input {
          background-color: #030705;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.6rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          flex: 1;
          min-width: 240px;
        }

        .ssip-select {
          background-color: #030705;
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #10b981;
          padding: 0.6rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .ssip-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .ssip-table th, .ssip-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.9rem;
        }

        .ssip-table th {
          color: #10b981;
          font-family: monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }

        .ssip-section-title {
          color: #ffffff;
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
        }

        .ssip-section-sub {
          color: #9ca3af;
          font-size: 0.95rem;
          margin: 0 0 2rem;
          line-height: 1.5;
        }

        .ssip-outcomes-grid, .ssip-persona-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .ssip-outcome-card, .ssip-persona-card {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1.75rem;
        }

        .ssip-outcome-card h3, .ssip-persona-card h3 {
          color: #ffffff;
          font-size: 1.1rem;
          margin: 0 0 0.5rem;
        }

        .ssip-outcome-card p, .ssip-persona-card p {
          color: #9ca3af;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .ssip-arch-strip {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 4rem;
          text-align: center;
        }

        .ssip-arch-flow {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 2rem 0;
          font-family: monospace;
          color: #10b981;
          font-size: 0.9rem;
        }

        .ssip-arch-step {
          background-color: #030705;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }

        .ssip-cta-banner {
          background-color: #09110d;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 8px;
          padding: 3rem 2rem;
          text-align: center;
          margin-bottom: 4rem;
        }

        .ssip-cta-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.75rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background-color: #10b981;
          color: #030705;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-secondary {
          background-color: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .ssip-nav { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .ssip-hero h1 { font-size: 1.85rem; }
          .ssip-panel { padding: 1.25rem; }
        }
      `}</style>

      <div className="ssip-container">
        {/* NAV HEADER */}
        <header className="ssip-nav">
          <a href={mainSiteUrl} className="ssip-nav-brand">
            <span className="ssip-badge">SSIP</span>
            <strong style={{ color: '#ffffff', fontSize: '1.1rem' }}>Shopify Supplements Intelligence</strong>
          </a>
          <a href={mainSiteUrl} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem' }}>
            &larr; Return to Ainga Data Labs
          </a>
        </header>

        {/* HERO SECTION */}
        <section className="ssip-hero">
          <div className="ssip-status-strip">
            <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
            PIPELINE OPERATIONAL &bull; LAST SNAPSHOT: 8 MIN AGO
          </div>
          <h1>Shopify Supplements Intelligence</h1>
          <p>
            A continuously updated intelligence layer for the supplement e-commerce market. SSIP monitors 56 Shopify storefronts and transforms changing product catalogs, prices, variants, discounts, and availability into structured, time-aware market data.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#intelligence" className="btn-primary">Explore Intelligence &rarr;</a>
            <a href="#api-preview" className="btn-secondary">API Access &rarr;</a>
          </div>
        </section>

        {/* 4 REFINED KPI CARDS */}
        <section className="ssip-kpi-grid">
          <div className="ssip-kpi-card">
            <span className="ssip-kpi-label">STOREFRONTS MONITORED</span>
            <div className="ssip-kpi-val">56</div>
            <span className="ssip-kpi-sub">Active Shopify Brands</span>
          </div>
          <div className="ssip-kpi-card">
            <span className="ssip-kpi-label">PRODUCT RECORDS</span>
            <div className="ssip-kpi-val">20,078</div>
            <span className="ssip-kpi-sub">Normalized SKUs</span>
          </div>
          <div className="ssip-kpi-card">
            <span className="ssip-kpi-label">VARIANTS TRACKED</span>
            <div className="ssip-kpi-val">1,482</div>
            <span className="ssip-kpi-sub">Flavors &amp; Sizes</span>
          </div>
          <div className="ssip-kpi-card">
            <span className="ssip-kpi-label">DATA FRESHNESS</span>
            <div className="ssip-kpi-val">&lt; 12m</div>
            <span className="ssip-kpi-sub">Snapshot Frequency</span>
          </div>
        </section>

        {/* INTERACTIVE INTELLIGENCE TABS */}
        <section id="intelligence">
          <div className="ssip-tabs-nav">
            <button type="button" className={`ssip-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>
              PRODUCT CATALOG
            </button>
            <button type="button" className={`ssip-tab-btn ${activeTab === 'pricing' ? 'active' : ''}`} onClick={() => setActiveTab('pricing')}>
              PRICING INTELLIGENCE
            </button>
            <button type="button" className={`ssip-tab-btn ${activeTab === 'api' ? 'active' : ''}`} onClick={() => setActiveTab('api')}>
              API PREVIEW
            </button>
          </div>

          {/* TAB 1: PRODUCT CATALOG */}
          {activeTab === 'catalog' && (
            <div className="ssip-panel">
              <div className="ssip-filter-bar">
                <input
                  type="text"
                  className="ssip-input"
                  placeholder="Search 20,078 products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="ssip-select"
                  value={filterStorefront}
                  onChange={(e) => setFilterStorefront(e.target.value)}
                >
                  <option value="ALL">All 56 Storefronts</option>
                  <option value="Kaged">Kaged</option>
                  <option value="Transparent Labs">Transparent Labs</option>
                  <option value="Ghost">Ghost</option>
                  <option value="Cellucor">Cellucor</option>
                  <option value="Gorilla Mind">Gorilla Mind</option>
                  <option value="Onnit">Onnit</option>
                </select>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="ssip-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>STOREFRONT</th>
                      <th>CURRENT PRICE</th>
                      <th>&Delta; PRICE</th>
                      <th>AVAILABILITY</th>
                      <th>LAST OBSERVED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.name}>
                        <td style={{ color: '#ffffff', fontWeight: 600 }}>{p.name}</td>
                        <td>{p.storefront}</td>
                        <td style={{ fontFamily: 'monospace' }}>${p.price.toFixed(2)}</td>
                        <td style={{ color: p.delta.startsWith('-') ? '#10b981' : '#9ca3af', fontFamily: 'monospace' }}>{p.delta}</td>
                        <td>
                          <span style={{ color: p.status === 'IN STOCK' ? '#10b981' : p.status === 'SALE' ? '#3b82f6' : '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                            &bull; {p.status}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>{p.observedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING INTELLIGENCE */}
          {activeTab === 'pricing' && (
            <div className="ssip-panel">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: '#030705', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <small style={{ color: '#6b7280', fontSize: '0.7rem', fontFamily: 'monospace' }}>PRICE DECREASES (24H)</small>
                  <h3 style={{ color: '#10b981', margin: '0.25rem 0 0' }}>142 Products</h3>
                </div>
                <div style={{ backgroundColor: '#030705', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <small style={{ color: '#6b7280', fontSize: '0.7rem', fontFamily: 'monospace' }}>PRICE INCREASES (24H)</small>
                  <h3 style={{ color: '#ef4444', margin: '0.25rem 0 0' }}>18 Products</h3>
                </div>
                <div style={{ backgroundColor: '#030705', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <small style={{ color: '#6b7280', fontSize: '0.7rem', fontFamily: 'monospace' }}>ACTIVE DISCOUNTS</small>
                  <h3 style={{ color: '#3b82f6', margin: '0.25rem 0 0' }}>34% of Catalog</h3>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="ssip-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>STOREFRONT</th>
                      <th>PREVIOUS</th>
                      <th>CURRENT</th>
                      <th>CHANGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: '#ffffff' }}>Pre-Workout Elite (30 Servings)</td>
                      <td>Kaged</td>
                      <td>$44.99</td>
                      <td style={{ color: '#10b981' }}>$39.99</td>
                      <td style={{ color: '#10b981', fontFamily: 'monospace' }}>-11.1%</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#ffffff' }}>Legend Pre-Workout V2</td>
                      <td>Ghost</td>
                      <td>$49.99</td>
                      <td style={{ color: '#10b981' }}>$44.99</td>
                      <td style={{ color: '#10b981', fontFamily: 'monospace' }}>-10.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: API PREVIEW */}
          {activeTab === 'api' && (
            <div className="ssip-panel" id="api-preview">
              <span style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem' }}>GET /v1/ssip/products/snapshots</span>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>Example response from the SSIP data contract.</p>
              <pre style={{ backgroundColor: '#030705', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '4px', overflowX: 'auto', color: '#10b981', margin: '0 0 1.5rem' }}>
                <code>{JSON.stringify({
                  status: "success",
                  data: {
                    storefront: "kaged",
                    product_id: "prod_88291",
                    title: "Pre-Workout Elite (30 Servings)",
                    current_price: 39.99,
                    previous_price: 44.99,
                    currency: "USD",
                    availability: "in_stock",
                    last_observed_at: "2026-09-21T08:42:01Z"
                  }
                }, null, 2)}</code>
              </pre>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=SSIP%20API%20Access%20Request" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                Request API Access &rarr;
              </a>
            </div>
          )}
        </section>

        {/* WHAT SSIP DELIVERS */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 className="ssip-section-title">What SSIP Delivers</h2>
          <p className="ssip-section-sub">Transforming raw storefront data into structured, machine-readable outcomes.</p>
          
          <div className="ssip-outcomes-grid">
            <div className="ssip-outcome-card">
              <h3>Catalog Intelligence</h3>
              <p>Normalized product and variant records across monitored storefronts.</p>
            </div>
            <div className="ssip-outcome-card">
              <h3>Pricing Intelligence</h3>
              <p>Historical price observations and detected price changes.</p>
            </div>
            <div className="ssip-outcome-card">
              <h3>Inventory Signals</h3>
              <p>Observed availability and stock-state changes.</p>
            </div>
            <div className="ssip-outcome-card">
              <h3>Programmatic Data</h3>
              <p>Structured JSON/API and downloadable datasets for downstream systems.</p>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE STRIP */}
        <section className="ssip-arch-strip">
          <span style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.12em' }}>DATA PIPELINE ARCHITECTURE</span>
          <h2 style={{ color: '#ffffff', margin: '0.5rem 0' }}>How SSIP Operates</h2>
          <p style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
            SSIP converts continuously changing storefront data into structured, historical intelligence.
          </p>
          <div className="ssip-arch-flow">
            <span className="ssip-arch-step">SHOPIFY STOREFRONTS</span> &rarr;
            <span className="ssip-arch-step">INGESTION</span> &rarr;
            <span className="ssip-arch-step">NORMALIZATION</span> &rarr;
            <span className="ssip-arch-step">SNAPSHOTS</span> &rarr;
            <span className="ssip-arch-step">CHANGE DETECTION</span> &rarr;
            <span className="ssip-arch-step">API / DATA FEEDS</span>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 className="ssip-section-title">Built For Teams That Need Market Visibility</h2>
          <p className="ssip-section-sub">Serving e-commerce operators, analysts, and data engineering teams.</p>
          
          <div className="ssip-persona-grid">
            <div className="ssip-persona-card">
              <h3>E-Commerce Teams</h3>
              <p>Monitor competitor pricing and product availability automatically.</p>
            </div>
            <div className="ssip-persona-card">
              <h3>Market Researchers</h3>
              <p>Analyze product and pricing movements across storefronts.</p>
            </div>
            <div className="ssip-persona-card">
              <h3>Data Teams</h3>
              <p>Consume normalized e-commerce datasets programmatically.</p>
            </div>
            <div className="ssip-persona-card">
              <h3>Intelligence Platforms</h3>
              <p>Integrate structured supplement-market signals into downstream systems.</p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="ssip-cta-banner">
          <h2 style={{ color: '#ffffff', fontSize: '1.85rem', margin: '0 0 0.5rem' }}>Need structured e-commerce intelligence?</h2>
          <p style={{ color: '#9ca3af', margin: '0', fontSize: '1rem' }}>
            Access SSIP data through API delivery, historical datasets, or a custom intelligence feed.
          </p>
          <div className="ssip-cta-actions">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=SSIP%20API%20Access%20Request" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Request API Access &rarr;
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Custom%20SSIP%20Feed%20Inquiry" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              Discuss Custom Feed &rarr;
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}