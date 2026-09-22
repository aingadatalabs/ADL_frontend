import type { JSX } from 'react'

export function Footer(): JSX.Element {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'

  const termsUrl = isLocal 
    ? '/legal#terms-of-service' 
    : 'https://docs.aingadatalabs.com/#terms-of-service'

  const privacyUrl = isLocal 
    ? '/legal#privacy-policy' 
    : 'https://docs.aingadatalabs.com/#privacy-policy'

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand-col">
          <div className="brand brand-button">
            <span className="brand-mark">ADL</span>
            <span className="brand-title">Ainga Data Labs</span>
          </div>
          <p className="footer-tagline">
            Engineering clarity into complex data. We build and manage production-grade data pipelines, web extraction systems, and market intelligence APIs.
          </p>
          <div className="social-links">
            <a 
              href="https://x.com/AingaDataLabs" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ainga Data Labs on X"
            >
              X
            </a>
            <a 
              href="https://github.com/aingadatalabs" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ainga Data Labs on GitHub"
            >
              GitHub
            </a>
            <a 
              href="https://youtube.com/@AingaDataLabs" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ainga Data Labs on YouTube"
            >
              YouTube
            </a>
            <a 
              href="https://reddit.com/user/aingadatalabs" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ainga Data Labs on Reddit"
            >
              Reddit
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <span className="footer-heading">PLATFORM</span>
          <a href="/products">Products</a>
          <a href="/services">Services</a>
          <a href="/work">Case Studies</a>
        </div>

        <div className="footer-links-col">
          <span className="footer-heading">RESOURCES</span>
          <a href="/docs">Documentation</a>
          <a href="/insights">Insights</a>
        </div>

        <div className="footer-links-col">
          <span className="footer-heading">COMPANY</span>
          <a href="/contact">Contact</a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Inquiry%20for%20Ainga%20Data%20Labs" 
            target="_blank"
            rel="noopener noreferrer"
            className="email-link"
            aria-label="Send email via Gmail to Ainga Data Labs"
          >
            hello@aingadatalabs.com
          </a>
          <a 
            href={privacyUrl} 
            target={isLocal ? '_self' : '_blank'} 
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a 
            href={termsUrl} 
            target={isLocal ? '_self' : '_blank'} 
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ainga Data Labs. All rights reserved.</p>
        <div className="status-indicator">
          <span className="status-dot-inline" /> All Pipelines Operational
        </div>
      </div>
    </footer>
  )
}