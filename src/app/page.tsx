'use client'

import { useEffect } from 'react'
import {
  Mail,
  Bell,
  Gift,
  BarChart2,
  X,
  Brain,
  MessageCircle,
  Globe,
  Heart,
  Check,
  Gamepad2,
  Swords,
  Wand2,
  Zap,
  Sparkles,
  Database,
  Mic,
  Link2,
  BarChart3,
} from 'lucide-react'

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
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="orb orb-cyan" />
        <div className="orb orb-magenta" />
        
        <h1>
          Turn Players Into<br />
          <span className="highlight glow-cyan">Lifelong Fans</span>
        </h1>
        
        <p className="hero-subtitle">
          AI companions that remember, connect, and keep them coming back.
        </p>
        
        <div className="hero-cta-group">
          <button 
            className="btn-primary" 
            data-tally-open="EkK1Or" 
          >
            Get Early Access
          </button>
          <a href="#how-it-works" className="btn-secondary">
            Learn More
          </a>
        </div>

        {/* Differentiation Visual */}
        <div className="hero-visual">
          <div className="diff-container">
            <div className="diff-panel diff-old">
              <div className="diff-header">
                <span className="diff-label">Traditional Retention</span>
              </div>
              <div className="diff-items">
                <div className="diff-item faded">
                  <span className="diff-icon"><Mail size={18} /></span>
                  <span>Generic email blasts</span>
                </div>
                <div className="diff-item faded">
                  <span className="diff-icon"><Bell size={18} /></span>
                  <span>Annoying push notifications</span>
                </div>
                <div className="diff-item faded">
                  <span className="diff-icon"><Gift size={18} /></span>
                  <span>Same rewards for everyone</span>
                </div>
                <div className="diff-item faded">
                  <span className="diff-icon"><BarChart2 size={18} /></span>
                  <span>Players are just numbers</span>
                </div>
              </div>
              <div className="diff-result negative">
                <X size={16} strokeWidth={3} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                <span>Most players never return</span>
              </div>
            </div>

            <div className="diff-divider">
              <div className="diff-vs">VS</div>
            </div>

            <div className="diff-panel diff-new">
              <div className="diff-header">
                <span className="diff-label highlight">CrossLayerAI</span>
              </div>
              <div className="diff-items">
                <div className="diff-item glow">
                  <span className="diff-icon"><Brain size={18} /></span>
                  <span>Remembers every player&apos;s journey</span>
                </div>
                <div className="diff-item glow">
                  <span className="diff-icon"><MessageCircle size={18} /></span>
                  <span>Personal conversations that matter</span>
                </div>
                <div className="diff-item glow">
                  <span className="diff-icon"><Globe size={18} /></span>
                  <span>Present everywhere they are</span>
                </div>
                <div className="diff-item glow">
                  <span className="diff-icon"><Heart size={18} /></span>
                  <span>Real emotional connection</span>
                </div>
              </div>
              <div className="diff-result positive">
                <Check size={16} strokeWidth={3} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                <span>Players who want to stay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Visual */}
      <section className="section usp-section" id="how-it-works">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>In-Game → Everywhere</h2>
        </div>

        <div className="usp-visual">
          <div className="usp-diagram">
            {/* Game World Panel */}
            <div className="usp-panel game-world">
              <h3>IN-GAME</h3>
              <p className="panel-desc">Watches, learns, and builds memory</p>
              <div className="panel-icons">
                <div className="panel-icon"><Gamepad2 size={32} /></div>
                <div className="panel-icon"><Swords size={32} /></div>
                <div className="panel-icon"><Wand2 size={32} /></div>
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
              <h3>THE EVERYWHERE LAYER</h3>
              <p className="panel-desc">Shares stories and keeps players engaged</p>
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
                  <span className="icon-svg discord">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </span>
                  <span className="icon-label">Discord</span>
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
                <div className="panel-icon-labeled">
                  <span className="icon-svg web">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </span>
                  <span className="icon-label">Web</span>
                </div>
              </div>
            </div>
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
            <div className="feature-icon"><Zap size={28} /></div>
            <h3>Drop-in SDK</h3>
            <p>
              Unity and Unreal plugins that integrate in minutes. One-line initialization, 
              automatic event capture, zero configuration hassle.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Sparkles size={28} /></div>
            <h3>Emotional Modeling</h3>
            <p>
              Proprietary emotional architecture that creates genuine personality. 
              Your companion feels happy, concerned, excited - never robotic.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Database size={28} /></div>
            <h3>Persistent Memory</h3>
            <p>
              Cross-session, cross-platform memory that never forgets. The companion 
              builds a true relationship with each player over months and years.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Mic size={28} /></div>
            <h3>Voice & Text</h3>
            <p>
              Support for both text chat and voice output. Multiple voice styles, 
              emotional intonation, and seamless switching between modes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Link2 size={28} /></div>
            <h3>Border Region Integrations</h3>
            <p>
              Discord bots, web widgets, forum assistants. Your companion tells stories 
              about player adventures, creating viral social moments.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><BarChart3 size={28} /></div>
            <h3>LiveOps Intelligence</h3>
            <p>
              Companions communicate patches, events, and updates. They react to world 
              events and keep players engaged between sessions.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section" id="problem" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="section-header">
          <span className="section-tag">The Problem</span>
          <h2>Retention Is Broken</h2>
          <p>
            Most players leave and never come back. Traditional methods don&apos;t work anymore.
          </p>
        </div>

        <div className="audiences-container">
          <div className="audience-card">
            <div className="audience-icon"><BarChart2 size={36} /></div>
            <div className="audience-content">
              <h3>Day 7 retention averages 4%</h3>
              <p>
                96% of players are gone within a week. Push notifications get ignored. 
                Email campaigns get filtered. Discount pop-ups feel desperate. 
                Players don&apos;t leave because your game is bad - they leave because 
                nothing pulls them back. They are lost forever.
              </p>
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-icon"><Heart size={36} /></div>
            <div className="audience-content">
              <h3>Connection is what&apos;s missing</h3>
              <p>
                The games people return to for years have one thing in common: 
                they create relationships. CrossLayerAI gives every player someone 
                who remembers them, talks to them between sessions, and makes 
                coming back feel like coming home. Everywhere.
              </p>
            </div>
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
