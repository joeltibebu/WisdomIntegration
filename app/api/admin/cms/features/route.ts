export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const featureSchema = z.object({
  href: z.string().min(1, "Link is required"),
  badge: z.string().min(1, "Badge is required"),
  badgeAm: z.string().min(1, "Amharic badge is required"),
  title: z.string().min(1, "Title is required"),
  titleAm: z.string().min(1, "Amharic title is required"),
  description: z.string().min(1, "Description is required"),
  descriptionAm: z.string().min(1, "Amharic description is required"),
  color: z.string().min(1, "Color gradient is required"),
  accentColor: z.string().min(1, "Accent color is required"),
  iconPath: z.string().min(1, "Icon path is required"),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
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
    const features = await prisma.homepageFeature.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ data: features, error: null });
  } catch (err) {
    console.error("[GET /api/admin/cms/features]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Invalid body." } }, { status: 400 });
  }

  const result = featureSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  try {
    const feature = await prisma.homepageFeature.create({ data: result.data });
    return NextResponse.json({ data: feature, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/cms/features]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
