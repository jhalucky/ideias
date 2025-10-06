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
    const { ideaId, content, opinionType } = await req.json();
    if (!ideaId || !opinionType) {
      return NextResponse.json({ error: "Idea ID and opinion type required" }, { status: 400 });
    }

    const existingOpinion = await prisma.opinion.findFirst({
      where: { userId: session.user.id, ideaId },
    });

    const opinion = existingOpinion
      ? await prisma.opinion.update({
          where: { id: existingOpinion.id },
          data: { content, opinionType },
          include: { user: { select: { name: true, username: true } } },
        })
      : await prisma.opinion.create({
          data: { ideaId, content, opinionType, userId: session.user.id },
          include: { user: { select: { name: true, username: true } } },
        });

    return NextResponse.json(opinion, { status: existingOpinion ? 200 : 201 });
  } catch (error) {
    console.error("Error submitting opinion:", error);
    return NextResponse.json({ error: "Failed to submit opinion" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const opinions = await prisma.opinion.findMany({
      where: userId ? { userId } : undefined,
      include: {
        user: { select: { id: true, name: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(opinions, { status: 200 });
  } catch (err) {
    console.error("Error fetching opinions:", err);
    return NextResponse.json([], { status: 500 });
  }
}