import { useEffect, useState } from 'react'
import './footer.css'
import xLogo from './assets/x.webp'
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'
import redditLogo from './assets/reddit.webp'

const pipelineNodes = [
  { id: 'ingest', label: 'INGEST', name: 'Market sources', metric: '3', schema: 'source.v2', fields: 'symbol, venue, timestamp', payload: 'GET /sources/market?region=global', latency: 'Awaiting source response' },
  { id: 'transform', label: 'TRANSFORM', name: 'Normalize + enrich', metric: '12ms', schema: 'quote.v1.4', fields: 'symbol, price, currency, as_of', payload: '{ "symbol": "NVDA", "currency": "USD" }', latency: '12ms transform budget' },
  { id: 'deliver', label: 'DELIVER', name: 'Your API layer', metric: 'TYPED', schema: 'response.v1', fields: 'data, meta, trace_id', payload: '200 OK / application-json', latency: 'Local demo response' },
] as const

type PipelineNodeId = (typeof pipelineNodes)[number]['id']

const endpointSamples = {
  market: {
    category: 'Financial',
    label: 'Market snapshot',
    path: '/v1/markets/quotes?symbol=NVDA',
    requestPath: '/api/v1/markets/quotes.json?symbol=NVDA',
    status: '200 OK',
    response: `{
  "symbol": "NVDA",
  "price": 177.00,
  "currency": "USD",
  "as_of": "2026-09-05T14:32:01Z",
  "source": "consolidated"
}`,
  },
  fundamentals: {
    category: 'Financial',
    label: 'Company fundamentals',
    path: '/v1/companies/NVDA/fundamentals',
    requestPath: '/api/v1/companies/NVDA/fundamentals.json',
    status: '200 OK',
    response: `{
  "ticker": "NVDA",
  "revenue_ttm": 188300000000,
  "gross_margin": 0.716,
  "period": "FY2026",
  "lineage_id": "ln_7e9a20"
}`,
  },
}

type EndpointKey = keyof typeof endpointSamples
type RequestLanguage = 'curl' | 'python' | 'javascript'

const requestLanguages: { id: RequestLanguage; label: string }[] = [
  { id: 'curl', label: 'Curl' },
  { id: 'python', label: 'Python HTTPX' },
  { id: 'javascript', label: 'JavaScript' },
]

const catalogItems = [
  { name: 'Market quotes', detail: 'quote.v1.4', type: 'SCRAPER' },
  { name: 'Company fundamentals', detail: 'fundamentals.v1', type: 'SCHEMA' },
  { name: 'Commerce signals', detail: 'orders.v2.1', type: 'PIPELINE' },
] as const

