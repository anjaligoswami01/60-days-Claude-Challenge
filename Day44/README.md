# Day 44 — LinkedIn Roast & Rebuild Tool

Part of the **60 Days Claude AI Challenge**

## What it is

A single-file HTML app that takes a person's actual LinkedIn content (headline, About section, latest experience entry, top skills, target goal) and turns it into a structured, ex-recruiter-style review:

- **The Roast** — section-by-section scoring (headline, About hook, About full, experience, skills) with the recruiter's real 3-second reaction to each, why it hurts, and the invisible cost
- **The Rebuild** — rewritten headline options, About section (Hook / Story / Proof / CTA), before → after experience bullets, and prioritized skill recommendations
- **The Scorecard** — before vs. after score per section, plus an overall profile strength score
- **The 7-Day Activation Plan** — daily actions (not just profile edits): drafted posts, connection request templates, a "Value Comment" formula, and a review checklist for Day 7
- **The Summary Card** — a shareable "what changed" recap, screenshot-ready for LinkedIn

## How it works

The tool is prompt-driven, not code-driven — the underlying instruction set defines the roast/rebuild/plan structure, and the person's actual profile content is dropped in and never fabricated. Where a real number or detail is missing (data volume, pipeline count, etc.), the output leaves a clearly marked placeholder instead of inventing one.

## Build constraints

- Single-file HTML, vanilla JS — no npm, no backend, works offline
- Tabbed navigation across the 5 report sections
- Visual direction: "recruiter's red pen" — a report-card aesthetic (marker-red for problems, green for fixes) instead of a generic dashboard look, so the harsh feedback and the fix are visually distinct at a glance

## Key learning

The most common LinkedIn mistake isn't a bad experience section — it's an About section that leads with a status ("Open to Work," "Fresher, 1 year experience") instead of a value proposition. Recruiters decide whether to click "see more" in about two seconds, and a status-first hook fails that test almost every time, no matter how strong the actual work behind it is.

## Files

- `linkedin_roast_rebuild.html` — the interactive tool
- `screenshots/` — preview images of each report section

---
**Challenge:** 60 Days Claude AI Challenge · Day 44
**Community:** ABTalks (@AnilBajpai)
