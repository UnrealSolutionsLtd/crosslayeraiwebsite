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
  // Header events
  HEADER_CTA_CLICK: () => trackEvent('header_cta_click', {
    category: 'Header',
    label: 'Join Waitlist Button',
  }),

  // Demo funnel step 1: User clicks "Show me"
  DEMO_SHOW_ME: () => trackEvent('demo_show_me', {
    category: 'Demo',
    label: 'Clicked Show Me',
    demo_stage: 'choice',
  }),

  // Demo funnel step 2: User enters gamertag
  DEMO_NAME_SUBMITTED: (name: string) => trackEvent('demo_name_submitted', {
    category: 'Demo',
    label: 'Name Submitted',
    demo_stage: 'name',
    player_name_length: name.length,
  }),

  // Demo viewing stage (funnel step 3)
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

  // Scroll tracking
  SCROLL_DEPTH: (section: string, percentage: number) => trackEvent('scroll', {
    category: 'Engagement',
    label: section,
    value: percentage,
    scroll_depth: percentage,
  }),

  SECTION_VIEW: (section: string) => trackEvent('view', {
    category: 'Section',
    label: section,
  }),

  // Page events
  PAGE_VIEW: (page: string) => trackEvent('page_view', {
    category: 'Navigation',
    label: page,
  }),

  // Outbound links / external
  EXTERNAL_LINK: (url: string) => trackEvent('click', {
    category: 'Outbound',
    label: url,
  }),

  // Tally form events (if we can capture them)
  WAITLIST_FORM_OPEN: (source: string) => trackEvent('form_open', {
    category: 'Waitlist',
    label: source,
  }),
}

