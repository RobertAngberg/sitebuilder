"use server";

import { prisma } from "@/lib/prisma"; // Adjust this path as needed

/**
 * Creates a new page with the provided name and siteId.
 * The page content is initialized as an empty JSON object.
 */
export async function createPage({ name, siteId }: { name: string; siteId: number }) {
  const page = await prisma.page.create({
    data: {
      name,
      siteId,
      content: {}, // initial empty content
    },
  });
  return page;
}

/**
 * Deletes the page with the given pageId.
 */
export async function deletePage(pageId: number) {
  await prisma.page.delete({
    where: { id: pageId },
  });
}
