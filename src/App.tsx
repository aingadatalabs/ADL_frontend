import React, { useState, useEffect, type JSX } from 'react'
import { Footer } from './components/Footer'
import LegalDocsApp from './LegalDocsApp'
import SsipApp from './SsipApp'
import SsipApiDemo from './SsipApiDemo'
import './footer.css'

// ==============================================================================
// 1. DATA CONTRACTS, TYPES & SCHEMAS
// ==============================================================================

export interface ProductItem {
  readonly id: string
  readonly category: string
  readonly name: string
  readonly tagline: string
  readonly description: string
  readonly inputs: string
  readonly outputs: string
  readonly architecture: readonly string[]
  readonly status: string
}

export interface ServiceSubItem {
  readonly title: string
  readonly desc: string
}

export interface ServiceSection {
  readonly category: string
  readonly badge: string
  readonly summary: string
  readonly items: readonly ServiceSubItem[]
}

export interface WorkMetric {
  readonly metric: string
  readonly label: string
  readonly detail: string
}

export interface CaseStudyItem {
  readonly id: string
  readonly title: string
  readonly badge: string
  readonly summary: string
  readonly problem: string
  readonly approach: string
  readonly systemBuilt: string
  readonly execution: string
  readonly results: readonly string[]
  readonly techStack: readonly string[]
}

export interface InsightCategoryItem {
  readonly id: string
  readonly label: string
}

export interface InsightItem {
  readonly id: string
  readonly category: string
  readonly badge: string
  readonly title: string
  readonly readTime: string
  readonly date: string
  readonly summary: string
  readonly topics: readonly string[]
}

const PRODUCTS_DATA: readonly ProductItem[] = [
  {
    id: 'ssip',
    category: 'COMMERCE / 001',
    name: 'SSIP — Shopify Supplements Intelligence Pipeline',
    tagline: 'E-commerce product catalog, inventory tracking, and pricing dynamics engine.',
    description: 'An automated pipeline that monitors e-commerce storefronts, normalizing SKU catalogs, variant adjustments, and real-time stock movements into structured data feeds.',
    inputs: 'Shopify Storefront API / Public Storefront Web Surfaces',
    outputs: 'Parquet / SQLite / JSON API Payload',
    architecture: ['INGESTION', 'NORMALIZATION', 'SNAPSHOTS', 'PRICING INTELLIGENCE'],
    status: 'PRODUCTION READY',
  },
  {
    id: 'hip',
    category: 'PROPERTY / 002',
    name: 'HIP — Housing Intelligence Pipeline',
    tagline: 'Real estate listing aggregator, deduplication engine, and neighborhood price signal tracker.',
    description: 'Extracts fragmented property listings across major platforms in East Africa, executes automated deduplication, and generates neighborhood supply and price trend metrics.',
    inputs: 'Property Portals / Public Real Estate Surfaces',
    outputs: 'Normalized Listings DB / Analytics API',
    architecture: ['PROPERTY INGEST', 'DEDUPLICATE', 'NORMALIZE', 'ENRICH', 'PRICE SIGNALS'],
    status: 'PRODUCTION READY',
  },
  {
    id: 'lead-gen',
    category: 'GROWTH / 003',
    name: 'Lead Generation Engines',
    tagline: 'Automated target acquisition, enrichment, and contact validation systems.',
    description: 'Custom web crawler pipelines that ingest domain profiles, discover key business contacts, execute verification checks, and deliver enriched lead records.',
    inputs: 'Domain Directories / Registry Data / Public Web Data',
    outputs: 'Enriched CSV / PostgreSQL / Webhook Alerts',
    architecture: ['CRAWL', 'EXTRACT', 'VERIFY', 'ENRICH', 'DELIVER'],
    status: 'ACTIVE MODULE',
  },
  {
    id: 'data-actors',
    category: 'AUTOMATION / 004',
    name: 'Data Actors',
    tagline: 'Reusable, micro-task collection and processing execution agents.',
    description: 'Decoupled scraping and parsing units built to run on scheduled schedules, managing proxy rotation, anti-bot handling, and schema drift detection automatically.',
    inputs: 'Target URL Streams / Webhooks',
    outputs: 'Typed JSON Records / Parquet Bundles',
    architecture: ['TRIGGER', 'PROXY ROTATE', 'PARSE', 'SCHEMA VALIDATE'],
    status: 'ACTIVE MODULE',
  },
  {
    id: 'intelligence-listeners',
    category: 'MONITORING / 005',
    name: 'Intelligence Listeners',
    tagline: 'Event-driven web monitors detecting intent signals, market shifts, and keyword mentions.',
    description: 'Continuous background worker threads that poll niche surfaces, community boards, and public feeds, applying LLM-assisted filtering and rule engines to dispatch real-time webhook alerts.',
    inputs: 'Community Boards / Web Feeds / Niche Market Portals',
    outputs: 'Real-Time Webhooks / Slack Alerts / Event Queue',
    architecture: ['STREAM LISTEN', 'FILTER & MATCH', 'ENRICH SIGNAL', 'DISPATCH WEBHOOK'],
    status: 'ACTIVE MODULE',
  },
  {
    id: 'coming-soon',
    category: 'R&D / 006',
    name: 'More Products — In Active Development',
    tagline: 'Next-generation data infrastructure modules currently in internal testing.',
    description: 'We are actively expanding our portfolio with LLM-powered schema synthesis, automated competitor alert systems, and zero-latency data stream bridges.',
    inputs: 'Custom Enterprise Datasets',
    outputs: 'REST / GraphQL / Streaming Protocols',
    architecture: ['RESEARCH', 'PROTOTYPE', 'BENCHMARK', 'SHIP'],
    status: 'COMING SOON',
  },
] as const

