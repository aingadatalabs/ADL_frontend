import React, { useState } from 'react'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  target?: string
  rel?: string
  defaultColor?: string
  hoverColor?: string
}

// Reusable Hover Link Component
const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  target,
  rel,
  defaultColor = '#ccc',
  hoverColor = '#ffffff'
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? hoverColor : defaultColor,
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'color 0.2s ease',
        cursor: 'pointer'
      }}
    >
      {children}
    </a>
  )
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#0a0a0a',
        color: '#e5e5e5',
        padding: '3rem 1.5rem 1.5rem 1.5rem',
        marginTop: 'auto',
        fontFamily: 'monospace, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem'
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span
              style={{
                backgroundColor: '#00f22c',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                padding: '0.2rem 0.4rem',
                borderRadius: '3px'
              }}
            >
              ADL
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#fff' }}>Ainga Data Labs</strong>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: '1.5', marginBottom: '1rem' }}>
            Engineering clarity into complex data. We build and manage production-grade data
            pipelines, web extraction systems, and market intelligence APIs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <FooterLink href="https://x.com" target="_blank" rel="noreferrer" defaultColor="#888">𝕏</FooterLink>
            <FooterLink href="https://github.com" target="_blank" rel="noreferrer" defaultColor="#888">GitHub</FooterLink>
            <FooterLink href="https://youtube.com" target="_blank" rel="noreferrer" defaultColor="#888">YouTube</FooterLink>
            <FooterLink href="https://reddit.com" target="_blank" rel="noreferrer" defaultColor="#888">Reddit</FooterLink>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#666', marginBottom: '1rem', textTransform: 'uppercase' }}>
            PLATFORM
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><FooterLink href="/products">Products</FooterLink></li>
            <li><FooterLink href="/services">Services</FooterLink></li>
            <li><FooterLink href="/work">Case Studies</FooterLink></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#666', marginBottom: '1rem', textTransform: 'uppercase' }}>
            RESOURCES
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><FooterLink href="/docs">Documentation</FooterLink></li>
            <li><FooterLink href="/insights">Insights</FooterLink></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#666', marginBottom: '1rem', textTransform: 'uppercase' }}>
            COMPANY
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
            <li>
              <FooterLink
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@aingadatalabs.com"
                target="_blank"
                rel="noopener noreferrer"
                defaultColor="#00f22c"
                hoverColor="#33ff57"
              >
                hello@aingadatalabs.com
              </FooterLink>
            </li>
            <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
            <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          color: '#666'
        }}
      >
        <span>© {currentYear} Ainga Data Labs. All rights reserved.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#111', padding: '0.3rem 0.6rem', borderRadius: '12px', border: '1px solid #222' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#00f22c', borderRadius: '50%' }} />
          <span style={{ color: '#aaa' }}>All Pipelines Operational</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer