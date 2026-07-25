# AI Study Planner — Architecture

_Day 2 deliverable — Source of truth for system design. Do not deviate without flagging a conflict with the PRD._

## 1. Component Diagram

```mermaid
graph TB
    subgraph Browser["Browser (Client)"]
        UI["UI Layer<br/>(index.html, ui.js, style.css)"]
        Models["Data Models<br/>(models.js)"]
        Storage["Storage Layer<br/>(storage.js → localStorage)"]
        Scheduler["Scheduling Engine<br/>(scheduler.js)<br/>Deterministic, no network calls"]
        AIClient["AI Client<br/>(ai.js)"]
    end

    subgraph Vercel["Vercel (Hosting)"]
        StaticHost["Static File Hosting<br/>(index.html, css/, js/)"]
        ServerlessFn["Serverless Function<br/>(api/ask-ai.js)"]
        EnvVars["Environment Variables<br/>(ANTHROPIC_API_KEY)"]
    end

    subgraph External["External Service"]
        ClaudeAPI["Anthropic Claude API<br/>(/v1/messages)"]
    end

    UI --> Models
    UI --> Storage
    UI --> Scheduler
    UI --> AIClient
    Storage <--> LocalStorage[("Browser localStorage")]
    AIClient -- "POST /api/ask-ai" --> ServerlessFn
    ServerlessFn -- "reads key from" --> EnvVars
    ServerlessFn -- "forwards prompt" --> ClaudeAPI
    ClaudeAPI -- "AI response" --> ServerlessFn
    ServerlessFn -- "JSON response" --> AIClient
    StaticHost -.serves.-> UI
```

**Key design principle:** the Claude API key exists only inside the Vercel serverless function's environment variables. It is never sent to, stored in, or accessible from the browser.

## 2. Data Flow

```mermaid
flowchart LR
    A[User enters subjects,<br/>topics, exam dates,<br/>daily hours] --> B[storage.js<br/>saves to localStorage]
    B --> C[scheduler.js<br/>generateSchedule]
    C --> D[Plan object<br/>rendered in UI]
    D --> E{User requests<br/>AI feature?}
    E -- "Explain / Tip /<br/>Motivation / Q&A" --> F[ai.js sends<br/>POST to /api/ask-ai]
    F --> G[Serverless function<br/>builds prompt + calls Claude]
    G --> H[Claude response<br/>returned to browser]
    H --> I[AI panel<br/>updates in UI]
    E -- "No" --> J[Dashboard displayed<br/>as-is]
```

## 3. Request Lifecycle (AI Feature Example: "Explain my plan")

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend (ui.js)
    participant AI as ai.js
    participant FN as Serverless Function<br/>(api/ask-ai.js)
    participant C as Claude API

    U->>UI: Clicks "Explain my plan"
    UI->>AI: askAI("explain", planSummary)
    AI->>AI: Show loading state
    AI->>FN: POST /api/ask-ai<br/>{ type: "explain", context: {...} }
    FN->>FN: Build prompt from type + context
    FN->>C: POST /v1/messages<br/>(with ANTHROPIC_API_KEY header)
    C-->>FN: AI-generated explanation text
    FN-->>AI: { text: "..." } JSON response
    AI->>UI: Resolve promise with text
    UI->>U: Render explanation in AI panel
```

## 4. AI Interaction Model

The AI layer is **additive, not load-bearing** — if the Claude API is unreachable, the core scheduling and dashboard experience still works perfectly. Four distinct prompt "types" are handled by one serverless function:

| Type | Trigger | Input Context | Output |
|---|---|---|---|
| `explain` | User clicks "Explain my plan" | Plan summary (subjects, priorities, revision days) | 2–3 sentence plain-language explanation |
| `tip` | Loads automatically on dashboard view | Today's subjects/topics | One short, specific study tip |
| `motivation` | Loads automatically on dashboard view | Days remaining until nearest exam | One short motivational message |
| `qa` | User submits a question in the Q&A box | Free-text question + current plan as context | Direct, brief answer |

All four share the same request/response contract (see `API.md`), differing only in the `type` field and the `context` payload shape.

## 5. External Services

| Service | Purpose | Notes |
|---|---|---|
| Anthropic Claude API | Powers all AI features | Called exclusively server-side; free-tier-compatible usage (low request volume expected for a personal-use v1.0) |
| Vercel | Hosting (static + serverless) | Free Hobby tier; GitHub-connected for auto-deploy |
| GitHub | Source control + CI trigger | Existing `60-days-Claude-Challenge` repo, `Day51/` subfolder |

## 6. Why No Database / No Auth (Reaffirmed)

Per the approved PRD, v1.0 explicitly excludes accounts and cloud storage to keep the 1–2 hr/day timeline realistic for a first-time full-stack builder. `localStorage` fully satisfies the "persist across visits on the same device" requirement (FR-13). This is revisited only in future scope (multi-device sync).
