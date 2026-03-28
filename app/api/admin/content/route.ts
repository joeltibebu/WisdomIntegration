export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  body: z.string().min(1, "Body is required"),
  published: z.boolean().optional().default(false),
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
    const posts = await prisma.contentPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: posts, error: null });
  } catch (err) {
    console.error("[GET /api/admin/content]", err);
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

  const result = postSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message })) } },
      { status: 400 }
    );
  }

  const { title, slug, body: postBody, published } = result.data;

  try {
    const post = await prisma.contentPost.create({
      data: {
        title,
        slug,
        body: postBody,
        published,
        publishedAt: published ? new Date() : null,
      },
    });
    return NextResponse.json({ data: post, error: null }, { status: 201 });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string };
    if (prismaErr?.code === "P2002") {
      return NextResponse.json(
        { data: null, error: { code: "CONFLICT", message: "A post with this slug already exists.", fields: [{ field: "slug", message: "Slug must be unique." }] } },
        { status: 409 }
      );
    }
    console.error("[POST /api/admin/content]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