const productCatalog = [
  { id: 'shopify', kind: 'products', category: 'COMMERCE / 001', name: 'Shopify Catalog Engine', description: 'Normalize fragmented Shopify store data into a consistent analytical feed.', purpose: 'Normalize products, inventory, and orders into a consistent analytical feed.', input: 'Store / product sources', process: 'Collect -> Normalize -> Enrich -> Analyze', architecture: ['INGESTION', 'NORMALIZATION', 'SNAPSHOTS', 'PRICING INTELLIGENCE', 'API / DASHBOARD'], outputs: ['Parquet', 'JSON', 'SQLite'], dataModel: 'Product / Variant / Merchant / Price / Inventory', freshness: 'Daily', status: 'Module preview', lastRun: 'Not scheduled in demo' },
  { id: 'kenya-rentals', kind: 'products', category: 'PROPERTY / 002', name: 'Kenya Rental Intelligence', description: 'Track rental supply, price movement, and neighborhood signals across Nairobi.', purpose: 'Turn fragmented rental listings into structured market intelligence.', input: 'Property24 / PigiaMe / BuyRentKenya', process: 'Collect -> Deduplicate -> Normalize -> Enrich', architecture: ['PROPERTY24 / PIGIAME / BUYRENTKENYA', 'INGEST', 'DEDUPLICATE', 'NORMALIZE', 'ENRICH', 'PRICE / SUPPLY SIGNALS', 'DATA PRODUCT'], outputs: ['Listings', 'Price history', 'API'], dataModel: 'Listing / Property / Neighborhood / Price', freshness: 'Daily', status: 'Module preview', lastRun: 'Not scheduled in demo' },
  { id: 'price-tracker', kind: 'products', category: 'RETAIL / 003', name: 'Competitor Price Intelligence', description: 'Monitor competitor pricing and promotion changes across priority SKUs.', purpose: 'Detect meaningful price, promotion, and availability movement.', input: 'Competitor catalogs', process: 'Collect -> Compare -> Detect -> Alert', architecture: ['CATALOG INGESTION', 'NORMALIZATION', 'COMPARISON', 'ALERTS'], outputs: ['Price movements', 'Promotions', 'Alerts'], dataModel: 'SKU / Merchant / Price / Promotion / Availability', freshness: 'Scheduled', status: 'Module preview', lastRun: 'Not scheduled in demo' },
  { id: 'market-signals', kind: 'products', category: 'MARKETS / 004', name: 'Market Signals', description: 'Turn fragmented market events into structured, decision-ready signals.', purpose: 'Expose market movement through a typed, inspectable data product.', input: 'Public market sources', process: 'Collect -> Normalize -> Score -> Serve', architecture: ['SOURCE INGESTION', 'NORMALIZATION', 'SIGNAL SCORING', 'DATA PRODUCT'], outputs: ['JSON', 'API', 'Dashboard'], dataModel: 'Entity / Signal / Timestamp / Confidence', freshness: 'Scheduled', status: 'Concept module', lastRun: 'Not scheduled in demo' },
  { id: 'custom-pipelines', kind: 'services', category: 'BUILD / 001', name: 'Custom Data Pipelines', description: 'Design and ship ingestion systems around the sources your team already owns.', purpose: 'Move a messy source from first connection to dependable delivery.', input: 'APIs / Files / Operational systems', process: 'Connect -> Transform -> Validate -> Deliver', architecture: ['CONNECT', 'TRANSFORM', 'VALIDATE', 'DELIVER'], outputs: ['Pipeline', 'Runbook', 'API'], dataModel: 'Defined with your team', freshness: 'Project-defined', status: 'Service offering', lastRun: 'Starts during discovery' },
  { id: 'web-extraction', kind: 'services', category: 'BUILD / 002', name: 'Web Data Extraction', description: 'Create maintainable extraction workflows for public web sources and catalogs.', purpose: 'Turn changing web surfaces into structured, reviewable source data.', input: 'Public web sources', process: 'Extract -> Parse -> Normalize -> Monitor', architecture: ['EXTRACT', 'PARSE', 'NORMALIZE', 'MONITOR'], outputs: ['JSON', 'Parquet', 'SQLite'], dataModel: 'Defined per source', freshness: 'Project-defined', status: 'Service offering', lastRun: 'Starts during discovery' },
  { id: 'api-development', kind: 'services', category: 'BUILD / 003', name: 'API Development', description: 'Package structured intelligence behind versioned, documented interfaces.', purpose: 'Make useful data easy for applications and teams to consume.', input: 'Structured datasets', process: 'Model -> Version -> Document -> Serve', architecture: ['MODEL', 'VERSION', 'DOCUMENT', 'SERVE'], outputs: ['REST API', 'OpenAPI', 'SDK-ready contract'], dataModel: 'Typed and documented', freshness: 'Request-defined', status: 'Service offering', lastRun: 'Starts during discovery' },
  { id: 'pricing-intelligence', kind: 'intelligence', category: 'SIGNALS / 001', name: 'Pricing Intelligence', description: 'Find the price movements and promotion patterns that matter to a category.', purpose: 'Support pricing decisions with comparable, explainable signals.', input: 'Catalogs / Prices / Promotions', process: 'Compare -> Detect -> Contextualize -> Explain', architecture: ['COMPARE', 'DETECT', 'CONTEXTUALIZE', 'EXPLAIN'], outputs: ['Signals', 'Alerts', 'Briefings'], dataModel: 'SKU / Price / Event / Context', freshness: 'Decision-defined', status: 'Intelligence offering', lastRun: 'Starts during discovery' },
  { id: 'market-intelligence', kind: 'intelligence', category: 'SIGNALS / 002', name: 'Market Intelligence', description: 'Connect external signals to the questions your operating team needs answered.', purpose: 'Create a clearer view of a market before the decision point.', input: 'Market / Company / Web signals', process: 'Collect -> Enrich -> Analyze -> Surface', architecture: ['COLLECT', 'ENRICH', 'ANALYZE', 'SURFACE'], outputs: ['Research layer', 'Signals', 'API'], dataModel: 'Entity / Event / Relationship', freshness: 'Decision-defined', status: 'Intelligence offering', lastRun: 'Starts during discovery' },
  { id: 'competitive-intelligence', kind: 'intelligence', category: 'SIGNALS / 003', name: 'Competitive Intelligence', description: 'Track competitor activity and translate change into useful context.', purpose: 'Give teams a durable view of competitive movement.', input: 'Competitor sources', process: 'Monitor -> Normalize -> Compare -> Brief', architecture: ['MONITOR', 'NORMALIZE', 'COMPARE', 'BRIEF'], outputs: ['Change log', 'Alerts', 'Dashboard'], dataModel: 'Competitor / Event / Impact', freshness: 'Decision-defined', status: 'Intelligence offering', lastRun: 'Starts during discovery' },
] as const

const catalogFilters = [
  { id: 'all', label: 'All catalog' },
  { id: 'products', label: 'Data products' },
  { id: 'services', label: 'Data services' },
  { id: 'intelligence', label: 'Intelligence' },
] as const

type CatalogFilter = (typeof catalogFilters)[number]['id']

