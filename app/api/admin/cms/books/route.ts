export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  titleAm: z.string().min(1, "Amharic title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  descriptionAm: z.string().min(1, "Amharic description is required"),
  coverImageUrl: z.string().min(1, "Cover image URL is required"),
  purchaseLink: z.string().optional().nullable(),
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
    const items = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: items, error: null });
  } catch (err) {
    console.error("[GET /api/admin/cms/books]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST" } }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  try {
    const item = await prisma.book.create({ data: result.data });
    return NextResponse.json({ data: item, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/cms/books]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