const SOLUTIONS_BUILT_DATA = [
  'Competitor price monitoring',
  'Product catalogue ingestion',
  'Financial market feeds',
  'Supplier intelligence',
  'Web scraping infrastructure',
  'Market intelligence APIs',
  'Entity resolution',
  'Data enrichment',
  'Automated research systems',
  'Internal data platforms',
] as const

const SERVICES_DATA: readonly ServiceSection[] = [
  {
    category: 'DATA INFRASTRUCTURE',
    badge: '01 / INFRA',
    summary: 'Dependable data backbone and pipeline engineering.',
    items: [
      { title: 'Data infrastructure company', desc: 'Managed, scalable data infrastructure engineered for continuous availability.' },
      { title: 'Data pipeline development', desc: 'Custom pipeline architectures designed around your team’s internal data sources.' },
      { title: 'ETL pipeline services', desc: 'High-throughput extract, transform, and load workflows with automated monitoring.' },
      { title: 'Data engineering services', desc: 'Medallion architectures (Bronze, Silver, Gold) built using DuckDB, SQLite, and Parquet.' },
    ],
  },
  {
    category: 'WEB DATA',
    badge: '02 / EXTRACTION',
    summary: 'Automated web collection turning changing surfaces into structured data.',
    items: [
      { title: 'Web extraction systems', desc: 'Reliable web extraction systems designed to withstand changing site structures, schemas, and source conditions.' },
      { title: 'Web data extraction', desc: 'Clean extraction pipelines outputting validated JSON, Parquet, and relational records.' },
      { title: 'Website data pipeline', desc: 'Scheduled extraction pipelines delivering fresh web data straight to your warehouse.' },
      { title: 'Automated web data collection', desc: 'Zero-babysitting automated crawlers running on dedicated scheduling infrastructure.' },
    ],
  },
  {
    category: 'INTELLIGENCE',
    badge: '03 / ANALYTICS',
    summary: 'Decision-ready market, competitive, and pricing signals.',
    items: [
      { title: 'Market intelligence data', desc: 'Deep market visibility aggregated across scattered industry datasets.' },
      { title: 'Competitive intelligence data', desc: 'Automated tracking of competitor movements, catalog additions, and strategy shifts.' },
      { title: 'Pricing intelligence', desc: 'Real-time price trend detection, discount monitoring, and margin tracking.' },
      { title: 'Real estate market data', desc: 'Property and rental intelligence tracking supply and pricing across key regions.' },
    ],
  },
  {
    category: 'API DEVELOPMENT',
    badge: '04 / DELIVERY',
    summary: 'Typed, high-performance data delivery interfaces.',
    items: [
      { title: 'Data API', desc: 'Production REST and GraphQL APIs returning clean, schema-validated payloads.' },
      { title: 'Real estate data API', desc: 'Structured endpoint for querying rental market signals and listing data.' },
      { title: 'Product intelligence API', desc: 'E-commerce API delivering normalized catalog, variant, and SKU telemetry.' },
      { title: 'Market data API', desc: 'Low-latency financial and commodity quotes served through typed schemas.' },
    ],
  },
] as const

const WORK_RESULTS_METRICS: readonly WorkMetric[] = [
  { metric: '20,078+', label: 'Product Records Processed', detail: 'Across 56 active e-commerce pipeline runs' },
  { metric: '99.8%', label: 'Pipeline Uptime SLA', detail: 'Measured across active managed pipelines' },
  { metric: '12ms', label: 'Transform Latency', detail: 'In-memory DuckDB transformation budget' },
  { metric: '100%', label: 'Schema Validation Rate', detail: 'Typed contracts across Bronze, Silver, & Gold' },
] as const

