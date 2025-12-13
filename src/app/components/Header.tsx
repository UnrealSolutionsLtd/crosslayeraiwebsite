'use client'

import { CSSProperties, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Bell, Plus } from 'lucide-react'
import { GA_EVENTS } from '../lib/analytics'

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false)

  const navStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    maxWidth: '100%',
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid #2a2a3a',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  }

  const navContentStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '10px 24px',
    boxSizing: 'border-box',
    gap: '16px',
  }

  const logoLinkStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    flexShrink: 0,
  }

  const logoTextStyle: CSSProperties = {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#00f5d4',
    whiteSpace: 'nowrap',
  }

  const logoSpanStyle: CSSProperties = {
    color: '#ffffff',
  }

  const navActionsStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const navLinkStyle: CSSProperties = {
    color: '#c5c5d0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  }

  return (
    <nav style={navStyle}>
      <div style={navContentStyle}>
        {/* Logo */}
        <a href="/" style={logoLinkStyle} onClick={() => GA_EVENTS.HEADER_LOGO_CLICK()}>
          <Image 
            src="/logo-icon.svg" 
            alt="CrossLayerAI Logo" 
            width={32} 
            height={32}
            style={{ minWidth: '28px', minHeight: '28px' }}
          />
          <span style={logoTextStyle}>
            CROSSLAYER<span style={logoSpanStyle}>AI</span>
          </span>
        </a>

        {/* Actions */}
        <div style={navActionsStyle}>
          {/* Blog Link */}
          <Link 
            href="/blog" 
            style={navLinkStyle}
            onClick={() => GA_EVENTS.HEADER_BLOG_CLICK()}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#c5c5d0'
            }}
          >
            Blog
          </Link>

          {/* Contact */}
          <a
            href="mailto:business@crosslayerai.com"
            style={{
              ...navLinkStyle,
              border: '1px solid #00f5d4',
              color: '#00f5d4',
              fontWeight: 600,
            }}
            onClick={() => {
              GA_EVENTS.HEADER_CTA_CLICK()
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00f5d4'
              e.currentTarget.style.color = '#0a0a0f'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#00f5d4'
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
