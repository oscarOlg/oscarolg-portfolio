# Marketing Metrics & Analytics Strategy
## Oscar OLG Photography — Conversion Tracking & Business Intelligence

**Document Status:** Strategic Framework  
**Last Updated:** April 2, 2026  
**Scope:** GA4 + Meta Pixel Implementation Plan  

---

## EXECUTIVE SUMMARY

Currently, **NO event tracking is active** on the site despite GA4 (Measurement ID: `G-9R700K0V4Q`) and Meta Pixel (ID: `302412685636304`) being configured. This represents a **massive lost opportunity** for:

- ❌ Understanding lead quality
- ❌ Measuring conversion funnel performance  
- ❌ Optimizing ad spend (retargeting, lookalike audiences)
- ❌ Diagnosing where visitors drop off
- ❌ Tracking ROI on campaigns

**Goal:** Implement strategic event tracking that serves **business objectives** (not just vanity metrics) to measure:
1. Lead capture quality
2. Conversion funnel efficiency
3. Campaign performance
4. User engagement patterns

---

## PART 1: CURRENT STATE AUDIT

### A. Technology Stack
| Tool | Status | Config |
|------|--------|--------|
| **Google Analytics 4** | Configured but NOT initialized | `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9R700K0V4Q` |
| **Meta Pixel** | Configured but NOT initialized | `NEXT_PUBLIC_FB_PIXEL_ID=302412685636304` |
| **Vercel Analytics** | ✅ Active | Automatic Web Vitals tracking |
| **Vercel Speed Insights** | ✅ Active | Performance monitoring |

**Problem:** Vercel Analytics only tracks Web Vitals + page views. It does NOT track business events (form submissions, WhatsApp clicks, package selection).

### B. Current Conversion Flows (Untracked)

#### **Flow 1: Main Contact Form** → WhatsApp Lead
- **Route:** `/[locale]/contact`
- **Components:** `ContactFormClient.tsx`
- **Current State:** Form generates WhatsApp message but NO tracking
- **What Happens:** User fills form → clicks "Enviar por WhatsApp" → opens WhatsApp chat

**Tracking Gaps:**
- ❌ Form view not tracked
- ❌ Form field interactions not tracked
- ❌ Form completion not tracked
- ❌ WhatsApp click not tracked
- ❌ Copy message clicks not tracked

#### **Flow 2: Landing Page Giveaway** → WhatsApp Lead  
- **Route:** `/[locale]/landing/[slug]` (e.g., `/es/landing/engagement-giveaway`)
- **Components:** `GiveawayLeadForm.tsx`
- **Current State:** Campaign lead capture but NO conversion tracking
- **What Happens:** User fills giveaway form → clicks "Enviar por WhatsApp" → enters raffle pool

**Tracking Gaps:**
- ❌ Campaign landing page view not attributed
- ❌ Campaign participation not tracked
- ❌ Lead quality signals missed (e.g., wedding date urgency)
- ❌ Conversion from landing page not measured

#### **Flow 3: Services Page** → Package Interest  
- **Route:** `/[locale]/services`
- **Components:** `PackagesShowcase.tsx`
- **Current State:** Users view packages but interaction NOT tracked
- **What Happens:** User scrolls → views packages → clicks "Cotizar" (quote CTA)

**Tracking Gaps:**
- ❌ Package view events not tracked
- ❌ Package selection not tracked
- ❌ CTA clicks not tracked
- ❌ Price tier interest not measured

#### **Flow 4: Homepage** → Funnel Entry
- **Route:** `/` (home) and `/[locale]` (localized)
- **Components:** Multiple sections (Hero, Investment, Testimonials, CTA)
- **Current State:** Traffic arrives but journey untracked
- **What Happens:** User lands → scrolls → engages with content → proceeds to services/contact

**Tracking Gaps:**
- ❌ Section visibility not tracked
- ❌ CTA click source not attributed
- ❌ User journey not mapped
- ❌ Scroll depth not measured

#### **Flow 5: Portfolio** → Engagement Indicator
- **Route:** `/[locale]/portfolio`
- **Components:** `PortfolioLightbox.tsx`
- **Current State:** Gallery displayed but engagement invisible
- **What Happens:** User views gallery → opens lightbox → browses images

