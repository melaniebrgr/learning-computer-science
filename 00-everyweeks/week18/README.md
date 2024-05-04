# OpenAI Assistants API

## Week 18 project journaling

The assistants API extends the OpenAi API that make it easier to build AI assistants.
It provides a framework or platform.
What problem does it solve?

The build AI applications requires

- infra management
- data
- models
- prompts
- application state
- understand embeddings
- storage mechanism

Instead of distraction of stitching these piees togeather, these parts are abstracted.
LLMs don't habve stat or save the context of a converstaion
Assistants save messages and the context of the messages.
It also provides retrieval mechanisms for diging through data
Can uplodad files and add it to the knowledge base in addition to the conversation
It also has a code interpreter
It can also do function calling.

ASsitants call OpenAi models to tune their capabilities, can call multiple tools in parallel (code interpreter, knowledge retireval, function calling), persistent threads save history and provide context.

Function call

Create own tools on top of OpenAI tools.

If differst from Chat Complete API is that the Knowledge base is already there and limited to a certain date in time.
It can't be contributed to

### Questions

1. How can Assistants be useful for generating learnable document summaries
1. Can assistants be better than a GPT, or Chat Completion API?
1. Can assistants be easier or faster to implement than a GPT, or "regular chat"?
1. How would it compare to a ChatPDF?
1. What are the challenges? Privacy
