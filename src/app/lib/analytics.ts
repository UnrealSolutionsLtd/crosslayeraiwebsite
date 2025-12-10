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
    label: 'Join Waitlist Button',
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
  // Step 1: User clicks "Show me"
  DEMO_SHOW_ME: () => trackEvent('demo_show_me', {
    category: 'Demo',
    label: 'Clicked Show Me',
    demo_stage: 'choice',
  }),

  // Step 2: Demo content is shown
  DEMO_STARTED: () => trackEvent('demo_started', {
    category: 'Demo',
    label: 'Demo Started',
    demo_stage: 'demo',
  }),

  DEMO_FORMAT_CHANGE: (format: string, game: string) => trackEvent('demo_format_change', {
    category: 'Demo',
    label: `Format Changed - ${format}`,
    demo_stage: 'demo',
    demo_format: format,
    demo_game: game,
  }),

  DEMO_SCENARIO_SELECT: (index: number, format: string, game: string) => trackEvent('demo_scenario_select', {
    category: 'Demo',
    label: `Scenario Selected - ${index}`,
    demo_stage: 'demo',
    scenario_index: index,
    demo_format: format,
    demo_game: game,
  }),

  DEMO_CTA_CLICK: () => trackEvent('demo_cta_click', {
    category: 'Demo',
    label: 'Join Waitlist CTA',
    demo_stage: 'demo',
  }),

  DEMO_RESET: () => trackEvent('demo_reset', {
    category: 'Demo',
    label: 'Try Again / Reset',
    demo_stage: 'demo',
  }),

  // Demo media interactions
  DEMO_VIDEO_UNMUTE: () => trackEvent('demo_video_unmute', {
    category: 'Demo',
    label: 'Video Unmuted',
    demo_stage: 'demo',
  }),

  DEMO_VOICE_PLAY: () => trackEvent('demo_voice_play', {
    category: 'Demo',
    label: 'Voice Message Played',
    demo_stage: 'demo',
  }),

  // ====== PAGE & NAVIGATION EVENTS ======
  PAGE_VIEW: (page: string) => trackEvent('page_view', {
    category: 'Navigation',
    label: page,
  }),

  SCROLL_DEPTH: (section: string, percentage: number) => trackEvent('scroll', {
    category: 'Engagement',
    label: section,
    value: percentage,
    scroll_depth: percentage,
  }),

  SECTION_VIEW: (section: string) => trackEvent('section_view', {
    category: 'Section',
    label: section,
  }),

  // ====== CODE SECTION EVENTS ======
  CODE_COPY: () => trackEvent('code_copy', {
    category: 'Engagement',
    label: 'SDK Code Snippet',
  }),

  // ====== WAITLIST / FORM EVENTS ======
  WAITLIST_FORM_OPEN: (source: string) => trackEvent('form_open', {
    category: 'Waitlist',
    label: source,
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
    label: 'Join Waitlist CTA',
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

  // ====== OUTBOUND / EXTERNAL LINKS ======
  EXTERNAL_LINK: (url: string, context: string) => trackEvent('external_link_click', {
    category: 'Outbound',
    label: url,
    context: context,
  }),

  // ====== COMPARISON SECTION ======
  COMPARISON_LINK_CLICK: () => trackEvent('comparison_link_click', {
    category: 'Engagement',
    label: 'Read Full Comparison',
  }),
}
