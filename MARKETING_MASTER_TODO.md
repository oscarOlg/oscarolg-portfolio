# Marketing Master TODO

Last updated: 2026-03-22
Owner: Oscar Olg Photography

## How to use this file
- Use this as the single source of truth for all marketing implementation tasks.
- Mark tasks with [x] when done.
- Keep deferred setup tasks here so they are not lost.
- Add notes under each phase as you discover new requirements.

## Status legend
- [ ] Pending
- [x] Done
- [~] In progress
- [>] Deferred (planned, not doing now)

## Phase 1 - Critical Quick Wins

### 1.1 Contact form quality gate
- [x] Require package selection when a selected service has available packages
- [x] Show validation error if package is missing
- [x] Add urgency copy near submit CTA
- [x] Manually test: service selected + no package should block submit

### 1.2 Confirmation email flow (EmailJS)
- [x] Keep owner notification email send in place
- [x] Add customer confirmation email send after owner email
- [x] Add fallback so failed confirmation email does not block lead creation
- [>] Create EmailJS customer template in dashboard
- [>] Add NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID in .env.local
- [>] Manual test: submit form and confirm customer email arrives

### 1.3 Analytics and tracking foundation (GA4 + Meta Pixel)
- [x] Add analytics helper utilities in code
- [x] Add GA4 loader script component
- [x] Add Meta Pixel loader script component
- [x] Mount analytics script loader in app layout
- [x] Track form submission event to GA4
- [x] Track Lead event to Meta Pixel
- [>] Create GA4 property and get measurement ID
- [>] Create Meta Pixel and get pixel ID
- [>] Add NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
- [>] Add NEXT_PUBLIC_FB_PIXEL_ID in .env.local
- [>] Validate GA4 real-time event after test form submit
- [>] Validate Meta Lead event in Events Manager

### 1.4 Testimonials collection (manual business tasks)
- [ ] Build list of clients from last 6-12 months
- [ ] Send WhatsApp outreach message to request testimonials
- [ ] Create and share Google Form for testimonial collection
- [ ] Collect consent to publish name and photo
- [ ] Approve at least 5 testimonials for website use

### 1.5 Homepage social proof
- [x] Create Testimonials section component
- [x] Fetch featured testimonials on homepage
- [x] Render section only when testimonials exist
- [x] Add seed script for testimonials
- [x] Add npm script to run testimonial seed
- [>] Run seed:testimonials against Sanity dataset
- [>] Replace placeholder testimonials with real approved client testimonials
- [ ] Manually test homepage on desktop and mobile

### Phase 1 verification checklist
- [ ] Contact form validation works for missing package
- [ ] Urgency message is visible and clear
- [ ] Customer confirmation email is delivered within 2 minutes
- [ ] GA4 scripts load only when env var is set
- [ ] Meta Pixel script loads only when env var is set
- [ ] GA4 form event is visible in real-time dashboard
- [ ] Meta Lead event is visible in Events Manager
- [ ] Featured testimonials render correctly and responsively

### Phase 1 notes
- Existing unrelated lint error remains in src/contexts/LanguageContext.tsx and does not block this marketing scope.
- **EmailJS subscription limit reached**: Need to either upgrade plan or migrate to Gmail SMTP/SendGrid/Mailgun. Deferred pending provider decision.
- **Execution order update**: Keep GA4 and Meta Pixel setup/validation for the end, after implementation tasks are complete.
- Add any new Phase 1 tasks here as they appear.

---

## Phase 2 - Service-specific landing pages

### 2.1 Dynamic landing page architecture
- [x] Create dynamic route: src/app/landing-page/[service]/page.tsx
- [x] Create reusable hero component
- [x] Create reusable benefits component
- [x] Create reusable FAQ component
- [x] Create bilingual landing content map for all services
- [x] Add service gallery preview section
- [x] Add filtered testimonial section per service
- [x] Add pricing section per service
- [x] Add urgency block with soft scarcity copy
- [x] Add contact CTA and WhatsApp CTA
- [x] Add CTA links that prefill contact form service and package

### 2.2 Landing page quality and tracking
- [x] Add UTM support and event tracking for landing page traffic
- [ ] Validate responsive behavior on mobile and desktop
- [x] Validate language toggle behavior for ES and EN
- [ ] Validate page performance and image loading quality
- [ ] Validate UTM attribution end-to-end from landing page to contact submission

### 2.2.1 QA checklist by landing route

#### Test URL template
- [ ] Prepare test URL format: /landing-page/{service}?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a

#### Global checks (run on every service route)
- [ ] Page loads without console errors
- [ ] Hero, benefits, gallery, testimonials, packages, urgency, and FAQ render correctly
- [ ] CTA buttons are visible and clickable
- [ ] Contact CTA opens contact page with service and package prefilled
- [ ] Contact CTA keeps UTM params in the URL
- [ ] GA event fires: landing_page_view
- [ ] GA event fires on CTA click: landing_cta_click
- [ ] Meta event fires: ViewContent on page load
- [ ] Meta event fires: Lead on CTA click
- [ ] Language toggle updates all major blocks (ES and EN)
- [ ] Mobile layout (390x844) has no overflow or clipped sections
- [ ] Desktop layout (1440x900) keeps hierarchy and spacing
- [ ] Performance check: LCP image loads fast and no broken images

#### Service routes to validate
- [ ] weddings
- [ ] portrait
- [ ] couples
- [ ] maternity
- [ ] commercial
- [ ] editorial

#### QA execution log template
- Date:
- Route:
- Device:
- URL used:
- ES check: Pass/Fail
- EN check: Pass/Fail
- UTM persisted to contact link: Yes/No
- GA events seen: Yes/No
- Meta events seen: Yes/No
- Visual issues found:
- Fix needed:

