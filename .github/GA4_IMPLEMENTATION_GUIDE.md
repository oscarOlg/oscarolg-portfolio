# GA4 + Meta Pixel Implementation Guide
## Oscar OLG Photography — Phase 1 Complete ✅

**Status:** GA4 + Meta Pixel scripts initialized  
**Files Modified:**
- ✅ `src/lib/analytics.ts` — Created (450+ lines, all event tracking functions)
- ✅ `src/app/layout.tsx` — Updated (GA4 + Pixel scripts added)
- ✅ `.env.local` — Already configured with IDs

---

## WHAT'S NOW RUNNING

### **GA4 (Google Analytics 4)**
- ✅ Initialized globally on all pages
- ✅ Measurement ID: `G-9R700K0V4Q`
- ✅ Tracking: Page views, scroll depth, form events, conversions
- ✅ Location: `src/app/layout.tsx` (afterInteractive strategy = faster)

### **Meta Pixel**
- ✅ Initialized globally on all pages
- ✅ Pixel ID: `302412685636304`
- ✅ Tracking: Page views, form submissions, conversions
- ✅ Location: `src/app/layout.tsx`

---

## NEXT: ADD TRACKING TO YOUR COMPONENTS

### **Step 1: Contact Form Tracking** (Priority #1)

Find your contact form component (likely `src/app/contact/components/ContactFormClient.tsx`):

```typescript
// At the top of your component file, add:
import { 
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormFieldFilled,
  trackLeadFormCompleted,
  trackLeadFormSubmitted,
  trackLeadFormWhatsAppOpened,
  trackLeadFormError,
} from '@/lib/analytics';

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    weddingDate: '',
    story: '',
  });

  // 1️⃣ When form section becomes visible (add to useEffect or Intersection Observer)
  useEffect(() => {
    trackLeadFormView('contact_wedding', 'es');
  }, []);

  // 2️⃣ When user starts typing in first field
  const handleFirstFieldInteraction = () => {
    trackLeadFormStarted('contact_wedding', 'es');
  };

  // 3️⃣ After each field completion (in onChange handler)
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (value.length > 0) {
      trackLeadFormFieldFilled('contact_wedding', name, value, 'es');
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4️⃣ When form validation passes (all fields filled)
  const handleFormComplete = () => {
    const fieldsCount = Object.values(formData).filter(val => val.length > 0).length;
    if (fieldsCount === Object.keys(formData).length) {
      trackLeadFormCompleted('contact_wedding', fieldsCount, 'es');
    }
  };

  // 5️⃣ When user clicks WhatsApp button (CRITICAL CONVERSION)
  const handleSubmitWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Track submission BEFORE opening WhatsApp
      trackLeadFormSubmitted(
        'contact_wedding',
        formData.email,
        formData.weddingDate,
        formData.story,
        'es'
      );

      // Then open WhatsApp
      const message = encodeURIComponent(
        `Hola Oscar, vi tu portafolio y me encantó...`
      );
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

      // Track WhatsApp opened shortly after
      setTimeout(() => {
        trackLeadFormWhatsAppOpened('contact_wedding', 'es');
      }, 500);

      // Reset form
      setFormData({ fullName: '', email: '', weddingDate: '', story: '' });
    } catch (error) {
      trackLeadFormError('contact_wedding', 'whatsapp_failed', 'es');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Nombre completo"
        value={formData.fullName}
        onFocus={handleFirstFieldInteraction}
        onChange={handleFieldChange}
        onBlur={handleFormComplete}
      />
      
      {/* ...other fields... */}

      <button type="submit">
        Enviar por WhatsApp
      </button>
    </form>
  );
}
```

---

### **Step 2: Giveaway Landing Page Form** (Priority #2)

If you have a campaign landing page (likely `src/app/landing/[slug]/components/GiveawayLeadForm.tsx`):

