import dotenv from "dotenv";
import OpenAI from "openai";
import fs from 'node:fs';

// Run version 002

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

async function main() {

  // Step 1: create an Assistant
  const assistant = await createAssistant();
  
  // Step ?: create a Vector Store
  await createVectorStore(assistant.id);

  // Step 2: create a Thread
  const thread = await createThread();

  // Step 3: Create a Run of the Thread with an Assistant
  const run = await createRun(thread.id, assistant.id);

  // // Step 4: Profit
  await printMessages(thread, run);
}

async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Summary Creator",
    instructions: "You are a personal study assistant. You generate a deduplicated, structured and precise summary of the information provided. The subject can be anything, from math to history.",
    model: "gpt-3.5-turbo-0125",
    tools: [{ type: "file_search" }],
    // description: "",
    // tool_resources: {},
    // metadata: new Map(),
    // temperature: 1,
    // top_p: 1,
    // response_format: { type: "json_object"}
  });
  console.log(`Assistant created: ${assistant.id}, name: ${assistant.name}`);
  return assistant;
}

async function createVectorStore(assistantId) {
  let vectorStore = await openai.beta.vectorStores.create({
    name: "Chemical Retrosynthesis",
  });

  console.log(`Vector store created: ${vectorStore.id}, name: ${vectorStore.name}`);

  const file = await openai.files.create({
    file: fs.createReadStream("documents-chem/org2topic-3-09-full-retrosynthesis.pdf"),
    purpose: "assistants",
  });
  
  const vectorStoreFile = await openai.beta.vectorStores.files.create(
    vectorStore.id,
    {
      file_id: file.id,
    }
  );

  console.log(`Vector store file created: ${vectorStoreFile.id}`);

  await openai.beta.assistants.update(assistantId, {
    tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
  });

  return vectorStore;
}

async function createThread() {
  const thread = await openai.beta.threads.create({
    messages: [{
      role: "user",
      content: `Create a summary that is useful for studying. The summary should be well structured, in-depth, and accurately represent the key points. To ensure the quality of the output, you should follow these guidelines:
      1. Read carefully every piece of content you are given.
      2. Use clear and simple language to make it easy to understand.
      3. Organize the summary in a logical order that guides the reader through the main points. 
      4. Avoid including unnecessary details or digressions that could distract from the main points.
      5. Highlight the main and most relevant concepts using text formatting
      6. Ensure that the output accurately represents the content.
      7. Go in-depth on the topics, DON'T BE LAZY, and don't be superficial`
      // attachments: [],
      // metadata: new Map(),
    }],
  });
  
  // Step 2.5: append more messages to the Thread as desired
  // await openai.beta.threads.messages.create(
  //   thread.id,
  //   {},
  // );
  console.log(`Thread created: ${thread.id}`);
  return thread;
}

async function createRun(threadId, assistantId) {
  let run = await openai.beta.threads.runs.createAndPoll(threadId, { assistant_id: assistantId });
  console.log("Run completed");
  return run;
}

async function printMessages(thread, run) {
  const messages = await openai.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });
   
  const message = messages.data.pop();
  if (message.content[0].type === "text") {
    const { text } = message.content[0];
    const { annotations } = text;
    const citations = [];
  
    let index = 0;
    for (let annotation of annotations) {
      text.value = text.value.replace(annotation.text, "[" + index + "]");
      const { file_citation } = annotation;
      if (file_citation) {
        const citedFile = await openai.files.retrieve(file_citation.file_id);
        citations.push("[" + index + "]" + citedFile.filename);
      }
      index++;
    }
  
    console.log(text.value);
    console.log(citations.join("\n"));
  }
}
 
main();
