"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPage, deletePage } from "./actions";
import type { Page } from "@prisma/client";

type DashboardClientProps = {
  initialPages: Page[];
};

export default function DashboardClient({ initialPages }: DashboardClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [newPageName, setNewPageName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle adding a new page
  const handleAddPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("pageName")?.toString().trim() || "";
    if (!name) {
      setError("Page name cannot be empty.");
      return;
    }
    if (name.length > 20) {
      setError("Page name must be at most 20 characters.");
      return;
    }
    try {
      // Using a hard-coded siteId (e.g., 1). Adjust as needed.
      const siteId = Number(formData.get("siteId"));
      await createPage({ name, siteId });
      setSuccess(`Page "${name}" created!`);
      setNewPageName("");
      router.refresh(); // refresh to load fresh data
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create page.");
      }
    }
  };

  // Handle deleting a page
  const handleDeletePage = async (pageId: number) => {
    setError("");
    setSuccess("");
    try {
      await deletePage(pageId);
      setSuccess("Page deleted!");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete page.");
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">You must be signed in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {session.user?.email}!</p>
      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition mb-8"
      >
        Sign Out
      </button>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pages</h2>
        {/* Form for adding a new page */}
        <form
          onSubmit={handleAddPage}
          className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4"
        >
          <div className="flex flex-col">
            <label htmlFor="pageName" className="mb-1">
              New Page Name (max 20 characters):
            </label>
            <input
              id="pageName"
              name="pageName"
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="px-3 py-2 rounded-md text-black"
              maxLength={20}
              required
            />
            {/* Hidden field for siteId; replace "1" with a dynamic value if available */}
            <input type="hidden" name="siteId" value="1" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Page
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}

        {/* List of pages with creation time */}
        <ul className="space-y-4">
          {initialPages.map((page) => (
            <li
              key={page.id}
              className="p-4 bg-gray-800 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{page.name}</p>
                <p className="text-sm text-gray-400">
                  Created at: {new Date(page.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeletePage(page.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
