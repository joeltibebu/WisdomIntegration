export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  id: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  titleAm: z.string().optional().nullable(),
  content: z.string().optional(),
  contentAm: z.string().optional(),
});

const createSchema = z.object({
  page: z.string().min(1),
  section: z.string().min(1),
  title: z.string().optional().nullable(),
  titleAm: z.string().optional().nullable(),
  content: z.string().default(""),
  contentAm: z.string().default(""),
  imageUrl: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

const patchSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional().nullable(),
  titleAm: z.string().optional().nullable(),
  content: z.string().optional(),
  contentAm: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const section = searchParams.get("section");

  try {
    const blocks = await prisma.pageBlock.findMany({
      where: {
        ...(page ? { page } : {}),
        ...(section ? { section } : {}),
      },
      orderBy: [{ page: "asc" }, { order: "asc" }],
    });
    return NextResponse.json({ data: blocks, error: null });
  } catch (err) {
    console.error("[GET /api/admin/cms/pageblocks]", err);
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

  const result = createSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  try {
    const block = await prisma.pageBlock.create({ data: result.data });
    return NextResponse.json({ data: block, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/cms/pageblocks]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
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

  const { id, ...data } = result.data;

  try {
    const block = await prisma.pageBlock.update({ where: { id }, data });
    return NextResponse.json({ data: block, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/cms/pageblocks]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST" } }, { status: 400 });
  }

  const result = patchSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", fields: result.error.issues } }, { status: 400 });

  const { id, ...data } = result.data;

  try {
    const block = await prisma.pageBlock.update({ where: { id }, data });
    return NextResponse.json({ data: block, error: null });
  } catch (err) {
    console.error("[PATCH /api/admin/cms/pageblocks]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ data: null, error: { code: auth.error } }, { status: auth.status });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Missing id" } }, { status: 400 });
  }

  try {
    await prisma.pageBlock.delete({ where: { id } });
    return NextResponse.json({ data: { id }, error: null });
  } catch (err) {
    console.error("[DELETE /api/admin/cms/pageblocks]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } }, { status: 500 });
  }
}
