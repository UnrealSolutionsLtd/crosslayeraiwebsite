'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

const DEMOS = [
  {
    game: 'Fortnite',
    event: 'Victory Royale • 12 kills',
    getMessage: (name: string) => `@${name} just dropped a 12-BOMB 🎉

Your old record was 8. You told me you'd break it.

Done. Highlight reel updated. GGs only 💜`,
    avatar: '🎮',
    color: '#00d4ff',
  },
  {
    game: 'Genshin Impact',
    event: 'Wish • 5-Star Pull',
    getMessage: (name: string) => `@${name} FURINA CAME HOME ✨

8 months of saving. You skipped Nahida. Skipped Raiden.

76 pity. Worth every primo. Let's build her 💙`,
    avatar: '✨',
    color: '#a855f7',
  },
  {
    game: 'VALORANT',
    event: 'ACE • 1v4 Clutch',
    getMessage: (name: string) => `@${name} 1v4 ACE. I'm shaking 🎯

Yesterday you said you were washed.

Today you're HIM. That's growth ⚡`,
    avatar: '🎯',
    color: '#ff4655',
  },
  {
    game: 'Elden Ring',
    event: 'Malenia • No Hit',
    getMessage: (name: string) => `@${name} did it. 47 attempts. Zero hits ⚔️

Attempt 23 you almost quit. I talked you back.

Now you're in the 0.3%. Legendary 👑`,
    avatar: '⚔️',
    color: '#fbbf24',
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
  
  const demo = DEMOS[currentIndex]
  const displayName = playerName || 'Player'

  const handleYes = () => {
    setStage('name')
  }

  const handleNo = () => {
    setRejectionMsg(REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)])
    setStage('rejected')
  }

  const startDemo = () => {
    if (!playerName.trim()) return
    setStage('demo')
    setIsTyping(true)
    playMessage()
  }

  const playMessage = () => {
    setDisplayedText('')
    setIsTyping(true)
    
    let i = 0
    const text = demo.getMessage(displayName)
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 18)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (stage === 'demo') {
      playMessage()
    }
  }, [currentIndex])

  const nextDemo = () => {
    setCurrentIndex((prev) => (prev + 1) % DEMOS.length)
  }

  const reset = () => {
    setStage('choice')
    setPlayerName('')
    setDisplayedText('')
    setCurrentIndex(0)
  }

  return (
    <section className="demo-section" id="demo">
      <div className="demo-wrapper">
        {stage === 'choice' && (
          <div className="demo-input-card">
            <div className="demo-choice-question">
              Want to be remembered?
            </div>
            <div className="demo-choice-buttons">
              <button className="demo-choice-btn demo-choice-yes" onClick={handleYes}>
                Yes, show me
              </button>
              <button className="demo-choice-btn demo-choice-no" onClick={handleNo}>
                No thanks
              </button>
            </div>
          </div>
        )}

        {stage === 'rejected' && (
          <div className="demo-input-card">
            <div className="demo-rejection-msg">{rejectionMsg}</div>
            <button className="demo-try-again" onClick={() => setStage('choice')}>
              Wait, let me reconsider...
            </button>
          </div>
        )}

        {stage === 'name' && (
          <div className="demo-input-card">
            <div className="demo-name-prompt">
              What do they call you?
            </div>
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
              <button 
                className="demo-start-btn" 
                onClick={startDemo}
                disabled={!playerName.trim()}
              >
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
              </div>

              <div className="demo-message-container">
                <div className="demo-avatar" style={{ background: demo.color }}>
                  {demo.avatar}
                </div>
                <div className="demo-message-content">
                  <div className="demo-bot-name">
                    Pixel <span className="demo-bot-tag">BOT</span>
                  </div>
                  <div className="demo-message-text">
                    {displayedText}
                    {isTyping && <span className="demo-cursor">|</span>}
                  </div>
                </div>
              </div>

              <button className="demo-refresh" onClick={nextDemo} disabled={isTyping}>
                <RefreshCw size={16} className={isTyping ? 'spinning' : ''} />
                <span>Try another game</span>
              </button>
            </div>

            <div className="demo-scenarios-dots">
              {DEMOS.map((d, i) => (
                <button
                  key={i}
                  className={`demo-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => !isTyping && setCurrentIndex(i)}
                  style={{ background: i === currentIndex ? DEMOS[i].color : undefined }}
                  title={d.game}
                />
              ))}
            </div>

            <button className="demo-change-name" onClick={reset}>
              Start over
            </button>
          </>
        )}
      </div>
    </section>
  )
}
