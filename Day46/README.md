# Autonomous Agent Studio
**Day 46 — 60 Days Claude AI Challenge**

A single-file HTML app that runs a **real, live multi-agent orchestration pipeline** against the Claude API to autonomously generate, evaluate, and iteratively improve code — no key required, no backend, no libraries.

You give it a spec. It plans, writes, scores, critiques, rewrites, and re-scores itself in a genuine loop — stopping only when the code is actually good enough, or improvement has stalled.

---

## What it does

1. **You describe a function/script spec** (with a correctness threshold and a plateau sensitivity).
2. A **7-agent pipeline** takes over and runs live, one Claude API call per agent per round:
   - **Planner** — reads the spec once, produces the build approach and edge-case list.
   - **Executor** — writes the first working draft from the plan.
   - **Evaluator** — scores the current draft 0–100 on correctness only, every round.
   - **Critic** — turns that score into a concrete, prioritized punch-list of fixes.
   - **Improver** — rewrites the code addressing the punch-list (only agent allowed to touch code after round 0).
   - **Memory Manager** — compresses round history into a running note so later rounds don't re-litigate fixed issues.
   - **Final Reviewer** — runs once, after the loop exits, and independently signs off on the surviving draft.
3. **The loop is a real loop.** There's no hardcoded round count. After every Evaluator call, three checks run in order:
   1. **Plateau** — score gain < delta for 2 straight rounds
   2. **Threshold** — score ≥ target set at setup
   3. **Hard cap** — safety fallback only, never the intended ending
   
   Whichever fires first ends the loop and branches to the Final Reviewer.

## Why it's different from a "fake" agent demo

- Every score, critique, and plan shown in the UI is the **literal text from that round's API response** — nothing is templated or rule-based.
- State threads forward for real: each Improver call gets the prior round's evaluation + critique; each Evaluator call gets the current draft.
- A running history array (score, critique, draft, delta) drives the dashboard, the timeline, and the final stats — all derived from live calls, not simulated.

## Dashboard features

- Animated cyclic workflow diagram (Evaluator → Critic → Improver → back, with a live branch to Final Reviewer once a stop condition fires)
- Active-agent indicator strip across all 7 agents
- Open-ended round counter ("Round 4 — checking stop condition…", never "of N")
- Live activity log console
- Iteration history timeline with round-over-round score deltas
- Memory panel showing the Memory Manager's running note
- Final summary naming the **exact** stop reason, agent performance stats, and execution stats (rounds run, API calls made, retries triggered, wall-clock time)

## Tech

- Single self-contained `.html` file — vanilla HTML/CSS/JS, zero external libraries
- Calls `https://api.anthropic.com/v1/messages` directly with `fetch`, model `claude-sonnet-4-6`
- Retry logic with exponential backoff on API failures; graceful error recovery in the UI
- Fully responsive, dark-mode-only design tuned for a code-tool aesthetic

## How to run

Just open `autonomous-agent-studio.html` in a browser — no server, no build step, no API key entry needed. Fill in a spec, set your correctness threshold and plateau sensitivity, and click **Launch pipeline**.

## Key learning from building this

Designing the **stop-check as a strict, ordered decision** (plateau → threshold → hard cap) turned out to matter more than the agents themselves — it's the one piece of logic that decides whether the loop reads as "genuinely autonomous" or "just a for-loop with extra steps." Threading real evaluator/critic context into every Improver call, instead of just re-sending the raw spec, was what actually made rounds compound instead of repeat.

---

*Part of the [60 Days Claude AI Challenge](https://www.linkedin.com/) by ABTalksOnAI — building and shipping one interactive Claude-powered app publicly, every day.*
