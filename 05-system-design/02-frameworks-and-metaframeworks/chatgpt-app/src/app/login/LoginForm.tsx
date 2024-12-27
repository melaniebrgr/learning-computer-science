'use client'

import { login } from "@/actions/auth"
import { useActionState } from "react"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Label } from "@/components/label"

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action}>
      <div className="my-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div className="my-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <Button disabled={pending} type="submit">Login</Button>
    </form>
  )
}