const CASE_STUDIES_DATA: readonly CaseStudyItem[] = [
  {
    id: 'sip',
    title: 'Shopify Supplements Intelligence Pipeline (SSIP)',
    badge: 'COMMERCE / CASE STUDY 001',
    summary: 'Automated catalog & pricing intelligence across supplement & wellness stores.',
    problem: 'Fragmented merchant storefronts made manual competitor price tracking and product catalog audits impossible at scale.',
    approach: 'Engineered an asynchronous multi-store web data extraction and schema normalization pipeline storing temporal snapshots.',
    systemBuilt: 'Multi-tenant scraper engine connected to a Medallion architecture (Bronze JSON → Silver DuckDB → Gold SQLite/Parquet).',
    execution: 'Scaled source coverage from 6 to 56 active supplement stores with zero manual pipeline intervention.',
    results: [
      'Storefront coverage expanded from 6 to 56 active merchants.',
      'Catalog records grew from 1,729 to 20,078 normalized products.',
      '100% automated daily refresh rate with zero-babysitting maintenance.',
    ],
    techStack: ['Python', 'HTTPX', 'Playwright', 'DuckDB', 'SQLite', 'Parquet', 'FastAPI'],
  },
  {
    id: 'hip',
    title: 'Housing Intelligence Pipeline (HIP)',
    badge: 'PROPERTY / CASE STUDY 002',
    summary: 'Real estate listing aggregator and neighborhood price signal tracker.',
    problem: 'Duplicate listings and unstructured location data across multiple Kenyan real estate portals obscured actual rental market signals.',
    approach: 'Implemented entity resolution and string deduplication algorithms over unstandardized listing feeds.',
    systemBuilt: 'Automated extraction pipeline outputting standardized neighborhood price, supply, and vacancy metrics via REST API.',
    execution: 'Ingested raw listings across Nairobi portals, filtered duplicate entries, and produced clean price trends.',
    results: [
      'Deduplicated over 12,000 raw property listings down to distinct records.',
      'Extracted price trend signals across 28 neighborhood zones.',
      'Reduced market analysis latency from days to sub-second API queries.',
    ],
    techStack: ['Python', 'BeautifulSoup', 'Selenium', 'DuckDB', 'PostgreSQL', 'OpenAPI'],
  },
  {
    id: 'lead-gen',
    title: 'Automated Lead Generation & Enrichment Engine',
    badge: 'GROWTH / CASE STUDY 003',
    summary: 'Automated B2B lead acquisition, validation, and profile enrichment system.',
    problem: 'Manual lead prospecting resulted in stale contact details, low conversion rates, and high manual research overhead.',
    approach: 'Built autonomous Data Actors that extract business profiles, execute SMTP checks, and enrich contact metadata.',
    systemBuilt: 'Decoupled worker nodes orchestrated via queue handlers delivering verified profiles into PostgreSQL.',
    execution: 'Processed target domain registries automatically with automated anti-bot and proxy management.',
    results: [
      'Increased qualified lead delivery volume by 400%.',
      'Achieved a 94.2% email bounce-free verification rate.',
      'Eliminated 15+ hours of manual prospecting per week.',
    ],
    techStack: ['Python', 'Docker', 'HTTPX', 'PostgreSQL', 'Redis', 'Webhooks'],
  },
] as const

const INSIGHTS_CATEGORIES: readonly InsightCategoryItem[] = [
  { id: 'all', label: 'All Insights' },
  { id: 'reports', label: 'Reports' },
  { id: 'studies', label: 'Data Studies' },
  { id: 'observations', label: 'Observations' },
  { id: 'methodologies', label: 'Methodologies' },
  { id: 'upcoming', label: 'Upcoming Blogs' },
] as const

type InsightCategory = (typeof INSIGHTS_CATEGORIES)[number]['id']

const INSIGHTS_DATA: readonly InsightItem[] = [
  {
    id: 'report-001',
    category: 'reports',
    badge: 'REPORT / 001',
    title: 'E-Commerce Catalog Dynamics & Price Volatility Benchmark',
    readTime: '8 min read',
    date: 'SEPTEMBER 2026',
    summary: 'An empirical report tracking price drift, stock availability, and SKU changes across 56 e-commerce supplement storefronts.',
    topics: ['Price Elasticity', 'Shopify Intelligence', 'Catalog Snapshots'],
  },
  {
    id: 'study-001',
    category: 'studies',
    badge: 'DATA STUDY / 001',
    title: 'Nairobi Rental Market Yields & Neighborhood Supply Signals',
    readTime: '12 min read',
    date: 'AUGUST 2026',
    summary: 'Analyzing over 12,000 property listings to surface real listing duration, deduplication rates, and localized price-per-square-meter trends.',
    topics: ['Housing Intelligence', 'Entity Resolution', 'Real Estate APIs'],
  },
  {
    id: 'methodology-001',
    category: 'methodologies',
    badge: 'METHODOLOGY / 001',
    title: 'Medallion Data Architecture with DuckDB, SQLite & Parquet',
    readTime: '10 min read',
    date: 'AUGUST 2026',
    summary: 'A complete architectural walkthrough of structuring web extraction data into Bronze (raw JSON), Silver (DuckDB SQL transforms), and Gold (serving APIs) layers.',
    topics: ['Data Engineering', 'DuckDB', 'Parquet', 'ETL Pipelines'],
  },
  {
    id: 'observation-001',
    category: 'observations',
    badge: 'OBSERVATION / 001',
    title: 'Handling Anti-Bot Mechanisms & Schema Drift at Scale',
    readTime: '6 min read',
    date: 'JULY 2026',
    summary: 'Field notes on proxy pool orchestration, browser automation resilience, and automated schema validation techniques for long-running web scrapers.',
    topics: ['Web Scraping', 'Automation Agents', 'Proxy Management'],
  },
  {
    id: 'upcoming-001',
    category: 'upcoming',
    badge: 'UPCOMING BLOG',
    title: 'Building Zero-Babysitting Web Extraction Pipelines',
    readTime: 'Coming Soon',
    date: 'Q4 2026',
    summary: 'How ADL automates error recovery, alerting budgets, and data contract testing for mission-critical web intelligence pipelines.',
    topics: ['Pipeline Reliability', 'Data Contracts', 'Async Python'],
  },
  {
    id: 'upcoming-002',
    category: 'upcoming',
    badge: 'UPCOMING BLOG',
    title: 'Designing High-Throughput REST APIs over Embedded Parquet Databases',
    readTime: 'Coming Soon',
    date: 'Q4 2026',
    summary: 'Sub-millisecond query execution patterns for serving normalized market datasets directly to client platforms.',
    topics: ['API Engineering', 'DuckDB', 'FastAPI'],
  },
] as const

