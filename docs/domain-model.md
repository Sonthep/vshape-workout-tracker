# Domain Model

## Core entities
- Profile — app-specific user profile.
- Exercise — canonical catalog entry and form cues.
- WorkoutSession — one real training session by a user.
- WorkoutExercise — ordered exercise snapshot inside a session.
- SetLog — weight/reps/time/RIR for one set.
- BodyMeasurement — dated body metrics.
- ProgressPhoto — private front/side/back image reference.

## Important rules
- A completed workout session must preserve what the user actually did, even if the program changes later.
- Set order is explicit.
- Weight can be null for bodyweight exercises.
- Reps can be null for duration exercises.
- RIR is optional and constrained to 0–5 in MVP.
- Store measurements in metric units internally.
