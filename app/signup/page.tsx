"use client"

import Link from "next/link"
import { SignupForm } from "@/app/_ui/signup-form";

export default function Page() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your account
          </Link>
        </p>
      </div>
      <SignupForm />
    </div>
  )
}