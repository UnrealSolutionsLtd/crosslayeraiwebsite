import type { Metadata } from 'next'
import { Rajdhani, JetBrains_Mono, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-NQFCLZLB51'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CrossLayerAI | Turn Game Moments into Personalized Outreach',
  description: 'Capture wins, clips, and clutch plays. Reach players on Discord, TikTok, and everywhere they are with AI-powered personalized engagement.',
  keywords: 'player retention, player re-engagement, gaming AI, AI agents, game development, AI SDK, Discord bot, TikTok gaming, player engagement, LiveOps, personalized outreach, game clips, Inworld AI alternative, Convai alternative',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'CrossLayerAI | Turn Game Moments into Personalized Outreach',
    description: 'Capture wins, clips, and clutch plays. Reach players on Discord, TikTok, and everywhere they are with AI-powered personalized engagement.',
    type: 'website',
    url: 'https://crosslayerai.com',
    siteName: 'CrossLayerAI',
    images: [
      {
        url: 'https://crosslayerai.com/og-image-v2.png',
        width: 1200,
        height: 630,
        alt: 'CrossLayerAI - Turn Game Moments into Personalized Outreach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossLayerAI | Turn Game Moments into Personalized Outreach',
    description: 'Capture wins, clips, and clutch plays. Reach players on Discord, TikTok, and everywhere they are.',
    images: ['https://crosslayerai.com/og-image-v2.png'],
  },
  metadataBase: new URL('https://crosslayerai.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${rajdhani.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}

