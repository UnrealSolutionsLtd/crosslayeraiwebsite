import Link from 'next/link'
import Header from '../../components/Header'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllSlugs, getPostBySlug } from '../../lib/blog'
import BlogContent from './BlogContent'
import { BlogAnalytics, BlogCTAButton, BlogShareButton, BlogBackLink } from '../BlogAnalytics'

const baseUrl = 'https://crosslayerai.com'

// Generate Article and Breadcrumb structured data
function generateStructuredData(post: { slug: string; title: string; date: string; description: string; readTime: string; tags: string[] }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'CrossLayerAI',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CrossLayerAI',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}/`,
    },
    image: `${baseUrl}/og-image-v2.png`,
    keywords: post.tags.join(', '),
    articleSection: 'Gaming AI',
    wordCount: Math.round(parseInt(post.readTime) * 200), // Estimate based on read time
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}/`,
      },
    ],
  }

  return { articleSchema, breadcrumbSchema }
}

// Required for static export - tells Next.js which pages to generate
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return { title: 'Post Not Found | CrossLayerAI Blog' }
  }
  
  return {
    title: `${post.title} | CrossLayerAI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

// Format date for display
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Main page component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <main>
        <div className="grid-bg" />
        <Header />
        <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <Link href="/blog" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <h1>Post Not Found</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>This article doesn&apos;t exist yet.</p>
        </section>
      </main>
    )
  }

  const { articleSchema, breadcrumbSchema } = generateStructuredData(post)

  return (
    <main>
      <BlogAnalytics type="article" slug={slug} title={post.title} />
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="grid-bg" />
      <Header />

      <article className="blog-post">
        <header className="post-header">
          {/* Visual Breadcrumb Navigation */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>{formatDate(post.date)}</span>
            <span><Clock size={14} /> {post.readTime}</span>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag"><Tag size={12} /> {tag}</span>
            ))}
          </div>
        </header>

        <div className="post-content">
          <BlogContent content={post.content} />
        </div>

        <footer className="post-footer">
          <div className="cta-box">
            <h3>Ready to Transform Player Retention?</h3>
            <p>Join the waitlist to be among the first studios to deploy AI agents that remember, connect, and re-engage.</p>
          </div>
          
          <div className="share-section">
            <span>Share this article:</span>
            <div className="share-buttons">
              <BlogShareButton platform="twitter" slug={slug} title={post.title} />
              <BlogShareButton platform="linkedin" slug={slug} title={post.title} />
            </div>
          </div>
        </footer>
      </article>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo-container">
            <img src="/logo-icon.svg" alt="CrossLayerAI" width={40} height={40} />
            <div className="footer-logo">CROSSLAYERAI</div>
          </div>
          <p>
            © {new Date().getFullYear()} CrossLayerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
