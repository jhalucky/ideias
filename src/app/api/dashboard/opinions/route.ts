import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * @route POST /dashboard/opinions
 * @description Submits a new opinion (feedback) on a specific idea. (Requires Authentication)
 */
export async function POST(req: NextRequest) {
  // 1. Check Authentication
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { ideaId, content, opinionType } = await req.json();

    if (!ideaId || !opinionType) {
      return NextResponse.json({ error: "Idea ID and opinion type are required" }, { status: 400 });
    }

    // 2. Check if the user has already posted an opinion on this idea
    const existingOpinion = await prisma.opinion.findFirst({
      where: {
        userId: session.user.id,
        ideaId: ideaId,
      },
    });

    if (existingOpinion) {
      // If an opinion exists, we allow the user to update it (e.g., change vote or content)
      const updatedOpinion = await prisma.opinion.update({
        where: { id: existingOpinion.id },
        data: {
          content,
          opinionType,
        },
        include: {
          user: { select: { name: true, username: true } },
        },
      });
      return NextResponse.json(updatedOpinion, { status: 200 });
    }

    // 3. Create the new opinion record
    const newOpinion = await prisma.opinion.create({
      data: {
        ideaId,
        content,
        opinionType,
        userId: session.user.id,
      },
      include: {
        user: { select: { name: true, username: true } },
      },
    });

    return NextResponse.json(newOpinion, { status: 201 });
  } catch (error) {
    console.error("Error submitting opinion:", error);
    return NextResponse.json({ error: "Failed to submit opinion" }, { status: 500 });
  }
}
