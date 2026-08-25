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
- [ ] Mobile E2E for complete set. (Auth-guard E2E added; a real logged-in "complete a set" E2E needs a way to mint a test session — no `SUPABASE_SERVICE_ROLE_KEY` or test-user credentials are configured yet.)

## Phase 4 — Rest timer
- [ ] Auto-start rest timer after completed set.
- [ ] Pause/skip/adjust controls.
- [ ] Preserve timer state across normal route interaction.

## Phase 5 — Finish + history
- [ ] Finish session summary.
- [ ] Workout history list/detail.
- [ ] Basic progression indicator.

## Phase 6 — Body progress
- [ ] Add weight/waist/chest measurement form.
- [ ] Add simple trend chart.
- [ ] Validate dates/metric units.

## Phase 7 — Progress photos
- [ ] Configure private Supabase storage bucket.
- [ ] Upload front/side/back photos.
- [ ] Signed/private retrieval only.
- [ ] Add delete flow.

## Phase 8 — PWA + release
- [ ] Add installable PWA/service worker approach.
- [ ] Accessibility pass.
- [ ] Mobile performance pass.
- [ ] Production RLS review.
- [ ] CI green.
- [ ] Deploy to Vercel.
