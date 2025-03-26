"use server";

import { prisma } from "@/lib/prisma";

export async function createPage({ name, siteId }: { name: string; siteId: number }) {
  const page = await prisma.page.create({
    data: {
      name,
      siteId,
      content: {},
    },
  });
  return page;
}

export async function deletePage(pageId: number) {
  await prisma.page.delete({
    where: { id: pageId },
  });
}
