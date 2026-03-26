# Session Memory: Oscar OLG Photography Business Restructure
**Date Started**: March 25, 2026  
**Project**: 6-week business restructuring (Portraits 70% + Weddings 30%)  
**Status**: Week 1 Code Implementation - STARTING

---

## STRATEGIC DECISIONS (APPROVED ✅)

### Business Goals
- ✅ Revenue target: $180K-240K MXN annually
- ✅ Portrait focus: 70% (6-7 shoots/month)
- ✅ Wedding focus: 30% (2 weddings/month)
- ✅ Geographic: Juárez only
- ✅ Customer profile: Middle market → high-end growth potential

### Positioning
- ✅ Differentiator: Comfort-building + posing guidance (non-models)
- ✅ Brand promise: "You're not a model. Here, you don't need to be."
- ✅ Core problem solved: Camera nervousness → Confidence
- ✅ Language: Spanish primary, English secondary

### Service Structure
- ✅ Hide: Commercial, Editorial (keep hidden from main nav)
- ✅ Feature: Portraits + Weddings ONLY
- ✅ Nest under Portraits: Couples, Maternity, XV, Concept (not separate pages)

### Contact & Lead Generation
- ✅ Primary funnel: WhatsApp (was #1 blocker - zero conversions)
- ✅ WhatsApp number: +526562932374 (from codebase)
- ✅ Remove: Email contact form completely
- ✅ Lead magnets: 2 PDFs (Portraits + Weddings guides) + 3 landing pages

### Pricing Strategy (Updated)
**Portraits**:
- Esencial: $1,800 → **$1,800** (keep, but emphasize Classic)
- Clásico: $1,800 → **$2,100** (most popular, promoted)
- Premium: $2,000 → **$2,400** (editorial, 2 hours)

**Weddings**:
- Esencial: $8,000 → **$8,500** (6 hours)
- Clásico: $10,000 → **$10,500** (8 hours, popular)
- Premium: $12,000 → **$12,500** (10 hours)
- Pre-wedding: $2,700 (no change)

**Add-ons**: Keep simple (extra hours, prints, albums)

---

## HERO MESSAGING (FINAL)

### Hero Copy (Combination of Options 2 & 3)
**Main**: "No eres modelo. Aquí no necesitas serlo."  
**English**: "You're not a model. Here, you don't need to be."  
**Italic sub**: "la esencia de tu historia" / "the essence of your story"  

**Investment Section**: Keep current (already approved)  
"La tranquilidad de estar en buenas manos" / "The peace of mind of being in good hands"

---

## PORTFOLIO STRUCTURE (NEW)

```
portfolio-images/
├── portraits/ (all types under this)
│   ├── individual/
│   ├── couples/
│   ├── groups/
│   ├── maternity/
│   ├── graduation/
│   └── concepts/
├── weddings/
│   ├── pre-wedding/
│   ├── ceremony/
│   ├── reception/
│   └── full-day/
└── testimonials/
```

**Status**: Oscar to reorganize files (action item)

---

## LEAD MAGNET STRATEGY

### Format: PDFs (designed by Oscar) + Landing Pages (I build)

**Lead Magnet #1**: "Guía de Retratos" (Portraits guide)
- PDF: Oscar designs in Canva (5-8 pages)
- Landing page: `/lead-magnets/guia-retratos`
- Email sequence: 3 emails (Day 1, 3, 7)
- Goal: Email capture → nurture → WhatsApp booking

**Lead Magnet #2**: "Guía de Bodas" (Weddings guide)
- PDF: Oscar designs in Canva (6-10 pages)
- Landing page: `/lead-magnets/guia-bodas`
- Email sequence: 3 emails (Day 1, 2, 5)
- Goal: Email capture → consultation → booking

**Lead Magnet #3**: Seasonal (Graduation NOW)
- Landing page: `/sesiones-especiales/graduacion`
- Email: Simple, no PDF (just landing page)
- Promo: Free printed collection if booked by April 30
- Goal: Drive off-season portrait volume

---

## TESTIMONIALS NEEDED

**Status**: Oscar to collect from clients
- Need: 2-3 portrait + 1-2 wedding testimonials
- Format: Name, service type, 2-3 sentence quote
- Use cases: Homepage, services page, emails, galleries

---

## ANALYTICS TRACKING

### Meta Pixel
- ✅ Decision: Implement Meta Pixel for conversion tracking
- ⏳ Action: Oscar gets Pixel ID from Facebook Business Manager
- Events to track: PageView, ViewContent (portfolio), Contact (WhatsApp), Lead (magnet download)

### Seasonal Promotions
- ✅ Graduation Season NOW (March-June): Express package $2,200, free prints if booked by April 30
- 💍 Engagement Season (June-Aug): Pre-wedding session $2,700
- 🎂 Wedding Season (Aug-Nov): Full day + pre-wedding combo
- 🎄 Holiday Season (Nov-Jan): Family portraits + gift sets

---

## WEEK 1 IMPLEMENTATION PLAN

### Week 1: Funnel Fix (Hero + WhatsApp)

**Mon-Tue**: Code changes
- [ ] Update `src/app/components/HeroContent.tsx` with new hero copy
- [ ] Create `src/config/contact.ts` with WhatsApp config
- [ ] Redesign `src/app/contact/components/ContactPageClient.tsx` (WhatsApp primary)
- [ ] Update `src/app/contact/page.tsx` (remove email form)

**Wed**: Testing
- [ ] Test WhatsApp links (3 service types: Portraits, Weddings, Graduation)
- [ ] Test hero page rendering
- [ ] Test contact page layout

**Thu-Fri**: Deploy + Monitor
- [ ] Push to preview branch
- [ ] Deploy to staging
- [ ] Monitor first WhatsApp inquiries
- [ ] Collect conversion data

**Expected outcomes**:
- ✅ First WhatsApp inquiry flows through
- ✅ Hero copy tests new positioning
- ✅ Email form removed (stops friction)
- ✅ Ready for Phase 2 (service simplification)

---

## PHASE TIMELINE

| Phase | Duration | Focus | Status |
|-------|----------|-------|--------|
| Phase 1: Funnel | Weeks 1-2 | WhatsApp primary + hero copy | 🔴 THIS WEEK |
| Phase 2: Services | Weeks 2-3 | Hide Commercial/Editorial | ⏳ Next |
| Phase 3: Lead Magnets | Weeks 3-4 | PDFs + landing pages | ⏳ Next |
| Phase 4: Content | Weeks 4-5 | Portfolio + Q&A + testimonials | ⏳ Next |
| Phase 5: Analytics | Weeks 5-6 | Meta Pixel + seasonal campaigns | ⏳ Next |

---

## SUCCESS METRICS (90-Day View)

### Week 1 Target:
- 5+ WhatsApp inquiries
- 0% abandonment on new contact page
- Hero copy engagement data in Meta Pixel

### Week 4 Target:
- 15-20 total inquiries/month
- 10% of inquiries mention "comfort" or "posing"
- Lead magnets generating 20+ downloads/week

### Week 12 Target:
- 15-20% inquiry-to-booking conversion
- 5-7 portrait bookings/month
- 1-2 wedding bookings/month
- $5,000-8,000 weekly revenue

---

## BLOCKERS & RISKS

- ⚠️ **Portfolio reorganization**: Oscar must do this manually (action item)
- ⚠️ **PDF guide design**: Oscar must design in Canva (action item)
- ⚠️ **Client testimonials**: Need to collect ASAP (action item)
- ⚠️ **Email service**: Need to decide (MailerLite? Manual? Sanity-based?)

---

## RESOURCES & DOCS

**Strategic Documents**: 
- `.github/reports/BUSINESS-ANALYSIS-2026.md` — Problem diagnosis
- `.github/reports/IMPLEMENTATION-ROADMAP-PHASE1-6WEEKS.md` — Full roadmap
- `.github/reports/CODE-IMPLEMENTATION-GUIDE.md` — This week's code

**Code Files to Create**:
- [ ] `src/config/contact.ts` (NEW)
- [ ] `src/app/components/HeroContent.tsx` (UPDATE)
- [ ] `src/app/contact/components/ContactPageClient.tsx` (REDESIGN)
- [ ] `src/app/contact/page.tsx` (UPDATE)

---

## IMMEDIATE ACTION ITEMS (Before Code)

1. **Portfolio**: Will you start reorganizing `/portfolio-images/` now?
2. **PDFs**: Can you start designing "Guía de Retratos" in Canva?
3. **Testimonials**: When can you collect them?
4. **Email Service**: MailerLite, ConvertKit, or manual for now?

---

**Session created**: March 25, 2026  
**Last updated**: [Auto-update with each phase]  
**Next**: Week 1 Code Implementation (Harry starting now)
