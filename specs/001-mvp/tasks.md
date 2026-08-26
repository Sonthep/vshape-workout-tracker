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
- [ ] Add installable PWA/service worker approach.
- [ ] Accessibility pass.
- [ ] Mobile performance pass.
- [ ] Production RLS review.
- [ ] CI green.
- [ ] Deploy to Vercel.
