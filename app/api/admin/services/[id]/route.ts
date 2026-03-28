export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json(
      { data: null, error: { code: auth.error, message: auth.error === "UNAUTHORIZED" ? "Authentication required." : "You don't have permission to access this." } },
      { status: auth.status }
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

  const result = updateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message })) } },
      { status: 400 }
    );
  }

  try {
    const service = await prisma.service.update({
      where: { id: params.id },
      data: result.data,
    });
    return NextResponse.json({ data: service, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/services/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}

// PATCH toggles the active status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json(
      { data: null, error: { code: auth.error, message: auth.error === "UNAUTHORIZED" ? "Authentication required." : "You don't have permission to access this." } },
      { status: auth.status }
    );
  }

  try {
    const current = await prisma.service.findUnique({ where: { id: params.id } });
    if (!current) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Service not found." } },
        { status: 404 }
      );
    }
    const service = await prisma.service.update({
      where: { id: params.id },
      data: { active: !current.active },
    });
    return NextResponse.json({ data: service, error: null });
  } catch (err) {
    console.error("[PATCH /api/admin/services/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
