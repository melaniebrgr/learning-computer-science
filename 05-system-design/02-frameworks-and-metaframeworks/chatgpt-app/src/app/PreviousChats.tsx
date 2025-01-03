import { getUserIdFromCookie } from "@/lib/auth/utils"
import { getChatByUserIdAndMessages } from "@/lib/db/chat"
import Transcript from "./Transcript"
import Link from "next/link"

export default async function PreviousChats() {
  const userId = await getUserIdFromCookie()
  const chats = userId ? (await getChatByUserIdAndMessages(userId)) : []

  return (
    <div>
      {chats.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Previous Chat Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {chats.map((chat) => (
              <div key={chat.chat.id} className="m-1 border-2 rounded-xl">
                <Link
                  href={`/chat/${chat.chat.id}`}
                  className="text-lg line-clamp-1 px-5 py-2 text-white bg-blue-900 rounded-t-lg"
                >
                  {chat.messages[0].content.substring(0, 60)+"..."}
                </Link>
                <div className="p-3">
                  <Transcript messages={chat.messages.slice(0, 2)} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {chats.length === 0 && (
        <div className="my-4">
          <div className="text-gray-500 text-2xl">
            No previous chats. Did you forget to <Link href="/login" className="text-blue-500 underline">login?</Link>
          </div>
        </div>
      )}
    </div>
  );
}