# Technical Implementation Roadmap
## GA4 + Meta Pixel Event Tracking Integration

**Document Status:** Implementation Guide  
**Estimated Development Time:** 20-30 hours  
**Start Date:** Ready for kickoff  

---

## PHASE 1: FOUNDATION (6-8 hours)

### Step 1.1: Create Analytics Utility Module
**File:** `src/lib/analytics.ts`

```typescript
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: Function;
    fbq?: Function;
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

// ─── Specific Business Events ──────────────────────────────────

// Form Events
export function trackLeadFormView(formName: string, language: string = 'es') {
  trackGA4Event('event_view_form', {
    form_name: formName,
    language,
  });
  trackPixelEvent('ViewContent', {
    content_category: 'form',
    content_name: formName,
  });
}

export function trackLeadFormStarted(
  formName: string,
  firstField: string,
  timeToStart: number,
  language: string = 'es'
) {
  trackConversion('event_form_start', {
    form_name: formName,
    first_field_entered: firstField,
    time_to_start: timeToStart,
    language,
  });
}

export function trackLeadFormFieldFilled(
  formName: string,
  fieldName: string,
  progress: number,
  timeOnField: number,
  language: string = 'es'
) {
  trackGA4Event('event_form_progress', {
    form_name: formName,
    field_name: fieldName,
    form_completion_percentage: progress,
    time_on_field: timeOnField,
    language,
  });
}

export function trackLeadFormCompleted(
  formName: string,
  totalTime: number,
  language: string = 'es'
) {
  trackConversion('event_form_complete', {
    form_name: formName,
    form_completion_percentage: 100,
    total_form_time: totalTime,
    language,
  });
}

export function trackLeadFormSubmitted(
  formName: string,
  totalTime: number,
  formData: Record<string, any> = {},
  language: string = 'es'
) {
  // Infer lead quality signals from form data
  const weddingDate = formData.date || formData.weddingDateAndVenue || '';
  const urgency = inferUrgency(weddingDate);
  
  const storyLength = (formData.story || '').length;
  const contentQuality = storyLength > 100 ? 'high' : storyLength > 30 ? 'medium' : 'low';

  const eventData = {
    form_name: formName,
    conversion_type: 'whatsapp_lead',
    lead_value: 1,
    form_completion_time: totalTime,
    wedding_date_urgency: urgency,
    content_quality: contentQuality,
    language,
  };

  trackConversion('purchase', eventData); // GA4 + Pixel
  
  // Additional Pixel data
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: 1,
      currency: 'USD',
      content_category: formName,
    });
  }
}

export function trackLeadFormWhatsAppOpened(
  formName: string,
  language: string = 'es'
) {
  trackConversion('purchase', {
    form_name: formName,
    conversion_type: 'whatsapp_confirmed',
    lead_value: 1,
    language,
  });
}

export function trackLeadFormError(
  formName: string,
  errorType: string,
  language: string = 'es'
) {
  trackGA4Event('exception', {
    description: `Form error: ${errorType}`,
    form_name: formName,
    language,
  });
}

export function trackLeadFormMessageCopied(
  formName: string,
  copyAttempt: number = 1,
  language: string = 'es'
) {
  trackGA4Event('share', {
    form_name: formName,
    copy_attempt_number: copyAttempt,
    language,
  });
}

// Engagement Events
export function trackPageScrollMilestone(
  scrollPercentage: number,
  timeToScroll: number,
  language: string = 'es'
) {
  const engagementLevel = 
    scrollPercentage >= 75 ? 'high' :
    scrollPercentage >= 50 ? 'medium' :
    'low';

  trackGA4Event('scroll', {
    scroll_percentage: scrollPercentage,
    scroll_time: timeToScroll,
    engagement_level: engagementLevel,
    language,
  });
}

export function trackPortfolioGalleryOpen(
  galleryType: string,
  language: string = 'es'
) {
  trackGA4Event('view_item_list', {
    gallery_type: galleryType,
    language,
  });
  
  trackPixelEvent('ViewContent', {
    content_category: 'portfolio',
    content_name: galleryType,
  });
}

export function trackPortfolioImageView(
  galleryType: string,
  imageIndex: number,
  category: string,
  timeViewed: number,
  language: string = 'es'
) {
  trackGA4Event('view_item', {
    gallery_type: galleryType,
    image_index: imageIndex,
    image_category: category,
    time_viewed: timeViewed,
    language,
  });
}

export function trackServicesPackageInterest(
  packageName: string,
  packageId: string,
  actionType: string = 'click',
  language: string = 'es'
) {
  trackGA4Event('view_item', {
    item_id: packageId,
    item_name: packageName,
    item_category: 'service_package',
    interaction_type: actionType,
    language,
  });
  
  trackPixelEvent('ViewContent', {
    content_id: packageId,
    content_name: packageName,
    content_category: 'package',
  });
}

export function trackCTAClick(
  ctaText: string,
  ctaSection: string,
  ctaTarget: string,
  language: string = 'es'
) {
  trackGA4Event('view_promotion', {
    promotion_id: ctaTarget,
    promotion_name: ctaText,
    promotion_location: ctaSection,
    language,
  });
  
  trackPixelEvent('ViewContent', {
    content_name: ctaText,
    content_category: 'cta',
  });
}

// Campaign Events
export function trackCampaignLandingView(
  campaignSlug: string,
  language: string = 'es'
) {
  const utmParams = getUTMParams();
  
  trackGA4Event('view_item', {
    item_id: campaignSlug,
    item_category: 'campaign_landing',
    language,
    ...utmParams,
  });
  
  trackPixelEvent('ViewContent', {
    content_id: campaignSlug,
    content_category: 'campaign_landing',
  });
}

export function trackCampaignSignup(
  campaignSlug: string,
  campaignName: string,
  language: string = 'es'
) {
  const utmParams = getUTMParams();
  
  trackConversion('purchase', {
    item_id: campaignSlug,
    item_category: 'campaign_signup',
    lead_value: 1,
    language,
    ...utmParams,
  });
}

// ─── Helper Functions ──────────────────────────────────────────

function inferUrgency(dateString: string): string {
  if (!dateString) return 'unknown';
  
  try {
    const weddingDate = new Date(dateString);
    const today = new Date();
    const daysUntil = Math.floor((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 180) return 'immediate';
    if (daysUntil < 365) return '6_months';
    return '1_year_plus';
  } catch {
    return 'unknown';
  }
}

function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params: Record<string, string> = {};
  const url = new URL(window.location);
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(param => {
    const value = url.searchParams.get(param);
    if (value) params[param] = value;
  });
  
  return params;
}

// ─── Scroll Tracking Hook ──────────────────────────────────────
export function useScrollTracking() {
  useEffect(() => {
    let hasTracked25 = false;
    let hasTracked50 = false;
    let hasTracked75 = false;
    let hasTracked100 = false;
    const startTime = Date.now();

    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const timeElapsed = (Date.now() - startTime) / 1000;

      if (scrollPercentage >= 25 && !hasTracked25) {
        trackPageScrollMilestone(25, timeElapsed);
        hasTracked25 = true;
      }
      if (scrollPercentage >= 50 && !hasTracked50) {
        trackPageScrollMilestone(50, timeElapsed);
        hasTracked50 = true;
      }
      if (scrollPercentage >= 75 && !hasTracked75) {
        trackPageScrollMilestone(75, timeElapsed);
        hasTracked75 = true;
      }
      if (scrollPercentage >= 95 && !hasTracked100) {
        trackPageScrollMilestone(100, timeElapsed);
        hasTracked100 = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
```

