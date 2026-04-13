# AGENTS.md

## Browser Verification

- Use `agent-browser` for browser automation, screenshots, and visual QA on local or remote pages.
- Prefer `agent-browser` over Chrome DevTools-based tooling for routine UI verification in this repo.
- When a task needs layout or responsive validation, verify the actual page with `agent-browser open`, `agent-browser wait`, `agent-browser snapshot -i`, and `agent-browser screenshot`.
- If visual verification cannot be completed, state the blocker explicitly in the final handoff.
