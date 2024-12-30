"use server"

import { createChat, createMsg } from "@/lib/db/chat";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

export async function getCompletion(
  messageHistory: {
    role: "user" | "assistant";
    content: string;
  }[],
  chatId?: number,
) {
  let chat = { id: chatId }
  
  if (!chat.id) {
    chat = await createChat({ user_id: 1, name: Date.now().toString() })
  }

  if (chat.id && messageHistory.length > 0) {
    const lastMsg = messageHistory[messageHistory.length - 1]
    await createMsg(chat.id, { role: lastMsg.role, content: lastMsg.content })
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  })

  const message = response.choices[0].message as unknown as {
    role: "user" | "assistant";
    content: string;
  }

  const messages = [
    ...messageHistory,
    message
  ]

  if (chat.id) {
    await createMsg(chat.id, { role: message.role, content: message.content })
  }

  return { chatId: chat.id, messages };
}