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
        where: { page: "home" },
        update: {
          badge: data.badge,
          badgeAm: data.badgeAm,
          title: data.title,
          titleAm: data.titleAm,
          description: data.description,
          descriptionAm: data.descriptionAm,
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
        },
        create: {
          page: "home",
          badge: data.badge,
          badgeAm: data.badgeAm,
          title: data.title,
          titleAm: data.titleAm,
          description: data.description,
          descriptionAm: data.descriptionAm,
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
        },
      });
      return NextResponse.json({ data: updated, error: null });
    }

    if (type === "features") {
      // For features, we'll handle a list. This is a simplified bulk update.
      // In a real app, you'd individualize CRUD, but for the seed-migration, bulk is' okay.
      for (const feature of data) {
        await prisma.homepageFeature.update({
          where: { id: feature.id },
          data: {
            title: feature.title,
            titleAm: feature.titleAm,
            description: feature.description,
            descriptionAm: feature.descriptionAm,
            order: feature.order,
          },
        });
      }
      return NextResponse.json({ data: "Features updated", error: null });
    }

    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid update type" } },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Admin Home API Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { data: null, error: { code: "SERVER_ERROR", message: msg } },
      { status: 500 }
    );
  }
}
