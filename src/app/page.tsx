'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Flame,
  Trophy,
  Sparkles,
  Users,
  TrendingUp,
  Plus,
  Search,
  Bell,
  Home as HomeIcon,
  Compass,
  Film,
  User,
  Bookmark,
  Music,
  Gamepad2,
  Check,
  X,
  Camera,
  Brain,
  ArrowRight,
  RotateCcw,
  Hash,
  ChevronDown,
  Mic,
  Headphones,
  Gift,
  Smile,
  PlusCircle,
  Info,
  Plug,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Send,
  Zap,
  Database,
  Globe,
  Code,
} from 'lucide-react'
import Header from './components/Header'
import { GA_EVENTS } from './lib/analytics'

// Demo content - the actual CrossLayerAI showcase
interface DemoShort {
  id: number
  type: 'discord' | 'dm'
  channel: string
  game: string
  botName: string
  botEmoji: string
  message: string
  media: 'video' | 'image' | 'voice'
  mediaSrc: string
  username: string
  avatar: string
  title: string
  views: string
  likes: string
  comments: string
  shares: string
  thumbnail: string
  duration: string
  isVerified: boolean
  contextMessages?: { username: string; avatar: string; message: string }[]
  communityReply?: { username: string; avatar: string; message: string }
  impactStats: { label: string; traditional: string; personalized: string; source?: string }[]
  reactions?: { emoji: string; count: number }[]
}

