import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { data: null, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === "hero") {
      const updated = await prisma.heroSection.upsert({
        where: { page: "about" },
        update: {
          badge: data.badge,
          badgeAm: data.badgeAm,
          title: data.title,
          titleAm: data.titleAm,
          description: data.description,
          descriptionAm: data.descriptionAm,
        },
        create: {
          page: "about",
          badge: data.badge,
          badgeAm: data.badgeAm,
          title: data.title,
          titleAm: data.titleAm,
          description: data.description,
          descriptionAm: data.descriptionAm,
        },
      });
      return NextResponse.json({ data: updated, error: null });
    }

    if (type === "blocks") {
      // Handle bulk update for page blocks
      for (const block of data) {
        await prisma.pageBlock.update({
          where: { id: block.id },
          data: {
            title: block.title,
            titleAm: block.titleAm,
            content: block.content,
            contentAm: block.contentAm,
            order: block.order,
          },
        });
      }
      return NextResponse.json({ data: "Blocks updated", error: null });
    }

    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid update type" } },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Admin About API Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { data: null, error: { code: "SERVER_ERROR", message: msg } },
      { status: 500 }
    );
  }
}
