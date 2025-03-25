"use server";

import { prisma } from "@/lib/prisma";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Email is required");
  }

  await prisma.user.create({ data: { email } });
}
