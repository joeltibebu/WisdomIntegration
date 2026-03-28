import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { ProgressReportUploadForm } from "@/components/ProgressReportUploadForm";

export default async function UploadReportPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "THERAPIST") redirect("/auth/login");

  const children = await prisma.childProfile.findMany({
    where: { therapistId: session.user.id },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <DashboardShell role="THERAPIST" userName={session.user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="mb-1">
            <Link
              href="/dashboard/therapist/notes"
              className="text-sm text-wisdom-muted hover:text-wisdom-blue focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
            >
              ← Session Notes
            </Link>
          </div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Upload Progress Report</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Upload a PDF or document progress report for a child.
          </p>
        </div>

        <Card>
          {children.length === 0 ? (
            <p className="text-sm text-wisdom-muted text-center py-8">
              No children assigned to you yet.
            </p>
          ) : (
            <ProgressReportUploadForm children={children} />
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
