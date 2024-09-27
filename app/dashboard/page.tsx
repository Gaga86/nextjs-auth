// import { cookies } from "next/headers";
import { logout } from "@/app/_actions/auth";
import { Button } from "@/app/_components/button"

// const session = cookies().get('session')

export default function Home() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Dashboard</h2>
      </div>
      <form action={logout}>
        <div>
          <Button type="submit" className="w-full">
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
}