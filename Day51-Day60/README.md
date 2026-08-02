# 🧠 AI Study Planner

> Know what to study, every single day.

A web app that helps college students stop guessing what to study each day during semester exams. Enter your subjects, topics, and exam dates — get a reliable day-by-day study plan, automatically balanced and revision-ready, with a Gemini-powered layer that explains, motivates, and answers your questions.

Built as a **10-day capstone project** for the **AB Talks 60-Day Claude AI Challenge** (Days 51–60), following a full SDLC: Requirements → Design → Setup → Implementation → Testing → Deployment → Maintenance.

> 📁 This entire capstone lives in the [`Day51-Day60`](.) folder of this repo — every day's progress is added here rather than split across separate daily folders.

**🔗 Live demo:** _coming soon (Day 8 of the capstone)_
**📄 Planning docs:** `AI_Study_Planner_PRD.docx`, `Implementation_Blueprint_Days2-10.md`, `AI_Study_Planner_Pitch_Deck.pptx`
**🏗 Design docs:** see `/docs` — `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`, `PROJECT-STRUCTURE.md`
**⚙️ Setup docs:** see `/docs` — `SETUP.md`, `ENVIRONMENT.md`, `DAY3-SUMMARY.md`

---

## 🎯 The Problem

> "I know what subjects I have, but I don't know how to divide my remaining days before exams. I either over-study one subject or ignore another."

College students juggling 3–8 subjects a semester rarely have a clear, reliable plan for what to study *today*. Manual planning is tedious, so it usually just doesn't happen.

## ✨ Key Features (v1.0)

- 📚 **Add subjects, topics & exam dates** — simple, fast input ✅ *implemented*
- 🧮 **Deterministic scheduling engine** — a rule-based algorithm (not AI) that prioritizes subjects by exam proximity, balances daily workload, and always produces the same plan for the same inputs ✅ *implemented*
- 📅 **Today's Focus + Calendar Timeline** — see exactly what to study today, and the full plan at a glance *(full dashboard UI coming Day 6)*
- 🔁 **Auto revision days** — the engine reserves dedicated revision time before every exam automatically, with zero idle gap days ✅ *implemented*
- 🤖 **AI layer (Google Gemini, free tier)** — plain-language explanations of the plan, personalized daily tips, motivational messages, and a live study Q&A assistant ✅ *implemented*
- 🔒 **Secure by design** — the AI API key never touches the browser; all AI calls go through a minimal serverless proxy ✅ *implemented*
- 💾 **No login required** — your data saves automatically in your browser (localStorage) ✅ *implemented*
- 📱 **Responsive** — works on both desktop and mobile browsers

## 🧱 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | HTML / CSS / vanilla JavaScript | No build tooling — simplest path for a first full-stack build |
| Scheduling Engine | Plain JavaScript (deterministic logic) | Predictable, testable, no AI involved in the schedule itself |
| Backend | Minimal serverless function (Node.js) | Only job: securely forward prompts to the AI API |
| AI | Google Gemini API (free tier) | Explanations, tips, motivation, Q&A — additive, not load-bearing; genuinely free, no card required |
| Hosting | Vercel | Single platform for frontend + serverless function, GitHub auto-deploy, free tier |
| Persistence | Browser `localStorage` | No database or accounts needed for v1.0 |

## 🏗️ Architecture

```
┌─────────────┐      generates plan       ┌───────────────────────┐
│  Frontend    │ ─────────────────────────▶│ Deterministic          │
│  (HTML/CSS/  │                            │ Scheduling Engine      │
│  vanilla JS) │◀───────────────────────── │ (pure JS logic)        │
└──────┬───────┘      returns plan          └───────────────────────┘
       │
       │ AI feature request (explain / tip / motivate / Q&A)
       ▼
┌─────────────────────┐        forwards prompt        ┌──────────────┐
│ Serverless Proxy     │ ─────────────────────────────▶│ Gemini API   │
│ (api/ask-ai.js)       │◀───────────────────────────── │ (free tier)  │
│ API key in env vars   │        returns AI response    └──────────────┘
└─────────────────────┘
```

Full diagrams (component, data flow, request lifecycle) are in `docs/ARCHITECTURE.md`.

## 🚫 Out of Scope for v1.0 (Future Work)

- Progress tracking / completion status
- Automatic re-planning after missed study days
- User accounts and cross-device sync
- Notifications and reminders
- Native mobile apps
- AI-driven (non-deterministic) scheduling

## 📂 Project Structure

```
Day51-Day60/
├── README.md
├── AI_Study_Planner_PRD.docx
├── Implementation_Blueprint_Days2-10.md
├── AI_Study_Planner_Pitch_Deck.pptx
├── package.json
├── vercel.json
├── .gitignore
├── .env.local           (git-ignored — holds GEMINI_API_KEY)
├── screenshots/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   ├── SETUP.md
│   ├── ENVIRONMENT.md
│   └── DAY3-SUMMARY.md
├── index.html            (Subject Form + list + AI panel — working)
├── css/style.css
├── js/
│   ├── models.js          (data shapes documented)
│   ├── storage.js          (localStorage read/write — implemented Day 4)
│   ├── scheduler.js         (deterministic scheduling engine — implemented Day 4)
│   ├── ai.js               (AI client — implemented Day 5)
│   └── ui.js               (form + subject list + AI panel wiring — implemented Day 4–5)
└── api/ask-ai.js           (secure Gemini proxy — implemented Day 5)
```

Full explanation of each folder's responsibility is in `docs/PROJECT-STRUCTURE.md`.

## 🚀 Running Locally

```bash
git clone https://github.com/anjaligoswami01/60-days-Claude-Challenge.git
cd 60-days-Claude-Challenge/Day51-Day60
vercel dev
# then visit http://localhost:3000
```

You'll need a free Google Gemini API key (get one at https://aistudio.google.com/apikey — no card required) stored in a local `.env.local` file (never committed):
```
GEMINI_API_KEY=your_key_here
```

Full step-by-step instructions, including troubleshooting for common setup errors, are in `docs/SETUP.md`.

## 📸 Screenshots

_Added as the build progresses through the capstone._

## 🗓️ Build Journey

This project is being built in public across 10 days as part of the AB Talks 60-Day Claude AI Challenge:

- **Day 1 (Day 51):** Product discovery, requirements, and sprint planning ✅
- **Day 2 (Day 52):** System design — architecture, data schema, API contracts, wireframes, and project structure ✅
- **Day 3 (Day 53):** Environment setup, Vercel configuration, and a verified "Hello World" foundation ✅
- **Day 4 (Day 54):** Subject management UI, localStorage persistence, and the deterministic scheduling engine ✅
- **Day 5 (Day 55):** Free-tier AI layer (Google Gemini) via a secure serverless proxy — explanations, tips, motivation, and Q&A, all live ✅
- **Days 6–10 (Days 56–60):** Full dashboard integration, testing, deployment, and polish — in progress

## 🙌 Acknowledgements

Built with [Claude](https://claude.ai) as part of the AB Talks 60-Day Claude AI Challenge.
AI features powered by Google's Gemini API (free tier).
Community: [@ABTalks](#) · [@AnilBajpai](#)

---

*This README is updated daily as the AI Study Planner moves from PRD to deployed v1.0.*