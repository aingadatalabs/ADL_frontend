import type { JSX, MouseEvent } from 'react'
import '../footer.css' // Guarantee styles load on all sub-routes

export function Footer(): JSX.Element {
  const termsUrl = '/terms'
  const privacyUrl = '/privacy'

  const handleLegalNavigation = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSpaNavigation = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('popstate'))
    const targetId = path.split('#')[1]
    if (targetId) {
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="site-footer" style={{ width: '100%', marginTop: 'auto', display: 'block' }}>
      <section className="footer-contact-callout" aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title">Have a difficult data problem?</h2>
        <p>Tell us what you're trying to collect, normalize, monitor or expose.</p>
        <a href="/contact" onClick={(e) => handleSpaNavigation(e, '/contact')}>
          Discuss the problem with us <span aria-hidden="true">&rarr;</span>
        </a>
      </section>

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

        <div className="footer-shortcuts">
          <div className="footer-links-col">
            <span className="footer-heading">COMPANY</span>
            <a href="/about" onClick={(e) => handleSpaNavigation(e, '/about')}>About ADL</a>
            <a href="/about#about-principles-title" onClick={(e) => handleSpaNavigation(e, '/about#about-principles-title')}>Engineering principles</a>
            <a href="/about#about-team-title" onClick={(e) => handleSpaNavigation(e, '/about#about-team-title')}>Founder</a>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">EXPLORE</span>
            <a href="/products" onClick={(e) => handleSpaNavigation(e, '/products')}>Products</a>
            <a href="/solutions" onClick={(e) => handleSpaNavigation(e, '/solutions')}>Solutions</a>
            <a href="/solutions#case-studies" onClick={(e) => handleSpaNavigation(e, '/solutions#case-studies')}>Case Studies</a>
            <a href="/docs" onClick={(e) => handleSpaNavigation(e, '/docs')}>Docs</a>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">CONNECT</span>
            <a href="/contact" onClick={(e) => handleSpaNavigation(e, '/contact')}>Contact Us</a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com&su=Inquiry%20for%20Ainga%20Data%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="email-link"
              aria-label="Send email via Gmail to Ainga Data Labs"
            >
              hello@aingadatalabs.com
            </a>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">LEGAL</span>
            <a href={privacyUrl} onClick={(e) => handleLegalNavigation(e, privacyUrl)}>Privacy</a>
            <a href={termsUrl} onClick={(e) => handleLegalNavigation(e, termsUrl)}>Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ainga Data Labs. All rights reserved.</p>
      </div>
    </footer>
  )
}