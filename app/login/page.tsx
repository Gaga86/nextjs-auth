"use client"

import Link from "next/link"
import { LoginForm } from "@/app/_ui/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  )
}