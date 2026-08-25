# AI Handoff

## Start here
Tell the coding agent:

> Read AGENTS.md, `.specify/memory/constitution.md`, `specs/001-mvp/spec.md`, `specs/001-mvp/plan.md`, and `specs/001-mvp/tasks.md`. Do not code until you understand the MVP constraints. Then implement the first unchecked task as a focused vertical slice, add tests, run checks, and update the task list.

## Recommended agent sequence
1. Codex/Cursor: implement one task/slice.
2. Separate review agent: inspect diff against spec + constitution.
3. Run tests and fix findings.
4. PR + CI.

## Parallel worktrees after Phase 1
- `feature/workout-session`
- `feature/progress`
- `feature/exercise-library`
- `feature/auth-storage`

Avoid parallel edits to the same migration or `lib/workouts/program.ts`.
