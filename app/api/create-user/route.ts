import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: { email },
    });

    return NextResponse.json({ message: "User created!", user });
  } catch (error: unknown | Error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
  }
}
