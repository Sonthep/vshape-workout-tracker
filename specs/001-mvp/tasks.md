# Tasks — MVP

## Phase 0 — Environment
- [ ] Install Node 24 LTS and pnpm 10.
- [ ] Copy `.env.example` to `.env.local`.
- [ ] Create/link Supabase project.
- [ ] Run migration and seed.
- [ ] Install dependencies and run `pnpm check`.
- [ ] Install Playwright browsers.
- [ ] Initialize Git repository and first commit.

## Phase 1 — Auth + shell
- [x] Add Supabase auth flow.
- [x] Add protected application shell.
- [x] Create profile on first login.
- [x] Add auth E2E test.

## Phase 2 — Today workout
- [x] Implement weekday/next-workout resolver.
- [x] Build mobile home card.
- [x] Build exercise list and prescription display.
- [x] Unit-test schedule rules.

## Phase 3 — Workout session
- [x] Start session and snapshot exercise prescriptions.
- [x] Implement set logger: weight, reps/duration, RIR.
- [x] Show previous-session values.
- [x] Implement set completion/edit.
- [x] Mobile E2E for complete set. (`tests/e2e/live-flow.spec.ts`, gated behind `RUN_LIVE_E2E=1` — signs up a real user against the live Supabase backend and drives the full flow through completing a set.)

## Phase 4 — Rest timer
- [x] Auto-start rest timer after completed set.
- [x] Pause/skip/adjust controls.
- [x] Preserve timer state across normal route interaction.

## Phase 5 — Finish + history
- [x] Finish session summary.
- [x] Workout history list/detail.
- [x] Basic progression indicator.

## Phase 6 — Body progress
- [x] Add weight/waist/chest measurement form.
- [x] Add simple trend chart.
- [x] Validate dates/metric units.

## Phase 7 — Progress photos
- [x] Configure private Supabase storage bucket.
- [x] Upload front/side/back photos.
- [x] Signed/private retrieval only.
- [x] Add delete flow.

## Phase 8 — PWA + release
- [x] Add installable PWA/service worker approach. (Icons generated via `next/og` `ImageResponse` at `/icon`, `/apple-icon`, `/icons/192`, `/icons/512`; manifest wired up; `public/sw.js` caches an `/offline` fallback for navigations, registered from `app/layout.tsx`.)
- [x] Accessibility pass. (`<html lang="en">` with `lang="th"` on the Thai workout-title elements; global `:focus-visible` outline; `prefers-reduced-motion` support; `viewport-fit=cover` so the rest-timer's existing safe-area CSS actually applies.)
- [x] Mobile performance pass. (Reviewed: self-hosted fonts via `next/font`, `next/image` for photos, no chart/animation dependency — hand-rolled SVG sparkline — and client-component surface stays deliberately minimal; no changes needed.)
- [x] Production RLS review. (Confirmed all 7 `public.*` tables have RLS enabled with an owner-scoped policy, `exercises` is read-only to authenticated users, `storage.objects` policies for `progress-photos` are scoped per-user folder, and no service-role key appears anywhere in app code.)
- [x] CI green. (`.github/workflows/ci.yml` already existed and was green; extended it to also run the Playwright E2E suite, adding placeholder `NEXT_PUBLIC_SUPABASE_*` env vars after finding — and fixing — a real crash: auth-guard pages threw instead of redirecting when Supabase env vars were entirely absent, exactly the CI environment. Verified locally by simulating the CI env before trusting it.)
- [ ] Deploy to Vercel. (Not done — requires the user's own Vercel account; this agent has no deploy credentials. App builds cleanly and is deploy-ready.)
