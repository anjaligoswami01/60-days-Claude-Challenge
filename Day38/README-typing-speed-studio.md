# ⌨️ Typing Speed Studio

**Day 38 / 60 — 60 Days Claude AI Challenge**

A premium, single-file typing platform built with nothing but HTML, CSS, and vanilla JavaScript — no frameworks, no build step, fully offline.

## What it does

- **6 modes**: Time (15/30/60/120s), Word Count (25/50/100/250), Quote, Custom Text, Adaptive (shifts word difficulty in real time based on your rolling WPM/accuracy), and Zen (untimed, endless).
- **Focus Mode** dims everything but the current line; optional keystroke sound feedback.
- **Live stats**: WPM, Raw WPM, CPM, Accuracy, Elapsed Time, Mistakes, Streak, % Complete — plus a live rhythm strip that visualizes typing pace as you go.
- **Post-session dashboard**: WPM/accuracy graphs drawn on canvas, character breakdown, a keyboard error heatmap, achievement badges, a percentile estimate, and a personalized summary of strengths, weaknesses, and commonly mistyped keys.
- **Local history & personal bests** — no account needed, stored entirely in `localStorage`.
- Pause/resume, restart, keyboard shortcuts, 4 themes, adjustable font size, fully responsive.

## Run it

Open `typing-speed-studio.html` in any browser. No install, no server, no internet connection required.

## Key learning from building this

The tricky part wasn't the UI polish — it was making sure the numbers stay honest. Near-instant or synthetic inputs can blow WPM up to absurd values, so the stats engine explicitly guards against near-zero elapsed time and caps display values, rather than trusting raw math blindly. Real-time adaptive difficulty also needed a rolling window (every 15 words) instead of reacting to every keystroke, so the difficulty curve feels smooth rather than jumpy.

---

Built as part of the **[ABTalksOnAI Community](https://www.linkedin.com/company/abtalks-on-ai) 60 Days Claude AI Challenge**.
