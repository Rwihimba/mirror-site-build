
# MineTech Rebuild — Strategy & Roadmap

## 1. Positioning (the through-line)

One sentence the whole site repeats in different rooms:

> **One operating record for African mining — captured once at the source, trusted by every stakeholder from pit to market.**

Every page restates this in the language of its audience. We never lead with feature names. We lead with the outcome the visitor came for, then name the product that delivers it.

---

## 2. Information Architecture

Two doors, same rooms. A cooperative manager and a refinery buyer should each find themselves in 2 clicks.

```text
Top nav
├── Solutions  (by audience — the front door)
│   ├── Cooperatives & ASM         → Minetech Corp
│   ├── Large & Mid-Scale Miners   → Minetech OS (+ Telco, + ML consultancy)
│   ├── Traders & Suppliers        → Minetech Trace + Upstream
│   └── Regulators & Government    → [see Open Decision #1]
│
├── Products  (by product — the side door)
│   ├── Minetech OS
│   ├── Minetech Corp
│   ├── Minetech Trace
│   ├── Minetech Upstream
│   └── Minetech Telco             (hardware layer)
│
├── Infrastructure
│   ├── Telco (network + edge)
│   └── Exploration & Survey (drone, via partners) [or under OS — Open Decision #2]
│
├── Company
│   ├── About / Mission
│   ├── Proof (press, waitlist, events)
│   └── Careers
│
└── [Talk to us]   ← single conversion verb, role-aware destination
```

Footer carries a third door for crawlers and skimmers: a flat index of every product and audience page.

---

## 3. Page List & Templates

### 3.1 Homepage (one page, six bands)
1. **Hero** — infrastructure positioning, single line, single CTA.
2. **Role router** — "Where do you sit in the value chain?" — 4 cards (Coop / Large miner / Trader / Regulator). Each card fires `role_router_click {audience}` and routes to the matching Solutions page.
3. **The model** — one diagram: source → record → four stakeholders pulling value from the same record. This is the only place we explain the architecture.
4. **Outcome bands** — 3-4 short bands, each anchored to a real outcome ("Every gram accounted for", "Fleet that doesn't stop", "Due diligence in a folder, not a quarter").
5. **Proof** — 150-cooperative waitlist, CNBC + New Times logos, Rwanda Mining Week.
6. **Products strip** — 5 product tiles, each links to its product page.
7. **Closing CTA** — Talk to us.

### 3.2 Solutions pages (4 × identical template)
One template, swapped content. This is the trust spine of the site.

```text
1. Outcome headline       — what changes for them, in their words
2. Their reality          — the 3 pains we've heard on the ground
3. What they get          — 3-4 outcomes, not features
4. The product            — the product that delivers it, one card, link out
5. Proof                  — quote / number / logo specific to that audience
6. CTA                    — role-aware Talk to us
```

### 3.3 Product pages (5 × identical template)
```text
1. What it is             — one sentence
2. Who it's for           — audience tags linking back to Solutions pages
3. The outcome            — headline + supporting line
4. Capabilities           — secondary, collapsed or below the fold
5. CTA                    — Talk to us, prefilled with product context
```

### 3.4 Infrastructure
- **Telco** — own page. The hardware story (network, edge, why we own this layer).
- **Exploration & Survey** — page or section depending on Open Decision #2.

### 3.5 Company
- About, Proof (press + waitlist + events as one page), Careers (existing system stays).

### 3.6 Conversion surface
- **Talk to us** — single form, role-aware. Pre-selects audience + product from the source page. Fires `lead_submit {audience, product, source}`.

---

## 4. Analytics & Demand Tracking

Every CTA, every role-router card, every product tile, every nav click fires one event:

```ts
track('cta_click', { audience, product, source, label })
track('role_router_click', { audience, source })
track('lead_submit', { audience, product, source })
```

`audience` and `product` are inferred from the page the click happened on. The pre-conversion clicks matter as much as the form submits — we want to see which door pulls hardest before anyone fills anything in.

Surfaced in the existing admin dashboard as a "Demand" panel: clicks by audience, clicks by product, funnel from role-router → product page → Talk to us.

---

## 5. Hard Technical Requirement: SSR/SSG

The current stack is Vite + React Router — client-only. Google sees `<div id="root"></div>`, LinkedIn sees the same fallback OG image on every URL. This is the single biggest blocker and it has to be fixed in Phase 1, not bolted on later.

**Recommendation: migrate to Next.js (App Router) on Vercel.**

Why Next over the alternatives:
- True per-route SSR/SSG + per-route metadata + per-route OG image generation, out of the box.
- Vercel is already the deploy target (see `vercel.json`) — the migration target matches the host.
- React 18 + Tailwind + shadcn + Supabase client all port over unchanged.
- The current `react-helmet-async` per-page SEO maps 1:1 onto Next's `generateMetadata`.

What ports cleanly: every page component, every section component, every shadcn UI primitive, Supabase client, edge functions (they live in Supabase, untouched), Tailwind config, design tokens, fonts.

What needs rework: routing (`react-router` → file-based), `<SEO>` component (→ `generateMetadata`), `PageViewTracker` (→ middleware or client component), the lazy `IntentPopup` (→ dynamic import), `vercel.json` rewrites (Next handles this).

What stays Supabase-side and doesn't move: schema, RLS, all edge functions (`sitemap`, `process-pipeline-queue`, `send-pipeline-email`, `submit-assignment`, etc.), storage buckets, auth. The admin dashboard stays a client-rendered island inside the Next app — no SEO concerns there.

Alternative considered & rejected: staying on Vite and adding `vite-plugin-ssr` / a prerender step. Works for the marketing pages but leaves us maintaining two rendering models and re-solving every Next-native thing (metadata API, OG image route, middleware, image optimisation) by hand. Not worth it for a rebuild.

