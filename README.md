# V-Shape Workout Tracker — AI-ready Starter

An AI-first starter repository for a mobile-first workout tracker built around a four-day dumbbell + floor + bodyweight program.

## What is already prepared
- Product/spec context: `specs/001-mvp/`
- AI instructions: `AGENTS.md`, `CLAUDE.md`, Cursor rule
- Project constitution: `.specify/memory/constitution.md`
- Architecture + ADRs + domain + UX docs
- Next.js/TypeScript starter
- Supabase schema, RLS policies, and exercise seed
- Vitest + Playwright starter tests
- GitHub Actions CI
- Windows tool checker

## Local setup

```powershell
# Node 24 LTS is recommended
corepack enable
corepack prepare pnpm@10 --activate
pnpm install
Copy-Item .env.example .env.local
pnpm check
pnpm exec playwright install
pnpm dev
```

Then create a Supabase project and fill `.env.local`.

Apply SQL using Supabase CLI or the SQL editor:
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/seed.sql`

## Tool check on Windows

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-tools.ps1
```

## GitHub Spec Kit
This repository already contains project/spec context so AI agents can start immediately. If you want the official Spec Kit commands/skills too, install the official `specify` CLI from GitHub, then initialize the current repo with the integration you use (for example Codex skills mode). Do not overwrite the customized constitution.

Suggested workflow:

```text
SPEC -> PLAN -> TASK -> IMPLEMENT -> TEST -> REVIEW -> PR -> CI -> FEEDBACK
```

## First AI task
Start with Phase 0/1 in `specs/001-mvp/tasks.md`: verify environment, wire Supabase Auth, and add the first mobile E2E flow.

## Version note
The package ranges intentionally allow compatible patch/minor updates. Before production deployment, update dependencies and review current Next.js security advisories.
