import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { data: null, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
      { status: 401 }
    );
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } },
      { status: 403 }
    );
  }

  const { id } = params;

  try {
    const user = await prisma.user.findUnique({ where: { id }, select: { active: true } });
    if (!user) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "User not found." } },
        { status: 404 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { active: !user.active },
      select: { active: true },
    });

    return NextResponse.json({ data: { active: updated.active }, error: null });
  } catch (err) {
    console.error("[PATCH /api/admin/users/[id]/status]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
