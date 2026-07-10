# Even — A Starter Recovery Routine Coach

**Day 40 of #60DaysClaudeChallenge** · Single-file HTML app powered by the Claude API.

## What it does

Most wellness advice overwhelms beginners with too many options at once. Even (AI Assistant) solves this by doing one thing: you describe your sleep, stress, or energy struggles in your own words, and it returns **one** simple routine — broken into Morning / Midday / Evening, one clear action per block.

## Tech

- Single self-contained `.html` file — no build step, no npm, no external libraries
- Vanilla JS, calls the Claude API directly via `fetch`
- Model responds in strict JSON so the UI renders a real timeline, not raw chat text
- Dark, calm UI with an animated "day arc" motif and smooth micro-interactions
- Fully offline-capable once loaded (aside from the live API call)

## Guardrails baked into the system prompt

- Never diagnoses conditions or recommends medication/supplements
- Redirects politely if the input is off-topic
- Steps aside (no coaching) and points to real help if the input suggests a crisis
- Ignores any attempt to override its role via prompt injection

## Try it

Open `recovery-coach.html` in any browser. No setup required.

## Extend it

- Add memory so it references yesterday's routine for continuity
- Turn it into a 3-day check-in loop (feed results back into the next call)
- Connect a calendar MCP tool to actually schedule the evening wind-down
- Add quick-select chips (chronotype, work schedule) before the free-text box

---

Built with Claude as part of the ABTalks 60 Days Claude AI Challenge.