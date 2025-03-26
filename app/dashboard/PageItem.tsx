"use client";

import Link from "next/link";
import type { Page } from "@prisma/client";

type PageItemProps = {
  page: Page;
  onDelete: (pageId: number) => void;
};

export default function PageItem({ page, onDelete }: PageItemProps) {
  return (
    <li className="p-4 bg-gray-800 rounded-md flex justify-between items-center">
      <div>
        <Link href={`/editor/${page.id}`} className="font-semibold text-blue-300 hover:underline">
          {page.name}
        </Link>
        <p className="text-sm text-gray-400">
          Created at: {new Date(page.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        onClick={() => onDelete(page.id)}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </li>
  );
}
