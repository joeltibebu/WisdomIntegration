import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
      { status: 401 }
    );
  }
  if (session.user.role !== "THERAPIST") {
    return NextResponse.json(
      { data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } },
      { status: 403 }
    );
  }

  const { id } = params;

  try {
    // Find the goal and verify the child is assigned to this therapist
    const goal = await prisma.goal.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!goal) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Goal not found." } },
        { status: 404 }
      );
    }

    if (goal.child.therapistId !== session.user.id) {
      return NextResponse.json(
        { data: null, error: { code: "FORBIDDEN", message: "This child is not assigned to you." } },
        { status: 403 }
      );
    }

    const updated = await prisma.goal.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ data: updated, error: null });
  } catch (err) {
    console.error("[PATCH /api/goals/[id]/complete]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