const demoShorts: DemoShort[] = [
  {
    id: 1,
    type: 'discord',
    channel: 'clips',
    game: 'Valorant',
    botName: 'Blin',
    botEmoji: '🎬',
    message: `clean ace from @Ninja_42 🎯 they said there were washed yesterday`,
    media: 'video',
    mediaSrc: '/videos/ace-clip.mp4',
    username: 'Ninja_42',
    avatar: '🎯',
    title: 'INSANE 1v5 CLUTCH 🔥',
    views: '2.4M',
    likes: '324K',
    comments: '12.4K',
    shares: '45K',
    thumbnail: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
    duration: '0:32',
    isVerified: true,
    contextMessages: [
      { username: 'aim_demon', avatar: '🎯', message: 'anyone got clips from last night?' },
      { username: 'headshot_hero', avatar: '💀', message: 'check this one out ⬇️' },
    ],
    communityReply: {
      username: 'shadow_striker',
      avatar: '🔥',
      message: 'bro went INSANE 😭'
    },
    impactStats: [
      { label: 'Daily reach', traditional: '5-15%', personalized: '80%+', source: 'Discord data: 80% of engaged players are on Discord daily' },
      { label: 'Engagement lift', traditional: 'Baseline', personalized: '+48%', source: 'Players with Discord Social SDK play 48% longer' },
    ],
    reactions: [
      { emoji: '🔥', count: 47 },
      { emoji: '😤', count: 23 },
      { emoji: '🎯', count: 18 },
    ]
  },
  {
    id: 2,
    type: 'dm',
    channel: 'Boris',
    game: 'Apex Legends',
    botName: 'Boris',
    botEmoji: '🎙️',
    message: `Hey, it's been like 2 weeks since you played...

I still remember that 2800 damage game. You were ONE shot away from that 3k badge.

Just saying. 👀`,
    media: 'voice',
    mediaSrc: '/voice.m4a',
    username: 'LapsedPlayer',
    avatar: '😴',
    title: 'Player Re-engagement',
    views: '156K',
    likes: '89K',
    comments: '5.2K',
    shares: '12K',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    duration: '0:12',
    isVerified: true,
    impactStats: [
      { label: 'Open rate', traditional: '5-15%', personalized: '80%+', source: 'Push: 5-15% vs Discord: 80%+ daily presence' },
      { label: 'Return rate', traditional: '2%', personalized: '+36%', source: 'Account-linked players see 36% more game days' },
    ]
  },
  {
    id: 3,
    type: 'discord',
    channel: 'achievements',
    game: 'Elden Ring',
    botName: 'Babushka',
    botEmoji: '👵',
    message: `147 hours. 34 deaths to Margit. Almost quit twice.

@SoulsBorne_Dan finally got the Platinum 👑

the server witnessed the whole journey`,
    media: 'image',
    mediaSrc: '/tiktok_post.png',
    username: 'SoulsBorne_Dan',
    avatar: '⚔️',
    title: 'PLATINUM ACHIEVED 👑',
    views: '892K',
    likes: '145K',
    comments: '8.2K',
    shares: '32K',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    duration: '0:45',
    isVerified: true,
    contextMessages: [
      { username: 'maidenless_420', avatar: '💀', message: 'anyone else stuck on malenia?' },
      { username: 'parry_king', avatar: '🛡️', message: 'took me 200 tries no shame' },
    ],
    communityReply: {
      username: 'git_gud_or_die',
      avatar: '⚔️',
      message: 'the dedication 🙏 respect'
    },
    impactStats: [
      { label: 'Conversion lift', traditional: 'Baseline', personalized: '+12-25%', source: 'Firebase case studies: personalized content drives 12-25% more conversions' },
      { label: 'Member lifetime', traditional: '1x', personalized: '5x', source: 'Well-managed Discord communities see 5x longer member lifetime' },
    ],
    reactions: [
      { emoji: '👑', count: 89 },
      { emoji: '🙏', count: 52 },
      { emoji: '💀', count: 34 },
    ]
  },
  {
    id: 4,
    type: 'discord',
    channel: 'deaths',
    game: 'Oxygenkills',
    botName: 'Gopnik',
    botEmoji: '🚀',
    message: `RIP @zero_gravity 💀
the void took us all

and there is no sound in vacuum`,
    media: 'video',
    mediaSrc: '/videos/oxygenkills.mp4',
    username: 'SpaceRunner_7',
    avatar: '🧑‍🚀',
    title: 'SO CLOSE YET SO FAR 💀',
    views: '1.8M',
    likes: '245K',
    comments: '18.2K',
    shares: '52K',
    thumbnail: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #00d4ff 100%)',
    duration: '0:28',
    isVerified: true,
    contextMessages: [
      { username: 'asteroid_miner', avatar: '⛏️', message: 'how long did you survive this run?' },
      { username: 'zero_gravity', avatar: '🌌', message: 'bro watch this death 💀⬇️' },
    ],
    impactStats: [
      { label: 'Clip shares', traditional: '< 1%', personalized: '12%+', source: 'Personalized clip sharing increases virality 12x' },
      { label: 'Session time', traditional: 'Baseline', personalized: '+31%', source: 'Players with shared clips play 31% longer sessions' },
    ],
    reactions: [
      { emoji: '💀', count: 156 },
      { emoji: '😭', count: 89 },
      { emoji: '🚀', count: 41 },
    ]
  },
  {
    id: 5,
    type: 'discord',
    channel: 'cursed-clips',
    game: 'Woodcringe',
    botName: 'Chicka',
    botEmoji: '🐔',
    message: `@ChickenRunner_69 survived 47 seconds as a chick 🐤

why is this game so cursed 😭`,
    media: 'video',
    mediaSrc: '/videos/woodcringe.mp4',
    username: 'ChickenRunner_69',
    avatar: '🐤',
    title: 'PEAK GAMING RIGHT HERE 💀',
    views: '3.1M',
    likes: '412K',
    comments: '24.6K',
    shares: '89K',
    thumbnail: 'linear-gradient(135deg, #8B4513 0%, #228B22 50%, #90EE90 100%)',
    duration: '0:19',
    isVerified: true,
    contextMessages: [
      { username: 'roblox_refugee', avatar: '🧱', message: 'what even is this game lmao' },
      { username: 'indie_enjoyer', avatar: '🎮', message: 'trust me just watch ⬇️' },
    ],
    communityReply: {
      username: 'cursed_curator',
      avatar: '💀',
      message: 'this is the content i signed up for 😭'
    },
    impactStats: [
      { label: 'Community retention', traditional: '30 days', personalized: '90+ days', source: 'Highlight-sharing communities retain 3x longer' },
      { label: 'Daily active %', traditional: '15%', personalized: '45%+', source: 'Content-rich Discord servers see 3x daily engagement' },
    ],
    reactions: [
      { emoji: '🐔', count: 167 },
    ]
  },
]

