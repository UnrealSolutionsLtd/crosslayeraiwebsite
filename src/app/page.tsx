'use client'

import { useEffect, useState } from 'react'
import {
  Play,
  Share2,
  TrendingUp,
  Home as HomeIcon,
  Film,
  Gamepad2,
  Camera,
  Brain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Send,
  Code,
  X,
  Check,
  Zap,
  Database,
  Globe,
  Bell,
  User,
  Search,
} from 'lucide-react'
import Header from './components/Header'
import FeedWidgetDemo, { FeedItem } from './components/FeedWidgetDemo'
import { GA_EVENTS } from './lib/analytics'

// Code snippet examples for the integration section
const codeExamples = [
  {
    id: 'init',
    title: 'Initialize',
    icon: Play,
    filename: 'setup.ts',
    code: `// Initialize CrossLayerAI in 3 lines
import { CrossLayerAI } from '@crosslayerai/sdk';

const crosslayer = new CrossLayerAI({
  gameId: 'your-game-id',
  apiKey: process.env.CROSSLAYER_API_KEY
});

// That's it! You're ready to capture moments.`,
  },
  {
    id: 'events',
    title: 'Track Events',
    icon: Gamepad2,
    filename: 'events.ts',
    code: `// Track any in-game event
crosslayer.trackEvent({
  playerId: player.id,
  event: 'boss_defeated',
  metadata: {
    bossName: 'Dragon Lord',
    playerLevel: 42,
    attempts: 7,
    timeTaken: '8:32'
  }
});

// CrossLayerAI remembers this forever ✨`,
  },
  {
    id: 'media',
    title: 'Send Media',
    icon: Camera,
    filename: 'media.ts',
    code: `// Capture screenshots and clips
await crosslayer.sendScreenshot({
  playerId: player.id,
  image: screenshotBuffer,
  context: 'Clutch 1v5 ace!'
});

// Send video clips
await crosslayer.sendClip({
  playerId: player.id,
  video: clipBuffer,
  duration: 15,
  tags: ['ace', 'clutch', 'ranked']
});`,
  },
  {
    id: 'memory',
    title: 'Query Memory',
    icon: Brain,
    filename: 'memory.ts',
    code: `// Ask anything about a player in plain English
const answer = await crosslayer.query(
  "What was Alex's closest moment to getting the 3K badge?"
);

// → "Alex hit 2912 damage on March 15th, just 88 
//    damage away. Used Reyna on Ascent, 4 kills 
//    in the final round."

await crosslayer.query("Who does Alex play with most?");
// → "@shadow_striker - 47 games together, usually 
//    Friday nights"`,
  },
  {
    id: 'outreach',
    title: 'AI Outreach',
    icon: Send,
    filename: 'outreach.ts',
    code: `// AI crafts personalized messages
const message = await crosslayer.generateOutreach({
  playerId: player.id,
  channel: 'discord',
  trigger: 'win_streak_ended'
});

// Result: "Hey Alex! That 12-game win streak
// was legendary 🔥 Ready to start a new one?"

// Works on Discord, TikTok, email, push...`,
  },
]

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [activeExample, setActiveExample] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [integrationPath, setIntegrationPath] = useState<'nocode' | 'developer'>('nocode')
  const [userClips, setUserClips] = useState<FeedItem[]>([])

  // Handle new clip submission from TryIt form
  const handleClipSubmit = (clip: FeedItem) => {
    setUserClips(prev => [clip, ...prev])
    // Scroll to demo section to show the new clip
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle view mode change from FeedWidgetDemo (for potential future use)
  const handleViewModeChange = (_mode: 'publisher' | 'player') => {
    // View mode is now managed within FeedWidgetDemo
  }

  // Code carousel functions
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[activeExample].code)
    setCopied(true)
    GA_EVENTS.CODE_COPY()
    setTimeout(() => setCopied(false), 2000)
  }

  const nextExample = () => {
    setActiveExample((prev) => (prev + 1) % codeExamples.length)
    setIsAutoPlaying(false)
  }

  const prevExample = () => {
    setActiveExample((prev) => (prev - 1 + codeExamples.length) % codeExamples.length)
    setIsAutoPlaying(false)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % codeExamples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Page view tracking
  useEffect(() => {
    GA_EVENTS.PAGE_VIEW('Home')
    GA_EVENTS.DEMO_STARTED()
  }, [])

  return (
    <main className="community-app">
      <Header />

      <div className="community-container">
        {/* Main Content */}
        <div className="community-main">
          
          {/* Stories Bar */}
          {/* <section className="stories-bar">
            <div className="story-item create-story">
              <div className="story-avatar-wrapper">
                <div className="story-avatar create">
                  <Plus size={14} />
                </div>
              </div>
              <span className="story-username">Your Story</span>
            </div>
            {playerStories.map((player) => (
              <div key={player.id} className={`story-item ${player.hasNew ? 'has-new' : ''}`}>
                <div className={`story-avatar-wrapper ${player.isLive ? 'is-live' : ''}`}>
                  <div className="story-avatar">
                    <span>{player.avatar}</span>
                  </div>
                  {player.isLive && <span className="live-badge">LIVE</span>}
                </div>
                <span className="story-username">{player.username}</span>
                <span className="story-game">{player.game}</span>
              </div>
            ))}
          </section> */}

          {/* Hero - Interactive Feed Demo (THE Primary Demo) */}
          <section className="hero-feed hero-feed-primary" id="demo">
            <div className="hero-feed-header">
              <h1>CrossLayerAI transforms game moments into <span className="gradient-text">personalized player outreach</span></h1>
              <p className="hero-subtitle">
                A platform that enhances engagement on Discord and social media—one upload, everywhere.
              </p>
            </div>

            {/* Feed Widget Demo - THE main demo */}
            <FeedWidgetDemo 
              additionalClips={userClips} 
              onClipSubmit={handleClipSubmit} 
              onViewModeChange={handleViewModeChange}
              isPrimary={true} 
            />
          </section>

          {/* Platform Pitch */}
          <section className="platform-pitch">
            <div className="pitch-header">
              <h2>From game events to personalized outreach</h2>
            </div>
            <div className="pitch-features">
              <div className="pitch-feature">
                <div className="pitch-icon"><Camera size={24} /></div>
                <h3>Zero Dev Lift</h3>
                <p>Plug into your existing clip capture and watch content flow straight into community feeds. No SDK, no dev time - your moments go live in Discord channels automatically.</p>
              </div>
              <div className="pitch-feature">
                <div className="pitch-icon"><Brain size={24} /></div>
                <h3>Persistent Player Memory</h3>
                <p>Every clutch play, near-miss, and milestone stored per player. AI references their history when posting to feeds - content that feels personal, shared publicly.</p>
              </div>
              <div className="pitch-feature">
                <div className="pitch-icon"><Share2 size={24} /></div>
                <h3>Community-First Content</h3>
                <p>Clips and achievements flow into social feeds where players hype each other. Cross-promote across game communities - your content in front of similar audiences.</p>
              </div>
              <div className="pitch-feature">
                <div className="pitch-icon"><TrendingUp size={24} /></div>
                <h3>Viral, Not Paid</h3>
                <p>80%+ daily reach through community feeds (vs 5% push). Reward players for sharing clips and milestones. Zero ad spend - your community becomes your growth engine.</p>
              </div>
            </div>
          </section>


          {/* Comparison */}
          <section className="comparison-section">
            <h2>Why CrossLayerAI is Different</h2>
            <div className="comparison-cards">
              <div className="comparison-card old">
                <div className="comparison-header">
                  <X size={24} />
                  <h4>Without CrossLayerAI</h4>
                </div>
                <ul>
                  <li>Clips sit unused in storage</li>
                  <li>Generic "come back" push notifications</li>
                  <li>No player context or memory</li>
                  <li>Paying for ads to re-engage players</li>
                  <li>Re-engagement rates under 5%</li>
                </ul>
              </div>
              <div className="comparison-card new">
                <div className="comparison-header">
                  <Check size={24} />
                  <h4>With CrossLayerAI</h4>
                </div>
                <ul>
                  <li>Every clip becomes personalized content</li>
                  <li>Reference player's actual memories</li>
                  <li>Deep player context across sessions</li>
                  <li>No ads - organic, personal outreach</li>
                  <li>80%+ reach on Discord, 36% return lift</li>
                </ul>
              </div>
            </div>
          </section>



          {/* Integration Section */}
          <section className="code-section" id="integration">
            <h2>Get Started in Minutes</h2>
            
            {/* Integration Path Tabs */}
            <div className="integration-tabs">
              <button 
                className={`integration-tab ${integrationPath === 'nocode' ? 'active' : ''}`}
                onClick={() => {
                  setIntegrationPath('nocode')
                  GA_EVENTS.INTEGRATION_TAB_CLICK('nocode')
                }}
              >
                <div className="tab-icon">
                  <Zap size={24} />
                </div>
                <div className="tab-content">
                  <span className="tab-title">No Code</span>
                  <span className="tab-badge">Recommended</span>
                </div>
              </button>
              <button 
                className={`integration-tab ${integrationPath === 'developer' ? 'active' : ''}`}
                onClick={() => {
                  setIntegrationPath('developer')
                  GA_EVENTS.INTEGRATION_TAB_CLICK('developer')
                }}
              >
                <div className="tab-icon">
                  <Code size={24} />
                </div>
                <div className="tab-content">
                  <span className="tab-title">Developer SDK</span>
                </div>
              </button>
            </div>

            {/* No Code Panel */}
            {integrationPath === 'nocode' && (
              <div className="integration-panel">
                {/* Simple Flow Steps */}
                <div className="simple-flow">
                  <div className="simple-step">
                    <span className="simple-number">1</span>
                    <div className="simple-content">
                      <span className="simple-title">Capture clip</span>
                      <span className="simple-sub">via RVR Engine, Medal.tv or OBS</span>
                    </div>
                  </div>
                  <div className="simple-step">
                    <span className="simple-number">2</span>
                    <div className="simple-content">
                      <span className="simple-title">Upload to CrossLayerAI</span>
                      <span className="simple-sub">Adds player memory</span>
                    </div>
                  </div>
                  <div className="simple-step">
                    <span className="simple-number">3</span>
                    <div className="simple-content">
                      <span className="simple-title">Share to your community</span>
                      <span className="simple-sub">Plug&play video feed, Discord bot, Twitter and everywhere else</span>
                    </div>
                  </div>
                </div>

                <div className="nocode-integrations">
                  <a href="https://tally.so/r/mZDq7v" target="_blank" rel="noopener noreferrer" className="integration-item" title="RVR Integration" onClick={() => GA_EVENTS.RVR_LINK_CLICK()}>
                    <Camera size={24} />
                    <span>RVR Engine</span>
                  </a>
                  <div className="integration-item" title="Medal.tv">
                    <Film size={24} />
                    <span>Medal.tv</span>
                  </div>
                  <div className="integration-item discord-highlight" title="Discord">
                    <img src="https://cdn.simpleicons.org/discord/white" alt="Discord" />
                    <span>Discord Bot</span>
                  </div>
                </div>
              </div>
            )}

            {/* Developer SDK Panel */}
            {integrationPath === 'developer' && (
              <div className="integration-panel">
                <p className="panel-description">Full control with SDK and API integration for custom implementations.</p>
                
                <div className="panel-integrations developer-grid">
                  <div className="integration-item" title="REST API">
                    <img src="https://cdn.simpleicons.org/fastapi/white" alt="REST API" />
                    <span>REST API</span>
                  </div>
                  <div className="integration-item" title="Unity">
                    <img src="https://cdn.simpleicons.org/unity/white" alt="Unity" />
                    <span>Unity</span>
                  </div>
                  <div className="integration-item" title="Unreal Engine">
                    <img src="https://cdn.simpleicons.org/unrealengine/white" alt="Unreal Engine" />
                    <span>Unreal</span>
                  </div>
                  <div className="integration-item" title="Godot">
                    <img src="https://cdn.simpleicons.org/godotengine/white" alt="Godot" />
                    <span>Godot</span>
                  </div>
                  <div className="integration-item" title="HTML5 / Web Games">
                    <img src="https://cdn.simpleicons.org/html5/white" alt="HTML5" />
                    <span>HTML5</span>
                  </div>
                  <div className="integration-item" title="Roblox">
                    <img src="https://cdn.simpleicons.org/roblox/white" alt="Roblox" />
                    <span>Roblox</span>
                  </div>
                </div>

                {/* Code Carousel - Only shown for Developer path */}
                <div className="code-carousel">
              {/* Tab Navigation */}
              <div className="code-tabs">
                {codeExamples.map((example, index) => {
                  const IconComponent = example.icon
                  return (
                    <button
                      key={example.id}
                      className={`code-tab ${activeExample === index ? 'active' : ''}`}
                      onClick={() => {
                        setActiveExample(index)
                        setIsAutoPlaying(false)
                      }}
                    >
                      <IconComponent size={18} />
                      <span>{example.title}</span>
                    </button>
                  )
                })}
              </div>

              <div className="code-carousel-container">
                {/* Prev Button */}
                <button className="carousel-nav prev" onClick={prevExample} aria-label="Previous example">
                  <ChevronLeft size={24} />
                </button>

                {/* Code Window */}
                <div className="code-window">
                  <div className="code-header">
                    <div className="code-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="code-filename">{codeExamples[activeExample].filename}</span>
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
                  <div className="code-content-wrapper">
                    <pre className="code-content" key={activeExample}>
                      <code>{codeExamples[activeExample].code}</code>
                    </pre>
                  </div>
                </div>

                {/* Next Button */}
                <button className="carousel-nav next" onClick={nextExample} aria-label="Next example">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="carousel-progress">
                {codeExamples.map((_, index) => (
                  <button
                    key={index}
                    className={`progress-dot ${activeExample === index ? 'active' : ''}`}
                    onClick={() => {
                      setActiveExample(index)
                      setIsAutoPlaying(false)
                    }}
                    aria-label={`Go to example ${index + 1}`}
                  >
                    <span className="progress-fill" style={{ animationDuration: isAutoPlaying && activeExample === index ? '4s' : '0s' }} />
                  </button>
                ))}
              </div>
            </div>

                {/* Features below carousel */}
                <div className="code-features-row">
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
            )}

            {/* CTA after integration */}
            <div className="integration-cta">
              <a 
                href="mailto:business@crosslayerai.com"
                className="btn-integration"
                onClick={() => GA_EVENTS.DEMO_CTA_CLICK()}
              >
                Get Started with Personalized Outreach Today!
                <ArrowRight size={18} />
              </a>
              <span className="integration-cta-hint">Questions? We're here to help</span>
            </div>
          </section>

        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        <a href="#" className="mobile-nav-item active">
          <HomeIcon size={24} />
          <span>Home</span>
        </a>
        <a href="#" className="mobile-nav-item">
          <Search size={24} />
          <span>Search</span>
        </a>
        <a href="#demo" className="mobile-nav-item shorts-btn">
          <Film size={28} />
        </a>
        <a href="#" className="mobile-nav-item">
          <Bell size={24} />
          <span>Alerts</span>
        </a>
        <a href="#" className="mobile-nav-item">
          <User size={24} />
          <span>Profile</span>
        </a>
      </nav>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo-container">
            <img src="/logo-icon.svg" alt="CrossLayerAI" width={40} height={40} />
            <div className="footer-logo">CROSSLAYERAI</div>
          </div>
          <p>© {new Date().getFullYear()} CrossLayerAI. All rights reserved.</p>
          <p className="footer-contact">
            <a href="mailto:business@crosslayerai.com" className="footer-email" onClick={() => GA_EVENTS.FOOTER_CTA_CLICK()}>
              business@crosslayerai.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