#### Completion criteria for Phase 2.2
- [ ] All 6 routes pass global checks on mobile and desktop
- [ ] UTM attribution confirmed from landing page to contact page for all routes
- [ ] GA and Meta events validated with screenshots
- [ ] Any issues found are converted into TODO items under Phase 2 notes

### 2.2.2 QA run commands and step-by-step verification

#### Local run
- [ ] Start app locally: npm run dev
- [ ] Open browser: http://localhost:3000

#### Route + UTM quick test links
- [ ] weddings: http://localhost:3000/landing-page/weddings?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a
- [ ] portrait: http://localhost:3000/landing-page/portrait?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a
- [ ] couples: http://localhost:3000/landing-page/couples?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a
- [ ] maternity: http://localhost:3000/landing-page/maternity?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a
- [ ] commercial: http://localhost:3000/landing-page/commercial?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a
- [ ] editorial: http://localhost:3000/landing-page/editorial?utm_source=facebook&utm_medium=cpc&utm_campaign=phase2_test&utm_content=creative_a

#### In-page verification flow (repeat per service)
- [ ] Load route with UTM params
- [ ] Toggle language ES -> EN -> ES and confirm major blocks update
- [ ] Click package CTA and confirm contact URL includes: service, packageId, utm_source, utm_medium, utm_campaign, utm_content
- [ ] Return and click urgency CTA and confirm UTM params are still present
- [ ] Click WhatsApp CTA and confirm it opens wa.me link

#### GA4 verification
- [ ] Open GA4 Realtime report
- [ ] Confirm event appears: landing_page_view
- [ ] Confirm event appears after CTA click: landing_cta_click
- [ ] Capture screenshot per service (or one screenshot showing each event with service label)

#### Meta verification
- [ ] Open Meta Events Manager (test events)
- [ ] Confirm ViewContent fires on landing load
- [ ] Confirm Lead fires on CTA click
- [ ] Capture screenshot of event timeline

#### Responsive + performance spot checks
- [ ] Mobile check (390x844): no clipped text, no horizontal overflow, CTA visible above fold
- [ ] Desktop check (1440x900): visual hierarchy and spacing are correct
- [ ] Lighthouse quick pass on one route (weddings) and log major issues only

#### Optional terminal helpers
- [ ] Production lint snapshot: npm run lint
- [ ] Production build smoke test: npm run build

### 2.3 Meta campaign launch prerequisites
- [x] Build wedding-first campaign links with UTM parameters
- [ ] Prepare at least 3 ad creative variants
- [ ] Confirm conversion objective setup in Ads Manager
- [ ] Confirm pixel receives Lead event before launch

Code refs:
- Campaign links helper: src/lib/campaign-links.ts

### Phase 2 notes
- Add service-specific objections and FAQ updates as they come from real leads.

---

## Phase 3 - Lead magnet and WhatsApp capture

### 3.1 Lead magnet asset creation
- [ ] Create wedding guide PDF (15-20 pages)
- [ ] Upload final guide to stable URL (site or drive)
- [ ] Add final CTA in guide to WhatsApp consult

### 3.2 Capture mechanism
- [x] Create lead magnet page: src/app/recursos/guia-bodas/page.tsx
- [x] Add WhatsApp click-to-chat CTA with prefilled message
- [x] Add trust indicators and delivery expectation text

### 3.3 Distribution
- [x] Add lead magnet CTA on homepage
- [x] Add CTA on relevant landing pages
- [ ] Add CTA to Instagram bio
- [ ] Add CTA to Facebook page pinned content

Prepared UTM links for social distribution (copy when ready):
- Instagram bio: https://oscarolg.com/recursos/guia-bodas?utm_source=instagram&utm_medium=bio&utm_campaign=lead_magnet&utm_content=profile_link
- Facebook pinned post: https://oscarolg.com/recursos/guia-bodas?utm_source=facebook&utm_medium=social&utm_campaign=lead_magnet&utm_content=pinned_post

### Phase 3 notes
- Track which channel drives the highest WhatsApp starts.

---

## Phase 4 - WhatsApp nurture system

### 4.1 Messaging sequence
- [x] Finalize 5-message sequence (Day 0, 3, 6, 8, 10)
- [x] Prepare reusable message templates with placeholders
- [x] Add response playbook for common objections

Code refs:
- Sequence + playbook templates: src/lib/whatsapp-sequence.ts

### 4.2 Execution model
- [ ] Decide manual vs automation tool
- [ ] If automation: set up provider account and message flow
- [ ] Test full sequence with internal number before rollout

### 4.3 Optimization
- [ ] Track response rate by message step
- [ ] Track consult-booking rate from sequence
- [ ] Adjust timing and copy every 2 weeks

### Phase 4 notes
- Keep all copy experiments logged with date and result.

---

## Deferred setup queue (do later, do not forget)
- [>] **Resolve EmailJS subscription limit**: Choose between upgrade plan or migrate to Gmail SMTP/SendGrid/Mailgun
- [>] Configure GA4 account and measurement ID
- [>] Configure Meta Pixel and verify base PageView event
- [>] Create EmailJS confirmation template and map variables (or update code for new provider)
- [>] Add all required env values to .env.local
- [>] Run end-to-end submission test after env setup
- [>] Capture screenshots of GA4 and Meta validation as proof

---

## Change log
- 2026-03-22: Created master TODO document for all phases and deferred setup tracking.
- 2026-03-22: Started Phase 2 and shipped dynamic landing page scaffold with reusable components and bilingual content.
- 2026-03-22: Added Phase 2.2 QA matrix with per-route validation checklist and execution log template.
- 2026-03-22: Added Phase 2.2 QA run commands and step-by-step GA/Meta verification flow.
