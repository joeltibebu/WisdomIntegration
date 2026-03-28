import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const goalSchema = z.object({
  childId: z.string().min(1, "Child is required."),
  description: z.string().min(1, "Description is required."),
});

export async function POST(req: NextRequest) {
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid request body." } },
      { status: 400 }
    );
  }

  const result = goalSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: fieldErrors } },
      { status: 400 }
    );
  }

  const { childId, description } = result.data;

  try {
    // Verify child is assigned to this therapist
    const child = await prisma.childProfile.findFirst({
      where: { id: childId, therapistId: session.user.id },
    });
    if (!child) {
      return NextResponse.json(
        { data: null, error: { code: "FORBIDDEN", message: "Child not found or not assigned to you." } },
        { status: 403 }
      );
    }

    const goal = await prisma.goal.create({
      data: { childId, description },
    });

    return NextResponse.json({ data: goal, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/goals]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
