export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const heroSchema = z.object({
  page: z.string().min(1),
  badge: z.string().min(1, "Badge is required"),
  badgeAm: z.string().min(1, "Amharic badge is required"),
  title: z.string().min(1, "Title is required"),
  titleAm: z.string().min(1, "Amharic title is required"),
  description: z.string().min(1, "Description is required"),
  descriptionAm: z.string().min(1, "Amharic description is required"),
  backgroundImage: z.string().optional().nullable(),
  ctaText: z.string().optional().nullable(),
  ctaLink: z.string().optional().nullable(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  try {
    const heroes = await prisma.heroSection.findMany({ orderBy: { page: "asc" } });
    return NextResponse.json({ data: heroes, error: null });
  } catch (err) {
    console.error("[GET /api/admin/cms/hero]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Invalid body." } }, { status: 400 });
  }

  const result = heroSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  try {
    const { page, ...data } = result.data;
    const hero = await prisma.heroSection.upsert({
      where: { page },
      update: data,
      create: { page, ...data },
    });
    return NextResponse.json({ data: hero, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/cms/hero]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
