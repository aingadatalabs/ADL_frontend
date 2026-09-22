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

export interface PipelineNode {
  readonly id: 'ingest' | 'transform' | 'deliver'
  readonly label: string
  readonly name: string
  readonly metric: string
  readonly schema: string
  readonly fields: string
  readonly payload: string
  readonly latency: string
}

export type PipelineNodeId = PipelineNode['id']

const DYNAMIC_SOURCES = [
  'Market sources',
  'Rental APIs',
  'E-Commerce Feeds',
  'Live Telemetry',
] as const

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

const PIPELINE_NODES: readonly PipelineNode[] = [
  { id: 'ingest', label: 'INGEST', name: 'Market sources', metric: '3', schema: 'source.v2', fields: 'symbol, venue, timestamp', payload: 'GET /sources/market?region=global', latency: 'Awaiting source response' },
  { id: 'transform', label: 'TRANSFORM', name: 'Normalize + enrich', metric: '12ms', schema: 'quote.v1.4', fields: 'symbol, price, currency, as_of', payload: '{ "symbol": "NVDA", "currency": "USD" }', latency: '12ms transform budget' },
  { id: 'deliver', label: 'DELIVER', name: 'Your API layer', metric: 'TYPED', schema: 'response.v1', fields: 'data, meta, trace_id', payload: '200 OK / application-json', latency: 'Local demo response' },
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

  return (
    <nav className="topbar" aria-label="Main navigation">
      <a className="brand brand-button" href="/" aria-label="Return to Ainga Data Labs homepage">
        <span className="brand-mark">ADL</span>
        <span>Ainga Data Labs</span>
      </a>

      <div className="nav-links">
        <a href="/products" className={currentPath === '/products' ? 'active-link' : ''}>
          Products
        </a>
        <a href="/services" className={currentPath === '/services' ? 'active-link' : ''}>
          Services
        </a>
        <a href="/work" className={currentPath === '/work' ? 'active-link' : ''}>
          Work
        </a>
        <a href="/insights" className={currentPath === '/insights' ? 'active-link' : ''}>
          Insights
        </a>
        <a href="/docs" className={currentPath === '/docs' ? 'active-link' : ''}>
          Docs
        </a>
        <a href="/contact" className={currentPath === '/contact' ? 'active-link' : ''}>
          Contact Us
        </a>
      </div>

      <div className="header-actions">
        <a className="nav-cta nav-cta-primary" href="/contact">
          Discuss a data problem <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  )
}

// ============================================================================
// 3. DEDICATED PAGE VIEWS
// ============================================================================

export function ProductsPage(): JSX.Element {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'

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
          const tryUrl = isLocal ? '/ssip' : 'https://ssip.aingadatalabs.com'

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
                      target={isLocal ? '_self' : '_blank'}
                      rel="noopener noreferrer"
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

export function ServicesPage(): JSX.Element {
  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> PRODUCTION DATA ENGINEERING & EXTRACTION</p>
        <h1>ADL Data Services</h1>
        <p className="hero-lede">
          We take on source maintenance, normalization, and infrastructure burden so your team receives <strong>schema-validated</strong>, <strong>decision-ready data</strong>.
        </p>
      </header>

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

      <Footer />
    </main>
  )
}

export function WorkPage(): JSX.Element {
  return (
    <main className="docs-shell">
      <HeaderTopbar />
      <header className="services-hero-header">
        <p className="eyebrow"><span className="status-dot" /> PROOF OF PERFORMANCE & CASE STUDIES</p>
        <h1>ADL Work & Systems Built</h1>
        <p className="hero-lede">
          We prove capability through <strong>quantifiable results</strong>, <strong>production systems</strong>, and <strong>reusable architectures</strong>.
        </p>
      </header>

      <section className="work-results-banner">
        <div className="results-grid">
          {WORK_RESULTS_METRICS.map((res) => (
            <div className="result-stat-card" key={res.label}>
              <strong className="result-metric">{res.metric}</strong>
              <span className="result-label">{res.label}</span>
              <small className="result-detail">{res.detail}</small>
            </div>
          ))}
        </div>
      </section>

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

export function LandingPage(): JSX.Element {
  const [selectedNode, setSelectedNode] = useState<PipelineNodeId>('ingest')
  const [sourceIndex, setSourceIndex] = useState<number>(0)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  const selectedPipelineNode = PIPELINE_NODES.find((node) => node.id === selectedNode) ?? PIPELINE_NODES[0]

  useEffect(() => {
    const interval = setInterval(() => {
      setSourceIndex((prev) => (prev + 1) % DYNAMIC_SOURCES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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
          
          <h1>Turn messy external data into reliable systems.</h1>
          <p className="hero-lede">
            ADL builds and operates web extraction pipelines, data infrastructure, intelligence systems, and APIs that turn changing external data into clean, decision-ready feeds.
          </p>
          
          <p className="audience-tag-strip">
            <strong>BUILT FOR:</strong> Data Teams &bull; Product Teams &bull; E-Commerce Operators
          </p>
          
          <div className="hero-actions">
            <a className="button button-primary" href="/contact">
              Discuss a data problem <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="button button-quiet" href="/products">
              Explore our systems <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-header">
            <span><span className="live-pulse" /> PIPELINE / INTERFACE PREVIEW</span>
            <span>ADL / CORE-01</span>
          </div>

          <div className="pipeline-map">
            {PIPELINE_NODES.map((node, index) => {
              const isFirstStep = index === 0
              const labelText = isFirstStep ? DYNAMIC_SOURCES[sourceIndex] : node.name
              const isHovered = hoveredNodeId === node.id
              const isActive = selectedPipelineNode.id === node.id

              return (
                <div 
                  key={node.id} 
                  className={`pipeline-node ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedNode(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    backgroundColor: isHovered ? '#0f1f16' : undefined,
                    borderColor: isHovered ? '#10b981' : undefined,
                    boxShadow: isHovered ? '0 0 20px rgba(16, 185, 129, 0.35)' : undefined,
                    transform: isHovered ? 'translateY(-1px)' : undefined,
                  }}
                >
                  <div className="node-step">
                    <span className="step-num">0{index + 1}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span 
                        className="node-type" 
                        style={{ 
                          color: '#10b981', 
                          fontWeight: 600,
                          letterSpacing: '0.16em' 
                        }}
                      >
                        {node.label}
                      </span>
                      <strong 
                        className="node-label" 
                        style={{ 
                          letterSpacing: '0.16em', 
                          color: '#10b981',
                          fontWeight: 600,
                          transition: 'color 0.3s ease, opacity 0.3s ease',
                          display: 'inline-block'
                        }}
                      >
                        {labelText}
                      </strong>
                    </div>
                  </div>
                  <span className="node-metric">{node.metric}</span>
                </div>
              )
            })}

            <div className="schema-inspector">
              <span>SCHEMA / {selectedPipelineNode.schema}</span>
              <strong>{selectedPipelineNode.fields}</strong>
              <span className="inspector-state">READY</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ==============================================================================
// 4. SINGLE ROUTER ENTRY POINT
// ==============================================================================

export default function App(): JSX.Element {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (path === '/docs') return <DocsPage />
  if (path === '/services') return <ServicesPage />
  if (path === '/products') return <ProductsPage />
  if (path === '/work') return <WorkPage />
  if (path === '/insights') return <InsightsPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/legal') return <LegalDocsApp />
  if (path === '/ssip/api-demo') return <SsipApiDemo />
  if (path === '/ssip') return <SsipApp />
  return <LandingPage />
}