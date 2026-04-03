export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const where: { published: boolean; category?: string } = { published: true };
    if (category) where.category = category;

    const posts = await prisma.contentPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ data: posts, error: null });
  } catch (err) {
    console.error("[GET /api/public/content]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
