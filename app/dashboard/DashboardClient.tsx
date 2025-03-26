"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePage } from "./actions";
import AddPageForm from "./AddPageForm";
import PageItem from "./PageItem";
import type { Page } from "@prisma/client";

type DashboardClientProps = {
  initialPages: Page[];
};

export default function DashboardClient({ initialPages }: DashboardClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const handleDelete = async (pageId: number) => {
    setDeleteError("");
    setDeleteSuccess("");
    try {
      await deletePage(pageId);
      setDeleteSuccess("Page deleted!");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Failed to delete page.");
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
        <AddPageForm onPageAdded={() => router.refresh()} />
        {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}
        {deleteSuccess && <p className="text-green-400 mb-4">{deleteSuccess}</p>}
        <ul className="space-y-4">
          {initialPages.map((page) => (
            <PageItem key={page.id} page={page} onDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </div>
  );
}
