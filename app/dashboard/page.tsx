import { prisma } from "@/lib/prisma"; // Adjust the import path as needed
import DashboardClient from "./DashboardClient";
import type { Page } from "@prisma/client";

async function getPages(): Promise<Page[]> {
  return prisma.page.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const pages = await getPages();
  return <DashboardClient initialPages={pages} />;
}
