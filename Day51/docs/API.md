# AI Study Planner — API Design

_Day 2 deliverable. No implementation yet — this defines the contract for `api/ask-ai.js`, the only server-side endpoint in v1.0._

## Overview

There is exactly **one backend endpoint** in this system. Everything else (subjects, topics, scheduling) happens entirely in the browser with no network call. This is intentional, per the PRD's "minimal secure backend proxy" requirement — the smaller the API surface, the smaller the security and maintenance burden.

---

## `POST /api/ask-ai`

### Purpose
Securely forwards a request to the Anthropic Claude API on behalf of the frontend, so the API key never leaves the server. Handles all four AI feature types (explain, tip, motivation, Q&A) through one endpoint, differentiated by a `type` field.

### Authentication
None required from the client (per PRD — no user accounts in v1.0). The endpoint itself authenticates to the **Claude API** using `ANTHROPIC_API_KEY` from Vercel environment variables — this is server-to-server auth, invisible to the client.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "type": "explain",
  "context": { }
}
```

| Field | Type | Required | Allowed Values |
|---|---|---|---|
| `type` | string | yes | `"explain"`, `"tip"`, `"motivation"`, `"qa"` |
| `context` | object | yes | Shape depends on `type` — see below |

#### `context` shape per `type`

**`explain`**
```json
{
  "subjects": [{ "name": "Data Structures", "examDate": "2026-08-10" }],
  "revisionDays": 2
}
```

**`tip`**
```json
{
  "todaySubjects": ["Data Structures", "Operating Systems"],
  "todayTopics": ["Trees & Graphs", "Deadlocks"]
}
```

**`motivation`**
```json
{
  "daysUntilNearestExam": 5,
  "nearestSubject": "Data Structures"
}
```

**`qa`**
```json
{
  "question": "How should I revise for a subject I'm weak in?",
  "planSummary": "4 subjects, nearest exam in 5 days, 3 study hrs/day"
}
```

### Response

**Success — `200 OK`:**
```json
{
  "success": true,
  "type": "explain",
  "text": "Your plan prioritizes Data Structures first since its exam is closest..."
}
```

| Field | Type | Notes |
|---|---|---|
| `success` | boolean | always `true` on 200 |
| `type` | string | echoes the request type, useful for the frontend to route the response |
| `text` | string | plain-text AI-generated content, no markdown |

### Validation

| Rule | Failure Response |
|---|---|
| `type` must be present and one of the 4 allowed values | `400 Bad Request` |
| `context` must be present and an object | `400 Bad Request` |
| `context.question` (for `qa`) must be a non-empty string under 500 chars | `400 Bad Request` |
| Request body must be valid JSON | `400 Bad Request` |

### Error Cases

| Scenario | Status | Response Body |
|---|---|---|
| Missing/invalid `type` | 400 | `{ "success": false, "error": "Invalid or missing 'type'." }` |
| Missing/invalid `context` | 400 | `{ "success": false, "error": "Invalid or missing 'context'." }` |
| `ANTHROPIC_API_KEY` not configured on server | 500 | `{ "success": false, "error": "AI service is not configured." }` |
| Claude API request fails (network, rate limit, etc.) | 502 | `{ "success": false, "error": "AI service is temporarily unavailable." }` |
| Claude API returns an unexpected/empty response | 502 | `{ "success": false, "error": "AI service returned an unexpected response." }` |

The frontend (per Day 5–6 of the blueprint) must treat **any** non-`200` response as "AI temporarily unavailable" and fall back gracefully — the deterministic plan must always remain usable even if this endpoint fails entirely.

### Rate/Cost Note
No rate limiting is implemented in v1.0 (no accounts to key it against). Given expected personal/demo usage volume, this is an accepted risk for v1.0 and explicitly listed as a future consideration, not a blocker.

---

## Endpoints Explicitly Not Built (Confirming Scope)

To keep this unambiguous: there is **no** `/api/subjects`, `/api/plan`, `/api/users`, or any CRUD endpoint. All subject/topic/plan data is created, edited, and read entirely client-side via `localStorage` and `scheduler.js` — never sent to a server. This matches the PRD's no-database, no-login scope exactly.
