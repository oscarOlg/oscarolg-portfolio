# Oscar OLG Photography — Complete Campaign Orchestration Guide
## How Everything Works Together (April 2026)

**Status:** Ready to launch  
**Budget:** $2,000 MXN/month  
**Goal:** 12-15 qualified leads → 1-2 wedding bookings  

---

## 📋 COMPLETE DOCUMENT MAP

You now have a complete system across 7 documents. Here's how they work together:

### **STRATEGIC LAYER** (For planning & stakeholders)
1. **ANALYTICS_STRATEGY.md**
   - Overall business intelligence framework
   - 40+ events to track across site
   - GA4 + Meta Pixel setup guide
   - **Use for:** Understanding the bigger picture, stakeholder conversations

2. **ANALYTICS_EXECUTIVE_SUMMARY.md**
   - Business case ($7,200-24,000/year ROI potential)
   - Timeline & budget requirements
   - Risk mitigation
   - **Use for:** Approval conversations, team alignment

### **CAMPAIGN LAYER** (For monthly execution)
3. **ENGAGEMENT_GIVEAWAY_CAMPAIGN.md** ⭐ YOUR MAIN PLAYBOOK
   - Lead scoring system (who to prioritize)
   - Hybrid giveaway model (free vs. early bird)
   - Budget breakdown ($2,000 → 140-180 leads/month)
   - Call script + WhatsApp sequences (overview version)
   - Conversion timeline (day-by-day)
   - Market expectations
   - **Use for:** Campaign strategy, weekly team sync, optimization decisions

### **OPERATIONAL LAYER** (For daily/weekly work)
4. **GIVEAWAY_READY_TO_USE_TEMPLATES.md** ⭐ YOUR DAILY BIBLE
   - 10 WhatsApp message templates (copy-paste ready)
   - Full 15-minute call script (word-for-word)
   - Lead tracking spreadsheet format
   - Daily checklist
   - Crisis management texts
   - **Use for:** During calls, messaging leads, scheduling

5. **GIVEAWAY_METRICS_DASHBOARD.md** ⭐ YOUR WEEKLY SCORECARD
   - Daily tracking template
   - Weekly analysis framework
   - Lead-by-lead tracking spreadsheet
   - KPI dashboard
   - Decision rules ("if CPL > $20, do this...")
   - Monthly review checklist
   - **Use for:** Friday reviews, optimization decisions, reporting

### **TECHNICAL LAYER** (For implementation)
6. **ANALYTICS_IMPLEMENTATION.md**
   - Technical roadmap (6 phases)
   - Code templates (src/lib/analytics.ts)
   - Component integration guide
   - Testing checklist
   - **Use for:** Developer reference, implementation kickoff

7. **MARKETING_ANALYTICS_AGENT.md** (`.github/agents/`)
   - Specialized agent for ongoing campaign management
   - Ad optimization strategies
   - Engagement giveaway campaign recommendations
   - Lead scoring framework
   - **Use for:** Ask for optimization advice, debug campaign issues

---

## 🎯 YOUR WORKFLOW (Week by Week)

### **WEEK 1: LAUNCH**
```
MONDAY-TUESDAY:
├─ Setup processes
│  ├─ Open GIVEAWAY_READY_TO_USE_TEMPLATES.md
│  ├─ Copy 10 WhatsApp templates to your phone or notes app
│  ├─ Print or bookmark call script (page 2 of templates)
│  └─ Create lead tracking spreadsheet (from METRICS_DASHBOARD.md)
│
├─ Create landing page
│  ├─ Use copy from ENGAGEMENT_GIVEAWAY_CAMPAIGN.md Part 4
│  ├─ Add both offer options (free vs. early bird)
│  └─ Setup form with GA4 tracking
│
└─ Launch Meta Ads
   ├─ $1,400 budget → Landing page ad
   ├─ $400 budget → Retargeting
   ├─ $200 budget → Testing
   └─ Monitor daily: CPL target <$18 MXN

WEDNESDAY-FRIDAY:
├─ First leads coming in
│  ├─ Send MSG 1 (Welcome) within 1 hour of form submission
│  ├─ Score each lead using system from CAMPAIGN.md
│  └─ Add to tracking spreadsheet
│
└─ First calls & bookings
   ├─ Use call script from TEMPLATES.md
   ├─ Track which option chosen (free vs. EBIRD)
   └─ Send booking confirmation (MSG 4)
```

