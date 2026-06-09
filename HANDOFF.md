# ContratoYa — Project Handoff

_Last updated: 2026-06-10_

## What is this?
ContratoYa is a Spanish-language SaaS for freelancers (autonomos) in Spain to generate legal document templates (contracts, invoices, NDAs, quotes, leases, privacy policies). Built with React + TypeScript + Vite + Supabase + Stripe, deployed on Vercel.

## Live URL
https://contratoya.vercel.app

## GitHub Repo
https://github.com/PinkWildren-gif/contratoya

## Project Structure
```
/Users/andilu/Desktop/ContratoYa/          ← git root
  ContratoYa/                              ← Vite project (Vercel root directory)
    api/webhook.js                         ← Stripe webhook (Vercel serverless)
    src/                                   ← React app source
    supabase/migrations/                   ← Database schema SQL
```

## Tech Stack
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + RLS) — project ref `dvurbafmmogqyjwhlrvz`
- Payments: Stripe (Payment Links + webhook)
- Hosting: Vercel (SPA + serverless API), auto-deploys from `main`
- i18n: Custom context-based ES/EN language switcher

## Current Status — WORKING in production
Verified end-to-end on 2026-06-10:
- Signup, login, session handling ✓
- Business profile creation (RLS) ✓
- Document generation (NDA tested): questionnaire → PDF → saved to DB → free-tier counter incremented ✓
- Profile data pre-fills questionnaires ✓
- ES/EN switcher, incl. forms and error states ✓

## Supabase configuration (all DONE)
- Site URL: `https://contratoya.vercel.app`
- Redirect URL: `https://contratoya.vercel.app/**`
- Confirm email: OFF (re-enable before serious launch; also re-style the
  signup success screen which still says "check your email")
- Migration 001 (tables/RLS/signup trigger): applied
- Migration 002 (pg_cron, monthly counter reset, expiry checks): applied
  - cron `reset-monthly-doc-counters` — 1st of month 00:00 UTC
  - cron `check-expired-subscriptions` — daily 02:00 UTC

⚠️ **Free-tier pause**: Supabase pauses free projects after ~1 week of
inactivity. If signup/login suddenly fails, go to the Supabase dashboard and
click "Resume project". (This happened once; resume takes ~2 minutes.)

## Stripe (webhook endpoint created)
- Event destination "vibrant-splendor" → `https://contratoya.vercel.app/api/webhook`
- Listens to `checkout.session.completed`
- Payment Links for monthly/yearly are live (set as VITE_ env vars)

## REMAINING TODO — Vercel server-side env vars (only blocker)
The webhook function currently returns 500 because these four variables are
NOT set in Vercel (Settings → Environment Variables → add for All
Environments, then Redeploy):
- `STRIPE_SECRET_KEY` — Stripe Dashboard → API keys (sk_live_…)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook destination signing secret (whsec_…)
- `SUPABASE_URL` — `https://dvurbafmmogqyjwhlrvz.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase Dashboard → Settings → API keys

Without them, everything works EXCEPT Pro-subscription activation after
payment. With them set + a redeploy, the payment loop closes.

## Frontend env vars (already set in Vercel, also in local `.env`)
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_MONTHLY_LINK`, `VITE_STRIPE_YEARLY_LINK`

## Key Files
- `ContratoYa/src/App.tsx` — Router + providers
- `ContratoYa/src/lib/i18n/` — Language switcher (ES/EN)
- `ContratoYa/src/lib/pdf/` — PDF generators per document type
- `ContratoYa/src/lib/document-configs/` — Questionnaire form definitions
- `ContratoYa/src/hooks/useSubscription.ts` — Free-tier limit logic
- `ContratoYa/api/webhook.js` — Stripe webhook handler

## Notes
- PDFs and questionnaire forms stay in Spanish (legal content for Spanish law)
- Marketing language intentionally softened ("plantillas", "basadas en") to limit liability
- Every PDF page carries a legal disclaimer footer; users must accept
  disclaimers before generating and before downloading
- A test account exists in production (testuser.contratoya@example.com) with
  one profile and one NDA document — delete via Supabase dashboard when no
  longer useful
