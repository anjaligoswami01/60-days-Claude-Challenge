# Decision Report — Day 45 of #60DaysClaudeChallenge

An impartial Decision Strategist that interviews you about a tough decision, then generates a single-file interactive HTML dashboard analyzing your options — no fluff, no telling you what you want to hear.

## What it does

1. **Structured interview** — asks 4 focused questions, one at a time:
   - What's the decision and what are the options?
   - What's the goal and timeline?
   - What does your gut say, and what's stopping you?
   - What are you most afraid of getting wrong, and is it reversible?
2. **Auto-generates a full decision report** as a standalone HTML artifact, including:
   - The real decision, stripped of noise
   - A case-for card for each option (strength, hidden upside, weakness, "best if you value")
   - An **Assumption Buster** — surfaces hidden assumptions and names the cognitive biases at play (loss aversion, sunk cost, analysis paralysis, etc.)
   - An animated, scored **Decision Matrix** across 7 dimensions (career upside, financial safety, growth, stress, reversibility, alignment, regret risk)
   - A **premortem** for the top 2 options — imagining failure 12 months out, with warning signs and prevention actions
   - A **7-day test plan** to validate the decision before fully committing
   - A decisive **verdict** — picks one option and defends it
   - **Shareable mini-cards** sized for screenshotting straight to LinkedIn

## Tech constraints (per challenge rules)

- Single self-contained `.html` file — no build step, no backend
- Vanilla JS + CSS only
- Dark, premium UI with CSS-variable theming
- CSS `@keyframes` animations for the matrix bars (grow-on-load, staggered delays)
- Fully responsive down to mobile (matrix rows stack, cards go full-width)

## Key learning

The most useful part of this build wasn't the matrix math — it was the **Assumption Buster** section. Scoring options is easy; the harder and more valuable thing is naming what the person *isn't* saying. In my own test run, the report caught that I hadn't mentioned applying to a single job yet — which reframed the whole decision from "which one path is correct" to "what am I avoiding by deliberating."

That's the pattern worth keeping: a good decision tool doesn't just organize the options you gave it — it should surface the option, action, or blind spot you left out entirely.

## Files

- `decision_report.html` — the full interactive dashboard (open directly in any browser)
- `images/` — screenshots of the rendered report for sharing

---
Built as part of the **60 Days Claude AI Challenge** by **@ABTalksOnAI**.
`#60DaysClaudeChallenge` `#ClaudeAI` `#BuildInPublic`