**Tracking Gaps:**
- ❌ Gallery view not tracked
- ❌ Image interactions not tracked
- ❌ Time spent not measured
- ❌ Engagement quality not assessed

---

## PART 2: BUSINESS CONVERSION FUNNEL

### Ideal Customer Journey (Macro Funnel)
```
┌─────────────────────────────────────────────────────────┐
│ 1. AWARENESS                                            │
│ Traffic Source: Organic Search, Social, Direct, Ads   │
│ Landing Pages: Homepage, Portfolio, About             │
└─────────────────────────────────────────────────────────┘
                           ↓ [TRACKING POINT 1]
┌─────────────────────────────────────────────────────────┐
│ 2. CONSIDERATION                                        │
│ Actions: Browse Portfolio, Read About, View Services  │
│ Time: 2-5 min average on site                          │
│ Signal: High engagement = qualified lead potential     │
└─────────────────────────────────────────────────────────┘
                           ↓ [TRACKING POINT 2]
┌─────────────────────────────────────────────────────────┐
│ 3. DECISION                                             │
│ Actions: View Pricing, Click CTAs, Interact w/ Form    │
│ Micro-conversions: Form started, field filled          │
└─────────────────────────────────────────────────────────┘
                           ↓ [TRACKING POINT 3]
┌─────────────────────────────────────────────────────────┐
│ 4. ACTION (LEAD CAPTURE)                               │
│ Primary: Form Submission → WhatsApp Click              │
│ Secondary: Copy Message, Direct WhatsApp              │
│ **REVENUE IMPACT: HIGH** — This is the real conversion │
└─────────────────────────────────────────────────────────┘
                           ↓ [TRACKING POINT 4]
┌─────────────────────────────────────────────────────────┐
│ 5. POST-CONVERSION (CRM Handoff)                        │
│ Actions: WhatsApp response, Guide delivery             │
│ Outcome: Booking inquiry, Quotation request            │
└─────────────────────────────────────────────────────────┘
```

### Key Decision Points (Micro-Conversions)

| Stage | Event | Business Signal | User Action |
|-------|-------|-----------------|-------------|
| **Awareness** | Page View | Traffic quality | Lands on site |
| **Awareness** | Section Scroll | Engagement depth | Scrolls past fold |
| **Consideration** | Portfolio View | Visual preference | Opens gallery |
| **Consideration** | Image Click | Engagement intensity | Clicks lightbox |
| **Consideration** | Services Page View | Intent signal | Opens pricing |
| **Decision** | Package View | Price exploration | Scrolls packages |
| **Decision** | Form View | Intent to inquire | Scrolls to form |
| **Decision** | Form Started | Commitment signal | Fills first field |
| **Decision** | Form Completed | Qualified lead | All fields filled |
| **Action** | Form Submitted | **CONVERSION** | Clicks "Enviar WhatsApp" |
| **Action** | WhatsApp Opened | Qualified lead (confirmed) | Opens chat |
| **Post-Conv.** | Message Copied | Fallback conversion | Manual sending |

---

## PART 3: STRATEGIC EVENT TRACKING FRAMEWORK

### **Core Metrics** (What We Care About)

#### 1. **Lead Generation Efficiency**
- **Metric:** Leads per 100 visitors
- **Target:** 2-4% form completion rate (industry std: 1-2%, premium service: 2-5%)
- **Events Needed:**
  - `lead_form_view` — When form enters viewport
  - `lead_form_started` — First field interaction
  - `lead_form_completed` — All required fields filled
  - `lead_form_submitted` — WhatsApp button clicked
  - `lead_conversion_whatsapp` — WhatsApp window opened

#### 2. **Conversion Funnel Health**
- **Metric:** Completion rate by step
- **Target:** 
  - View → Started: 40%+
  - Started → Completed: 80%+
  - Completed → Submitted: 95%+
- **Events Needed:**
  - `lead_form_view`
  - `lead_form_started`
  - `lead_form_completed`
  - `lead_form_submitted`

