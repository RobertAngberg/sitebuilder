"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function createUserAndSite(formData: FormData) {
  // Retrieve and trim the form values
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const siteName = formData.get("siteName")?.toString().trim();

  // Basic validations
  if (!email || !password || !siteName) {
    throw new Error("All fields are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (siteName.length < 3) {
    throw new Error("Site name must be at least 3 characters");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a slug for the site (lowercase and replace spaces with hyphens)
  const slug = siteName.toLowerCase().replace(/\s+/g, "-");

  // Create the user with an associated site in one call
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      sites: {
        create: {
          name: siteName,
          slug,
        },
      },
    },
    include: {
      sites: true,
    },
  });

  return user;
}
