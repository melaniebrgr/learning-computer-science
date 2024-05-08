# OpenAI Assistants API: Week 18 project journaling

## Introduction

There are two main affordances of the Assistants API:

1. Abstraction layer for AI applications

    GPT knowledbase is fixed, whereas usages are custom to a particular domain or subeset of knowledge. convenient for providing a specific knowledge base. can be configured with OpenAI-hosted tools — like code_interpreter and file_search — or tools you build / host (via function calling) capability. Thre thread is managed for you Threads simplify AI application development by storing message history and truncating it when the conversation gets too long for the model’s context length. Assistants can access files in several formats can also create files (e.g., images, spreadsheets, etc) and cite files they reference in the Messages they create.

2. AI reflection and iteration
  
    Assistants can call OpenAI’s models with specific instructions to tune their application so they can be used in an agentic workflow.

That is to say, the Assistants API is both an assistant to the developer and user.

The assistants API extends the OpenAI API and makes it easier to build AI assistants.
It provides a framework or platform for build AI applications requires.

- infra management
- data
- models
- prompts
- application state
- understand embeddings
- storage mechanism

In Chat Complete API is that the Knowledge base is already there and limited to a certain date in time.
It can't be contributed to.
LLMs don't have state or save the context of a converstaion.
Assistants save messages and the context of the messages.
It also provides retrieval mechanisms for diging through data
Can uplodad files and add it to the knowledge base in addition to the conversation
It also has a code interpreter
It can also do function calling.

Instead of distraction of stitching these pieces together, these parts are abstracted.
Assitants call OpenAi models to tune their capabilities, can call multiple tools in parallel (code interpreter, knowledge retireval, function calling), persistent threads save history and provide context.

Competitors: OpenAI Assistants, AWS Bedrock Agents, GCP Agents

### Agentic workflow

It also eases the set up for an **Agentic workflow**.
Where we can have multiple AI assistants specialised on work on one knowledge base.
An LLM AI + "self-dialogue" via reflection = "Agent".
Multiple "Agents" are brought together to collaborate and generate a solution to a user question.
Exponentially self-improving agents has shown better results than using even the most powerful model in one shot (2).

### Knowledge retrieval

Documents can be added to the openAI knowledge base so it is part of the pool of knowledge that we can query.
Documents are split into chunks, transformed into emdeddings and placed into a vector store.
A vector store holds embeddings a mathematical representation of the text.
The mathicamtical representation makes ti easy for algorithms to search.
Content (images, text, audio) are transformed into a vector or mathematical representation, which can be processed by algorithms to calculate a results.
The same process happens with queries, they are transformed into embdeddings so the algorithm can search the vector store.

Once a file is added to a vector store, it’s automatically parsed, chunked, and embedded, made ready to be searched. Vector stores can be used across assistants and threads, simplifying file management and billing. (3)

> files can be removed from a vector store by either: Deleting the vector store file object or, by deleting the underlying file object (which removes the file it from all vector_store and  code_interpreter configurations across all assistants and threads in your organization)

## FAQ