### **WEEK 2-3: OPTIMIZE**
```
DAILY:
├─ Check Meta Ads dashboard (morning)
├─ Respond to new leads within 1 hour (MSG 1)
├─ Do scheduled discovery calls (use TEMPLATES script)
├─ Follow-up with booked sessions (MSG 4)
└─ Update tracking spreadsheet

FRIDAY:
├─ Weekly review (1-2 hours)
│  ├─ Open METRICS_DASHBOARD.md Part 3 (Weekly Analysis)
│  ├─ Fill in all metrics from the week
│  ├─ Calculate: CPL, form completion %, lead quality %
│  ├─ Check decision rules (if CPL > $20, pause ads)
│  └─ Document: What worked, what didn't, what to test
│
└─ Make optimization call
   ├─ Pause underperforming ads (bottom 2 performers)
   ├─ Adjust targeting if quality is low
   ├─ Improve landing page if form completion <3%
   └─ Test new ad creative if CTR dropping
```

### **WEEK 4: ANALYZE & SCALE (End of Month)**
```
FRIDAY, APRIL 26:
├─ Monthly review (METRICS_DASHBOARD.md Part 7)
│  ├─ Total leads: [__] (target: 12-15)
│  ├─ Cost per lead: $[__] (target: $12-15)
│  ├─ Sessions booked: [__] (target: 3-4)
│  ├─ Wedding bookings: [__] (target: 1-2)
│  └─ Revenue: $[__] MXN
│
└─ Decision
   ☑ CPL is good + leads are quality → SCALE BUDGET 25-50%
   ☑ CPL is okay + some quality issues → OPTIMIZE audience
   ☐ CPL is high or leads are poor → PAUSE and diagnose
```

---

## 🚀 MONTH-BY-MONTH PLAN

### **MONTH 1 (April): Learn & Perfect**
- Goal: 12-15 leads, 1-2 bookings
- Focus: Test messaging, audiences, call script
- Mindset: "What works best in MY market?"
- Budget: $2,000 MXN
- Deliverable: Clear data on conversion rates + best audience

### **MONTH 2 (May): Optimize & Scale**
- Goal: 18-25 leads (if CPL good), 2-4 bookings
- Focus: Scale winning ads, refine sequences
- Mindset: "Increase volume of what works"
- Budget: $2,500-3,000 MXN (if ROI good)
- Deliverable: Proven campaign model

### **MONTH 3 (June): Automate & Systematize**
- Goal: 25-30 leads, 4-6 bookings
- Focus: Automate WhatsApp sequences, call scheduling
- Mindset: "Make this repeatable without me"
- Budget: $3,000-4,000 MXN (reinvest profits)
- Deliverable: Hands-off campaign running in background

---

## 💡 KEY SUCCESS FACTORS

### **Factor #1: Response Speed** ⏱️
```
First message sent < 1 hour → 70% response rate
First call scheduled < 2 hours → 60% booking rate
Post-session follow-up < 24 hrs → 35-40% wedding booking

Slack on ANY of these → Success drops by 40%
```

### **Factor #2: Lead Quality Focus** 🎯
```
Not chasing volume — chasing qualified leads
High quality lead = just engaged + no photographer yet + detailed story

1 high-quality lead →$400 wedding booking
10 low-quality leads → $0

Focus on quality scoring system in CAMPAIGN.md
```

### **Factor #3: Message Consistency** 📱
```
Every message has:
   ✅ Clear call-to-action (book call, schedule session, confirm date)
   ✅ Genuine warmth (not salesy)
   ✅ Time-specific urgency ("early bird expires [DATE]")
   ✅ Easy next step (calendar link or direct question)

Copy from TEMPLATES.md — don't make up custom messages
```

