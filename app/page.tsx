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
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 text-center">Register</h1>
        <form action={formAction} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="siteName"
            placeholder="Enter site name"
            className="w-full px-3 py-2 border rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {state.success ? <p className="mt-4 text-green-600 text-center">{state.success}</p> : null}
        {state.error ? <p className="mt-4 text-red-600 text-center">{state.error}</p> : null}
      </div>
    </main>
  );
}
