# Onsite intreview prep

## 1. Interview with your potential future manager (9:30)

This is your chance to both impress and assess. Think of it as a two-way conversation rather than a strict evaluation. Preparation tips:

What they’ll likely look for

- Motivation & fit
Why this company, why now, and why biotech? They’ll want to sense your enthusiasm and alignment with their mission.
- Collaboration style
How you work with managers and teammates, how you handle feedback, and how you solve conflicts.
- Adaptability
Startups pivot quickly—expect questions about how you’ve handled ambiguity or fast changes.
- Technical/role fit
They may lightly probe your skills, but mostly they’ll want to see if you can grow into the role.

How you can prepare

- Know their mission and tech stack
Review the startup’s site, any publications, and their product roadmap if available.
- Have clear stories ready
Use STAR (Situation, Task, Action, Result) for 2–3 examples that show teamwork, problem-solving, and resilience.
- Prepare thoughtful questions (this is key at this stage):
- How do you see this role evolving in the next year?
- What does success look like in the first 3–6 months?
- How do you like to give feedback and support your team?
- How does the team balance research rigor with startup speed?

⸻

## 2. The onsite problem (10:15 onwards)

This is the heart of the day, so aim to show how you think, not just what you know. Since they call it “onsite problem → whiteboarding → prototyping → presentation,” expect something practical but scoped:

- Designing a small feature, pipeline, or workflow relevant to their product.
- Debugging or architecting a simplified system.
- Showing how you handle incomplete specs, technical trade-offs, and creativity under time constraints.

### How to prepare

- Brush up on fundamentals: If you’re in software/engineering, review data structures, APIs, system design basics, and problem-solving patterns. If it’s product/biotech-focused, review workflows, experimental design, or tools common in the stack they use.
  - Practice whiteboarding: Be comfortable sketching system diagrams, schemas, or workflows clearly. Narrate your thinking.
  - Think aloud: They care more about your reasoning, how you break down complexity, and whether you ask clarifying questions.
  - Time management: You’ll need to move from brainstorming → building → presenting. Don’t get stuck polishing. Build a working slice (MVP), then explain what you’d add with more time.

- Presentation skills: At 16:00, you’re essentially “demoing.” Practice framing your work:
  - The problem you tackled
  - The approach and trade-offs
  - What worked, what didn’t, and what you’d do next

⸻

## ✅ Summary of prep plan for next 4 days

- Research company + role deeply.
- ✅ Prepare 2–3 strong personal stories (teamwork, learning, conflict resolution).
- ✅ Draft a list of good questions for your manager.
- Brush up on fundamentals + be ready to whiteboard.
- Do a timed practice “mini project” → spend 3 hours tackling a small coding/problem-solving task, then present it in 10 minutes.

⸻

## Preparation

### Research company + role deeply

How to start using Cradle:

- Account and workspace setup
- Project setup: base sequence, assay(s) definition, data preparation and upload (with column matching?), setting primary and secondary "constraint" objectives.

Potential Architectural characteristics:

- Diligent authn/authz: "A workspace is the home for all protein design projects within your organization. Administrators can invite members and manage their access permissions."
- ...: There is a need for flexibility in Assay description, that may not be provided by forms, e.g. assay name, unit on measurement, "the protein characteristic you are measuring, such as activity, stability, or expression", "Property: the specific metric used to measure the Task. For example, for activity, this could be the Michaelis constant (Km) or the catalytic rate constant (kcat)."
- ...: Similary, result date type can vary widely and it is likely that slight errors in formatting can lead to frustration. Scientists are the target audience, which tend to be atavistic (apologies) and short on time. UX/UI will need to be carefully designed with this in mind.
- ...: Good working knowledge of the ML model is required to design the UI effectively for processing by the model.

### Prepare 2–3 strong personal stories (teamwork, learning, conflict resolution)

Use STAR (Situation, Task, Action, Result) for 2–3 examples that show teamwork, problem-solving, and resilience.

**AI Notes V1**

Example of problem solving, resilience:

- AI Notes PoC using OpenAI Assistants API, used as initial "V0" version of the application for the first 6 months.
- Assumed EM and PM hats in the final 2 weeks before launch

**App router enablement on Next.js**

Example of team building, project management

"App Router epic leadership. You steered a complex initiative, mobilising senior engineers in multiple teams, balancing your and theirs other priorities with pushing the work through."

