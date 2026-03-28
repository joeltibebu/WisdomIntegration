export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";

export default async function CaseloadPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "THERAPIST") redirect("/auth/login");

  const children = await prisma.childProfile.findMany({
    where: { therapistId: session.user.id },
    orderBy: { name: "asc" },
  });

  return (
    <DashboardShell role="THERAPIST" userName={session.user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">My Caseload</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Children currently assigned to you.
          </p>
        </div>

        {/* Empty state */}
        {children.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div
                className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-wisdom-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-wisdom-text">No children assigned yet</p>
                <p className="text-sm text-wisdom-muted mt-1 max-w-sm">
                  An administrator will assign children to your caseload. Check back soon.
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child: (typeof children)[number]) => {
              const dob = new Date(child.dateOfBirth).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const diagnosisPreview = child.diagnosisNotes
                ? child.diagnosisNotes.length > 100
                  ? child.diagnosisNotes.slice(0, 100) + "…"
                  : child.diagnosisNotes
                : null;

              return (
                <Card key={child.id}>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h2 className="text-lg font-heading font-semibold text-wisdom-text">
                        {child.name}
                      </h2>
                      <p className="text-sm text-wisdom-muted mt-0.5">Born {dob}</p>
                    </div>

                    {diagnosisPreview && (
                      <p className="text-sm text-wisdom-text line-clamp-3">{diagnosisPreview}</p>
                    )}

                    <div className="pt-2 border-t border-wisdom-border flex flex-col gap-1.5">
                      <Link
                        href={`/dashboard/therapist/notes?childId=${child.id}`}
                        className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
                      >
                        View Session Notes
                      </Link>
                      <Link
                        href={`/dashboard/therapist/goals?childId=${child.id}`}
                        className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
                      >
                        View Goals
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

