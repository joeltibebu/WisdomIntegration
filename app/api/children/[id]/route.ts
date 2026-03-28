export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1, "Child's name is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => !isNaN(Date.parse(v)), { message: "Date of birth must be a valid date" }),
  diagnosisNotes: z.string().optional(),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  medicalNotes: z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }

  try {
    const child = await prisma.childProfile.findUnique({ where: { id: params.id } });
    if (!child) {
      return NextResponse.json({ data: null, error: { code: "NOT_FOUND", message: "The requested resource was not found." } }, { status: 404 });
    }
    if (child.parentId !== session.user.id) {
      return NextResponse.json({ data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } }, { status: 403 });
    }
    return NextResponse.json({ data: child, error: null });
  } catch (err) {
    console.error("[GET /api/children/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Invalid request body." } }, { status: 400 });
  }

  const result = updateSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: fieldErrors } }, { status: 400 });
  }

  try {
    const existing = await prisma.childProfile.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ data: null, error: { code: "NOT_FOUND", message: "The requested resource was not found." } }, { status: 404 });
    }
    if (existing.parentId !== session.user.id) {
      return NextResponse.json({ data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } }, { status: 403 });
    }

    const { name, dateOfBirth, diagnosisNotes, emergencyContact, medicalNotes } = result.data;
    const updated = await prisma.childProfile.update({
      where: { id: params.id },
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        diagnosisNotes: diagnosisNotes ?? null,
        emergencyContact,
        medicalNotes: medicalNotes ?? null,
      },
    });
    return NextResponse.json({ data: updated, error: null });
  } catch (err) {
    console.error("[PUT /api/children/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, { status: 500 });
  }
}
