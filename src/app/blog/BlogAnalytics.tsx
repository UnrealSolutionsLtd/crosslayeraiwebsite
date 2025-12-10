'use client'

import { useEffect } from 'react'
import { GA_EVENTS } from '../lib/analytics'

interface BlogPageAnalyticsProps {
  type: 'index'
}

interface BlogArticleAnalyticsProps {
  type: 'article'
  slug: string
  title: string
}

type BlogAnalyticsProps = BlogPageAnalyticsProps | BlogArticleAnalyticsProps

export function BlogAnalytics(props: BlogAnalyticsProps) {
  useEffect(() => {
    if (props.type === 'index') {
      GA_EVENTS.BLOG_PAGE_VIEW()
    } else if (props.type === 'article') {
      GA_EVENTS.BLOG_ARTICLE_VIEW(props.slug, props.title)
    }
  }, [])

  return null
}

interface BlogArticleClickProps {
  slug: string
  source: 'featured' | 'grid'
  children: React.ReactNode
  href: string
  className?: string
}

export function BlogArticleLink({ slug, source, children, href, className }: BlogArticleClickProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => GA_EVENTS.BLOG_ARTICLE_CLICK(slug, source)}
    >
      {children}
    </a>
  )
}

interface BlogCTAButtonProps {
  slug: string
}

export function BlogCTAButton({ slug }: BlogCTAButtonProps) {
  return (
    <button
      className="cta-button"
      data-tally-open="EkK1Or"
      onClick={() => {
        GA_EVENTS.BLOG_CTA_CLICK(slug)
        GA_EVENTS.WAITLIST_FORM_OPEN('blog_article')
      }}
    >
      Join the Waitlist
    </button>
  )
}

interface BlogShareButtonProps {
  platform: 'twitter' | 'linkedin'
  slug: string
  title: string
}

export function BlogShareButton({ platform, slug, title }: BlogShareButtonProps) {
  const getShareUrl = () => {
    const articleUrl = encodeURIComponent(`https://crosslayerai.com/blog/${slug}`)
    const encodedTitle = encodeURIComponent(title)
    
    if (platform === 'twitter') {
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${articleUrl}`
    }
    return `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`
  }

  return (
    <a
      href={getShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="share-btn"
      onClick={() => GA_EVENTS.BLOG_SHARE_CLICK(platform, slug)}
    >
      {platform === 'twitter' ? 'Twitter' : 'LinkedIn'}
    </a>
  )
}

interface BlogBackLinkProps {
  slug: string
}

export function BlogBackLink({ slug }: BlogBackLinkProps) {
  return (
    <a
      href="/blog"
      className="back-link"
      onClick={() => GA_EVENTS.BLOG_BACK_CLICK(slug)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back to Blog
    </a>
  )
}

