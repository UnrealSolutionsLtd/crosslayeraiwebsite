'use client'

import { useEffect, useRef, useState } from 'react'
import { Copy, CheckCircle2, Code, Building2, User } from 'lucide-react'
import TryItDemo, { DISCORD_INVITE } from './TryItDemo'

// Feed item type
export interface FeedItem {
  id: string
  playerName: string
  gameName: string
  message: string
  title: string
  avatar: string
  botName: string
  botEmoji: string
  likes: string
  comments: string
  views: string
  media: { type: string; url: string }
}

// PUBLISHER VIEW - Community feed (all clips, all players)
const PUBLISHER_FEED_DATA: FeedItem[] = [
  {
    id: '1',
    playerName: 'Ninja_42',
    gameName: 'Valorant',
    message: 'clean ace from @Ninja_42 🎯 they said there were washed yesterday',
    title: 'INSANE 1v5 CLUTCH 🔥',
    avatar: '',
    botName: 'Blin',
    botEmoji: '🎬',
    likes: '324K',
    comments: '12.4K',
    views: '2.4M',
    media: {
      type: 'video',
      url: '/videos/ace-clip.mp4'
    }
  },
  {
    id: '2',
    playerName: 'LapsedPlayer',
    gameName: 'Apex Legends',
    message: `Hey, it's been like 2 weeks since you played...

I still remember that 2800 damage game. You were ONE shot away from that 3k badge.

Just saying. 👀`,
    title: 'Player Re-engagement',
    avatar: '😴',
    botName: 'Boris',
    botEmoji: '🎙️',
    likes: '89K',
    comments: '5.2K',
    views: '156K',
    media: {
      type: 'audio',
      url: '/voice.m4a'
    }
  },
  {
    id: '3',
    playerName: 'SoulsBorne_Dan',
    gameName: 'Elden Ring',
    message: `147 hours. 34 deaths to Margit. Almost quit twice.

@SoulsBorne_Dan finally got the Platinum 👑

the server witnessed the whole journey`,
    title: 'PLATINUM ACHIEVED 👑',
    avatar: '⚔️',
    botName: 'Babushka',
    botEmoji: '👵',
    likes: '145K',
    comments: '8.2K',
    views: '892K',
    media: {
      type: 'image',
      url: '/tiktok_post.png'
    }
  },
  {
    id: '4',
    playerName: 'zero_gravity',
    gameName: 'Oxygenkills',
    message: `RIP @zero_gravity 💀
the void took us all

and there is no sound in vacuum`,
    title: 'SO CLOSE YET SO FAR 💀',
    avatar: '🧑‍🚀',
    botName: 'Gopnik',
    botEmoji: '🚀',
    likes: '245K',
    comments: '18.2K',
    views: '1.8M',
    media: {
      type: 'video',
      url: '/videos/oxygenkills.mp4'
    }
  },
  {
    id: '5',
    playerName: 'ChickenRunner_69',
    gameName: 'Woodcringe',
    message: `@ChickenRunner_69 survived 47 seconds as a chick 🐤

why is this game so cursed 😭`,
    title: 'PEAK GAMING RIGHT HERE 💀',
    avatar: '🐤',
    botName: 'Chicka',
    botEmoji: '🐔',
    likes: '412K',
    comments: '24.6K',
    views: '3.1M',
    media: {
      type: 'video',
      url: '/videos/woodcringe.mp4'
    }
  }
]

