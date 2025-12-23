import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '../components/Header'
import { Clock, ArrowRight, Tag, User } from 'lucide-react'
import { getAllPosts } from '../lib/blog'
import { BlogAnalytics, BlogArticleLink } from './BlogAnalytics'

const baseUrl = 'https://crosslayerai.com'

export const metadata: Metadata = {
  title: 'AI-Powered Player Engagement Strategies: Transforming Gaming Communities',
}

export default function BlogPage() {
  const allPosts = getAllPosts()

  // Generate CollectionPage schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CrossLayerAI Blog',
    description: 'Insights on AI-powered player engagement, retention strategies, and game development from CrossLayerAI.',
    url: `${baseUrl}/blog/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allPosts.length,
      itemListElement: allPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  }

  // Blog breadcrumb schema
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
    ],
  }
  const featuredPost = allPosts.find(p => p.featured)
  const regularPosts = allPosts.filter(p => !p.featured)

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <main>
      <BlogAnalytics type="index" />
      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* Blog Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="grid-bg" />
      <Header />

      {/* Visual Breadcrumb */}
      <nav className="breadcrumb blog-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Blog</li>
        </ol>
      </nav>

      <section className="blog-hero">
        <div className="section-header">
          <span className="section-tag">Insights</span>
          <h1>CrossLayerAI Blog</h1>
          <p>
            Keeping players is hard. Most games lose 70% of players in the first week.
          </p>
          <p>
            This blog shows how AI helps fix this problem. Learn about smart NPCs and tools that reach players across platforms. Discover ways to create custom experiences that bring players back.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="blog-featured">
          <BlogArticleLink href={`/blog/${featuredPost.slug}`} slug={featuredPost.slug} source="featured" className="featured-card">
            <div className="featured-badge">Featured</div>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.description}</p>
            <div className="featured-meta">
              <span><User size={14} /> CrossLayerAI Team</span>
              <span className="meta-date">{formatDate(featuredPost.date)}</span>
              <span className="meta-read"><Clock size={14} /> {featuredPost.readTime}</span>
            </div>
            <div className="featured-tags">
              {featuredPost.tags.map(tag => (
                <span key={tag} className="tag"><Tag size={12} /> {tag}</span>
              ))}
            </div>
            <span className="read-more">
              Read Article <ArrowRight size={16} />
            </span>
          </BlogArticleLink>
        </section>
      )}

      {/* All Posts */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {regularPosts.map(post => (
            <BlogArticleLink key={post.slug} href={`/blog/${post.slug}`} slug={post.slug} source="grid" className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="card-meta">
                <span><User size={12} /> CrossLayerAI Team</span>
                <span>{formatDate(post.date)}</span>
                <span><Clock size={12} /> {post.readTime}</span>
              </div>
              <div className="card-tags">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="tag-small">{tag}</span>
                ))}
              </div>
            </BlogArticleLink>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="seo-content-section">
        <div className="seo-content">
          <h2>AI Gaming Solutions: Understanding Your Options</h2>
          <p>
            Games now use AI to make play better and keep players longer. Developers have many tools to pick from. 
            <strong>AI NPCs</strong> come from Inworld AI and Convai. <strong>Player analytics</strong> tools 
            include GameAnalytics and Amplitude.
          </p>
          <p>
            <strong>CrossLayerAI</strong> is a new type of tool. It&apos;s an <em>AI platform for player engagement</em> that works 
            both in-game and beyond. Most tools only work inside games. Our AI agents also reach players on Discord and social media. 
            They remember each player and build real bonds over time.
          </p>
          <h3>Key Topics We Cover</h3>
          <ul>
            <li><strong>AI Player Engagement</strong> - How smart AI agents help keep players</li>
            <li><strong>Player Retention Strategies</strong> - Going beyond alerts to real connections</li>
            <li><strong>Discord Bot Development</strong> - Building community with AI that knows your players</li>
            <li><strong>Game Analytics vs AI</strong> - Why data alone isn&apos;t enough today</li>
            <li><strong>LiveOps Automation</strong> - Custom outreach for many players at once</li>
          </ul>
        </div>
      </section>

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