// Player stories data
const playerStories = [
  { id: 1, username: 'Ninja_42', avatar: '🎯', hasNew: true, isLive: true, game: 'Valorant' },
  { id: 2, username: 'Boris', avatar: '🎙️', hasNew: true, isLive: false, game: 'AI Bot' },
  { id: 3, username: 'SoulsBorne_Dan', avatar: '⚔️', hasNew: true, isLive: false, game: 'Elden Ring' },
  { id: 4, username: 'Babushka', avatar: '👵', hasNew: true, isLive: false, game: 'AI Bot' },
  { id: 5, username: 'shadow_striker', avatar: '🔥', hasNew: false, isLive: false, game: 'Valorant' },
  { id: 6, username: 'parry_king', avatar: '🛡️', hasNew: true, isLive: false, game: 'Elden Ring' },
]

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
  const [activeShort, setActiveShort] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showReactions, setShowReactions] = useState(false)
  const [showCommunityReply, setShowCommunityReply] = useState(false)
  const [showImpactStats, setShowImpactStats] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeExample, setActiveExample] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [integrationPath, setIntegrationPath] = useState<'nocode' | 'developer'>('nocode')
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentShort = demoShorts[activeShort]

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

  // Highlight @mentions in text
  const highlightMentions = (text: string) => {
    const parts = text.split(/(@[\w_]+)/g)
    return parts.map((part, idx) => 
      part.startsWith('@') 
        ? <span key={idx} className="discord-mention">{part}</span>
        : part
    )
  }

  // Play message when short changes
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    setShowReactions(false)
    setShowCommunityReply(false)
    setShowImpactStats(false)
    setVideoEnded(false)
    setIsVoicePlaying(false)
    setIsPlaying(false)
    
    // Reset video/audio
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.pause()
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
    
    // Type out the message
    let i = 0
    const text = demoShorts[activeShort].message
    const speed = 20
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        setTimeout(() => setShowReactions(true), 400)
        setTimeout(() => setShowCommunityReply(true), 800)
        setTimeout(() => setShowImpactStats(true), 1200)
      }
    }, speed)
    
    // Cleanup: clear interval when activeShort changes or component unmounts
    return () => clearInterval(interval)
  }, [activeShort])

  // Auto-advance to next demo
  const advanceToNext = () => {
    const nextIndex = (activeShort + 1) % demoShorts.length
    setActiveShort(nextIndex)
    GA_EVENTS.DEMO_SCENARIO_SELECT(nextIndex, demoShorts[nextIndex].type, demoShorts[nextIndex].game)
  }

  // Handle audio events - play immediately when voice demo is active
  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentShort.media === 'voice') {
      const handleEnded = () => {
        setIsVoicePlaying(false)
        // Auto-advance after a short delay when audio ends
        setTimeout(advanceToNext, 1000)
      }
      audio.addEventListener('ended', handleEnded)
      // Auto-play voice immediately
      audio.currentTime = 0
      audio.play().then(() => {
        setIsVoicePlaying(true)
      }).catch(() => {})
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [activeShort, currentShort.media])

  // Auto-advance for image demos after impact stats are shown
  useEffect(() => {
    if (currentShort.media === 'image' && showImpactStats) {
      const timer = setTimeout(advanceToNext, 3000) // 3 seconds to view image + stats
      return () => clearTimeout(timer)
    }
  }, [showImpactStats, currentShort.media, activeShort])

  const handleLike = (id: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectShort = (index: number) => {
    // If same demo is selected, replay media directly
    if (index === activeShort) {
      // Replay audio immediately - use setTimeout to ensure ref is available
      if (demoShorts[index].media === 'voice') {
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().then(() => {
              setIsVoicePlaying(true)
            }).catch((e) => console.log('Audio play failed:', e))
          }
        }, 0)
      }
      // Replay video immediately
      if (demoShorts[index].media === 'video') {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().then(() => {
              setIsPlaying(true)
            }).catch((e) => console.log('Video play failed:', e))
          }
        }, 0)
      }
      return
    }
    setActiveShort(index)
    GA_EVENTS.DEMO_SCENARIO_SELECT(index, demoShorts[index].type, demoShorts[index].game)
  }

  const nextShort = () => {
    if (isTyping) return
    const nextIndex = (activeShort + 1) % demoShorts.length
    setActiveShort(nextIndex)
  }

  // Scroll tracking
  useEffect(() => {
    GA_EVENTS.PAGE_VIEW('Home')
    GA_EVENTS.DEMO_STARTED()
  }, [])

  return (
    <main className="community-app">
      <Header />

      <div className="community-container">
        
        {/* Left Sidebar */}
        <aside className="community-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-nav-item active">
              <HomeIcon size={24} />
              <span>Home</span>
            </a>
            <a href="#demo" className="sidebar-nav-item highlight">
              <Film size={24} />
              <span>Shorts</span>
              <span className="nav-badge">Live</span>
            </a>
            <a href="#live-activity" className="sidebar-nav-item">
              <TrendingUp size={24} />
              <span>Insights</span>
            </a>
            <a
              href="#integration"
              className="sidebar-nav-item"
              onClick={() => GA_EVENTS.SECTION_VIEW('Integration Code')}
            >
              <Plug size={24} />
              <span>Integrations</span>
            </a>
          </nav>
          
        </aside>

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

          {/* Hero - Live Demo Shorts */}
          <section className="hero-shorts" id="demo">
            <div className="hero-shorts-header">
              <h1>Turn player moments into <span className="gradient-text">personalized outreach</span></h1>
              <p>
                On Discord, TikTok, your website, or wherever your community lives.
              </p>
            </div>

            {/* Scenario Selector */}
            <div className="scenario-selector">
              <div className="scenario-buttons">
                <button
                  className={`scenario-btn ${activeShort === 0 ? 'active' : ''}`}
                  onClick={() => selectShort(0)}
                >
                  💥 Clutch Clip
                </button>
                <button
                  className={`scenario-btn ${activeShort === 1 ? 'active' : ''}`}
                  onClick={() => selectShort(1)}
                >
                  👻 Win Back
                </button>
                <button
                  className={`scenario-btn ${activeShort === 2 ? 'active' : ''}`}
                  onClick={() => selectShort(2)}
                >
                  👑 Platinum
                </button>
                <button
                  className={`scenario-btn ${activeShort === 3 ? 'active' : ''}`}
                  onClick={() => selectShort(3)}
                >
                  🌌 Oxygenkills
                </button>
                <button
                  className={`scenario-btn ${activeShort === 4 ? 'active' : ''}`}
                  onClick={() => selectShort(4)}
                >
                  🌲 Woodcringe
                </button>
              </div>
            </div>

            <div className="demo-feed-layout">
              {/* Shorts Player */}
              <div className="short-player-main">
                <div 
                  className="short-video"
                  style={{ background: currentShort.thumbnail }}
                >
                  {/* Video Media */}
                  {currentShort.media === 'video' && (
                    <>
                      <video
                        ref={videoRef}
                        src={currentShort.mediaSrc}
                        muted={isMuted}
                        playsInline
                        className="short-video-player"
                        onEnded={() => {
                          setVideoEnded(true)
                          setIsPlaying(false)
                          // Auto-advance after video ends
                          setTimeout(advanceToNext, 800)
                        }}
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) {
                              videoRef.current.pause()
                              setIsPlaying(false)
                            } else {
                              videoRef.current.play()
                              setIsPlaying(true)
                            }
                          }
                        }}
                      />
                      {!isPlaying && (
                        <div 
                          className="video-play-overlay"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.play()
                              setIsPlaying(true)
                              GA_EVENTS.DEMO_VIDEO_PLAY()
                            }
                          }}
                        >
                          <div className="play-button-large">
                            <Play size={48} fill="white" />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Image Media */}
                  {currentShort.media === 'image' && (
                    <img 
                      src={currentShort.mediaSrc} 
                      alt={currentShort.title}
                      className="short-image-player"
                    />
                  )}

                  {/* Voice Message Visual */}
                  {currentShort.media === 'voice' && (
                    <div className="short-voice-visual">
                      <div className="voice-avatar">{currentShort.botEmoji}</div>
                      <div className="voice-wave-container">
                        {[...Array(32)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`voice-bar ${isVoicePlaying ? 'playing' : ''}`}
                            style={{ 
                              height: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        ))}
                      </div>
                      <audio 
                        ref={audioRef} 
                        src={currentShort.mediaSrc} 
                        preload="auto"
                      />
                    </div>
                  )}

                  {/* Overlay Info */}
                  <div className="short-video-overlay">
                    <div className="game-badge">
                      <Gamepad2 size={14} />
                      {currentShort.game}
                    </div>
                    
                    {currentShort.media === 'video' && (
                      <div className="ai-badge">
                        RVR Capture
                      </div>
                    )}
                    
                    <div className="short-duration">{currentShort.duration}</div>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="short-info">
                    <div className="short-user">
                      <div className="short-avatar">{currentShort.botEmoji}</div>
                      <div className="short-user-info">
                        <span className="short-username">
                          @{currentShort.botName}
                          <Check size={14} className="verified" />
                          <span className="bot-tag">BOT</span>
                        </span>
                        <span className="short-title">{currentShort.title}</span>
                      </div>
                    </div>
                    
                    <div className="short-music">
                      <Music size={14} />
                      <span className="music-scroll">CrossLayerAI · {currentShort.game}</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side Actions */}
                <div className="short-actions">
                  <button 
                    className={`action-btn ${likedPosts.has(currentShort.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(currentShort.id)}
                  >
                    <Heart size={28} fill={likedPosts.has(currentShort.id) ? '#ff2d55' : 'none'} />
                    <span>{currentShort.likes}</span>
                  </button>
                  <button className="action-btn">
                    <MessageCircle size={28} />
                    <span>{currentShort.comments}</span>
                  </button>
                  <button className="action-btn">
                    <Bookmark size={28} />
                    <span>Save</span>
                  </button>
                  <button className="action-btn">
                    <Share2 size={28} />
                    <span>{currentShort.shares}</span>
                  </button>
                  <button 
                    className="action-btn mute-btn"
                    onClick={() => {
                      setIsMuted(!isMuted)
                      if (isMuted) GA_EVENTS.DEMO_VIDEO_UNMUTE()
                    }}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
              </div>

              {/* Discord Preview - Shows what AI posted */}
              <div className="discord-preview">
                <div className="discord-preview-header">
                  <Hash size={18} />
                  <span>#{currentShort.channel}</span>
                  <span className="discord-server-name">{currentShort.type === 'dm' ? 'Direct Message' : currentShort.game + ' Community'}</span>
                </div>

                <div className="discord-preview-messages">
                  {/* Context Messages */}
                  {currentShort.contextMessages?.map((msg, i) => (
                    <div key={i} className="discord-preview-msg context">
                      <span className="msg-avatar">{msg.avatar}</span>
                      <div className="msg-content">
                        <span className="msg-author">{msg.username}</span>{' '}
                        <span className="msg-text">{msg.message}</span>
                      </div>
                    </div>
                  ))}

                  {/* Bot Message */}
                  <div className="discord-preview-msg bot">
                    <span className="msg-avatar bot-avatar">{currentShort.botEmoji}</span>
                    <div className="msg-content">
                      <div className="msg-header">
                        <span className="msg-author bot-name">{currentShort.botName}</span>
                        <span className="bot-badge">BOT</span>
                      </div>
                      <div className="msg-text">
                        {highlightMentions(displayedText)}
                        {isTyping && <span className="typing-cursor">|</span>}
                      </div>
                      
                      {/* Reactions - only for channel posts, not DMs */}
                      {showReactions && currentShort.type === 'discord' && currentShort.reactions && (
                        <div className="msg-reactions">
                          {currentShort.reactions.map((r, i) => (
                            <span key={i} className="reaction">{r.emoji} {r.count}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Community Reply */}
                  {showCommunityReply && currentShort.communityReply && (
                    <div className="discord-preview-msg reply">
                      <span className="msg-avatar">{currentShort.communityReply.avatar}</span>
                      <div className="msg-content">
                        <span className="msg-author">{currentShort.communityReply.username}</span>{' '}
                        <span className="msg-text">{currentShort.communityReply.message}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Impact Stats */}
                {showImpactStats && (
                  <div className="impact-stats-inline">
                    <div className="stats-header">
                      <TrendingUp size={14} />
                      <span>Why this works</span>
                    </div>
                    {currentShort.impactStats.map((stat, idx) => (
                      <div 
                        key={idx} 
                        className="stat-item"
                        onMouseEnter={() => setHoveredStat(idx)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <span className="stat-label">{stat.label}</span>
                        <div className="stat-comparison">
                          <span className="stat-old">{stat.traditional}</span>
                          <span className="stat-arrow">→</span>
                          <span className="stat-new">{stat.personalized}</span>
                        </div>
                        {hoveredStat === idx && stat.source && (
                          <div className="stat-tooltip">{stat.source}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="shorts-cta">
              <a 
                href="mailto:business@crosslayerai.com"
                className="btn-shorts"
                onClick={() => GA_EVENTS.DEMO_CTA_CLICK()}
              >
                Get CrossLayerAI
                <ArrowRight size={18} />
              </a>
              <span className="cta-hint">Increase your community's engagement and retention</span>
            </div>
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

          {/* Insights Dashboard */}
          <section className="dashboard-section" id="live-activity">
            <h2>Insights Dashboard</h2>
            <p className="dashboard-subtitle">Real-time metrics from your community</p>
            
            <div className="dashboard-container">
              {/* Left: Metrics */}
              <div className="dashboard-metrics">
                <div className="metrics-row-top">
                  <div className="metric-card">
                    <div className="metric-title">Clips Watched</div>
                    <div className="metric-value">24.8K</div>
                    <div className="metric-trend up">↑ 1.2K today</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-title">Clips Posted</div>
                    <div className="metric-value">847</div>
                    <div className="metric-trend up">↑ 23 today</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-title">Community Reach</div>
                    <div className="metric-value">18.4K</div>
                    <div className="metric-trend">Players this week</div>
                  </div>
                </div>

                <div className="metrics-row">
                  <div className="metric-card">
                    <div className="metric-title">Shares & Reactions</div>
                    <div className="metric-value">3,847</div>
                    <div className="metric-trend up">↑ 12% this week</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-title">Win-Back DMs Sent</div>
                    <div className="metric-value">312</div>
                    <div className="metric-trend">This week</div>
                  </div>
                </div>

                <div className="metric-card wide">
                  <div className="metric-header">
                    <span className="metric-title">Content Engagement This Week</span>
                  </div>
                  <div className="engagement-bars">
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '45%' }}></div></div>
                      <span>Mon</span>
                    </div>
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '62%' }}></div></div>
                      <span>Tue</span>
                    </div>
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '78%' }}></div></div>
                      <span>Wed</span>
                    </div>
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '55%' }}></div></div>
                      <span>Thu</span>
                    </div>
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '91%' }}></div></div>
                      <span>Fri</span>
                    </div>
                    <div className="engagement-day">
                      <div className="bar-container"><div className="bar" style={{ height: '84%' }}></div></div>
                      <span>Sat</span>
                    </div>
                    <div className="engagement-day today">
                      <div className="bar-container"><div className="bar" style={{ height: '68%' }}></div></div>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Activity */}
              <div className="dashboard-activity">
                <div className="activity-header">
                  <h3><Flame size={18} /> Live Activity</h3>
                  <span className="live-dot" />
                </div>
                
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-avatar">🎬</span>
                    <div className="activity-content">
                      <strong>Blin</strong> shared <span className="highlight">Ninja_42's ace</span> to #clips
                    </div>
                    <span className="activity-time">2m</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar">🎙️</span>
                    <div className="activity-content">
                      <strong>Boris</strong> re-engaged <span className="highlight">23 lapsed players</span>
                    </div>
                    <span className="activity-time">5m</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar">⚔️</span>
                    <div className="activity-content">
                      <strong>SoulsBorne_Dan</strong>'s post hit <span className="highlight">100K views</span>
                    </div>
                    <span className="activity-time">12m</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar">👵</span>
                    <div className="activity-content">
                      <strong>Babushka</strong> sent <span className="highlight">147 messages</span>
                    </div>
                    <span className="activity-time">18m</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar">🎬</span>
                    <div className="activity-content">
                      <strong>Blin</strong> celebrated <span className="highlight">3 achievements</span>
                    </div>
                    <span className="activity-time">24m</span>
                  </div>
                </div>
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
                      <span className="simple-title">Player captures clip</span>
                      <span className="simple-sub">via RVR, Medal.tv, or manual upload</span>
                    </div>
                  </div>
                  <div className="simple-step">
                    <span className="simple-number">2</span>
                    <div className="simple-content">
                      <span className="simple-title">CrossLayerAI adds context</span>
                      <span className="simple-sub">Player memory + bot personality</span>
                    </div>
                  </div>
                  <div className="simple-step">
                    <span className="simple-number">3</span>
                    <div className="simple-content">
                      <span className="simple-title">Bot shares to your community</span>
                      <span className="simple-sub">Discord, Twitter, feeds & more</span>
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
                Get Started
                <ArrowRight size={18} />
              </a>
              <span className="integration-cta-hint">Questions? We're here to help</span>
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <aside className="community-sidebar-right">
          <div className="notification-panel">
            <div className="notification-header">
              <Bell size={16} />
              <span>Pings</span>
              <span className="notif-count">2</span>
            </div>
            <div className="notification-item new">
              <span className="notif-avatar">🔥</span>
              <div className="notif-content">
                <strong>Your clip is trending!</strong>
                <p>2.4K views in the last hour</p>
              </div>
              <span className="notif-time">Just now</span>
            </div>
            <div className="notification-item">
              <span className="notif-avatar">🎯</span>
              <div className="notif-content">
                <strong>Ninja_42</strong> shared your clip
              </div>
              <span className="notif-time">2h ago</span>
            </div>
          </div>

          <div className="suggested-panel">
            <h4>Bots Cooked This 🔥</h4>
            {[
              { name: 'Blin', emoji: '🎬', status: 'Sharing clips to Discord', demoIndex: 0 },
              { name: 'Boris', emoji: '🎙️', status: 'DM re-engagement', demoIndex: 1 },
              { name: 'Babushka', emoji: '👵', status: 'Posting achievements', demoIndex: 2 },
              { name: 'Gopnik', emoji: '🚀', status: 'Oxygenkills death clip', demoIndex: 3 },
              { name: 'Chicka', emoji: '🐔', status: 'Woodcringe cursed clip', demoIndex: 4 },
            ].map((bot, idx) => (
              <div 
                key={idx} 
                className={`suggested-player clickable ${activeShort === bot.demoIndex ? 'active' : ''}`}
                onClick={() => selectShort(bot.demoIndex)}
              >
                <div className="suggested-avatar">{bot.emoji}</div>
                <div className="suggested-info">
                  <span className="suggested-name">{bot.name}</span>
                  <span className="suggested-game">{bot.status}</span>
                </div>
                <span className="bot-status-dot" />
              </div>
            ))}
          </div>

        </aside>
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
