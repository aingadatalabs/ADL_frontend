import { useState, useEffect, type JSX, type MouseEvent } from 'react'

export interface LegalDocsAppProps {
  readonly initialTab?: 'terms' | 'privacy'
}

export default function LegalDocsApp({ initialTab = 'terms' }: LegalDocsAppProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab)
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const mainSiteUrl = isLocal ? '/' : 'https://aingadatalabs.com'

  useEffect(() => {
    setActiveTab(initialTab)
    const targetId = initialTab === 'privacy' ? 'privacy-policy' : 'terms-of-service'
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [initialTab])

  const handleBackToMain = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new Event('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSidebarClick = (e: MouseEvent<HTMLAnchorElement>, tab: 'terms' | 'privacy', targetId: string) => {
    e.preventDefault()
    setActiveTab(tab)
    const targetUrl = tab === 'terms' ? '/terms' : '/privacy'
    window.history.pushState({}, '', targetUrl)

    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="legal-shell">
      <style>{`
        .legal-shell {
          background-color: #030705;
          color: #d1d5db;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        .legal-header {
          max-width: 1100px;
          margin: 0 auto 3rem;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          padding-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .legal-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 3rem;
        }

        .legal-sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .legal-content {
          background-color: #09110d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 3rem 2.5rem;
          line-height: 1.7;
        }

        .legal-content h3 {
          color: #ffffff;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .legal-content ul {
          padding-left: 1.25rem;
          margin: 0.5rem 0;
        }

        .legal-content li {
          margin-bottom: 0.25rem;
        }

        .sidebar-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          border-left: 2px solid transparent;
          padding-left: 0.75rem;
          transition: all 0.2s ease;
        }

        .sidebar-link.active {
          color: #ffffff;
          border-left-color: #10b981;
          font-weight: 600;
        }

        @media (max-width: 868px) {
          .legal-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .legal-sidebar {
            position: relative;
            top: 0;
          }

          .legal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .legal-content {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>

      <header className="legal-header">
        <div>
          <a 
            href={mainSiteUrl} 
            onClick={handleBackToMain}
            style={{ textDecoration: 'none', color: '#10b981', fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span style={{ backgroundColor: '#10b981', color: '#030705', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>ADL</span>
            Ainga Data Labs
          </a>
          <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Legal Documentation &amp; Governance Portal</p>
        </div>
        <a 
          href={mainSiteUrl} 
          onClick={handleBackToMain}
          style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}
        >
          &larr; Back to Main Site
        </a>
      </header>

      <div className="legal-grid">
        {/* SIDEBAR NAVIGATION */}
        <aside className="legal-sidebar">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#10b981', fontWeight: 700, margin: '0 0 1rem' }}>GOVERNANCE DOCUMENTS</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a 
              href="/terms" 
              className={`sidebar-link ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={(e) => handleSidebarClick(e, 'terms', 'terms-of-service')}
            >
              1. Terms of Service
            </a>
            <a 
              href="/privacy" 
              className={`sidebar-link ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={(e) => handleSidebarClick(e, 'privacy', 'privacy-policy')}
            >
              2. Privacy Policy
            </a>
          </nav>
        </aside>

        {/* MAIN LEGAL CONTENT CONTAINER */}
        <main className="legal-content">
          
          {/* SECTION 1: TERMS OF SERVICE */}
          <section id="terms-of-service" style={{ marginBottom: '5rem', scrollMarginTop: '2rem' }}>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>GOVERNANCE / CONTRACT</span>
            <h1 style={{ color: '#ffffff', fontSize: '2.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>AINGA DATA LABS — TERMS OF SERVICE</h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2.5rem' }}>Last Updated: September 21, 2026 &bull; Effective Date: September 21, 2026</p>

            <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3>1. About These Terms</h3>
                <p>These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Ainga Data Labs website at aingadatalabs.com, together with any websites, applications, documentation, data products, APIs, software, services, and related offerings that expressly incorporate these Terms (collectively, the &quot;Services&quot;).</p>
                <p>&quot;Ainga Data Labs,&quot; &quot;ADL,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to the operator of the Ainga Data Labs business.</p>
                <p>By accessing or using the Services, you agree to these Terms. If you do not agree with these Terms, you should not use the Services.</p>
                <p>Additional terms may apply to particular products, APIs, data products, or services. Where additional terms conflict with these Terms, the additional terms will govern the relevant service to the extent of the conflict.</p>
              </div>

              <div>
                <h3>2. What Ainga Data Labs Does</h3>
                <p>Ainga Data Labs builds and operates data infrastructure, web extraction systems, data pipelines, intelligence systems, and API-based products designed to transform external and changing data into structured, usable information.</p>
                <p>Our Services may include:</p>
                <ul>
                  <li>data extraction and collection systems;</li>
                  <li>data normalization and enrichment;</li>
                  <li>data pipelines and ETL/ELT systems;</li>
                  <li>data products and intelligence feeds;</li>
                  <li>APIs and machine-readable datasets;</li>
                  <li>analytics and research systems;</li>
                  <li>software engineering and data infrastructure services;</li>
                  <li>documentation and technical resources; and</li>
                  <li>related consulting or implementation services.</li>
                </ul>
                <p>Specific Services available to you may change over time.</p>
              </div>

              <div>
                <h3>3. Eligibility</h3>
                <p>You may use the Services only if you can legally enter into a binding agreement with ADL and your use of the Services complies with applicable law.</p>
                <p>If you are accessing the Services on behalf of a company, organization, or other entity, you represent that you have authority to bind that entity to these Terms.</p>
              </div>

              <div>
                <h3>4. Accounts and Access</h3>
                <p>Certain Services may require an account, API key, credentials, or other authentication mechanism.</p>
                <p>You are responsible for:</p>
                <ul>
                  <li>maintaining the confidentiality of your credentials;</li>
                  <li>protecting API keys and access tokens;</li>
                  <li>providing accurate information where required;</li>
                  <li>using your account only for authorized purposes; and</li>
                  <li>notifying ADL promptly if you believe your credentials have been compromised.</li>
                </ul>
                <p>You must not share, sell, transfer, or otherwise provide access credentials to unauthorized persons unless expressly permitted by the applicable Service terms.</p>
                <p>ADL may suspend or revoke access where reasonably necessary to protect the Services, users, data, infrastructure, or third parties.</p>
              </div>

              <div>
                <h3>5. Permitted Use</h3>
                <p>You may use the Services only for lawful purposes and in accordance with these Terms.</p>
                <p>You agree not to:</p>
                <ul>
                  <li>use the Services in violation of applicable law or regulation;</li>
                  <li>interfere with or disrupt the Services or their underlying infrastructure;</li>
                  <li>attempt to gain unauthorized access to systems, accounts, networks, or data;</li>
                  <li>circumvent security, rate limits, authentication, or access controls;</li>
                  <li>introduce malicious code, malware, or other harmful material;</li>
                  <li>use the Services to infringe intellectual-property, privacy, or other rights;</li>
                  <li>use the Services to unlawfully collect, process, disclose, or distribute personal data;</li>
                  <li>reverse engineer or attempt to extract source code from software except where applicable law expressly permits it;</li>
                  <li>abuse APIs through excessive or unauthorized requests;</li>
                  <li>misrepresent the origin, accuracy, or ownership of data supplied by ADL; or</li>
                  <li>use the Services in a manner that could reasonably damage ADL&apos;s infrastructure or reputation.</li>
                </ul>
                <p>ADL may impose reasonable technical limits, usage restrictions, or rate limits for particular Services.</p>
              </div>

              <div>
                <h3>6. Data and Third-Party Sources</h3>
                <p>ADL may obtain or process information from publicly accessible websites, licensed sources, customer-provided sources, APIs, databases, and other external sources.</p>
                <p>The availability and accuracy of external information may change without notice.</p>
                <p>Unless expressly stated otherwise, ADL does not guarantee that third-party information is: complete; accurate; current; uninterrupted; error-free; or suitable for a particular purpose.</p>
                <p>Where you provide information, datasets, URLs, credentials, or other materials to ADL, you are responsible for having the necessary rights and permissions for ADL to process those materials for the agreed purpose.</p>
                <p>You must not provide ADL with personal data or confidential information unless doing so is necessary for the applicable Service and you have an appropriate legal basis and authorization to provide it.</p>
              </div>

              <div>
                <h3>7. Customer Responsibilities</h3>
                <p>If you use an ADL data product, API, dataset, or custom service, you are responsible for determining whether your intended use complies with applicable laws, regulations, contractual obligations, and third-party terms.</p>
                <p>You are also responsible for:</p>
                <ul>
                  <li>evaluating data before making consequential decisions;</li>
                  <li>maintaining appropriate security controls;</li>
                  <li>protecting credentials and confidential information;</li>
                  <li>complying with applicable privacy obligations;</li>
                  <li>respecting intellectual-property rights;</li>
                  <li>respecting applicable terms imposed by third-party data sources; and</li>
                  <li>ensuring that your use of ADL output is appropriate for your particular business purpose.</li>
                </ul>
                <p>ADL provides data and infrastructure to support decision-making. ADL output should not automatically be treated as a substitute for independent verification or professional advice.</p>
              </div>

              <div>
                <h3>8. Intellectual Property</h3>
                <p>The Services, including ADL&apos;s software, website, source code, architecture, designs, documentation, trademarks, branding, interfaces, and original content, are owned by or licensed to ADL and are protected by applicable intellectual-property laws.</p>
                <p>Except where expressly permitted, these Terms do not grant you ownership of ADL&apos;s intellectual property.</p>
                <p>Subject to the applicable Service agreement, ADL may grant you a limited, non-exclusive, non-transferable right to access and use specific products, datasets, APIs, or materials for their intended purpose.</p>
                <p>You retain ownership of materials that you lawfully provide to ADL, subject to the rights necessary for ADL to provide the applicable Services.</p>
              </div>

              <div>
                <h3>9. Data Products and API Services</h3>
                <p>Where ADL provides datasets, intelligence feeds, APIs, or other machine-readable outputs:</p>
                <ul>
                  <li>access may be subject to usage limits;</li>
                  <li>data may be updated, changed, corrected, or removed;</li>
                  <li>availability may depend on external sources;</li>
                  <li>API schemas may evolve;</li>
                  <li>deprecated endpoints may be retired following reasonable notice where practicable; and</li>
                  <li>particular products may have additional licensing restrictions.</li>
                </ul>
                <p>You may not resell, redistribute, mirror, scrape, replicate, or commercially exploit an ADL data product beyond the rights expressly granted for that product.</p>
              </div>

              <div>
                <h3>10. Availability and Changes</h3>
                <p>ADL aims to operate reliable Services but does not guarantee uninterrupted availability.</p>
                <p>Services may occasionally be unavailable because of maintenance, upgrades, infrastructure failures, security incidents, third-party failures, network conditions, changes to external data sources, or circumstances outside ADL&apos;s reasonable control.</p>
              </div>

              <div>
                <h3>11. Third-Party Services</h3>
                <p>The Services may integrate with or depend upon third-party services, infrastructure providers, APIs, hosting providers, analytics services, payment providers, or external data sources.</p>
                <p>ADL is not responsible for the independent operation, availability, content, or policies of third-party services.</p>
              </div>

              <div>
                <h3>12. Confidential Information</h3>
                <p>Where ADL and a customer exchange confidential information, each party should use reasonable measures to protect the other&apos;s confidential information.</p>
              </div>

              <div>
                <h3>13. Payments and Commercial Services</h3>
                <p>Certain ADL Services may require payment. Pricing, billing periods, usage limits, renewal terms, refunds, and other commercial conditions will be disclosed before purchase.</p>
              </div>

              <div>
                <h3>14. Disclaimers</h3>
                <p>To the maximum extent permitted by applicable law, the Services are provided on an &quot;as available&quot; and &quot;as is&quot; basis.</p>
              </div>

              <div>
                <h3>15. Limitation of Liability</h3>
                <p>To the maximum extent permitted by applicable law, ADL will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or relating to your use of the Services.</p>
              </div>

              <div>
                <h3>16. Indemnification</h3>
                <p>To the extent permitted by applicable law, you agree to indemnify and hold ADL harmless from claims, losses, liabilities, costs, and reasonable expenses arising from your unlawful use of the Services.</p>
              </div>

              <div>
                <h3>17. Suspension and Termination</h3>
                <p>ADL may suspend or terminate access where you materially breach these Terms or create a security/operational risk.</p>
              </div>

              <div>
                <h3>18. Privacy</h3>
                <p>ADL&apos;s processing of personal data is described in the Ainga Data Labs Privacy Policy.</p>
              </div>

              <div>
                <h3>19. Governing Law</h3>
                <p>These Terms are governed by the laws of Kenya, unless applicable law requires otherwise.</p>
              </div>

              <div>
                <h3>20. Changes to These Terms</h3>
                <p>ADL may update these Terms from time to time by updating the &quot;Last Updated&quot; date.</p>
              </div>

              <div>
                <h3>21. Severability</h3>
                <p>If any provision of these Terms is found to be invalid, remaining provisions will continue to apply.</p>
              </div>

              <div>
                <h3>22. Entire Agreement</h3>
                <p>These Terms constitute the complete agreement governing your use of the Services.</p>
              </div>

              <div>
                <h3>23. Contact</h3>
                <p>Questions regarding these Terms may be sent to:</p>
                <p style={{ color: '#10b981', fontFamily: 'monospace' }}>Ainga Data Labs<br/>Email: hello@aingadatalabs.com<br/>Website: aingadatalabs.com</p>
              </div>
            </article>
          </section>

          <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '4rem 0' }} />

          {/* SECTION 2: PRIVACY POLICY */}
          <section id="privacy-policy" style={{ scrollMarginTop: '2rem' }}>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>PRIVACY / COMPLIANCE</span>
            <h1 style={{ color: '#ffffff', fontSize: '2.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>AINGA DATA LABS — PRIVACY POLICY</h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2.5rem' }}>Last Updated: September 21, 2026 &bull; Effective Date: September 21, 2026</p>

            <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3>1. Introduction</h3>
                <p>Ainga Data Labs (&quot;ADL,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting personal data that we process.</p>
                <p>This Privacy Policy explains how ADL collects, uses, stores, shares, and protects personal data when you visit aingadatalabs.com, contact us, or use an ADL product or service.</p>
                <p>ADL processes personal data in accordance with applicable data-protection law, including the Kenya Data Protection Act, 2019, where applicable.</p>
              </div>

              <div>
                <h3>2. Who We Are</h3>
                <p>Ainga Data Labs is a data infrastructure and intelligence business operating from Kenya.</p>
                <p>For personal data that ADL determines the purposes and means of processing, ADL acts as a data controller. For certain customer engagements, ADL may act as a data processor.</p>
              </div>

              <div>
                <h3>3. Personal Data We May Collect</h3>
                <p>We may collect information you provide voluntarily (name, email, company, title, messages) as well as technical information collected automatically (IP address, browser type, operating system, pages visited, access time).</p>
              </div>

              <div>
                <h3>4. Information Collected Automatically</h3>
                <p>When you visit our website, certain technical information may be collected automatically, including diagnostic and security-related information.</p>
              </div>

              <div>
                <h3>5. Cookies and Similar Technologies</h3>
                <p>ADL may use cookies or similar technologies to operate the website, remember preferences, measure website traffic, and maintain security.</p>
              </div>

              <div>
                <h3>6. How We Use Personal Data</h3>
                <p>We use personal data to provide and operate Services, respond to enquiries, maintain security, troubleshoot problems, and comply with legal obligations.</p>
              </div>

              <div>
                <h3>7. Legal Bases for Processing</h3>
                <p>Depending on the circumstances, processing is based on consent, performance of a contract, compliance with legal obligations, or legitimate business interests.</p>
              </div>

              <div>
                <h3>8. Data From Third-Party Sources</h3>
                <p>ADL may receive information from service providers, public sources, APIs, directories, and business partners.</p>
              </div>

              <div>
                <h3>9. Web Data and External Sources</h3>
                <p>Products and systems may process public web data responsibly, respecting applicable law, access controls, and source terms.</p>
              </div>

              <div>
                <h3>10. How We Share Personal Data</h3>
                <p>We disclose personal data to service providers, hosting infrastructure, analytics providers, legal authorities (where required), and professional advisers. We do not sell personal data.</p>
              </div>

              <div>
                <h3>11. International Transfers</h3>
                <p>Where personal data is transferred outside Kenya, ADL applies safeguards required by the Kenya Data Protection Act.</p>
              </div>

              <div>
                <h3>12. Data Retention</h3>
                <p>We retain personal data only for as long as necessary for the purposes for which it was collected or required by law.</p>
              </div>

              <div>
                <h3>13. Data Security</h3>
                <p>ADL uses technical and organizational measures (access controls, authentication, encryption, backups) to protect personal data.</p>
              </div>

              <div>
                <h3>14. Your Data Protection Rights</h3>
                <p>You have rights including access, correction, deletion, objection, restriction, and data portability under applicable law.</p>
              </div>

              <div>
                <h3>15. How to Exercise Your Rights</h3>
                <p>To make a privacy request, contact <span style={{ color: '#10b981', fontFamily: 'monospace' }}>hello@aingadatalabs.com</span>.</p>
              </div>

              <div>
                <h3>16. Children&apos;s Privacy</h3>
                <p>Services are intended for business professionals and developers. ADL does not knowingly collect personal data from children.</p>
              </div>

              <div>
                <h3>17. Third-Party Websites</h3>
                <p>Our website may link to third-party services whose privacy practices ADL does not control.</p>
              </div>

              <div>
                <h3>18. Analytics and Marketing</h3>
                <p>Where deployed, analytics technologies collect interaction information subject to appropriate consent where required.</p>
              </div>

              <div>
                <h3>19. Data Controller and Data Processor Relationships</h3>
                <p>ADL acts as a controller when determining processing purpose/means, and as a processor when acting under customer instructions.</p>
              </div>

              <div>
                <h3>20. Changes to This Privacy Policy</h3>
                <p>ADL may update this Privacy Policy periodically when Services or regulations change.</p>
              </div>

              <div>
                <h3>21. Complaints and Concerns</h3>
                <p>Contact <span style={{ color: '#10b981', fontFamily: 'monospace' }}>hello@aingadatalabs.com</span> or the supervisory authority (Office of the Data Protection Commissioner - ODPC Kenya).</p>
              </div>

              <div>
                <h3>22. Contact Us</h3>
                <p style={{ color: '#10b981', fontFamily: 'monospace' }}>Ainga Data Labs<br/>Email: hello@aingadatalabs.com<br/>Website: aingadatalabs.com</p>
              </div>
            </article>
          </section>

        </main>
      </div>
    </div>
  )
}