### **Factor #4: Tracking Discipline** 📊
```
Fill spreadsheet DAILY (not "when you remember")
Review metrics WEEKLY (not monthly)
Make decisions based on DATA (not gut)

Spreadsheets are your competitive advantage
```

---

## ❓ COMMON QUESTIONS ANSWERED

### **Q: Should I use the free session option or early bird package?**
**A:** Offer BOTH, let them choose. Data shows:
- Free option: 30-40% convert to wedding booking (lower $ immediate)
- Early bird option: 50-70% choose it (higher intent + financial commitment)
- Overall booking rate: 35-45% of engaged couples

### **Q: What if nobody books the wedding after free sessions?**
**A:** Month 1 is learning. Possible issues:
1. Session isn't delivering enough value → Improve your photography
2. Post-session follow-up is weak → Send MSG 7 within 12 hours
3. Early bird pricing isn't compelling → Increase discount to 20%
4. Your wedding packages are price prohibitive → Review pricing strategy
5. It's just too early → They'll follow up 2-3 months later. Keep nurturing.

### **Q: Budget is tight. Can I do this for $1,000 MXN?**
**A:** Yes, but expect 50% fewer leads. Results:
- $1,000/mo → 70-90 leads/month → 0.5-1 wedding booking
- $2,000/mo → 140-180 leads/month → 1-2 wedding bookings
- $500/mo → 35-45 leads/month → 0.25-0.5 wedding bookings (not recommended)

Start at $2,000 if possible. Scale down only if ROAS is terrible.

