# Metrics & Analytics Analysis — Session Notes
## Oscar OLG Photography — April 2, 2026

---

## Key Findings

### Current State Assessment
- **GA4:** Configured (`G-9R700K0V4Q`) but NO JavaScript implementation
- **Meta Pixel:** Configured (`302412685636304`) but NO JavaScript implementation
- **Vercel Analytics:** Only tracking page views + Web Vitals, not conversions
- **Result:** Complete blind spot on lead generation funnel

### Critical Gaps Identified
1. **Zero conversion tracking** — Can't measure form submissions
2. **No engagement metrics** — Can't see which content drives interest
3. **Attribution impossible** — Can't identify best traffic sources
4. **Campaign metrics missing** — Can't measure lead magnet effectiveness
5. **Form friction invisible** — Can't optimize conversion funnel

---

## Business Conversion Funnel Mapped

```
Homepage/Portfolio/About (Awareness)
    ↓ [TRACK: Page scroll, section views]
Services Page (Consideration)
    ↓ [TRACK: Package interest, time spent]
Contact/Landing Form (Decision)
    ↓ [TRACK: Form view, field starts, completion]
WhatsApp Click → Form Submitted (Action)
    ↓ [TRACK: Submission event, WhatsApp open]
LEAD CONVERSION (Revenue touchpoint)
```

### Key Decision Points (Micro-Conversions)
- Form visibility
- First field interaction
- Form field completion
- Form submission (WhatsApp click) ⭐ PRIMARY
- WhatsApp window opened ⭐ CONFIRMED

### Lead Quality Signals (Inferred from Form)
- Wedding date urgency (< 6 months = high priority)
- Story detail/length (detailed = serious lead)
- Budget disclosure (if provided)
- Photographer status (already has/considering)

---

## Event Tracking Architecture Designed

### Event Categories

**A. Form Events (Most Important)**
- `lead_form_view` — When form enters viewport
- `lead_form_started` — First field interaction
- `lead_form_field_filled` — Each field completed
- `lead_form_completed` — All fields filled
- `lead_form_submitted` ⭐ — WhatsApp button clicked
- `lead_form_whatsapp_opened` ⭐ — Confirmed conversion
- `lead_form_error` — WhatsApp failures

**B. Engagement Events**
- `page_scroll_milestone` — 25%, 50%, 75%, 100%
- `portfolio_gallery_open` — Gallery interaction
- `portfolio_image_view` — Individual images
- `services_package_interest` — Package hover/click
- `cta_click` — CTA source tracking

**C. Campaign Events**
- `campaign_engagement_giveaway_view` — Landing page view
- `campaign_engagement_giveaway_signup` — Campaign conversion

---

## Implementation Roadmap

### 6-Week Phased Approach

| Phase | Focus | Effort | Timeline |
|-------|-------|--------|----------|
| 1 | GA4 + Pixel initialization | 6-8h | Week 1 |
| 2 | Form event tracking | 6-8h | Week 2 |
| 3 | Engagement event tracking | 5-6h | Week 3 |
| 4 | Campaign events | 3-4h | Week 4 |
| 5 | GA4 dashboards + config | 3-4h | Week 4-5 |
| 6 | Meta Pixel setup | 2-3h | Week 5 |

**Total Effort:** 28-37 developer hours (~3.5 days across 5-6 weeks)

---

## Key Metrics to Monitor (Weekly)

1. **Form Completion Rate** — % of starters who complete
2. **Form Submission Rate** — % of completions who submit
3. **WhatsApp Open Rate** — % of submissions opening chat
4. **Scroll Engagement** — % scrolling 75%+ of page
5. **Portfolio Engagement** — % opening gallery, images viewed
6. **Lead Volume** — Conversions per week baseline
7. **Campaign Conversion Rate** — Giveaway signup rate %
8. **Cost Per Lead** — If running paid ads

---

## Business Outcomes (Potential)

### 3-Month Horizon
- **Week 1:** Baseline metrics established
- **Week 3:** Form friction points identified
- **Week 5:** Top traffic sources known
- **Week 8:** 10-20% form completion improvement (optimization launched)
- **Week 12:** Lead volume trending upward

### ROI Calculation
- Dev cost: ~$3,500 (3.5 days @ $1,000/day)
- Ad efficiency gain: 20-40% improvement
- Monthly ad spend: $500-5,000 typical
- Payback: 1-2 months from improved campaign performance
- Year 1 value: $7,200-24,000 recovered efficiency

---

## Critical Implementation Details

### GA4 Setup
- Initialize gtag in `src/app/layout.tsx` head
- Set `purchase` event as primary conversion
- Create funnel: view → start → complete → submit
- Create custom audience for retargeting

### Meta Pixel Setup
- Initialize fbq script in `src/app/layout.tsx`
- Map `purchase` event to Pixel conversion
- Create lookalike audience from converters
- Test with Pixel Helper extension before launch

