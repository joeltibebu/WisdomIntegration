export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  body: z.string().min(1, "Body is required").optional(),
  published: z.boolean().optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return { session };
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json(
      { data: null, error: { code: auth.error, message: auth.error === "UNAUTHORIZED" ? "Authentication required." : "You don't have permission to access this." } },
      { status: auth.status }
    );
  }

  try {
    const post = await prisma.contentPost.findUnique({ where: { id: params.id } });
    if (!post) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Post not found." } },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: post, error: null });
  } catch (err) {
    console.error("[GET /api/admin/content/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
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

  const data = result.data;

  try {
    // If published is being set to true and post wasn't published, set publishedAt
    const existing = await prisma.contentPost.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Post not found." } },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.published === true && !existing.published) {
      updateData.publishedAt = new Date();
    } else if (data.published === false) {
      updateData.publishedAt = null;
    }

    const post = await prisma.contentPost.update({ where: { id: params.id }, data: updateData });
    return NextResponse.json({ data: post, error: null });
  } catch (err) {
    console.error("[PUT /api/admin/content/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}

// PATCH toggles published status
export async function PATCH(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json(
      { data: null, error: { code: auth.error, message: auth.error === "UNAUTHORIZED" ? "Authentication required." : "You don't have permission to access this." } },
      { status: auth.status }
    );
  }

  try {
    const current = await prisma.contentPost.findUnique({ where: { id: params.id } });
    if (!current) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Post not found." } },
        { status: 404 }
      );
    }

    const nowPublished = !current.published;
    const post = await prisma.contentPost.update({
      where: { id: params.id },
      data: {
        published: nowPublished,
        publishedAt: nowPublished ? (current.publishedAt ?? new Date()) : null,
      },
    });
    return NextResponse.json({ data: post, error: null });
  } catch (err) {
    console.error("[PATCH /api/admin/content/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
