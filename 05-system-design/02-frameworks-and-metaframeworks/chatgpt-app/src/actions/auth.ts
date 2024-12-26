'use server'

import { LoginFormSchema, LoginFormState } from '@/lib/auth/definitions'
import { supabase } from '@/lib/db/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
 
export async function login(_state: LoginFormState, formData: FormData) {
  // Validate login form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  // Get user with matching email from DB
  const { data, error } = await supabase
    .from('user')
    .select("*")
    .eq('email', validatedFields.data.email)
    
  if (error) {
    console.error('Error loging in')
    return;
  }
  const user = data?.[0]

  // If user exists and password is correct create session and go to landing page
  if (!user || user.password !== validatedFields.data.password) {
    console.error('Error loging in')
    return;
  }
  createSession(user.id)
  redirect('/')
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
 
  cookieStore.set('nc-user', userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}