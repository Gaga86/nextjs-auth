import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/_actions/auth'
import { Label } from "@/app/_components/label"
import { Input } from "@/app/_components/input"
import { Button } from "@/app/_components/button"
 
export function LoginForm() {
  const [state, action] = useFormState(login, undefined)


  return (
    <form className="mt-8 space-y-6" action={action}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" required className="mt-1 block w-full" placeholder="john@example.com" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required className="mt-1 block w-full" placeholder="••••••••" />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </Label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div> */}

      <div>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button disabled={pending} type="submit" className="w-full">
      Login
    </Button>
  )
}