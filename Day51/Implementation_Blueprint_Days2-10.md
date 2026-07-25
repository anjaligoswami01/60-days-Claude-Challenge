# AI Study Planner — Implementation Blueprint (Days 2–10)

**This document is the single source of truth for the remainder of this capstone.** Each day's section is self-contained: if you start a fresh AI conversation, paste in that day's section (plus the PRD) and the assistant can continue building without re-deciding architecture.

## Locked Foundational Decisions (do not re-litigate these)

- **Project:** AI Study Planner — deterministic rule-based scheduling engine + Claude API enhancement layer, for college students prepping for semester exams.
- **No login, no database.** All user data persists in browser `localStorage`.
- **Scheduling is deterministic** — plain JavaScript logic, no AI involved in generating the schedule itself.
- **AI is additive only** — explanations, tips, motivation, Q&A — called through a secure backend proxy.
- **Tech stack (finalized for this build, chosen for beginner-friendliness + single-platform deploy):**
  - Frontend: plain **HTML + CSS + vanilla JavaScript** (no build tooling, no framework — keeps setup and deployment trivial given zero prior deployment experience)
  - Backend: a single **serverless function** (Node.js) whose only job is to forward a prompt to the Claude API and return the response
  - Hosting: **Vercel** — chosen because it deploys a static frontend and serverless functions from one repo with one command, has first-class GitHub auto-deploy, free tier, and simple environment-variable management for the API key
  - AI: **Anthropic Claude API** (model: Claude Sonnet — chosen at implementation time in Day 5), called only from the serverless function, never from the browser
- **Time budget:** ~1–2 hours/day. Every day below is sized for that budget, not more.
- **Definition of done (Day 10):** live URL, working scheduler + AI layer, localStorage persistence, responsive UI, public GitHub repo with README, LinkedIn post.

---

## Day 2 — Design & Project Setup

🎯 **Objective:** Turn the PRD into a concrete data model and file/folder structure; get a local project scaffold running in the browser (no backend yet).

📖 **What I'll learn:** How to translate product requirements into a data schema; basic project scaffolding without a build tool; how localStorage works.

🛠 **Features to build:**
- Empty project skeleton (folders + placeholder files)
- Data model for subjects, topics, exam dates, study hours, and the generated plan
- A static "Add Subject" form (no logic wired yet — just HTML/CSS)

📝 **Step-by-step implementation plan:**
1. Create the project folder structure (see Files below).
2. Define the core data shapes in comments or a `models.js` file:
   - `Subject = { id, name, topics: [{id, name}], examDate, priorityWeight }`
   - `StudyPreferences = { dailyHours }`
   - `PlanDay = { date, blocks: [{ subjectId, topicId or "revision", durationMinutes }] }`
3. Build a static HTML page with a form: subject name, topic list (comma-separated or add-topic-by-topic), exam date picker, and a global "daily study hours" field.
4. Style with a simple, clean CSS layout (mobile-first, single column that expands on desktop).
5. Confirm the form renders correctly in the browser — no submit logic yet, this is pure UI scaffolding.

📂 **Files/folders to create:**
```
ai-study-planner/
  index.html
  css/
    style.css
  js/
    models.js       (data shape definitions/comments)
    storage.js       (empty stub — filled Day 3)
    scheduler.js      (empty stub — filled Day 4)
    ui.js            (empty stub — filled Day 3)
  api/
    ask-ai.js        (empty stub — filled Day 5, this becomes the Vercel serverless function)
  README.md          (placeholder)
```

🔗 **Tools:** None yet — just a code editor and a browser. No npm install needed for a plain HTML/CSS/JS project.

🧪 **Testing tasks:** Open `index.html` directly in a browser (double-click or drag into browser). Confirm the form fields render, are readable on mobile-width (use browser dev tools device toolbar), and no console errors appear.

🐞 **Common issues:**
- Blank page → check the browser console for a JS syntax error in an empty/malformed file.
- CSS not applying → check the `<link>` path in `index.html` matches `css/style.css` exactly (case-sensitive).

✅ **End-of-day checklist:**
- [ ] Folder structure created exactly as above
- [ ] Data model documented in `models.js`
- [ ] Static form renders correctly on desktop and mobile width
- [ ] No console errors

