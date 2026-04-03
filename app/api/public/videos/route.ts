export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const where: { is_published: boolean; category?: string } = { is_published: true };
    if (category) where.category = category;

    const videos = await prisma.video.findMany({
      where,
      orderBy: { published_at: "desc" },
    });

    return NextResponse.json({ data: videos, error: null });
  } catch (err) {
    console.error("[GET /api/public/videos]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
