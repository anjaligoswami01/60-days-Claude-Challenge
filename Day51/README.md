# 🧠 AI Study Planner

> Know what to study, every single day.

A web app that helps college students stop guessing what to study each day during semester exams. Enter your subjects, topics, and exam dates — get a reliable day-by-day study plan, automatically balanced and revision-ready, with a Claude-powered layer that explains, motivates, and answers your questions.

Built as a **10-day capstone project** for the **AB Talks 60-Day Claude AI Challenge** (Day 51/60), following a full SDLC: Requirements → Design → Setup → Implementation → Testing → Deployment → Maintenance.

**🔗 Live demo:** _coming soon (Day 8 of the capstone)_
**📄 Full PRD & build blueprint:** see `/docs` (added as the capstone progresses)

---

## 🎯 The Problem

> "I know what subjects I have, but I don't know how to divide my remaining days before exams. I either over-study one subject or ignore another."

College students juggling 3–8 subjects a semester rarely have a clear, reliable plan for what to study *today*. Manual planning is tedious, so it usually just doesn't happen.

## ✨ Key Features (v1.0)

- 📚 **Add subjects, topics & exam dates** — simple, fast input
- 🧮 **Deterministic scheduling engine** — a rule-based algorithm (not AI) that prioritizes subjects by exam proximity, balances daily workload, and always produces the same plan for the same inputs
- 📅 **Today's Focus + Calendar Timeline** — see exactly what to study today, and the full plan at a glance
- 🔁 **Auto revision days** — the engine reserves dedicated revision time before every exam automatically
- 🤖 **Claude-powered AI layer** — plain-language explanations of the plan, personalized daily tips, motivational messages, and a study Q&A assistant
- 🔒 **Secure by design** — the Claude API key never touches the browser; all AI calls go through a minimal serverless proxy
- 💾 **No login required** — your data saves automatically in your browser (localStorage)
- 📱 **Responsive** — works on both desktop and mobile browsers

## 🧱 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | HTML / CSS / vanilla JavaScript | No build tooling — simplest path for a first full-stack build |
| Scheduling Engine | Plain JavaScript (deterministic logic) | Predictable, testable, no AI involved in the schedule itself |
| Backend | Minimal serverless function (Node.js) | Only job: securely forward prompts to the Claude API |
| AI | Anthropic Claude API | Explanations, tips, motivation, Q&A — additive, not load-bearing |
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
│ Serverless Proxy     │ ─────────────────────────────▶│ Claude API   │
│ (api/ask-ai.js)       │◀───────────────────────────── │              │
│ API key in env vars   │        returns AI response    └──────────────┘
└─────────────────────┘
```

## 🚫 Out of Scope for v1.0 (Future Work)

- Progress tracking / completion status
- Automatic re-planning after missed study days
- User accounts and cross-device sync
- Notifications and reminders
- Native mobile apps
- AI-driven (non-deterministic) scheduling

## 🚀 Running Locally

```bash
git clone <repo-url>
cd ai-study-planner
# open index.html directly in a browser for frontend-only work
# for AI features, use the Vercel CLI to run the serverless function locally:
vercel dev
```

You'll need an Anthropic API key stored in a local `.env.local` file (never committed):
```
ANTHROPIC_API_KEY=your_key_here
```

## 📸 Screenshots

_Added as the build progresses through the capstone._

## 🗓️ Build Journey

This project is being built in public across 10 days as part of the AB Talks 60-Day Claude AI Challenge:

- **Day 1:** Product discovery, requirements, and sprint planning ✅
- **Days 2–10:** Design, setup, implementation, testing, deployment, and polish — in progress

## 🙌 Acknowledgements

Built with [Claude](https://claude.ai) as part of the 60-Day Claude AI Challenge by ABTalksOnAI.

---

*This README will be updated daily as the AI Study Planner moves from PRD to deployed v1.0.*
