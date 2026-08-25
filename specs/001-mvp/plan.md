# Implementation Plan — MVP

## Stack
- Next.js App Router + TypeScript
- Supabase: PostgreSQL, Auth, private Storage, RLS
- Vitest for domain/unit tests
- Playwright for mobile-first E2E
- GitHub Actions CI
- Vercel deployment

## Slices
1. Bootstrap + CI + Supabase schema
2. Auth/profile
3. Program catalog + today's workout
4. Start session + set logging
5. Rest timer + previous set hints
6. Finish workout + history
7. Measurements + charts
8. Private progress photo upload
9. PWA polish + accessibility + deployment

## Security
- RLS on all user-owned tables.
- Storage bucket must be private and path-scoped by user id.
- Never expose service-role credentials to client code.

## Testing
- Unit: program rules, progression logic, next-workout calculation.
- E2E: auth, start workout, log set, finish session, add measurement.
- RLS: add SQL/integration checks before production.
