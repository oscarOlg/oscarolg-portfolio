/**
 * Analytics Tracking Utility
 * Handles GA4 + Meta Pixel event tracking for Oscar OLG Photography
 * 
 * Usage:
 * - Import: import { trackLeadFormSubmitted, trackPageScrollMilestone } from '@/lib/analytics'
 * - Call: trackLeadFormSubmitted('contact_wedding', '[email]', 'URGENT', 1200)
 */

declare global {
  interface Window {
    gtag?: (command: string, action: string, config?: Record<string, any>) => void;
    fbq?: (command: string, event: string, data?: Record<string, any>) => void;
  }
}

// ─── GA4 Event Tracking ────────────────────────────────────────
export function trackGA4Event(
  eventName: string,
  eventData: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;
  
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

// ─── Meta Pixel Event Tracking ────────────────────────────────
export function trackPixelEvent(
  eventName: string,
  eventData: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;
  
  if (window.fbq) {
    window.fbq('track', eventName, eventData);
  }
}

// ─── Combined Tracking (GA4 + Pixel) ──────────────────────────
export function trackConversion(
  eventName: string,
  eventData: Record<string, any> = {}
) {
  trackGA4Event(eventName, eventData);
  trackPixelEvent(eventName, eventData);
}

// ─── FORM EVENTS ──────────────────────────────────────────────

/**
 * Track when contact/giveaway form enters viewport
 * @param formName - 'contact_wedding' | 'giveaway_engagement' | other
 * @param language - Current language ('es' | 'en')
 */
export function trackLeadFormView(
  formName: string,
  language: string = 'es'
) {
  trackGA4Event('event_view_form', {
    form_name: formName,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when user starts filling form (first field interaction)
 * @param formName - 'contact_wedding' | 'giveaway_engagement'
 * @param language - Current language
 */
export function trackLeadFormStarted(
  formName: string,
  language: string = 'es'
) {
  trackConversion('event_form_start', {
    form_name: formName,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track individual form field completion
 * @param formName - Form identifier
 * @param fieldName - Which field was filled (e.g., 'name', 'email', 'wedding_date')
 * @param fieldValue - Optional: the value entered (for GA4 analysis only, not Pixel)
 * @param language - Current language
 */
export function trackLeadFormFieldFilled(
  formName: string,
  fieldName: string,
  fieldValue?: string,
  language: string = 'es'
) {
  trackGA4Event('event_form_progress', {
    form_name: formName,
    field_name: fieldName,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when all form fields are completed (validation passed)
 * @param formName - Form identifier
 * @param fieldsCount - Total number of fields completed
 * @param language - Current language
 */
export function trackLeadFormCompleted(
  formName: string,
  fieldsCount: number = 5,
  language: string = 'es'
) {
  trackConversion('event_form_complete', {
    form_name: formName,
    fields_completed: fieldsCount,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form submission (WhatsApp button click) - PRIMARY CONVERSION
 * Infers lead quality from form data
 * @param formName - Form identifier
 * @param email - User email
 * @param weddingDate - Wedding date (YYYY-MM-DD format)
 * @param story - User's story text
 * @param language - Current language
 */
export function trackLeadFormSubmitted(
  formName: string,
  email: string,
  weddingDate: string,
  story: string = '',
  language: string = 'es'
) {
  // Infer lead quality signals from form data
  const urgency = inferUrgency(weddingDate);
  const contentQuality = story.length > 100 ? 'high' : story.length > 30 ? 'medium' : 'low';

  trackConversion('purchase', {
    form_name: formName,
    email: email,
    wedding_date: weddingDate,
    urgency_level: urgency,
    content_quality: contentQuality,
    story_length: story.length,
    language: language,
    timestamp: new Date().toISOString(),
    currency: 'MXN',
    value: 2500, // Giveaway value in pesos
  });
}

/**
 * Track WhatsApp window opened (lead confirmed contact)
 * This is a true conversion signal
 */
export function trackLeadFormWhatsAppOpened(
  formName: string,
  language: string = 'es'
) {
  trackConversion('WhatsApp_Window_Opened', {
    form_name: formName,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form submission errors
 * @param formName - Form identifier
 * @param errorMessage - What failed (e.g., 'invalid_email', 'whatsapp_failed')
 */
export function trackLeadFormError(
  formName: string,
  errorMessage: string,
  language: string = 'es'
) {
  trackGA4Event('exception', {
    description: `Form error: ${errorMessage}`,
    form_name: formName,
    language: language,
    timestamp: new Date().toISOString(),
    fatal: false,
  });
}

/**
 * Track when user copies form message manually (fallback conversion)
 */
export function trackLeadFormMessageCopied(
  formName: string,
  language: string = 'es'
) {
  trackGA4Event('share', {
    method: 'copy_to_clipboard',
    content_type: 'lead_form_message',
    form_name: formName,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

// ─── ENGAGEMENT EVENTS ────────────────────────────────────────

/**
 * Track page scroll depth (25%, 50%, 75%, 100%)
 * Usually called from useScrollTracking hook
 */
export function trackPageScrollMilestone(
  scrollPercentage: number,
  pagePath: string,
  language: string = 'es'
) {
  const engagementLevel =
    scrollPercentage >= 100 ? 'very_high' :
    scrollPercentage >= 75 ? 'high' :
    scrollPercentage >= 50 ? 'medium' :
    'low';

  trackGA4Event('event_scroll_depth', {
    scroll_percentage: scrollPercentage,
    page_path: pagePath,
    engagement_level: engagementLevel,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track portfolio gallery open
 */
export function trackPortfolioGalleryOpen(
  galleryType: string, // 'weddings' | 'portraits' | 'engagements'
  language: string = 'es'
) {
  trackGA4Event('view_item_list', {
    item_list_name: `portfolio_gallery_${galleryType}`,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track individual portfolio image view
 */
export function trackPortfolioImageView(
  galleryType: string,
  imageIndex: number,
  totalImages: number,
  language: string = 'es'
) {
  trackGA4Event('view_item', {
    item_list_name: galleryType,
    item_name: `${galleryType}_image_${imageIndex}`,
    index: imageIndex,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track services/package interest
 */
export function trackServicesPackageInterest(
  packageName: string,
  packagePrice: number,
  language: string = 'es'
) {
  trackGA4Event('view_item', {
    item_name: packageName,
    item_category: 'wedding_package',
    value: packagePrice,
    currency: 'MXN',
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  ctaText: string,
  ctaType: string, // 'contact' | 'services' | 'portfolio' | 'book_now'
  pageSection: string,
  language: string = 'es'
) {
  trackGA4Event('click', {
    button_text: ctaText,
    button_type: ctaType,
    page_section: pageSection,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

// ─── CAMPAIGN EVENTS ──────────────────────────────────────────

/**
 * Track campaign landing page view
 */
export function trackCampaignLandingView(
  campaignSlug: string,
  language: string = 'es'
) {
  const utmParams = getUTMParams();

  trackGA4Event('page_view', {
    campaign_slug: campaignSlug,
    page_title: `Campaign: ${campaignSlug}`,
    utm_source: utmParams.utm_source || 'direct',
    utm_medium: utmParams.utm_medium || 'organic',
    utm_campaign: utmParams.utm_campaign || campaignSlug,
    language: language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track campaign signup (form submission from campaign landing page)
 */
export function trackCampaignSignup(
  campaignSlug: string,
  email: string,
  language: string = 'es'
) {
  const utmParams = getUTMParams();

  trackConversion('purchase', {
    event_type: 'campaign_signup',
    campaign_slug: campaignSlug,
    email: email,
    utm_source: utmParams.utm_source || 'direct',
    utm_medium: utmParams.utm_medium || 'organic',
    utm_campaign: utmParams.utm_campaign || campaignSlug,
    language: language,
    timestamp: new Date().toISOString(),
    currency: 'MXN',
    value: 2500,
  });
}

// ─── HELPER FUNCTIONS ──────────────────────────────────────────

/**
 * Infer wedding urgency from wedding date
 * Returns: 'urgent' | 'high' | 'medium' | 'low' | 'unknown'
 */
function inferUrgency(dateString: string): string {
  if (!dateString) return 'unknown';

  try {
    const weddingDate = new Date(dateString);
    const today = new Date();
    const daysUntilWedding = Math.floor((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilWedding < 60) return 'urgent';
    if (daysUntilWedding < 180) return 'high';
    if (daysUntilWedding < 365) return 'medium';
    return 'low';
  } catch {
    return 'unknown';
  }
}

/**
 * Extract UTM parameters from URL
 */
function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  utmKeys.forEach(key => {
    const value = searchParams.get(key);
    if (value) params[key] = value;
  });

  return params;
}

// ─── SCROLL TRACKING HOOK ──────────────────────────────────────

import { useEffect } from 'react';

/**
 * Hook: Automatically track scroll depth milestones
 * Add to page components for automatic engagement tracking
 * 
 * Usage:
 * export default function HomePage() {
 *   useScrollTracking();
 *   return <div>...</div>
 * }
 */
export function useScrollTracking(pagePath: string = 'home') {
  useEffect(() => {
    const trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackPageScrollMilestone(milestone, pagePath);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pagePath]);
}

// ─── DEBUGGING / TESTING ──────────────────────────────────────

/**
 * Debug helper: Log all events to console
 * Enable in development to verify tracking is working
 */
export function enableAnalyticsDebug() {
  if (typeof window === 'undefined') return;

  const originalGtag = window.gtag;
  const originalFbq = window.fbq;

  window.gtag = function(command: string, action: string, config?: Record<string, any>) {
    console.log('📊 GA4 Event:', { command, action, config });
    if (originalGtag) originalGtag.apply(window, arguments as any);
  };

  window.fbq = function(command: string, event: string, data?: Record<string, any>) {
    console.log('📘 Meta Pixel Event:', { command, event, data });
    if (originalFbq) originalFbq.apply(window, arguments as any);
  };
}

export default {
  trackGA4Event,
  trackPixelEvent,
  trackConversion,
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormFieldFilled,
  trackLeadFormCompleted,
  trackLeadFormSubmitted,
  trackLeadFormWhatsAppOpened,
  trackLeadFormError,
  trackLeadFormMessageCopied,
  trackPageScrollMilestone,
  trackPortfolioGalleryOpen,
  trackPortfolioImageView,
  trackServicesPackageInterest,
  trackCTAClick,
  trackCampaignLandingView,
  trackCampaignSignup,
  useScrollTracking,
  enableAnalyticsDebug,
};
