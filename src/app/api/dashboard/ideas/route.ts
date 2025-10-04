import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assumes your NextAuth config is here
import { prisma } from "@/lib/prisma"; // Assumes your Prisma client is here

/**
 * @route POST /dashboard/ideas
 * @description Creates a new tech/startup idea. (Requires Authentication)
 */
export async function POST(req: NextRequest) {
  // 1. Check Authentication
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    // 2. Create the new idea record
    const newIdea = await prisma.idea.create({
      data: {
        title,
        description,
        userId: session.user.id, // Link to authenticated user
      },
      include: {
        user: { select: { name: true, username: true } },
      },
    });

    return NextResponse.json(newIdea, { status: 201 });
  } catch (error) {
    console.error("Error creating idea:", error);
    return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
  }
}

/**
 * @route GET /dashboard/ideas
 * @description Fetches a list of all ideas with author details and opinion counts.
 */
export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, username: true } },
        _count: { select: { opinions: true } },
      },
    });

    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}