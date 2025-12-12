'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GA_EVENTS } from '../lib/analytics'

export default function Header() {
  const navStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    maxWidth: '100%',
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.8)',
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
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '12px 16px',
    boxSizing: 'border-box',
  }

  const logoLinkStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  }

  const logoTextStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 3vw, 1.5rem)',
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#00f5d4',
    whiteSpace: 'nowrap',
  }

  const logoSpanStyle: CSSProperties = {
    color: '#ffffff',
  }

  const navLinksStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 3vw, 24px)',
  }

  const navLinkStyle: CSSProperties = {
    color: '#c5c5d0',
    textDecoration: 'none',
    fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'color 0.2s ease',
  }

  const navCtaStyle: CSSProperties = {
    padding: 'clamp(6px, 1.5vw, 10px) clamp(10px, 2.5vw, 24px)',
    background: 'transparent',
    border: '1px solid #00f5d4',
    color: '#00f5d4',
    fontSize: 'clamp(0.65rem, 1.8vw, 0.9rem)',
    fontWeight: 600,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  }

  return (
    <nav style={navStyle}>
      <div style={navContentStyle}>
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
        <div style={navLinksStyle}>
          <a 
            href="https://unrealsolutions.com" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...navLinkStyle,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00f5d4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#c5c5d0'
            }}
          >
            <span style={{ opacity: 0.7, fontSize: '0.75em' }}>powered by</span>
            RVR Engine
          </a>
          <Link 
            href="/blog" 
            style={navLinkStyle}
            onClick={() => GA_EVENTS.HEADER_BLOG_CLICK()}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00f5d4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#c5c5d0'
            }}
          >
            Blog
          </Link>
          <button
            style={navCtaStyle}
            data-tally-open="EkK1Or"
            onClick={() => {
              GA_EVENTS.HEADER_CTA_CLICK()
              GA_EVENTS.WAITLIST_FORM_OPEN('header')
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00f5d4'
              e.currentTarget.style.color = '#0a0a0f'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 212, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#00f5d4'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  )
}

