import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const childProfileSchema = z.object({
  name: z.string().min(1, "Child's name is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => !isNaN(Date.parse(v)), { message: "Date of birth must be a valid date" }),
  diagnosisNotes: z.string().optional(),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  medicalNotes: z.string().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }
  if (session.user.role !== "PARENT") {
    return NextResponse.json({ data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } }, { status: 403 });
  }

  try {
    const children = await prisma.childProfile.findMany({
      where: { parentId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: children, error: null });
  } catch (err) {
    console.error("[GET /api/children]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }
  if (session.user.role !== "PARENT") {
    return NextResponse.json({ data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Invalid request body." } }, { status: 400 });
  }

  const result = childProfileSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: fieldErrors } }, { status: 400 });
  }

  const { name, dateOfBirth, diagnosisNotes, emergencyContact, medicalNotes } = result.data;

  try {
    const child = await prisma.childProfile.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        diagnosisNotes: diagnosisNotes ?? null,
        emergencyContact,
        medicalNotes: medicalNotes ?? null,
        parentId: session.user.id,
      },
    });
    return NextResponse.json({ data: child, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/children]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, { status: 500 });
  }
}
