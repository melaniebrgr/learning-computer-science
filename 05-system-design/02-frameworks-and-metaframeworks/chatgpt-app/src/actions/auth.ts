'use server'

import { LoginFormSchema, LoginFormState } from '@/lib/auth/definitions'
import { getUserByEmail } from '@/lib/db/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { USER_ID_COOKIE } from '@/lib/auth/constants';
 
export async function login(_state: LoginFormState, formData: FormData) {
  // Validate login form fields
  const { error, success, data } = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const user = await getUserByEmail(data.email)

  // If user exists and password is correct create session and go to landing page
  if (user.password !== data.password) {
    console.error('Error loging in')
    return;
  }
  createSession(user.id)
  redirect('/')
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
 
  cookieStore.set(USER_ID_COOKIE, userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}