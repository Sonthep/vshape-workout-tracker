# Feature Specification — MVP Workout Tracker

## Problem
Static workout images cannot remember previous loads, track progress, time rests, or show whether the user is progressively overloading. The MVP turns the four-day plan into a mobile-first workout companion.

## Users
Primary: a person training at home with dumbbells, floor space, and bodyweight only.

## User stories
### US1 — See today's workout
As a user, I can see the next scheduled workout and its exercises so I can start without searching through images.

Acceptance criteria:
- Home shows the next workout prominently.
- Weekly schedule is Monday, Tuesday, Thursday, Saturday.
- Default program contains no band/bench/pull-up/machine exercises.

### US2 — Log a workout set
As a user, I can record weight, reps or duration, optional RIR, and completion so the app can remember performance.

Acceptance criteria:
- Previous session values are visible when available.
- Completing a set timestamps it.
- Bodyweight/duration exercises do not force irrelevant fields.

### US3 — Rest timer
As a user, after finishing a set I can see a rest countdown so I know when to start the next set.

Acceptance criteria:
- Timer starts from an exercise-appropriate default.
- User can skip, pause, or adjust it.
- Timer does not block logging corrections.

### US4 — Workout history
As a user, I can review completed sessions and set details so I can confirm consistency and progression.

### US5 — Track body progress
As a user, I can record body weight and waist measurement so I can evaluate change alongside strength.

### US6 — Private progress photos
As a user, I can store dated front/side/back progress photos privately.

Acceptance criteria:
- Photos are private to the owner.
- Public buckets/URLs are not used for MVP.

## Non-goals for MVP
- AI coach
- Nutrition/calorie tracker
- Social feed
- Wearable integration
- Payments/subscriptions
- NestJS API
- Automatic exercise image generation in production

## Success criteria
- A workout can be started and first set logged in <30 seconds from opening the app.
- Set logging after initial load requires only a few taps.
- User-owned records are inaccessible to another authenticated user.
- Core flows pass mobile Playwright tests.
