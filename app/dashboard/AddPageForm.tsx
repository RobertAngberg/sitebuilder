"use client";

import { useState } from "react";
import { createPage } from "./actions";

type AddPageFormProps = {
  onPageAdded: () => void;
};

export default function AddPageForm({ onPageAdded }: AddPageFormProps) {
  const [newPageName, setNewPageName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await createPage({ name, siteId: 1 });
      setSuccess(`Page "${name}" created!`);
      setNewPageName("");
      onPageAdded();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create page.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          className="px-3 py-2 rounded-md bg-white text-black"
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
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-400">{success}</p>}
    </form>
  );
}
