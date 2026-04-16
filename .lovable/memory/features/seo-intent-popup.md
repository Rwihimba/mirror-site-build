---
name: SEO + Intent Popup System
description: Per-page SEO, JobPosting schema, dynamic sitemap, lazy-loaded intent-based popup with 25s+50% scroll triggers
type: feature
---

## SEO Architecture
- `react-helmet-async` with `<HelmetProvider>` in `main.tsx`
- Reusable `<SEO>` component at `src/components/SEO.tsx` — handles title, description, canonical, OG, Twitter, JSON-LD
- Per-page `<SEO>` applied to: Home, About, Solutions, Careers, Contact, JobDetail, Investors, ForMiningCompanies, Partners
- `JobDetail` emits `JobPosting` schema (Google Jobs eligible)
- Sitemap is **dynamic** via edge function at `/functions/v1/sitemap` — includes all static routes + published jobs
- `robots.txt` references the edge-function sitemap and disallows `/admin`

## Landing Pages (SEO-targeted)
- `/investors` — keyword: "invest in mining tech" — CTA: Calendly (https://calendly.com/minetech-rwanda/30min)
- `/for-mining-companies` — keyword: "smart mining solutions" — CTA: demo form (form_type: `demo_request`)
- `/partners` — keyword: "mining tech partnerships" — CTA: existing PartnerDialog

## Intent Popup System
- Lazy-loaded via `React.lazy` — kept out of main bundle
- Detection in `src/lib/intent/detectIntent.ts`: utm params → path → referrer keywords
- Trigger rules (`usePopupTrigger.ts`): 25s on site AND 50% scroll (60% on mobile), never first 3s, dismissed = 7-day localStorage suppression, once per session
- Allowed paths only: `/`, `/solutions`, `/about`, `/careers`, landing pages
- Kill switch: `localStorage.setItem('popup_disabled', '1')`
- 3 variants in `popupVariants.ts`: investor (book call), mining-co (request demo), talent (view careers)
- A/B bucket assigned 50/50 per visitor in localStorage

## Analytics
- New `popup_events` table: event_type (impression|click|dismiss), variant, intent, path, referrer, ab_bucket
- Public anon insert allowed; admin-only select (consistent with other event tables)
- New "Popups" tab in admin dashboard shows CTR, by-intent breakdown, recent events

## SEO-Safe Practices
- No mobile interstitials until 60% scroll (Google guideline)
- Popup never blocks above-the-fold content
- Easy single-click dismiss
- Lazy-loaded → zero impact on initial LCP
