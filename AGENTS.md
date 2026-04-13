# AGENTS.md

## Purpose

This repository uses this file as the local source of truth for human and AI contributors. Check applicable Obra/superpower skills before starting work, then follow the repo-specific rules below.

## Project Context

- App stack: Vite, React 19, TypeScript, TanStack Router, TanStack Query, Tailwind CSS v4.
- Tooling: Vitest, Testing Library, ESLint, Prettier, npm.
- Routing: file-based routes live in `src/routes`.
- Shared UI lives in `src/components`.

## Instruction Priority

1. Check relevant Obra/superpower skills first.
2. Follow this `AGENTS.md` for repo-local behavior and conventions.
3. Follow task-specific user instructions.
4. Preserve existing code patterns unless the task requires a deliberate change.

If superpower guidance conflicts with an explicit repo instruction here, follow this file for work in this repository.

## Frontend Working Rules

- Follow the existing TanStack Router file-route structure instead of inventing a parallel navigation pattern.
- Keep components focused and readable; prefer small responsibilities over large multi-purpose files.
- Prefer accessible markup, semantic elements, and keyboard-friendly interactions.
- For layout, prefer flexbox and grid over fixed canvas-style positioning so screens stay responsive while still matching the intended Figma composition.
- Avoid unnecessary `useEffect`; derive state directly when possible and follow existing React 19 patterns.
- Preserve the current styling approach: Tailwind utilities, shared styles in `src/styles.css`, and existing component conventions.
- Use `rg`/`rg --files` for search instead of slower alternatives.
- Do not overwrite unrelated local changes and do not use destructive git commands.

## TDD Default Workflow

Use TDD for feature work, bug fixes, and behavior changes.

1. Start by writing or updating a failing test for the behavior you want.
2. Run the smallest relevant test command and confirm the failure.
3. Implement the minimum code needed to make the test pass.
4. Re-run the targeted test, then broaden verification as needed.
5. Finish by running the relevant lint/build checks before claiming completion.

If the task is documentation-only or does not change runtime behavior, skip test creation and still run the most relevant verification commands you can.

## Commands

- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run all tests: `npm run test`
- Run a targeted Vitest test when possible: `npx vitest run <path-to-test>`
- Lint: `npm run lint`
- Production build: `npm run build`
- Format check: `npm run format`
- Use caution with `npm run check`: it runs Prettier with `--write` and ESLint with `--fix`, so it rewrites files.

## Repo-Specific Notes

- If you need a new shadcn component, use the current repo convention from `.cursorrules`:
  `pnpm dlx shadcn@latest add <component>`
- Demo/example files may exist from the starter template; remove or ignore them only when the task calls for it.
- Cross-check changes against `package.json`, `.cursorrules`, and the current `src/` structure before introducing new patterns.
- Keep instructions concise in follow-up docs so future agents can scan them quickly.
