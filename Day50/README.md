# Defend Your Experience — Day 50/60, 60 Days Claude AI Challenge

An AI-powered mock interviewer that doesn't review your resume — it interrogates it. Every bullet point, every metric, every "led" and "architected" gets pulled out as a standalone claim, and the app pushes you to defend it live until it either holds up or breaks.

Built as part of the **60 Days Claude AI Challenge**,by ** (ABTalksOnAI)**.

---

## What it does

1. **Extracts claims** from an uploaded resume/LinkedIn/portfolio (or a pre-loaded profile) — every metric, architecture decision, leadership statement, and compliance line becomes a defensible claim in a live "Claims Ledger."
2. **Runs an adaptive, skeptical interview** using the Claude API directly from the HTML file (no backend). The interviewer picks a claim, asks one sharp, specific follow-up, and escalates based on how the answer goes — vague answers get pushed harder, strong answers get a deeper follow-up or move to the next claim.
3. **Tracks confidence in real time** — every claim has a status (untested / probing / solid / weak) and a confidence bar, rolled up into an overall "interview readiness" gauge.
4. **Generates a final Defense Report** — a per-claim verdict, an honest note on how well it held up, and a concrete fix to strengthen it before the real interview.
5. **Persists locally** — session state is saved to `localStorage`, so a session can be closed and resumed, exported as JSON, or the report exported as a `.txt` file.

## Why this, not a resume reviewer

Resume reviewers optimize the document. This tool optimizes *you* — the goal isn't a better bullet point, it's being able to stand behind every word of it out loud, under real follow-up questioning, in front of a recruiter or panel.

## Tech

- Single self-contained `.html` file — HTML, CSS, and vanilla JavaScript only
- Calls the Anthropic Messages API (`claude-sonnet-4-6`) directly from the browser, inside the artifact environment (no API key handling, no backend)
- Structured JSON responses from the model drive the UI state (claim targeting, confidence deltas, status updates)
- Graceful fallback: if the API is rate-limited or unreachable, the app falls back to locally generated follow-up questions built from the claim text itself, so the session never just breaks
- `localStorage` for session persistence and lightweight session history
- Terminal / dark-mode visual style — claims ledger, live transcript, and a confidence gauge dashboard

---

## Sample Defense Report

*(Generated from a practice session run against the pre-loaded profile — a Data Engineer's resume claims, prepping for a recruiter screening call.)*

**Overall readiness: 66%**

> Solid on the concrete, well-measured claims — especially the ones with a clear before/after number and a personal action behind them. Still shaky on the compliance and architecture lines, which currently read as things that happened around the candidate rather than things the candidate specifically did. Needs another pass before the real screening call.

| Claim | Verdict | Note | Fix |
|---|---|---|---|
| "...improving data readiness by 30%." | 🟢 Solid | Gave a clear measurement method (ticket-resolution hours, before/after) and could name the exact baseline. | Keep this framing — it's a strong opener. Add the timeframe over which the 30% was measured. |
| "...reducing manual effort by 35%." | 🟢 Solid | Answered with real numbers (40 hrs/week → 26 hrs/week) and specified it was team-wide, not just personal. | Add one sentence on what "manual effort" specifically was, so it doesn't sound abstract on first mention. |
| "Architected Snowflake-based data marts..." | 🟡 Probing | Could describe the schema design but hasn't yet been pushed on tradeoffs (star vs. snowflake schema, why Snowflake over Redshift here). | Prepare one sentence on the specific tradeoff you weighed and why you chose the option you did. |
| "Ensures compliance with SOX and PCI-DSS..." | 🔴 Weak | Answer stayed at the policy level ("we followed SOX/PCI-DSS") without naming a specific control implemented personally. | Pick ONE control you touched directly (e.g., access logging, encryption at rest, audit trail) and rehearse it as a concrete example, not a policy statement. |
| "Led migration of legacy on-prem datasets... reducing infrastructure costs by 25%." | ⚪ Untested | Not yet probed this session. | Rehearse this one out loud before the real interview: the exact cost baseline, your specific role vs. the team's, and one thing that went wrong mid-migration. |

**Breakdown:** 2 solid · 1 probing · 1 weak · 1 untested

---

## Try it

Open `defend-your-experience.html` in a browser inside the Claude artifact environment. Use the pre-loaded profile to try it immediately, or drop in your own resume text to generate a personalized claims ledger.

---

Part of the **#60DaysClaudeChallenge** — built and shared in public.
