# Content Intelligence Studio

**Day 47 of the 60 Days Claude AI Challenge** · Built with Anthropic's Claude API

A single-file HTML application that acts as an AI content consultant for Instagram/TikTok
captions — analyzing copy through a multi-stage pipeline of specialized AI reviewers and
producing a full content health report, live from the Claude Messages API.

## What it does

Paste in a caption, and the app runs it through five specialized AI reviewers, each with
its own production-grade system prompt:

1. **Hook & Scroll-Stop Analyst** — scores the opening line's power to stop the scroll,
   with 3 rewritten hook alternatives
2. **Platform Algorithm Strategist** — evaluates reach/discoverability signals (comments,
   saves, shares, CTA strength)
3. **Caption Copywriter & Voice Editor** — reviews rhythm, clarity, authentic voice, and
   delivers a full rewritten caption
4. **Engagement Psychologist** — analyzes emotional triggers and audience psychology
5. **Executive Report Synthesizer** — combines all four reviews into one unified report

Every score, insight, and rewrite is generated live by Claude — there is no hardcoded
scoring logic or canned feedback anywhere in the app.

## Features

- Live reviewer pipeline with animated status (queued → analyzing → complete)
- Real-time activity log
- Animated overall score ring + category breakdown bars
- Strengths, weaknesses, and missed-opportunity tags
- Before/after caption rewrite comparison
- Alternative hook suggestions
- AI-estimated performance potential (clearly labeled as an estimate)
- Publishing checklist and "go deeper" follow-up prompts
- Retry logic per reviewer stage with exponential backoff
- Dark mode, fully responsive, zero external dependencies

## Key learning from Day 47

Structured-output prompting (asking a model to reply in JSON) is convenient but fragile —
one malformed brace and your whole UI breaks. Designing prompts around clearly labeled
plain-text sections, then parsing with targeted string/regex extraction, turned out to be
far more resilient for a live, multi-call pipeline like this — at the cost of slightly more
parsing code up front.

## Part of

60 Days Claude AI Challenge — Day 47/60, ABTalks Community