#### 3. **Campaign Performance** (Landing Pages)
- **Metric:** Lead volume + quality by campaign
- **Target:** Track engagement giveaway participation rate
- **Events Needed:**
  - `campaign_view` — Landing page load w/ campaign slug
  - `campaign_signup_started` — Form interaction
  - `campaign_signup_conversion` — WhatsApp submit
  - `campaign_signup_completed` — WhatsApp opened

#### 4. **Content Engagement** (Awareness/Consideration)
- **Metric:** Time on page, scroll depth, section views
- **Target:** High engagement before CTA = higher quality leads
- **Events Needed:**
  - `page_engagement_level` — Track scroll depth %
  - `portfolio_gallery_open` — User browses portfolio
  - `portfolio_image_views` — Count images opened
  - `services_section_view` — Package section reached

#### 5. **Lead Quality Signals** (Form Content Analysis)
- **From form data, infer:**
  - **Urgency:** Wedding date < 6 months = high priority
  - **Engagement:** Full story responses = serious leads
  - **Positioning Fit:** "Natural photos" vs "luxury aesthetic" = target alignment
  - **Package Preference:** Budget ranges stated = deal size indicator

---

## PART 4: DETAILED EVENT SPECIFICATIONS

### **A. Form Events** (Highest Priority)

#### Event: `lead_form_view`
```
Trigger: When contact form enters 80% viewport visibility
Data:
  - form_name: "contact_wedding" | "giveaway_engagement"
  - page_section: "contact_page_form" | "landing_giveaway_form"
  - form_location: "above_fold" | "below_fold"
  - form_variant: "contact" | "giveaway" (component type)
  - language: "es" | "en"
GA4 Event: event_view_form
FB Pixel: ViewContent (with content_category="form")
```

#### Event: `lead_form_started`
```
Trigger: First field interaction (focus or input)
Data:
  - form_name: string (contact_wedding | giveaway_engagement)
  - first_field_entered: string (name | phone | date, etc.)
  - form_completion_percentage: 0 (just started)
  - time_to_start: milliseconds since form loaded
  - language: "es" | "en"
GA4 Event: event_form_start
FB Pixel: InitiateCheckout (adapted for lead form)
```

#### Event: `lead_form_field_filled`
```
Trigger: After each field is completed/validated
Data:
  - form_name: string
  - field_name: string (name, phone, date, venue, story, etc.)
  - field_completion_order: integer (1, 2, 3...)
  - form_completion_percentage: integer (0-100)
  - time_on_field: seconds (time user spent in that field)
  - language: "es" | "en"
GA4 Event: event_form_progress
FB Pixel: (Don't send per field — use on final submission)
**Note:** Every field sent to GA4 to identify problematic fields
```

#### Event: `lead_form_completed`
```
Trigger: All required fields filled correctly (validation pass)
Data:
  - form_name: string
  - form_completion_percentage: 100
  - total_form_time: seconds (time from load to complete)
  - language: "es" | "en"
  - fields_completed: [array of field names]
GA4 Event: event_form_complete
FB Pixel: AddToCart (adapted — PreparingCheckout)
```

#### Event: `lead_form_submitted` ⭐ **CRITICAL**
```
Trigger: User clicks "Enviar por WhatsApp" button
Data:
  - form_name: string (contact_wedding | giveaway_engagement)
  - conversion_type: "whatsapp_lead"
  - lead_value: 1 (count this as a lead)
  - language: "es" | "en"
  - form_completion_time: seconds
  - form_fields_count: integer
  - wedding_date_urgency: "immediate" | "6_months" | "1_year_plus" (inferred from date field)
  - has_photographer: string (yes/no/maybe)
  - budget_signal: string (if provided)
  - content_quality: "high" | "medium" | "low" (inferred from story length)
GA4 Event: purchase (use as conversion event)
FB Pixel: Purchase (with value=1, currency="USD")
Recommendation: Set as primary conversion event in GA4 + FB Ads
```

#### Event: `lead_form_whatsapp_opened` ⭐ **CRITICAL**
```
Trigger: WhatsApp link actually opens (window.open success)
Data:
  - form_name: string
  - conversion_type: "whatsapp_confirmed"
  - lead_value: 1
  - language: "es" | "en"
GA4 Event: view_item (or custom purchase_delivery)
FB Pixel: Purchase (final confirmation pixel)
Note: This is the "confirmed" conversion — sent directly to WhatsApp
```

