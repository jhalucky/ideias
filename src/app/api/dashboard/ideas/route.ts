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
    const { title, description } = await req.json();
    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    const newIdea = await prisma.idea.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        userId: session.user.id,
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
