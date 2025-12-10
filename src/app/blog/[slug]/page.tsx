import Link from 'next/link'
import Header from '../../components/Header'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllSlugs, getPostBySlug } from '../../lib/blog'
import BlogContent from './BlogContent'
import { BlogAnalytics, BlogCTAButton, BlogShareButton, BlogBackLink } from '../BlogAnalytics'

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

  return (
    <main>
      <BlogAnalytics type="article" slug={slug} title={post.title} />
      <div className="grid-bg" />
      <Header />

      <article className="blog-post">
        <header className="post-header">
          <BlogBackLink slug={slug} />
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
            <BlogCTAButton slug={slug} />
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
            The player engagement layer for games.<br />
            © {new Date().getFullYear()} CrossLayerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
