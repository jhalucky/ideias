import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma"; 


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { username, bio} = await req.json();


    if (!username) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }


    const existingUsername = await prisma.user.findFirst({
      where: {
        username,
        id: { not: session.user.id },
      },
    });

    if (existingUsername) {
      return NextResponse.json({ error: "Username is already taken." }, { status: 409 });
    }


    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username,
        bio,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}