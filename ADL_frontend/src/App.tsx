import { useState } from 'react'
import './footer.css'

const pipelineNodes = [
  { id: 'ingest', label: 'INGEST', name: 'Market sources', metric: '3', schema: 'source.v2', fields: 'symbol, venue, timestamp' },
  { id: 'transform', label: 'TRANSFORM', name: 'Normalize + enrich', metric: '12ms', schema: 'quote.v1.4', fields: 'symbol, price, currency, as_of' },
  { id: 'deliver', label: 'DELIVER', name: 'Your API layer', metric: '99.99%', schema: 'response.v1', fields: 'data, meta, trace_id' },
] as const

type PipelineNodeId = (typeof pipelineNodes)[number]['id']

const endpointSamples = {
  market: {
    label: 'Market snapshot',
    path: '/v1/markets/quotes?symbol=NVDA',
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
    label: 'Company fundamentals',
    path: '/v1/companies/NVDA/fundamentals',
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

export default function App() {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointKey>('market')
  const [selectedNode, setSelectedNode] = useState<PipelineNodeId>('transform')
  const [enabledNodes, setEnabledNodes] = useState<Record<PipelineNodeId, boolean>>({ ingest: true, transform: true, deliver: true })
  const [requestState, setRequestState] = useState<'idle' | 'running' | 'complete'>('idle')
  const endpoint = endpointSamples[activeEndpoint]
  const selectedPipelineNode = pipelineNodes.find((node) => node.id === selectedNode) ?? pipelineNodes[1]

  const runRequest = () => {
    setRequestState('running')
    window.setTimeout(() => setRequestState('complete'), 420)
  }

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Ainga Data Labs home"><span className="brand-mark">ADL</span><span>Ainga Data Labs</span></a>
        <div className="nav-links"><a href="#services">Systems</a><a href="#work">Work</a><a href="#about">Method</a><a href="#playground">Playground</a></div>
        <a className="nav-cta" href="#contact">Start a build <span aria-hidden="true">-&gt;</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Data infrastructure for decisions</p>
          <h1>Raw market data, <em>ready for action.</em></h1>
          <p className="hero-lede">Ainga Data Labs engineers the pipelines and APIs that turn fragmented market signals into dependable enterprise systems.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore our work <span aria-hidden="true">-&gt;</span></a><a className="button button-quiet" href="#contact">Work with ADL <span aria-hidden="true">+</span></a></div>
          <div className="trust-line"><span>Built for teams that care about</span><strong>latency</strong><i /> <strong>lineage</strong><i /> <strong>uptime</strong></div>
        </div>
        <div className="hero-visual" aria-label="Live pipeline status">
          <div className="visual-header"><span><span className="live-pulse" /> LIVE PIPELINE</span><span>ADL / CORE-01</span></div>
          <div className="pipeline-map">
            {pipelineNodes.map((node, index) => <div key={node.id}>
              <button className={`pipeline-node ${selectedNode === node.id ? 'active-node' : ''} ${enabledNodes[node.id] ? '' : 'disabled-node'}`} onClick={() => setSelectedNode(node.id)} aria-pressed={selectedNode === node.id}>
                <span className="node-icon">0{index + 1}</span><span className="node-copy"><small>{node.label}</small><strong>{node.name}</strong></span><b>{node.metric}</b><span className="node-toggle" onClick={(event) => { event.stopPropagation(); setEnabledNodes((current) => ({ ...current, [node.id]: !current[node.id] })) }} aria-hidden="true">{enabledNodes[node.id] ? 'ON' : 'OFF'}</span>
              </button>
              {index < pipelineNodes.length - 1 && <div className={`pipeline-connector ${enabledNodes[node.id] && enabledNodes[pipelineNodes[index + 1].id] ? 'connector-live' : ''}`}><span /></div>}
            </div>)}
            <div className="schema-inspector"><span>SCHEMA / {selectedPipelineNode.schema}</span><strong>{selectedPipelineNode.fields}</strong><button onClick={() => setEnabledNodes((current) => ({ ...current, [selectedNode]: !current[selectedNode] }))}>{enabledNodes[selectedNode] ? 'Disable node' : 'Enable node'}</button></div>
          </div>
          <div className="visual-footer"><span>EVENTS PROCESSED</span><strong>2.4M <small>/ day</small></strong><span className="footer-divider" /><span>SCHEMA</span><strong className="accent-text">VALIDATED</strong></div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Platform metrics"><div><strong>12<span>ms</span></strong><small>p95 API latency</small></div><div><strong>99.99<span>%</span></strong><small>delivery reliability</small></div><div><strong>2.4<span>M</span></strong><small>daily events processed</small></div><div><strong>100<span>%</span></strong><small>schema coverage</small></div></section>

      <section className="proof-section" id="playground">
        <div className="section-intro"><p className="eyebrow">A working proof, not a promise</p><h2>See the contract<br /><em>behind the data.</em></h2><p>Every ADL system is observable, typed, and designed to be trusted before it reaches production.</p></div>
        <div className="api-console">
          <div className="console-top"><div className="window-dots"><i /><i /><i /></div><span>api.aingadatalabs.com</span><span className="console-secure">TLS 1.3 <span aria-hidden="true">&#10003;</span></span></div>
          <div className="endpoint-tabs">{(Object.keys(endpointSamples) as EndpointKey[]).map((key) => <button className={activeEndpoint === key ? 'endpoint-tab active' : 'endpoint-tab'} key={key} onClick={() => { setActiveEndpoint(key); setRequestState('idle') }}>{endpointSamples[key].label}</button>)}<a className="console-docs" href="/docs">OpenAPI docs -&gt;</a></div>
          <div className="request-line"><span className="method">GET</span><code>{endpoint.path}</code><span className="response-status">{endpoint.status}</span></div>
          <pre className="response-body"><code>{endpoint.response}</code></pre>
          <div className="console-bottom"><span>response_time <strong>{requestState === 'running' ? '...' : '11ms'}</strong></span><span>schema <strong>v1.4.0</strong></span><span>status <strong>{requestState === 'complete' ? '200 OK' : 'ready'}</strong></span><button className="run-request" onClick={runRequest} disabled={requestState === 'running'}>{requestState === 'running' ? 'Running...' : 'Run request'} <span aria-hidden="true">-&gt;</span></button></div>
          <div className="console-actions"><a href="/playground">Open full playground</a><span>Typed response / JSON</span></div>
        </div>
      </section>

      <section className="systems-section" id="services"><div className="section-heading"><p className="eyebrow">One lab. Three ways to move.</p><h2>Infrastructure that<br /><em>keeps up with ambition.</em></h2></div><div className="capability-grid"><article><span className="card-index">01 / 03</span><h3>Data pipelines</h3><p>Reliable ingestion and transformation for high-volume, high-consequence data.</p><a href="#contact">Explore pipelines <span>-&gt;</span></a></article><article><span className="card-index">02 / 03</span><h3>Custom APIs</h3><p>Clean, versioned interfaces that make complex datasets easy to integrate.</p><a href="#playground">Explore APIs <span>-&gt;</span></a></article><article><span className="card-index">03 / 03</span><h3>Intelligence systems</h3><p>Decision layers that connect your data estate to the moments that matter.</p><a href="#contact">Explore intelligence <span>-&gt;</span></a></article></div></section>

      <section className="featured-section" id="work">
        <div className="featured-copy"><p className="eyebrow">Featured system / 001</p><h2>Shopify intelligence<br /><em>without the guesswork.</em></h2><p>We built a decision layer for commerce teams that unifies orders, customers, products, and marketing signals into one operational view.</p><a className="text-link" href="#contact">Read the case study <span>-&gt;</span></a></div>
        <div className="featured-panel"><div className="panel-top"><span>SHOPIFY / SIGNAL MAP</span><span>LIVE</span></div><div className="signal-chart"><div className="chart-labels"><span>REVENUE VELOCITY</span><strong>+18.4%</strong></div><div className="chart-lines"><i /><i /><i /><i /><i /><svg viewBox="0 0 480 150" preserveAspectRatio="none" aria-label="Revenue velocity rising line"><polyline points="0,130 50,122 95,128 140,89 190,102 235,68 285,75 330,45 380,52 430,22 480,8" /></svg></div><div className="chart-axis"><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div></div><div className="panel-bottom"><span>4 SOURCES CONNECTED</span><span>LAST SYNC 00:04 AGO</span></div></div>
      </section>

      <section className="process-section" id="about"><div className="section-heading"><p className="eyebrow">The ADL method</p><h2>From scattered signals<br /><em>to clear decisions.</em></h2></div><div className="process-grid"><div><span>01</span><h3>Collect</h3><p>We connect every source, from APIs and files to the systems your teams already use.</p></div><div><span>02</span><h3>Transform</h3><p>We clean, normalize, and model it into a dependable data foundation.</p></div><div><span>03</span><h3>Enrich</h3><p>We add context, quality checks, and the business logic your people need.</p></div><div><span>04</span><h3>Serve</h3><p>We ship useful interfaces that make the right answer easy to reach.</p></div></div></section>

      <section className="case-section"><div className="section-heading"><p className="eyebrow">Selected work</p><h2>Small teams.<br /><em>Outsized leverage.</em></h2><a className="text-link" href="#contact">View all projects <span>-&gt;</span></a></div><div className="case-grid"><article><span>01 / RETAIL</span><h3>One source of truth for a multi-channel operator.</h3><strong>−42% <small>time spent on weekly reporting</small></strong></article><article><span>02 / FINANCE</span><h3>A market data API built for speed and scrutiny.</h3><strong>99.99% <small>delivery reliability in production</small></strong></article><article><span>03 / LOGISTICS</span><h3>Live visibility across a fragmented supply chain.</h3><strong>3.2x <small>faster exception resolution</small></strong></article></div></section>

      <section className="cta-section" id="contact"><p className="eyebrow">Have a messy data problem?</p><h2>Let’s make it<br /><em>useful.</em></h2><a className="button button-primary" href="mailto:hello@aingadatalabs.com">Start a technical discovery <span aria-hidden="true">-&gt;</span></a></section>
      <footer className="footer"><div><a className="brand" href="#top"><span className="brand-mark">ADL</span><span>Ainga Data Labs</span></a><p>Engineering clarity into complex data.</p></div><div className="footer-contact"><span>Have a system in mind?</span><a href="mailto:hello@aingadatalabs.com">hello@aingadatalabs.com <span>-&gt;</span></a></div><div className="footer-socials"><span>Social ecosystem</span><div><a href="https://x.com/home" target="_blank" rel="noreferrer">X</a><a href="https://youtube.com/@aingadatalabs" target="_blank" rel="noreferrer">YouTube</a><a href="https://github.com/organizations/aingadatalabs/settings/domains" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/nimrode-ainga-3b9394434/" target="_blank" rel="noreferrer">LinkedIn</a></div></div><span className="footer-meta">Ainga Data Labs / 2026</span></footer>
    </main>
  )
}