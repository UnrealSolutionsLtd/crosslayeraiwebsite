'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Play, Share2, Heart, MessageCircle, Bookmark } from 'lucide-react'
import { GA_EVENTS } from '../lib/analytics'

type DemoType = 'discord' | 'video' | 'tiktok' | 'voice'

interface Demo {
  type: DemoType
  game: string
  event: string
  getMessage: (name: string) => string
  color: string
}

const DEMOS: Demo[] = [
  {
    // SCENARIO 1: Discord text message
    type: 'discord',
    game: 'Fortnite',
    event: 'Victory Royale • 12 kills',
    getMessage: (name: string) => `YOOO @${name} 12 KILLS??? 

bro your PR was 8 like a month ago lmaooo

actually insane. saving this clip forever 😭`,
    color: '#5865f2',
  },
  {
    // SCENARIO 2: Auto-generated video highlight
    type: 'video',
    game: 'VALORANT',
    event: 'Auto-clipped • ACE',
    getMessage: (name: string) => `${name}'s 1v4 ACE 🎯 They said they were "washed" yesterday lol`,
    color: '#ff4655',
  },
  {
    // SCENARIO 3: TikTok/Social shareable post
    type: 'tiktok',
    game: 'Elden Ring',
    event: 'Generated • Achievement Post',
    getMessage: (name: string) => `147 hours. 34 deaths to Margit. Almost quit twice. @${name} just got the Platinum. This is what persistence looks like. 👑`,
    color: '#00f2ea',
  },
  {
    // SCENARIO 4: Voice message
    type: 'voice',
    game: 'Apex Legends',
    event: 'Voice Message • Re-engagement',
    getMessage: (name: string) => `Hey ${name}, it's been like 2 weeks... I still remember that 2800 damage game. You were ONE shot from your 3k badge. Season 19 just dropped. Your wingman misses you.`,
    color: '#e63946',
  },
]

const REJECTION_MESSAGES = [
  "Okay. Enjoy your generic push notifications 📧",
  "Understandable. Not everyone's built different.",
  "That's fine. Your highlights will miss you though 💔",
  "No worries. The leaderboard awaits... without you.",
  "Cool. We'll just remember you as 'Player_12847' then.",
]

type Stage = 'choice' | 'rejected' | 'name' | 'demo'

