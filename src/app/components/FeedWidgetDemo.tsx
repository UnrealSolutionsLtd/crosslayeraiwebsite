'use client'

import { useEffect, useRef, useState } from 'react'
import { Copy, CheckCircle2, Code } from 'lucide-react'
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

// Static demo data - matches landing page demos
const STATIC_FEED_DATA: FeedItem[] = [
  {
    id: '1',
    playerName: 'Ninja_42',
    gameName: 'Valorant',
    message: 'clean ace from @Ninja_42 🎯 they said there were washed yesterday',
    title: 'INSANE 1v5 CLUTCH 🔥',
    avatar: '🎯',
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

const EMBED_CODE = `<!-- CrossLayerAI Feed Widget -->
<div id="crosslayer-feed" style="height: 600px;"></div>
<script src="https://cdn.crosslayerai.com/feed/embed.js"
        data-api="https://api.crosslayerai.com"
        data-game="your-game-id">
</script>`

interface FeedWidgetDemoProps {
  additionalClips?: FeedItem[]
  onClipSubmit?: (clip: FeedItem) => void
  isPrimary?: boolean // When true, this is THE main demo (larger, more prominent)
}

export default function FeedWidgetDemo({ additionalClips = [], onClipSubmit, isPrimary = false }: FeedWidgetDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const prevClipCountRef = useRef(0)

  // Combine additional clips with static data (new clips first)
  const allFeedData = [...additionalClips, ...STATIC_FEED_DATA]

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
      // Only refresh if new clips were added
      const hasNewClips = additionalClips.length > prevClipCountRef.current
      if (hasNewClips) {
        (window as any).CrossLayerFeed.refresh(true) // scroll to top for new content
        prevClipCountRef.current = additionalClips.length
      }
    }

    return () => {
      // Cleanup only on unmount
    }
  }, [additionalClips.length, isLoaded]) // Use length instead of array reference

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

      {/* Top Row: Feed + Try It */}
      <div className={`widget-top-row ${isPrimary ? 'widget-top-row-primary' : ''}`}>
        {/* Device Frame with Widget */}
        <div className={`widget-device-frame ${isPrimary ? 'widget-device-frame-primary' : ''}`}>
          <div className="widget-device-glow"></div>
          <div className="widget-device-bezel">
            <div className={`widget-device-screen ${isPrimary ? 'widget-device-screen-primary' : ''}`}>
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

        {/* Try It Panel - right of feed */}
        <div className={`widget-try-panel ${isPrimary ? 'widget-try-panel-primary' : ''}`}>
          <h3>{isPrimary ? 'Add Your Own Clip' : 'Try It Live!'}</h3>
          <p>{isPrimary 
            ? 'Paste any video URL below. Watch it instantly appear in the feed AND get posted to our Discord server.' 
            : 'Paste a video URL and watch it appear in the feed AND Discord instantly.'
          }</p>
          <TryItDemo onClipSubmit={onClipSubmit} />
          {isPrimary && (
            <div className="try-panel-hints">
              <span className="hint-item">✓ YouTube, TikTok, or direct links</span>
              <span className="hint-item">✓ Appears in feed instantly</span>
              <span className="hint-item">✓ Auto-posted to Discord</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Code + Features */}
      <div className="widget-bottom-row">
        {/* Code Panel */}
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

        {/* Features */}
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
    </section>
  )
}
