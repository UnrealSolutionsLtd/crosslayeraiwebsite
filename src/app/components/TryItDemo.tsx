'use client'

import { useState } from 'react'
import { Send, Loader2, AlertCircle, ExternalLink } from 'lucide-react'

const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1449818883253866669/FBpHOKji8jw9T2uycNLK_7mcUgK7ofI5Z2EKqTdZ63LeATCAn5JlI5y2Z-qzG8HswfjR'
export const DISCORD_INVITE = 'https://discord.gg/cEWDGHE47x'

// Bot personas for variety
const BOT_PERSONAS = [
  { name: 'Blin', emoji: '🎬' },
  { name: 'Gopnik', emoji: '🚀' },
  { name: 'Chicka', emoji: '🐔' },
  { name: 'Boris', emoji: '🎙️' },
  { name: 'Babushka', emoji: '👵' },
]

interface TryItDemoProps {
  onClipSubmit?: (clip: {
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
  }) => void
}

export default function TryItDemo({ onClipSubmit }: TryItDemoProps) {
  const [videoUrl, setVideoUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Pick a random bot persona
      const bot = BOT_PERSONAS[Math.floor(Math.random() * BOT_PERSONAS.length)]
      
      // Determine media type from URL
      const isVideo = videoUrl.includes('.mp4') || videoUrl.includes('youtube') || videoUrl.includes('youtu.be') || videoUrl.includes('twitch')
      
      // Simple caption
      const caption = `New clip shared! 🎮\n\n${videoUrl}`

      // POST to Discord webhook
      const discordPayload = {
        username: `${bot.emoji} ${bot.name}`,
        avatar_url: 'https://crosslayerai.com/logo-icon.svg',
        embeds: [{
          description: caption,
          color: 0x00f5d4,
          image: !isVideo ? { url: videoUrl } : undefined,
          footer: { 
            text: 'CrossLayerAI • Try it at crosslayerai.com',
            icon_url: 'https://crosslayerai.com/logo-icon.svg'
          },
          timestamp: new Date().toISOString()
        }]
      }

      if (isVideo) {
        discordPayload.embeds[0].description += '\n\n▶️ [Watch Clip](' + videoUrl + ')'
      }

      const discordResponse = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
      })

      if (!discordResponse.ok && discordResponse.status !== 204) {
        throw new Error('Failed to post to Discord')
      }

      // Add to feed widget
      const newClip = {
        id: `user-${Date.now()}`,
        playerName: 'You',
        gameName: 'Demo',
        message: caption,
        title: 'Your Clip 🔥',
        avatar: '🎮',
        botName: bot.name,
        botEmoji: bot.emoji,
        likes: '0',
        comments: '0',
        views: '1',
        media: {
          type: isVideo ? 'video' : 'image',
          url: videoUrl
        }
      }

      if (onClipSubmit) {
        onClipSubmit(newClip)
      }

      // Clear input
      setVideoUrl('')

    } catch (err) {
      console.error('Submit error:', err)
      setError('Failed to share. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="try-it-inline">
      <form className="try-it-inline-form" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Paste YouTube or video URL..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting || !videoUrl}>
          {isSubmitting ? <Loader2 size={18} className="spinning" /> : <Send size={18} />}
        </button>
      </form>
      {error && <span className="try-it-error">{error}</span>}
      <a 
        href={DISCORD_INVITE} 
        target="_blank" 
        rel="noopener noreferrer"
        className="discord-server-btn"
      >
        <ExternalLink size={14} />
        View Discord Server
      </a>
    </div>
  )
}