OG images: one dynamic OG route, renders per-page (`/og?title=...&audience=...`). No more single placeholder.

---

## 6. Component Structure (new app)

```text
app/
├── (marketing)/
│   ├── page.tsx                              # Home
│   ├── solutions/
│   │   ├── cooperatives/page.tsx
│   │   ├── large-miners/page.tsx
│   │   ├── traders/page.tsx
│   │   └── regulators/page.tsx               # gated on Open Decision #1
│   ├── products/
│   │   ├── os/page.tsx
│   │   ├── corp/page.tsx
│   │   ├── trace/page.tsx
│   │   ├── upstream/page.tsx
│   │   └── telco/page.tsx
│   ├── infrastructure/
│   │   ├── telco/page.tsx
│   │   └── survey/page.tsx                   # gated on Open Decision #2
│   └── company/{about,proof,careers}/page.tsx
├── (admin)/admin/...                          # ported as-is, client-only
├── talk-to-us/page.tsx
├── og/route.tsx                               # dynamic OG image
└── sitemap.ts                                 # replaces edge function

components/
├── marketing/
│   ├── RoleRouter.tsx                         # the 4-card switch
│   ├── OutcomeBand.tsx                        # reused across home + solutions
│   ├── ProductCard.tsx
│   ├── SolutionTemplate.tsx                   # the 6-block spine
│   └── ProductTemplate.tsx                    # the 5-block spine
└── ui/  ...                                   # shadcn, unchanged

lib/
├── analytics.ts                               # extended: audience+product context
├── content/                                   # MDX or typed content files per page
└── supabase/                                  # unchanged
```

Content lives in typed TS files (or MDX) per page so copy changes don't require a developer.

---

## 7. Open Decisions — need your call before Phase 2

1. **Regulator door.** Two options:
   - **(a)** Name and ship a 6th product, **Minetech Oversight**, with a real outcome page (audit trail, licence registry, royalty reconciliation). Door stays.
   - **(b)** Hide the regulator card on the role router until Oversight exists. The other three doors all land on real product pages; this one would dead-end.
   My recommendation: **(b)** until Oversight has a one-line outcome we can defend.

2. **Drone / exploration survey placement.**
   - **(a)** Capability inside Minetech OS (grade control + exploration as one story).
   - **(b)** Its own Infrastructure item alongside Telco.
   My recommendation: **(a)** — it reinforces OS as the operating layer for mid/large miners and avoids a thin standalone page.

3. **Trace vs Upstream boundary.** A trader shown two overlapping products will bounce. Proposal:
   - **Trace** = chain-of-custody + due-diligence dossier (OECD/iTSCi/LBMA) — the *record* the buyer asks for.
   - **Upstream** = counterparty / licence / supplier screening — the *check* the buyer runs before the deal.
   On the Traders page we lead with Trace (the artefact they need to close a deal) and surface Upstream as the pre-deal step. Confirm or correct.

4. **Minetech Corp pricing.** The self-subsidising / shared-infrastructure model needs to be stated explicitly on the Corp page — not buried. Proposal: a dedicated "How it's funded" block on the Corp product page, plain language, no footnotes. Need your wording or a draft from us.

---

## 8. Phased Roadmap

### Phase 0 — Decisions (you, before we touch code)
- Answer the 4 open decisions above.
- Approve voice samples for one Solutions page (we'll draft Coop/ASM first).
- Confirm Next.js + Vercel migration path.

### Phase 1 — Foundation (SSR + IA shell)
- Spin up Next.js app alongside the current Vite app (separate route or branch).
- Port design tokens, Tailwind config, fonts, shadcn primitives, Supabase client.
- Build the two-door nav, footer, layout, `generateMetadata` helper, dynamic `/og` route, `sitemap.ts`, `robots.txt`.
- Port the admin dashboard as a client-only island. No behaviour change.
- **Ship criteria:** every existing URL has an SSR equivalent with real per-page meta + OG; admin still works; analytics events still fire.

### Phase 2 — Homepage + role router + analytics spine
- Build Home (6 bands), the role router, the "model" diagram.
- Extend analytics to carry `{audience, product, source}` on every click.
- Add the Demand panel to admin.
- **Ship criteria:** Home renders SSR, role-router clicks land on a placeholder Solutions page, every click shows up in admin within 30s.

### Phase 3 — Solutions pages (the trust spine)
- Build the `SolutionTemplate` once.
- Ship Coop/ASM, Large/Mid, Traders. Ship Regulators only if Open Decision #1 = (a).
- Each page wired to its product, proof, and role-aware CTA.

### Phase 4 — Product pages
- Build `ProductTemplate` once.
- Ship OS, Corp, Trace, Upstream, Telco. Corp page includes the explicit pricing block from Open Decision #4.

### Phase 5 — Infrastructure + Company + polish
- Telco page, Survey (location per Open Decision #2), About, Proof, Careers port.
- Motion polish, image pass (square only, per existing brand rules), accessibility audit.
- Redirects from old URLs → new URLs, sitemap refresh, Search Console resubmit.

### Phase 6 — Cutover
- Swap DNS / Vercel project. Old Vite app archived.
- Monitor: crawl coverage, social previews on every page, Demand panel signal.

---

## 9. What I need from you to proceed

1. Approve or amend the IA in §2.
2. Decide the 4 open items in §7 (or tell me to ship with my recommendations).
3. Confirm Next.js migration in §5, or tell me to explore Vite-SSR instead.
4. Approve the phased roadmap in §8 or re-order it.

Once those are answered I'll start Phase 1. I will not write code before then.
