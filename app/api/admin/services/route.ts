import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json(
      { data: null, error: { code: auth.error, message: auth.error === "UNAUTHORIZED" ? "Authentication required." : "You don't have permission to access this." } },
      { status: auth.status }
    );
  }

  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: services, error: null });
  } catch (err) {
    console.error("[GET /api/admin/services]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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

  const result = serviceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message })) } },
      { status: 400 }
    );
  }

  try {
    const service = await prisma.service.create({ data: result.data });
    return NextResponse.json({ data: service, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/services]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
