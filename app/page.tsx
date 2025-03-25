"use client";

import { useActionState } from "react";
import { createUserAndSite } from "./actions";

type FormState = {
  success: string;
  error: string;
};

const initialState: FormState = {
  success: "",
  error: "",
};

export default function HomePage() {
  const [state, formAction] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await createUserAndSite(formData);
        return { success: "User created!", error: "" };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong.";
        return { success: "", error: message };
      }
    },
    initialState
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-300 text-center">Register</h1>
        <form action={formAction} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="siteName"
            placeholder="Enter site name"
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {state.success ? <p className="mt-4 text-green-400 text-center">{state.success}</p> : null}
        {state.error ? <p className="mt-4 text-red-500 text-center">{state.error}</p> : null}
      </div>
    </main>
  );
}
