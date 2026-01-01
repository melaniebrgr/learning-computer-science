# AI Coding

>  84% of developers now use or plan to use AI coding tools, up from 76% last year. The market is projected to hit $25 billion by 2030. Cursor crossed $1 billion in annualized revenue. Claude Code went from zero to $400 million in five months. And yet, trust is declining. Nearly half of developers actively distrust AI-generated outputs, which is up from 31% in 2024. Only 3% say they "highly trust" the code.

> I've never felt this much behind as a programmer. The profession is being dramatically refactored as the bits contributed by the programmer are increasingly sparse and between. I have a sense that I could be 10X more powerful if I just properly string together what has become available over the last ~year and a failure to claim the boost feels decidedly like skill issue. There's a new programmable layer of abstraction to master (in addition to the usual layers below) involving agents, subagents, their prompts, contexts, memory, modes, permissions, tools, plugins, skills, hooks, MCP, LSP, slash commands, workflows, IDE integrations, and a need to build an all-encompassing mental model for strengths and pitfalls of fundamentally stochastic, fallible, unintelligible and changing entities suddenly intermingled with what used to be good old fashioned engineering. Clearly some powerful alien tool was handed around except it comes with no manual and everyone has to figure out how to hold it and operate it, while the resulting magnitude 9 earthquake is rocking the profession. Roll up your sleeves to not fall behind. - [Karpathy](https://x.com/karpathy/status/2004607146781278521?s=20])

Teams that "master" AI accelerate productivity gains with the gap widening over time, from 5% in April 2023 to 20% in July 2025 ([Yegor Denis-Blance](https://www.youtube.com/watch?v=JvosMkuNxF8&list=PPSV&t=11s)). So the sooner teams normalise AI coding tool adoption the more ahead of the curve they are. What contributes to AI productivity gains?

- Simple token usage is not correlated, i.e. more tokens spent does not lead to better outcomes.
- Codebase cleanliness (tests, types, documentation, modularity, static code analysis) is correlated with improved gains. There is a natural tension between AI usage and cleanliness--AI can suggest changes that add a lot of entropy to the system that humans need to counterebalance.
- Simple access to AI tools does not guarantee usage--what does? Leadership endorsement? Setup support? Training?

Productivy gains aren't guaranteed either. For one example enterprise AI adoption cames with tradeoffs: PR numbers increased over time (+14%), code quality dropped (-9%) and became more erratic, and more refactoring occured (2.5x). The effective output was negligeable.

## Coding Tools

> The market has split into scaffolders, autonomous agents, repo-native visual tools, and agentic IDEs.

### Component/UI scaffolding

> Tools like Replit Agent or Lovable are your “0 to 1" sprinters. They handle the messy setup—database (Supabase), auth, and deployment—before you’ve even finished your coffee.

- [Bit](https://bit.dev/blog/building-software-in-the-ai-era): Help AI avoid creating a new component every time by "registering" and reusing components with Bit MCP.
- v0
- Bolt
- Replit
- Lovable

### Headless and autonomous refactorer/solvers

- Devin
- OpenHands: An open-source, model-agnostic version of Devin
- Manus
- Claude Code: a terminal application

### Agentic IDEs

> The future isn't just a coder, and they aren't just a prompt writer. They're an Orchestrator managing a team of specialized agents.

- Cursor: A fork of VS Code that provides a superset of each features.
- Kiro
- Windsurf
- Tidewave
- Antigravity

### Test generation

### Code review

<https://dev.to/zak_mandhro/github-copilot-crushed-every-code-review-startup-40m-pr-analysis-2no6>

## Code prompting

**Vibe coding** is useful for exploring possibilities and generating ideas. Development of production applications with AI, or **AI engineering** is more methodical, where the developer provides technical direction. It combines traditional coding practises with AI to get better results more efficiently. In brief, run the AI software development loop: **prepare → spec → onboard → verify**.

1. Prepare the codebase for patterns for the AI to follow and maintain them
2. Spec the highest leveraged work to build/fix (impact > effort)
3. Onboard the agent like it is a new intern
4. Verify

### 1. How to prepare the codebase

### 2. How to spec work (few shot prompt)

Zero-shot prompting is requesting a task or question without any examples or context. The model uses its pre-trained knowledge to generate a response based on the input. One-shot prompting provides a single example or context to tune the model's response. 

Few-shot prompting provides multiple examples. Rules files can be used when add few-shot example becomes repetitive. Cursor uses these by default. Limited, sequential scope requests typically work a lot better.

- Break into a small, verifiable slice (one PR-sized unit)
- Each slice should clearly define the deliverable (“open a PR,” “include tests,” “add screenshots,” “note tradeoffs in the description”)
- Write acceptance criteria (inputs/outputs, edge cases, UX constraints)
- Call out risks (perf hotspots, security boundaries, migration concerns)
- Defining constraints (what not to touch, what must stay backward compatible, e.g. “don’t change API shape,” “keep this behavior,” “no new deps”)
- Provide examples

### 3. How to onboard an agent

Point it to

- repo conventions (CONTRIBUTING.md, lint rules, test commands)
- component system (e.g. shadcn/ui), design tokens, and patterns

### 4. How to review the generated code

Review agent output like junior engineer’s, but with extra paranoia:

- correctness (edge cases, race conditions, error handling)
- performance (N+1 queries, unnecessary re-renders, overfetching)
- security (auth boundaries, injection, secrets, SSRF)
- tests (new coverage for the changed behavior, not just snapshots)

I never thought about it, but each PR can be viewed from the lens of each core architecture characteristic as well, e.g. usability, performance, installability, etc.

---

## Claude

> Claude Code dominated the CLI coding product experience this year and all the CLI products like Codex, OpenCode, Amp CLI, Vibe CLI and even Cursor have heavily taken inspiration from it. This means learning how things work in Claude Code directly transfers to other tools both in terms of personal usage and production grade engineering.

## Cursor

### Context

Getting better results with Cursor by managing the limited context window, i.e. coding context engineering:

- Break the work into smaller pieces
- Have a plan like an architecture decision record (AI can also be used to assist in planning)
- Opt into modes that increase the context window size (for more money)

By default Cursor includes the following context, invisibly by default: the contents of the current file, a list of recently viewed files, results from a semantic codebase search, active linter and compiler errors, and a history of recent edits. When searching files, Cursor reads the first 250 lines of a file.

Context clues can be added manually to the default context with `@` symbols, e.g.

- @Files & Folders: explicitely includibg relevant files and directories is much more precise than having AI guess.
- @Docs: point Cursor to official documentation or provide a custom URL. (Does Context7 obviate this?)
- @Web: instruct Cursor to do a results and add the results to the query

### Tab completions, Inline Edit

Surgical in place modification.

### Chat

### Agents

### Rules

Don't start from scratch, use examples snippets or files. For example, in a **rules file**, describe command to run everytime a specific task is requested, e.g. run `nx crud ...` and example code with expected changes indicated, whenever an endpoint is created. Rules can be set per project or across all projects. XML syntax can also help organise the prompt and help the LLM understand intent. Using templates with [Hygen](https://github.com/jondot/hygen) can also provide good results, it uses EJS.

### Codebase indexing

### MCP

**MCPs** can also be installed and indicated in rules files to tune the response additionally, e.g. Context7, Puppeteer. MCPs are a way for your IDE to use external tools that do actions outside of the IDE. The LLM will not always pick up that the MCP is available, which is why it is useful to add to a rules file. In the prompt, tag the rules you want used.

One idea is to create a "company" MCP that has generic rules snippets for common tasks, like creating a new endpoint, or adding a new feature. This way, the LLM can use the MCP to generate code that follows the company's coding standards and practices. **Context is king**. Using TypeScript, and eslint, docs all will improve the quality of the generated code.

### Models

Different models have different outcomes and costs.

## References

- [ ] <https://frontendmasters.com/courses/pro-ai/introduction/>
  - [x] Introduction
  - [ ] Cursor
  - [ ] Agents & MCPs
- [ ] <https://cursor.com/learn>
  - [ ] Get started
  - [ ] Core
  - [ ] Context
  - [ ] Integrations
- <https://www.builder.io/blog/ai-software-engineer>
- <https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents>
