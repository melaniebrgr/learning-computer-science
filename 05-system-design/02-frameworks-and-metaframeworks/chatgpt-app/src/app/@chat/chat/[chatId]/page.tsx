import { getUserIdFromCookie } from "@/lib/auth/utils";
import { getChatByUserIdAndMessages } from "@/lib/db/chat";
import Link from "next/link";


export default async function ChatMenu() {
  const userId = await getUserIdFromCookie()
  const chats = userId ? (await getChatByUserIdAndMessages(userId)) : []

  return userId ? (
    <div className="md:w-1/3 md:min-w-1/3 pr-5 w-full text-nowrap">
      <div className="text-2xl font-bold">Chat Sessions</div>
      <div className="flex flex-col gap-2">
        {chats.map((chat) => (
          <div key={chat.chat.id}>
            <Link href={`/chat/${chat.chat.id}`} className="text-lg line-clamp-1 text-blue-500 underline">
              {chat.messages[0].content.trim().slice(0, 20).trim()}
              {chat.messages[0].content.length >= 20 ? "..." : ""}
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}