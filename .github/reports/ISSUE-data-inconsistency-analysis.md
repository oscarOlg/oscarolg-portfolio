# Portfolio Maintenance Report: Data Inconsistency Analysis

**Date:** March 18, 2026  
**Issue:** Contact form displays different package text/prices than services page  
**Severity:** Medium — Data integrity and UX consistency issue  

---

## Executive Summary

Your portfolio has **duplicate data sources for package add-ons**, causing inconsistencies between the `/services` page and the `/contact` form. The two seeding scripts (`seed-service-packages.mjs` and `seed-service-config.mjs`) independently manage add-on/complemento data with conflicting prices and descriptions. This breaks the single-source-of-truth principle.

---

## The Problem: Root Cause Analysis

### Architecture Issue: Two Systems Managing Same Data

**Current Setup:**

| Location | Script | Sanity Type | Field | Purpose |
|----------|--------|-------------|-------|---------|
| **Services Page** | `seed-service-config.mjs` | `serviceConfig` | `complementos[]` | Display add-ons section |
| **Contact Form** | `seed-service-packages.mjs` | `servicePackage` | `addOns[]` | Select add-ons when booking |

### The Data Mismatch: Wedding Services Example

**`seed-service-packages.mjs` — addOns per package:**

```javascript
// Esencial package
addOns: [
  { name: 'Sesión de Compromiso (Pre-boda / Save the Date)', price: 2300 },  // ← $2,300
  { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
]

// Clásico package
addOns: [
  { name: 'Sesión de Compromiso (Pre-boda / Save the Date)', price: 2500 },  // ← $2,500
  { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
]
```

**`seed-service-config.mjs` — complementos (global):**

```javascript
complementos: [
  { name: 'Sesión de Compromiso (Pre-boda / Save the Date)', price: 2500 },    // ← $2,500 flat
  { name: 'Horas extra de cobertura el día del evento', price: 1500, unit: 'hr' },
]
```

### Result

**Services Page Shows:** $2,500 for engagement session (from `complementos`)  
**Contact Form Shows:** $2,300 (Esencial) or $2,500 (Clásico) depending on selected package (from `addOns`)  
**Client Sees:** Conflicting information

---

## Additional Issues Found

### Issue 1: Inconsistent Add-on Description Text

| Source | Field | Text |
|--------|-------|------|
| `serviceConfig.complementos` | "Horas extra de cobertura **el día del evento**" | Full context |
| `servicePackage.addOns` | "Horas extra de cobertura" | Minimal |

**Impact:** Contact form doesn't clarify that extra hours apply to the event day.

### Issue 2: Inconsistent Unit Formatting

| Source | Field | Unit Value |
|--------|-------|-----------|
| `serviceConfig.complementos` | `unit: 'hr'` | Abbreviated |
| `servicePackage.addOns` | `unit: 'por hora'` | Full Spanish |

**Impact:** UI displays different formatting between pages.

### Issue 3: Orphaned Legacy Components

**Found:** `src/app/services/components/WeddingPackages.tsx` (and similar)

- Contains **hardcoded package markup** with static prices built into JSX
- **NOT imported anywhere** — dead code
- **Risk:** If prices change and these components are ever re-enabled, they show stale data

---

## Current Data Flow

```
┌─ Services Page ─────────────────────┐
│ /app/services/page.tsx              │
│   ↓ fetch getServiceConfigs()        │
│   ↓ fetch getServicePackages()       │
│   ↓ rendered by ServicePackageTemplate.tsx
│   ↓ DISPLAYS config.complementos    │  ← Stale or conflicting
└─────────────────────────────────────┘

┌─ Contact Form ──────────────────────┐
│ /app/contact/page.tsx               │
│   ↓ fetch getServicePackages()       │
│   ↓ rendered by ContactFormClient   │
│   ↓ DISPLAYS package.addOns          │  ← Package-specific, sometimes different
└─────────────────────────────────────┘
```

---

## Recommended Fix: Single Source of Truth

### Option A: Keep Add-ons in ServicePackage (Recommended)

**Best for:** Differentiating add-ons per package tier.

**Actions:**

1. **Delete `complementos` from `seed-service-config.mjs`**
   - Only keep layout config, process steps, info cards, etc.
   - Remove the redundant add-on list

2. **Standardize `addOns` in `seed-service-packages.mjs`**
   - Ensure consistent prices across packages for the same add-on
   - Include full descriptive text with context
   - Use standardized units

3. **Update `ServicePackageTemplate.tsx`**
   - Change from `config.complementos` to `packages` to display add-ons
   - Both services and contact pages source from same data

**Code Change Example:**

```tsx
// BEFORE: Uses config.complementos
{hasComplementos && (
  <div>{config.complementos!.map(item => ...)}</div>
)}

// AFTER: Uses package-specific addOns (from packages array)
{regularPackages.some(pkg => pkg.addOns?.length) && (
  <div>
    {regularPackages[0]?.addOns?.map(addon => ...)}
  </div>
)}
```