#### Event: `lead_form_error`
```
Trigger: WhatsApp fails to open (popup blocked, etc.)
Data:
  - form_name: string
  - error_type: string (popup_blocked, invalid_number, etc.)
  - attempted_action: "whatsapp_click" | "copy_message"
GA4 Event: exception
FB Pixel: (Don't send)
Note: Helps diagnose UX issues
```

#### Event: `lead_form_message_copied`
```
Trigger: User clicks "Copiar Mensaje"
Data:
  - form_name: string
  - copy_attempt_number: integer (1st, 2nd, etc.)
GA4 Event: share (adapted)
FB Pixel: (Don't send)
Note: Fallback conversion indicator
```

---

### **B. Content Engagement Events**

#### Event: `page_scroll_milestone`
```
Trigger: User scrolls to 25%, 50%, 75%, 100% of page
Data:
  - page_path: string
  - scroll_percentage: integer (25, 50, 75, 100)
  - scroll_time: seconds (time to reach milestone)
  - engagement_level: "low" | "medium" | "high"
GA4 Event: scroll
FB Pixel: (Don't send)
Note: Identify high-engagement visitors as warm leads
```

#### Event: `portfolio_gallery_interaction`
```
Trigger: User opens lightbox gallery
Data:
  - gallery_type: "portfolio_main" | "homepage_carousel" | "services_gallery"
  - page_location: string (/es/portfolio, /es, /es/services)
  - language: "es" | "en"
GA4 Event: view_item_list
FB Pixel: ViewContent
```

#### Event: `portfolio_image_view`
```
Trigger: User views image in lightbox
Data:
  - gallery_type: string
  - image_index: integer (1, 2, 3...)
  - image_category: string (wedding, couples, editorial, etc.)
  - time_viewed: seconds
GA4 Event: view_item
FB Pixel: ViewContent
Note: High image engagement = qualified lead signal
```

#### Event: `services_section_view`
```
Trigger: Services packages section reaches viewport
Data:
  - page_path: string
  - section_name: "packages_showcase"
  - language: "es" | "en"
GA4 Event: view_item_list
FB Pixel: ViewContent
```

#### Event: `services_package_interest`
```
Trigger: User hovers over or clicks package card
Data:
  - package_name: string (Clásica, Premium, etc.)
  - package_id: string
  - action_type: "hover" | "click"
  - interaction_count: integer (how many times viewed)
GA4 Event: view_item
FB Pixel: ViewContent
Note: Track package preference for retargeting
```

#### Event: `cta_click`
```
Trigger: User clicks any major CTA button
Data:
  - cta_text: string ("Cotizar", "Conocer paquetes", "Reservar", etc.)
  - cta_section: string (hero, services, investment, footer, etc.)
  - cta_link_target: string (/contact, /services, etc.)
  - page_location: string
  - language: "es" | "en"
GA4 Event: view_promotion
FB Pixel: ViewContent (with content_category="cta")
```

---

### **C. Campaign-Specific Events**

#### Event: `campaign_engagement_giveaway_view`
```
Trigger: Landing page `/landing/engagement-giveaway` loads
Data:
  - campaign_slug: "engagement-giveaway"
  - campaign_name: "Engagement Session Giveaway"
  - language: "es" | "en"
  - utm_source: string (if available)
  - utm_medium: string (if available)
  - utm_campaign: string (if available)
GA4 Event: view_item (with item_id=campaign_slug)
FB Pixel: ViewContent (with content_category="campaign_landing")
Note: Track which traffic source drives giveaway signups
```

#### Event: `campaign_engagement_giveaway_signup`
```
Trigger: User submits giveaway form & opens WhatsApp
Data:
  - campaign_slug: "engagement-giveaway"
  - campaign_name: "Engagement Session Giveaway"
  - lead_value: 1
  - language: "es" | "en"
  - campaign_source: utm_source (to identify ad performance)
GA4 Event: purchase (set as conversion event)
FB Pixel: Purchase
Note: Primary metric for campaign ROI calculation
```

---

## PART 5: TECHNICAL IMPLEMENTATION MAP

