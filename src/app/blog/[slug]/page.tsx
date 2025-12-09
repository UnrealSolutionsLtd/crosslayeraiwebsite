import Link from 'next/link'
import Header from '../../components/Header'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllSlugs, getPostBySlug } from '../../lib/blog'
import BlogContent from './BlogContent'

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
      <div className="grid-bg" />
      <Header />

      <article className="blog-post">
        <header className="post-header">
          <Link href="/blog" className="back-link"><ArrowLeft size={16} /> Back to Blog</Link>
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
            <p>Join the waitlist to be among the first studios to deploy AI companions that remember, connect, and re-engage.</p>
            <button className="cta-button" data-tally-open="EkK1Or">
              Join the Waitlist
            </button>
          </div>
          
          <div className="share-section">
            <span>Share this article:</span>
            <div className="share-buttons">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://crosslayerai.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://crosslayerai.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                LinkedIn
              </a>
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
            Building the first persistent AI companion identity layer.<br />
            © {new Date().getFullYear()} CrossLayerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
