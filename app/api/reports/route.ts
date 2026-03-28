export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid form data." } },
      { status: 400 }
    );
  }

  const childId = formData.get("childId");
  const file = formData.get("file");

  if (!childId || typeof childId !== "string" || childId.trim() === "") {
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "childId is required.", fields: [{ field: "childId", message: "Child is required." }] } },
      { status: 400 }
    );
  }

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "file is required.", fields: [{ field: "file", message: "File is required." }] } },
      { status: 400 }
    );
  }

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

    // Placeholder file URL — no actual file storage
    const fileUrl = `/uploads/${file.name}`;

    const report = await prisma.progressReport.create({
      data: {
        childId,
        fileUrl,
        uploadedBy: session.user.id,
      },
    });

    return NextResponse.json({ data: report, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reports]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
