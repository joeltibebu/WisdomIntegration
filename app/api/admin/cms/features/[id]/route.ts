export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  href: z.string().min(1).optional(),
  badge: z.string().min(1).optional(),
  badgeAm: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  titleAm: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  descriptionAm: z.string().min(1).optional(),
  color: z.string().optional(),
  accentColor: z.string().optional(),
  iconPath: z.string().optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
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
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  try {
    const feature = await prisma.homepageFeature.update({ where: { id: params.id }, data: result.data });
    return NextResponse.json({ data: feature, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/cms/features/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  try {
    await prisma.homepageFeature.delete({ where: { id: params.id } });
    return NextResponse.json({ data: { deleted: true }, error: null });
  } catch (err) {
    console.error("[DELETE /api/admin/cms/features/:id]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