### **Q: When should I hire someone to handle follow-ups?**
**A:** When:
- You're getting 30+ leads/month consistently
- You can't respond within 1 hour
- Your conversion rate is solid (you've figured out the winning model)
- You're ready to generate $150K+/year in wedding revenue

For now: YOU do the calls. This builds your process/competitive advantage.

### **Q: Should I track cost per lead or cost per wedding booking?**
**A:** Both. Here's why:
- Cost per lead = efficiency of your ads ($12-15 target)
- Cost per booking = true profitability ($500-800 target based on $10.5K wedding)

If CPL is terrible but cost per booking is great → Your call/follow-up is excellent  
If CPL is great but cost per booking is terrible → Your conversion process is broken

---

## 📞 DECISION FLOWCHART: What to Do When

```
EVERY MORNING:
  ├─ Check: New leads overnight?  
  │  └─ YES → Send MSG 1 within 1 hour
  │  └─ NO → Continue
  │
  ├─ Check: Meta Ads CPL today
  │  ├─ If <$15 MXN → Keep running, monitor
  │  ├─ If $15-20 → Monitor CPL trend
  │  └─ If >$20 for 2nd day → PAUSE bottom 3 ads
  │
  └─ Check: Any calls scheduled today?
     └─ YES → Review lead's story first, use call script

EVERY CALL:
  ├─ Show genuine interest (ask about THEIR story first)
  ├─ Present both options clearly (free vs. early bird)
  ├─ Listen more than talk (60/40 ratio)
  ├─ Ask for booking (don't assume they'll ask)
  └─ Confirm next steps (when will they decide?)

EVERY FRIDAY:
  ├─ Open METRICS_DASHBOARD.md Part 3
  ├─ Fill in weekly data
  ├─ Calculate: CPL, form completion %, lead quality %
  ├─ Compare to targets
  ├─ Make 1-2 optimizations for next week
  └─ Document learnings

EVERY END OF MONTH:
  ├─ Open METRICS_DASHBOARD.md Part 7
  ├─ Complete monthly review checklist
  ├─ Share results + recommendations
  └─ Decide: Scale up / Optimize further / Pause & diagnose
```

---

## 🎬 ACTION ITEMS (Next 7 Days)

### **By This Weekend (April 6):**
- [ ] Review ENGAGEMENT_GIVEAWAY_CAMPAIGN.md (entire document)
- [ ] Read call script in TEMPLATES.md twice (understand flow)
- [ ] Copy 10 WhatsApp templates into your phone/notes
- [ ] Create lead tracking spreadsheet

### **By Next Tuesday (April 9):**
- [ ] Create landing page (copy from CAMPAIGN.md)
- [ ] Setup GA4 + Meta Pixel conversion tracking (ask dev team)
- [ ] Create 2 ad creatives (video + static)
- [ ] Set up calendar link for call scheduling

### **By Next Wednesday (April 10):**
- [ ] LAUNCH campaign (set daily budget to $67 MXN day 1-3 to test)
- [ ] Create daily tracking template
- [ ] Prepare first batch of welcome messages (MSG 1)
- [ ] Test call script with a friend (practice talking!)

### **By End of Week (April 13):**
- [ ] First 3-5 leads should be coming in
- [ ] Send welcome messages to all
- [ ] Schedule first discovery calls
- [ ] Document: What's working, what's not

---

## 📊 SUCCESS METRICS (How You'll Know It's Working)

### **Week 1 Success:**
- CPL between $14-18 MXN (reasonable starting point)
- At least 1-2 people responding to MSG 1
- At least 1 call scheduled
- Landing page loading fast (<2 seconds)

### **Month 1 Success:**
- 12-15 total leads at $12-15 per lead
- 3-4 sessions booked
- 1-2 wedding bookings at $10K-15K each
- Clear data on which audience converts best

### **Month 2-3 Success:**
- CPL drops to $10-12 MXN (optimized targeting)
- 18-25 leads per month
- 4-6 wedding bookings per month
- Campaign running semi-automatically (templates + scheduling)

### **Month 6 Success:**
- Wedding revenue: $30K-45K from campaign leads
- Campaign ROI: 15x+ your ad spend
- Your "dream customer" profile crystal clear
- Repeatable, scalable system

---

## 🔗 INTEGRATION WITH YOUR ANALYTICS AGENT

### **When to Ask the Marketing Analytics Agent:**

**"Analyze our Meta Ads performance for the engagement giveaway campaign"**
→ Agent reviews: CPL, form completion %, lead quality signals  
→ Agent recommends: Which audience to scale, which ads to pause, creative tests  

**"Design the engagement giveaway landing page for maximum conversions"**
→ Agent reviews: Best headlines, copy hooks, form field optimization  
→ Agent recommends: Page layout, social proof placement, CTA button text  

**"Help me create a WhatsApp nurturing sequence for engagement session leads"**
→ Agent uses: Templates from TEMPLATES.md  
→ Agent improves: Message timing, offers, urgency language  

**"Set up a GA4 dashboard to track campaign performance"**
→ Agent configures: Events, funnels, custom reports  
→ Agent creates: Weekly dashboard for leads, cost per lead, conversions  

---

## ✅ FINAL CHECKLIST (Before Launch)

- [ ] All 7 documents read and understood
- [ ] Lead scoring system memorized (score = priority)
- [ ] Call script practiced with a friend
- [ ] WhatsApp templates copied to phone
- [ ] Tracking spreadsheet created
- [ ] Landing page copy ready
- [ ] Meta Ads account ready
- [ ] GA4 + Pixel configured
- [ ] Calendar link for calls set up
- [ ] Team knows the plan (if applicable)
- [ ] Budget cleared ($2,000 MXN for month 1)
- [ ] Daily blocking calendar for calls

---

## 🎯 YOUR NORTH STAR

**Everything you do this month should optimize for ONE thing:**

**Cost Per Qualified Lead < $15 MXN while maintaining 70% lead quality score**

Every ad you run, every message you send, every call you make should ladder up to this.

Hit this metric in Month 1 → You've cracked the code  
Miss this metric → Diagnose + optimize using METRICS_DASHBOARD.md  

Simple. Measurable. Achievable. 🚀

---

**You're ready. Launch next week. Track everything. Win. 💪**

Questions? Use the marketing-analytics agent in .github/agents/ for campaign optimization advice.
