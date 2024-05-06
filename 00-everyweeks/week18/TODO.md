# TODO

## To build

## To answer

1. How can Assistants be useful for generating learnable document summaries
2. Can assistants be easier or faster to implement than a GPT, or "regular chat"?

    `gpt-4-turbo` with the Chat Completions API might be easier to start working with considering we are currently using it. The large number of tokens would handle almost all PDF files on Studocu. (`gpt-4-turbo` has a context window of 128K tokens compared to `gpt-3.5` with 16K.) However, the token limitation still needs to be handled, including potentially chunking data across messages, but more significantly the manipulation of file content, such as text and image extraction. We are looking at use tools like PSPDFKit for example, which can extract text and have no solution yet for images.

    The Assistants API abstracts a number of details, such as file hosting, content extraction. The number of [file types that is supported](https://platform.openai.com/docs/assistants/tools/file-search/supported-files) is extensive, including TEXT, DOC, DOCX, PDF. Video file aren't supported but there is a demo analysing the static frames of a video with `gpt-4` on the other hand we would need to track file uploads and ensure they are deleted at the end of the session.

3. Can assistants be better than a GPT, the Chat Completions API, or ChatPDF?

    Yes. It _can_ provide better content extraction. It enables agentic workflows that have shown to provide a better outcomes over "one shot" APIs.

    The fact that it's newer can also be a strategic advantage. While other tools provide many similar offerings, Assistants affords new capabilities that others haven't brought to market yet.

4. What are the challenges with Assitants?

    - GDPR: we need to ensure content is removed after a session
    - More unknowns: Assistants is in Beta so there will be changes we will need to keep on top of and more unknowns in terms of cost.

5. What are the context limitations and how do they compare to the Completions API?

    Assistants API limitations (per Ruan from one of OpenAI's articles):
    - 512MB per file
    - Each end-user is capped at 10GB
    - Each organization is capped at 100GB

    Completions API limitations:
    - 128K tokens (most of our docs)

6. How convenient is it to specify the output format (markdown, LaTeX)?

7. Does implementing in the first iteration add value?

## To learn

- [ ] [Assistants API](https://platform.openai.com/docs/assistants/overview)
  - [ ] Overview
  - [ ] How Assistants work
  - [ ] File Search
  - [ ] Code Interpreter
  - [ ] Function Calling
  - [ ] Migration Guide
  - [ ] What's New
- [ ] [OpenAI Assistants API – Course for Beginners](https://www.youtube.com/watch?v=qHPonmSX4Ms)
  - [x] (0:00:00) Introduction
  - [x] (0:01:02) What’s This Course About - What Will You Learn?
  - [x] (0:01:33) Pre-requisites
  - [x] (0:02:44) Python and Dev tools Set up
  - [x] (0:04:22) VS Code Installation
  - [x] (0:05:31) OpenAI Account - Generate an API Key
  - [x] (0:07:53) What is the Assistants API & Benefits - Comparison Between the Chat Completion API and the Assistants API
  - [x] (0:18:16) Assistants API Building Blocks
  - [x] (0:24:04) Creating an Assistants API - Manually (Personal Trainer)
  - [ ] (0:38:20) Creating an Assistants API - In Code (Personal Trainer)
  - [ ] (1:04:15) Build a News Summarizer Introduction: Function Calling - A Streamlit Application
  - [ ] (1:25:39) Create an AssistantsManager Class For our News Summarizer
  - [ ] (2:10:46) Using the AssistantManager Class to Create an Assistant and run it as a Streamlit App
  - [ ] (2:28:23) Knowledge Bases Retrieval Tools - How it Works & Introduction to Embeddings
  - [ ] (2:35:25) Build a Study Buddy Streamlit Application
  - [ ] (3:22:24) Run the Study Buddy Streamlit Application and Test
  - [ ] (3:29:27) Wrap up and Final Considerations
- [ ] [Azure OpenAI Assistants API (Preview)](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/assistants)
- [ ] [OpenAI Assistants vs. AWS Bedrock Agents: Which Should You Choose?](https://medium.com/@woyera/openai-assistants-vs-aws-bedrock-agents-which-should-you-choose-18d8daa2de39)
- [ ] [AI Pioneer Shows The Power of AI AGENTS - "The Future Is Agentic"](https://www.youtube.com/watch?v=ZYf9V2fSFwU&t=329)
