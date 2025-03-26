import { prisma } from "@/lib/prisma";
import type { Page } from "@prisma/client";

// Optional: If you want to generate static params
// export async function generateStaticParams() {
//   const pages = await prisma.page.findMany({ select: { id: true } });
//   return pages.map((page) => ({
//     pageId: page.id.toString(),
//   }));
// }

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 bg-white shadow rounded">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{page.name}</h1>
        <div className="h-96 border-2 border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-gray-500">Editor area (empty for now)</p>
        </div>
      </div>
    </div>
  );
}
