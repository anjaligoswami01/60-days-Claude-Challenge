# 💰 The Ledger — Personal Financial Command Center

**Day 42/60 — 60 Days Claude AI Challenge**

A single-file, offline-capable budgeting dashboard built for students living on allowance or parental support. Instead of a generic expense tracker, this is a full financial command center: health scoring, budgets, cash flow, AI-style insights, a what-if simulator, and calculators — all personalized through an upfront MCQ discovery flow.

## ✨ Features
- 📊 Overview dashboard with an animated Financial Health Score dial
- 💸 Allowance (income) and expense logging with categories
- 🎯 Per-category budget caps with live progress bars
- 📈 Cash flow charts — income vs. spend, running balance
- 🧠 Rule-based "AI insights" generated from logged data
- 🔮 What-If simulator with sliders for spend cuts & extra savings
- 🧮 Budget-split (50/30/20) and goal-savings calculators
- 🖨️ Printable monthly report
- 🌗 Dark mode, local storage persistence, fully responsive

## 🛠️ Tech
Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no external dependencies. Charts are hand-drawn on `<canvas>`. All data stays in the browser via `localStorage`.

## 🚀 Run it
Just open `personal-financial-command-center.html` in any browser. No setup required.

## 🔑 Key Learning
Gating the build behind a short MCQ discovery flow (user type → income source → priority → constraints) before generating any code led to genuine personalization — the tool *excluded* debt and goal-tracking modules because they weren't relevant, rather than including everything by default. Also a reminder to validate generated JS for escaping issues before shipping.

---
Built as part of the **60 Days Claude AI Challenge**.
Thanks to **@ABTalksOnAI**, **@Anthropic**, and **@AnilBajpai**.

`#60DaysClaudeChallenge` `#ClaudeAI` `#BuildInPublic`