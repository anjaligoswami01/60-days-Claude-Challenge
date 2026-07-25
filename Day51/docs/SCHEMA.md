# AI Study Planner — Data Schema

_Day 2 deliverable. No database is used in v1.0 (per PRD) — this document defines the localStorage data structure, which serves the same role a database schema would._

## 1. Storage Overview

All application state lives under a **single localStorage key** to keep read/write operations atomic and simple:

```
localStorage key: "aiStudyPlanner.state"
```

## 2. Top-Level Schema

```json
{
  "version": 1,
  "preferences": {
    "dailyHours": 3
  },
  "subjects": [
    {
      "id": "sub_1721234567890",
      "name": "Data Structures",
      "examDate": "2026-08-10",
      "topics": [
        { "id": "top_1721234567891", "name": "Trees & Graphs" },
        { "id": "top_1721234567892", "name": "Sorting Algorithms" }
      ]
    }
  ],
  "generatedPlan": {
    "generatedAt": "2026-07-26T10:00:00.000Z",
    "days": [
      {
        "date": "2026-07-26",
        "blocks": [
          {
            "subjectId": "sub_1721234567890",
            "subjectName": "Data Structures",
            "topicId": "top_1721234567891",
            "topicName": "Trees & Graphs",
            "type": "study",
            "durationMinutes": 90
          }
        ]
      }
    ]
  }
}
```

## 3. Field-Level Definitions

### `preferences`
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `dailyHours` | number | 0.5 ≤ value ≤ 16 | Total study hours available per day; validated on input (FR-2) |

### `subjects[]` (one entry per subject)
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | string | unique, generated via `Date.now()`-based id | Never shown to user |
| `name` | string | required, 1–100 chars | Subject display name |
| `examDate` | string (ISO date `YYYY-MM-DD`) | required, must be today or later | Validated at input time (Day 7 hardens this) |
| `topics[]` | array | at least 1 topic required | See below |

### `subjects[].topics[]`
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | string | unique within subject | Used to mark a block in the generated plan |
| `name` | string | required, 1–150 chars | Topic display name |

### `generatedPlan`
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `generatedAt` | ISO datetime string | — | Set every time `generateSchedule()` runs |
| `days[]` | array | one entry per calendar day from today to the last exam date | See below |

### `generatedPlan.days[]`
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `date` | string (ISO date) | required | One entry per day |
| `blocks[]` | array | sum of `durationMinutes` ≤ `dailyHours * 60` | Enforced by the scheduling engine, not the storage layer |

### `generatedPlan.days[].blocks[]`
| Field | Type | Constraints | Notes |
|---|---|---|---|
| `subjectId` | string | must reference an existing subject | Foreign-key-style relationship, enforced in application logic (no DB constraints available) |
| `subjectName` | string | — | Denormalized for easy rendering without a lookup |
| `topicId` | string \| null | null when `type` is `"revision"` | |
| `topicName` | string | — | For revision blocks, this is `"Revision"` |
| `type` | `"study"` \| `"revision"` | required | Distinguishes new-topic study blocks from pre-exam revision blocks |
| `durationMinutes` | number | > 0 | |

## 4. Relationships (Application-Enforced, Not DB-Enforced)

Since there is no real database, referential integrity is enforced entirely in JavaScript:

- `generatedPlan.days[].blocks[].subjectId` **must** reference an `id` present in `subjects[]`.
- If a subject is deleted, the plan must be regenerated (Day 6's "Regenerate Plan" flow) — stale plans are never left referencing a deleted subject.
- `topicId` **must** reference a `topics[].id` under the correct subject, or be `null` for revision blocks.

## 5. Versioning

The top-level `version` field exists so that if the schema changes in a later day (e.g., adding a new field), the app can detect an old stored shape and reset to defaults rather than crash. This was flagged as a real risk in Day 1's blueprint (Day 7 testing) and is addressed here at the design stage instead — see "Design Improvement" note below.

## 6. Validation Against PRD User Stories

| PRD Requirement | Covered By |
|---|---|
| FR-1: add/edit/remove subjects with topics + exam date | `subjects[]` structure |
| FR-2: set daily available study hours | `preferences.dailyHours` |
| FR-3–FR-6: generate schedule, prioritize, balance, insert revision | `generatedPlan.days[].blocks[]` with `type` field |
| FR-7: Today's Focus + timeline view | Both are *views* over `generatedPlan.days[]` — no separate storage needed |
| FR-8: regenerate plan on edit | `generatedPlan` is fully overwritten, `generatedAt` updated |
| FR-13: persistence via localStorage | Entire schema lives under one localStorage key |

## 7. Design Improvement Over Day 1 Blueprint (flagging per your instructions)

The Day 1 blueprint's data model (`Subject`, `StudyPreferences`, `PlanDay`) didn't specify a `version` field or a `type: "study"|"revision"` discriminator on plan blocks — it implied revision blocks via a `topicId or "revision"` shorthand. This schema makes both explicit:
- **`version` field** — directly addresses the "stale schema after later-day changes" risk flagged in the Day 1 blueprint's own Day 7 debugging notes, by solving it at design time instead of discovering it during testing.
- **Explicit `type` field** — removes ambiguity in `scheduler.js` and `ui.js` about how to detect a revision block (checking a `type` string is more robust than checking whether `topicId` happens to be a special string).

This is a refinement, not a scope change — no new features, no conflict with the PRD. Flagging for your awareness per the standing rule; no approval blocker here since it only clarifies implementation detail, but let me know if you'd like to discuss it further.
