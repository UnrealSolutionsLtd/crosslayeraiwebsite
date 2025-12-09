import type { Metadata } from 'next'
import { Rajdhani, JetBrains_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'CROSSLAYERAI | Stop Losing Players. Start Bringing Them Back.',
  description: 'The player re-engagement engine powered by AI companions. Reduce churn, increase LTV, and bring churned players back-automatically through Discord, TikTok, and beyond.',
  keywords: 'player retention, reduce churn, player re-engagement, gaming AI, AI companion, game development, AI SDK, game retention, Inworld AI alternative, Convai alternative, game analytics, Discord bot, player engagement, LiveOps, win-back',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'CROSSLAYERAI | Stop Losing Players. Start Bringing Them Back.',
    description: 'The player re-engagement engine powered by AI companions. Reduce churn, increase LTV, and bring churned players back automatically.',
    type: 'website',
    url: 'https://crosslayerai.com',
    siteName: 'CrossLayerAI',
    images: [
      {
        url: 'https://crosslayerai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CrossLayerAI - Turn Players Into Lifelong Fans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CROSSLAYERAI | Stop Losing Players. Start Bringing Them Back.',
    description: 'The player re-engagement engine powered by AI companions. Reduce churn and bring players back automatically.',
    images: ['https://crosslayerai.com/og-image.png'],
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
      <body className={`${rajdhani.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}

