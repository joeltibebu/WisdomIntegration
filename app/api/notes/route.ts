export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const noteSchema = z.object({
  sessionId: z.string().min(1, "Session is required."),
  content: z.string().min(1, "Note content is required."),
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

  const result = noteSchema.safeParse(body);
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

  const { sessionId, content } = result.data;

  try {
    // Verify the session belongs to this therapist
    const apptSession = await prisma.session.findFirst({
      where: { id: sessionId, therapistId: session.user.id },
    });
    if (!apptSession) {
      return NextResponse.json(
        { data: null, error: { code: "FORBIDDEN", message: "Session not found or does not belong to you." } },
        { status: 403 }
      );
    }

    // Check no note already exists for this session
    const existing = await prisma.sessionNote.findUnique({
      where: { sessionId },
    });
    if (existing) {
      return NextResponse.json(
        { data: null, error: { code: "CONFLICT", message: "A note already exists for this session." } },
        { status: 409 }
      );
    }

    const note = await prisma.sessionNote.create({
      data: {
        sessionId,
        childId: apptSession.childId,
        authorId: session.user.id,
        content,
      },
    });

    return NextResponse.json({ data: note, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/notes]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
