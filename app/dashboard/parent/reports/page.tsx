export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { PDFDownloadButton } from "@/components/ui/PDFDownloadButton";

type NoteWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  author: { name: string };
};

type ReportItem = {
  id: string;
  fileUrl: string;
  createdAt: Date;
};

type ChildWithData = {
  id: string;
  name: string;
  notes: NoteWithAuthor[];
  reports: ReportItem[];
};

function countNewItems(
  notes: { createdAt: Date }[],
  reports: { createdAt: Date }[]
): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const newNotes = notes.filter((n) => n.createdAt >= cutoff).length;
  const newReports = reports.filter((r) => r.createdAt >= cutoff).length;
  return newNotes + newReports;
}

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "PARENT") redirect("/auth/login");

  const children = await prisma.childProfile.findMany({
    where: { parentId: session.user.id },
    include: {
      notes: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
      reports: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const allNotes = children.flatMap((c: ChildWithData) => c.notes);
  const allReports = children.flatMap((c: ChildWithData) => c.reports);
  const newItemCount = countNewItems(allNotes, allReports);

  return (
    <DashboardShell role="PARENT" userName={session.user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">
              Reports &amp; Session Notes
            </h1>
            <p className="text-sm text-wisdom-muted mt-1">
              View therapist notes and download progress reports for your children.
            </p>
          </div>
          {newItemCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-wisdom-blue text-sm font-medium border border-blue-200">
              <span
                className="inline-block w-2 h-2 rounded-full bg-wisdom-blue"
                aria-hidden="true"
              />
              {newItemCount} new item{newItemCount !== 1 ? "s" : ""} this week
            </span>
          )}
        </div>

        {children.length === 0 ? (
          <Card>
            <p className="text-sm text-wisdom-muted text-center py-8">
              No children found. Add a child profile to see their reports and notes.
            </p>
          </Card>
        ) : (
          children.map((child: ChildWithData) => (
            <section key={child.id} aria-labelledby={`child-${child.id}-heading`}>
              <h2
                id={`child-${child.id}-heading`}
                className="text-lg font-heading font-semibold text-wisdom-text mb-4"
              >
                {child.name}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Session Notes */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-wisdom-muted uppercase tracking-wide">
                    Session Notes
                  </h3>
                  {child.notes.length === 0 ? (
                    <Card>
                      <p className="text-sm text-wisdom-muted text-center py-6">
                        No session notes yet.
                      </p>
                    </Card>
                  ) : (
                    child.notes.map((note: NoteWithAuthor) => (
                      <Card key={note.id}>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <time
                              dateTime={note.createdAt.toISOString()}
                              className="text-xs text-wisdom-muted"
                            >
                              {note.createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                            {note.author && (
                              <span className="text-xs text-wisdom-muted">
                                {note.author.name}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-wisdom-text line-clamp-3">
                            {note.content}
                          </p>
                        </div>
                      </Card>
                    ))
                  )}
                </div>

                {/* Progress Reports */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-wisdom-muted uppercase tracking-wide">
                    Progress Reports
                  </h3>
                  {child.reports.length === 0 ? (
                    <Card>
                      <p className="text-sm text-wisdom-muted text-center py-6">
                        No progress reports yet.
                      </p>
                    </Card>
                  ) : (
                    child.reports.map((report: ReportItem) => (
                      <Card key={report.id}>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <time
                            dateTime={report.createdAt.toISOString()}
                            className="text-sm text-wisdom-muted"
                          >
                            {report.createdAt.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <PDFDownloadButton
                            url={report.fileUrl}
                            fileName={`progress-report-${report.id}.pdf`}
                            label="Download Report"
                          />
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </DashboardShell>
  );
}

