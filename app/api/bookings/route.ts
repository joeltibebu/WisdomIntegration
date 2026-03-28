export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bookingSchema = z.object({
  childId: z.string().min(1, "Child is required"),
  serviceId: z.string().min(1, "Service is required"),
  scheduledAt: z
    .string()
    .min(1, "Scheduled time is required")
    .refine((v) => !isNaN(Date.parse(v)), { message: "scheduledAt must be a valid date" })
    .refine((v) => new Date(v) > new Date(), { message: "Appointment must be in the future" }),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { code: "BAD_REQUEST", message: "Invalid request body." } },
      { status: 400 }
    );
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json(
      { data: null, error: { code: "VALIDATION_ERROR", message: "Validation failed.", fields: fieldErrors } },
      { status: 400 }
    );
  }

  const { childId, serviceId, scheduledAt } = result.data;

  try {
    // Verify child belongs to this parent
    const child = await prisma.childProfile.findFirst({
      where: { id: childId, parentId: session.user.id },
    });
    if (!child) {
      return NextResponse.json(
        { data: null, error: { code: "FORBIDDEN", message: "Child not found or does not belong to you." } },
        { status: 403 }
      );
    }

    // Verify service exists and is active.
    // Deactivated services (active: false) are excluded here — satisfies Requirement 10.3 / Task 12.4.
    const service = await prisma.service.findFirst({
      where: { id: serviceId, active: true },
    });
    if (!service) {
      return NextResponse.json(
        { data: null, error: { code: "NOT_FOUND", message: "Service not found or is no longer available." } },
        { status: 404 }
      );
    }

    // Determine therapist: prefer child's assigned therapist, else any active THERAPIST
    let therapistId = child.therapistId;
    if (!therapistId) {
      const anyTherapist = await prisma.user.findFirst({
        where: { role: "THERAPIST", active: true },
      });
      if (!anyTherapist) {
        return NextResponse.json(
          { data: null, error: { code: "NOT_FOUND", message: "No therapists are currently available." } },
          { status: 404 }
        );
      }
      therapistId = anyTherapist.id;
    }

    const scheduledDate = new Date(scheduledAt);

    // Check for conflict: same therapist + same scheduledAt + SCHEDULED
    const conflict = await prisma.session.findFirst({
      where: {
        therapistId,
        scheduledAt: scheduledDate,
        status: "SCHEDULED",
      },
    });
    if (conflict) {
      return NextResponse.json(
        { data: null, error: { code: "CONFLICT", message: "This slot is no longer available." } },
        { status: 409 }
      );
    }

    // Create the session
    const newSession = await prisma.session.create({
      data: {
        childId,
        therapistId,
        serviceType: service.name,
        scheduledAt: scheduledDate,
        status: "SCHEDULED",
      },
    });

    // Notification log
    console.log(
      `Booking confirmed for ${child.name} on ${scheduledDate.toLocaleString()}`
    );

    return NextResponse.json({ data: newSession, error: null }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json(
      { data: null, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