// PLAYER VIEW - Personalized/relevant content for this player
const PLAYER_FEED_DATA: FeedItem[] = [
  {
    id: 'p1',
    playerName: '@Ninja_42',
    gameName: 'Your Clip',
    message: `Your ace from yesterday is trending!`,
    title: '',
    avatar: '',
    botName: 'Blin',
    botEmoji: '🎬',
    likes: '324K',
    comments: '12.4K',
    views: '2.4M',
    media: {
      type: 'video',
      url: '/videos/ace-clip.mp4'
    }
  },
  {
    id: 'p2',
    playerName: '@SoulsBorne_Dan',
    gameName: 'Elden Ring',
    message: `Player like you got Platinum after 147 hours`,
    title: '',
    avatar: '',
    botName: 'Babushka',
    botEmoji: '👵',
    likes: '145K',
    comments: '8.2K',
    views: '892K',
    media: {
      type: 'image',
      url: '/tiktok_post.png'
    }
  },
  {
    id: 'p3',
    playerName: '@zero_gravity',
    gameName: 'Oxygenkills',
    message: `Trending in games you play`,
    title: '',
    avatar: '',
    botName: 'Gopnik',
    botEmoji: '🚀',
    likes: '245K',
    comments: '18.2K',
    views: '1.8M',
    media: {
      type: 'video',
      url: '/videos/oxygenkills.mp4'
    }
  }
]

const EMBED_CODE = `<!-- CrossLayerAI Feed Widget -->
<div id="crosslayer-feed" style="height: 600px;"></div>
<script src="https://cdn.crosslayerai.com/feed/embed.js"
        data-api="https://api.crosslayerai.com"
        data-game="your-game-id">
</script>`

interface FeedWidgetDemoProps {
  additionalClips?: FeedItem[]
  onClipSubmit?: (clip: FeedItem) => void
  onViewModeChange?: (mode: 'publisher' | 'player') => void
  isPrimary?: boolean // When true, this is THE main demo (larger, more prominent)
}

