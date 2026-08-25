# ADR 0001 — No NestJS in MVP

Status: Accepted

## Context
The MVP needs auth, workout CRUD, set logs, body measurements, private progress photos, and simple progression suggestions.

## Decision
Use Next.js + Supabase directly. Do not add NestJS to the initial architecture.

## Consequences
- Faster implementation and fewer deployment surfaces.
- RLS becomes a core security boundary.
- Complex backend behavior may later be extracted behind a dedicated API after evidence justifies it.
