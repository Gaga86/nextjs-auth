import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </h2>
        <h2 className="mt-2 text-gray-600">
          Or{" "}
        </h2>
        <h2 className="text-3xl font-extrabold text-gray-900">
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign Up
          </Link>
        </h2>
      </div>
    </div>
  );
}
