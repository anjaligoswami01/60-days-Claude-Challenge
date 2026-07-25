# AI Study Planner — UI & User Flow

_Day 2 deliverable. Low-fidelity wireframes (ASCII/text-based) — visual design/polish happens Day 9 per the blueprint._

## 1. User Flow Diagram

```mermaid
flowchart TD
    A[Open App] --> B{Data in localStorage?}
    B -- No --> C[Empty State:<br/>"Add your first subject"]
    B -- Yes --> D[Dashboard:<br/>Today's Focus + Timeline + AI panel]
    C --> E[Add Subject Form]
    E --> F[Enter name, topics,<br/>exam date, daily hours]
    F --> G[Save → generateSchedule]
    G --> D
    D --> H{User action}
    H -- Edit/Add/Delete Subject --> E
    H -- Click 'Explain plan' --> I[AI: explanation shown]
    H -- View Timeline --> J[Full calendar/timeline view]
    H -- Ask a question --> K[AI: Q&A response shown]
    E --> L[Regenerate Plan] --> D
```

## 2. Screen Flow

There are **3 screens** in v1.0 — deliberately minimal per the PRD's "polished over feature-heavy" priority:

1. **Empty State / Onboarding** — shown only when no subjects exist yet
2. **Subject Form** — add or edit a subject (modal or inline panel, not a separate page)
3. **Dashboard** — the main screen: Today's Focus, Timeline, and AI panel together

There is no navigation menu, no multi-page routing, and no settings screen for v1.0 — everything happens on one continuously-updating page. This matches FR-7 and keeps the "every screen exists for a reason" principle honest: a 4th screen would exist only to hold navigation for navigation's sake.

## 3. Wireframes (Low-Fidelity)

### Screen 1 — Empty State

```
┌─────────────────────────────────────────────┐
│  🧠 AI Study Planner                          │
├─────────────────────────────────────────────┤
│                                                │
│         📚  No subjects yet                   │
│                                                │
│    Add your first subject to generate         │
│    your personalized study plan.              │
│                                                │
│         [ + Add Subject ]                     │
│                                                │
└─────────────────────────────────────────────┘
```

### Screen 2 — Subject Form (Add/Edit)

```
┌─────────────────────────────────────────────┐
│  Add Subject                            [ x ]│
├─────────────────────────────────────────────┤
│  Subject Name                                 │
│  [ Data Structures                        ]  │
│                                                │
│  Exam Date                                    │
│  [ 2026-08-10                    📅 ]         │
│                                                │
│  Topics (add one at a time)                   │
│  [ Trees & Graphs               ] [+ Add]     │
│   • Trees & Graphs                    [x]     │
│   • Sorting Algorithms                [x]     │
│                                                │
│  Daily Study Hours (applies globally)         │
│  [ 3 ]  hours/day                             │
│                                                │
│         [ Cancel ]      [ Save Subject ]      │
└─────────────────────────────────────────────┘
```

### Screen 3 — Dashboard (Main Screen)

```
┌───────────────────────────────────────────────────────────┐
│  🧠 AI Study Planner            [ + Add Subject ]  [⟳ Regenerate] │
├───────────────────────────────────────────────────────────┤
│  📌 TODAY'S FOCUS — July 26                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Data Structures → Trees & Graphs        (90 min)   │   │
│  │  Operating Systems → Deadlocks           (60 min)   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  🤖 AI Insights                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💬 "Data Structures is prioritized first because    │   │
│  │      its exam is closest..."     [ Explain my plan ] │   │
│  │  💡 Tip: Try active recall with flashcards for       │   │
│  │      Trees & Graphs today.                            │   │
│  │  🔥 5 days until your next exam — you've got this!    │   │
│  │  ─────────────────────────────────────────────────   │   │
│  │  Ask a study question:                                │   │
│  │  [ how do I revise weak topics fast?     ] [ Ask ]    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  📅 TIMELINE                                                 │
│  ┌────────┬────────┬────────┬────────┬────────┐            │
│  │ Jul 26 │ Jul 27 │ Jul 28 │ Jul 29 │ Jul 30 │  →scroll    │
│  │ DS, OS │ DS, OS │ DBMS   │ Revision│ EXAM  │            │
│  │        │        │        │  (DS)  │  (DS)  │            │
│  └────────┴────────┴────────┴────────┴────────┘            │
│                                                              │
│  📚 SUBJECTS                                                 │
│  • Data Structures  (exam Aug 10)     [Edit] [Delete]        │
│  • Operating Systems (exam Aug 12)    [Edit] [Delete]        │
└───────────────────────────────────────────────────────────┘
```

**Mobile layout note (responsive, per FR-14):** the same 3 screens stack vertically in a single column; the Timeline becomes horizontally scrollable (`overflow-x: auto`) instead of a fixed grid, exactly as specified in Day 6 of the blueprint.

## 4. Navigation

There is no traditional navigation bar. The only "navigation" actions are:
- **`+ Add Subject`** → opens the Subject Form (modal/inline panel over the Dashboard)
- **`⟳ Regenerate`** → re-runs the scheduler in place, no screen change
- **`Edit` / `Delete`** on a subject card → opens the Subject Form pre-filled, or removes + regenerates

This is intentional: a single-purpose tool for a focused daily task doesn't need deep navigation, and adding a nav bar would be scope without a reason — directly upholding "every screen should exist for a reason."

## 5. Why This Flow Satisfies the PRD

| PRD Requirement | Wireframe Coverage |
|---|---|
| FR-7: Today's Focus + Timeline view | Both present simultaneously on the Dashboard |
| FR-8: regenerate after edits | `⟳ Regenerate` button + auto-trigger after Subject Form save |
| FR-9–FR-12: AI explanation, tip, motivation, Q&A | All 4 present in the "AI Insights" panel |
| FR-14: responsive desktop/mobile | Single responsive layout, no separate mobile screens needed |
