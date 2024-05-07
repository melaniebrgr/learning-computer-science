import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

async function main() {
  // Step 1: create an Assistant
  const assistant = await createAssistant();

  // Step 2: create a Thread
  const thread = await createThread();

  // Step 3: Create a Run of the Thread with an Assistant
  // const run = await createRun(thread.id, assistant.id);
  const run = await createRun('thread_xkdDjmuCNP9H7OdUfO1V5pUV', 'asst_0wlg2Fl21ngwvvd4V119R07l');

  // // Step 4: Profit
  await printMessages(run);
}

async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Summary Creator",
    instructions: "You are a personal study assistant. You generate a deduplicated, structured and precise summary of the information provided. The subject can be anything, from math to history.",
    model: "gpt-3.5-turbo-0125"
    // description: "",
    // tools: [],
    // tool_resources: {},
    // metadata: new Map(),
    // temperature: 1,
    // top_p: 1,
    // response_format: { type: "json_object"}
  });
  console.log(`Assistant created: ${assistant.id}, name: ${assistant.name}`);
  return assistant;
}

async function createThread() {
  const thread = await openai.beta.threads.create({
    messages: [{
      role: "user",
      content: "Create a summary that is useful for studying. The summary should be well structured, in-depth, and accurately represent the key points."
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
  let run = await openai.beta.threads.runs.createAndPoll(
    threadId,
    { 
      assistant_id: assistantId,
      instructions: `To ensure the quality of the output, you should follow these guidelines:
      1. Read carefully every piece of content you are given.
      2. Use clear and simple language to make it easy to understand.
      3. Organize the summary in a logical order that guides the reader through the main points. 
      4. Avoid including unnecessary details or digressions that could distract from the main points.
      5. Highlight the main and most relevant concepts using text formatting
      6. Ensure that the output accurately represents the content.
      7. Go in-depth on the topics, DON'T BE LAZY, and don't be superficial`
    }
  );
  console.log("Run completed");
  return run;
}

async function printMessages(run) {
  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
    }
  } else {
    console.log(run.status);
  }
}
 
main();