### Step 1.2: Initialize GA4 + Pixel Scripts
**File:** `src/app/layout.tsx` — Add to `<head>`

```typescript
// Add this after imports:
function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  if (!pixelId) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}

// In RootLayout component, update Metadata and add to <head>:
export const metadata: Metadata = {
  // ... existing metadata ...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <LocalBusinessSchema />
        <CreatorSchema />
        <TestimonialsSchema lang="es" />
        <GoogleAnalytics /> {/* ADD THIS */}
        <MetaPixel /> {/* ADD THIS */}
      </head>
      <body className={...}>
        {/* ... rest of body ... */}
      </body>
    </html>
  );
}
```

---

## PHASE 2: FORM EVENT TRACKING (6-8 hours)

### Step 2.1: Add Tracking to Contact Form
**File:** `src/app/contact/components/ContactFormClient.tsx`

Key additions:
```typescript
import { 
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormFieldFilled,
  trackLeadFormCompleted,
  trackLeadFormSubmitted,
  trackLeadFormWhatsAppOpened,
  trackLeadFormError,
  trackLeadFormMessageCopied,
} from '@/lib/analytics';

export default function ContactFormClient() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const contact = locale.contact;
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [firstFieldFocused, setFirstFieldFocused] = useState(false);

  // Track when form enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackLeadFormView('contact_wedding', lang);
        observer.disconnect();
      }
    }, { threshold: 0.8 });

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, [lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Track first field focus
    if (!firstFieldFocused && formStartTime === null) {
      const startTime = Date.now();
      setFormStartTime(startTime);
      setFirstFieldFocused(true);
      trackLeadFormStarted('contact_wedding', id, 0, lang);
    }

    // Track field completion
    if (formStartTime) {
      const timeOnField = (Date.now() - formStartTime) / 1000;
      const completionPercent = calculateFormCompletion();
      trackLeadFormFieldFilled('contact_wedding', id, completionPercent, timeOnField, lang);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");

    const totalTime = formStartTime ? (Date.now() - formStartTime) / 1000 : 0;

    try {
      // Track form completion BEFORE submission
      trackLeadFormCompleted('contact_wedding', totalTime, lang);

      const whatsappUrl = getWhatsAppUrl(generatedMessage);
      if (!whatsappUrl) {
        throw new Error("Missing NEXT_PUBLIC_WHATSAPP_NUMBER");
      }

      // Track form submission
      trackLeadFormSubmitted('contact_wedding', totalTime, formData, lang);

      const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        throw new Error("Popup blocked");
        trackLeadFormError('contact_wedding', 'popup_blocked', lang);
      }

      // Track WhatsApp open success
      trackLeadFormWhatsAppOpened('contact_wedding', lang);
      setSubmitStatus("success");
    } catch (error) {
      console.error("WhatsApp open error:", error);
      trackLeadFormError('contact_wedding', 'whatsapp_open_failed', lang);
      setSubmitStatus("error");
      setErrorMessage(contact.errorMsg);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedMessage);
    trackLeadFormMessageCopied('contact_wedding', 1, lang);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const calculateFormCompletion = (): number => {
    const requiredFields = ['name', 'date'];
    const filledFields = requiredFields.filter(f => formData[f as keyof FormData]);
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-8 md:p-12 border border-gray-100">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* ... form fields ... */}
        </form>
      </div>
    </div>
  );
}
```

