# AI Coding

## Code prompting guidelines

Combining traditional coding practises with AI to get better results. Vibe coding is about exploring possibilities and generating ideas, whereas we are building a methhodology for developing production applications.

Zero-shot prompting is requesting a task or question without any examples or context. The model uses its pre-trained knowledge to generate a response based on the input. One-shot prompting provides a single example or context to tune the model's response. 

Few-shot prompting provides multiple examples. Rules files can be used when add few-shot example becomes repetitive. Cursor uses these by default. Limited, sequential scope requests typically work a lot better.

**Set up the system so that good patterns are in place for the AI to follow** and maintain them.

## Coding Tools

### IDEs

- Cursor: A fork of VS Code that provides a superset of each features.
- Claude Code: a terminal application
- Kiro
- Windsurf
- Tidewave
- Antigravity

### Component/UI generation

- [Bit](https://bit.dev/blog/building-software-in-the-ai-era): Help AI avoid creating a new component every time by "registering" and reusing components with Bit MCP.
- v0
- Bolt
- Replit
- Lovable

### Test generation

### PR review

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
