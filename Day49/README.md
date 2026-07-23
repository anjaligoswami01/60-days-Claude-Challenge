# Personal AI Playbook

**Day 49 of the 60 Days Claude AI Challenge** (by ABTalksOnAI)

A single-file, self-contained HTML application that replaces a scattered pile of AI prompts with a real, personal AI workflow system — built around how I actually work: client emails & proposals, reports & presentations, and marketing/social content.

---

## What this is

Most people's "AI prompt library" is a growing, unsearchable pile of one-off prompts in a notes app. The Personal AI Playbook is a system instead of a pile:

- **Reusable workflows** — editable prompt templates with fill-in variables, examples, and best practices, organized by category
- **A Prompt Builder** — assemble any new prompt from labeled, explained building blocks (role, objective, context, constraints, reasoning strategy, output format, tone, examples, quality checks), with a live preview
- **A Loop Builder** — turn any one-shot prompt into an autonomous, self-checking loop (goal → evaluation criteria → improvement strategy → stop condition → safety rule)
- **A Voice Profile** — a one-time setup describing my tone and phrasing, so templates produce first drafts that sound like me instead of generic AI output

It's built to be understood cold — a persistent explainer banner, an always-available "What is this?" button, and inline explanations on every builder block mean a first-time viewer (even from a screenshot) can tell what it does in seconds.

## Who it's for

Built for a **Business/Consulting/Ops** use case — daily, ad-hoc AI use for writing and content creation, where the biggest friction was rewriting AI output to sound personal rather than generic. The workflow library ships with templates for:

- Client Communication (follow-ups, delivering difficult news)
- Proposals & Pitches (proposal outlines, objection handling)
- Reports & Presentations (executive summaries, slide outlines)
- Marketing & Social (repurposing one idea into multiple post formats)
- Internal Ops (meeting notes → action items)

## Features

- 🧩 Modular prompt building blocks instead of hundreds of static prompts
- 📋 One-click copy on every template and every builder output
- ↻ Autonomous Loop Builder for self-improving prompts
- ◈ Persistent Voice Profile referenced across workflows
- ⭐ Favorite, duplicate, edit, and delete workflows
- 🔍 Search and category filters
- 🌗 Light/dark mode
- ⌨️ Keyboard shortcuts (`/` search, `N` new workflow, `D` dark mode, `Esc` close dialogs)
- 💾 Import/export your entire workflow library as JSON
- 🖥️ 100% client-side — no build step, no external libraries, no backend, no data leaves the browser (everything is stored in `localStorage`)

## Tech stack

Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no external dependencies. All state (workflows, favorites, usage counts, theme, voice profile) persists in the browser's `localStorage`.

---

Built as part of the **60 Days Claude AI Challenge** — a daily public build challenge by **ABTalksOnAI**.

#60DaysClaudeChallenge #ClaudeAI #BuildInPublic