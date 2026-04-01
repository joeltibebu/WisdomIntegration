import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT now()`;
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("test-db route error:", error);
    return NextResponse.json(
      { ok: false, error: "Database query failed" },
      { status: 500 }
    );
  }
}

