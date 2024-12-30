export interface UserDB {
  id: number;
  created_at: string;
  username: string;
  password: string;
  email: string;
}

export interface ChatDB {
  id: number;
  created_at: string;
  user_id: number;
  name: string;
}

export type CreateChatDB = Omit<ChatDB, "id" | "created_at">;

export interface MsgDB {
  id: number;
  created_at: string;
  chat_id: number;
  role: "user" | "assistant";
  content: string;
}

export type CreateMsgDB = Omit<MsgDB, "id" | "created_at" | "chat_id">;

export interface ChatWithMsgsDB { chat: ChatDB; messages: MsgDB[] }

export interface MsgOpenAI {
  role: "user" | "assistant";
  content: string;
}