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

Note: helpful to try it first in the OpenAI Assistant platform UI, then in code.
How to set up a python environment:

1. download and install python
1. in the project directory...
1. `$ python3 -m venv myenv`
1. `$ source myenv/bin/activate`
1. `$ pip install -r requirements.txt`
1. python3 assistant.py

```bash
# assistant.py
Determining Assistant
Assistant not found... Creating new Assistant
Assistant created: asst_DhV9C3eRnGtLtti6r7yDvfou - Quiz Creator
Determining Vector Store
Vector Store found: vs_B8i1bkWIwwbQNElrey6US9Hg - Study List - 5bc58a43-de29-4ffd-8873-d5fdfcb1a8af
Assigning Vector Store to Assistant
Creating Message Thread
Created Message Thread: thread_AP6yEI2qWilfWmhY4eWK7cHF
Creating Message 'Create a quiz with exactly 20 questions and reference the files used. Multiple choice quiz with 4 options.' on Thread - thread_AP6yEI2qWilfWmhY4eWK7cHF
Message created: msg_hQsE7QsWdJUj5qjjzwkq2vQB
Running Thread on Assistant...
Run Finished: completed
Run Completion Tokens: 1100
Run Prompt Tokens: 5551
Run Total Tokens: 6651

assistant Message msg_GyS9XBfBSodyEbbBji0cLNgM:

Here is a multiple-choice quiz based on the provided documents:

1. What is a mitogen?
   A) A chemical substance that triggers meiosis.
   B) A chemical substance that triggers mitosis.
   C) A protein involved in DNA replication.
   D) A protein regulating apoptosis. 

2. What are Fox proteins?
   A) Proteins involved in muscle contraction.
   B) Family of transcription factors involved in cell growth and proliferation.
   C) Enzymes that break down lipids.
   D) Proteins involved in blood clotting.

3. What is the function of 14-3-3 in signal transduction?
   A) Activates Ras proteins.
   B) Inhibits the activation of Raf.
   C) Binds and inactivates active Raf.
   D) Phosphorylates MAP kinase.

4. Which of the following is true regarding Ras and Raf?
   A) Raf is a small GTPase.
   B) Ras directly phosphorylates MAP kinase.
   C) Raf is phosphorylated and bound by 14-3-3 in its active state.
   D) Ras triggers a phosphorylation cascade involving MEK and MAP kinase.

5. What is the role of AP-1 in cellular processes?
   A) Induces cell senescence.
   B) Inhibits cell growth.
   C) Involved in cell growth, differentiation, and apoptosis.
   D) Regulates cell adhesion.

6. Why would you want to induce the transcription of EGFR in cells?
   A) To inhibit cell proliferation.
   B) To reduce the expression of cyclins.
   C) To amplify the signal transduction pathway.
   D) To promote cell senescence.

7. MMP-1 is involved in:
   A) Inhibiting cell migration.
   B) DNA repair.
   C) Breaking down extracellular matrix proteins.
   D) Inhibiting apoptosis.

8. Why is TPA considered carcinogenic?
   A) It directly causes DNA mutations.
   B) It inhibits cell proliferation.
   C) It amplifies signaling pathways uncontrollably.
   D) It induces cell senescence.

9. What is the purpose of cycloheximide in cellular experiments?
   A) Stimulate protein synthesis.
   B) Inhibit DNA replication.
   C) Inhibit protein synthesis.
   D) Activate cell mobility.

10. Which is worse - constitutively active or inactive PTEN?
    A) Inactive PTEN
    B) Constitutively active PTEN
    C) Both have the same effect
    D) Neither has any effect

11. What does a K-ras mutation lead to?
    A) Uncontrolled cell growth
    B) Apoptosis
    C) Cell differentiation
    D) Cell senescence

12. What occurs in autocrine signaling?
    A) A ligand binds to a receptor on another cell.
    B) A cell secretes a ligand that binds to a receptor on the same cell.
    C) Two cells exchange signaling molecules.
    D) Cells do not respond to external stimuli.

13. What is the consensus sequence with two DNA repeats separated by 3 nucleotides referred to as?
    A) ERE, Insertion
    B) ERE, Inversion
    C) EGR, Inversion
    D) EGR, Deletion

14. Which component is unique to the GPCR in the animal visual system pathway?
    A) Opsin
    B) Wnt
    C) Retinoic Acid
    D) Transducin

15. What does AKT do in cells?
    A) Promotes cell senescence
    B) Inhibits GSK3
    C) Activates GSK3
    D) Inhibits protein synthesis

16. What function does β-actin serve in Western Blot experiments?
    A) Control to ensure equal protein loading
    B) Induce cell proliferation
    C) Inhibit protein synthesis
    D) Activate gene expression

17. In flies, which RTK is present in the R7 photoreceptor?
    A) RK599
    B) RK777
    C) RK123
    D) RK102

18. How does AP-1 induction affect cell cycle regulation?
    A) Inhibits cyclin expression
    B) Stimulates CDK activity
    C) Induces cell proliferation
    D) Inhibits cell growth

19. What is the consequence of having a mutation in the K-ras gene?
    A) Enhanced cell differentiation
    B) Decreased cell proliferation
    C) Unregulated cell growth leading to tumor development
    D) Induction of cell senescence

20. Why is constitutively active PTEN preferable to inactive PTEN?
    A) Inhibit cell growth
    B) Promote cell senescence
    C) Activate pro-survival pathways
    D) Inhibit receptor activation

These questions are based on the content from "Biology 3316: Lecture 5", "Biology 3316: Lecture 6", and "3316 Midterm 1".
```