### Form Integration
- Track time from form load to each milestone
- Infer urgency/quality from form data
- Send combined events to GA4 + Pixel
- Handle WhatsApp success/failure states

### Engagement Tracking
- Use Intersection Observer for form visibility
- Use ResizeObserver for scroll tracking
- Track gallery opens + image views
- Track package hover + click interactions

---

## Technical Documentation Created

1. **ANALYTICS_STRATEGY.md**
   - 15-page comprehensive business strategy
   - Event specifications with data fields
   - Conversion funnel mapping
   - Audience segmentation strategy
   - GA4 + Meta Pixel setup guide

2. **ANALYTICS_IMPLEMENTATION.md**
   - Technical implementation roadmap
   - Code templates for `src/lib/analytics.ts`
   - Integration instructions for each component
   - Testing checklist
   - Rollout plan + monitoring

3. **ANALYTICS_EXECUTIVE_SUMMARY.md** (this file's companion)
   - High-level business case
   - ROI analysis
   - Approval recommendations
   - Risk mitigation
   - Timeline + deliverables

---

## Next Steps

### Immediate (This Week)
- [ ] Review all three analytics documents
- [ ] Ask clarifying questions
- [ ] Approve 6-week implementation plan

### Week 1 (Kickoff)
- [ ] Begin Phase 1: GA4 + Pixel initialization
- [ ] Create `src/lib/analytics.ts` utility module
- [ ] Deploy scripts to `src/app/layout.tsx`
- [ ] Test with GA4 DebugView + Pixel Helper

### Week 2 (Forms)
- [ ] Integrate form events to ContactFormClient.tsx
- [ ] Integrate form events to GiveawayLeadForm.tsx
- [ ] Test form funnel in GA4 Realtime
- [ ] Monitor for data quality issues

### Week 3-4 (Engagement)
- [ ] Add scroll tracking to key pages
- [ ] Add portfolio gallery events
- [ ] Add package interest tracking
- [ ] Setup GA4 dashboards

### Week 5-6 (Campaign + Pixel)
- [ ] Add campaign landing page events
- [ ] Configure GA4 conversions
- [ ] Setup Meta Pixel audiences
- [ ] Prepare for retargeting launches

---

## Key Decisions Made

1. ✅ **Event Architecture:** Form events primary, scroll/engagement secondary
2. ✅ **Conversion Definition:** WhatsApp click = conversion (form_submitted)
3. ✅ **Data Model:** Send quality signals (urgency, content quality) in events
4. ✅ **Funnel Structure:** 4-step funnel (view → start → complete → submit)
5. ✅ **Meta Pixel:** Use as secondary confirmation (GA4 primary)
6. ✅ **Audience Strategy:** Create warm, hot, cold segments for retargeting

---

## Implementation Assumptions

- Next.js 16 supports modern JavaScript (✅)
- GA4 + Meta events can be fired client-side (✅)
- Form components are React functional (✅)
- No privacy blocking from ad blockers expected (✅)
- Sandbox environment needed for testing (⏳ setup after Phase 1)

---

## Success Criteria

**Technical:**
- GA4 tracking 95%+ form submissions
- Meta Pixel tracking 90%+ conversions
- Scroll events capturing engagement data
- Campaign attribution working end-to-end

**Business:**
- Form completion rate identified
- Top traffic source known
- Funnel bottleneck discovered
- GA4 dashboard in weekly use
- First optimization deployed

**Revenue:**
- Baseline lead volume established
- Lead quality signals validated
- 10-20% efficiency gain demonstrated
- Ad spend ROI calculated

---

## References & Related Docs

- **BUSINESS_RULES.md** — Brand voice + positioning (wedding photography premium market)
- **PACKAGES.md** — Service structure (4 main packages, 5 complementos)
- **SERVICE_STRUCTURE_ANALYSIS.md** — Current service catalog analysis
- **.env.local** — GA4 + Pixel IDs configured + ready

---

## Document Cross-Reference Map

```
ANALYTICS_EXECUTIVE_SUMMARY.md (High-level overview)
├─ For stakeholders/approval
├─ Quick business case
└─ Timeline + ROI

ANALYTICS_STRATEGY.md (Detailed business strategy)
├─ Event specifications (40+ events defined)
├─ Conversion funnel mapping
├─ Audience segments
├─ GA4 + Meta setup guide
└─ KPI dashboard specs

ANALYTICS_IMPLEMENTATION.md (Technical roadmap)
├─ Phase 1-6 breakdown
├─ Code templates (analytics.ts)
├─ Component integration guide
├─ Testing + rollout
└─ Monitoring plan

This Session Notes (Context)
├─ Key findings + gaps
├─ Architecture decisions
├─ Implementation timeline
└─ Success criteria
```

---

**Session Status:** ✅ Complete — Ready for stakeholder review  
**Next Action:** Approval conversation on 6-week implementation plan  
**Questions:** See detailed strategy docs for specifics
