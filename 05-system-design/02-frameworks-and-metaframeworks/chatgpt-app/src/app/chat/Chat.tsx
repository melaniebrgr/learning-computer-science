"use client";
import { useRef, useState } from "react"

import { getCompletion } from "@/actions/getCompletion";
import { Input } from "@/components/input"
import { Button } from "@/components/button"

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  // useRef instead of useState to avoid re-render when chatID changes
  const chatId = useRef<number | undefined>(undefined);

  const onClick = async () => {
    const completions = await getCompletion([
      ...messages,
      {
        role: "user",
        content: message,
      },
    ], chatId.current);
    setMessage("");
    setMessages(completions.messages);
    chatId.current = completions.chatId;
  }  

  return (
    <div className="flex flex-col">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  )
}