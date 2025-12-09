'use client'

import { useEffect, useRef, useState } from 'react'
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
  Copy,
  CheckCircle2,
} from 'lucide-react'
import LiveDemo from './components/LiveDemo'
import Header from './components/Header'
import { GA_EVENTS } from './lib/analytics'

export default function Home() {
  const viewedSections = useRef<Set<string>>(new Set())
  const scrollMilestones = useRef<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const codeSnippet = `// Initialize CrossLayerAI
import { CrossLayerAI } from '@crosslayerai/sdk';

const companion = new CrossLayerAI({
  gameId: 'your-game-id',
  apiKey: process.env.CROSSLAYER_API_KEY
});

// Track player events
companion.trackEvent({
  playerId: player.id,
  event: 'boss_defeated',
  metadata: {
    bossName: 'Dragon Lord',
    playerLevel: 42,
    timeTaken: '8:32'
  }
});

// Your companion now remembers this forever ✨`

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

  // Scroll depth and section view tracking
  useEffect(() => {
    const handleScroll = () => {
      // Track scroll depth milestones (25%, 50%, 75%, 100%)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone)
          GA_EVENTS.SCROLL_DEPTH('page', milestone)
        }
      })

      // Track section views using Intersection Observer alternative
      const sections = [
        { id: 'demo', name: 'Live Demo' },
        { id: 'vs-section', name: 'VS Comparison', selector: '.vs-section' },
        { id: 'how-it-works', name: 'How It Works' },
        { id: 'features', name: 'Features' },
        { id: 'integration', name: 'Integration Code' },
        { id: 'problem', name: 'The Problem' },
      ]

      sections.forEach((section) => {
        const el = section.selector 
          ? document.querySelector(section.selector) 
          : document.getElementById(section.id)
        if (el && !viewedSections.current.has(section.id)) {
          const rect = el.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
          if (isVisible) {
            viewedSections.current.add(section.id)
            GA_EVENTS.SECTION_VIEW(section.name)
          }
        }
      })
    }

    // Track initial page view
    GA_EVENTS.PAGE_VIEW('Home')

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to catch above-fold content
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="orb orb-cyan" />
        <div className="orb orb-magenta" />
        
        <h1>
          Stop Losing Players.<br />
          <span className="highlight glow-cyan">Start Bringing Them Back.</span>
        </h1>
        
        <p className="hero-subtitle">
          Powered by AI companions that never forget.
        </p>

        {/* Live Demo - Right in Hero */}
        <LiveDemo />
      </section>

      {/* VS Comparison - Own Section */}
      <section className="section vs-section">
        <div className="section-header">
          <span className="section-tag">The Difference</span>
          <h2>Old Way vs New Way</h2>
        </div>
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
            <div className="feature-icon"><BarChart3 size={28} /></div>
            <h3>Intelligent Event Analysis</h3>
            <p>
              Not just data collection - <em>understanding</em>. We analyze in-game events to surface 
              what matters: the clutch plays, emotional moments, and stories worth telling. 
              Turn raw events into actionable player intelligence.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Database size={28} /></div>
            <h3>Persistent Memory</h3>
            <p>
              Schemaless event storage that accepts any data. Cross-session, cross-platform 
              memory that builds a true relationship with each player forever.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Link2 size={28} /></div>
            <h3>The Everywhere Layer</h3>
            <p>
              Discord bots, web widgets, TikTok, Reddit. Your companion reaches players 
              wherever they are, sharing stories and creating viral social moments.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Heart size={28} /></div>
            <h3>Personalized Re-engagement</h3>
            <p>
              No more generic &quot;come back&quot; messages. Your companion reaches out with 
              player-specific memories: &quot;Remember that Dragon Lord fight? You got him to 2%!&quot;
              Nostalgia that actually converts.
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
            <div className="feature-icon"><Zap size={28} /></div>
            <h3>Real-Time + Batch Intelligence</h3>
            <p>
              Instant responses in-game, intelligent re-engagement campaigns over time.
              Player-level insights that power both real-time interaction and long-term retention.
            </p>
          </div>
        </div>
      </section>

      {/* Why Different - Competitor Positioning */}
      <section className="section why-different-section" id="why-different">
        <div className="section-header">
          <span className="section-tag">Why CrossLayerAI</span>
          <h2>The Only Solution That Does It All</h2>
          <p>
            Other platforms solve pieces of the puzzle. We connect them all.
          </p>
        </div>

        <div className="positioning-visual">
          <div className="position-column">
            <div className="position-category">
              <span className="category-label">AI NPC Platforms</span>
              <span className="category-example">Inworld, Convai</span>
            </div>
            <div className="position-does">
              <Check size={16} /> AI personalities in-game
            </div>
            <div className="position-doesnt">
              <X size={16} /> No presence outside the game
            </div>
          </div>

          <div className="position-column center-column">
            <div className="position-bridge">
              <span className="bridge-label">CrossLayerAI</span>
              <span className="bridge-tagline">The Bridge</span>
            </div>
            <div className="bridge-features">
              <div className="bridge-feature"><Check size={14} /> AI Companion</div>
              <div className="bridge-feature"><Check size={14} /> Event Analytics</div>
              <div className="bridge-feature"><Check size={14} /> Everywhere Layer</div>
              <div className="bridge-feature"><Check size={14} /> Retention Engine</div>
            </div>
          </div>

          <div className="position-column">
            <div className="position-category">
              <span className="category-label">Analytics Tools</span>
              <span className="category-example">GameAnalytics, Amplitude</span>
            </div>
            <div className="position-does">
              <Check size={16} /> Track player behavior
            </div>
            <div className="position-doesnt">
              <X size={16} /> Can&apos;t act on insights
            </div>
          </div>
        </div>

        <div className="position-cta">
          <a href="/blog/why-crosslayerai-is-different" className="position-link">
            Read the full comparison →
          </a>
        </div>
      </section>

      {/* Code Snippet Section */}
      <section className="section code-section" id="integration">
        <div className="section-header">
          <span className="section-tag">Integration</span>
          <h2>Get Started in Minutes</h2>
          <p>
            Simple SDK setup. Powerful companion intelligence.
          </p>
        </div>

        <div className="sdk-icons">
          <div className="sdk-icon" title="Unity">
            <img src="https://cdn.simpleicons.org/unity/white" alt="Unity" />
            <span>Unity</span>
          </div>
          <div className="sdk-icon" title="Unreal Engine">
            <img src="https://cdn.simpleicons.org/unrealengine/white" alt="Unreal Engine" />
            <span>Unreal</span>
          </div>
          <div className="sdk-icon" title="Godot">
            <img src="https://cdn.simpleicons.org/godotengine/white" alt="Godot" />
            <span>Godot</span>
          </div>
          <div className="sdk-icon" title="HTML5 / Web Games">
            <img src="https://cdn.simpleicons.org/html5/white" alt="HTML5" />
            <span>HTML5</span>
          </div>
          <div className="sdk-icon" title="Discord">
            <img src="https://cdn.simpleicons.org/discord/white" alt="Discord" />
            <span>Discord</span>
          </div>
          <div className="sdk-icon" title="REST API">
            <img src="https://cdn.simpleicons.org/fastapi/white" alt="REST API" />
            <span>REST API</span>
          </div>
        </div>

        <div className="code-container">
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-filename">companion.ts</span>
              <button className="code-copy-btn" onClick={handleCopyCode}>
                {copied ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-content">
              <code>{codeSnippet}</code>
            </pre>
          </div>

          <div className="code-features">
            <div className="code-feature">
              <div className="code-feature-icon"><Zap size={20} /></div>
              <div>
                <h4>One-Line Init</h4>
                <p>Drop in the SDK and start tracking in seconds</p>
              </div>
            </div>
            <div className="code-feature">
              <div className="code-feature-icon"><Database size={20} /></div>
              <div>
                <h4>Auto Memory</h4>
                <p>Every event builds persistent player memory</p>
              </div>
            </div>
            <div className="code-feature">
              <div className="code-feature-icon"><Globe size={20} /></div>
              <div>
                <h4>Cross-Platform</h4>
                <p>Works with Unity, Unreal, and web games</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
