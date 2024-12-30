import { ChatWithMsgsDB, CreateChatDB, CreateMsgDB } from "./definitions"
import { supabase } from "./utils"

export const createChat = async (chat: CreateChatDB) => {
  const { data: chatDB, error: chatErr } = await supabase
    .from('chat')
    .upsert([ chat ])
    .select()
  if (chatErr || !chatDB) throw new Error(chatErr.message)
  return chatDB[0]
}

export const createMsg = async (chatId: number, msg: CreateMsgDB) => {
  const { data: msgDB, error: msgErr } = await supabase
    .from('message')
    .insert([ {
      ...msg,
      chat_id: chatId
    } ])
    .select()
  if (msgErr || !msgDB) throw new Error(msgErr.message)
  return msgDB[0]
}

export const getLatestChatAndMessages = async () => {
  const { data: chatDB, error } = await supabase
    .from('chat')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !chatDB) throw new Error(error!.message)

  const { data: msgsDB, error: msgsErr } = await supabase
    .from('message')
    .select('*')
    .eq('chat_id', chatDB.id)

  if (msgsErr || !msgsDB) throw new Error(msgsErr.message)

  return {
    chat: chatDB,
    messages: msgsDB
  }
}

export const getChatByIdAndMessages = async (chatId: number) => {
  const { data: chatDB, error } = await supabase
    .from('chat')
    .select('*')
    .eq('id', chatId)
    .single()

  if (error || !chatDB) throw new Error(error!.message)

  const { data: msgsDB, error: msgsErr } = await supabase
    .from('message')
    .select('*')
    .eq('chat_id', chatDB.id)

  if (msgsErr || !msgsDB) throw new Error(msgsErr.message)

  return {
    chat: chatDB,
    messages: msgsDB
  }
}

export const getChatByUserIdAndMessages = async (userId: number): Promise<ChatWithMsgsDB[]> => {
  const chats = [] as ChatWithMsgsDB[]

  const { data: chatDB, error } = await supabase
    .from('chat')
    .select('*')
    .eq('user_id', userId)
    .range(0, 5)
  if (error || !chatDB) throw new Error(error!.message)

  await Promise.all(chatDB.map(async (chat) => {
    const { data: msgsDB, error: msgsErr } = await supabase
      .from('message')
      .select('*')
      .eq('chat_id', chat.id)

    if (msgsErr || !msgsDB) throw new Error(msgsErr.message)

    chats.push({
      chat,
      messages: msgsDB ?? []
    })
  }))

  return chats
}