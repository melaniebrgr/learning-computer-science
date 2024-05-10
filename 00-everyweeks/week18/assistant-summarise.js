import dotenv from "dotenv";
import OpenAI from "openai";
import fs from 'node:fs';

// Run version 003

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_NEW });

async function main() {

  // Step 1: get the Assistant (pre-created manually or programmatically)
  const assistant = await getAssistant();

  // Step 2: create a Thread
  const thread = await createThread();

  // Step 3: Create a Run of the Thread with an Assistant
  const run = await createRun(thread.id, assistant.id);

  // // Step 4: Profit
  await printMessages(thread, run);
}

async function getAssistant() {
  const assistant = await openai.beta.assistants.retrieve("asst_jCwPjikPtWGKT9RhQkdJMgAp");
  console.log(`Assistant ${assistant.name} fetched, id: ${assistant.id}`);
  return assistant;
}

async function createThread() {
  const thread = await openai.beta.threads.create();
  console.log(`Thread created, id: ${thread.id}`);

  const file = await openai.files.create({
    file: fs.createReadStream("documents-chem/mel-org2topic-3-09-full-retrosynthesis.pdf"),
    purpose: "assistants",
  });
  console.log(`File created, id: ${file.id}`);

  await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: "Summarise",
		attachments: [{
      file_id: file.id,
      tools: [{ type: "file_search"}]
    }]
	});
  console.log(`Message and vector store created`);

  return thread;
}

async function createRun(threadId, assistantId) {
  let run = await openai.beta.threads.runs.createAndPoll(threadId, { assistant_id: assistantId });
  console.log(`Run completed, id: ${run.id}`);
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
