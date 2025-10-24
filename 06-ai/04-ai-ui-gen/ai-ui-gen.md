# How do the top AI tools do UI generation

- v0
- Bolt
- Replit
- Lovable

## Journalling

Get involved without specific permission in architecture ideation, certainly for significant projects.

## Reflections

### LLM usage

Divide LLM usage into “cheap” and “smart” use cases and use models accordingly.

- Cheap: project naming, chat naming, and follow up questions are just basic prompts using gpt-4o-mini.
- Smart: full-file coding.

What is shipped the browser is where things get potentially interesting.

- JSON payload: component type and (static) props, FE reconstructs the exam on the fly everytime.
- JS bundles: the browser downloads the JS chunks, and React hydrates them (attaches event handlers, runs useState, etc.).

### Implementation

What's in a exam? Instructions and metadata about the exam, like the time allowed, how much it's worth. Questions that can consist of numbered paragraph text and each question may have subsections, explanatory images and equations, and a how much it's worth. There are also other question categories beyond short answer, like multiple choice, fill in the blank, essay, matching. Answers might be sketches, text, or equations. Designers are designing a library of composable exam components.

Realistically, we need to constrain the exam output, to what components are available so we can smartly score and send back feedback on the user input. The agent will need know what exam components are available to it and decide which to use when. The agent chooses the components and calls functions to generate structured output.

The content of a note is built up sequentially from an note start event, delta events that append text, and an note end event. Similarly, we frame an exam in this way. We will need to be diligent about modelling an exam as a series of delta events, where each delta event corresponds to a component to be rendered sequentially on the page. (Children are not allowed.)

```JSON
// EventStream

CreationStarted (ExamEnded)
{"type": "CreationStarted", "id": "0", "component": "exam" }

ExamDelta
{"type": "ExamDelta", "id": "2", "data": { "component": "FrontMatter", "props": { "text": "something in markdown" }}}

ExamDelta
{"type": "ExamDelta", "id": "9", "data": { "component": "Section", "props": { "text": "Section A" }}}

ExamDelta
{"type": "ExamDelta", "id": "4", "data": { "component": "MultipleChoice", "props": { "title": "Question 1", "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "answer": 1, "marks": 1, "topic": "Geography", "hints": "something in markdown" }}}

ExamDelta
{"type": "ExamDelta", "id": "5", "data": { "component": "ShortAnswer", "props": { "title": "Question 2", "question": "What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?", "answer": {}, "marks": 1, "topic": "Geography", "hints": "something in markdown" }}}

ExamDelta
{"type": "ExamDelta", "id": "6", "data": { "component": "LongAnswer", "props": { "title": "Question 3", "question": "What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?", "answer": "Social groups ...", "marks": 1, "topic": "Geography", "hints": "something in markdown" }}}

ExamDelta
{"type": "ExamDelta", "id": "9", "data": { "component": "Section", "props": { "text": "Section B" }}}

ExamDelta
{"type": "ExamDelta", "id": "7", "data": { "component": "MultipleSelect", "props": { "title": "Question 4", "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "answer": [0, 1], "marks": 1, "topic": "Geography", "hints": "something in markdown" }}}

ExamDelta
{"type": "ExamDelta", "id": "8", "data": { "component": "TrueFalse", "props": { "title": "Question 5", "question": "What is the capital of France?", "options": ["Paris", "London"], "answer": 0, "marks": 1, "topic": "Geography", "hints": "something in markdown" }}}

CreationEnded (ExamEnded)
{"type": "CreationEnded", "id": "infinity", "component": "exam" }
```

## References

- [Building v0 in a Weekend](https://blog.sshh.io/p/building-v0-in-a-weekend)
- [](https://github.com/sshh12/spark-stack/tree/b846f68b9e29a8e29a6416a37c950085c8dad36a)