I drove a cross-team, app router enablement effort. The project benefitted from iterative planning from “big-to-small”, with high level "Solution Document" presentation, high-level decomposition in Miro, the detailed ticket specification. This ensured that the full effort was captured, enabling cogent project estimation, with Miro serving as a visual reference for project orientation. Finally, the granular ticket decomposition and refinement created moments of alignement, which was important as the work was often interrupted.

[Retro outcomes](https://docs.google.com/document/d/1dyE7vCz8KniPTJUso6m9ECmGGORnbS8n7BmP_eGdDC0/edit?tab=t.mtoudhboxido#heading=h.jv86cwxgu99f)

- Get prioritisation buy-in
- Identify the domain and dependencies early
- Match the team to the domains
- Manage the project (clear objectives, often repeated to keep focus, and have regular standups)
- If it's a technical project, expect focus fragmentation
- Get support from outside the team for non-core/blocking tasks

**L&D team, tech clubs, regular padel matches**

Example of continuous learning, interpersonal development, and giving back

**PR Review pushback**

Example of conflict resolution

**Other projects I've delivered/am delivering:**

- localisation TMS upgrade
- QR code on the PDF
- Studocu AI foundations: auth, state, FE security

### Brush up on fundamentals + be ready to whiteboard

- react query
- suspense
- RBAC
- prototyping with AI tools

### Do a timed practice “mini project”

For a Frontend Developer role at a biotech startup, the onsite problem will almost certainly lean toward:

- Building a usable interface for scientists/biologists to interact with models, protein data, or experiment results.
- Communicating complex, multi-dimensional data in a way that’s intuitive, beautiful, and flexible.
- Prototyping quickly (since you only have one day).

They’ll want to see:

- Your coding fluency (React, TypeScript, state management).
- Your approach to structuring a small but real-world project.
- How you think about UX for scientific / technical users.
- Your ability to explain tradeoffs and next steps.

Here are some realistic “one-day-doable” problems Cradle might give a Frontend candidate:

1. Data visualization dashboard

Prompt: Build a small web app where a scientist can:

- Upload or load a dataset of protein variants (sequence + a few properties, e.g. stability, expression level, binding affinity).
- Display the data in a table and interactive chart (scatterplot or parallel coordinates).
- Let the user filter/sort variants (e.g. “stability > 0.7” and “binding < 0.3”).
- Highlight top candidates.

Why: This mirrors their platform needs: making complex model outputs explorable by users who aren’t engineers.

2. Multi-objective tradeoff explorer

Prompt: Create an interface to visualize tradeoffs between two or three properties of proteins (e.g. stability vs. activity vs. expression).

- Scatterplot or bubble chart with tooltips.
- Select a point to see details.
- Optional: allow weighting of objectives (sliders) and show how the “top choice” changes.

Why: Multi-objective optimization is central to protein design, and showing tradeoffs clearly is a UX challenge.

3. Sequence viewer + annotation tool

Prompt: Build a component to render a protein sequence (string of letters) and let users:

- Highlight residues that meet a condition (e.g. “positions 20–30 predicted unstable”).
- Hover to see tooltip with property info.
- Maybe allow annotations or color-coding.

Why: Many scientists think in terms of sequence, so good visualization tools are crucial.

4. Result reporting UI

Prompt: Given a JSON result (e.g. predictions for 100 variants), build a clean “report” page that shows:

- Summary stats (averages, distributions).
- Key findings (top 5 candidates).
- Charts/tables, export to CSV/JSON.

Why: This tests your ability to present technical results in a clear, scientist-friendly UI.

What you’d actually deliver in a day

- A small React app with:
- 1–2 reusable components (e.g. DataTable, Chart).
- Some interactivity (filters, sliders, selection).
- Clean, readable code and folder structure.
- A simple dataset (could be mocked or provided).
- A README with assumptions, tradeoffs, and “what I’d add next if I had more time.”

**Preparation strategy:**

- Practice quickly scaffolding a React + TypeScript project (Vite/Next.js).
- Review AI tools suitable to rpid project prototyping
- Get comfortable with one charting lib (e.g. Recharts, D3, or Plotly).
- Be ready to structure state management (filters, selections).
- Think about UX: what a scientist would need to see at a glance and how they’d interact.