### Step 2.2: Add Tracking to Giveaway Form
**File:** `src/app/landing/[slug]/components/GiveawayLeadForm.tsx`

Similar implementation to contact form with:
- Campaign context tracking
- Different form_name: `'giveaway_engagement'`
- UTM parameters passed to conversion event

---

## PHASE 3: ENGAGEMENT EVENTS (5-6 hours)

### Step 3.1: Add Scroll Tracking Hook
**File:** `src/app/page.tsx` and other key pages

```typescript
import { useScrollTracking } from '@/lib/analytics';

export default function Home() {
  useScrollTracking(); // Automatically tracks 25, 50, 75, 100% scrolls

  return (
    // ... existing content ...
  );
}
```

### Step 3.2: Add Gallery Tracking
**File:** `src/app/portfolio/components/PortfolioLightbox.tsx`

```typescript
import { trackPortfolioGalleryOpen, trackPortfolioImageView } from '@/lib/analytics';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PortfolioLightbox({ images }: Props) {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageStartTime = useRef(0);

  const openLightbox = (index: number) => {
    trackPortfolioGalleryOpen('portfolio_main', lang);
    setIsOpen(true);
  };

  const changeImage = (newIndex: number) => {
    if (imageStartTime.current > 0) {
      const timeViewed = (Date.now() - imageStartTime.current) / 1000;
      trackPortfolioImageView(
        'portfolio_main',
        currentIndex,
        images[currentIndex].category || 'weddings',
        timeViewed,
        lang
      );
    }
    
    setCurrentIndex(newIndex);
    imageStartTime.current = Date.now();
  };

  // ... rest of component ...
}
```

### Step 3.3: Add Package Interest Tracking
**File:** `src/app/services/components/PackagesShowcase.tsx`

```typescript
import { trackServicesPackageInterest, trackCTAClick } from '@/lib/analytics';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PackagesShowcase({ packages }: Props) {
  const { lang } = useLanguage();

  const handlePackageHover = (packageId: string, packageName: string) => {
    trackServicesPackageInterest(packageName, packageId, 'hover', lang);
  };

  const handlePackageClick = (packageId: string, packageName: string, target: string) => {
    trackServicesPackageInterest(packageName, packageId, 'click', lang);
    trackCTAClick('Cotizar', 'services_packages', target, lang);
  };

  return (
    <div className="grid">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          onMouseEnter={() => handlePackageHover(pkg.id, pkg.name)}
          onClick={() => handlePackageClick(pkg.id, pkg.name, '/contact')}
        >
          {/* ... package content ... */}
        </div>
      ))}
    </div>
  );
}
```

---

## PHASE 4: CAMPAIGN EVENTS (3-4 hours)

### Step 4.1: Add Campaign Tracking
**File:** `src/app/landing/[slug]/components/LandingPageClient.tsx`

```typescript
import { trackCampaignLandingView, trackCampaignSignup } from '@/lib/analytics';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function LandingPageClient({
  campaign,
  // ... other props
}: LandingProps) {
  const { lang } = useLanguage();

  // Track campaign landing page view
  useEffect(() => {
    trackCampaignLandingView(campaign.slug, lang);
  }, [campaign.slug, lang]);

  // Campaign form will call:
  // trackCampaignSignup(campaign.slug, 'Engagement Session Giveaway', lang);
  // When WhatsApp is opened

  return (
    // ... existing content ...
  );
}
```

