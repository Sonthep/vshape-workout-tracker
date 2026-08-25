# Architecture

## MVP

```text
Mobile PWA / Browser
        |
        v
Next.js (App Router, TypeScript)
  |                 |
  |                 +--> Supabase browser client (RLS-protected data)
  |
  +--> Server Components / Server Actions
                      |
                      v
                   Supabase
             PostgreSQL / Auth / Storage
```

## Why no NestJS in MVP
The first version is CRUD-heavy with authentication, RLS, private storage, and simple progression calculations. Next.js + Supabase can cover these without a separate API service. See ADR 0001.

## Deployment
- App: Vercel
- Database/Auth/Storage: Supabase
- Source control: GitHub
- CI: GitHub Actions

## Future extraction triggers
Consider a dedicated backend only when one or more become real requirements: complex async jobs, multi-provider integrations, billing orchestration, heavy recommendation engines, wearable ingestion, multi-tenant B2B APIs, or performance/isolation needs that cannot be met cleanly inside the Next.js boundary.
