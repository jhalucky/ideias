import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
      include: { user: { select: { name: true, username: true } } },
    });

    if (!idea) return NextResponse.json({ error: "Idea not found" }, { status: 404 });

    const opinions = await prisma.opinion.findMany({
      where: { ideaId: params.id },
      include: {
        user: { select: { name: true, username: true } },
        replies: {
          include: { user: { select: { name: true, username: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ idea, opinions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching idea opinions:", error);
    return NextResponse.json({ error: "Failed to load opinions" }, { status: 500 });
  }
}