export default function LiveDemo() {
  const [stage, setStage] = useState<Stage>('choice')
  const [rejectionMsg, setRejectionMsg] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const demo = DEMOS[currentIndex]
  const displayName = playerName || 'Player'

  const handleYes = () => {
    GA_EVENTS.DEMO_CHOICE_YES()
    setStage('name')
  }

  const handleNo = () => {
    GA_EVENTS.DEMO_CHOICE_NO()
    setRejectionMsg(REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)])
    setStage('rejected')
  }

  const handleReconsider = () => {
    GA_EVENTS.DEMO_RECONSIDER()
    setStage('choice')
  }

  const startDemo = () => {
    if (!playerName.trim()) return
    GA_EVENTS.DEMO_NAME_SUBMITTED(playerName)
    GA_EVENTS.DEMO_STARTED()
    document.body.classList.add('screen-shake')
    setTimeout(() => {
      document.body.classList.remove('screen-shake')
      setStage('demo')
      setIsTyping(true)
      playMessage()
    }, 500)
  }

  const playMessage = () => {
    setDisplayedText('')
    setIsTyping(true)
    setIsPlaying(false)
    
    let i = 0
    const text = demo.getMessage(displayName)
    const speed = demo.type === 'voice' ? 30 : 18
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        if (demo.type === 'video' || demo.type === 'voice') {
          setIsPlaying(true)
        }
      }
    }, speed)
    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (stage === 'demo') {
      playMessage()
    }
  }, [currentIndex])

  const nextDemo = () => {
    const nextIndex = (currentIndex + 1) % DEMOS.length
    const nextDemoData = DEMOS[nextIndex]
    GA_EVENTS.DEMO_FORMAT_CHANGE(nextDemoData.type, nextDemoData.game)
    setCurrentIndex(nextIndex)
  }

  const selectScenario = (index: number) => {
    if (isTyping) return
    const selectedDemo = DEMOS[index]
    GA_EVENTS.DEMO_SCENARIO_SELECT(index, selectedDemo.type, selectedDemo.game)
    setCurrentIndex(index)
  }

  const reset = () => {
    GA_EVENTS.DEMO_RESET()
    setStage('choice')
    setPlayerName('')
    setDisplayedText('')
    setCurrentIndex(0)
  }

  const handleDemoCTA = () => {
    GA_EVENTS.DEMO_CTA_CLICK()
    GA_EVENTS.WAITLIST_FORM_OPEN('demo')
  }

  const renderDemoContent = () => {
    switch (demo.type) {
      case 'discord':
        return (
          <div className="demo-discord">
            <div className="demo-discord-header">
              <span className="demo-discord-channel"># victory-feed</span>
            </div>
            <div className="demo-discord-message">
              <div className="demo-discord-avatar">🤖</div>
              <div className="demo-discord-content">
                <div className="demo-discord-name">Pixel <span className="demo-bot-tag">BOT</span></div>
                <div className="demo-discord-text">
                  {displayedText}
                  {isTyping && <span className="demo-cursor">|</span>}
                </div>
              </div>
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="demo-video">
            <div className="demo-video-player">
              <div className="demo-video-thumbnail">
                <div className="demo-video-game-overlay">VALORANT</div>
                {isPlaying ? (
                  <div className="demo-video-playing">
                    <div className="demo-video-bar"></div>
                  </div>
                ) : (
                  <div className="demo-video-play-btn"><Play size={32} fill="#fff" /></div>
                )}
              </div>
            </div>
            <div className="demo-video-caption">
              {displayedText}
              {isTyping && <span className="demo-cursor">|</span>}
            </div>
            <div className="demo-video-actions">
              <span>🔥 Auto-clipped by Pixel</span>
              <button className="demo-video-share"><Share2 size={16} /> Share</button>
            </div>
          </div>
        )

      case 'tiktok':
        return (
          <div className="demo-tiktok">
            <div className="demo-tiktok-post">
              <div className="demo-tiktok-header">
                <div className="demo-tiktok-avatar">👑</div>
                <div className="demo-tiktok-user">
                  <span className="demo-tiktok-name">pixel.ai</span>
                  <span className="demo-tiktok-handle">@pixelcompanion</span>
                </div>
              </div>
              <div className="demo-tiktok-text">
                {displayedText}
                {isTyping && <span className="demo-cursor">|</span>}
              </div>
              <div className="demo-tiktok-tags">#gaming #eldenring #platinum #persistence</div>
              <div className="demo-tiktok-actions">
                <span><Heart size={18} /> 24.5K</span>
                <span><MessageCircle size={18} /> 892</span>
                <span><Bookmark size={18} /></span>
                <span><Share2 size={18} /></span>
              </div>
            </div>
          </div>
        )

      case 'voice':
        return (
          <div className="demo-voice">
            <div className="demo-voice-message">
              <div className="demo-voice-avatar">🎙️</div>
              <div className="demo-voice-content">
                <div className="demo-voice-header">
                  <span className="demo-voice-name">Pixel</span>
                  <span className="demo-voice-time">Voice Message • 0:12</span>
                </div>
                <div className="demo-voice-wave">
                  {[...Array(32)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`demo-voice-bar ${isPlaying ? 'playing' : ''}`}
                      style={{ 
                        height: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
                <div className="demo-voice-transcript">
                  "{displayedText}"
                  {isTyping && <span className="demo-cursor">|</span>}
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="demo-section" id="demo">
      <div className="demo-wrapper">
        {stage === 'choice' && (
          <div className="demo-input-card">
            <div className="demo-choice-question">Want to be remembered?</div>
            <div className="demo-choice-buttons">
              <button className="demo-choice-btn demo-choice-yes" onClick={handleYes}>Yes, show me</button>
              <button className="demo-choice-btn demo-choice-no" onClick={handleNo}>No thanks</button>
            </div>
          </div>
        )}

        {stage === 'rejected' && (
          <div className="demo-input-card">
            <div className="demo-rejection-msg">{rejectionMsg}</div>
            <button className="demo-try-again" onClick={handleReconsider}>Wait, let me reconsider...</button>
          </div>
        )}

        {stage === 'name' && (
          <div className="demo-input-card">
            <div className="demo-name-prompt">What do they call you?</div>
            <div className="demo-input-row">
              <input
                type="text"
                className="demo-name-input"
                placeholder="Your gamertag"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startDemo()}
                maxLength={20}
                autoFocus
              />
              <button className="demo-start-btn" onClick={startDemo} disabled={!playerName.trim()}>
                Let&apos;s go
              </button>
            </div>
          </div>
        )}

        {stage === 'demo' && (
          <>
            <div className="demo-card" style={{ '--demo-color': demo.color } as React.CSSProperties}>
              <div className="demo-event-bar">
                <span className="demo-game">{demo.game}</span>
                <span className="demo-event">{demo.event}</span>
                <span className="demo-type-badge">{demo.type.toUpperCase()}</span>
              </div>
              
              {renderDemoContent()}

              <button className="demo-refresh" onClick={nextDemo} disabled={isTyping}>
                <RefreshCw size={16} className={isTyping ? 'spinning' : ''} />
                <span>Try different format</span>
              </button>
            </div>

            <div className="demo-scenarios-dots">
              {DEMOS.map((d, i) => (
                <button
                  key={i}
                  className={`demo-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => selectScenario(i)}
                  style={{ background: i === currentIndex ? DEMOS[i].color : undefined }}
                  title={`${d.type}: ${d.game}`}
                />
              ))}
            </div>

            <div className="demo-cta-section">
              <p className="demo-cta-text">This could be your players.</p>
              <button className="demo-cta-btn" data-tally-open="EkK1Or" onClick={handleDemoCTA}>Join Waitlist</button>
              <button className="demo-change-name" onClick={reset}>Try again</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