📸 **Screenshot to capture:** The static form in the browser, plus dev tools mobile view.

➡️ **Handoff notes for Day 3:** The form exists but does nothing yet. Next: wire it up to JavaScript so "Add Subject" actually stores subjects (in memory, then localStorage), and multiple subjects can be listed/edited/removed.

---

## Day 3 — Core Data Layer + localStorage Persistence

🎯 **Objective:** Make the app actually store and retrieve subjects using localStorage, with add/edit/delete working end-to-end.

📖 **What I'll learn:** JavaScript event handling, working with `localStorage.getItem`/`setItem`, JSON serialization, rendering dynamic lists from data.

🛠 **Features to build:**
- Add / edit / delete subject (with topics, exam date)
- Set daily available study hours
- Persist everything to localStorage automatically
- Render a list of currently-added subjects on the page

📝 **Step-by-step implementation plan:**
1. In `storage.js`, write `saveData(state)` (JSON.stringify → localStorage.setItem) and `loadData()` (localStorage.getItem → JSON.parse, with a fallback to an empty default state if nothing exists yet).
2. In `ui.js`, wire the "Add Subject" form's submit event: read form values, construct a `Subject` object (generate an `id` using `Date.now()` or a simple counter), push it into an in-memory `state.subjects` array, call `saveData(state)`, then re-render the subject list.
3. Build a `renderSubjectList(state)` function that loops over `state.subjects` and creates a card per subject showing name, topic count, exam date, and Edit/Delete buttons.
4. Wire Delete: remove the subject from `state.subjects`, save, re-render.
5. Wire Edit: pre-fill the form with the subject's existing values, and on save, update instead of adding.
6. On page load, call `loadData()` and immediately render whatever was previously saved (this proves persistence works across reloads).
7. Wire the "daily study hours" field to also save into `state.preferences.dailyHours` on change.

📂 **Files/folders to modify:** `js/storage.js`, `js/ui.js`, `index.html` (add container elements for the subject list).

🔗 **Tools:** None external — pure vanilla JS and the browser's built-in `localStorage` API.

🧪 **Testing tasks:**
- Add 3–4 subjects, refresh the page, confirm they're still there.
- Delete a subject, refresh, confirm it stays deleted.
- Edit a subject's exam date, refresh, confirm the change persisted.
- Open dev tools → Application tab → Local Storage, and manually inspect the saved JSON to confirm it looks correct.

🐞 **Common issues:**
- "Cannot read property of undefined" on load → your `loadData()` fallback default state is missing a field the render function expects; make sure the default state object has empty arrays, not `undefined`.
- Data doesn't persist → check you're calling `saveData()` after every mutation, not just on page unload.
- Duplicate entries after edit → make sure Edit updates the existing object by `id`, rather than pushing a new one.

✅ **End-of-day checklist:**
- [ ] Can add, edit, and delete subjects
- [ ] Daily study hours field saves correctly
- [ ] Data survives a full page refresh
- [ ] Local Storage JSON inspected and looks correct

📸 **Screenshot to capture:** Subject list with 3+ subjects added, plus the Local Storage inspector panel showing saved JSON.

➡️ **Handoff notes for Day 4:** Data layer is solid — subjects, topics, exam dates, and study hours all persist. Next: build the actual deterministic scheduling engine that turns this stored data into a day-by-day plan. No AI yet — pure logic.

---

## Day 4 — Deterministic Scheduling Engine

🎯 **Objective:** Build the core algorithm that turns subjects/topics/exam dates/daily hours into a day-by-day study plan with revision sessions — the heart of the product.

📖 **What I'll learn:** Designing and testing a deterministic algorithm; working with dates in JavaScript; greedy/priority-based scheduling logic.

🛠 **Features to build:**
- `generateSchedule(subjects, dailyHours, today)` function in `scheduler.js`
- Priority logic: subjects with nearer exam dates get scheduled sooner and more densely
- Workload balancing: no single day is overloaded relative to `dailyHours`
- Automatic revision day(s) inserted immediately before each subject's exam date

