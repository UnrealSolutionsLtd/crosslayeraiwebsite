'use client'

import { useState, useEffect, useRef } from 'react'
import { Hash, ChevronDown, Plus, Mic, Headphones, Gift, Smile, PlusCircle, Volume2, VolumeX, Play } from 'lucide-react'
import { GA_EVENTS } from '../lib/analytics'

type DemoType = 'discord' | 'dm'
type MediaType = 'video' | 'image' | 'voice' | null

interface ChatMessage {
  username: string
  avatar: string
  message: string
}

interface Demo {
  type: DemoType
  channel: string
  game: string
  botName: string
  botEmoji: string
  getMessage: () => string
  media: MediaType
  mediaSrc?: string
  contextMessages?: ChatMessage[]
  communityReply?: ChatMessage
}

const DEMOS: Demo[] = [
  {
    type: 'discord',
    channel: 'clips',
    game: 'Valorant Community',
    botName: 'Blin',
    botEmoji: '🎬',
    getMessage: () => `clean ace from @Ninja_42 🎯 chat said he was washed btw`,
    media: 'video',
    mediaSrc: '/ace-clip.mp4',
    contextMessages: [
      { username: 'aim_demon', avatar: '🎯', message: 'anyone got clips from last night?' },
      { username: 'headshot_hero', avatar: '💀', message: 'check this one out ⬇️' },
    ],
    communityReply: {
      username: 'shadow_striker',
      avatar: '🔥',
      message: 'bro went INSANE 😭'
    }
  },
  {
    type: 'discord',
    channel: 'victory-royale',
    game: 'Fortnite Legends',
    botName: 'Gopnik',
    botEmoji: '🥞',
    getMessage: () => `yo @xKira_TTV just dropped 12 KILLS in solos 💀

bro your PR was 8 like a month ago

certified growth arc 📈`,
    media: null,
    contextMessages: [
      { username: 'bush_camper', avatar: '🌳', message: 'solo queue is brutal rn' },
      { username: 'buildmaster_x', avatar: '🏗️', message: 'just got 6 kills i thought that was good...' },
    ],
    communityReply: {
      username: 'dropmaster_99',
      avatar: '🎮',
      message: 'what loadout tho?? 👀'
    }
  },
  {
    type: 'dm',
    channel: 'Boris',
    game: '',
    botName: 'Boris',
    botEmoji: '🎙️',
    getMessage: () => `Hey, it's been like 2 weeks since you played...

I still remember that 2800 damage game. You were ONE shot away from that 3k badge.

Just saying. 👀`,
    media: 'voice',
    mediaSrc: '/voice.m4a',
    // No context messages or reply for DMs
  },
  {
    type: 'discord',
    channel: 'achievements',
    game: 'Elden Ring',
    botName: 'Babushka',
    botEmoji: '👵',
    getMessage: () => `147 hours. 34 deaths to Margit. Almost quit twice.

@SoulsBorne_Dan finally got the Platinum 👑

the server witnessed the whole journey`,
    media: 'image',
    mediaSrc: '/tiktok_post.png',
    contextMessages: [
      { username: 'maidenless_420', avatar: '💀', message: 'anyone else stuck on malenia?' },
      { username: 'parry_king', avatar: '🛡️', message: 'took me 200 tries no shame' },
    ],
    communityReply: {
      username: 'git_gud_or_die',
      avatar: '⚔️',
      message: 'the dedication 🙏 respect'
    }
  },
]

type Stage = 'choice' | 'demo'