const docsEndpoints = {
  market: {
    category: 'Financial',
    method: 'GET',
    path: '/v1/markets/quotes',
    summary: 'Market snapshot',
    description: 'Retrieve a normalized quote snapshot for a public market symbol.',
    parameter: 'symbol',
    example: 'NVDA',
    requestPath: '/api/v1/markets/quotes.json',
    response: endpointSamples.market.response,
    fields: [
      ['symbol', 'string', 'Requested market symbol'],
      ['price', 'number', 'Latest representative price'],
      ['currency', 'string', 'Price currency'],
      ['as_of', 'string<date-time>', 'Snapshot timestamp'],
      ['source', 'string', 'Fixture provenance'],
    ],
  },
  fundamentals: {
    category: 'Financial',
    method: 'GET',
    path: '/v1/companies/{ticker}/fundamentals',
    summary: 'Company fundamentals',
    description: 'Retrieve normalized company fundamentals for a public ticker.',
    parameter: 'ticker',
    example: 'NVDA',
    requestPath: '/api/v1/companies',
    response: endpointSamples.fundamentals.response,
    fields: [
      ['ticker', 'string', 'Company ticker'],
      ['revenue_ttm', 'integer', 'Trailing twelve-month revenue'],
      ['gross_margin', 'number', 'Gross margin ratio'],
      ['period', 'string', 'Reporting period'],
      ['lineage_id', 'string', 'Record lineage identifier'],
    ],
  },
} as const

type DocsEndpointKey = keyof typeof docsEndpoints
type DocsLanguage = 'curl' | 'python' | 'javascript'

function DocsPage() {
  const [activeDocsEndpoint, setActiveDocsEndpoint] = useState<DocsEndpointKey>('market')
  const [docsLanguage, setDocsLanguage] = useState<DocsLanguage>('curl')
    const [parameterValue, setParameterValue] = useState('')
  const [docsResponse, setDocsResponse] = useState('')
  const [docsRequestState, setDocsRequestState] = useState<'idle' | 'running' | 'complete' | 'error'>('idle')
  const [docsCopyState, setDocsCopyState] = useState<'idle' | 'copied'>('idle')
  const docsEndpoint = docsEndpoints[activeDocsEndpoint]
  const docsRequestPath = activeDocsEndpoint === 'market'
    ? `${docsEndpoint.requestPath}?symbol=${encodeURIComponent(parameterValue || docsEndpoint.example)}`
    : `${docsEndpoint.requestPath}/${encodeURIComponent(parameterValue || docsEndpoint.example)}/fundamentals.json`
  const docsCode = docsLanguage === 'curl'
    ? `curl "${docsRequestPath}"`
    : docsLanguage === 'python'
      ? `import httpx\n\nresponse = httpx.get("${docsRequestPath}")\nprint(response.json())`
      : `const response = await fetch("${docsRequestPath}")\nconst data = await response.json()\nconsole.log(data)`

  const runDocsRequest = async () => {
    setDocsRequestState('running')
    try {
      const response = await fetch(docsRequestPath)
      setDocsResponse(JSON.stringify(await response.json(), null, 2))
      setDocsRequestState(response.ok ? 'complete' : 'error')
    } catch {
      setDocsResponse(JSON.stringify({ error: 'Demo endpoint unavailable' }, null, 2))
      setDocsRequestState('error')
    }
  }

  const copyDocsCode = async () => {
    await navigator.clipboard.writeText(docsCode)
    setDocsCopyState('copied')
    window.setTimeout(() => setDocsCopyState('idle'), 1400)
  }

  return <main className="docs-shell"><nav className="docs-nav"><a className="brand" href="/"><span className="brand-mark">ADL</span><span>Ainga Data Labs</span></a><span>ADL DEMO API / v0.1.0</span><a href="/">Back to site <span aria-hidden="true">-&gt;</span></a></nav><div className="docs-layout"><aside className="docs-sidebar"><p className="eyebrow">API REFERENCE</p><h1>ADL Demo API</h1><p>Representative endpoints for exploring ADL data contracts and delivery patterns.</p><div className="docs-sidebar-section"><small>ENDPOINTS</small><button className={activeDocsEndpoint === 'market' ? 'docs-nav-item active' : 'docs-nav-item'} onClick={() => { setActiveDocsEndpoint('market'); setParameterValue('NVDA'); setDocsResponse(''); setDocsRequestState('idle') }}><b>GET</b> Market snapshot</button><button className={activeDocsEndpoint === 'fundamentals' ? 'docs-nav-item active' : 'docs-nav-item'} onClick={() => { setActiveDocsEndpoint('fundamentals'); setParameterValue('NVDA'); setDocsResponse(''); setDocsRequestState('idle') }}><b>GET</b> Company fundamentals</button></div><div className="docs-demo-note"><span className="status-dot" /> Representative demo fixtures<br /><small>Not a production data service</small></div></aside><section className="docs-content"><div className="docs-breadcrumb">API REFERENCE <span>/</span> {docsEndpoint.summary.toUpperCase()}</div><div className="docs-heading"><span className="docs-method">{docsEndpoint.method}</span><h2>{docsEndpoint.path}</h2></div><p className="docs-description">{docsEndpoint.description}</p><div className="docs-request-card"><div className="docs-card-heading"><span>REQUEST PARAMETERS</span><span>QUERY / PATH</span></div><label><span>{docsEndpoint.parameter}</span><input value={parameterValue} onChange={(event) => setParameterValue(event.target.value)} placeholder={docsEndpoint.example} /></label><div className="docs-request-actions"><button className="docs-run" onClick={runDocsRequest} disabled={docsRequestState === 'running'}>{docsRequestState === 'running' ? 'Running...' : 'Run request'} <span aria-hidden="true">-&gt;</span></button><span>{docsRequestState === 'complete' ? '200 OK / demo response' : docsRequestState === 'error' ? 'Request failed' : 'Ready to test'}</span></div></div><div className="docs-code-card"><div className="docs-card-heading"><span>REQUEST CODE</span><div className="docs-language-tabs">{(['curl', 'python', 'javascript'] as DocsLanguage[]).map((language) => <button className={docsLanguage === language ? 'active' : ''} key={language} onClick={() => { setDocsLanguage(language); setDocsCopyState('idle') }}>{language === 'python' ? 'Python HTTPX' : language === 'javascript' ? 'JavaScript' : 'cURL'}</button>)}</div><button className="docs-copy" onClick={copyDocsCode}>{docsCopyState === 'copied' ? 'Copied' : 'Copy'}</button></div><pre><code>{docsCode}</code></pre></div><div className="docs-schema-card"><div className="docs-card-heading"><span>RESPONSE / 200 OK</span><span>APPLICATION / JSON</span></div><p>Normalized response object returned by the demo fixture.</p><div className="schema-table"><div className="schema-row schema-header"><span>FIELD</span><span>TYPE</span><span>DESCRIPTION</span></div>{docsEndpoint.fields.map(([field, type, description]) => <div className="schema-row" key={field}><strong>{field}</strong><code>{type}</code><span>{description}</span></div>)}</div><pre className="docs-response"><code>{docsResponse || docsEndpoint.response}</code></pre></div></section></div></main>
}

