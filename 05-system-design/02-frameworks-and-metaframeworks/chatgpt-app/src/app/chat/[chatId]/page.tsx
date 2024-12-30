import Chat from "../Chat" 
import { getChatByIdAndMessages } from "@/lib/db/chat";
import { getUserIdFromCookie } from "@/lib/auth/utils";
import { notFound, redirect } from "next/navigation";

interface ChatDetailsRouteProps {
  params: Promise<{
    chatId: number;
  }>;
}

export default async function ChatDetailsRoute({ params }: ChatDetailsRouteProps) {
  const { chatId } = await params
  
  let chat, messages
  try {
    const response = await getChatByIdAndMessages(chatId)
    chat = response.chat
    messages = response.messages
  } catch {
    notFound()
  }

  const userId = await getUserIdFromCookie()
  if (userId !== chat.user_id) {
    redirect('/')
  }

  return (
    <main className="p-5">
      <Chat id={chat.id} messages={messages} />
    </main>
  );
}