---

## PHASE 5: GA4 CONFIGURATION (3-4 hours)

### Step 5.1: GA4 Conversions Dashboard Setup

**In Google Analytics 4:**

1. **Go to:** Admin → Events → Create Event
   - Event name: `purchase`
   - Custom event: Ensure it's marked as conversion

2. **Create Conversion Events:**
   - Mark `purchase` as conversion (already auto-marked)
   - Mark `event_form_complete` as conversion

3. **Create Custom Audience:**
   - Name: "High-Intent Leads"
   - Condition: `purchase` event fired
   - Use for remarketing in Google Ads

4. **Create Funnel Analysis:**
   - Step 1: `event_view_form`
   - Step 2: `event_form_start`
   - Step 3: `event_form_complete`
   - Step 4: `purchase`
   - Analyze drop-off rates

### Step 5.2: GA4 Custom Reports

Create weekly dashboard:
- Conversion rate by form type
- Average form completion time
- Scroll depth distribution
- Portfolio engagement rate
- Campaign conversion rate

---

## PHASE 6: META PIXEL SETUP (2-3 hours)

### Step 6.1: Pixel Configuration
**In Meta Business Suite → Events Manager:**

1. **Test Events Tab:**
   - Add domain: `oscarolgphoto.com`
   - Test events using Pixel Helper browser extension
   - Verify `purchase` events firing

2. **Create Conversion Events:**
   - Set `purchase` as primary conversion
   - Add custom parameter mapping (optional)

3. **Create Custom Audiences:**
   - Name: "Website Converters"
   - Event: `purchase`
   - Time window: Last 180 days
   - Minimum size: 100 people

4. **Create Lookalike Audience:**
   - Based on: "Website Converters"
   - Country: Mexico
   - Audience size: 1-5%

---

## TESTING CHECKLIST

### Pre-Launch Validation

- [ ] GA4 tag firing on page load (check Realtime)
- [ ] Pixel tag firing on page load (Facebook Pixel Helper)
- [ ] Contact form events all firing correctly
- [ ] Giveaway form events all firing correctly
- [ ] WhatsApp open event fires
- [ ] Error events fire on WhatsApp failure
- [ ] Scroll events fire at correct percentages
- [ ] Portfolio gallery events fire
- [ ] Package interest events fire
- [ ] Campaign landing events fire
- [ ] GA4 shows events in DebugView tab
- [ ] Events appear in Facebook Events Manager

### Browser Testing

- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari (iOS)
- [ ] Incognito/Private mode

---

## ROLLOUT PLAN

**Week 1:**
- [ ] Deploy Phase 1 (GA4 + Pixel init)
- [ ] Test all scripts with debuggers
- [ ] Monitor GA4 Realtime for traffic

**Week 2:**
- [ ] Deploy Phase 2 (Form tracking)
- [ ] Monitor form funnel in GA4
- [ ] Verify conversions in FB Events Manager
- [ ] Fix any data quality issues

**Week 3:**
- [ ] Deploy Phase 3 (Engagement tracking)
- [ ] Review scroll depth + portfolio engagement
- [ ] Create GA4 dashboard
- [ ] Export baseline metrics

**Week 4:**
- [ ] Deploy Phase 4-5 (Campaign + GA4 config)
- [ ] Setup GA4 alerts
- [ ] Create FB custom audiences
- [ ] Launch test retargeting campaign

**Week 5:**
- [ ] Deploy Phase 6 (Pixel audiences)
- [ ] Launch lookalike audience campaign
- [ ] Full system monitoring
- [ ] Document learnings, prepare report

---

## MONITORING & ALERTS

### Daily Checks
- [ ] GA4 showing traffic (compare to baseline)
- [ ] Form submissions within expected range
- [ ] Zero JavaScript errors in console

### Weekly Review
- [ ] Form completion rate trend
- [ ] Scroll depth distribution
- [ ] Top traffic sources
- [ ] Top conversion sources

### Monthly Review
- [ ] Cost per lead (if running ads)
- [ ] Lead-to-booking conversion rate (manual check)
- [ ] Campaign performance breakdown
- [ ] Optimization recommendations

---

## ROLLBACK PLAN

If issues occur:

1. **Remove scripts:** Comment out GA4 + Pixel calls in `layout.tsx`
2. **Keep events code:** Leave tracking calls so they can safely no-op
3. **Revert to previous:** Git revert to last working commit
4. **Investigate:** Check console errors + GA4 DebugView

---

**Document Status:** Ready for implementation  
**Next Step:** Approve Phase 1 foundation work  
**Questions?** Review ANALYTICS_STRATEGY.md for business context
