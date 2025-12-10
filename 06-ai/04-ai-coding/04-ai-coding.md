# AI Coding

## Code prompting guidelines

Combining traditional coding practises with AI to get better results.

Zero-shot prompting is requesting a task or question without any examples or context. The model uses its pre-trained knowledge to generate a response based on the input. One-shot prompting provides a single example or context to tune the model's response. Few-shot prompting provides multiple examples. Rules files can be used when add few-shot example becomes repetitive. Cursor uses these by default. Limited, sequential scope requests typically work a lot better.

Don't start from scratch, **use examples snippets or files**. For example, in a **rules file**, describe command to run everytime a specific task is requested, e.g. run `nx crud ...` and example code with expected changes indicated, whenever an endpoint is created. Rules can be set per project or across all projects. XML syntax can also help organise the prompt and help the LLM understand intent. Using templates with [Hygen](https://github.com/jondot/hygen) can also provide good results, it uses EJS.

**MCPs** can also be installed and indicated in rules files to tune the response additionally, e.g. Context7, Puppeteer. MCPs are a way for your IDE to use external tools that do actions outside of the IDE. The LLM will not always pick up that the MCP is available, which is why it is useful to add to a rules file. In the prompt, tag the rules you want used.

**Set up the system so that good patterns are in place for the AI to follow.**. This is different from vibe coding, which is more about exploring possibilities and generating ideas, whereas this methhodology is intended for developing production applications. One idea, create a "company" MCP that has generic rules snippets for common tasks, like creating a new endpoint, or adding a new feature. This way, the LLM can use the MCP to generate code that follows the company's coding standards and practices. **Context is king**. Using TypeScript, and eslint, docs all will improve the quality of the generated code.

When the LLM makes a mistake, you can restore from a checkpoint.

## Coding Tools

- Cursor: A fork of VS Code that provides a superset of each features.
- Claude Code: a terminal application

### Tab completions

### Agents

### Inline editing

### Chat

### Rules

### Codebase indexing

### MCP

### Context

### Models

## Code Review

## References

- [ ] <https://frontendmasters.com/courses/pro-ai/introduction/>
  - [ ] Introduction
  - [ ] Cursor
  - [ ] Agents & MCPs
- [ ] <https://cursor.com/learn>