1. **Can assistants be easier or faster to implement than a GPT, or "regular chat"?**

    If you want to, you could implement the Completions API style using the Assistant API.
    You don't _need_ to supply a knowledge base, but that is the point of the assistant. To make adding context more convenient.

    `gpt-4-turbo` with the Chat Completions API might be easier to start working with considering we are currently using it. The large number of tokens would handle almost all PDF files on Studocu. (`gpt-4-turbo` has a context window of 128K tokens compared to `gpt-3.5` with 16K.) However, the token limitation still needs to be handled, including potentially chunking data across messages, but more significantly the manipulation of file content, such as text and image extraction. We are looking at use tools like PSPDFKit for example, which can extract text and have no solution yet for images.

    The Assistants API abstracts a number of details, such as file hosting, content extraction. The number of [file types that is supported](https://platform.openai.com/docs/assistants/tools/file-search/supported-files) is extensive, including TEXT, DOC, DOCX, PDF. Video file aren't supported but there is a demo analysing the static frames of a video with `gpt-4`. We can plug-in tools like web-scrapping APIs, or YouTube video transcript extractors. on the other hand we would need to track file uploads and ensure they are deleted at the end of the session.

1. **Can assistants be better than a GPT, the Chat Completions API, or ChatPDF?**

    Yes. It enables agentic workflows that have shown to provide a better outcomes over "one shot" APIs.

    The fact that it's newer can also be a strategic advantage. While other tools provide many similar offerings, Assistants affords new capabilities that others haven't brought to market yet. There're quite a few  offerings already:

    - [ChatPDF](https://www.chatpdf.com/)
    - [PDF GPT](https://www.pdfgpt.chat/)
    - [PDF Summarizer](https://www.pdfsummarizer.org/)
    - [Adobe Acrobat AI Assistant](https://www.adobe.com/acrobat/generative-ai-pdf.html)
    - [PopAi](https://www.popai.pro/)
    - ...and at least 8 more

    How can we make a stand out wow product? Combine more content types, provide better output, make it more convenient. Assistants _can_ provide better content extraction.

1. **What are the challenges with Assitants?**

    - GDPR: we need to ensure content is removed after a session
    - Less stable than Chat Completions: V2 was just released last month, April 2024. Assistants is in Beta so there will be changes we will need to keep on top of and more unknowns in terms of cost. M
    - The Assistants can be "finicky"
    - SDKs in Node and Python only (no PHP)

1. **What are the context limitations and how do they compare to the Completions API?**

    Assistants API limitations (per Ruan from one of OpenAI's articles):
    - The maximum file size is 512 MB (average PDF on Studocu is 2MB)
    - 10,000 files per vector store
    - 1 vector store per Assistant
    - 1 vector store per Thread
    - Therefore 10,000 files per thread
    - No stated limit to the number of Assistants
    - No stated limit to the number of Threads
    - Each end-user is capped at 10GB (What is an end user?????????)
    - Each organization is capped at 100GB
    - Each file should contain no more than 5,000,000 tokens per file (computed automatically a file is attached).  The maximum number of tokens a run uses in the Assistants API can be controlled allowing management of token usage costs. Limits on the number of tokens for previous / recent messages used in each run can also be set.

    Vector Store limitations ("adding support for in the coming months"):
    - parsing images within documents (including images of charts, graphs, tables etc.)
    - structured file formats like csv or jsonl
    - better support for summarization — the tool today is optimized for search queries.

    Completions API limitations:
    - 128K tokens (most PDFs)

1. **How convenient is it to specify the output format (markdown, LaTeX)?**

    Trivial: configure the `response_format` on the assistant and also in the prompt.

1. **Does implementing in the first iteration add value?**

    Yes it can speed up the workflow.
    Agentic workflows have strong potential.
    We could set up an Assitant that first deduplicates the content, creating a full text file, then an Assistance specialised in determining the optimal outline or that takes an outline and restructures the content to follow an outline.

1. **How should we manage the uploaded files?**

    File Search augments the Assistant with knowledge from outside its model, such as proprietary product information or documents provided by your users.

1. **Can it speed up the incorporation of other media types?**

    [File types supported OOTB](https://platform.openai.com/docs/assistants/tools/file-search/supported-files), notably:
    - `.doc`
    - `.docx`
    - `.html`
    - `.json`
    - `.md`
    - `.pdf`
    - `.pptx`
    - `.txt`
    - `.tex` (LaTex)

    "At the moment, user-created Messages cannot contain image files but we plan to add support for this in the future."
    Assistants can also create files (e.g., images, spreadsheets, etc)

1. **EXTRA QUESTIONS**

- How much does this cost? Is it per request or something? (Fede, Gabi will take it)
- File cleanup options?
- Rate limitations?
- How many VectorStore + Threads can we have?
- What is the whole speed for the user?

## Implementation

The components of an assistant:

- an assistant
- a conversation thread
- a run entitity

Workflow for integration of an assistant:

1. Create an Assistant
    1. (Optional) Addon tool(s)
    1. (Optional) Extend knowledge base
1. Create a Thread and add the user message
1. Run the Thread with an Assistant
1. Profit & iterate

Assistants ans Node and Pythin SDKs and supports streaming.

### 1. Create an Assistant

"An Assistant represents an entity that can be configured to respond to a user's messages using several parameters like model, instructions, and tools."

Can be created via the openai platform (platform.openai.com) UI or programmatically.
The Assistant is given a name and an "identity".
The identity instructions are akin to a prompt for how the assistant should behave.
The assistant is assiged a model to use.
Finally, different tools can then be attached to the assistant, e.g. functions, code interpreter.

The assistant created will have an ID.
defining its custom instructions and picking a model.
Optionally add files and enable tools like Code Interpreter, File Search, and Function calling.

#### (Optional) Addon tool(s)

Tool choice is enforceable, e.g. file_search, code_interpreter, or a function.
With function ...
Function calling in Assistants you can call any external API any computation/calculation.
Can be called in parallel.
File Search, Code Interpreter, tools supplied out of the box.
Build your own tools with function calling.
Assistant access to up to 128 tools.

### 2. Create a Thread

(and add a message to it)
Contains messages from the user and the assistant.
Like a conversational thread, it starts with a question from a user.
A Thread represents a conversation between a user and one or many Assistants. You can create a Thread when a user (or your AI application) starts a conversation with your Assistant.
The contents of the messages your users or applications create are added as Message objects to the Thread. Messages can contain both text and files. There is no limit to the number of Messages you can add to Threads — we smartly truncate any context that does not fit into the model's context window.

### 3. (Optional) Addon a knowledge base (VectorStore)

Vector stores can be associated with the Assistant or with the Thread.

You can also attach files as Message attachments on your thread. Doing so will create another vector_store associated with the thread, or, if there is already a vector store attached to this thread, attach the new files to the existing thread vector store. When you create a Run on this thread, the file search tool will query both the vector_store from your assistant and the vector_store on the thread.

Vector stores created using message attachements have a **default expiration policy of 7 days** after they were last active (defined as the last time the vector store was part of a run). This default exists to help you manage your vector storage costs. You can override these expiration policies at any time.

Vector Store objects give the File Search tool the ability to search your files. Adding a file to a vector_store automatically parses, chunks, embeds and stores the file in a vector database that's capable of both keyword and semantic search. Each vector_store can hold up to 10,000 files. Vector stores can be attached to both Assistants and Threads. Today, you can attach at most one vector store to an assistant and at most one vector store to a thread.

### 4. Run the Thread with an Assistant

A run can access an assistant and a thread (ID).
It can access further code interpreter or tools as need be in the run steps. THe run can post a message back to the thread.
Once all the user Messages have been added to the Thread, you can Run the Thread with any Assistant. Creating a Run uses the model and tools associated with the Assistant to generate a response. These responses are added to the Thread as assistant Messages.
A run can be created with and without streaming.

### 4. Iterate

## References

1. [Assistants API](https://platform.openai.com/docs/assistants/)
2. [AI Pioneer Shows The Power of AI AGENTS - "The Future Is Agentic"](https://www.youtube.com/watch?v=ZYf9V2fSFwU&t=329)
3. [New features in the Assistants API!](https://community.openai.com/t/new-features-in-the-assistants-api/720539)
