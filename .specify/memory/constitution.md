# V-Shape Workout Tracker Constitution

## I. Spec Before Code
Every product feature must have clear user value, scope, acceptance criteria, and data implications before implementation. Code must not silently redefine product requirements.

## II. Mobile Workout UX First
The primary context is a user between exercise sets on a phone. Critical actions must be large, fast, legible, and require minimal typing. Logging a completed set should take only a few seconds.

## III. Correctness and Safety Over Decoration
Tracking calculations, program prescriptions, timers, RIR, and progress data must be deterministic and tested. Exercise guidance must not be fabricated or changed casually. AI-generated exercise imagery is never assumed biomechanically correct without review.

## IV. Privacy by Default
User measurements, workout history, and progress photos are private. Supabase RLS is mandatory for user-owned data. Service-role credentials never enter the client bundle.

## V. Small, Testable Vertical Slices
Prefer simple Next.js + Supabase implementation over unnecessary services. Each feature ships with tests proportional to its risk. Architecture complexity must be justified by an ADR.

## VI. AI Agents Must Leave the Repo Better
Agents must read project context, keep changes focused, run checks, update documentation when behavior changes, and surface uncertainty rather than guessing.

## Governance
This constitution overrides convenience and local implementation preferences. Changes require an explicit documentation update explaining why the rule no longer serves the product.