### Option B: Keep Add-ons in ServiceConfig (Alternative)

**Best for:** Same add-ons across all packages in a service.

**Actions:**

1. **Delete `addOns` from `seed-service-packages.mjs`**
2. **Standardize `complementos` in `seed-service-config.mjs`**
3. **Update `ContactFormClient.tsx`**
   - Fetch `serviceConfig` instead of package `addOns`
   - Display `config.complementos` in form

---

## Implementation Steps

### Phase 1: Unify Data (Recommended Option A)

1. **Review wedding add-on pricing logic:**
   ```bash
   grep -n "Sesión de Compromiso" scripts/seed-*.mjs
   ```
   - Decide: Should "Sesión de Compromiso" be $2,300 or $2,500?
   - If package-specific: Keep in `addOns`, make it clear in UI
   - If flat: Standardize to one price

2. **Update `seed-service-packages.mjs`:**
   - Align all add-on prices across packages
   - Use descriptive names with full context
   - Standardize units to consistent format

3. **Update `seed-service-config.mjs`:**
   - Remove `complementos` arrays entirely
   - Keep: `hasAddOns: true/false` flag for layout control

4. **Update `ServicePackageTemplate.tsx`:**
   - Import and use package data instead of config complementos
   - Display add-ons from `packagesByService[selectedService]`

5. **Remove orphaned components:**
   ```bash
   rm src/app/services/components/WeddingPackages.tsx
   rm src/app/services/components/{Individual,Couples,Maternity,Commercial,Editorial}Packages.tsx
   ```
   (Verify they're not used first)

### Phase 2: Validation

6. **Test after seeding:**
   ```bash
   npm run seed:services
   ```
   - Open `/services` — verify add-on prices
   - Open `/contact` — select each package, verify add-ons match services page
   - No price mismatches between pages

7. **Create validation script** (optional but recommended):
   - Add to `scripts/validate-data.mjs`
   - Compare prices between packages and configs pre-seed
   - Flag inconsistencies before uploading to Sanity

---

## Files Affected

### Must Update
- [seed-service-config.mjs](seed-service-config.mjs) — Remove complementos duplication
- [seed-service-packages.mjs](seed-service-packages.mjs) — Standardize addOns pricing
- [src/app/services/components/ServicePackageTemplate.tsx](src/app/services/components/ServicePackageTemplate.tsx) — Use package addOns instead of config complementos
- [src/app/contact/components/ContactFormClient.tsx](src/app/contact/components/ContactFormClient.tsx) — May need minor updates

### Consider Deleting (Orphaned)
- [src/app/services/components/WeddingPackages.tsx](src/app/services/components/WeddingPackages.tsx)
- [src/app/services/components/IndividualPackages.tsx](src/app/services/components/IndividualPackages.tsx)
- [src/app/services/components/CouplePackages.tsx](src/app/services/components/CouplePackages.tsx)
- [src/app/services/components/MaternityPackages.tsx](src/app/services/components/MaternityPackages.tsx)
- [src/app/services/components/CommercialPackages.tsx](src/app/services/components/CommercialPackages.tsx)
- [src/app/services/components/EditorialPackages.tsx](src/app/services/components/EditorialPackages.tsx)

---

## Quick Reference: Current Inconsistencies

### Add-on Pricing Differences

| Add-on | Config (Flat) | Package (Esencial) | Package (Clásico) | Package (Premium) | Conflict? |
|--------|---------------|--------------------|-------------------|------------------|-----------|
| Sesión de Compromiso | $2,500 | $2,300 | $2,500 | N/A | ✅ YES |
| Set de fotos impresas | $1,500 | $1,500 | $1,500 | $1,500 | No |
| Horas extra | $1,500/hr | $1,500 (por hora) | $1,500 (por hora) | $1,500 (por hora) | Wording |

---

## Next Steps

1. **Review this report** with the client to decide: Are package-specific add-on prices intentional?
2. **Choose implementation option** (A or B)
3. **Implement Phase 1 changes**
4. **Run `npm run seed:services`** to update Sanity
5. **Test both pages** to verify no data conflicts
6. **Consider Phase 2 validation** for future edits

---

## Questions for Client

1. **Should add-ons have different prices per package?**
   - Esencial: Engagement session $2,300 vs Clásico: $2,500?
   - Or should all packages offer the same add-ons at the same price?

2. **Are there other data inconsistencies you've noticed?**
   - Specific package names or features mismatched between pages?
   - Translation discrepancies (Spanish vs English)?

3. **Have you manually edited any package data in Sanity Studio?**
   - If so, re-running seed scripts may overwrite those changes
   - We should migrate those edits into the seed scripts instead

---

**Report prepared by:** GitHub Copilot (Portfolio Dev Agent)  
**Status:** Ready for client review and decision
