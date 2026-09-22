import { useState, useRef, useEffect } from 'react'

interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLinkClick = (sectionId: string) => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
    onNavigate(sectionId)
  }

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <nav className="topbar" aria-label="Main navigation" ref={navRef}>
      <div className="topbar-header">
        <button className="brand brand-button" onClick={() => handleLinkClick('top')} aria-label="Ainga Data Labs home">
          <span className="brand-mark">ADL</span>
          <span>Ainga Data Labs</span>
        </button>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      <div className={`nav-wrapper ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="nav-links">
          {/* PRODUCTS DROPDOWN */}
          <div className="nav-item-dropdown" onMouseEnter={() => setActiveDropdown('products')}>
            <button className="dropdown-trigger" onClick={() => toggleDropdown('products')}>
              Products <span className="arrow">▾</span>
            </button>
            {activeDropdown === 'products' && (
              <div className="mega-menu" onMouseLeave={() => setActiveDropdown(null)}>
                <div className="menu-group">
                  <p className="menu-heading">FLAGSHIP PLATFORMS</p>
                  <button onClick={() => handleLinkClick('catalog')}>
                    <strong>Shopify Intelligence (SSIP)</strong>
                    <small>E-commerce, catalog, & price dynamics</small>
                  </button>
                  <button onClick={() => handleLinkClick('catalog')}>
                    <strong>Housing Intelligence (HIP)</strong>
                    <small>Real estate & rental price signals</small>
                  </button>
                </div>
                <div className="menu-group">
                  <p className="menu-heading">NEXT STEPS</p>
                  <a href="mailto:hello@aingadatalabs.com?subject=Book%20a%20Demo">
                    <strong>Book a Demo →</strong>
                    <small>1-on-1 architecture walkthrough</small>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* SERVICES DROPDOWN */}
          <div className="nav-item-dropdown" onMouseEnter={() => setActiveDropdown('services')}>
            <button className="dropdown-trigger" onClick={() => toggleDropdown('services')}>
              Services <span className="arrow">▾</span>
            </button>
            {activeDropdown === 'services' && (
              <div className="mega-menu mega-menu-wide" onMouseLeave={() => setActiveDropdown(null)}>
                <div className="menu-group">
                  <p className="menu-heading">DATA INFRASTRUCTURE</p>
                  <button onClick={() => handleLinkClick('services')}>Data Pipeline Development</button>
                  <button onClick={() => handleLinkClick('services')}>ETL Pipeline Services</button>
                  <button onClick={() => handleLinkClick('services')}>Data Engineering Services</button>
                </div>
                <div className="menu-group">
                  <p className="menu-heading">WEB DATA</p>
                  <button onClick={() => handleLinkClick('services')}>Web Scraping Services</button>
                  <button onClick={() => handleLinkClick('services')}>Web Data Extraction</button>
                  <button onClick={() => handleLinkClick('services')}>Automated Web Collection</button>
                </div>
                <div className="menu-group">
                  <p className="menu-heading">INTELLIGENCE & APIs</p>
                  <button onClick={() => handleLinkClick('catalog')}>Pricing & Market Intelligence</button>
                  <button onClick={() => handleLinkClick('playground')}>Data & Market APIs</button>
                </div>
              </div>
            )}
          </div>

          {/* DIRECT LINKS */}
          <button onClick={() => handleLinkClick('work')}>Work</button>
          <button onClick={() => handleLinkClick('insights')}>Insights</button>
          <a href="/docs">Docs</a>
          <button onClick={() => handleLinkClick('contact')}>Contact Us</button>
        </div>

        <div className="header-actions">
          <a className="nav-cta nav-cta-primary" href="mailto:hello@aingadatalabs.com?subject=Book%20a%20discovery%20call">
            Book demo <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </nav>
  )
}