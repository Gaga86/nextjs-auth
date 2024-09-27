
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/_actions/auth'
import { Label } from "@/app/_components/label"
import { Input } from "@/app/_components/input"
import { Button } from "@/app/_components/button"
 
export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)


  return (
    <form className="mt-8 space-y-6" action={action}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" required className="mt-1 block w-full" placeholder="John Doe" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" required className="mt-1 block w-full" placeholder="john@example.com" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required className="mt-1 block w-full" placeholder="••••••••" />
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
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button disabled={pending} type="submit" className="w-full">
      Sign Up
    </Button>
  )
}