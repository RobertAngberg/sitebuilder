"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

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
    async (_prevStateUnused: FormState, formData: FormData): Promise<FormState> => {
      try {
        await createUser(formData);
        return { success: "User created!", error: "" };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong.";
        return { success: "", error: message }; // (ett objekt)
      }
    },
    initialState
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md border">
        <h1 className="text-2xl text-gray-500 font-bold mb-4 text-center">Create User</h1>

        <form action={formAction} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>

        {state.success && <p className="mt-4 text-green-600 text-center">{state.success}</p>}
        {state.error && <p className="mt-4 text-red-600 text-center">{state.error}</p>}
      </div>
    </main>
  );
}