### **Phase 1: Foundation** (Week 1)
- [ ] Initialize GA4 gtag script in `src/app/layout.tsx`
- [ ] Initialize Meta Pixel script in `src/app/layout.tsx`
- [ ] Create utility function `lib/analytics.ts` with event tracking helpers
- [ ] Test events in GA4 Realtime + Pixel Test Events tool

### **Phase 2: Form Events** (Week 2)
- [ ] Add `lead_form_view` to `ContactFormClient.tsx` + `GiveawayLeadForm.tsx`
- [ ] Add `lead_form_started` on first field interaction
- [ ] Add `lead_form_field_filled` for each field
- [ ] Add `lead_form_completed` on last field validation
- [ ] Add `lead_form_submitted` on WhatsApp click ⭐
- [ ] Add `lead_form_whatsapp_opened` on window.open success
- [ ] Add error tracking for WhatsApp failures

### **Phase 3: Engagement Events** (Week 3)
- [ ] Add scroll tracking to `page.tsx` components
- [ ] Add gallery interaction events to `PortfolioLightbox.tsx`
- [ ] Add package interest tracking to `PackagesShowcase.tsx`
- [ ] Add CTA tracking to all button components

### **Phase 4: Campaign Events** (Week 4)
- [ ] Add campaign-specific events to `LandingPageClient.tsx`
- [ ] Validate UTM parameter passing
- [ ] Test campaign conversion flow end-to-end

### **Phase 5: GA4 Configuration** (Week 4)
- [ ] Set `lead_form_submitted` as primary conversion event
- [ ] Set `campaign_engagement_giveaway_signup` as secondary event
- [ ] Create funnel analysis: View → Started → Completed → Submitted
- [ ] Create audience: "Warm Leads" (high scroll + form interaction)
- [ ] Setup automatic alerts for conversion rate drops

### **Phase 6: Meta Ads Setup** (Week 5)
- [ ] Create Pixel audience from conversion events
- [ ] Create lookalike audience based on converters
- [ ] Create retargeting audience for site visitors
- [ ] Tag giveaway campaign campaign_id in all events

---

## PART 6: KEY PERFORMANCE INDICATORS (KPIs)

### **Dashboard Metrics to Monitor Weekly**

| KPI | Target | Current | Tools |
|-----|--------|---------|-------|
| **Form Completion Rate** | 40%+ | Unknown | GA4 Funnel |
| **Form Submission Rate** | 80%+ of completions | Unknown | GA4 Funnel |
| **WhatsApp Conversion Rate** | 90%+ of submissions | Unknown | GA4 + FB Events |
| **Page Engagement (Avg. Scroll)** | 50%+ of page | Unknown | GA4 Scroll |
| **Portfolio Engagement Rate** | 30%+ gallery opens | Unknown | GA4 Events |
| **Campaign Signup Rate** | 2-4% | Unknown | Campaign Events |
| **Lead Volume (Weekly)** | 5-15 leads/week | 0 tracked | GA4 Conversions |
| **Cost Per Lead (if ads)** | < $50 | N/A | FB Ads + GA4 |
| **Lead-to-Booking Rate** | Track in CRM | N/A | Manual + CRM |

---

## PART 7: AUDIENCE SEGMENTATION

### **Audience 1: "High-Interest Leads"**
- Conditions:
  - Submitted form (lead_form_submitted event)
  - Opened WhatsApp (lead_form_whatsapp_opened event)
- Use Case: Retarget with testimonials, package highlights
- Facebook: Create lookalike audience

### **Audience 2: "Warm Engagement"**
- Conditions:
  - Scrolled 75%+ on homepage
  - Viewed portfolio gallery (3+ images)
  - Did NOT submit form
- Use Case: Retarget with CTAs, social proof

### **Audience 3: "Cold Traffic Browsers"**
- Conditions:
  - Visited site
  - Did NOT scroll beyond 25%
  - Did NOT interact with gallery
- Use Case: Disqualify from high-budget ad campaigns

### **Audience 4: "Campaign Participants"**
- Conditions:
  - Visited landing page (campaign_engagement_giveaway_view)
  - Submitted giveaway form (campaign_engagement_giveaway_signup)
- Use Case: Nurture, send guide, track warranty

---

## PART 8: CONVERSION TRACKING IN FACEBOOK ADS

