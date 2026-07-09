# ☕ Task Compass — Café / Restaurant Edition

**Day 37 / 60 — 60 Days Claude AI Challenge**

A single-file, fully offline HTML simulation that teaches how work actually flows through an organization — not by testing job titles, but by testing **ownership, delegation, routing, and collaboration**.

## What it does

Set in a café/restaurant, the player moves through three escalating stages:

1. **Who Owns This?** — Drag the right role onto realistic tickets (a wrong cappuccino, a broken espresso machine, a viral bad review) and get a reasoned explanation of who owns it and who assists.
2. **Task Routing** — Build the correct multi-step workflow for incoming issues (e.g. an allergy-sensitive order moving from Host → Server → Barista → Server), then watch it animate through the org.
3. **Collaboration Challenge** — For bigger, messier problems (a sales drop, a competitor opening nearby), assign up to four roles and see the primary owner, supporting teams, and communication flow.

The session ends with a scored breakdown across **Ownership, Delegation, Collaboration, and Workflow Thinking**, plus a written reflection on where the player over-assigned responsibility or underestimated the need for collaboration.

## Tech

- Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no external libraries or APIs.
- 100% offline — open the file directly in any browser.
- Native drag-and-drop, animated transitions, and a dark glassmorphism UI with a theme picker (Claude Orange / Midnight / Espresso).

## Run it

Just open `task-compass-cafe.html` in a browser. No install required.

## Key learning from building this

The hardest part wasn't the UI — it was resisting the urge to make every scenario have one "correct" answer. Real organizational logic is fuzzy: escalation paths shift depending on severity, and collaboration is often the *right* answer rather than a single owner. Encoding that nuance into scoring (partial credit for order, ideal-range scoring for team size) made the simulation feel far more honest than a simple right/wrong quiz.

---

Built as part of the **[ABTalksOnAI Community](https://www.linkedin.com/company/abtalks-on-ai) 60 Days Claude AI Challenge**.
