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
  HEADER_CTA_CLICK: () => trackEvent('click', {
    category: 'Header',
    label: 'Join Waitlist Button',
  }),

  // Demo choice stage
  DEMO_CHOICE_YES: () => trackEvent('click', {
    category: 'Demo',
    label: 'Choice - Yes Show Me',
  }),

  DEMO_CHOICE_NO: () => trackEvent('click', {
    category: 'Demo',
    label: 'Choice - No Thanks',
  }),

  DEMO_RECONSIDER: () => trackEvent('click', {
    category: 'Demo',
    label: 'Reconsider After Rejection',
  }),

  // Demo name stage
  DEMO_NAME_SUBMITTED: (name: string) => trackEvent('submit', {
    category: 'Demo',
    label: 'Name Submitted',
    player_name_length: name.length,
  }),

  // Demo viewing stage
  DEMO_STARTED: () => trackEvent('demo_start', {
    category: 'Demo',
    label: 'Demo Started',
  }),

  DEMO_FORMAT_CHANGE: (format: string, game: string) => trackEvent('click', {
    category: 'Demo',
    label: `Format Changed - ${format}`,
    demo_format: format,
    demo_game: game,
  }),

  DEMO_SCENARIO_SELECT: (index: number, format: string, game: string) => trackEvent('click', {
    category: 'Demo',
    label: `Scenario Selected - ${index}`,
    scenario_index: index,
    demo_format: format,
    demo_game: game,
  }),

  DEMO_CTA_CLICK: () => trackEvent('click', {
    category: 'Demo',
    label: 'Join Waitlist CTA',
  }),

  DEMO_RESET: () => trackEvent('click', {
    category: 'Demo',
    label: 'Try Again / Reset',
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

