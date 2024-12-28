import { supabase } from "./utils";

export const getUserByEmail = async (email: string) => { 
  const { data, error } = await supabase
    .from('user')
    .select("*")
    .eq('email', email)
    .single()
  if (error || !data) throw new Error(error!.message)
  return data
}