export default function FeedWidgetDemo({ additionalClips = [], onClipSubmit, onViewModeChange, isPrimary = false }: FeedWidgetDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<'publisher' | 'player'>('publisher')
  
  // Notify parent of view mode changes
  const handleViewModeChange = (mode: 'publisher' | 'player') => {
    setViewMode(mode)
    onViewModeChange?.(mode)
  }
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const prevClipCountRef = useRef(0)
  const prevViewModeRef = useRef(viewMode)

  // Get feed data based on view mode
  const baseFeedData = viewMode === 'publisher' ? PUBLISHER_FEED_DATA : PLAYER_FEED_DATA
  const allFeedData = viewMode === 'publisher' ? [...additionalClips, ...baseFeedData] : baseFeedData

  useEffect(() => {
    // Set feed data before loading script
    (window as any).CROSSLAYER_FEED_DATA = allFeedData

    // Only load script once
    if (!scriptRef.current) {
      const script = document.createElement('script')
      script.src = '/feed/embed.js'
      script.async = true
      script.onload = () => {
        setIsLoaded(true)
      }
      document.body.appendChild(script)
      scriptRef.current = script
    } else if (isLoaded && (window as any).CrossLayerFeed) {
      // Refresh if new clips were added OR view mode changed
      const hasNewClips = additionalClips.length > prevClipCountRef.current
      const viewModeChanged = viewMode !== prevViewModeRef.current
      if (hasNewClips || viewModeChanged) {
        (window as any).CrossLayerFeed.refresh(true) // scroll to top for new content
        prevClipCountRef.current = additionalClips.length
        prevViewModeRef.current = viewMode
      }
    }

    return () => {
      // Cleanup only on unmount
    }
  }, [additionalClips.length, isLoaded, viewMode, allFeedData]) // Include viewMode

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current)
        scriptRef.current = null
      }
      delete (window as any).CROSSLAYER_FEED_DATA
      const style = document.getElementById('clf-css')
      if (style) style.remove()
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMBED_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className={`widget-demo-section ${isPrimary ? 'widget-demo-primary' : ''}`} id="embed-widget">
      {!isPrimary && (
        <div className="widget-demo-header">
          <h2>Embed Highlights on Your Site</h2>
          <p>Add a TikTok-style video feed to your game portal in minutes. Zero dependencies, works anywhere.</p>
        </div>
      )}

      {/* View Mode Toggle - Only for primary demo */}
      {isPrimary && (
        <div className="view-mode-toggle">
          <button 
            className={`view-mode-btn ${viewMode === 'publisher' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('publisher')}
          >
            <Building2 size={18} />
            <span>Publisher View</span>
          </button>
          <button 
            className={`view-mode-btn ${viewMode === 'player' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('player')}
          >
            <User size={18} />
            <span>Player View</span>
          </button>
        </div>
      )}

      {/* ========== PUBLISHER VIEW ========== */}
      {viewMode === 'publisher' && isPrimary && (
        <div className="publisher-layout">
          {/* TOP ROW: Feed + Metrics */}
          <div className="publisher-top-row">
            {/* Left: Live Video Feed */}
            <div className="publisher-feed-panel">
              <h4>Community Feed</h4>
              <div className="widget-device-frame publisher-device">
                <div className="widget-device-glow"></div>
                <div className="widget-device-bezel">
                  <div className="widget-device-screen">
                    <div className="widget-device-notch">
                      <div className="widget-device-camera"></div>
                      <div className="widget-device-speaker"></div>
                    </div>
                    <div 
                      id="crosslayer-feed" 
                      ref={containerRef}
                      style={{ height: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CrossLayer Metrics */}
            <div className="publisher-insights">
              <h4>CrossLayer Metrics</h4>
              <div className="insights-grid">
                <div className="insight-card highlight">
                  <span className="insight-value">847</span>
                  <span className="insight-label">Clips Posted</span>
                  <span className="insight-trend up">↑ 34 today</span>
                </div>
                <div className="insight-card">
                  <span className="insight-value">8.2M</span>
                  <span className="insight-label">Clips Watched</span>
                  <span className="insight-trend up">↑ 1.2M this week</span>
                </div>
                <div className="insight-card">
                  <span className="insight-value">1.4K</span>
                  <span className="insight-label">Personalized DMs Sent</span>
                  <span className="insight-trend up">↑ 89 today</span>
                </div>
                <div className="insight-card">
                  <span className="insight-value">24%</span>
                  <span className="insight-label">DM Open Rate</span>
                  <span className="insight-trend up">↑ 3% vs avg</span>
                </div>
              </div>

              {/* Personalized Outreach - embedded in dashboard */}
              <div className="dashboard-outreach-section">
                <h4>Target Audience</h4>
                <div className="outreach-targets">
                  <button className="target-btn active">New comers</button>
                  <button className="target-btn">All</button>
                  <button className="target-btn">Returning</button>
                  <button className="target-btn">Quiet</button>
                  <button className="target-btn">Top Fans</button>
                  <button className="target-btn">+</button>
                </div>
                <TryItDemo onClipSubmit={onClipSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== PLAYER VIEW ========== */}
      {viewMode === 'player' && isPrimary && (
        <div className="player-layout">
          {/* Left: Personalized Video Feed */}
          <div className="player-feed-section">
            <h4>Personalized Feed</h4>
            <div className="widget-device-frame player-device">
              <div className="widget-device-glow"></div>
              <div className="widget-device-bezel">
                <div className="widget-device-screen">
                  <div className="widget-device-notch">
                    <div className="widget-device-camera"></div>
                    <div className="widget-device-speaker"></div>
                  </div>
                  <div 
                    id="crosslayer-feed" 
                    ref={containerRef}
                    style={{ height: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Discord Channel Mockup */}
          <div className="player-discord-section">
            <h4>Community Celebration</h4>
            <div className="discord-mockup">
              <div className="discord-header">
                <span className="channel-icon">#</span>
                <span>highlights</span>
              </div>
              
              <div className="discord-messages">
                <div className="discord-dm">
                  <div className="dm-avatar">🎬</div>
                  <div className="dm-content">
                    <div className="dm-header">
                      <span className="dm-name">Blin</span>
                      <span className="dm-badge">BOT</span>
                      <span className="dm-time">Today at 4:32 PM</span>
                    </div>
                    <div className="dm-body">
                      <p>🔥 <strong>INSANE ACE</strong> from <em>@Ninja_42</em>!</p>
                      <p>1v5 clutch on Ascent. Clean headshots only. 🎯</p>
                      <p>Show some love! 👏</p>
                    </div>
                    <div className="dm-embed">
                      <div className="embed-bar"></div>
                      <div className="embed-content">
                        <span className="embed-title">1v5 Clutch Ace</span>
                        <span className="embed-desc">Valorant • 2.4M views</span>
                        <div className="embed-thumbnail">
                          <video src="/videos/ace-clip.mp4" muted></video>
                        </div>
                      </div>
                    </div>
                    <div className="discord-reactions">
                      <span className="reaction">🔥 47</span>
                      <span className="reaction">👏 32</span>
                      <span className="reaction">😮 18</span>
                      <span className="reaction">🎯 12</span>
                    </div>
                  </div>
                </div>

                <div className="discord-dm">
                  <div className="dm-avatar">👵</div>
                  <div className="dm-content">
                    <div className="dm-header">
                      <span className="dm-name">Babushka</span>
                      <span className="dm-badge">BOT</span>
                      <span className="dm-time">Yesterday at 11:15 AM</span>
                    </div>
                    <div className="dm-body">
                      <p>👑 <strong>PLATINUM UNLOCKED!</strong></p>
                      <p><em>@SoulsBorne_Dan</em> finally did it after 147 hours!</p>
                      <p>34 deaths to Margit. Never gave up. Legend. 🏆</p>
                    </div>
                    <div className="dm-embed">
                      <div className="embed-bar"></div>
                      <div className="embed-content">
                        <span className="embed-title">Platinum Trophy 🏆</span>
                        <span className="embed-desc">Elden Ring • 147 hours</span>
                        <div className="embed-thumbnail">
                          <img src="/tiktok_post.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="discord-reactions">
                      <span className="reaction">👑 89</span>
                      <span className="reaction">🏆 56</span>
                      <span className="reaction">💪 41</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Non-primary fallback */}
      {!isPrimary && (
        <div className="widget-top-row">
          <div className="widget-device-frame">
            <div className="widget-device-glow"></div>
            <div className="widget-device-bezel">
              <div className="widget-device-screen">
                <div className="widget-device-notch">
                  <div className="widget-device-camera"></div>
                  <div className="widget-device-speaker"></div>
                </div>
                <div 
                  id="crosslayer-feed" 
                  ref={containerRef}
                  style={{ height: '100%' }}
                ></div>
              </div>
            </div>
          </div>
          <div className="widget-try-panel">
            <h3>Try It Live!</h3>
            <p>Paste a video URL and watch it appear in the feed AND Discord instantly.</p>
            <TryItDemo onClipSubmit={onClipSubmit} />
          </div>
        </div>
      )}

      {/* Bottom Row: Code + Features - Only for publisher view */}
      {/* {viewMode === 'publisher' && (
        <div className="widget-bottom-row">
          <div className="widget-code-panel">
            <div className="widget-code-header">
              <Code size={18} />
              <span>Add to Your Site</span>
              <button className="widget-copy-btn" onClick={handleCopy}>
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
            <pre className="widget-code-block">
              <code>{EMBED_CODE}</code>
            </pre>
          </div>
          <div className="widget-features">
            <div className="widget-feature">
              <span className="widget-feature-icon">⚡</span>
              <div>
                <strong>4KB gzipped</strong>
                <span>Lightweight, no dependencies</span>
              </div>
            </div>
            <div className="widget-feature">
              <span className="widget-feature-icon">🎮</span>
              <div>
                <strong>Gaming-optimized</strong>
                <span>Video, audio, images supported</span>
              </div>
            </div>
            <div className="widget-feature">
              <span className="widget-feature-icon">🎨</span>
              <div>
                <strong>Customizable</strong>
                <span>Matches your brand colors</span>
              </div>
            </div>
            <div className="widget-feature">
              <span className="widget-feature-icon">📱</span>
              <div>
                <strong>Mobile-first</strong>
                <span>Touch gestures, scroll-snap</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </section>
  )
}
