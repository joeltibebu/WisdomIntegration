import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const assignSchema = z.object({
  childId: z.string().min(1, "Child is required"),
  therapistId: z.string().min(1, "Therapist is required"),
});

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
      { status: 401 }
    );
  }
  if (session.user.role !== "ADMIN") {
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

  const result = assignSchema.safeParse(body);
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

  const { childId, therapistId } = result.data;

  try {
    const childProfile = await prisma.childProfile.update({
      where: { id: childId },
      data: { therapistId },
    });
    return NextResponse.json({ data: childProfile, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/users/assign]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