```typescript
import {
  trackCampaignLandingView,
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormSubmitted,
  trackCampaignSignup,
} from '@/lib/analytics';

export default function GiveawayLeadForm({ campaignSlug }: { campaignSlug: string }) {
  // 1️⃣ Track landing page view (on mount)
  useEffect(() => {
    trackCampaignLandingView(campaignSlug, 'es');
    trackLeadFormView('giveaway_engagement', 'es');
  }, [campaignSlug]);

  // 2️⃣ Track form interaction & submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const weddingDate = formData.get('weddingDate') as string;

    // Track campaign signup (sends to both GA4 + Pixel)
    trackCampaignSignup(campaignSlug, email, 'es');

    // Open WhatsApp
    const message = `Aplicando a la sesión de compromiso...`;
    window.open(`https://wa.me/+52656293232?text=${encodeURIComponent(message)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

---

### **Step 3: Homepage Engagement Tracking**

Add scroll tracking to key pages (homepage, services page):

```typescript
// src/app/page.tsx
import { useScrollTracking } from '@/lib/analytics';

export default function Home() {
  // Automatically tracks scroll at 25%, 50%, 75%, 100%
  useScrollTracking('homepage');

  return (
    <>
      {/* Your homepage content */}
    </>
  );
}

// src/app/services/page.tsx
export default function ServicesPage() {
  useScrollTracking('services_page');
  
  return (
    <>
      {/* Your services content */}
    </>
  );
}
```

---

### **Step 4: CTA Button Tracking** (Optional but recommended)

For your "Contact Us" and other CTA buttons:

```typescript
import { trackCTAClick } from '@/lib/analytics';

function MyButton() {
  const handleClick = () => {
    trackCTAClick(
      'Get Free Consultation',  // Button text
      'contact',                 // Button type
      'hero_section',            // Where on page
      'es'                       // Language
    );
    
    // Then do your normal action
    window.scrollTo({ top: document.querySelector('#contact-form')?.offsetTop || 0 });
  };

  return <button onClick={handleClick}>Get Free Consultation</button>;
}
```

---

## TESTING YOUR IMPLEMENTATION

### **Option 1: GA4 DebugView (Real-time)**

1. Go to: [Google Analytics Dashboard](https://analytics.google.com)
2. Select your property
3. Left sidebar → **Admin** → **DebugView**
4. Open your website in another tab
5. You should see events arriving in real-time 📊

### **Option 2: Meta Pixel Helper (Real-time)**

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) extension
2. Open your website
3. Click extension icon → You'll see all Pixel events firing 📘

### **Option 3: Browser Console Debug**

```javascript
// In browser console, enable debug mode:
// (Add this to your layout once for testing)

// Then manually test:
window.gtag('event', 'test_event', { test: 'value' });
window.fbq('track', 'TestEvent');

// You should see events in GA4 DebugView + Pixel Helper
```

---

## TESTING CHECKLIST

After updating your form components, verify:

- [ ] GA4 events showing in DebugView (https://analytics.google.com)
  - [ ] `event_view_form` fires when form appears
  - [ ] `event_form_start` fires on first field interaction
  - [ ] `event_form_progress` fires on each field completion
  - [ ] `event_form_complete` fires when all fields filled
  - [ ] `purchase` fires when WhatsApp button clicked ⭐ CRITICAL
  - [ ] `WhatsApp_Window_Opened` fires when WhatsApp opens

- [ ] Meta Pixel events showing in Pixel Helper
  - [ ] `PageView` on page load
  - [ ] `Purchase` on form submission ⭐ CRITICAL
  - [ ] Events show in Pixel Helper extension

- [ ] Form still works perfectly
  - [ ] Can fill out form
  - [ ] WhatsApp opens correctly when submitted
  - [ ] No JavaScript errors in console

- [ ] Mobile compatibility
  - [ ] Test on phone
  - [ ] All events fire on mobile too

---

## PHASE 1 CHECKLIST ✅

| Task | Status | Notes |
|------|--------|-------|
| Create `src/lib/analytics.ts` | ✅ Done | 450+ lines of event tracking functions |
| Update `src/app/layout.tsx` | ✅ Done | GA4 + Pixel scripts initialized |
| `.env.local` configured | ✅ Done | IDs: `G-9R700K0V4Q` + `302412685636304` |
| Add tracking to ContactFormClient | ⏳ Next | Follow form tracking guide above |
| Add tracking to GiveawayLeadForm | ⏳ Next | Follow campaign form guide above |
| Add scroll tracking to homepage | ⏳ Next | Use `useScrollTracking('homepage')` |
| Test in GA4 DebugView | ⏳ Next | Verify events firing |
| Test in Meta Pixel Helper | ⏳ Next | Verify pixel events |
| Create GA4 funnels/dashboards | ⏳ Phase 2 | After events are flowing |
| Create Meta Pixel audiences | ⏳ Phase 2 | After pixel validation |

---

## NEXT PHASES (After Phase 1 is tested)

**Phase 2 (Week 2):** Add tracking to all forms  
**Phase 3 (Week 3):** Add engagement events (gallery, packages, portfolio)  
**Phase 4 (Week 4):** Campaign events + UTM tracking  
**Phase 5 (Week 5):** GA4 dashboards + custom reports  
**Phase 6 (Week 6):** Meta Pixel audiences + retargeting setup  

---

## DEBUGGING COMMON ISSUES

### **Issue: Events not showing in GA4 DebugView**

✅ **Check:**
1. Is GA4 script loading? (Check Network tab in DevTools)
2. Is Measurement ID correct? (Should be `G-9R700K0V4Q`)
3. Are you calling `trackGA4Event()` after page load? (Use `afterInteractive` strategy ✅)
4. Check browser console for errors

✅ **Fix:**
```typescript
// Make sure you're importing correctly
import { trackLeadFormView } from '@/lib/analytics';

// Call in useEffect or event handler, not at module level
useEffect(() => {
  trackLeadFormView('contact_wedding', 'es');
}, []);
```

### **Issue: Pixel events not showing in Pixel Helper**

✅ **Check:**
1. Is Pixel ID correct? (Should be `302412685636304`)
2. Is Pixel script loading? (Check Network tab)
3. Is Meta Pixel Helper extension enabled?

✅ **Fix:**
```typescript
// Verify pixel is initialized
console.log('Pixel ID:', process.env.NEXT_PUBLIC_FB_PIXEL_ID);
console.log('fbq available:', typeof window.fbq);
```

### **Issue: Getting TypeScript errors on `window.gtag` or `window.fbq`**

✅ **Already fixed!** The `analytics.ts` file includes:
```typescript
declare global {
  interface Window {
    gtag?: (command: string, action: string, config?: Record<string, any>) => void;
    fbq?: (command: string, event: string, data?: Record<string, any>) => void;
  }
}
```

---

## YOUR IMMEDIATE ACTION ITEMS

**Today:**
- [ ] Test GA4 + Meta Pixel scripts are loading
- [ ] Open GA4 DebugView + see page view events

**This Week:**
- [ ] Integrate tracking into ContactFormClient.tsx
- [ ] Integrate tracking into GiveawayLeadForm.tsx
- [ ] Test form submission tracking

**Next Week:**
- [ ] Add `useScrollTracking` to key pages
- [ ] Create GA4 funnels
- [ ] Setup conversion goals

---

## FILES READY FOR IMPLEMENTATION

✅ `src/lib/analytics.ts` — All functions ready  
✅ `src/app/layout.tsx` — Scripts initialized  
✅ `.env.local` — IDs configured  

**You're ready! Start with form tracking in your components. 🚀**

---

## SUPPORT RESOURCES

- **GA4 Debug Guide:** https://support.google.com/analytics/answer/7201382
- **Meta Pixel Documentation:** https://developers.facebook.com/docs/facebook-pixel
- **Your Analytics Strategy:** See `/github/ANALYTICS_STRATEGY.md`
- **Event Specifications:** See `/github/ANALYTICS_IMPLEMENTATION.md`

---

**Need help? Reference the examples above and implement one component at a time. Start with the contact form — that's your highest priority. ✅**
