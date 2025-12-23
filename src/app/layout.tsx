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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  alternates: {
    canonical: 'https://crosslayerai.com',
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
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CrossLayerAI',
              url: 'https://crosslayerai.com',
              logo: 'https://crosslayerai.com/logo.svg',
              description: 'AI platform that turns game moments into personalized player engagement across all channels.',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@crosslayerai.com',
                contactType: 'customer service',
              },
            }),
          }}
        />
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CrossLayerAI',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cross-platform',
              description: 'AI SDK for game developers to capture in-game moments, build persistent player memory, and deliver hyper-personalized engagement across Discord, TikTok, and other channels.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Contact for pricing',
              },
              featureList: [
                'In-game event capture',
                'Persistent player memory',
                'Discord integration',
                'TikTok content automation',
                'AI-powered personalization',
                'Cross-channel engagement',
              ],
            }),
          }}
        />
        {/* WebSite Schema with SearchAction for Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CrossLayerAI',
              url: 'https://crosslayerai.com',
              description: 'Turn game moments into personalized player engagement across all channels.',
              publisher: {
                '@type': 'Organization',
                name: 'CrossLayerAI',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://crosslayerai.com/logo.svg',
                },
              },
            }),
          }}
        />
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is CrossLayerAI?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'CrossLayerAI is an AI platform for game developers that captures in-game moments, builds persistent memory for each player, and re-engages them with personalized messages across Discord, TikTok, email, and other channels.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How is CrossLayerAI different from Inworld AI or Convai?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Unlike Inworld AI and Convai which focus on in-game NPC conversations, CrossLayerAI specializes in cross-channel player re-engagement. It builds persistent memory across ALL touchpoints and reaches players on Discord, TikTok, email, and other channels outside the game.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I integrate CrossLayerAI?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'CrossLayerAI offers both no-code and developer SDK integration options. For no-code, simply connect your clip capture tool (RVR Engine, Medal.tv, or OBS) and clips flow automatically to community feeds. For developers, our SDK supports Unity, Unreal, Godot, and web games with a simple one-line initialization.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What channels does CrossLayerAI support?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'CrossLayerAI supports Discord (with automated bots), TikTok, Twitter/X, email, push notifications, SMS, and custom webhook integrations. All channels leverage the persistent player memory for personalized engagement.',
                  },
                },
              ],
            }),
          }}
        />
        {/* HowTo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Set Up CrossLayerAI for Your Game',
              description: 'Get started with CrossLayerAI in minutes using our no-code integration.',
              step: [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Capture clips',
                  text: 'Use RVR Engine, Medal.tv, or OBS to capture gameplay clips and moments.',
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'Upload to CrossLayerAI',
                  text: 'Upload clips to CrossLayerAI which automatically adds player memory and context.',
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Share to your community',
                  text: 'Clips automatically flow to your video feed, Discord channels, Twitter, and everywhere else.',
                },
              ],
            }),
          }}
        />
        {/* OpenSearch for browser search integration */}
        <link rel="search" type="application/opensearchdescription+xml" title="CrossLayerAI" href="https://crosslayerai.com/opensearch.xml" />
      </head>
      <body className={`${rajdhani.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}