### **Conversion Events to Setup in Events Manager**

| Event | Facebook Event | Pixel Priority | Use in Ads |
|-------|---|---|---|
| `lead_form_submitted` | **Purchase** | ⭐⭐⭐ High | Primary conversion |
| `lead_form_whatsapp_opened` | **Purchase** | ⭐⭐⭐ High | Track confirmation |
| `lead_form_completed` | **AddToCart** | ⭐⭐ Medium | Warm audience |
| `campaign_engagement_giveaway_signup` | **Purchase** | ⭐⭐⭐ High | Campaign ROI |
| `services_package_interest` | **ViewContent** | ⭐ Low | Audience building |
| `page_scroll_milestone` (75%+) | **ViewItem** | ⭐ Low | Warm audience |

---

## PART 9: PRIVACY & COMPLIANCE

- **GDPR Compliant:**
  - No PII collected in GA4 events (names, emails hashed if needed)
  - Pixel events do NOT include form field values
  - User consent honored via `cookieConsent` checks before firing events

- **Meta Compliance:**
  - All events use Facebook's standard event names
  - Parameter values are generic (form_name = "contact_wedding", NOT actual names)
  - Requires Meta Pixel Helper validation

- **Recommendation:**
  - Add cookie consent banner before firing tracking pixels
  - Implement Google Consent Mode for GDPR

---

## PART 10: BUSINESS OUTCOMES & ROI

### **Success Metrics (3-Month Horizon)**

✅ **By End of Month 1:**
- Establish baseline: form completion rates, drop-off points
- Identify weakest conversion stage (e.g., "form started but not completed")
- Fix UX friction (long fields, unclear requirements)

✅ **By End of Month 2:**
- Launch retargeting campaigns to site visitors
- Create lookalike audiences from converters
- See 15-20% improvement in form completion rate

✅ **By End of Month 3:**
- Measure lead-to-booking conversion (manual CRM tracking)
- Calculate revenue per lead
- Optimize ad spend based on campaign performance
- Expect 5-10 qualified leads/week (if running ads)

### **Recommended Ad Budget Allocation**
- 50% → Top funnel (awareness) → Retarget to cold/warm audiences
- 30% → Mid funnel (consideration) → Remarket services to portfolio viewers
- 20% → Conversion (action) → Drive to giveaway campaign

---

## NEXT STEPS

**Immediate Action Items:**
1. ✅ Approve this strategy document
2. ⏳ **WEEK 1:** Initialize GA4 + Pixel scripts
3. ⏳ **WEEK 2:** Implement form event tracking (critical path)
4. ⏳ **WEEK 3:** Launch engagement events
5. ⏳ **WEEK 4:** Setup GA4 dashboards + alerts
6. ⏳ **WEEK 5:** Launch Facebook pixel audiences + retargeting

**Resources Needed:**
- GA4 property admin access
- Facebook Business Manager + Pixel admin access
- Developer time (~20-30 hours total)
- Analytics review time (~3 hours/week ongoing)

---

## Appendix: Quick Reference — Event Implementation Checklist

### **Critical Events (Must Have)**
- [ ] `lead_form_view` — When form visible
- [ ] `lead_form_started` — First field
- [ ] `lead_form_completed` — All fields filled
- [ ] `lead_form_submitted` — **WhatsApp click ⭐**
- [ ] `lead_form_whatsapp_opened` — **WhatsApp confirmed ⭐**
- [ ] `campaign_engagement_giveaway_signup` — **Campaign conversion ⭐**

### **High-Priority Events**
- [ ] `page_scroll_milestone` — Engagement depth
- [ ] `portfolio_gallery_interaction` — Gallery opens
- [ ] `services_package_interest` — Package clicks
- [ ] `campaign_engagement_giveaway_view` — Landing page views

### **Optional/Nice-to-Have**
- [ ] `lead_form_field_filled` — Per-field tracking
- [ ] `portfolio_image_view` — Image-level tracking
- [ ] `cta_click` — CTA source tracking
- [ ] `lead_form_message_copied` — Fallback tracking

---

**Document prepared for:** Strategic Planning & Implementation  
**Prepared by:** Business Strategy Agent  
**Next review:** After Month 1 implementation + data collection
