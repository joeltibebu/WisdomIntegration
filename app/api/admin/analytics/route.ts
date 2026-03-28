export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeek(date: Date): Date {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 7);
  return d;
}

export async function GET(req: NextRequest) {
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

  const { searchParams } = new URL(req.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const exportCsv = searchParams.get("export") === "csv";

  const fromDate = fromParam ? new Date(fromParam) : null;
  const toDate = toParam ? new Date(toParam) : null;

  // Build date range filter for sessions
  const dateFilter =
    fromDate || toDate
      ? {
          scheduledAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {};

  try {
    if (exportCsv) {
      // Return CSV of session data
      const sessions = await prisma.session.findMany({
        where: dateFilter,
        include: {
          child: { select: { name: true } },
          therapist: { select: { name: true } },
        },
        orderBy: { scheduledAt: "desc" },
      });

      const header = "id,childName,therapistName,serviceType,scheduledAt,status";
      const rows = sessions.map((s: {
        id: string;
        child: { name: string };
        therapist: { name: string };
        serviceType: string;
        scheduledAt: Date;
        status: string;
      }) =>
        [
          s.id,
          `"${s.child.name.replace(/"/g, '""')}"`,
          `"${s.therapist.name.replace(/"/g, '""')}"`,
          `"${s.serviceType.replace(/"/g, '""')}"`,
          s.scheduledAt.toISOString(),
          s.status,
        ].join(",")
      );
      const csv = [header, ...rows].join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=sessions.csv",
        },
      });
    }

    // Aggregate metrics
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    const [
      activeChildren,
      completedSessions,
      scheduledThisWeek,
      totalActiveTherapists,
      therapistsWithScheduledThisWeek,
    ] = await Promise.all([
      // Total active children (ChildProfile count)
      prisma.childProfile.count(
        fromDate || toDate
          ? { where: { createdAt: { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) } } }
          : undefined
      ),

      // Total sessions completed
      prisma.session.count({
        where: { status: "COMPLETED", ...dateFilter },
      }),

      // Sessions scheduled this week (or within range if provided)
      prisma.session.count({
        where: {
          status: "SCHEDULED",
          scheduledAt: fromDate || toDate
            ? { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) }
            : { gte: weekStart, lt: weekEnd },
        },
      }),

      // Total active therapists
      prisma.user.count({ where: { role: "THERAPIST", active: true } }),

      // Therapists with at least one SCHEDULED session this week (or in range)
      prisma.session.findMany({
        where: {
          status: "SCHEDULED",
          scheduledAt: fromDate || toDate
            ? { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) }
            : { gte: weekStart, lt: weekEnd },
        },
        select: { therapistId: true },
        distinct: ["therapistId"],
      }),
    ]);

    const therapistUtilization =
      totalActiveTherapists > 0
        ? Math.round((therapistsWithScheduledThisWeek.length / totalActiveTherapists) * 100)
        : 0;

    return NextResponse.json({
      data: {
        activeChildren,
        completedSessions,
        scheduledThisWeek,
        therapistUtilization,
      },
      error: null,
    });
  } catch (err) {
    console.error("[GET /api/admin/analytics]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
