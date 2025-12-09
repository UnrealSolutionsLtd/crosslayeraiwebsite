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
  title: 'CROSSLAYERAI | Turn Players Into Lifelong Fans',
  description: 'Boost retention with AI companions that remember every player. One SDK integration. Persistent memory. Cross-platform presence.',
  keywords: 'AI companion, gaming AI, NPC AI, game development, AI SDK, player retention, game retention',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'CROSSLAYERAI | Turn Players Into Lifelong Fans',
    description: 'AI companions that remember, connect, and keep players coming back. Boost retention with persistent memory and cross-platform presence.',
    type: 'website',
    url: 'https://crosslayer.ai',
    siteName: 'CrossLayerAI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CrossLayerAI - Turn Players Into Lifelong Fans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CROSSLAYERAI | Turn Players Into Lifelong Fans',
    description: 'AI companions that remember, connect, and keep players coming back.',
    images: ['/og-image.svg'],
  },
  metadataBase: new URL('https://crosslayer.ai'),
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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

