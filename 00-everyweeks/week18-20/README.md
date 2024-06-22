# OpenAI Assistants API: Week 18 project journaling

## Introduction

There are two main affordances of the Assistants API. Firstly, it extends the OpenAI API and makes it easier to build AI agents. Secondly, it furnishes some abstractions and platform tooling for building AI applications.

1. AI reflection and iteration a.k.a agents
  
    Assistants call OpenAI’s models with special instructions that tune their behaviour. They are used in what is called an agentic workflow, a dynamic and self-reflective process where specialised agents collaborate on a task. The AI program is given a goal, and the agents works towards accomplishing it on their own.

2. Abstraction layer for AI applications

    The GPT knowledbase is fixed but uses typically need to be custom to a particular topic. convenient for providing a specific knowledge base. can be configured with OpenAI-hosted tools — like code_interpreter and file_search — or tools you build / host (via function calling) capability. Thre thread is managed for you Threads simplify AI application development by storing message history and truncating it when the conversation gets too long for the model’s context length. Assistants can access files in several formats can also create files (e.g., images, spreadsheets, etc) and cite files they reference in the Messages they create.

That is to say, the Assistants API assits both end user in the task they need to perform, and the developer to build the application.

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

**How does streaming working with routing work if we use the app router beside the page router**

- pages and app routing can coexist side by side
- handy error messages if a matching routes are created
- Next supports streaming (SSE) with app router
- Further, the Vercel AI SDK abstracts the complexities of doing so

**Limitations for long running HTTP connections**

[AWS lambda supports streaming SSE.](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/)
"You can read a streamed response from your function via a Lambda function URL or use the AWS SDK to call the new API directly."
There is an initial maximum response size of 20 MB, which is a soft limit you can increase. The first 6MB of the response payload is streamed without any bandwidth constraints. Beyond 6MB, there is a maximum bandwidth throughput limit of 16 Mbps (2 MB/s).

There is an initial maximum response size of 20 MB, which is a soft limit you can increase. The first 6MB of the response payload is streamed without any bandwidth constraints. Beyond 6MB, there is a maximum bandwidth throughput limit of 16 Mbps (2 MB/s).

Vercel has limitations that our own implementation would not:
These functions must beging sending a response within 25 seconds. After the initial response begins, you can continuously stream the response with no time limit. Your streamed response size cannot exceed Vercel's memory allocation limit of 128 MB.

**What should we do if the lambda fails?**
Send message to client to retry. Retry. Add check if files are uploaded so don't upload already existing.

**What should we do if node fails?**
Throttle? with health check?

**Where are server actions running?**
TL;DR wherever we want. They can be extracted to their own lambda if we want. Or not.

Traditionally (pages folder) form call API route to talk to backend securely.
With app router can use server actions.
useFormState hook? action calls function on the server. "We just call functions."
Everything runs securely on the server.
Server-Sent Events (SSE) to send a stream of data from a server action to the client in Next.js
Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

