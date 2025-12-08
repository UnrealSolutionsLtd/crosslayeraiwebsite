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
          The companion engine that turns first-time players into loyal fans.
        </p>

        <p className="hero-tagline">
          One SDK. Persistent memory. Cross-platform presence.
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

      {/* USP Visual Section */}
      <section className="section usp-section" id="usp">
        <div className="section-header">
          <span className="section-tag">The Vision</span>
          <h2>One Companion. Two Worlds. Infinite Connection.</h2>
          <p>Your AI companion bridges the gap between gameplay and the real world.</p>
        </div>

        <div className="usp-visual">
          {/* Top capability icons */}
          <div className="usp-capabilities">
            <div className="cap-icon" title="Observes">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z"/>
              </svg>
            </div>
            <div className="cap-icon" title="Comments">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div className="cap-icon" title="Speaks">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <div className="cap-arrow">→</div>
            <div className="cap-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <span>SHARES STORIES</span>
            </div>
          </div>

          <div className="usp-diagram">
            {/* Game World Panel */}
            <div className="usp-panel game-world">
              <div className="panel-flow-label left-flow">
                <span>OBSERVES</span>
                <span>COMMENTS</span>
                <span>LEARNS</span>
              </div>
              <h3>THE GAME WORLD</h3>
              <div className="panel-icons">
                <div className="panel-icon">🎮</div>
                <div className="panel-icon">⚔️</div>
                <div className="panel-icon">🧙</div>
              </div>
            </div>

            {/* Center Robot */}
            <div className="usp-robot">
              <div className="robot-glow"></div>
              <div className="robot-body">
                <div className="robot-head">
                  <div className="robot-antenna"></div>
                  <div className="robot-face">
                    <div className="robot-eye left"></div>
                    <div className="robot-eye right"></div>
                    <div className="robot-smile"></div>
                  </div>
                </div>
                <div className="robot-torso">
                  <div className="robot-light"></div>
                </div>
                <div className="robot-arms">
                  <div className="robot-arm left"></div>
                  <div className="robot-arm right"></div>
                </div>
              </div>
            </div>

            {/* Everywhere Layer Panel */}
            <div className="usp-panel everywhere-layer">
              <div className="panel-flow-label right-flow">
                <span>SHARES</span>
                <span>STORIES</span>
              </div>
              <h3>THE EVERYWHERE LAYER</h3>
              <div className="panel-icons">
                <div className="panel-icon-labeled">
                  <span className="icon-svg tiktok">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </span>
                  <span className="icon-label">TikTok</span>
                </div>
                <div className="panel-icon-labeled">
                  <span className="icon-svg forums">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </span>
                  <span className="icon-label">Forums</span>
                </div>
                <div className="panel-icon-labeled">
                  <span className="icon-svg reddit">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  </span>
                  <span className="icon-label">Reddit</span>
                </div>
                <div className="panel-icon-labeled">
                  <span className="icon-svg llm">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </span>
                  <span className="icon-label">LLM Apps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flow arrows for mobile */}
          <div className="usp-flow-arrows">
            <div className="flow-arrow left">
              <span>← Observes, Comments, Learns</span>
            </div>
            <div className="flow-arrow right">
              <span>Shares Stories →</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>Three Steps to Better Retention</h2>
          <p>
            A simple integration that delivers measurable results.
          </p>
        </div>

        <div className="flow-container">
          <div className="flow-card">
            <span className="flow-number">01</span>
            <div className="flow-icon">👁️</div>
            <h3>Capture Player Context</h3>
            <p>
              Our SDK captures gameplay events automatically. Understand what your 
              players do, when they struggle, and what keeps them engaged.
            </p>
            <span className="flow-benefit">→ Reduce integration time to hours, not weeks</span>
          </div>

          <div className="flow-card">
            <span className="flow-number">02</span>
            <div className="flow-icon">🧠</div>
            <h3>Build Lasting Relationships</h3>
            <p>
              Every session builds persistent memory. Players feel recognized and 
              valued - the #1 driver of long-term retention.
            </p>
            <span className="flow-tech">Powered by vector memory and real-time event streaming</span>
            <span className="flow-benefit">→ Increase Day-30 retention by up to 20%</span>
          </div>

          <div className="flow-card">
            <span className="flow-number">03</span>
            <div className="flow-icon">🌐</div>
            <h3>Stay Connected Everywhere</h3>
            <p>
              Companions follow players to Discord, social media, and beyond - 
              keeping your game top-of-mind even when they&apos;re not playing.
            </p>
            <span className="flow-benefit">→ 3x more re-engagement touchpoints</span>
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