const PIPELINE_STAGES = [
  {
    title: 'Source connectors',
    details: [
      'Web & e-commerce stores',
      'APIs & web services',
      'Databases',
      'Social media & creator platforms',
      'Government portals',
      'Research & open data',
      'Emails',
      'RSS feeds',
      'Historical archives',
    ],
  },
  {
    title: 'Extraction layer',
    details: ['HTTPS clients', 'Scrapers', 'SQL', 'File readers', 'Event consumers'],
  },
  {
    title: 'Raw / Bronze',
    details: ['Preserve original payloads', 'Timestamps', 'Source URLs', 'Provenance'],
  },
  {
    title: 'Normalize / Silver',
    details: ['Clean', 'Validate', 'Deduplicate', 'Standardize', 'Reconcile schemas'],
  },
  {
    title: 'Intelligence / Gold',
    details: ['Enrichment', 'Comparisons', 'Trends', 'Scoring', 'Analytics'],
  },
  {
    title: 'Delivery layer',
    details: ['Dashboards', 'Reports', 'Alerts', 'Client integrations'],
  },
] as const

const ENDPOINT_SAMPLES = {
  market: {
    category: 'Sample Payload',
    label: 'Market snapshot API Contract',
    path: '/v1/markets/quotes?symbol=NVDA',
    requestPath: '/api/v1/markets/quotes.json?symbol=NVDA',
    status: '200 OK',
    response: JSON.stringify({ symbol: 'NVDA', price: 177.0, currency: 'USD', as_of: '2026-09-05T14:32:01Z', source: 'consolidated' }, null, 2),
  },
} as const

// ============================================================================
// 2. SHARED COMPONENTS
// ============================================================================

function HeaderTopbar(): JSX.Element {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const currentHash = typeof window !== 'undefined' ? window.location.hash : ''
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    window.history.pushState({}, '', targetPath)
    window.dispatchEvent(new Event('popstate'))
    const targetId = targetPath.split('#')[1]
    if (targetId) {
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="topbar"
      aria-label="Main navigation"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setIsMenuOpen(false)
      }}
    >
      <a 
        className="brand brand-button" 
        href="/" 
        onClick={(e) => handleNavClick(e, '/')}
        aria-label="Return to Ainga Data Labs homepage"
      >
        <span className="brand-mark">ADL</span>
        <span>Ainga Data Labs</span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation-links"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        className={`nav-links${isMenuOpen ? ' is-open' : ''}`}
        id="primary-navigation-links"
      >
        <a 
          href="/products" 
          className={currentPath === '/products' ? 'active-link' : ''}
          onClick={(e) => handleNavClick(e, '/products')}
        >
          Products
        </a>
        <a 
          href="/solutions"
          className={['/solutions', '/services', '/work'].includes(currentPath) && currentHash !== '#case-studies' ? 'active-link' : ''}
          onClick={(e) => handleNavClick(e, '/solutions')}
        >
          Solutions
        </a>
        <a 
          href="/solutions#case-studies"
          className={currentPath === '/solutions' && currentHash === '#case-studies' ? 'active-link' : ''}
          onClick={(e) => handleNavClick(e, '/solutions#case-studies')}
        >
          Case Studies
        </a>
        <a 
          href="/about"
          className={currentPath === '/about' ? 'active-link' : ''}
          onClick={(e) => handleNavClick(e, '/about')}
        >
          About ADL
        </a>
        <a 
          href="/contact" 
          className={currentPath === '/contact' ? 'active-link' : ''}
          onClick={(e) => handleNavClick(e, '/contact')}
        >
          Contact Us
        </a>
      </div>

    </nav>
  )
}

// ============================================================================
// 3. DEDICATED PAGE VIEWS
// ============================================================================

