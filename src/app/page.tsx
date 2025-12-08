'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main>
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <a href="/" className="logo">
            CROSSLAYER<span>AI</span>
          </a>
          <button 
            className="nav-cta" 
            data-tally-open="EkK1Or" 
            data-tally-emoji-text="👋" 
            data-tally-emoji-animation="wave"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="orb orb-cyan" />
        <div className="orb orb-magenta" />
        
        <span className="hero-badge">🚀 Join 50+ Studios on the Waitlist</span>
        
        <h1>
          The AI Companion That<br />
          <span className="highlight glow-cyan">Remembers Everything</span>
        </h1>
        
        <p className="hero-subtitle">
          AI companions that remember your players.
        </p>

        <p className="hero-tagline">
          Increase retention. Deepen engagement. Easy to implement.
        </p>
        
        <div className="hero-cta-group">
          <button 
            className="btn-primary" 
            data-tally-open="EkK1Or" 
            data-tally-emoji-text="🚀" 
            data-tally-emoji-animation="tada"
          >
            Get Early Access
          </button>
          <a href="#how-it-works" className="btn-secondary">
            Learn More
          </a>
        </div>

        {/* Demo Visual */}
        <div className="hero-visual">
          <div className="companion-demo box-glow-cyan">
            <div className="demo-header">
              <div className="demo-avatar">🤖</div>
              <div className="demo-info">
                <h4>Eva - Your AI Companion</h4>
                <span>Observing • Building Memory • Always Present</span>
              </div>
            </div>
            <div className="demo-messages">
              <div className="demo-message">
                &quot;Nice dodge! That <span className="highlight">Obsidian Golem</span> almost got you with 2 HP left. 
                Remember when we practiced that timing in the tutorial?&quot;
              </div>
              <div className="demo-message">
                &quot;I noticed you&apos;ve collected 47 rare crystals. Want me to remind you 
                when the <span className="highlight">Moonlight Merchant</span> spawns tomorrow?&quot;
              </div>
              <div className="demo-message">
                &quot;Just shared your epic boss fight on Discord! The guild is already 
                talking about your <span className="highlight">legendary parry combo</span>.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>From Observer to Lifelong Companion</h2>
          <p>
            CROSSLAYERAI companions don&apos;t just chat - they observe, remember, and grow with your players.
          </p>
        </div>

        <div className="flow-container">
          <div className="flow-card">
            <span className="flow-number">01</span>
            <div className="flow-icon">👁️</div>
            <h3>Observe</h3>
            <p>
              Our SDK captures gameplay events - kills, deaths, choices, achievements, 
              emotional moments - feeding context to your companion in real-time.
            </p>
          </div>

          <div className="flow-card">
            <span className="flow-number">02</span>
            <div className="flow-icon">💭</div>
            <h3>Engage</h3>
            <p>
              The companion comments, celebrates, warns, and jokes. It builds emotional 
              bonds through genuine reactions to player actions, not scripted dialogue.
            </p>
          </div>

          <div className="flow-card">
            <span className="flow-number">03</span>
            <div className="flow-icon">🧠</div>
            <h3>Remember</h3>
            <p>
              Every interaction builds persistent memory. Your companion recalls past 
              adventures, references shared jokes, and evolves its personality over time.
            </p>
          </div>

          <div className="flow-card">
            <span className="flow-number">04</span>
            <div className="flow-icon">🌐</div>
            <h3>Travel</h3>
            <p>
              The companion extends beyond the game - Discord, forums, social media. 
              It shares stories, answers questions, and keeps the connection alive.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-header">
          <span className="section-tag">Capabilities</span>
          <h2>Built for Studios Who Demand More</h2>
          <p>
            Everything you need to create unforgettable AI companions.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Drop-in SDK</h3>
            <p>
              Unity and Unreal plugins that integrate in minutes. One-line initialization, 
              automatic event capture, zero configuration hassle.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Emotional Modeling</h3>
            <p>
              Proprietary emotional architecture that creates genuine personality. 
              Your companion feels happy, concerned, excited - never robotic.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Persistent Memory</h3>
            <p>
              Cross-session, cross-platform memory that never forgets. The companion 
              builds a true relationship with each player over months and years.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>Voice & Text</h3>
            <p>
              Support for both text chat and voice output. Multiple voice styles, 
              emotional intonation, and seamless switching between modes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Border Region Integrations</h3>
            <p>
              Discord bots, web widgets, forum assistants. Your companion tells stories 
              about player adventures, creating viral social moments.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>LiveOps Intelligence</h3>
            <p>
              Companions communicate patches, events, and updates. They react to world 
              events and keep players engaged between sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="section" id="audiences" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="section-header">
          <span className="section-tag">Who It&apos;s For</span>
          <h2>Built for Game Studios</h2>
          <p>
            From indie teams to AAA publishers, CROSSLAYERAI scales with you.
          </p>
        </div>

        <div className="audiences-container">
          <div className="audience-card">
            <div className="audience-icon">🎮</div>
            <div className="audience-content">
              <h3>Indie & Mid-size Studios</h3>
              <p>
                Compete on innovation without enterprise resources. Add emotional AI 
                companions that increase retention by 15%+ with minimal engineering lift.
              </p>
              <ul className="audience-benefits">
                <li>Free tier available</li>
                <li>One-line integration</li>
                <li>No ML expertise needed</li>
              </ul>
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-icon">🏢</div>
            <div className="audience-content">
              <h3>AAA Publishers</h3>
              <p>
                Player-level personalization at scale. Build persistent characters across 
                titles and unlock new monetization through companion customization.
              </p>
              <ul className="audience-benefits">
                <li>Enterprise SLA</li>
                <li>Custom voice training</li>
                <li>White-label options</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* CTA / Signup Section */}
      <section className="cta-section" id="signup">
        <div className="cta-container">
          <h2>
            Be First to Build the<br />
            <span className="highlight glow-cyan">Future of AI Companions</span>
          </h2>
          <p>
            Join our early access program and shape the next generation of 
            persistent gaming AI.
          </p>

          <div className="form-container">
            <h3>🚀 Join the Waitlist</h3>
            <p>Get notified when we launch and receive exclusive early partner benefits.</p>
            
            <button 
              className="btn-primary" 
              data-tally-open="EkK1Or" 
              data-tally-emoji-text="👋" 
              data-tally-emoji-animation="wave"
              style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem', padding: '1.2rem 2rem' }}
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">CROSSLAYERAI</div>
          <p>
            Building the first persistent AI companion identity layer.<br />
            © {new Date().getFullYear()} CrossLayerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

