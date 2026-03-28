import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const CANCELLATION_WINDOW_HOURS = 24;

export async function POST(
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
  if (session.user.role !== "PARENT") {
    return NextResponse.json(
      { data: null, error: { code: "FORBIDDEN", message: "You don't have permission to access this." } },
      { status: 403 }
    );
  }

  const { id } = params;

  try {
    // Find the session and verify it belongs to one of the parent's children
    const appt = await prisma.session.findFirst({
      where: {
        id,
        child: { parentId: session.user.id },
      },
      include: { child: true },
    });

    if (!appt) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Session not found." } },
        { status: 404 }
      );
    }

    if (appt.status !== "SCHEDULED") {
      return NextResponse.json(
        { data: null, error: { code: "BAD_REQUEST", message: "Only scheduled sessions can be cancelled." } },
        { status: 400 }
      );
    }

    // Enforce cancellation window: must be more than 24 hours away
    const hoursUntil =
      (appt.scheduledAt.getTime() - Date.now()) / (1000 * 60 * 60);

    if (hoursUntil <= CANCELLATION_WINDOW_HOURS) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "CANCELLATION_WINDOW",
            message: `Sessions can only be cancelled more than ${CANCELLATION_WINDOW_HOURS} hours in advance. Please contact us directly to cancel this appointment.`,
          },
        },
        { status: 400 }
      );
    }

    await prisma.session.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    console.log(
      `Session cancelled for ${appt.child.name} on ${appt.scheduledAt.toLocaleString()}`
    );

    return NextResponse.json({ data: { cancelled: true }, error: null });
  } catch (err) {
    console.error("[POST /api/bookings/[id]/cancel]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
