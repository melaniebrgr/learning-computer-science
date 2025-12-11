# AI Coding Cheatsheet

Structure AI usage into phases:

1) Brainstorming (planning and thinking through the problem)
2) Executing (implementing the solution)
3) Verifying (reviewing and checking the work)
4) Updating rules and configuration

Generally,

- Select and purchase and AI coding tool
- Audit AI configuration weekly
- Follow the phases when completing with using AI (this should also help manage the context window)
- Privacy: enable privacy so that data is not retained by the model provider

## IDE

## Testing

## Code review

Bug bot PR review tool.

## UI generation

- v0
- Bolt
- Replit
- Lovable

## Misc. thoughts

Design repos for AI / Architecting codebases for AI

When building context, Cursor does a semantic codebase search and including that in the context. The implication being that semantic phrasing is important and therefore the adoption of consistent domain specific terminology

"Traditional (lexical) search mostly matches literal tokens in your query against tokens in documents, so “doctor” and “physician” look unrelated. Semantic search instead tries to represent the semantics of text so it knows those two are closely related concepts and can surface both for either query. The goal is to reduce “misses” caused by wording differences and to handle natural language queries more like a human would."

Context limitations also have implications for project size: the larger the codebase, files and methods, the more difficult it is to provide appropriate context and worse the results will be. Therefore tightly scopped packages, files and methods will yield better outcomes.
