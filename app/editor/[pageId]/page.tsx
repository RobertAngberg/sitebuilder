import { prisma } from "@/lib/prisma";
import type { Page } from "@prisma/client";
import Sitebuilder from "./Sitebuilder"; // Import the client component

async function getPage(pageId: number): Promise<Page | null> {
  return prisma.page.findUnique({
    where: { id: pageId },
  });
}

export default async function EditorPage({ params }: { params: { pageId: string } }) {
  const pageId = Number(params.pageId);
  const page = await getPage(pageId);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Page not found.</p>
      </div>
    );
  }

  return <Sitebuilder />;
}
