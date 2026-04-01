export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().optional().nullable(),
  content: z.string().min(1).optional(),
  contentAm: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  active: z.boolean().optional(),
  order: z.number().int().optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST" } }, { status: 400 });
  }

  const result = updateSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR" } }, { status: 400 });

  try {
    const item = await prisma.testimonial.update({ where: { id: params.id }, data: result.data });
    return NextResponse.json({ data: item, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/cms/testimonials/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  try {
    await prisma.testimonial.delete({ where: { id: params.id } });
    return NextResponse.json({ data: { deleted: true }, error: null });
  } catch (err) {
    console.error("[DELETE /api/admin/cms/testimonials/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
