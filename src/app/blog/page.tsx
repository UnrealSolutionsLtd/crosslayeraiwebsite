import Link from 'next/link'
import Header from '../components/Header'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { getAllPosts } from '../lib/blog'
import { BlogAnalytics, BlogArticleLink } from './BlogAnalytics'

export default function BlogPage() {
  const allPosts = getAllPosts()
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
      <div className="grid-bg" />
      <Header />

      <section className="blog-hero">
        <div className="section-header">
          <span className="section-tag">Insights</span>
          <h1>CrossLayerAI Blog</h1>
          <p>
            Deep dives into AI-powered player engagement, retention strategies, and the future of gaming.
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
            The gaming industry is rapidly adopting AI to enhance player experiences and improve retention. 
            From <strong>AI NPCs</strong> powered by platforms like Inworld AI and Convai, to <strong>player analytics</strong> tools 
            like GameAnalytics and Amplitude, game developers have more options than ever.
          </p>
          <p>
            <strong>CrossLayerAI</strong> represents a new category: the <em>AI-powered player engagement platform</em> that combines 
            in-game intelligence with cross-platform outreach. Unlike traditional solutions that stay confined to the game, 
            CrossLayerAI agents follow players to Discord, social media, and beyond - maintaining persistent memory 
            and building real relationships over time.
          </p>
          <h3>Key Topics We Cover</h3>
          <ul>
            <li><strong>AI Player Engagement</strong> - How intelligent agents transform player retention</li>
            <li><strong>Player Retention Strategies</strong> - Moving beyond push notifications to emotional connections</li>
            <li><strong>Discord Bot Development</strong> - Building community with AI that knows your players</li>
            <li><strong>Game Analytics vs AI</strong> - Why data alone isn&apos;t enough for modern retention</li>
            <li><strong>LiveOps Automation</strong> - Personalized re-engagement at scale</li>
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
            The player engagement layer for games.<br />
            © {new Date().getFullYear()} CrossLayerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