I think there's probably distinction to make: where server actions _can_ run, and where they _do_ run in typical Vercel deployment. It is still unclear. On one hand under the "Functions" menu there are `studysesh` and `studysesh.rsc` Functions. Vercel Functions "enable running compute on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware." Sounds a lot like a discrete lambda, but is it? Vercel applications sound like they could be AWS lambda's all the way down ([1](https://vercel.com/blog/aws-and-vercel-accelerating-innovation-with-serverless-computing), [2](https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions)). Maybe its the same lambda?

> Next.js automatically generates an API endpoint for each server action. These endpoints are created during the compilation process and are not visible in your codebase. The generated endpoints handle the incoming requests from the client and route them to the corresponding server action.
> When you invoke a server action from the client-side, such as through a form submission or a button click, Next.js sends a POST request to the generated API endpoint (7).

Vercel is deploying the infrastructure as defined by the framework configuration. That is Next.js is inferring and then automagically deploying infrastructure it has deemed optimally based on an analysis of the build output.

> In Vercel’s case, this means that a serverless function based on AWS Lambda is created and deployed with the code necessary to render the page. The knowledge to invoke this function is then deployed to the gateway service as part of the application's routing table (5).

For actions they are deploying them to a lambda.

When a user interacts with your app on the client side, they can directly call Server Actions which will be executed securely on the server side.

This approach provides a seamless Remote Procedure Call (RPC) experience between the client and the server. Instead of writing a separate API route to communicate with the server, you can directly call Server Actions from your Client Components (6).

Pros of separate service:

- Elasticity
- Iteration ability(?)

Cons of separate service:

- Deployment complexity
- Initial implementation slower

Suggestion: MVP in Next.js, in parallel work on service-based architecture

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

    Assistants API limitations (per the docs):
    Files:
        - The maximum file size is 512 MB (average PDF on Studocu is 2MB)
        - the size of all files uploaded by one organization can be up to 100 GB
        - "Please contact us if you need to increase these storage limits"
        - Each file should contain no more than 5,000,000 tokens per file (computed automatically a file is attached).  The maximum number of tokens a run uses in the Assistants API can be controlled allowing management of token usage costs. Limits on the number of tokens for previous / recent messages used in each run can also be set. (Completion api 128K tokens.)
    Vector store:
        - 10,000 files per vector store
        - 1 vector store per Assistant/Thread (files are added to it)
        - adding support for parsing images within documents (including images of charts, graphs, tables etc.)
        - adding support for structured file formats like csv or jsonl
        - better support for summarization (the tool today is optimized for search queries).
    Assistants:
        - No stated limit
    Threads:
        - No stated limit

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

## Implementation

The components of an assistant are an Assistant, a conversation Thread, and a Run entitity.

The general workflow for integration of an assistant:

1. Create an Assistant
    - (Optional) Addon tool(s)
    - (Optional) Extend knowledge base
1. Create a Thread and add the user message
    - (Optional) Extend knowledge base
1. Run the Thread with Assistant(s)
1. Profit & iterate

OpenAI offers Node and Pythin SDKs for Assistants that supports streaming.
Vercel also has a Vercel AS SDK that supports many model providers and can be used with frameworks besides Next.js. It even offers a [useAssistant hook](https://sdk.vercel.ai/docs/ai-sdk-ui/openai-assistants).

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

### Attaching a VectorStore to a thread

Why is this hard??? The first try wasn't successful; the assistant wasn't generating a summary from the vector store I believed to be attached to the _Thread_, nor the vector store I believed to the attached to the _Run_, nor the file I believed to be passed as on the Thread _Message_. The result was a mix of summaries entirely unrelated to the file subject, or a response that it was waiting for files to be supplied. Decided to revert all changes back to a point were things were working, with the vector store attached to the Assistant. Will try again later with a fresh brain.

Adding openai file ids to the message automatically created the vector store. Aha.

### Deploy

Deployed on Vercel and ran into an issue with CORS and the lambda edge function. CORS was resolved by adding openai to the CSP. The lambda resource issuse were more problematic. Locally the full request takes 10-30s. In Vercel "hobby" lambdas this is over the 10s execution duration time. Further the memore allocation could be problematic with a limit of 1024 MB. With a small file the response is fast enough (<10s). Memory and duration time [can be configured](https://vercel.com/docs/functions/configuring-functions/duration), but the hobby tier is seemingly capped.

### Architecture

Seeing the limitations suggested a new architecture. Using S3 as an intermediary queue (we wanted to store the inputs somehow anyway).
> If you need to fetch data in a client component, you can call a Route Handler from the client. Route Handlers execute on the server and return the data to the client. This is useful when you don't want to expose sensitive information to the client, such as API tokens.

Tried using server actions with the new app router and got the error.
> Uncaught (in promise) Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
This makes sense because Next.js server actions cannot directly receive FileList objects as parameters, because the FileList object is a web API that's only available in a browser environment.
A server action can accept a FormData type however, so if I create a form data object I can parse it in a server action. It's so easy.

## References

1. [Assistants API](https://platform.openai.com/docs/assistants/)
2. [AI Pioneer Shows The Power of AI AGENTS - "The Future Is Agentic"](https://www.youtube.com/watch?v=ZYf9V2fSFwU&t=329)
3. [New features in the Assistants API!](https://community.openai.com/t/new-features-in-the-assistants-api/720539)
4. [NextJS’s Amazing New Streaming Server Actions](https://jherr2020.medium.com/nextjss-amazing-new-streaming-server-actions-ef4f6e2b1ca2)
5. [Framework defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure)
6. [Understanding React Server Components](https://vercel.com/blog/understanding-react-server-components)
7. [Nuances of Server Actions in Next.js](https://tigerabrodi.blog/nuances-of-server-actions-in-nextjs)
