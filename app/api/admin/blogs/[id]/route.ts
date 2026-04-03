export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  body: z.string().min(1, "Body is required").optional(),
  excerpt: z.string().optional().nullable(),
  featured_image: z.string().optional().nullable(),
  content_type: z.enum(["blog", "devotional", "guide"]).optional(),
  category: z.enum(["for-parents", "education-hub", "spiritual-food"]).optional(),
  is_published: z.boolean().optional(),
});

async function requireAdmin(): Promise<{ error: string; status: number } | null> {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return null;
}

function authErrorResponse(error: string, status: number) {
  return NextResponse.json(
    {
      data: null,
      error: {
        code: error,
        message:
          error === "UNAUTHORIZED"
            ? "Authentication required."
            : "You don't have permission to access this.",
      },
    },
    { status }
  );
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const authErr = await requireAdmin();
  if (authErr) return authErrorResponse(authErr.error, authErr.status);

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
    console.error("[GET /api/admin/blogs/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authErr = await requireAdmin();
  if (authErr) return authErrorResponse(authErr.error, authErr.status);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid request body." } },
      { status: 400 }
    );
  }

  const result = patchSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed.",
          fields: result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
        },
      },
      { status: 400 }
    );
  }

  const { is_published, ...rest } = result.data;

  try {
    const existing = await prisma.contentPost.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Post not found." } },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = { ...rest };

    if (is_published !== undefined) {
      updateData.published = is_published;
      // Only set publishedAt on first publish; never overwrite an existing publishedAt
      if (is_published === true && existing.publishedAt === null) {
        updateData.publishedAt = new Date();
      }
    }

    const post = await prisma.contentPost.update({ where: { id: params.id }, data: updateData });
    return NextResponse.json({ data: post, error: null });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string };
    if (prismaErr?.code === "P2002") {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "CONFLICT",
            message: "A post with this slug already exists.",
            fields: [{ field: "slug", message: "Slug must be unique." }],
          },
        },
        { status: 409 }
      );
    }
    console.error("[PATCH /api/admin/blogs/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const authErr = await requireAdmin();
  if (authErr) return authErrorResponse(authErr.error, authErr.status);

  try {
    const existing = await prisma.contentPost.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Post not found." } },
        { status: 404 }
      );
    }

    await prisma.contentPost.delete({ where: { id: params.id } });
    return NextResponse.json({ data: { id: params.id }, error: null });
  } catch (err) {
    console.error("[DELETE /api/admin/blogs/:id]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