function LandingPage() {
  const [catalogQuery, setCatalogQuery] = useState('')
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointKey>('market')
  const [selectedNode, setSelectedNode] = useState<PipelineNodeId>('transform')
  const [enabledNodes, setEnabledNodes] = useState<Record<PipelineNodeId, boolean>>({ ingest: true, transform: true, deliver: true })
  const [requestState, setRequestState] = useState<'idle' | 'running' | 'complete' | 'rate-limited' | 'error'>('idle')
  const [requestLanguage, setRequestLanguage] = useState<RequestLanguage>('curl')
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [responseBody, setResponseBody] = useState(endpointSamples.market.response)
  const [responseStatus, setResponseStatus] = useState(endpointSamples.market.status)
  const [runningModule, setRunningModule] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<(typeof productCatalog)[number] | null>(null)
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>('all')
  const endpoint = endpointSamples[activeEndpoint]
  const selectedPipelineNode = pipelineNodes.find((node) => node.id === selectedNode) ?? pipelineNodes[1]
  const matchingCatalogItems = catalogItems.filter((item) => `${item.name} ${item.detail} ${item.type}`.toLowerCase().includes(catalogQuery.toLowerCase()))
  const visibleModules = catalogFilter === 'all' ? productCatalog : productCatalog.filter((module) => module.kind === catalogFilter)

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.getElementById('catalog-search-input')?.focus()
      }
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
  }, [])
  const requestSnippet = requestLanguage === 'curl'
    ? `curl "${endpoint.requestPath}"`
    : requestLanguage === 'python'
      ? `import httpx\n\nresponse = httpx.get("${endpoint.requestPath}")\nprint(response.json())`
      : `const response = await fetch("${endpoint.requestPath}")\nconst data = await response.json()\nconsole.log(data)`

  const runRequest = async () => {
    setRequestState('running')
    try {
      const response = await fetch(endpoint.requestPath)
      const body = await response.json()
      setResponseBody(JSON.stringify(body, null, 2))
      setResponseStatus(`${response.status} ${response.statusText}`)
      setRequestState(response.status === 429 ? 'rate-limited' : response.ok ? 'complete' : 'error')
    } catch {
      setResponseBody(JSON.stringify({ error: 'Demo API unavailable', detail: 'Start the ADL frontend server and try again.' }, null, 2))
      setResponseStatus('NETWORK ERROR')
      setRequestState('error')
    }
  }

  const copySnippet = async () => {
    await navigator.clipboard.writeText(requestSnippet)
    setCopyState('copied')
    window.setTimeout(() => setCopyState('idle'), 1600)
  }

  const runModule = (moduleId: string) => {
    setRunningModule(moduleId)
    window.setTimeout(() => setRunningModule(null), 1200)
  }

  const openModule = (moduleId: string) => {
    setSelectedModule(productCatalog.find((module) => module.id === moduleId) ?? null)
  }

  const scrollToSection = (sectionId: string) => {
    setSelectedModule(null)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Main navigation">
        <button className="brand brand-button" onClick={() => scrollToSection('top')} aria-label="Ainga Data Labs home"><span className="brand-mark">ADL</span><span>Ainga Data Labs</span></button>
        <div className="nav-links"><button onClick={() => scrollToSection('catalog')}>Products</button><a href="/docs">Docs</a><button onClick={() => scrollToSection('work')}>Work</button></div>
        <div className="header-actions"><a className="nav-cta nav-cta-primary" href="mailto:hello@aingadatalabs.com?subject=Book%20a%20discovery%20call">Book demo <span aria-hidden="true">-&gt;</span></a></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Decision-ready business information</p>
          <h1>The data your decisions need, <em>without the maintenance burden.</em></h1>
          <p className="hero-lede">We take on the source maintenance, normalization, and delivery work your team should not have to build and babysit in-house, turning fragmented data into reliable business information you can use.</p>
          <div className="hero-conversion-stack">
            <div className="catalog-search" aria-label="Search the ADL catalog">
              <div className="catalog-search-label"><span>CATALOG / DISCOVER A STARTING POINT</span><strong>{catalogQuery ? `${matchingCatalogItems.length} MATCH${matchingCatalogItems.length === 1 ? '' : 'ES'}` : '03 MODULES'}</strong></div>
              <label className="search-field"><span aria-hidden="true">/</span><input id="catalog-search-input" type="search" value={catalogQuery} onChange={(event) => setCatalogQuery(event.target.value)} placeholder="Search scrapers, schemas, pipelines" aria-label="Search scrapers, schemas, and pipelines" /><kbd>⌘ K</kbd></label>
              <div className="catalog-popular"><span>Popular:</span><button onClick={() => setCatalogQuery('Shopify')}>Shopify Intelligence</button><button onClick={() => setCatalogQuery('Market quotes')}>Market Quotes</button></div>
              <div className="catalog-results" aria-live="polite">
                {(matchingCatalogItems.length ? matchingCatalogItems : catalogItems.slice(0, 1)).map((item) => <span className={matchingCatalogItems.length ? '' : 'catalog-result-muted'} key={item.detail}><small>{item.type}</small><strong>{item.name}</strong><code>{item.detail}</code></span>)}
              </div>
            </div>
          </div>
          <div className="hero-actions"><button className="button button-primary" onClick={() => scrollToSection('catalog')}>Explore catalog <span aria-hidden="true">-&gt;</span></button><a className="button button-quiet" href="mailto:hello@aingadatalabs.com?subject=Book%20a%20demo">Book demo <span aria-hidden="true">-&gt;</span></a></div>
          <div className="thesis-flow" aria-label="ADL data system thesis"><span>COLLECT</span><i>-&gt;</i><span>TRANSFORM</span><i>-&gt;</i><span>ENRICH</span><i>-&gt;</i><span>SERVE</span></div>
        </div>
        <div className="hero-visual" aria-label="ADL pipeline interface preview">
          <div className="visual-header"><span><span className="live-pulse" /> PIPELINE / INTERFACE PREVIEW</span><span>ADL / CORE-01</span></div>
          <div className="pipeline-map">
            {pipelineNodes.map((node, index) => <div key={node.id}>
              <button className={`pipeline-node ${selectedNode === node.id ? 'active-node' : ''} ${enabledNodes[node.id] ? '' : 'disabled-node'}`} onClick={() => setSelectedNode(node.id)} aria-pressed={selectedNode === node.id} aria-label={`${node.name}, ${enabledNodes[node.id] ? 'enabled' : 'disabled'}. Select node for inspection.`}>
                <span className="node-icon">0{index + 1}</span><span className="node-copy"><small>{node.label}</small><strong>{node.name}</strong></span><b>{node.metric}</b><span className="node-toggle" onClick={(event) => { event.stopPropagation(); setEnabledNodes((current) => ({ ...current, [node.id]: !current[node.id] })) }} role="switch" aria-checked={enabledNodes[node.id]} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setEnabledNodes((current) => ({ ...current, [node.id]: !current[node.id] })) } }}>{enabledNodes[node.id] ? 'ON' : 'OFF'}</span>
              </button>
              {index < pipelineNodes.length - 1 && <div className={`pipeline-connector ${enabledNodes[node.id] && enabledNodes[pipelineNodes[index + 1].id] ? 'connector-live' : ''}`}><span /></div>}
            </div>)}
            <div className="schema-inspector"><span>SCHEMA / {selectedPipelineNode.schema}</span><strong>{selectedPipelineNode.fields}</strong><span className="inspector-state">{enabledNodes[selectedNode] ? 'READY' : 'PAUSED'}</span><button onClick={() => setEnabledNodes((current) => ({ ...current, [selectedNode]: !current[selectedNode] }))}>{enabledNodes[selectedNode] ? 'Disable node' : 'Enable node'} <span aria-hidden="true">-&gt;</span></button></div>
            <div className="node-detail" role="tabpanel" aria-label={`${selectedPipelineNode.name} details`}><div><small>LIVE PAYLOAD</small><code>{selectedPipelineNode.payload}</code></div><div><small>LATENCY</small><strong>{selectedPipelineNode.latency}</strong></div><div><small>SCHEMA DEFINITION</small><strong>{selectedPipelineNode.schema} / {selectedPipelineNode.fields}</strong></div></div>
          </div>
          <div className="visual-footer"><span>PIPELINE STAGES</span><strong>03 <small>/ core</small></strong><span className="footer-divider" /><span>CONTRACT</span><strong className="accent-text">TYPED</strong></div>
        </div>
      </section>

      <section className="metric-strip" aria-label="ADL delivery principles"><div><strong>03</strong><small>core systems mapped</small></div><div><strong>03</strong><small>pipeline stages shown</small></div><div><strong>Daily</strong><small>refresh cadence available</small></div><div><strong>Typed</strong><small>contracts by default</small></div></section>

      <section className="trust-section" aria-label="Technology partners and interface principles"><div className="trust-partners"><span className="trust-label">SYSTEMS THAT SPEAK ADL</span><div className="partner-list"><strong>SHOPIFY</strong><strong>POSTGRESQL</strong><strong>dbt</strong><strong>OPENAI</strong><strong>SNOWFLAKE</strong></div></div><div className="security-list"><div><span className="security-mark">&#10003;</span><span><strong>TLS 1.3 / UI DEMO</strong><small>Transport layer shown in playground</small></span></div><div><span className="security-mark">&#10003;</span><span><strong>PRIVACY-AWARE DESIGN</strong><small>Ingestion requirements are documented</small></span></div></div></section>

      <section className="systems-proof-section" aria-label="Built systems"><div className="section-heading"><div><p className="eyebrow">Proof / systems built</p><h2>Actual systems for<br /><em>real questions.</em></h2></div><p className="catalog-summary">Three examples of how ADL turns fragmented sources into useful business information.</p></div><div className="proof-system-grid"><button onClick={() => scrollToSection('work')}><span>01 / COMMERCE</span><strong>Shopify Intelligence</strong><small>Store data / pricing / inventory</small><i aria-hidden="true">-&gt;</i></button><button onClick={() => scrollToSection('catalog')}><span>02 / PROPERTY</span><strong>Kenya Rental Intelligence</strong><small>Listings / supply / price signals</small><i aria-hidden="true">-&gt;</i></button><button onClick={() => scrollToSection('catalog')}><span>03 / RETAIL</span><strong>Competitor Price Intelligence</strong><small>Catalogs / promotions / alerts</small><i aria-hidden="true">-&gt;</i></button></div></section>

      <section className="proof-section" id="playground">
        <div className="section-intro"><p className="eyebrow">A working proof, not a platform claim</p><h2>See how a question becomes<br /><em>a usable interface.</em></h2><p>The playground demonstrates the kind of typed, inspectable delivery layer ADL builds around a real business need.</p></div>
        <div className="api-console">
          <div className="console-top"><div className="window-dots"><i /><i /><i /></div><span>ADL DEMO API / SAME-ORIGIN</span><span className="console-secure">JSON RESPONSE <span aria-hidden="true">&#10003;</span></span></div>
          <div className="endpoint-tabs">{(Object.keys(endpointSamples) as EndpointKey[]).map((key) => <button className={activeEndpoint === key ? 'endpoint-tab active' : 'endpoint-tab'} key={key} onClick={() => { setActiveEndpoint(key); setResponseBody(endpointSamples[key].response); setResponseStatus(endpointSamples[key].status); setRequestState('idle'); setCopyState('idle') }}>{endpointSamples[key].label}</button>)}<a className="console-docs" href="/docs">Open docs -&gt;</a></div>
          <div className="request-line"><span className="method">GET</span><code>{endpoint.path}</code><span className={`response-status ${requestState === 'error' ? 'response-error' : ''}`}>{responseStatus}</span></div>
          <pre className="response-body"><code>{requestLanguage === 'curl' ? responseBody : requestSnippet}</code></pre>
          <div className="console-bottom"><span>response_time <strong>{requestState === 'running' ? '...' : requestState === 'complete' ? 'local' : '--'}</strong></span><span>schema <strong>v1.4.0</strong></span><span className={`request-status request-status-${requestState}`}><strong>{requestState === 'running' ? 'Request in flight' : requestState === 'complete' ? '200 OK' : requestState === 'rate-limited' ? '429 RATE LIMITED' : requestState === 'error' ? 'Request failed' : 'Ready to test'}</strong></span><div className="request-tools"><div className="language-switcher" role="group" aria-label="Code language"><span>CODE</span>{requestLanguages.map((language) => <button className={requestLanguage === language.id ? 'language-tab active' : 'language-tab'} key={language.id} onClick={() => { setRequestLanguage(language.id); setCopyState('idle') }}>{language.label}</button>)}</div><button className="copy-request" onClick={copySnippet}>{copyState === 'copied' ? 'Copied' : 'Copy'} <span aria-hidden="true">&#10697;</span></button><button className={`run-request run-request-${requestState}`} onClick={runRequest} disabled={requestState === 'running'}>{requestState === 'running' ? 'Running...' : requestState === 'complete' ? 'Run again' : requestState === 'rate-limited' ? 'Retry request' : 'Run request'} <span aria-hidden="true">-&gt;</span></button></div></div>
          <div className="console-actions"><a href="/docs">Open interactive docs</a><span>{requestState === 'rate-limited' ? 'Demo limit reached / retry shortly' : 'Local demo endpoint / JSON'}</span></div>
        </div>
      </section>

      <section className="systems-section" id="services"><div className="section-heading"><p className="eyebrow">What ADL delivers</p><h2>Clear services for<br /><em>messy data.</em></h2></div><div className="capability-grid"><article><span className="card-index">01 / 03</span><h3>Data pipelines</h3><p>Collect, clean, and structure data from fragmented sources.</p><button onClick={() => scrollToSection('catalog')}>Explore data products <span>-&gt;</span></button></article><article><span className="card-index">02 / 03</span><h3>Data APIs</h3><p>Turn complex datasets into simple interfaces your software can consume.</p><button onClick={() => scrollToSection('playground')}>Explore the API playground <span>-&gt;</span></button></article><article><span className="card-index">03 / 03</span><h3>Market intelligence</h3><p>Monitor prices, supply, competitors, and market movement.</p><button onClick={() => scrollToSection('catalog')}>Explore intelligence <span>-&gt;</span></button></article></div></section>

      <section className="featured-section" id="work">
        <div className="case-study-heading"><p className="eyebrow">Flagship case study / 001</p><h2>Shopify Intelligence</h2><p className="case-study-lede">From fragmented storefront data to a unified decision layer.</p><p className="case-study-note">A multi-merchant pipeline that brings ingestion, normalization, snapshots, and pricing intelligence into one dependable serving layer.</p><a className="text-link" href="mailto:hello@aingadatalabs.com?subject=Shopify%20Intelligence%20discussion">Discuss a similar system <span>-&gt;</span></a></div>
        <div className="case-study-facts"><div><small>DATA SOURCES</small><strong>4+ merchant and storefront sources</strong></div><div><small>FRESHNESS</small><strong>Scheduled snapshots</strong></div><div><small>DELIVERY</small><strong>API / dashboard-ready outputs</strong></div></div>
        <div className="architecture-flow" aria-label="Shopify system architecture"><span>INGESTION</span><i>-&gt;</i><span>NORMALIZATION</span><i>-&gt;</i><span>SNAPSHOTS</span><i>-&gt;</i><span>PRICING INTELLIGENCE</span><i>-&gt;</i><span>API / DASHBOARD</span></div>
        <div className="case-study-details"><div className="case-detail"><small>DATA MODEL</small><strong>Merchant / Product / Variant / Price / Inventory / Order</strong></div><div className="case-detail"><small>BUSINESS QUESTIONS</small><strong>What changed? Which products are moving? Where is margin under pressure?</strong></div><div className="case-detail"><small>TECHNOLOGY</small><strong>Merchant connectors / normalized records / scheduled jobs / typed API contract</strong></div><div className="case-detail"><small>RESULTS</small><strong>A reusable decision layer for comparing merchants, products, pricing, and inventory.</strong></div></div>
        <div className="featured-panel"><div className="panel-top"><span>SHOPIFY / EXAMPLE OUTPUT</span><span>REPRESENTATIVE</span></div><pre className="case-output"><code>{`{
  "merchant": "example-store",
  "product": "Canvas Weekender",
  "price": 129.00,
  "inventory": 42,
  "price_change": "-8.4%",
  "snapshot_at": "2026-09-18T06:42:00Z"
}`}</code></pre><div className="panel-bottom"><span>TYPED RECORD / JSON</span><span>SNAPSHOT-READY</span></div></div>
      </section>

      <section className="process-section" id="about"><div className="section-heading"><p className="eyebrow">Capability / the ADL method</p><h2>From scattered signals<br /><em>to clear decisions.</em></h2></div><div className="process-grid"><div><span>01</span><h3>Collect</h3><p>We connect every source, from APIs and files to the systems your teams already use.</p></div><div><span>02</span><h3>Transform</h3><p>We clean, normalize, and model it into a dependable data foundation.</p></div><div><span>03</span><h3>Enrich</h3><p>We add context, quality checks, and the business logic your people need.</p></div><div><span>04</span><h3>Serve</h3><p>We ship useful interfaces that make the right answer easy to reach.</p></div></div></section>

        <section className="catalog-section" id="catalog"><div className="section-heading"><div><p className="eyebrow">Examples of what we build</p><h2>Choose a lane.<br /><em>Find the useful.</em></h2></div><p className="catalog-summary">These modules are product patterns, not a marketplace. We shape the right system around your sources, questions, and decisions.</p></div><div className="catalog-filters" role="group" aria-label="Catalog category">{catalogFilters.map((filter) => <button className={catalogFilter === filter.id ? 'catalog-filter active' : 'catalog-filter'} key={filter.id} onClick={() => setCatalogFilter(filter.id)}>{filter.label}</button>)}</div><div className="product-grid">{visibleModules.map((module) => <article className="product-card" key={module.id} onClick={() => openModule(module.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openModule(module.id) }} role="button" tabIndex={0}><div className="product-card-top"><span>ADL {module.kind.toUpperCase()} / {module.category}</span><span className="freshness"><i /> {module.status}</span></div><h3>{module.name}</h3><p>{module.description}</p><div className="module-contract"><div><small>INPUT</small><strong>{module.input}</strong></div><div><small>PROCESS</small><strong>{module.process}</strong></div><div><small>OUTPUT</small><strong>{module.outputs.join(' / ')}</strong></div></div><div className="product-meta"><div><small>FRESHNESS</small><strong>{module.freshness}</strong></div><div><small>STATUS</small><strong>{module.status}</strong></div></div><button className={`run-module ${runningModule === module.id ? 'run-module-active' : ''}`} onClick={(event) => { event.stopPropagation(); runModule(module.id) }} disabled={runningModule === module.id}>{runningModule === module.id ? 'Queued for execution' : 'Run module'} <span aria-hidden="true">-&gt;</span></button></article>)}</div></section>

        {selectedModule && <div className="module-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedModule(null) }}><section className="module-detail" role="dialog" aria-modal="true" aria-labelledby="module-detail-title"><button className="module-close" onClick={() => setSelectedModule(null)} aria-label="Close module details">x</button><div className="module-detail-header"><span className="eyebrow">ADL MODULE / {selectedModule.category}</span><span className="module-status"><i /> {selectedModule.status}</span></div><div className="module-journey" aria-label="Module journey"><span className="active">01 DISCOVER</span><span>02 INSPECT</span><span>03 TEST</span><span>04 INTEGRATE</span></div><h2 id="module-detail-title">{selectedModule.name}</h2><p className="module-purpose">{selectedModule.purpose}</p><div className="module-architecture"><small>ARCHITECTURE</small><div>{selectedModule.architecture.map((stage, index) => <span key={stage}><strong>{stage}</strong>{index < selectedModule.architecture.length - 1 && <i>-&gt;</i>}</span>)}</div></div><div className="detail-grid"><div><small>INPUTS</small><strong>{selectedModule.input}</strong></div><div><small>PROCESS</small><strong>{selectedModule.process}</strong></div><div><small>OUTPUTS</small><strong>{selectedModule.outputs.join(' / ')}</strong></div><div><small>FRESHNESS</small><strong>{selectedModule.freshness}</strong></div><div><small>DATA MODEL</small><strong>{selectedModule.dataModel}</strong></div><div><small>LAST RUN</small><strong>{selectedModule.lastRun}</strong></div></div><div className="module-detail-actions"><button className="button button-quiet" onClick={() => scrollToSection('playground')}>Inspect data <span aria-hidden="true">-&gt;</span></button><button className={`button button-primary ${runningModule === selectedModule.id ? 'run-module-active' : ''}`} onClick={() => runModule(selectedModule.id)} disabled={runningModule === selectedModule.id}>{runningModule === selectedModule.id ? 'Test running...' : 'Test sample'} <span aria-hidden="true">-&gt;</span></button><div className="integration-actions"><small>INTEGRATE</small><a href="/docs">API docs</a><button onClick={() => scrollToSection('playground')}>JSON</button><span>CSV</span><span>Parquet</span></div></div></section></div>}

      <section className="cta-section" id="contact"><p className="eyebrow">Have a business question the tools do not answer?</p><h2>Tell us what you need.<br /><em>We&apos;ll build the system.</em></h2><a className="button button-primary" href="mailto:hello@aingadatalabs.com?subject=Book%20a%20discovery%20call">Book demo <span aria-hidden="true">-&gt;</span></a></section>
      <footer className="footer"><div><button className="brand brand-button" onClick={() => scrollToSection('top')}><span className="brand-mark">ADL</span><span>Ainga Data Labs</span></button><p>Engineering clarity into complex data.</p></div><div className="footer-contact"><span>Have a system in mind?</span><a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello%40aingadatalabs.com" target="_blank" rel="noreferrer">hello@aingadatalabs.com <span>-&gt;</span></a></div><div className="footer-actions"><a className="footer-primary" href="mailto:hello@aingadatalabs.com?subject=Book%20a%20discovery%20call">Book demo <span aria-hidden="true">-&gt;</span></a><div><a href="/docs">API docs</a><button onClick={() => scrollToSection('catalog')}>Catalog</button></div></div><div className="footer-socials"><span>Social ecosystem</span><div><a href="https://x.com/aingadatalabs" target="_blank" rel="noreferrer" aria-label="X"><img src={xLogo} alt="" /></a><a href="https://youtube.com/@aingadatalabs" target="_blank" rel="noreferrer" aria-label="YouTube"><img src={youtubeLogo} alt="" /></a><a href="https://github.com/aingadatalabs" target="_blank" rel="noreferrer" aria-label="GitHub"><img src={githubLogo} alt="" /></a><a href="https://www.reddit.com/user/aingadatalabs/" target="_blank" rel="noreferrer" aria-label="Reddit"><img src={redditLogo} alt="" /></a></div></div><span className="footer-meta">Ainga Data Labs / 2026</span></footer>
    </main>
  )
}

export default function App() {
  return window.location.pathname === '/docs' ? <DocsPage /> : <LandingPage />
}