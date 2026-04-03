export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return null;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const authErr = await requireAdmin();
  if (authErr) {
    return NextResponse.json({ data: null, error: { code: authErr.error } }, { status: authErr.status });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "Invalid form data." } }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ data: null, error: { code: "BAD_REQUEST", message: "No file provided." } }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", message: "File type not allowed. Use JPEG, PNG, WebP, GIF, or SVG." } }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", message: "File too large. Maximum size is 5 MB." } }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, safeName), buffer);
  } catch (err) {
    console.error("[POST /api/admin/upload]", err);
    return NextResponse.json({ data: null, error: { code: "INTERNAL_ERROR", message: "Failed to save file." } }, { status: 500 });
  }

  return NextResponse.json({ data: { url: `/uploads/${safeName}` }, error: null }, { status: 201 });
}