export default function LiveDemo() {
  const [stage, setStage] = useState<Stage>('choice')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [showReactions, setShowReactions] = useState(false)
  const [showMedia, setShowMedia] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const demo = DEMOS[currentIndex]

  const highlightMentions = (text: string) => {
    const parts = text.split(/(@[\w_]+)/g)
    return parts.map((part, idx) => 
      part.startsWith('@') 
        ? <span key={idx} className="discord-mention">{part}</span>
        : part
    )
  }

  const handleShowMe = () => {
    GA_EVENTS.DEMO_SHOW_ME()
    GA_EVENTS.DEMO_STARTED()
    setStage('demo')
    setIsTyping(true)
    playMessage()
  }

  const playMessage = () => {
    setDisplayedText('')
    setIsTyping(true)
    setShowReactions(false)
    setShowMedia(false)
    setIsVoicePlaying(false)
    
    let i = 0
    const text = demo.getMessage()
    const speed = 20
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        // Show media first, then reactions
        setTimeout(() => {
          setShowMedia(true)
          if (demo.media === 'voice' && audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => {})
            setIsVoicePlaying(true)
          }
        }, 200)
        setTimeout(() => setShowReactions(true), 500)
      }
    }, speed)
    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (stage === 'demo') {
      playMessage()
    }
  }, [currentIndex])

  // Handle audio end
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsVoicePlaying(false)
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const nextDemo = () => {
    const nextIndex = (currentIndex + 1) % DEMOS.length
    GA_EVENTS.DEMO_FORMAT_CHANGE(DEMOS[nextIndex].type, DEMOS[nextIndex].game)
    setCurrentIndex(nextIndex)
  }

  const selectScenario = (index: number) => {
    if (isTyping) return
    GA_EVENTS.DEMO_SCENARIO_SELECT(index, DEMOS[index].type, DEMOS[index].game)
    setCurrentIndex(index)
  }

  const reset = () => {
    GA_EVENTS.DEMO_RESET()
    setStage('choice')
    setDisplayedText('')
    setCurrentIndex(0)
    setShowReactions(false)
    setShowMedia(false)
    setIsVoicePlaying(false)
    if (audioRef.current) audioRef.current.pause()
  }

  const handleDemoCTA = () => {
    GA_EVENTS.DEMO_CTA_CLICK()
    GA_EVENTS.WAITLIST_FORM_OPEN('demo')
  }

  const channels = demo.type === 'dm' 
    ? ['Boris', 'Gopnik', 'Babushka'] 
    : ['general', demo.channel, 'off-topic', 'clips']

  return (
    <section className="demo-section" id="demo">
      <div className="demo-wrapper">
        {stage === 'choice' && (
          <div className="demo-input-card">
            <div className="demo-choice-question">See how it looks in your community</div>
            <div className="demo-choice-buttons">
              <button className="demo-choice-btn demo-choice-yes" onClick={handleShowMe}>Show me</button>
            </div>
          </div>
        )}

        {stage === 'demo' && (
          <>
            {/* Discord-like Interface */}
            <div className="discord-mock">
              {/* Server Sidebar */}
              <div className="discord-servers">
                <div className="discord-server-icon active">
                  {demo.game ? demo.game.charAt(0) : 'D'}
                </div>
                <div className="discord-server-separator" />
                <div className="discord-server-icon">🎮</div>
                <div className="discord-server-icon">⚔️</div>
                <div className="discord-server-icon add">
                  <Plus size={18} />
                </div>
              </div>

              {/* Channel Sidebar */}
              <div className="discord-channels">
                <div className="discord-server-header">
                  <span>{demo.game || 'Direct Messages'}</span>
                  <ChevronDown size={16} />
                </div>
                
                <div className="discord-channel-list">
                  {demo.type === 'dm' ? (
                    <>
                      <div className="discord-channel-category">DIRECT MESSAGES</div>
                      {channels.map((ch, i) => (
                        <div key={ch} className={`discord-channel ${ch === demo.channel ? 'active' : ''}`}>
                          <span className="discord-dm-avatar">{ch === 'Boris' ? '🎙️' : ch === 'Gopnik' ? '🥞' : '👵'}</span>
                          <span>{ch}</span>
                          {ch === demo.channel && <span className="discord-unread">1</span>}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="discord-channel-category">TEXT CHANNELS</div>
                      {channels.map((ch) => (
                        <div key={ch} className={`discord-channel ${ch === demo.channel ? 'active' : ''}`}>
                          <Hash size={18} />
                          <span>{ch}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="discord-user-area">
                  <div className="discord-user-avatar">😎</div>
                  <div className="discord-user-info">
                    <span className="discord-user-name">You</span>
                    <span className="discord-user-status">Online</span>
                  </div>
                  <div className="discord-user-controls">
                    <Mic size={16} />
                    <Headphones size={16} />
                  </div>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="discord-chat">
                <div className="discord-chat-header">
                  {demo.type === 'dm' ? (
                    <>
                      <span className="discord-dm-header-avatar">{demo.botEmoji}</span>
                      <span>{demo.channel}</span>
                    </>
                  ) : (
                    <>
                      <Hash size={20} />
                      <span>{demo.channel}</span>
                    </>
                  )}
                </div>

                <div className="discord-messages">
                  {/* Previous messages for context - only for server channels */}
                  {demo.contextMessages && demo.contextMessages.map((msg, i) => (
                    <div key={i} className="discord-message old">
                      <div className="discord-msg-avatar">{msg.avatar}</div>
                      <div className="discord-msg-content">
                        <div className="discord-msg-header">
                          <span className="discord-msg-author">{msg.username}</span>
                          <span className="discord-msg-time">Today at 4:{28 + i * 2} PM</span>
                        </div>
                        <div className="discord-msg-text">{msg.message}</div>
                      </div>
                    </div>
                  ))}

                  {/* Main bot message */}
                  <div className="discord-message bot">
                    <div className="discord-msg-avatar bot-avatar">{demo.botEmoji}</div>
                    <div className="discord-msg-content">
                      <div className="discord-msg-header">
                        <span className="discord-msg-author bot-name">{demo.botName}</span>
                        <span className="discord-bot-badge">BOT</span>
                        <span className="discord-msg-time">Today at 4:32 PM</span>
                      </div>
                      <div className="discord-msg-text">
                        {highlightMentions(displayedText)}
                        {isTyping && <span className="discord-cursor">|</span>}
                      </div>
                      
                      {/* Embedded Media */}
                      {showMedia && demo.media === 'video' && (
                        <div className="discord-embed-video">
                          <video 
                            ref={videoRef}
                            src={demo.mediaSrc}
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                          />
                          <button 
                            className="discord-video-mute"
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>
                        </div>
                      )}
                      
                      {showMedia && demo.media === 'image' && (
                        <div className="discord-embed-image">
                          <img src={demo.mediaSrc} alt="Achievement" />
                        </div>
                      )}
                      
                      {showMedia && demo.media === 'voice' && (
                        <div className="discord-voice-msg">
                          <audio ref={audioRef} src={demo.mediaSrc} preload="auto" />
                          <button 
                            className="discord-voice-play"
                            onClick={() => {
                              if (audioRef.current) {
                                if (isVoicePlaying) {
                                  audioRef.current.pause()
                                  setIsVoicePlaying(false)
                                } else {
                                  audioRef.current.play()
                                  setIsVoicePlaying(true)
                                }
                              }
                            }}
                          >
                            {isVoicePlaying ? '⏸' : <Play size={14} />}
                          </button>
                          <div className="discord-voice-wave">
                            {[...Array(24)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`discord-voice-bar ${isVoicePlaying ? 'playing' : ''}`}
                                style={{ 
                                  height: `${20 + Math.random() * 60}%`,
                                  animationDelay: `${i * 0.05}s`
                                }}
                              />
                            ))}
                          </div>
                          <span className="discord-voice-duration">0:12</span>
                        </div>
                      )}
                      
                      {showReactions && (
                        <div className="discord-reactions">
                          <span className="discord-reaction">🔥 <span>12</span></span>
                          <span className="discord-reaction">💀 <span>8</span></span>
                          <span className="discord-reaction">📈 <span>5</span></span>
                          <span className="discord-reaction add-reaction">
                            <Smile size={14} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reply from community member */}
                  {showReactions && demo.communityReply && (
                    <div className="discord-message reply">
                      <div className="discord-msg-avatar">{demo.communityReply.avatar}</div>
                      <div className="discord-msg-content">
                        <div className="discord-msg-header">
                          <span className="discord-msg-author">{demo.communityReply.username}</span>
                          <span className="discord-msg-time">Today at 4:33 PM</span>
                        </div>
                        <div className="discord-msg-text">{demo.communityReply.message}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="discord-input-area">
                  <PlusCircle size={20} className="discord-input-icon" />
                  <input 
                    type="text" 
                    placeholder={`Message ${demo.type === 'dm' ? `@${demo.channel}` : `#${demo.channel}`}`}
                    className="discord-input"
                    disabled
                  />
                  <div className="discord-input-icons">
                    <Gift size={20} />
                    <Smile size={20} />
                  </div>
                </div>
              </div>
            </div>


            {/* Navigation Dots */}
            <div className="demo-nav">
              {DEMOS.map((d, i) => (
                <button
                  key={i}
                  className={`demo-nav-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => selectScenario(i)}
                  disabled={isTyping}
                >
                  {d.type === 'dm' ? '💬' : '#'}
                </button>
              ))}
              <button className="demo-nav-next" onClick={nextDemo} disabled={isTyping}>
                Next →
              </button>
            </div>

            {/* CTA */}
            <div className="demo-cta-section">
              <p className="demo-cta-text">This is how companions keep communities alive.</p>
              <button className="demo-cta-btn" data-tally-open="EkK1Or" onClick={handleDemoCTA}>Join Waitlist</button>
              <button className="demo-reset-btn" onClick={reset}>Reset demo</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
