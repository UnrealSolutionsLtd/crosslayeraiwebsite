import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://crosslayerai.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // AI crawlers - explicitly allow
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-AI', 'Claude-Web', 'PerplexityBot', 'Cohere-AI'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

