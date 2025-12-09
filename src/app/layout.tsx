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
  openGraph: {
    title: 'CROSSLAYERAI | Turn Players Into Lifelong Fans',
    description: 'Boost retention with AI companions that remember every player. One SDK integration. Persistent memory. Cross-platform presence.',
    type: 'website',
  },
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