📝 **Step-by-step implementation plan:**
1. Compute `daysUntilExam` for each subject relative to `today`.
2. Reserve the **last 1 day before each exam date** (or 2 if days available allow) as a "revision block" for that subject — mark these days first before distributing new-topic study time.
3. For each subject, compute `topicsRemaining` and `daysAvailableForNewTopics` (days between today and the start of its revision block). Compute `topicsPerDay = ceil(topicsRemaining / daysAvailableForNewTopics)`.
4. Build a priority queue/sort: subjects sorted by `daysUntilExam` ascending (soonest exam = highest priority).
5. Walk day-by-day from today to the furthest exam date. For each day, allocate `dailyHours` worth of time slots across the subjects that are "active" that day (i.e., still have topics left and haven't reached their exam), giving more time-share to higher-priority (sooner-exam) subjects. A simple approach: split available hours proportionally to `1 / daysUntilExam` per subject, rounding to whole topic blocks.
6. On revision-block days for a subject, replace new-topic slots with a "Revision: <Subject>" block instead.
7. Output a `PlanDay[]` array: `{ date, blocks: [{subjectName, topicName or "Revision", durationMinutes}] }`.
8. Handle edge cases: a subject with only 1 day left before its exam (skip new topics, just revision); more subjects than can fit in daily hours (still allocate at least a minimal block per active subject, or clearly flag "tight schedule" — keep this simple, don't over-engineer).
9. Write 3–4 manual test cases by hand (e.g., "2 subjects, 5 days, 2 hrs/day") and verify the function's output matches your expected reasoning.

📂 **Files/folders to modify:** `js/scheduler.js` (all new logic), a scratch `test-scheduler.html` or browser console tests (not shipped, just for verifying logic).

🔗 **Tools:** None external — this is pure JavaScript logic, testable directly in the browser console.

🧪 **Testing tasks:**
- Manually test with edge cases: 1 subject only; a subject with an exam tomorrow; a subject with topics but zero remaining days (should not crash); many subjects with overlapping exam dates.
- Confirm total scheduled minutes per day never exceeds `dailyHours * 60`.
- Confirm every subject gets at least one revision block before its exam.

🐞 **Common issues:**
- Off-by-one date errors → always compare using midnight-normalized `Date` objects, not raw `Date.now()` timestamps, to avoid timezone/time-of-day bugs.
- Division by zero → guard `daysAvailableForNewTopics` and `daysUntilExam` against 0 before using them as a divisor.
- Infinite/huge loops → if an exam date is in the past or invalid, validate the form input on Day 3 to prevent bad data from ever reaching the scheduler.

✅ **End-of-day checklist:**
- [ ] `generateSchedule()` implemented and returns a structured plan
- [ ] Manually tested against at least 4 different input scenarios
- [ ] Revision blocks appear correctly before each exam
- [ ] No day exceeds the daily hour budget

📸 **Screenshot to capture:** Browser console output showing a generated schedule object for a realistic test case (e.g., 4 subjects, varying exam dates).

➡️ **Handoff notes for Day 5:** The scheduling engine works and is testable via console, but isn't wired to the UI yet, and there's no AI layer yet. Next: build the AI layer (backend proxy) — the scheduling logic itself does not change from here on.

---

## Day 5 — AI Layer: Secure Backend Proxy + Claude API Integration

🎯 **Objective:** Stand up the minimal serverless function that securely calls the Claude API, and connect it to real features (explanation, tip, motivation, Q&A).

📖 **What I'll learn:** What a serverless function is and how it differs from a traditional backend; environment variables; making authenticated API calls to Claude; basic prompt engineering for structured, reliable outputs.

🛠 **Features to build:**
- `api/ask-ai.js` serverless function: accepts a `{ type, context }` payload from the frontend, builds an appropriate prompt per `type` (`"explain"`, `"tip"`, `"motivation"`, `"qa"`), calls the Claude API, returns the text response
- Frontend functions in a new `js/ai.js` that call this endpoint via `fetch()` and display results (with a loading state)

📝 **Step-by-step implementation plan:**
1. Set up a local Vercel project (this is also effectively "local setup" for deployment — Vercel lets you run serverless functions locally via `vercel dev`). Guided steps for account creation and CLI will be provided when you're ready to do this step — confirm before proceeding.
2. Store your Anthropic API key as a local environment variable (`.env.local` — **never commit this file**; add it to `.gitignore` immediately).
3. Write `api/ask-ai.js` as a Node serverless function: read `req.body` for `{ type, context }`, construct the appropriate system/user prompt per type, call `https://api.anthropic.com/v1/messages` with the API key from `process.env.ANTHROPIC_API_KEY`, return `{ text: <response> }` as JSON.
4. Build four prompt templates directly in the function:
   - `explain`: given the generated plan summary, explain in 2–3 sentences why it was structured this way.
   - `tip`: given today's subjects/topics, give one short, specific study tip.
   - `motivation`: given how many days remain until the nearest exam, give one short motivational message.
   - `qa`: given a free-text student question plus their current plan as context, answer helpfully and briefly.
5. In `js/ai.js`, write `askAI(type, context)` that `fetch()`s `/api/ask-ai` with a POST body, handles loading/error states, and returns the text.
6. Wire these into the UI: an "Explain my plan" button, a daily tip panel, a motivational banner, and a simple text-input Q&A box with a response area.
7. Add basic error handling: if the API call fails (network error, missing key, rate limit), show a friendly fallback message rather than a broken UI.

📂 **Files/folders to create/modify:** `api/ask-ai.js`, `js/ai.js`, `.env.local`, `.gitignore`, `index.html` (add AI feature UI elements).

🔗 **APIs/tools to integrate:** Anthropic Claude API (`/v1/messages` endpoint, model: Claude Sonnet), Vercel CLI (`vercel dev` for local serverless testing).

🧪 **Testing tasks:**
- Test each of the 4 prompt types individually with realistic data.
- Test with the API key intentionally removed/renamed to confirm the error fallback works gracefully.
- Confirm the API key never appears anywhere in browser dev tools (Network tab request payload, or page source) — only the `/api/ask-ai` request should be visible from the browser, never a raw Anthropic API call.

🐞 **Common issues:**
- CORS or 404 on `/api/ask-ai` → confirm the file is exactly at `api/ask-ai.js` (Vercel's convention-based routing depends on this exact folder name).
- "process.env.ANTHROPIC_API_KEY is undefined" → confirm `.env.local` exists, is spelled correctly, and `vercel dev` was restarted after creating it.
- Claude response includes markdown/extra formatting when you wanted plain text → explicitly instruct the prompt to "respond in plain conversational text, no markdown, no headers."

✅ **End-of-day checklist:**
- [ ] Serverless function responds correctly to all 4 request types
- [ ] API key confirmed never exposed to the browser
- [ ] `.env.local` added to `.gitignore`
- [ ] Basic error fallback tested and working

📸 **Screenshot to capture:** Browser Network tab showing a request to `/api/ask-ai` (not directly to Anthropic), plus the AI-generated explanation/tip visible in the UI.

➡️ **Handoff notes for Day 6:** Scheduling engine (Day 4) and AI layer (Day 5) both work independently. Next: wire everything together into one cohesive dashboard UI — the calendar/timeline view, Today's Focus panel, and all AI features displayed together in a polished layout.

---

## Day 6 — Full Dashboard UI Integration

🎯 **Objective:** Bring the scheduling engine, AI layer, and data layer together into one polished, cohesive dashboard.

📖 **What I'll learn:** Composing multiple JS modules into one app flow; building a calendar/timeline UI from data; responsive layout techniques.

🛠 **Features to build:**
- "Today's Focus" card: today's date, subjects/topics to study today, revision flags
- Calendar/timeline view: a scrollable list or grid showing every day's plan from today through the last exam
- AI panel: explanation, tip, motivation, and Q&A box, all visible alongside the plan
- "Regenerate Plan" button that re-runs the scheduler when subjects/hours are edited

📝 **Step-by-step implementation plan:**
1. On page load: `loadData()` → if subjects exist, call `generateSchedule()` → render both Today's Focus and the full timeline.
2. Build `renderTodayFocus(planDay)`: a prominent card showing today's blocks.
3. Build `renderTimeline(plan)`: loop over each `PlanDay`, render a compact card per day (date, subject blocks, revision badge if applicable). Use CSS to make this horizontally scrollable on mobile, grid on desktop.
4. Wire "Regenerate Plan": call `generateSchedule()` again with current state whenever a subject/hours field changes and the user confirms, then re-render Today's Focus + timeline.
5. Place the AI panel below or beside the plan: "Explain this plan" button triggers `askAI("explain", ...)`; tip and motivation load automatically on page view; Q&A box is a simple input + send button + response area.
6. Polish the layout: consistent spacing, a clear visual hierarchy (Today's Focus most prominent, timeline secondary, AI panel supporting), and a simple color scheme.
7. Test the full user journey end-to-end: add subjects → generate plan → view today's focus → view timeline → get AI explanation → ask a question → edit a subject → regenerate.

📂 **Files/folders to modify:** `index.html`, `css/style.css`, `js/ui.js` (main orchestration logic tying scheduler.js + ai.js + storage.js together).

🔗 **Tools:** None new — this is integration of what already exists.

🧪 **Testing tasks:**
- Full end-to-end manual walkthrough (listed above) with realistic data (4–6 subjects, varying exam dates).
- Test on a narrow mobile-width browser window and a wide desktop window.
- Test with zero subjects added (empty state) — should show a friendly prompt to add a subject, not a broken/blank dashboard.

🐞 **Common issues:**
- Timeline overflowing the screen → apply `overflow-x: auto` with `white-space: nowrap` on the container for mobile, or switch to a CSS grid for desktop.
- Stale plan shown after edits → make sure "Regenerate Plan" is actually called after every relevant edit, not just on initial load.
- AI panel blocking page load → make AI calls asynchronous and non-blocking; the deterministic plan should render immediately, with AI content populating in as it arrives.

✅ **End-of-day checklist:**
- [ ] Today's Focus, timeline, and AI panel all visible and functioning together
- [ ] Regenerate Plan works correctly after edits
- [ ] Empty state (no subjects) handled gracefully
- [ ] Tested on both mobile-width and desktop-width browser windows

📸 **Screenshot to capture:** Full dashboard view (desktop) and full dashboard view (mobile width), showing Today's Focus, timeline, and AI panel together.

➡️ **Handoff notes for Day 7:** The app is now feature-complete and fully wired end-to-end, running locally. Next: dedicated testing day — deliberately try to break it, fix bugs, and tighten edge cases before deployment.

---

## Day 7 — Testing & Bug Fixing

🎯 **Objective:** Deliberately stress-test the app and fix any bugs found before deployment, so Day 8's deployment isn't blocked by last-minute discoveries.

📖 **What I'll learn:** Manual QA thinking (edge cases, invalid input, boundary conditions); basic debugging workflow using browser dev tools.

🛠 **Features to build:** None new — this day is entirely testing and fixes.

📝 **Step-by-step implementation plan:**
1. Build a test checklist covering: invalid/missing inputs (no topics, exam date in the past, zero daily hours), boundary cases (1 subject, 10+ subjects, exam date = today, exam date = tomorrow), data persistence (refresh mid-session, close and reopen browser), AI failure handling (temporarily break the API key to confirm graceful fallback still works), and responsive layout (resize browser from narrow to wide).
2. Go through the checklist methodically, noting every bug or rough edge in a simple bug list (a markdown checklist or plain notes file).
3. Fix bugs one at a time, re-testing after each fix.
4. Add basic input validation if missing (e.g., prevent submitting a subject with an exam date in the past, prevent zero/negative daily hours).
5. Do a final full walkthrough as a brand-new user would experience it (clear localStorage first via dev tools, then use the app from a completely empty state).

📂 **Files/folders to modify:** Likely small fixes across `js/scheduler.js`, `js/ui.js`, `js/storage.js`, `index.html`/`style.css` — driven by whatever bugs are found, not new files.

🔗 **Tools:** Browser dev tools (Console, Application tab for localStorage, Network tab for AI calls, device toolbar for responsive testing).

🧪 **Testing tasks:** This entire day is the testing task — see the checklist in step 1 above. Treat it as the primary deliverable.

🐞 **Common issues found at this stage (watch for these specifically):**
- Scheduler behaving oddly when exam date equals today or is in the past (should be blocked at input validation, not crash the scheduler).
- Old stale localStorage schema conflicting with new fields added on later days (consider a simple `version` field in stored data, and reset to defaults if the version doesn't match).
- AI panel showing a stuck "Loading..." state forever if the API call silently fails without a `.catch()`.

✅ **End-of-day checklist:**
- [ ] Full test checklist completed and documented
- [ ] All discovered bugs fixed and re-tested
- [ ] Input validation in place for invalid/edge-case inputs
- [ ] Full fresh-user walkthrough completed successfully from an empty localStorage state

📸 **Screenshot to capture:** Your bug list/checklist document (before and after — showing issues found and resolved).

➡️ **Handoff notes for Day 8:** The app is stable and tested locally. Next: deploy it live for the first time via GitHub + Vercel, including environment variable setup for the Claude API key in production.

---

## Day 8 — Deployment (GitHub + Vercel + Environment Variables)

🎯 **Objective:** Get the app live on a public URL for the first time, with the Claude API key securely configured in production.

📖 **What I'll learn:** Git basics (init, add, commit, push), creating a GitHub repository, connecting a repo to Vercel, configuring production environment variables, how automatic deployments work.

🛠 **Features to build:** None new — this is purely deployment/infrastructure. (This is a manual-step-heavy day — every step below will be walked through in detail, in order, waiting for your confirmation and a screenshot at each stage before continuing.)

📝 **Step-by-step implementation plan:**
1. Initialize a git repository in the project folder (`git init`), create a `.gitignore` (must include `.env.local`, `node_modules`), and make an initial commit.
2. Create a new public GitHub repository (walked through step by step: exact buttons in github.com's "New repository" flow).
3. Push the local repository to GitHub (`git remote add origin ...`, `git push`).
4. Create a Vercel account (or log in) and import the GitHub repository as a new Vercel project (walked through step by step: exact buttons in Vercel's dashboard).
5. In the Vercel project's Environment Variables settings, add `ANTHROPIC_API_KEY` with your key value (guided step by step).
6. Trigger the first deployment (usually automatic on import) and wait for it to complete.
7. Open the live URL and run through the full user journey again in production (add subjects, generate plan, test AI features) to confirm everything works identically to local testing.
8. Confirm automatic redeploy works: make a tiny visible change locally (e.g., a text tweak), commit, push, and watch Vercel auto-redeploy.

📂 **Files/folders to create:** `.gitignore` (if not already created Day 5), no other new files — this is infrastructure, not code.

🔗 **Tools/services:** Git, GitHub (account + new repository), Vercel (account + project import + environment variables dashboard).

🧪 **Testing tasks:**
- Full user journey test on the live production URL (not just locally).
- Confirm the AI features work in production (this is the first real test of the production environment variable).
- Confirm the live app works correctly on an actual mobile device's browser (not just a resized desktop window), if possible.

🐞 **Common issues:**
- "AI features work locally but fail live" → almost always a missing or misspelled environment variable name in the Vercel dashboard; double-check `ANTHROPIC_API_KEY` matches exactly what your `api/ask-ai.js` reads from `process.env`.
- 404 on the live site → confirm `index.html` is at the project root and Vercel's build/output settings weren't pointed at a subfolder.
- Push rejected by GitHub → usually means the remote already has commits (e.g., a README auto-created on repo creation); pull/rebase before pushing, or initialize the GitHub repo with no files to avoid the conflict.

✅ **End-of-day checklist:**
- [ ] Code pushed to a public GitHub repository
- [ ] Vercel project connected and deployed successfully
- [ ] Environment variable configured and confirmed working in production
- [ ] Full user journey tested successfully on the live URL
- [ ] Auto-redeploy on push confirmed working

📸 **Screenshot to capture:** The live Vercel deployment URL loaded in a browser, showing the working app, plus the Vercel dashboard showing a successful deployment.

➡️ **Handoff notes for Day 9:** The app is live and functioning in production. Next: polish, documentation (README), and final QA pass — the app should look and feel ready to publicly share.

---

## Day 9 — Polish, Documentation & Final QA

🎯 **Objective:** Make the app look and feel like a finished, professional product, and write a complete, polished GitHub README.

📖 **What I'll learn:** Writing effective technical documentation for a portfolio project; final visual polish techniques (spacing, color, micro-interactions); preparing a project for public presentation.

🛠 **Features to build:** No new functional features — visual polish, copy/microcopy improvements, and documentation only.

📝 **Step-by-step implementation plan:**
1. Do a visual polish pass: consistent spacing and alignment, a clear and pleasant color palette, readable typography sizes, subtle hover/loading states, and a simple favicon/page title.
2. Review all UI text/microcopy (button labels, empty states, error messages) for clarity and friendliness — this is a student-facing product, tone should be encouraging, not clinical.
3. Take final polished screenshots of: the empty state, the input form, Today's Focus, the timeline view, and the AI panel (desktop and mobile).
4. Write the GitHub `README.md`, including: project name and one-line pitch, the problem it solves, key features, a screenshot or two, the tech stack used, how to run it locally, a link to the live demo, and an honest "Known Limitations / Future Scope" section (drawn directly from the PRD's Out of Scope list).
5. Do one final full regression test of the entire app on the live production URL (not local) to make sure nothing broke during polish changes.
6. Commit and push all polish/documentation changes, confirm Vercel auto-redeploys successfully.

📂 **Files/folders to modify:** `css/style.css` (polish), `index.html`/`js/ui.js` (copy improvements), `README.md` (full documentation).

🔗 **Tools:** None new.

🧪 **Testing tasks:** Full regression test on the live production URL after all polish changes are deployed. Re-check mobile responsiveness one more time, since CSS polish changes are the most common source of new layout bugs.

🐞 **Common issues:**
- Polish CSS changes accidentally break mobile layout → always re-test the mobile width view after any CSS change, not just desktop.
- README screenshots outdated after visual polish → capture screenshots last, after all polish is complete, not before.

✅ **End-of-day checklist:**
- [ ] Visual polish pass complete across all screens
- [ ] All UI copy reviewed and friendly/clear
- [ ] README.md complete with screenshots, setup instructions, live link, and known limitations
- [ ] Final regression test passed on the live production URL
- [ ] Changes committed, pushed, and auto-redeployed successfully

📸 **Screenshot to capture:** Final polished screenshots of every major screen (empty state, form, Today's Focus, timeline, AI panel) — these will also be used in tomorrow's LinkedIn post.

➡️ **Handoff notes for Day 10:** The product is fully built, deployed, tested, and documented. Next: final showcase day — write and publish the LinkedIn post, do one last live-site sanity check, and formally close out the capstone.

---

## Day 10 — Final Showcase & Capstone Wrap-Up

🎯 **Objective:** Publicly share the finished project and formally close out the 10-day capstone.

📖 **What I'll learn:** How to present a technical project compellingly to a professional audience; reflecting on and articulating what was learned during a build.

🛠 **Features to build:** None — this is a presentation and reflection day, not a build day.

📝 **Step-by-step implementation plan:**
1. Do one final live-site sanity check (open the production URL fresh, run through the full user journey once more).
2. Using the Day 9 screenshots, write the LinkedIn post following your established format: emoji-prefixed feature bullets, a key-learnings paragraph, and a gratitude closing tagging @ABTalks, @Anthropic, and @AnilBajpai, plus hashtags #60DaysClaudeChallenge, #ClaudeAI, and #BuildInPublic. Include the live demo link and GitHub repo link.
3. Publish the LinkedIn post.
4. Do a short personal retrospective (a few bullet points is enough): what worked well, what was hardest, what you'd do differently, and what's next on the "Future Scope" list if you continued this project.
5. Confirm the GitHub repository is public, has a clean commit history, and the README is the first thing a visitor sees.

📂 **Files/folders to modify:** None (unless a last typo/README fix is needed).

🔗 **Tools:** LinkedIn, GitHub (final visibility/settings check).

🧪 **Testing tasks:** Final live-site sanity check only (step 1) — no new testing scope.

🐞 **Common issues:** None expected — if the live site sanity check reveals a problem, treat it as a quick hotfix (small, isolated fix, commit, push, re-verify) rather than reopening scope.

✅ **End-of-day checklist:**
- [ ] Final live-site check passed
- [ ] LinkedIn post published with screenshots, links, tags, and hashtags
- [ ] GitHub repository confirmed public with clean README
- [ ] Personal retrospective written

📸 **Screenshot to capture:** The published LinkedIn post itself, and the final live application.

➡️ **Capstone complete.** The AI Study Planner v1.0 is live, documented, tested, and shared — ready to serve as both a portfolio piece and a tool the author can use for her own semester exam planning.
