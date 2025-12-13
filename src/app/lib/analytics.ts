// Google Analytics tracking utility

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

type GAEventParams = {
  category: string
  label?: string
  value?: number
  [key: string]: string | number | undefined
}

export const trackEvent = (action: string, params: GAEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: params.category,
      event_label: params.label,
      value: params.value,
      ...params,
    })
  }
}

// Pre-defined events for consistency
export const GA_EVENTS = {
  // ====== HEADER EVENTS ======
  HEADER_CTA_CLICK: () => trackEvent('header_cta_click', {
    category: 'Header',
    label: 'Contact Button',
  }),

  HEADER_BLOG_CLICK: () => trackEvent('header_blog_click', {
    category: 'Header',
    label: 'Blog Link',
  }),

  HEADER_LOGO_CLICK: () => trackEvent('header_logo_click', {
    category: 'Header',
    label: 'Logo Click',
  }),

  // ====== DEMO FUNNEL EVENTS ======
  DEMO_STARTED: () => trackEvent('demo_started', {
    category: 'Demo',
    label: 'Demo Started',
  }),

  DEMO_SCENARIO_SELECT: (index: number, format: string, game: string) => trackEvent('demo_scenario_select', {
    category: 'Demo',
    label: `Scenario Selected - ${index}`,
    scenario_index: index,
    demo_format: format,
    demo_game: game,
  }),

  DEMO_CTA_CLICK: () => trackEvent('demo_cta_click', {
    category: 'Demo',
    label: 'Get Started CTA',
  }),

  DEMO_VIDEO_PLAY: () => trackEvent('demo_video_play', {
    category: 'Demo',
    label: 'Video Played',
  }),

  DEMO_VIDEO_UNMUTE: () => trackEvent('demo_video_unmute', {
    category: 'Demo',
    label: 'Video Unmuted',
  }),

  // ====== PAGE & NAVIGATION EVENTS ======
  PAGE_VIEW: (page: string) => trackEvent('page_view', {
    category: 'Navigation',
    label: page,
  }),

  SECTION_VIEW: (section: string) => trackEvent('section_view', {
    category: 'Section',
    label: section,
  }),

  // ====== INTEGRATION SECTION EVENTS ======
  INTEGRATION_TAB_CLICK: (tab: 'nocode' | 'developer') => trackEvent('integration_tab_click', {
    category: 'Integration',
    label: tab === 'nocode' ? 'No Code' : 'Developer SDK',
    tab: tab,
  }),

  RVR_LINK_CLICK: () => trackEvent('rvr_link_click', {
    category: 'Integration',
    label: 'RVR Engine Link',
  }),

  CODE_COPY: () => trackEvent('code_copy', {
    category: 'Engagement',
    label: 'SDK Code Snippet',
  }),

  // ====== FOOTER EVENTS ======
  FOOTER_CTA_CLICK: () => trackEvent('footer_cta_click', {
    category: 'Footer',
    label: 'Contact Email',
  }),

  // ====== BLOG EVENTS ======
  BLOG_PAGE_VIEW: () => trackEvent('blog_page_view', {
    category: 'Blog',
    label: 'Blog Index',
  }),

  BLOG_ARTICLE_VIEW: (slug: string, title: string) => trackEvent('blog_article_view', {
    category: 'Blog',
    label: title,
    article_slug: slug,
  }),

  BLOG_ARTICLE_CLICK: (slug: string, source: string) => trackEvent('blog_article_click', {
    category: 'Blog',
    label: `Clicked - ${slug}`,
    source: source,
  }),

  BLOG_CTA_CLICK: (slug: string) => trackEvent('blog_cta_click', {
    category: 'Blog',
    label: 'Get in Touch CTA',
    article_slug: slug,
  }),

  BLOG_SHARE_CLICK: (platform: string, slug: string) => trackEvent('blog_share_click', {
    category: 'Blog',
    label: `Share - ${platform}`,
    article_slug: slug,
    platform: platform,
  }),

  BLOG_BACK_CLICK: (slug: string) => trackEvent('blog_back_click', {
    category: 'Blog',
    label: 'Back to Blog',
    from_article: slug,
  }),

  BLOG_EXTERNAL_LINK: (url: string) => trackEvent('blog_external_link', {
    category: 'Blog',
    label: url,
  }),
}
