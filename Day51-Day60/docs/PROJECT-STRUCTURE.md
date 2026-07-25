# AI Study Planner — Project Structure

_Day 2 deliverable. Reflects the actual folder structure created and confirmed today inside `Day51/` of the `60-days-Claude-Challenge` repo._

## Folder Layout

```
60-days-Claude-Challenge/
└── Day51/
    ├── README.md                          # Project overview, setup instructions (updated daily)
    ├── AI_Study_Planner_PRD.docx          # Day 1 deliverable
    ├── Implementation_Blueprint_Days2-10.md # Day 1 deliverable (source of truth for daily milestones)
    ├── AI_Study_Planner_Pitch_Deck.pptx   # Day 1 deliverable
    ├── screenshots/                       # Manual-step confirmation screenshots + final polish screenshots
    ├── docs/                              # Day 2 deliverable — all technical design docs
    │   ├── ARCHITECTURE.md
    │   ├── SCHEMA.md
    │   ├── API.md
    │   ├── UI-WIREFRAMES.md
    │   └── PROJECT-STRUCTURE.md           # (this file)
    ├── index.html                         # Single-page app entry point
    ├── css/
    │   └── style.css                      # All styling — single file, no preprocessor
    ├── js/
    │   ├── models.js                      # Data shape definitions (Subject, Topic, PlanDay, etc.)
    │   ├── storage.js                      # localStorage read/write logic
    │   ├── scheduler.js                    # Deterministic scheduling engine (pure logic, no network)
    │   ├── ui.js                          # DOM rendering + event wiring, orchestrates the other modules
    │   └── ai.js                          # (added Day 5) — calls /api/ask-ai, handles loading/error states
    └── api/
        └── ask-ai.js                      # Vercel serverless function — the only backend code in this project
```

## What Each Folder Is Responsible For

| Folder/File | Responsibility | Built On |
|---|---|---|
| `docs/` | All non-code planning and design artifacts — PRD lives one level up (Day 1), technical design docs live here (Day 2) | Day 1–2 |
| `screenshots/` | Evidence of manual steps completed (per your standing rule) and final polish screenshots for the README/LinkedIn post | Ongoing |
| `index.html` | The entire application shell — one page, no routing | Day 2 (scaffolded) → Day 6 (fully wired) |
| `css/style.css` | All visual styling in one file — no component-scoped CSS needed for a single-page vanilla-JS app | Day 2 → Day 9 (polish) |
| `js/models.js` | Documents the shape of `Subject`, `Topic`, `PlanDay`, `Block` objects — no classes needed, just consistent object shapes used across other files | Day 2 |
| `js/storage.js` | The only file that talks to `localStorage` — every other file goes through this one to read/write state, so the storage format can change in one place if needed | Day 3 |
| `js/scheduler.js` | The deterministic algorithm — takes `subjects` + `preferences`, returns a `generatedPlan`. Contains zero DOM code and zero network calls, which makes it independently testable (Day 4/7) | Day 4 |
| `js/ui.js` | The orchestrator — wires form submissions, renders the dashboard, calls `scheduler.js` and `storage.js`, and (from Day 5 on) `ai.js` | Day 3 → Day 6 |
| `js/ai.js` | The only file that calls `/api/ask-ai` — keeps all AI-fetch logic, loading states, and error handling in one place | Day 5 |
| `api/ask-ai.js` | The only server-side code — receives `{type, context}`, calls the Claude API using the environment-variable key, returns `{success, type, text}` | Day 5 |

## Where Future Code Will Live

- **No new top-level folders are expected** for the remaining 8 days — the structure above is designed to hold the entire v1.0 feature set (per the approved PRD scope).
- If a feature needs a new file (e.g., a `js/validation.js` for input validation added during Day 7 testing), it belongs inside the existing `js/` folder — not a new folder — to keep the flat, simple structure intact.
- `docs/` will not grow with new files unless a genuine new design artifact is needed; day-to-day progress notes belong in the README's "Build Journey" section instead, not as new files.

## Why This Structure Was Chosen

1. **No build tooling** → no `src/`, `dist/`, `public/`, or bundler config needed. What you write is what runs in the browser.
2. **One responsibility per file** in `js/` — mirrors the architecture's separation of concerns (storage vs. scheduling vs. rendering vs. AI), making each file independently understandable and testable, which matters given this is a first-time full-stack build.
3. **`api/` as a dedicated, isolated folder** — this is a Vercel convention (any file under `api/` automatically becomes a serverless function), and keeping it visually separate reinforces the "this is the only server-side code" mental model from the architecture doc.
4. **`docs/` separate from the root-level Day 1 deliverables** — keeps planning artifacts organized by SDLC phase without cluttering the project root where the actual runnable app lives.
5. **Everything fits inside `Day51/`** — respects the reality that this lives inside your `60-days-Claude-Challenge` monorepo alongside other daily builds, with zero risk of collision.
