# OpenAI Assistants API: Week 18 project journaling

The assistants API extends the OpenAI API and makes it easier to build AI assistants.
What problem does it solve?
It provides a framework or platform.
The build AI applications requires.

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

## Agentic workflow

It also eases the set up for an **Agentic workflow**.
Where we can have multiple AI assistants specialised on  work on one knowledge base.
LLM AI + "self-dialogue" via reflection = "Agent".
Multiple "Agents" together meet. User asks them to solve a problem. "Agents" all start collaborating with one another to generate a solution. So awesome!
Exponentially self-improving agents.

## Building an application

The components of an assistant:

- an assistant
- a conversation thread
- a run entitity

Workflow for integration of an assistant:

1. Create an Assistant
2. Create a Thread
3. Add the user message to the Thread
4. Run the Assistant on the Thread
5. Read the Assistant response message from the Thread
6. Iterate

### 1. Create an Assistant

Can be created via the openai platform (platform.openai.com) UI or programmatically.
The assistant is given an name, and an identity or instructions.
The instructions are like a prompt for how the assistant should behave.
The assistant is then given a model to use.
Different tools can then be attached to the assistant, e.g. functions, code interpreter.
The assistant created will have an ID.
defining its custom instructions and picking a model.
Optionally add files and enable tools like Code Interpreter, File Search, and Function calling.

### 2. Create a Thread

Lke a conversational thread, it starts with a question from a user.
Contains messages from the user and the assistant

### 3. Add the user message to the Thread

### 4. Run the Assistant on the Thread

A run can access an assistant and a thread (ID).
It can access further code interpreter or tools as need be in the run steps. THe run can post a message back to the thread.

### 5. Read the Assistant response message from the Thread

### 6. Iterate

## Python demo

(Note that it can be helpful to try it first in the OpenAI Assistant platform UI, then in code.)

How to set up a python environment:

1. download and install python
1. in the project directory...
1. `$ python3 -m venv myenv`
1. `$ source myenv/bin/activate`
1. `$ pip install -r requirements.txt`
1. run the script: `$ python3 assistant.py`