export function ProductsPage(): JSX.Element {
  const tryUrl = '/ssip'

  const handleTrySsipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState({}, '', '/ssip')
    window.dispatchEvent(new Event('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> DECISION-READY DATA ENGINES</p>
        <h1>ADL Product Portfolio</h1>
        <p className="hero-lede">
          Production-grade <strong>data engines</strong>, <strong>extraction systems</strong>, and <strong>intelligence pipelines</strong> engineered and managed by ADL.
        </p>
      </header>

      <div className="products-grid-container">
        {PRODUCTS_DATA.map((product) => {
          const isSSIP = product.id === 'ssip'

          return (
            <article className="product-portfolio-card" key={product.id}>
              <div className="product-card-top-bar">
                <span className="card-index">{product.category}</span>
                <span className={`product-status-badge ${product.id === 'coming-soon' ? 'status-labs' : ''}`}>
                  <span className="status-dot-inline" /> {product.status}
                </span>
              </div>

              <h2 className="product-card-title">{product.name}</h2>
              <p className="product-tagline">{product.tagline}</p>
              <p className="product-description">{product.description}</p>

              <div className="product-architecture-strip">
                <span className="meta-label">ARCHITECTURE:</span>
                <div className="pipeline-flow">
                  {product.architecture.map((stage, idx) => (
                    <span key={stage}>
                      <code>{stage}</code>
                      {idx < product.architecture.length - 1 && <i className="flow-arrow">&rarr;</i>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="product-contract-footer">
                <div className="contract-col">
                  <small>INPUT SOURCES</small>
                  <strong>{product.inputs}</strong>
                </div>
                <div className="contract-col">
                  <small>OUTPUT FORMAT</small>
                  <strong>{product.outputs}</strong>
                </div>
              </div>

              <div className="product-card-action">
                {isSSIP ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                    <a 
                      className="button button-primary service-cta" 
                      href={tryUrl}
                      onClick={handleTrySsipClick}
                      style={{ textAlign: 'center', justifyContent: 'center' }}
                    >
                      Try SSIP <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a
                      className="button button-quiet service-cta"
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=System%20Inquiry%20for%20SSIP`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: 'center', justifyContent: 'center' }}
                    >
                      Discuss System <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                ) : product.id === 'coming-soon' ? (
                  <a className="button button-quiet service-cta" href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Early%20Access%20Inquiry" target="_blank" rel="noopener noreferrer">
                    Request Early Access <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : (
                  <a 
                    className="button button-quiet service-cta" 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=System%20Inquiry%20for%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discuss System for <strong>{product.name.split('—')[0].trim()}</strong> <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <Footer />
    </main>
  )
}

export function SolutionsPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash !== '#case-studies') return

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> DATA SYSTEMS / ENGINEERING / INTELLIGENCE</p>
        <h1>ADL Solutions</h1>
        <p className="hero-lede">
          From changing external sources to reliable data products: explore what we build, how we deliver it, and the systems we&apos;ve put into production.
        </p>
      </header>

      <section className="solutions-builds-section" aria-labelledby="solutions-builds-title">
        <div className="section-heading-inline">
          <span className="eyebrow"><span className="status-dot" /> CAPABILITIES</span>
          <h2 id="solutions-builds-title">WHAT ADL BUILDS</h2>
        </div>
        <ul className="solutions-builds-grid">
          {SOLUTIONS_BUILT_DATA.map((solution, index) => (
            <li className="solutions-build-item" key={solution}>
              <span className="solutions-build-number">{String(index + 1).padStart(2, '0')}</span>
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="solutions-services-section" aria-labelledby="solutions-services-title">
        <div className="section-heading-inline">
          <span className="eyebrow"><span className="status-dot" /> DELIVERY CAPABILITIES</span>
          <h2 id="solutions-services-title">How we deliver</h2>
        </div>
        <div className="services-grid-container">
          {SERVICES_DATA.map((section) => (
            <section className="services-card-block" key={section.category}>
              <div className="services-card-header">
                <span className="card-index">{section.badge}</span>
                <h2>{section.category}</h2>
                <p className="section-summary">{section.summary}</p>
              </div>

              <div className="services-item-list">
                {section.items.map((item) => (
                  <div className="service-item-row" key={item.title}>
                    <div className="service-title-group">
                      <span className="terminal-bullet">&gt;</span>
                      <strong>{item.title}</strong>
                    </div>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="services-card-action">
                <a
                  className="button button-quiet service-cta"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Scope%20${encodeURIComponent(section.category)}%20System`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Scope <strong>{section.category}</strong> System <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="solutions-proof-section" id="case-studies" aria-labelledby="solutions-proof-title">
        <div className="section-heading-inline">
          <span className="eyebrow"><span className="status-dot" /> CASE STUDIES / PROOF OF PERFORMANCE</span>
          <h2 id="solutions-proof-title">Case studies &amp; results</h2>
        </div>
        <div className="work-results-banner">
          <div className="results-grid">
            {WORK_RESULTS_METRICS.map((res) => (
              <div className="result-stat-card" key={res.label}>
                <strong className="result-metric">{res.metric}</strong>
                <span className="result-label">{res.label}</span>
                <small className="result-detail">{res.detail}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="work-cases-container">
          {CASE_STUDIES_DATA.map((cs) => (
            <article className="case-study-card" key={cs.id}>
              <div className="case-card-header">
                <span className="card-index">{cs.badge}</span>
              </div>

              <h3 className="case-title">{cs.title}</h3>
              <p className="case-summary">{cs.summary}</p>

              <div className="case-breakdown-grid">
                <div className="case-col">
                  <small>PROBLEM</small>
                  <p>{cs.problem}</p>
                </div>
                <div className="case-col">
                  <small>APPROACH</small>
                  <p>{cs.approach}</p>
                </div>
                <div className="case-col">
                  <small>SYSTEM BUILT</small>
                  <p>{cs.systemBuilt}</p>
                </div>
                <div className="case-col">
                  <small>EXECUTION</small>
                  <p>{cs.execution}</p>
                </div>
              </div>

              <div className="case-results-box">
                <small>QUANTIFIABLE RESULTS</small>
                <ul>
                  {cs.results.map((res, i) => (
                    <li key={i}>
                      <span className="bullet-green">&check;</span> {res}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="case-tech-stack">
                <small>TECHNICAL STACK:</small>
                <div className="tech-tags">
                  {cs.techStack.map((tech) => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export function InsightsPage(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<InsightCategory>('all')

  const visibleInsights = activeFilter === 'all'
    ? INSIGHTS_DATA
    : INSIGHTS_DATA.filter((item) => item.category === activeFilter)

  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> ADL RESEARCH & ENGINEERING JOURNAL</p>
        <h1>ADL Insights & Research</h1>
        <p className="hero-lede">
          Reports, empirical data studies, technical observations, pipeline methodologies, and upcoming blogs from <strong>Ainga Data Labs</strong>.
        </p>
      </header>

      <div className="insights-filter-strip">
        {INSIGHTS_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`catalog-filter ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="insights-grid-container">
        {visibleInsights.map((insight) => (
          <article className="insight-card" key={insight.id}>
            <div className="insight-card-top">
              <span className="card-index">{insight.badge}</span>
              <span className="insight-meta">{insight.date} &bull; {insight.readTime}</span>
            </div>

            <h2 className="insight-title">{insight.title}</h2>
            <p className="insight-summary">{insight.summary}</p>

            <div className="insight-topics">
              {insight.topics.map((topic) => (
                <span className="tech-tag" key={topic}>{topic}</span>
              ))}
            </div>

            <div className="insight-action">
              {insight.category === 'upcoming' ? (
                <span className="upcoming-badge">PUBLISHING SOON</span>
              ) : (
                <a 
                  className="button button-quiet service-cta" 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Inquiry%20Regarding%20${encodeURIComponent(insight.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Full Report <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </main>
  )
}

export function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    need: 'Data pipeline',
    problem: '',
    budget: '',
    timeline: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = `ADL Scope Inquiry: ${formData.need} - ${formData.company || formData.name}`
    const body = `Name: ${formData.name}
Work Email: ${formData.email}
Company: ${formData.company}
Need: ${formData.need}
Budget: ${formData.budget || 'N/A'}
Timeline: ${formData.timeline || 'N/A'}

Problem Description:
${formData.problem}`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <main className="docs-shell">
      <HeaderTopbar />

      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> SYSTEM SCOPING & INQUIRY</p>
        <h1>Tell us what you&apos;re trying to solve</h1>
        <p className="hero-lede">
          Fill out the short intake form below and an ADL data engineer will review your project scope within 24 hours.
        </p>
      </header>

      <div className="contact-form-container">
        {submitted ? (
          <div className="form-success-card">
            <span className="status-dot-inline" />
            <h2>Inquiry Dispatched to Gmail</h2>
            <p>
              A new tab has opened with your inquiry parameters pre-filled in Gmail. Simply click <strong>Send</strong> to deliver your message to <strong>hello@aingadatalabs.com</strong>.
            </p>
            <button type="button" className="button button-quiet" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : (
          <form className="contact-intake-form" onSubmit={handleSubmit}>
            <div className="form-row-grid">
              <label className="form-field">
                <span>Name *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>Work Email *</span>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>
            </div>

            <div className="form-row-grid">
              <label className="form-field">
                <span>Company / Organization *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>What do you need? *</span>
                <select
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                >
                  <option value="Data pipeline">Data pipeline</option>
                  <option value="Market intelligence">Market intelligence</option>
                  <option value="Lead generation">Lead generation</option>
                  <option value="Backend/API">Backend/API</option>
                  <option value="Automation">Automation</option>
                  <option value="Custom data system">Custom data system</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label className="form-field full-width">
              <span>Tell us about the problem *</span>
              <textarea
                required
                rows={5}
                placeholder="Describe your current data bottleneck, sources, or system requirements..."
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              />
            </label>

            <div className="form-row-grid">
              <label className="form-field">
                <span>Budget / project range (optional)</span>
                <input
                  type="text"
                  placeholder="e.g. $5k - $15k"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>Timeline (optional)</span>
                <input
                  type="text"
                  placeholder="e.g. Immediate / 2-4 weeks"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </label>
            </div>

            <div className="form-action">
              <button type="submit" className="button button-primary submit-btn">
                Submit Inquiry <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </main>
  )
}

export function DocsPage(): JSX.Element {
  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <p className="eyebrow">CONTRACT REFERENCE</p>
          <h1>ADL Schema Docs</h1>
          <p>Sample typed payload contracts and structural API response benchmarks.</p>
          <div className="docs-sidebar-section">
            <small>ENDPOINTS</small>
            <button type="button" className="docs-nav-item active"><b>GET</b> Market snapshot</button>
          </div>
        </aside>

        <section className="docs-content">
          <div className="docs-breadcrumb">SCHEMA CONTRACTS / SAMPLE PAYLOAD API</div>
          <div className="docs-heading">
            <span className="docs-method">GET</span>
            <h2>/v1/markets/quotes</h2>
          </div>
          <p className="docs-description">Sample normalized payload schema contract for custom data pipeline delivery endpoints.</p>
          <pre className="docs-response">
            <code>{ENDPOINT_SAMPLES.market.response}</code>
          </pre>
        </section>
      </div>
      <Footer/>
    </main>
  )
}

export function AboutPage(): JSX.Element {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <div className="about-page">
        <header className="about-hero">
          <p className="eyebrow"><span className="status-dot" /> ABOUT AINGA DATA LABS</p>
          <h1>We make changing data dependable.</h1>
          <p className="about-lede">
            Ainga Data Labs is a data engineering and market intelligence company. We build the backend systems that turn fragmented, fast-changing sources into structured information teams can rely on.
          </p>
          <p className="about-focus">DATA ENGINEERING <span>•</span> BACKEND SYSTEMS <span>•</span> MARKET INTELLIGENCE</p>
        </header>

        <section className="about-story-grid" aria-label="ADL story and purpose">
          <article className="about-story-card">
            <span className="about-section-index">01 / OUR STORY</span>
            <h2>Built for data that doesn&apos;t sit still.</h2>
            <p>
              Important business information is often scattered across websites, APIs, files and operational systems. Those sources change, disagree and arrive in formats that are difficult to use together.
            </p>
            <p>
              ADL exists to engineer the collection, normalization and delivery layers that make this data useful beyond a one-off report or manual workflow.
            </p>
          </article>

          <article className="about-story-card">
            <span className="about-section-index">02 / WHY ADL EXISTS</span>
            <h2>From unreliable sources to systems teams can trust.</h2>
            <p>
              Teams need more than data collected once. They need repeatable pipelines, clear schemas, source traceability and delivery that fits the decisions and products built on top.
            </p>
            <a className="about-inline-link" href="/solutions" onClick={(e) => handleNavigation(e, '/solutions')}>
              Explore what ADL builds <span aria-hidden="true">&rarr;</span>
            </a>
          </article>
        </section>

        <section className="about-approach" aria-labelledby="about-approach-title">
          <header className="about-section-heading">
            <p className="eyebrow"><span className="status-dot" /> ENGINEERING APPROACH</p>
            <h2 id="about-approach-title">How we approach engineering</h2>
            <p>Design around source realities, make the data contract explicit, and plan for change from the start.</p>
          </header>
          <ol className="about-approach-list">
            <li><span>01</span><div><h3>Understand the source</h3><p>Map access, structure, update patterns and failure modes before shaping the pipeline.</p></div></li>
            <li><span>02</span><div><h3>Preserve the evidence</h3><p>Keep raw records and provenance so outputs can be traced back and transformations reviewed.</p></div></li>
            <li><span>03</span><div><h3>Engineer reliable contracts</h3><p>Normalize entities, validate schemas and make downstream data predictable to consume.</p></div></li>
            <li><span>04</span><div><h3>Design for change</h3><p>Monitor source drift, recover from failures and evolve pipelines without losing control of data quality.</p></div></li>
          </ol>
        </section>

        <section className="about-principles" aria-labelledby="about-principles-title">
          <header className="about-section-heading">
            <p className="eyebrow"><span className="status-dot" /> OPERATING PRINCIPLES</p>
            <h2 id="about-principles-title">What guides the work</h2>
          </header>
          <div className="about-principles-grid">
            <article><h3>Traceability</h3><p>Know where data came from and how it changed.</p></article>
            <article><h3>Schema-first</h3><p>Make structure and validation part of the system, not an afterthought.</p></article>
            <article><h3>Operational reliability</h3><p>Build for monitoring, recovery and maintainable updates.</p></article>
            <article><h3>Useful outcomes</h3><p>Deliver information in forms that support real decisions and products.</p></article>
          </div>
        </section>

        <section className="about-team" aria-labelledby="about-team-title">
          <div>
            <p className="eyebrow"><span className="status-dot" /> WHO LEADS THE WORK</p>
            <h2 id="about-team-title">Technical work, grounded in the problem.</h2>
            <p>
              ADL brings data engineering, backend implementation and market intelligence together around each project&apos;s sources, constraints and intended use. The approach is collaborative, technically specific and shaped by the people who need to use the data.
            </p>
          </div>
          <div className="about-team-links">
            <a className="button button-primary" href="/contact" onClick={(e) => handleNavigation(e, '/contact')}>
              Talk with ADL <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="about-inline-link" href="/docs" onClick={(e) => handleNavigation(e, '/docs')}>
              View schema documentation <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export function LandingPage(): JSX.Element {
  return (
    <main className="site-shell">
      {/* INJECTED PRODUCTION HOVER LIGHTING CSS */}
      <style>{`
        .button-primary {
          background-color: #10b981;
          color: #030705;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #10b981;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 0px rgba(16, 185, 129, 0);
        }

        .button-primary:hover {
          background-color: #34d399;
          border-color: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.6), 0 0 10px rgba(52, 211, 153, 0.4);
          filter: brightness(1.1);
        }

        .button-quiet {
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-weight: 600;
          padding: 0.85rem 1.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-quiet:hover {
          border-color: #10b981;
          color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
          background-color: rgba(16, 185, 129, 0.05);
        }

        .nav-cta-primary {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }
      `}</style>

      <HeaderTopbar />
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> DATA ENGINEERING & MARKET INTELLIGENCE LABS</p>
          
          <h1>Turn fragmented web &amp; market data into production-ready systems</h1>
          <p className="hero-lede">
            ADL builds the extraction pipelines, normalization layer, enrichment systems, and APIs that power pricing intelligence, lead ICPs, market research, and data products.
          </p>
          
          <p className="audience-tag-strip">
            <strong>BUILT FOR:</strong> Data Teams &bull; Product Teams &bull; E-Commerce Operators
          </p>
          
          <div className="hero-actions">
            <a className="button button-primary" href="/products">
              Explore ADL products <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="button button-quiet" href="/solutions">
              Explore ADL Solutions <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <section className="hero-visual" aria-labelledby="pipeline-visualization-title">
          <div className="visual-header">
            <span id="pipeline-visualization-title"><span className="live-pulse" /> PIPELINE VISUALIZATION</span>
            <span>ADL / CORE-01</span>
          </div>

          <div className="pipeline-map" aria-label="Data pipeline stages">
            {PIPELINE_STAGES.map((stage, index) => (
              <article className="pipeline-stage" key={stage.title}>
                <h2 className="pipeline-stage-title">
                  <span className="pipeline-stage-number">0{index + 1}</span>
                  {stage.title}
                </h2>
                <ul className="pipeline-stage-details">
                  {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="why-adl" aria-labelledby="why-adl-title">
        <div className="why-adl-inner">
          <header className="why-adl-header">
            <p className="eyebrow"><span className="status-dot" /> BUILT FOR RELIABLE DATA</p>
            <h2 id="why-adl-title">WHY ADL?</h2>
          </header>

          <ol className="why-adl-reasons">
            <li><span>01</span><h3>Reliable ingestion</h3></li>
            <li><span>02</span><h3>Schema-first systems</h3></li>
            <li><span>03</span><h3>Observable pipelines</h3></li>
            <li><span>04</span><h3>Designed for change</h3></li>
          </ol>

          <div className="why-adl-capabilities">
            <article>
              <h3>Extraction</h3>
              <p>API ingestion, HTML parsing, browser automation, change detection, retries, proxy management</p>
            </article>
            <article>
              <h3>Data engineering</h3>
              <p>Schema normalization, entity resolution, deduplication, validation, lineage, incremental pipelines</p>
            </article>
            <article>
              <h3>Delivery</h3>
              <p>REST APIs, webhooks, scheduled exports, warehouse tables, typed schemas, dashboards</p>
            </article>
          </div>

          <p className="why-adl-hook">Built from unreliable sources, designed for reliable downstream systems.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ==============================================================================
// 4. SINGLE ROUTER ENTRY POINT
// ==============================================================================

const CANONICAL_ROUTE_REDIRECTS: Record<string, { pathname: string; hash?: string }> = {
  '/services': { pathname: '/solutions' },
  '/work': { pathname: '/solutions' },
  '/insights': { pathname: '/solutions', hash: '#case-studies' },
  '/legal': { pathname: '/terms' },
}

function getCanonicalPathname(pathname: string): string {
  return CANONICAL_ROUTE_REDIRECTS[pathname]?.pathname ?? pathname
}

export default function App(): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? getCanonicalPathname(window.location.pathname) : '/'
  )

  useEffect(() => {
    const handleLocationChange = () => {
      const redirect = CANONICAL_ROUTE_REDIRECTS[window.location.pathname]
      if (redirect) {
        const hash = redirect.hash ?? window.location.hash
        const canonicalUrl = `${redirect.pathname}${hash}${window.location.search}`
        window.history.replaceState({}, '', canonicalUrl)
        const targetId = hash.slice(1)
        if (targetId) {
          window.requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
          })
        }
      }
      setCurrentPath(window.location.pathname)
    }

    handleLocationChange()
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  if (currentPath === '/docs') return <DocsPage />
  if (currentPath === '/about') return <AboutPage />
  if (currentPath === '/solutions') return <SolutionsPage />
  if (currentPath === '/products') return <ProductsPage />
  if (currentPath === '/contact') return <ContactPage />
  if (currentPath === '/terms') return <LegalDocsApp initialTab="terms" />
  if (currentPath === '/privacy') return <LegalDocsApp initialTab="privacy" />
  if (currentPath === '/ssip/api-demo') return <SsipApiDemo />
  if (currentPath === '/ssip') return <SsipApp />
  return <LandingPage />
}