export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { code: "INVALID_JSON", message: "Invalid request body." } },
      { status: 400 }
    );
  }

  const { name, email, phone, subject, message } = body;

  // Validate required fields
  const fieldErrors: FieldErrors = {};
  if (!name?.trim()) fieldErrors.name = "Name is required.";
  if (!email?.trim()) fieldErrors.email = "Email is required.";
  if (!subject?.trim()) fieldErrors.subject = "Subject is required.";
  if (!message?.trim()) fieldErrors.message = "Message is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "Please fill in all required fields.",
          fields: fieldErrors,
        },
      },
      { status: 400 }
    );
  }

  // Log to console — no email service wired up yet
  console.log("[contact] New contact form submission:", {
    name: name!.trim(),
    email: email!.trim(),
    phone: phone?.trim() ?? "",
    subject: subject!.trim(),
    message: message!.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      data: { message: "Your message has been received. We will be in touch shortly." },
      error: null,
    },
    { status: 200 }
  );
}

